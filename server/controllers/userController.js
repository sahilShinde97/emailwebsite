
import Razorpay from "razorpay";
import User from "../models/User.js";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";



// Get User Data        
export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// user Enrolled Courses  With lecture links
export const userEnrolledCourses = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const userData = await User.findById(userId).populate('enrolledCourses');

        res.json({ success: true, enrolledCourses: userData.enrolledCourses });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// purchase course
export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.auth.userId
        const userData = await User.findById(userId)
        const courseData = await Course.findById(courseId)

        if(!userData || !courseData){
            return res.json({ success: false, message: "data not found"})
        }

        const amount = (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)

        const purchaseData = {
            courseId: courseData._id,
            userId,
            amount: amount
        }

        const newPurchase = await Purchase.create(purchaseData)

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // amount in smallest currency unit
            currency: process.env.CURRENCY || 'INR',
            receipt: newPurchase._id.toString(),
            notes: {
                courseId: courseId,
                userId: userId
            }
        })

        res.json({
            success: true,
            order_id: order.id,
            amount: amount,
            key_id: process.env.RAZORPAY_KEY_ID,
            product_name: courseData.courseTitle,
            description: `Purchase of ${courseData.courseTitle}`,
            contact: userData.phone || "",
            name: userData.name,
            email: userData.email
        })

    } catch (error) { 
       res.json({ success: false, message: error.message })  
    }
}

// Add this new function to verify payment
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        
        const sign = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex")

        if (razorpay_signature === expectedSign) {
            // Payment is verified, update the purchase status
            const purchase = await Purchase.findById(req.body.receipt)
            if (purchase) {
                purchase.paymentStatus = 'completed'
                purchase.paymentId = razorpay_payment_id
                await purchase.save()

                // Update user's enrolled courses
                await User.findByIdAndUpdate(
                    purchase.userId,
                    { $addToSet: { enrolledCourses: purchase.courseId } }
                )

                return res.json({ success: true, message: 'Payment verified successfully' })
            }
        }
        
        res.json({ success: false, message: 'Payment verification failed' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}