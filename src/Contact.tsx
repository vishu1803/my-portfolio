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
  "w-full p-4 rounded-xl bg-white/[0.02] text-white text-[14px] border border-white/[0.06] focus:border-[#4F8EF7]/40 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-[#4F8EF7]/20 transition-all duration-300 placeholder-[#4a4a5e]";

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
      className="min-h-screen bg-[#060609] text-white py-28 px-5 sm:px-6 md:px-20 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 30% 30%, rgba(79, 142, 247, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 70% 70%, rgba(124, 92, 252, 0.08) 0%, transparent 70%)
          `,
        }}
      />

      <motion.div
        className="text-center mb-20 relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#4F8EF7]/70 mb-4">
          Contact
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Let&apos;s Work Together
        </h2>
        <p className="mt-4 text-[#6b6b80] text-[15px] leading-relaxed">
          Have a project in mind? I&apos;d love to hear about it. Drop me a message
          and I&apos;ll get back to you as soon as possible.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-14 items-start max-w-5xl mx-auto relative z-10">
        {/* LEFT */}
        <motion.div
          className="text-center md:text-left space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="w-16 h-16 mx-auto md:mx-0 rounded-2xl flex items-center justify-center text-2xl font-black
            bg-gradient-to-br from-[#4F8EF7] to-[#7C5CFC] text-white shadow-lg shadow-[#4F8EF7]/20">
            VN
          </div>

          <div>
            <h3 className="text-xl font-bold">Vishwanath Nishad</h3>
            <p className="text-[14px] text-[#6b6b80] mt-1">Full Stack Developer & Software Engineer</p>
          </div>

          <p className="text-[#6b6b80] text-[14px] leading-[1.7]">
            Currently pursuing B.Tech in Electronics Engineering, building
            scalable applications and exploring the intersection of AI and
            software engineering.
          </p>

          <div className="space-y-2.5">
            <p className="text-[#8b8b9e] text-[13px] flex items-center gap-3 justify-center md:justify-start">
              <span className="text-[#4a4a5e] font-medium w-12">Phone</span>
              <span>+91 7905087928</span>
            </p>
            <p className="text-[#8b8b9e] text-[13px] flex items-center gap-3 justify-center md:justify-start">
              <span className="text-[#4a4a5e] font-medium w-12">Email</span>
              <span>vishwanatnishad@gmail.com</span>
            </p>
          </div>

          <div className="flex gap-2 justify-center md:justify-start mt-4">
            <MagneticButton
              href="https://github.com/vishu1803"
              className="text-lg p-3 rounded-xl glass-card text-[#6b6b80] hover:text-white"
            >
              <FaGithub />
            </MagneticButton>

            <MagneticButton
              href="https://www.linkedin.com/in/vishwanath-nishad-69b047233/"
              className="text-lg p-3 rounded-xl glass-card text-[#6b6b80] hover:text-white"
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
            <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} className={inputClasses} />
            <input type="text" name="phone" placeholder="Phone" required value={formData.phone} onChange={handleChange} className={inputClasses} />
          </div>
          <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className={inputClasses} />
          <input type="text" name="subject" placeholder="Subject" required value={formData.subject} onChange={handleChange} className={inputClasses} />
          <textarea name="message" placeholder="Your message..." required rows={5} value={formData.message} onChange={handleChange} className={`${inputClasses} resize-none`} />

          <MagneticButton
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#4F8EF7] to-[#7C5CFC] text-white rounded-xl text-[14px] font-semibold
              shadow-lg shadow-[#4F8EF7]/20 hover:shadow-[#4F8EF7]/40 hover:scale-[1.01] transition-all duration-300
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
