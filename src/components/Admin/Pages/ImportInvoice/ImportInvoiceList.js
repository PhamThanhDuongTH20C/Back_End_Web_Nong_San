import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const ImportInvoiceList = () => {
  const [userInfo, setUserInfo] = useState({});

  const [ImportInvoices, setImportInvoices] = useState([]);
  useEffect(() => {
    fetch('https://localhost:7225/api/ImportInvoices')
      .then((response) => response.json())
      .then((data) => {
        setImportInvoices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);




  
  useEffect(() => {
    ImportInvoices.forEach((invoice) => {
      axios
        .get(`https://localhost:7225/api/Accounts/${invoice.applicationUserId}`)
        .then((response) => {
          const user = response.data;
          setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [invoice.applicationUserId]: user,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [ImportInvoices]);
  return (
    <div className="admin-product-list">
      <Link to="/admin/import-invoice/create" className="add-product">
        <button className='btn-import' >Nhập hàng</button>
      </Link>
      <h4 style={{ textAlign: 'center' }}>Thông tin hóa đơn nhập</h4>
      <table>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Mã hóa đơn</th>
            <th>Nhân viên nhập hàng</th>
            <th>Ngày nhập</th>
            <th>Tổng tiền</th>
            <th>Hoạt động</th>
          </tr>
        </thead>
        <tbody>
          {ImportInvoices.map((pro, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{pro.code}</td>
              <td>{userInfo[pro.applicationUserId]?.fullName}</td>
              <td>{format(new Date(pro.issuedDate), "dd/MM/yyyy HH:mm:ss")}</td>
              <td>{pro.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
              <td>
                <Link to={`/admin/invoice/invoice-detail?id=${pro.id}`}>
                  <FormOutlined></FormOutlined>
                </Link>
              </td>
            </tr>)

          )}
        </tbody>
      </table>

    </div >
  )
}

export default ImportInvoiceList
