import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { AppstoreAddOutlined, ToolOutlined, SearchOutlined } from "@ant-design/icons";
import SupplierList from './SupplierList';

const Supplier = () => {
    return (
        <div className="admin-product">
            <div className="admin-product-link">
                <Link to="/admin/supplier/create" className="add-product">
                    <AppstoreAddOutlined />
                </Link>
                <Link to="/admin/supplier/update" className="add-product">
                    <ToolOutlined></ToolOutlined>
                </Link>
            </div>
            <SupplierList />
            {/* <div class="table-footer">
                <div class="timTheoNgay">
                    Từ ngày: <input type="date" id="fromDate" />
                    Đến ngày: <input type="date" id="toDate" />
                    <button>
                        <SearchOutlined className='btn-search' />
                        Tìm
                    </button>
                </div>
                <select name="kieuTimDonHang">
                    <option value="ma">Tìm theo mã đơn</option>
                    <option value="khachhang">Tìm theo tên khách hàng</option>
                    <option value="trangThai">Tìm theo trạng thái</option>
                </select>
                <input type="text" placeholder="Tìm kiếm..." onkeyup="timKiemDonHang(this)" />
            </div> */}
        </div>
    )
}

export default Supplier