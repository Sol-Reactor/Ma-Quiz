import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";

function ProfileModal({ isOpen, onClose }) {
  const { user, logout, updateUser } = useAuth(); // Get updateUser from context
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ username: user.username });
    }
    if (!isOpen) {
      setIsEditing(false); // Reset editing state when modal closes
    }
  }, [user, isOpen]);

  const handleLogout = () => {
    onClose(); // Close modal first
    toast
      .promise(
        new Promise((resolve) => {
          logout();
          setTimeout(resolve, 1500);
        }),
        {
          loading: "Logging out...",
          success: "Logout successful!",
          error: "Logout failed.",
        }
      )
      .then(() => navigate("/"));
  };

  const handleSave = async () => {
    if (formData.username === user.username) {
      setIsEditing(false);
      return;
    }
    setLoading(true);
    const result = await updateUser({ username: formData.username });
    setLoading(false);

    if (result.success) {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } else {
      toast.error(result.error || "Failed to update profile.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen || !user) return null;
  const colors = [
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-yellow-400",
    "bg-purple-400",
  ];
  const avatarColor = colors[user.username.charCodeAt(0) % colors.length];

  return (
    <div
      className="fixed inset-0 z-[60] bg-gray-900 bg-opacity-70 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform scale-100 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div
          className={`mx-auto flex items-center justify-center w-24 h-24 rounded-full text-white font-bold text-3xl uppercase ${avatarColor}`}
        >
          {user.username.charAt(0)}
        </div>

        {isEditing ? (
          <>
            <div className="mt-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
              {user.username}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {user.email}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Role:{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {user.role}
              </span>
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              Joined: {new Date(user.created_at).toLocaleDateString()}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 shadow-md"
              >
                Log Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileModal;
