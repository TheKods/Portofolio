// Form validation utilities
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim() === "") {
    errors.name = "Name is required";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!formData.email || formData.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!formData.subject || formData.subject.trim() === "") {
    errors.subject = "Subject is required";
  } else if (formData.subject.trim().length < 5) {
    errors.subject = "Subject must be at least 5 characters";
  }

  if (!formData.message || formData.message.trim() === "") {
    errors.message = "Message is required";
  } else if (formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};

export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};
