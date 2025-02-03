import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import useFetch from "../hooks/fetch.hook";
import TopLabel from "../Components/TopLabel";

const Company = ({
  label = "Company",
  isBtnHide = false,
  btnContent = [],
  optionInput,
  link,
  border,
  color = "#000",
}) => {
  const navigate = useNavigate();
  const [{ isLoading, apiData, serverError }] = useFetch(
    "/warehouse/companies/",
    localStorage.getItem("accessToken")
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (apiData) {
      const total = Math.ceil(apiData.length / itemsPerPage);
      setTotalPages(total);
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
      setCurrentItems(apiData.slice(startIdx, endIdx));
    }
  }, [apiData, currentPage, itemsPerPage]);

  if (isLoading) return <div>Loading...</div>;
  if (serverError) return <div>Error: {serverError}</div>;

  const handleAdd = () => navigate("/add-company");
  const handleEdit = (id) => console.log("Edit company ID:", id);
  const handleDelete = (id) => console.log("Delete company ID:", id);
  const handleView = (id) => console.log("View details for company ID:", id);

  const addCompanyButton = (
    <button
      onClick={handleAdd}
      className="add-company-btn"
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "4px",
      }}
    >
      Add Company
    </button>
  );

  const allBtnContent = [addCompanyButton, ...btnContent]; // Combine addCompanyButton with other buttons

  const renderPagination = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="flex space-x-2">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md text-sm bg-white border border-[#1a2b6d] hover:bg-[#1a2b6d] hover:text-white"
        >
          Previous
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md text-sm border ${
              currentPage === page
                ? "bg-[#1a2b6d] text-white"
                : "bg-white border-[#1a2b6d] hover:bg-[#1a2b6d] hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md text-sm bg-white border border-[#1a2b6d] hover:bg-[#1a2b6d] hover:text-white"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#F8F9FF]">
      <TopLabel
        label={label}
        isBtnHide={isBtnHide}
        color={color}
        backgroundColor="#fff"
        paddingBlock="14px"
        borderBottom="none"
        optionInput={optionInput}
        btnContent={allBtnContent}  // Updated here
        link={link}
        border={border}
      />
      <div className="w-full h-[2px]" style={{ backgroundColor: "#1a2b6d" }} />
      <div className="w-full mt-6 flex flex-col" style={{ flex: 1 }}>
        <div
          className="overflow-x-auto rounded-lg shadow-sm"
          style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}
        >
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="sticky top-0 bg-[#F8F9FF] border-b border-[#1a2b6d]">
                {[
                  "ID",
                  "Company",
                  "Address",
                  "Contact Number",
                  "License No",
                  "Email",
                  "Website",
                  "Action",
                ].map((header) => (
                  <th key={header} className="p-4 text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b border-[#1a2b6d]/20">
                    {company.id}
                  </td>
                  <td className="p-4 border-b border-[#1a2b6d]/20">
                    {company.name}
                  </td>
                  <td className="p-4 border-b border-[#1a2b6d]/20">
                    {company.address}
                  </td>
                  <td className="p-4 border-b border-[#1a2b6d]/20">
                    {company.contact_number || "N/A"}
                  </td>
                  <td className="p-4 border-b border-[#1a2b6d]/20">
                    {company.license_no}
                  </td>
                  <td className="p-4 border-b border-[#1a2b6d]/20">
                    {company.email}
                  </td>
                  <td className="p-4 border-b border-[#1a2b6d]/20">
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      {company.website}
                    </a>
                  </td>
                  <td className="p-4 border-b border-[#1a2b6d]/20">
                    <button
                      onClick={() => handleView(company.id)}
                      className="text-green-600 hover:text-green-800 mr-3"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(company.id)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(company.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full flex justify-between items-center mt-4 px-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border rounded-md bg-white text-sm"
              >
                {[5, 10, 15, 20].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default Company;
