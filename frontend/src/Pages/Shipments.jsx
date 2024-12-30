import MainAllData from "../Components/MainAllData";
import TopLabel from "../Components/TopLabel"
import Products from './Products';

const Shipments = () => {
    return (
    <>
      <MainAllData label="Shipments" isBtnHide={true} texts={['Customer', 'Data', 'Shipment #', 'Sales Order #', 'Package #', 'Tracking #', 'Carrier', 'Status', 'Shipment Rate']} btnContent={["Filter"]} lastBtn={true} editBtn={["Edit"]} detailedBtn={true} link={true} detailBtn={true} border="1px solid #118CF0" color="#118CF0"/>
    </>
    )
  };
  
  export default Shipments;