import DashBoard from "../Components/Dashboard";
import TopLabel from "../Components/TopLabel";

const Dashboard = () => {
    return (
      <div className="w-full h-full overflow-auto bg-[#f8f9ff] flex flex-col gap-5">
        <TopLabel label={"Dashboard"} isBtnHide={false} link={false} borderBottom="1px solid #118CF0" detailBtn={false}/>
        <DashBoard/>
      </div>
    )
  };
  
  export default Dashboard;