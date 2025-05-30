import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";

// Clerk Webhook Handler
export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                };
                await User.create(userData);
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                };
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                break;
        }

        res.json({ success: true });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe Webhook Handler
export const stripeWebhooks = async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = Stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const sessions = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
                limit: 1, // ✅ add this to ensure only latest one is fetched
            });

            const session = sessions.data[0];
            if (!session || !session.metadata || !session.metadata.purchaseId) {
                console.error("Invalid session metadata.");
                break;
            }

            const { purchaseId } = session.metadata;

            const purchaseData = await Purchase.findById(purchaseId);
            if (!purchaseData) break;

            const userData = await User.findById(purchaseData.userId);
            const courseData = await Course.findById(purchaseData.courseId.toString());

            if (userData && courseData) {
                courseData.enrolledStudents.push(userData._id);
                await courseData.save();

                userData.enrolledCourses.push(courseData._id);
                await userData.save();
            }

            purchaseData.status = "complete";
            await purchaseData.save();

            break;
        }

        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const sessions = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
                limit: 1,
            });

            const session = sessions.data[0];
            if (!session || !session.metadata || !session.metadata.purchaseId) {
                console.error("Invalid session metadata.");
                break;
            }

            const { purchaseId } = session.metadata;
            const purchaseData = await Purchase.findById(purchaseId);
            if (purchaseData) {
                purchaseData.status = "failed";
                await purchaseData.save();
            }

            break;
        }

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    response.json({ received: true });
};
