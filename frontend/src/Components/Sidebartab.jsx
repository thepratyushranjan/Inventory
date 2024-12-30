const Sidebartab = ({ name, icon }) => {
  return (
    <div
      className={`flex gap-[2vh] items-center py-[3vh] px-[1vh] h-[9vh] cursor-pointer transition-colors select-none shadow-md rounded-lg bg-white m-[8px]`}
    >
      {icon && (
        <img
          src={icon}
          alt={`${name} icon`}
          className="w-[1.5vw] h-[3.5vh] ml-[1.5vh] select-none"
        />
      )}
      <span className="font-medium text-[2vh]">{name}</span>
    </div>
  );
};

export default Sidebartab;
