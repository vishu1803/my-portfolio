import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import MagneticButton from "./components/MagneticButton";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [performanceMode, setPerformanceMode] = useState(false);

  // Detect performance mode globally
  useEffect(() => {
    const handlePerfChange = (e) => setPerformanceMode(e.detail);
    window.addEventListener("performance-mode", handlePerfChange);
    return () => window.removeEventListener("performance-mode", handlePerfChange);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_d2je3s4",
        "template_1evabg9",
        formData,
        "fK8ZdZyDa9lRsF7NW"
      )
      .then(() => {
        setSuccessMessage("Message sent successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch(() => {
        setSuccessMessage("Failed to send message. Try again.");
      });
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-black text-white py-16 px-4 md:px-20 relative overflow-hidden"
    >
      {/* Background gradients */}
      {!performanceMode && (
        <>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          </div>
        </>
      )}

      <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 relative z-10">
        Get In Touch
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto relative z-10">
        {/* LEFT SIDE */}
        <div
          className={`text-center md:text-left space-y-6 ${performanceMode ? "opacity-80" : ""
            }`}
        >
          <div
            className={`w-32 h-32 mx-auto md:mx-0 rounded-full flex items-center justify-center text-6xl font-bold 
              bg-gradient-to-br from-blue-500 to-purple-600
              ${!performanceMode ? "shadow-2xl shadow-blue-500/40" : ""}`}
          >
            VN
          </div>

          <h3 className="text-3xl font-bold">Vishwanath Nishad</h3>
          <p className="text-xl text-blue-400">MERN Stack Developer</p>

          <p className="text-gray-400 leading-relaxed">
            Innovative B.Tech student passionate about full-stack development,
            creating scalable, user-focused applications.
          </p>

          <div className="space-y-2 text-lg">
            <p className="text-gray-300">📞 +91 7905087928</p>
            <p className="text-gray-300">✉ vishwanatnishad@gmail.com</p>
          </div>

          <div className="flex space-x-4 justify-center md:justify-start mt-4">
            <MagneticButton
              href="https://github.com/vishu1803"
              className="text-blue-400 text-3xl hover:text-white transition-colors"
            >
              <FaGithub />
            </MagneticButton>

            <MagneticButton
              href="https://www.linkedin.com/in/vishwanath-nishad-69b047233/"
              className="text-blue-400 text-3xl hover:text-white transition-colors"
            >
              <FaLinkedin />
            </MagneticButton>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition resize-none"
          ></textarea>

          <MagneticButton
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            Send Message
          </MagneticButton>

          {successMessage && (
            <p className="text-center text-green-400 font-bold text-lg mt-4 bg-green-500/10 py-2 rounded-lg border border-green-500/30">
              ✓ {successMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
