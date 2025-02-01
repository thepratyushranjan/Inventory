const Button = ({
  btnContent,
  editBtn,
  color,
  backgroundColor,
  border,
  paddingInline = "16px",
  paddingBlock = "4px",
  onClick,
}) => {
  return (
    <button
      style={{
        backgroundColor,
        color,
        border,
        paddingInline,
        paddingBlock,
      }}
      className="font-medium text-xs rounded-[3px] select-none"
      onClick={onClick}
    >
      {btnContent ? btnContent : null}
    </button>
  );
};

export default Button;
