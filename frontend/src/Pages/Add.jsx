import React from "react";
import TopLabel from "../Components/TopLabel";
import Input from "../Components/Input";

const Add = () => {
  const BasicInformation = [
    "Product Name", 
    "SKU", 
    "Brand", 
    "Model Number"
  ];
  const ProductDetails = [
    "Product Category",
    "Product Sub-Category",
    "Features",
    "Gender",
    "Production Date",
    "Tags",
    "Product Description",
    "Product Images",
  ];
  const ProductSpecifications = [
    "Case Diameter",
    "Case Material",
    "Strap Type",
    "Strap Size",
    "Strap Lock",
    "Dail Color",
    "Strap Color",
    "Bezel Color",
    "Movement Type",
    "Water Resistance",
    "Crystal Type",
    "Luminescence",
    "Box & Paper",
    "Condition",
  ];
  const ProductPricing = [
    "Base Price",
    "Box/Accessories Price",
    "Purchase Price",
    "Discount Options",
    "Stock Quantity",
    "Reorder Level",
    "Supplier Details",
    "Warranty Type",
    "Warranty",
  ];
  return (
    <div className="flex flex-col items-start h-full overflow-auto box-border pr-[3%] pb-[3%] bg-[#F8F9FF] gap-3">
      <TopLabel
        label={"Add Product (Inventory)"}
        color="#211951"
        backgroundColor="#118CF033"
      />
      <TopLabel label={"Basic Information"} />
      <div className="flex w-full gap-10 items-start flex-wrap">
  {BasicInformation.map((element, index) => {
    // Conditional logic to determine the type of input
    if (element === "Brand") {
      return (
        <div key={index} className="flex flex-col gap-1 justify-center w-[30%]">
          <label className="text-base font-semibold">{element}</label>
          <select className="p-2 border border-[#949494] rounded-[4px] text-neutral-700 bg-white focus:outline-none">
            <option value="">Select a Brand</option>
            <option value="brand1">Rolex 1</option>
            <option value="brand2">Rolex 2</option>
            <option value="brand3">Rolex 3</option>
          </select>
        </div>
      );
    } else {
      return (
        <Input
          key={index}
          border="1px solid #949494"
          lable={element}
          type="text"
        />
      );
    }
  })}
</div>

<TopLabel label={"Product Details"} />
<div className="flex gap-10 items-start flex-wrap">
  {ProductDetails.map((element, index) => {
    let inputType = "text"; // Default type is text
    let placeholder = "";
    let accept = null;

    // Conditional logic for select fields
    if (element === "Product Category" || element === "Product Sub-Category" || element === "Gender") {
      return (
        <div key={index} className="flex flex-col gap-1 justify-center w-[30%]">
          <label className="text-base font-semibold">{element}</label>
          <select required="true" className="p-2 border border-[#949494] rounded-[4px] text-neutral-700 bg-white focus:outline-none">
            <option value="">{`Select ${element}`}</option>
            <option value="option1">Rolex 1</option>
            <option value="option2">Rolex 2</option>
            <option value="option3">Rolex 3</option>
          </select>
        </div>
      );
    } else if (element === "Production Date") {
      inputType = "date"; // Set type to date for Production Date
    } else if (element === "Product Description") {
      inputType = "textarea"; // Custom input type for description
    } else if (element === "Product Images") {
      inputType = "file";
      placeholder = "Drag or browse to upload Product Images";
      accept = "image/*";
    }

    return (
      <Input
        key={index}
        border="1px solid #949494"
        lable={element}
        type={inputType}
        placeholder={placeholder}
        accept={accept}
      />
    );
  })}
</div>

<TopLabel label={"Product Specifications"} />
<div className="flex gap-10 items-start flex-wrap">
  {ProductSpecifications.map((element, index) => {
    // Conditional logic for select fields
    if (
      ["Strap Type", "Dail Color", "Strap Color", "Bezel Color", "Movement Type", "Water Resistance", "Crystal Type", "Luminescence", "Box & Paper", "Condition"].includes(element)
    ) {
      return (
        <div key={index} className="flex flex-col gap-1 justify-center w-[30%]">
          <label className="text-base font-semibold">{element}</label>
          <select className="p-2 border border-[#949494] rounded-[4px] text-neutral-700 bg-white focus:outline-none">
            <option value="">{`Select ${element}`}</option>
            <option value="option1">Rolex 1</option>
            <option value="option2">Rolex 2</option>
            <option value="option3">Rolex 3</option>
          </select>
        </div>
      );
    } else {
      return (
        <Input
          key={index}
          border="1px solid #949494"
          lable={element}
          type="text"
        />
      );
    }
  })}
</div>

<TopLabel label={"Product Pricing"} />
<div className="flex gap-10 items-start flex-wrap">
  {ProductPricing.map((element, index) => (
    <Input
      key={index}
      border="1px solid #949494"
      lable={element}
      type="text"
    />
  ))}
</div>
    </div>
  );
};

export default Add;
