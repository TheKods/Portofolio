import React, {
  useState,
  useEffect,
  memo,
  createContext,
  useContext,
} from "react";
import {
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Image,
  FileText,
  Link,
} from "lucide-react";

// CMS Context
const CMSContext = createContext();

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};

// CMS Provider Component
export const CMSProvider = ({ children }) => {
  const [content, setContent] = useState({
    hero: {
      title: "Full Stack Developer",
      subtitle: "Building digital experiences with modern technologies",
      description:
        "Passionate about creating innovative solutions and bringing ideas to life through code.",
      ctaText: "View My Work",
      backgroundImage: "/assets/images/hero-bg.jpg",
    },
    about: {
      title: "About Me",
      content:
        "I am a passionate full-stack developer with expertise in modern web technologies...",
      skills: ["React", "Node.js", "Python", "PostgreSQL"],
      image: "/assets/images/profile.jpg",
    },
    projects: [
      {
        id: 1,
        title: "E-Commerce Platform",
        description:
          "A full-featured e-commerce solution built with React and Node.js",
        image: "/assets/images/project1.jpg",
        technologies: ["React", "Node.js", "MongoDB"],
        githubUrl: "https://github.com/username/project1",
        liveUrl: "https://project1.demo.com",
        featured: true,
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "John Doe",
        role: "CEO, Tech Company",
        content:
          "Excellent work and great communication throughout the project.",
        rating: 5,
        image: "/assets/images/testimonial1.jpg",
      },
    ],
    blog: [
      {
        id: 1,
        title: "Building Modern Web Applications",
        excerpt:
          "Learn about the latest trends and best practices in web development...",
        content: "Full blog post content here...",
        author: "Your Name",
        date: "2024-01-15",
        tags: ["React", "JavaScript", "Web Development"],
        featured: true,
      },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const updateContent = (section, data) => {
    setContent((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const addItem = (section, item) => {
    setContent((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...item, id: Date.now() }],
    }));
  };

  const updateItem = (section, id, updates) => {
    setContent((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    }));
  };

  const deleteItem = (section, id) => {
    setContent((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  const value = {
    content,
    isEditing,
    currentSection,
    setIsEditing,
    setCurrentSection,
    updateContent,
    addItem,
    updateItem,
    deleteItem,
  };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
};

// Editable Text Component
const EditableText = memo(
  ({ value, onChange, placeholder, multiline = false, className = "" }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
      onChange(editValue);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setEditValue(value);
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div className="relative">
          {multiline ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className={`w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white ${className}`}
              rows={4}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className={`w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white ${className}`}
              autoFocus
            />
          )}

          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`cursor-pointer hover:bg-gray-800/50 p-2 rounded-lg transition-colors ${className}`}
        onClick={() => setIsEditing(true)}
      >
        {multiline ? (
          <div className="whitespace-pre-wrap">{value || placeholder}</div>
        ) : (
          <span>{value || placeholder}</span>
        )}
        <Edit3 className="w-4 h-4 inline ml-2 opacity-50" />
      </div>
    );
  },
);

// Content Editor Modal
const ContentEditor = memo(({ section, data, onSave, onClose }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Edit {section}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>

              {typeof value === "string" && value.length > 100 ? (
                <textarea
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  rows={4}
                />
              ) : typeof value === "string" ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                />
              ) : Array.isArray(value) ? (
                <input
                  type="text"
                  value={value.join(", ")}
                  onChange={(e) =>
                    handleChange(key, e.target.value.split(", "))
                  }
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  placeholder="Comma-separated values"
                />
              ) : (
                <input
                  type="text"
                  value={JSON.stringify(value)}
                  onChange={(e) =>
                    handleChange(key, JSON.parse(e.target.value))
                  }
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  placeholder="JSON value"
                />
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

// CMS Toolbar
const CMSToolbar = memo(() => {
  const { isEditing, setIsEditing, currentSection, setCurrentSection } =
    useCMS();

  const sections = ["hero", "about", "projects", "testimonials", "blog"];

  return (
    <div className="fixed top-4 right-4 z-40">
      <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl p-4 border border-white/10 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isEditing
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {isEditing ? (
              <Eye className="w-4 h-4" />
            ) : (
              <Edit3 className="w-4 h-4" />
            )}
            {isEditing ? "Preview" : "Edit"}
          </button>

          {isEditing && (
            <select
              value={currentSection || ""}
              onChange={(e) => setCurrentSection(e.target.value || null)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section} value={section}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
});

// Content Manager Dashboard
export const ContentManager = memo(() => {
  const { content, updateContent, addItem, updateItem, deleteItem } = useCMS();
  const [selectedSection, setSelectedSection] = useState("hero");
  const [editingItem, setEditingItem] = useState(null);

  const sections = {
    hero: {
      title: "Hero Section",
      fields: ["title", "subtitle", "description", "ctaText"],
    },
    about: { title: "About Section", fields: ["title", "content", "skills"] },
    projects: {
      title: "Projects",
      isArray: true,
      fields: ["title", "description", "technologies", "githubUrl", "liveUrl"],
    },
    testimonials: {
      title: "Testimonials",
      isArray: true,
      fields: ["name", "role", "content", "rating"],
    },
    blog: {
      title: "Blog Posts",
      isArray: true,
      fields: ["title", "excerpt", "content", "author", "tags"],
    },
  };

  const handleAddItem = (section) => {
    const newItem = sections[section].fields.reduce((acc, field) => {
      acc[field] = field === "rating" ? 5 : "";
      return acc;
    }, {});

    addItem(section, newItem);
  };

  const handleEditItem = (section, item) => {
    setEditingItem({ section, item });
  };

  const handleSaveItem = (updatedItem) => {
    updateItem(editingItem.section, editingItem.item.id, updatedItem);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Content Management System
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-white font-semibold mb-4">Sections</h2>
              <div className="space-y-2">
                {Object.entries(sections).map(([key, section]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedSection(key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedSection === key
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {sections[selectedSection].title}
                </h2>

                {sections[selectedSection].isArray && (
                  <button
                    onClick={() => handleAddItem(selectedSection)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add New
                  </button>
                )}
              </div>

              {sections[selectedSection].isArray ? (
                <div className="space-y-4">
                  {content[selectedSection].map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-800/50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-medium">
                          {item.title || item.name || `Item ${item.id}`}
                        </h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleEditItem(selectedSection, item)
                            }
                            className="p-2 text-blue-400 hover:bg-blue-600/20 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteItem(selectedSection, item.id)}
                            className="p-2 text-red-400 hover:bg-red-600/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {sections[selectedSection].fields.map((field) => (
                          <div key={field}>
                            <span className="text-gray-400 capitalize">
                              {field}:
                            </span>
                            <span className="text-white ml-2">
                              {Array.isArray(item[field])
                                ? item[field].join(", ")
                                : item[field]?.toString().slice(0, 50) +
                                  (item[field]?.length > 50 ? "..." : "")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sections[selectedSection].fields.map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>

                      {field === "content" || field === "description" ? (
                        <textarea
                          value={content[selectedSection][field] || ""}
                          onChange={(e) =>
                            updateContent(selectedSection, {
                              ...content[selectedSection],
                              [field]: e.target.value,
                            })
                          }
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                          rows={4}
                        />
                      ) : Array.isArray(content[selectedSection][field]) ? (
                        <input
                          type="text"
                          value={
                            content[selectedSection][field]?.join(", ") || ""
                          }
                          onChange={(e) =>
                            updateContent(selectedSection, {
                              ...content[selectedSection],
                              [field]: e.target.value.split(", "),
                            })
                          }
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                          placeholder="Comma-separated values"
                        />
                      ) : (
                        <input
                          type="text"
                          value={content[selectedSection][field] || ""}
                          onChange={(e) =>
                            updateContent(selectedSection, {
                              ...content[selectedSection],
                              [field]: e.target.value,
                            })
                          }
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <ContentEditor
          section={editingItem.section}
          data={editingItem.item}
          onSave={handleSaveItem}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
});

export default {
  CMSProvider,
  CMSToolbar,
  ContentManager,
  EditableText,
  useCMS,
};
