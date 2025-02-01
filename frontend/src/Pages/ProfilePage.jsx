import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPencilAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [userData, setUserData] = useState({
    fullName: 'John Doe',
    phoneNo: '+123 456 789',
    location: 'New York, USA',
    email: 'johndoe@example.com',
    socialLinks: {
      facebook: 'https://facebook.com/johndoe',
      instagram: 'https://instagram.com/johndoe',
      twitter: 'https://twitter.com/johndoe',
    },
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setShowUpdateButton(!showUpdateButton);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    alert('Password reset submitted');
  };

  const handleCancel = () => {
    setPasswordData({
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleUpdate = () => {
    toast.success("Profile updated successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setShowUpdateButton(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg"> 
      <ToastContainer />

      <div className="flex justify-between items-center border-b pb-4 px-4"> 
        <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
        <div className="flex items-center">
          <button onClick={handleEditClick} className="text-gray-600 hover:text-gray-800 focus:outline-none">
            <FaPencilAlt size={18} />
          </button>
          {showUpdateButton && (
            <button
              onClick={handleUpdate}
              className="ml-3 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Update
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 px-4">
        <h3 className="text-xl font-semibold text-gray-700 pb-2">Information</h3>
        {isEditing ? (
          <div className="space-y-3">
            <input type="text" name="fullName" value={userData.fullName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Full Name" />
            <input type="text" name="phoneNo" value={userData.phoneNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Phone No" />
            <input type="text" name="location" value={userData.location} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Location" />
            <input type="email" name="email" value={userData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Email" />
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-lg text-gray-700"><strong>Full Name:</strong> {userData.fullName}</p>
            <p className="text-lg text-gray-700"><strong>Phone No:</strong> {userData.phoneNo}</p>
            <p className="text-lg text-gray-700"><strong>Location:</strong> {userData.location}</p>
            <p className="text-lg text-gray-700"><strong>Email:</strong> {userData.email}</p>
          </div>
        )}

        <h3 className="text-xl font-semibold text-gray-700 pt-6 pb-2">Social</h3>
        <div className="flex space-x-4">
          <a href={userData.socialLinks.facebook} className="text-blue-600"><FaFacebook size={24} /></a>
          <a href={userData.socialLinks.instagram} className="text-pink-500"><FaInstagram size={24} /></a>
          <a href={userData.socialLinks.twitter} className="text-blue-400"><FaTwitter size={24} /></a>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 pt-6 pb-2">Reset Password</h3>
        <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="New Password" />
        <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="Confirm Password" />

        <div className="flex justify-center space-x-4 mt-4">
          <button onClick={handleSubmit} className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none">Submit</button>
          <button onClick={handleCancel} className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
