import MainAllData from "../Components/MainAllData";

const Products = () => {
  return (
    <>
      <MainAllData label="Inventory" isBtnHide={true} texts={['Name', 'Description', 'SKU', 'Type', 'Stock', 'Rate']} btnContent={["Filter"]} optionInput={false} link={true} lastBtn={false} detailBtn={true} border="1px solid #118CF0" color="#118CF0" />
    </>
  );
};

export default Products;
