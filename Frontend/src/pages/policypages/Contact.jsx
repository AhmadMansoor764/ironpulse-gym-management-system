import { useState } from "react";
import {
  FaBolt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact form:", formData);

    // Connect your backend API here later.
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      {/* HEADER */}
      <header className="border-b border-[#292929]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <FaBolt className="text-[#c6ff00]" />
            <span>IronPulse</span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-[#b9bd9e] hover:text-[#c6ff00] transition"
          >
            <FaArrowLeft />
            Back Home
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-16 pb-10 text-center">
        <p className="text-[#c6ff00] text-sm font-bold uppercase tracking-widest">
          Contact Us
        </p>

        <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold">
          How can we help?
        </h1>

        <p className="mt-5 text-[#b9bd9e] text-base sm:text-lg leading-7 max-w-2xl mx-auto">
          Have a question about IronPulse, your account, billing, or our trainer
          management features? Send us a message and our team will get back to
          you.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
          {/* CONTACT INFO */}
          <div className="bg-[#1b1b1b] border border-[#303030] rounded-3xl p-7 sm:p-9">
            <h2 className="text-2xl font-bold">Get in touch</h2>

            <p className="mt-3 text-[#b9bd9e] leading-6">
              We're here to help trainers spend less time managing paperwork and
              more time helping their clients.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#292929] flex items-center justify-center">
                  <FaEnvelope className="text-[#c6ff00]" />
                </div>

                <div>
                  <p className="text-xs text-[#777] uppercase">Email</p>

                  <p className="mt-1 text-sm">am.web.dev2024@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#292929] flex items-center justify-center">
                  <FaPhone className="text-[#c6ff00]" />
                </div>

                <div>
                  <p className="text-xs text-[#777] uppercase">Phone</p>

                  <p className="mt-1 text-sm">+93 701 166 438</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#292929] flex items-center justify-center">
                  <FaMapMarkerAlt className="text-[#c6ff00]" />
                </div>

                <div>
                  <p className="text-xs text-[#777] uppercase">Location</p>

                  <p className="mt-1 text-sm">
                    Kabul, Afghanistan - 5th district - Khoshal khan mina
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-[#1b1b1b] border border-[#303030] rounded-3xl p-7 sm:p-9">
            <h2 className="text-2xl font-bold">Send us a message</h2>

            {submitted && (
              <div className="mt-5 rounded-xl border border-[#536b00] bg-[#273000] px-4 py-3 text-sm text-[#c6ff00]">
                Your message has been submitted successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Name
                  </label>

                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-xl bg-[#292929] border border-[#383838] px-4 py-3.5 outline-none focus:border-[#c6ff00] text-white placeholder:text-[#777]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email
                  </label>

                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl bg-[#292929] border border-[#383838] px-4 py-3.5 outline-none focus:border-[#c6ff00] text-white placeholder:text-[#777]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Subject
                </label>

                <input
                  required
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full rounded-xl bg-[#292929] border border-[#383838] px-4 py-3.5 outline-none focus:border-[#c6ff00] text-white placeholder:text-[#777]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Message
                </label>

                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={7}
                  placeholder="Write your message..."
                  className="w-full rounded-xl bg-[#292929] border border-[#383838] px-4 py-3.5 outline-none focus:border-[#c6ff00] text-white placeholder:text-[#777] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-[#c6ff00] hover:bg-[#d5ff38] text-black font-bold py-4 transition"
              >
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Footer = () => (
  <footer className="border-t border-[#292929] py-8">
    <div className="max-w-6xl mx-auto px-5 text-center">
      <Link to="/" className="inline-flex items-center gap-2 font-bold">
        <FaBolt className="text-[#c6ff00]" />
        IronPulse
      </Link>

      <div className="flex justify-center gap-6 mt-5 text-sm text-[#888]">
        <Link to="/privacy" className="hover:text-[#c6ff00]">
          Privacy
        </Link>

        <Link to="/terms" className="hover:text-[#c6ff00]">
          Terms
        </Link>

        <Link to="/contact" className="hover:text-[#c6ff00]">
          Contact
        </Link>
      </div>

      <p className="mt-5 text-xs text-[#666]">
        © 2026 IronPulse. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Contact;
