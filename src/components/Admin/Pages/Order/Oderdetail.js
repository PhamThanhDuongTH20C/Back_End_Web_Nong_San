import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import "./styles.css"


const InvoiceDetails = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState({});
  const codeInvoice = params.get('id').substring(1);
  const [tt, settt] = useState(0);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5001/api/invoices/get-detail-invoice/${encodeURIComponent("#" + id)}`)
      .then((response) => {
        const { invoiceDetail } = response.data;
        setInvoices(invoiceDetail);
        setProducts(response.data.products);
        settt(response.data.order.total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);


  // Format tiền VND
  const formatCurrency = (amount) => {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  return (
    <div className="invoice-details">



      <div className="centered-heading">
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontWeight: 'bold' }}>CHI TIẾT ĐƠN HÀNG</h2>
        </div>

      </div>

      <Table className="invoice-table">
        <thead>
          <tr>
            <th>Mã SẢN PHẨM</th>
            <th>Tên SẢN PHẨM</th>
            <th className="text-right">ĐƠN GÍA</th>
            <th>SỐ LƯỢNG</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoiceItem, index) => (
            <tr key={index}>
              <td>{invoiceItem.sku}</td>
              <td>{products[index]?.product?.productName || 'N/A'}</td>
              <td>
                {invoiceItem.sellingPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td>{invoiceItem.quantity}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan="3"></td>
            <td className="text-right total">
              Tổng Tiền: {formatCurrency(tt)}
            </td>
          </tr>
        </tfoot>
      </Table>

    </div>
  );
}

export default InvoiceDetails;