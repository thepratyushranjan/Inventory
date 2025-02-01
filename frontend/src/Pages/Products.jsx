import React, { useState, useEffect } from "react";
import TopLabel from "../Components/TopLabel";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const Products = ({
  label = "Products",
  isBtnHide = false,
  btnContent = [],
  optionInput,
  link,
  border,
  color = "#000",
}) => {
  const navigate = useNavigate();
  const staticData = [
    {
      id: 1,
      name: "Tech Corp",
      industry: "Technology",
      employees: 500,
      location: "San Francisco",
      revenue: "$1B",
    },
    {
      id: 2,
      name: "Design Studio",
      industry: "Creative",
      employees: 50,
      location: "New York",
      revenue: "$10M",
    },
    {
      id: 3,
      name: "Health Plus",
      industry: "Healthcare",
      employees: 200,
      location: "Chicago",
      revenue: "$500M",
    },
    {
      id: 4,
      name: "Eco Solutions",
      industry: "Energy",
      employees: 150,
      location: "Austin",
      revenue: "$200M",
    },
    {
      id: 5,
      name: "Food Delight",
      industry: "Food",
      employees: 1000,
      location: "Miami",
      revenue: "$2B",
    },
    {
      id: 6,
      name: "Auto Masters",
      industry: "Automotive",
      employees: 800,
      location: "Detroit",
      revenue: "$1.5B",
    },
    {
      id: 7,
      name: "Fashion Hub",
      industry: "Retail",
      employees: 300,
      location: "Los Angeles",
      revenue: "$800M",
    },
    {
      id: 8,
      name: "Build Right",
      industry: "Construction",
      employees: 400,
      location: "Dallas",
      revenue: "$600M",
    },
    {
      id: 9,
      name: "Learn Smart",
      industry: "Education",
      employees: 120,
      location: "Boston",
      revenue: "$150M",
    },
    {
      id: 10,
      name: "Travel Wise",
      industry: "Tourism",
      employees: 250,
      location: "Seattle",
      revenue: "$300M",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setTotalPages(Math.ceil(staticData.length / itemsPerPage));
    setCurrentItems(staticData.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, itemsPerPage]);

  // Generate page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleAdd = () => {
    navigate("/add-company");
  };

  const handleEdit = (id) => {
    console.log("Edit company with ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete company with ID:", id);
  };

  const handleView = (id) => {
    console.log("View details for company ID:", id);
  };

  // Create Add Company button as React element
  const addCompanyButton = (
    <button
      key="add-company"
      onClick={handleAdd}
      className="add-company-btn"
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        marginLeft: "10px",
      }}
    >
      Add Products
    </button>
  );
  return (
    <div className="flex flex-col items-center w-full h-full justify-start box-border pr-[3%] pb-[3%] bg-[#F8F9FF]">
      <TopLabel
        label={label}
        isBtnHide={isBtnHide}
        color={color}
        backgroundColor="#fff"
        paddingBlock="14px"
        borderBottom="none"
        optionInput={optionInput}
        btnContent={[addCompanyButton, ...btnContent]}
        link={link}
        border={border}
      />

      <div className="w-full h-[2px]" style={{ backgroundColor: "#1a2b6d" }} />

      <div
        className="w-full mt-6 flex flex-col"
        style={{ flex: 1, minHeight: 0 }}
      >
        <div
          className="overflow-x-auto rounded-lg shadow-sm"
          style={{
            maxHeight: "calc(100vh - 250px)",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#1a2b6d #F8F9FF",
          }}
        >
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="sticky top-0 bg-[#F8F9FF] border-b border-[#1a2b6d]">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Industry</th>
                <th className="p-4 text-left">Employees</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Revenue</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b border-[#1a2b6d]/20">
                    {company.id}
                  </td>
                  <td className="p-4 border-b border-[#1a2b6d]/20 font-medium">
                    {company.name}
                  </td>
                  <td className="p-4 border-b border-[#1a2b6d]/20">
                    {company.industry}
                  </td>
                  <td className="p-4 border-b border-[#1a2b6d]/20">
                    {company.employees.toLocaleString()}
                  </td>
                  <td className="p-4 border-b border-[#1a2b6d]/20">
                    {company.location}
                  </td>
                  <td className="p-4 border-b border-[#1a2b6d]/20 font-medium">
                    {company.revenue}
                  </td>
                  <td className="p-4 border-b border-[#1a2b6d]/20 font-medium">
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

        {/* Pagination Controls */}
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
                disabled={currentPage === page}
                className={`px-3 py-1 rounded-md text-sm border ${
                  currentPage === page
                    ? "bg-[#1a2b6d] text-white border-[#1a2b6d] cursor-default"
                    : "bg-white border-[#1a2b6d] hover:bg-[#1a2b6d] hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md text-sm bg-white border border-[#1a2b6d] hover:bg-[#1a2b6d] hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
