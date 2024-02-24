import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { AppstoreAddOutlined, ToolOutlined, SearchOutlined  } from "@ant-design/icons";
import OrderList from './OrderList';

const AdminOrder = () => {
  const [searchType, setSearchType] = useState('ma');
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Thực hiện tìm kiếm sản phẩm dựa trên searchType và searchKeyword
    // ...
  };
  return (
    <div className="admin-product">
      <div className="admin-product-link">
      </div>
      <OrderList />
    </div>
  )
}

export default AdminOrder