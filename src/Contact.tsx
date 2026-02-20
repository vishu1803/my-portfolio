"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import MagneticButton from "./components/MagneticButton";
import SectionWrapper from "./components/SectionWrapper";

interface FormData {
  [key: string]: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const ease = [0.25, 0.1, 0, 1] as const;

const inputClasses =
  "w-full p-4 rounded-xl bg-white/[0.02] text-white text-[14px] border border-white/[0.06] focus:border-blue-500/40 focus:bg-white/[0.04] focus:outline-none transition-all duration-300 placeholder-gray-600";

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
      .send("service_d2je3s4", "template_1evabg9", formData, "fK8ZdZyDa9lRsF7NW")
      .then(() => {
        setSuccessMessage("Message sent successfully!");
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
        setSending(false);
      })
      .catch(() => {
        setSuccessMessage("Failed to send. Please try again.");
        setSending(false);
      });
  };

  return (
    <SectionWrapper
      id="contact"
      className="min-h-screen bg-[#0a0a0f] text-white py-28 px-4 md:px-20 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/[0.03] rounded-full blur-[200px]" />
      </div>

      <motion.div
        className="text-center mb-20 relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400/70 mb-4">
          Contact
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Let&apos;s Work Together
        </h2>
        <p className="mt-4 text-gray-500 text-[15px] leading-relaxed">
          Have a project in mind? I&apos;d love to hear about it. Drop me a message
          and I&apos;ll get back to you as soon as possible.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-14 items-start max-w-5xl mx-auto relative z-10">
        {/* LEFT SIDE */}
        <motion.div
          className="text-center md:text-left space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="w-16 h-16 mx-auto md:mx-0 rounded-2xl flex items-center justify-center text-2xl font-black
            bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            VN
          </div>

          <div>
            <h3 className="text-xl font-bold">Vishwanath Nishad</h3>
            <p className="text-[14px] text-gray-500 mt-1">Full Stack Developer & Software Engineer</p>
          </div>

          <p className="text-gray-500 text-[14px] leading-relaxed">
            Currently pursuing B.Tech in Electronics Engineering, building
            scalable applications and exploring the intersection of AI and
            software engineering.
          </p>

          <div className="space-y-2">
            <p className="text-gray-400 text-[13px] flex items-center gap-2.5 justify-center md:justify-start">
              <span className="text-gray-600">Phone</span>
              <span>+91 7905087928</span>
            </p>
            <p className="text-gray-400 text-[13px] flex items-center gap-2.5 justify-center md:justify-start">
              <span className="text-gray-600">Email</span>
              <span>vishwanatnishad@gmail.com</span>
            </p>
          </div>

          <div className="flex gap-2 justify-center md:justify-start mt-4">
            <MagneticButton
              href="https://github.com/vishu1803"
              className="text-lg p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-500 hover:text-white hover:border-white/[0.12] transition-all duration-300"
            >
              <FaGithub />
            </MagneticButton>

            <MagneticButton
              href="https://www.linkedin.com/in/vishwanath-nishad-69b047233/"
              className="text-lg p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-500 hover:text-white hover:border-white/[0.12] transition-all duration-300"
            >
              <FaLinkedin />
            </MagneticButton>
          </div>
        </motion.div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-3"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text" name="name" placeholder="Name" required
              value={formData.name} onChange={handleChange} className={inputClasses}
            />
            <input
              type="text" name="phone" placeholder="Phone" required
              value={formData.phone} onChange={handleChange} className={inputClasses}
            />
          </div>

          <input
            type="email" name="email" placeholder="Email" required
            value={formData.email} onChange={handleChange} className={inputClasses}
          />

          <input
            type="text" name="subject" placeholder="Subject" required
            value={formData.subject} onChange={handleChange} className={inputClasses}
          />

          <textarea
            name="message" placeholder="Your message..." required rows={5}
            value={formData.message} onChange={handleChange}
            className={`${inputClasses} resize-none`}
          />

          <MagneticButton
            type="submit"
            className="w-full py-3.5 bg-white text-gray-900 rounded-xl text-[14px] font-semibold
              hover:bg-gray-100 hover:scale-[1.01] transition-all duration-300
              disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Message"}
          </MagneticButton>

          {successMessage && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="text-center text-[13px] text-emerald-400 font-medium py-3 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/10"
            >
              ✓ {successMessage}
            </motion.p>
          )}
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
