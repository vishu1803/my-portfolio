"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import MagneticButton from "./components/MagneticButton";

interface FormData {
  [key: string]: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const inputClasses =
  "w-full p-4 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 placeholder-gray-500";

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .send(
        "service_d2je3s4",
        "template_1evabg9",
        formData,
        "fK8ZdZyDa9lRsF7NW"
      )
      .then(() => {
        setSuccessMessage("Message sent successfully!");
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
        setSending(false);
      })
      .catch(() => {
        setSuccessMessage("Failed to send message. Try again.");
        setSending(false);
      });
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-24 px-4 md:px-20 relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]" />
      </div>

      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-medium tracking-widest uppercase text-blue-400/80 mb-3">
          Contact
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold">Get In Touch</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto relative z-10">
        {/* LEFT SIDE */}
        <motion.div
          className="text-center md:text-left space-y-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-28 h-28 mx-auto md:mx-0 rounded-2xl flex items-center justify-center text-5xl font-black
            bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-blue-500/20 rotate-3">
            VN
          </div>

          <h3 className="text-2xl font-bold">Vishwanath Nishad</h3>
          <p className="text-lg text-blue-400/80 font-medium">MERN Stack Developer</p>

          <p className="text-gray-400 leading-relaxed text-sm">
            Innovative B.Tech student passionate about full-stack development,
            creating scalable, user-focused applications.
          </p>

          <div className="space-y-2 text-sm">
            <p className="text-gray-300 flex items-center gap-2 justify-center md:justify-start">
              <span className="text-blue-400">📞</span> +91 7905087928
            </p>
            <p className="text-gray-300 flex items-center gap-2 justify-center md:justify-start">
              <span className="text-blue-400">✉</span> vishwanatnishad@gmail.com
            </p>
          </div>

          <div className="flex space-x-3 justify-center md:justify-start mt-4">
            <MagneticButton
              href="https://github.com/vishu1803"
              className="text-2xl p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <FaGithub />
            </MagneticButton>

            <MagneticButton
              href="https://www.linkedin.com/in/vishwanath-nishad-69b047233/"
              className="text-2xl p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <FaLinkedin />
            </MagneticButton>
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/[0.06] space-y-4"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`${inputClasses} resize-none`}
          />

          <MagneticButton
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold
              shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "Sending..." : "Send Message"}
          </MagneticButton>

          {successMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-green-400 font-medium mt-4 bg-green-500/10 py-3 rounded-xl border border-green-500/20"
            >
              ✓ {successMessage}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
