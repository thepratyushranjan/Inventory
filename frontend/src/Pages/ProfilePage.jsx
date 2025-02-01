import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaPencilAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import useFetch from '../hooks/fetch.hook';
import { updateUser, changePassword } from '../helper/helper';
import { profileValidation, resetPasswordValidation } from '../helper/validate';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token] = useState(localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  const [{ isLoading, apiData, serverError }] = useFetch("/user/profile", token);

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  // Formik for profile information
  const profileFormik = useFormik({
    initialValues: {
      email: apiData?.email || "",
      name: apiData?.name || "",
      phone_no: apiData?.phone_no || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Saving changes...",
        success: <b>Profile updated successfully!</b>,
        error: <b>Update failed. Please try again.</b>,
      });
    },
  });

  // Formik for password change
  const passwordFormik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      const updatePromise = changePassword({
        password: values.password,
        password2: values.confirmPassword
      });
      
      toast.promise(updatePromise, {
        loading: "Changing password...",
        success: <b>Password changed successfully!</b>,
        error: <b>Password change failed!</b>,
      });
      
      updatePromise.then(() => {
        passwordFormik.resetForm();
        setShowPassword(false);
        setShowConfirmPassword(false);
      });
    }
  });

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (serverError) return <h1 className="text-xl text-red-500 text-center mt-8">{serverError.message}</h1>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header Section */}
      <div className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
          <p className="text-gray-500 mt-1">Manage your personal information</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-2 rounded-lg ${isEditing ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <FaPencilAlt className="inline-block mr-2" />
            {isEditing ? 'Editing' : 'Edit Profile'}
          </button>
          {isEditing && (
            <button
              onClick={profileFormik.handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                {...profileFormik.getFieldProps("name")}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                {...profileFormik.getFieldProps("email")}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                {...profileFormik.getFieldProps("phone_no")}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                {...profileFormik.getFieldProps("address")}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
          </form>
        </div>

        {/* Social & Security */}
        <div className="space-y-8">
          {/* Social Connections */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Social Connections</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <FaFacebook className="text-blue-600 text-xl" />
                <span className="text-gray-700">Connect Facebook account</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <FaInstagram className="text-pink-500 text-xl" />
                <span className="text-gray-700">Connect Instagram account</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <FaTwitter className="text-blue-400 text-xl" />
                <span className="text-gray-700">Connect Twitter account</span>
              </button>
            </div>
          </div>

          {/* Password Reset */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Security</h2>
            <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
              <div className="p-6 bg-blue-50 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      {...passwordFormik.getFieldProps("password")}
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      {...passwordFormik.getFieldProps("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;