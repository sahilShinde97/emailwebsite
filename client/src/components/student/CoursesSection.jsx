import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext)

  return (
    <div className="flex flex-col items-center justify-center text-center pt-6 pb-16 md:px-40 px-8 bg-white">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Start your learning journey!
      </h2>

    {/* added courses */}
      <div className="grid grid-cols-auto  px-4 md:px-0 md:my-16 my-10 gap-4">
        {allCourses.slice(0,4).map((course,index)=> <CourseCard key={index} course={course}/>)}
      </div>



      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className="text-gray-700 border border-gray-400 px-6 py-3 rounded hover:bg-gray-100 transition"
      >
        Show all courses
      </Link>
    </div>
  );
};

export default CoursesSection;
