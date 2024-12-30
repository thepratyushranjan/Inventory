import React from 'react'
import MainAllData from "../Components/MainAllData"


const Stock = () => {
  return (
    <>
    <MainAllData label="Stock" isBtnHide={true} texts={['Product Name', 'SKU', 'Retail', 'Cost', 'Stock', 'Warehouse', 'Supplier']} btnContent={["Refresh" , "Filter"]} optionInput={false} link={true} detailBtn={true} border="1px solid #118CF0" color="#118CF0" />
  </>
  )
}

export default Stock