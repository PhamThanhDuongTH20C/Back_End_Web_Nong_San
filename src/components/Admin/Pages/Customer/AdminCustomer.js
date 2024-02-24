import React from 'react'
import { Link } from "react-router-dom";
import { AppstoreAddOutlined, ToolOutlined } from "@ant-design/icons";
import CustomerList from './CustomerList';

const AdminCustomer = () => {
  return (
    <div className="admin-product">
      <CustomerList />
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

export default AdminCustomer