import React from "react";
import Button from "../Components/Button";
import DetailedBtn from "../Components/DetailedBtn";
import { Link } from "react-router-dom";

const TopLabel = ({
  label,
  isBtnHide = true, 
  btnContent = [],
  color = "#000",
  backgroundColor = "#fff",
  paddingBlock = "14px",
  borderBottom = "none",
  optionInput,
  border,
  link = false,
  detailBtn = false,
  onClick,
}) => {
  return (
    <div
      style={{ backgroundColor, paddingBlock, borderBottom }}
      className="py-3 h-[10vh] px-4 w-full flex items-center justify-between"
    >
      <span style={{ color }} className="text-[3.7vh] font-medium">
        {label}
      </span>

      <div className="flex gap-3 items-center justify-center">
        {btnContent && btnContent.map((content, index) => (
          <Button
            key={`button-${index}`}
            {...content}
            btnContent={content}
            color={color}
            backgroundColor="white"
            border={border}
            onClick={() => console.log(`${content} clicked`)} 
          />
        ))}

        {link && <Link to="/add">
          <Button
            btnContent={"New"}
            color={"#ffffff"}
            backgroundColor={"#118CF0"}
          />
        </Link>}
        {detailBtn && <DetailedBtn border="1px solid #118CF0" color="#118CF0" />}
      </div>
      {optionInput && (
        <select className="cursor-pointer focus:outline-none border border-[#2B303466] text-[#2B303466] px-3 py-2 rounded-md shadow-sm">
          {optionInput.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default TopLabel;
