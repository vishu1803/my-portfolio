import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import profileImage from "/src/assets/profile.jpg"; // Replace with actual image path

const roles = ["a Full Stack Developer", "a UI Designer", "a Professional Coder"];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white pt-20">
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl font-bold">Welcome to my World!</h1>
        <h2 className="text-5xl font-extrabold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Vishwanath Nishad
        </h2>
        <motion.h3
          key={roleIndex}
          className="text-3xl font-semibold mt-2 text-blue-400 animate-pulse"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          {roles[roleIndex]}
        </motion.h3>
        <p className="mt-6 text-gray-400 max-w-lg">
          A highly skilled Full Stack Developer with a focus on the MERN stack and React Native, delivering dynamic web and mobile applications. With a strong foundation in app development and the latest technologies, including Generative AI, I am passionate about crafting innovative, efficient solutions that enhance user experiences and drive results.
        </p>
        <div className="mt-6 space-x-4">
          <a href="#contact" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
            Hire Me
          </a>
          <a href="/resume.pdf" download className="px-6 py-3 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-800 transition">
            Download Resume
          </a>
        </div>
      </div>

      {/* Right Content (Profile Image) */}
      <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <motion.img
          src={profileImage}
          alt="Vishwanath Nishad"
          className="w-64 h-64 rounded-full object-cover border-4 border-blue-400 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(0, 183, 255, 0.8)" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </section>
  );
}
