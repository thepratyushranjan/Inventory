import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopLabel from "../Components/TopLabel";
import { companyDetail} from "../helper/helper";

const OneView = ({
  label = "Company Details",
  isBtnHide = false,
  btnContent = [],
  optionInput,
  link,
  border,
  color = "#000",
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await companyDetail(id);
        setCompany(response.data);
      } catch (err) {
        setError(err.error || "An error occurred while fetching company details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center w-full h-full justify-start box-border pr-[3%] pb-[3%] bg-[#F8F9FF]">
      <TopLabel
        label={label}
        isBtnHide={isBtnHide}
        color={color}
        backgroundColor="#fff"
        paddingBlock="14px"
        borderBottom="none"
        optionInput={optionInput}
        btnContent={btnContent}
        link={link}
        border={border}
      />

      <div className="w-full h-[2px]" style={{ backgroundColor: "#1a2b6d" }} />

      <div className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
        {company && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{company.name}</h2>
            <p><strong>Location:</strong> {company.address}</p>
            <p><strong>Contact Number:</strong> {company.contact_number.toLocaleString()}</p>
            <p><strong>License No:</strong> {company.license_no}</p>
            <p><strong>Email:</strong> {company.email}</p>
            <p><strong>Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></p>
          </>
        )}
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default OneView;
