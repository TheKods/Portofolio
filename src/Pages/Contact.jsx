import React, { useState, useEffect, memo } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const SocialLink = memo(({ icon: Icon, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-3 px-4 py-2 text-slate-600 hover:text-blue-700 font-medium transition-colors"
  >
    <Icon size={18} />
    {label}
  </a>
));

const ContactInfoCard = memo(({ icon: Icon, title, content, href }) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
      <Icon className="w-6 h-6 text-blue-700" />
    </div>
    <div>
      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
      {href ? (
        <a
          href={href}
          className="text-slate-600 hover:text-blue-700 transition-colors"
        >
          {content}
        </a>
      ) : (
        <p className="text-slate-600">{content}</p>
      )}
    </div>
  </div>
));

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using FormSubmit service
      const form = e.target;
      const formData = new FormData(form);

      const response = await fetch(
        "https://formsubmit.co/ajax/rafihermawan06@gmail.com",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully. I'll get back to you soon!",
          icon: "success",
          confirmButtonColor: "#1e40af",
          timer: 3000,
          timerProgressBar: true,
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again or contact me directly.",
        icon: "error",
        confirmButtonColor: "#1e40af",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white" id="Contact">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-12 md:mb-16"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Get In Touch
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Let's Work Together
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Have a question or want to collaborate? I'd love to hear from you.
            Drop me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Information */}
          <div
            className="lg:col-span-1"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
          >
            <div className="space-y-8">
              <ContactInfoCard
                icon={Mail}
                title="Email"
                content="rafihermawan06@gmail.com"
                href="mailto:rafihermawan06@gmail.com"
              />

              <ContactInfoCard
                icon={Phone}
                title="Phone"
                content="+62 (Available for consultation)"
              />

              <ContactInfoCard
                icon={MapPin}
                title="Location"
                content="Jakarta, Indonesia"
              />

              {/* Social Links */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Connect With Me
                </h3>
                <div className="space-y-2">
                  <SocialLink
                    icon={Github}
                    label="GitHub"
                    href="https://github.com/TheKods"
                  />
                  <SocialLink
                    icon={Linkedin}
                    label="LinkedIn"
                    href="https://www.linkedin.com/in/rafi-hermawan/"
                  />
                  <SocialLink
                    icon={Mail}
                    label="Email"
                    href="mailto:rafihermawan06@gmail.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="lg:col-span-2"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="600"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-slate-50 rounded-xl border border-slate-200 p-8 md:p-10"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name Field */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="600"
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                {/* Email Field */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="150"
                  data-aos-duration="600"
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                </div>
              </div>

              {/* Message Field */}
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="600"
                className="mb-6"
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows={6}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>

              {/* Submit Button */}
              <div
                data-aos="fade-up"
                data-aos-delay="250"
                data-aos-duration="600"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                >
                  <Send size={20} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>

              <p className="text-xs text-slate-500 text-center mt-4">
                I'll get back to you within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
