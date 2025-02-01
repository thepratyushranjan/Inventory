import React, { useState } from "react";
import TopLabel from "../Components/TopLabel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyForm = ({
  label = "Add Company",
  isBtnHide = false,
  optionInput,
  link,
  border,
  color = "#000",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    website: "",
    license_no: "",  // Fixed the typo for license_no
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Company added successfully!");
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-start box-border p-6 bg-[#F8F9FF]">
      <TopLabel
        label={label}
        isBtnHide={isBtnHide}
        color={color}
        backgroundColor="#fff"
        paddingBlock="14px"
        borderBottom="none"
        optionInput={optionInput}
        link={link}
        border={border}
      />
      <div className="w-full h-[2px] bg-[#1a2b6d] my-4" />

      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-transparent backdrop-blur-md" required />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-transparent backdrop-blur-md" required />
          </div>
          <div>
            <label className="block text-gray-700">Contact Number</label>
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-transparent backdrop-blur-md" required />
          </div>
          <div>
            <label className="block text-gray-700">License Number</label> {/* Fixed label for license_no */}
            <input type="text" name="license_no" value={formData.license_no} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-transparent backdrop-blur-md" required />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-transparent backdrop-blur-md" required />
          </div>
          <div>
            <label className="block text-gray-700">Website</label>
            <input type="url" name="website" value={formData.website} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-transparent backdrop-blur-md" />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-lg mx-2 shadow-md hover:bg-red-700">Submit</button>
          <button type="button" onClick={() => setFormData({ name: "", address: "", contact: "", email: "", website: "", license_no: "" })} className="px-6 py-2 bg-gray-600 text-white rounded-lg mx-2 shadow-md hover:bg-gray-700">Cancel</button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CompanyForm;
