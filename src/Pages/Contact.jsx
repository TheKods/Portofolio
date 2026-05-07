import React, { useState, useEffect, memo } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const ContactInfo = memo(({ icon: Icon, title, content, link, delay }) => (
  <div
    className="relative group"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          {link ? (
            <a
              href={link}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              {content}
            </a>
          ) : (
            <p className="text-gray-400">{content}</p>
          )}
        </div>
      </div>
    </div>
  </div>
));

const SocialLink = memo(({ icon: Icon, link, label, delay }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className="relative p-4 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-white/10 transition-all duration-300 hover:scale-110 hover:shadow-2xl">
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="flex flex-col items-center gap-2">
        <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-200" />
        <span className="text-xs text-gray-400 group-hover:text-white transition-colors duration-200">
          {label}
        </span>
      </div>
    </div>
  </a>
));

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "rafihermawan.dev@gmail.com",
      link: "mailto:rafihermawan.dev@gmail.com",
      delay: 200,
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+62 812-3456-7890",
      link: "tel:+6281234567890",
      delay: 400,
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Jakarta, Indonesia",
      delay: 600,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      link: "https://github.com/TheKods",
      label: "GitHub",
      delay: 200,
    },
    {
      icon: Linkedin,
      link: "https://linkedin.com/in/rafi-hermawan",
      label: "LinkedIn",
      delay: 400,
    },
    {
      icon: Instagram,
      link: "https://instagram.com/rafi_hermw",
      label: "Instagram",
      delay: 600,
    },
  ];

  return (
    <section
      className="py-16 md:py-20 bg-transparent relative overflow-hidden"
      id="Contact"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block relative group mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
              Get In Touch
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Let's discuss your project ideas and how we can work together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div data-aos="fade-up" data-aos-duration="1000">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Project discussion"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl p-4">
                    <AlertCircle className="w-5 h-5" />
                    <span>Failed to send message. Please try again or contact me directly.</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6" data-aos="fade-up">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <ContactInfo key={index} {...info} />
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="400">
                Follow Me
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <SocialLink key={index} {...social} />
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div
              className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Let's Start a Conversation
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    I'm always open to discussing new opportunities, interesting projects,
                    or just having a chat about technology. Feel free to reach out!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}