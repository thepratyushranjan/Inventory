import Text from "./Text"
import Button from "./Button"
import DetailedBtn from "./DetailedBtn"


const InventoryDetailList = ({
  texts = [],
  btnContent = [],
  editBtn=[],
  lastBtn,
  width = '11vh',
  borderTop,
  fontSize="2vh",
  fontWeight="500",
  border,
  color,
  }) => {
    return(
    <div style={{borderTop}} className="py-[1.5vh] h-[10vh] px-[2.5vw] flex items-center bg-white justify-center border border-x-0 border-t-0 border-b-[#0000001A]">
        <input type="checkbox" className="focus:outline-none focus:border-none mr-[3vh]"/>
        <div className="flex w-full items-center justify-center">
          {texts && texts.map((textData, index) => (
          <Text
            key={`text-${index}`}
            text={textData} 
            fontSize={fontSize}
            fontWeight={fontWeight}
            width={width}
          />
        ))}
        {(editBtn || lastBtn) && (
  <div
    style={{ width: editBtn || lastBtn ? "20%" : "0px" }}
    className="w-1/5 flex gap-2"
  >
    {editBtn &&
      editBtn.map((buttonData, index) => (
        <Button
          key={`button-${index}`}
          color={color}
          border={border}
          backgroundColor="#118CF0"
          btnContent={buttonData} // Assuming this is the correct content
          paddingInline="20px"
          paddingBlock="1px"
          {...buttonData}
        />
      ))}
    {lastBtn && <DetailedBtn border="1px solid #118CF0" color="#118CF0" />}
  </div>
)}

        </div>
    </div>
  )
}

export default InventoryDetailList