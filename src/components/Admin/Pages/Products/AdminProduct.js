import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { AppstoreAddOutlined, ToolOutlined } from "@ant-design/icons";
import Products from './ProductsList';

const AdminProduct = () => {
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
  };
  return (
    <div className="admin-product">
      <div className="admin-product-link">
        <Link to="/admin/products/create" className="add-product">
          <AppstoreAddOutlined />
        </Link>
      </div>
      <Products />
      <div className="table-footer">
        <select name="kieuTimSanPham">
          <option value="ma">Tìm theo mã</option>
          <option value="ten">Tìm theo tên</option>
        </select>
        <input type="text" placeholder="Tìm kiếm..." style={{height: '23px'}}/>
      </div>
    </div>
  )
}

export default AdminProduct