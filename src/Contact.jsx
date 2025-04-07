import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs.send(
            "service_d2je3s4",
            "template_1evabg9",
            formData,
            "fK8ZdZyDa9lRsF7NW"
        )
            .then(() => {
                setSuccessMessage("Message sent successfully!");
                setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
            })
            .catch(() => {
                setSuccessMessage("Failed to send message. Try again.");
            });
    };

    return (
        <section id="contact" className="min-h-screen bg-gray-900 text-white py-16 px-6 md:px-20">
            <h2 className="text-5xl font-bold text-center mb-12">Contact</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side */}
                <div className="text-center md:text-left">
                    <img src="/greeting-image.jpeg" alt="Greetings" className="mx-auto md:mx-0 w-40" />
                    <h3 className="text-3xl font-semibold mt-4">Vishwanath Nishad</h3>
                    <p className="text-blue-400">MERN Stack Developer</p>
                    <p className="mt-4 text-gray-400">
                        Innovative B.Tech student passionate about full-stack development, creating scalable, user-focused applications with modern technologies.
                    </p>
                    <p className="mt-4 text-gray-300">📞 +91 7905087928</p>
                    <p className="text-gray-300">✉ vishwanatnishad@gmail.com</p>
                    <div className="flex space-x-4 mt-4">
                        <a href="https://github.com/vishu1803" className="text-blue-400 text-2xl hover:text-white">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/vishwanath-nishad-69b047233/" className="text-blue-400 text-2xl hover:text-white">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

                {/* Right Side - Contact Form */}
                <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 mb-4 rounded bg-gray-700 text-white" />
                    <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 mb-4 rounded bg-gray-700 text-white" />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 mb-4 rounded bg-gray-700 text-white" />
                    <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="w-full p-2 mb-4 rounded bg-gray-700 text-white" />
                    <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required className="w-full p-2 mb-4 rounded bg-gray-700 text-white h-32"></textarea>
                    <button type="submit" className="bg-blue-500 w-full py-2 rounded text-white font-semibold hover:bg-blue-600">Send Message</button>
                    {successMessage && <p className="text-center mt-4 text-green-400">{successMessage}</p>}
                </form>
            </div>
        </section>
    );
}
