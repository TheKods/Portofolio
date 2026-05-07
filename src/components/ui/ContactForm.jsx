import React, { useState, useCallback, memo } from 'react';
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare } from 'lucide-react';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form validation
const validateForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.subject.trim()) {
    errors.subject = 'Subject is required';
  } else if (formData.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters';
  }

  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
};

// Contact Form Component
export const ContactForm = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [touched, setTouched] = useState({});

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  const handleBlur = useCallback((field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));

    // Validate field on blur
    const fieldErrors = validateForm({ [field]: formData[field] });
    if (fieldErrors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: fieldErrors[field],
      }));
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    // Validate all fields
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - replace with actual email service
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});

    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClasses = "w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-none";
    const hasError = errors[fieldName] && touched[fieldName];

    return `${baseClasses} ${
      hasError
        ? 'border-red-400 focus:ring-red-500 focus:border-red-400'
        : 'border-white/20 focus:ring-blue-500 focus:border-blue-500'
    }`;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Send Message</h3>
          <p className="text-gray-400 text-sm">I'd love to hear from you!</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={() => handleBlur('name')}
              required
              className={getInputClassName('name')}
              placeholder="Your full name"
              disabled={isSubmitting}
            />
            {errors.name && touched.name && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => handleBlur('email')}
              required
              className={getInputClassName('email')}
              placeholder="your@email.com"
              disabled={isSubmitting}
            />
            {errors.email && touched.email && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Subject *
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            onBlur={() => handleBlur('subject')}
            required
            className={getInputClassName('subject')}
            placeholder="What's this about?"
            disabled={isSubmitting}
          />
          {errors.subject && touched.subject && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onBlur={() => handleBlur('message')}
            required
            rows={5}
            className={getInputClassName('message')}
            placeholder="Tell me about your project or just say hello..."
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message && touched.message && (
              <p className="text-red-400 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.message}
              </p>
            )}
            <span className="text-xs text-gray-500 ml-auto">
              {formData.message.length}/500
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
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
        {submitStatus === 'success' && (
          <div className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl p-4">
            <CheckCircle className="w-5 h-5" />
            <span>Message sent successfully! I'll get back to you within 24 hours.</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl p-4">
            <AlertCircle className="w-5 h-5" />
            <span>Failed to send message. Please try again or contact me directly at rafihermawan.dev@gmail.com</span>
          </div>
        )}
      </form>
    </div>
  );
});

// Contact Info Card Component
export const ContactInfoCard = memo(({ icon: Icon, title, content, link, delay = 0 }) => (
  <div
    className="relative group"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
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

export default {
  ContactForm,
  ContactInfoCard,
};