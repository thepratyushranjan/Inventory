import { useState } from "react";
import TopLabel from "../Components/TopLabel";
import InventoryDetailList from "../Components/InventoryDetailList";
import BottomPaginationContainer from "../Components/BottomPaginationContainer";

const MainAllData = ({
  label,
  isBtnHide,
  texts = [],
  btnContent = [],
  editBtn = [],
  lastBtn,
  optionInput,
  detailedBtn,
  border,
  onClick,
  link,
  detailBtn = "false",
  color = "#000",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = 50;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.from({ length: totalItems }).slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  return (
    <div className="flex flex-col items-center w-full h-full justify-start box-border pr-[3%] pb-[3%] bg-[#F8F9FF]">
      <TopLabel label={label} isBtnHide={isBtnHide} color = {color} backgroundColor = "#fff" paddingBlock= "14px" borderBottom="none" optionInput={optionInput} btnContent={btnContent} link={link} detailBtn={detailBtn} border={border} onClick={onClick}/>
      <div className="flex flex-col w-full overflow-auto items-center justify-between box-border">
        <div className="flex flex-col w-full h-full overflow-auto items-center justify-start box-border">
          <div className="flex flex-col w-full cursor-pointer box-border">
            <InventoryDetailList texts={texts} width="11vw" borderTop="1px solid #118cf0" fontSize="2.3vh"/>
          </div>
          <div className="flex flex-col w-full box-border overflow-auto cursor-pointer">
            {currentItems.map((_, index) => (
              <InventoryDetailList texts={texts} key={index} width="11vw" fontWeight="400" fontSize="2vh" lastBtn={lastBtn} editBtn={editBtn} detailBtn={detailBtn} border="1px solid #118CF0" color="#fff" detailedBtn={detailedBtn}/>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <BottomPaginationContainer
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            inventoryItems={Array.from({ length: totalItems })}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage} // Pass down setItemsPerPage
          />
        </div>
      </div>
    </div>
  );
};

export default MainAllData;
