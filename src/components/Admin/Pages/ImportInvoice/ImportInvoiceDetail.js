import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ImportInvoice.css'
import { format } from 'date-fns';
import { Link, useLocation } from 'react-router-dom';
const ImportInvoiceDetail = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = parseFloat(params.get('id'));
    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
    const[data1,setdata1] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://localhost:7225/api/admin/ImportInvoiceDetails/importdeta?importInvoiceId=${id}`);
            console.log("sdsdasd",response.data)          
            setData(response.data);
          } catch (error) {
            console.error(error);
          }
        };     
        fetchData();
      }, []);
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://localhost:7225/api/ImportInvoices/${id}`);
            console.log("sdsdasd",response.data)          
            setdata1(response.data);
          } catch (error) {
            console.error(error);
          }
        };     
        fetchData();
      }, []);

      useEffect(() => {
        const fetchProductData = async () => {
          try {
            const productDataPromises = data.map(async (item, index) => {
              const response = await axios.get(`https://localhost:7225/api/Products/id/${item.productId}`);          
             console.log("product", response.data)
              return { index, data: response.data };
            });
      
            const productDataArray = await Promise.all(productDataPromises);
            const productDataObject = [];
      
              productDataArray.forEach((item) => {
              productDataObject[item.index] = item.data;
              console.log("Log1",productDataObject)
            });
      
            setProduct(productDataObject);
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchProductData();
      }, [data]);
      

  const namee=  sessionStorage.getItem('username');
  const total = data.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const totals = data.reduce((acc, item) => acc + item.quantity, 0);
    return (
        
        <div className="invoice-detail-container">
            <h2 className="invoice-title">Hóa đơn nhập hàng - Mã hóa đơn: {data1.code}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {data1 && data1.issuedDate && (
        <p>Ngày nhập: {format(new Date(data1.issuedDate), 'dd/MM/yyyy HH:mm:ss')}</p>
  )}
                <p>Nhân viên nhập hàng: {namee}</p>
            </div>
            <h3>Chi tiết đơn hàng:</h3>
            <table className="invoice-table" style={{marginBottom:'20px'}}>
                <thead>
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index.id}>
                   
                        <td>{product?.[index]?.[0]?.productId}</td>
                        <td>{product?.[index]?.[0]?.name} </td>
                        <td>{item.quantity}</td>
                        <td>{item.unitPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        <td>{(item.quantity*item.unitPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    </tr>
                    ))}

                </tbody>
            </table>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <p>Tổng số lượng: {totals}</p>
                <p>Tổng tiền: {total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            </div>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
                <p>Phương thức thanh toán: Tiền mặt</p>
              
            </div>
        </div>
    )
}

export default ImportInvoiceDetail
