import React, { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import Button from "./Button";

const BottomPaginationContainer = ({
    currentPage,
    setCurrentPage,
    inventoryItems,
    itemsPerPage,
    setItemsPerPage,
}) => {
  const totalPages = Math.ceil(inventoryItems.length / itemsPerPage);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value)); // Update the state with the selected value
    setCurrentPage(currentPage);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      console.log(page); 
    }
    console.log(page);
  };
  return (
    <div className="flex items-center justify-between px-6 bg-white border border-x-0 border-b-0 border-t-[#0000001A]">
      <div className="py-2 h-10 px-4 gap-3 flex items-center justify-center">
        <lable>Show</lable>
        <select
          className="border border-[#0000001A] bg-[#D9D9D94D] focus:outline-none rounded-[3px] p-1"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          {[...Array(20)].map((_, i) => (
            <option
              className="bg-white flex rounded-full"
              key={i + 1}
              value={i + 1}
            >
              {i + 1}
            </option>
          ))}
        </select>
        <lable>Per Page</lable>
      </div>
      <div>
        <div className="flex items-center justify-center gap-1">
          <GrPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-4 h-4 ${currentPage === 1 ? "opacity-50" : "cursor-pointer"}`}
          />
           {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              btnContent={index + 1}
              backgroundColor={currentPage === index + 1 ? "#D9D9D94D" : "#fff"}
              paddingInline="10px"
              paddingBlock="1px"
              onClick={() => handlePageChange(index + 1)}
            />
          ))}
          <GrNext
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-4 h-4 ${currentPage === totalPages ? "opacity-50" : "cursor-pointer"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomPaginationContainer;
