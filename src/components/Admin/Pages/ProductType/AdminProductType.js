import React from 'react'
import ProductType from './ProductTypeList';
import { Link } from "react-router-dom";
import { AppstoreAddOutlined, ToolOutlined } from "@ant-design/icons";

const AdminProductType = () => {
  return (
    <div className="admin-product">
      <div className="admin-product-link">
        <Link to="/admin/producttype/create" className="add-product">
          <AppstoreAddOutlined />
        </Link>
      </div>
      <ProductType />
      {/* <div className="table-footer">
        <select name="kieuTimSanPham">
          <option value="ma">Tìm theo mã</option>
          <option value="ten">Tìm theo tên</option>
        </select>
        <input type="text" placeholder="Tìm kiếm..." style={{height:'23px'}}/>
      </div> */}
    </div>
  )
}

export default AdminProductType