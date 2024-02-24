import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormOutlined, SearchOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { DeleteOutlined, DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import "./OrderList.css"

const OrderList = () => {
  const [mess, setmess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [products, setProducts] = useState([]);
  const [productss, setProductsss] = useState([]);
  const [status, setstatus] = React.useState(false);
  const [ship, setship] = React.useState(false);
  const [cancel, setcancel] = React.useState(false);
  const [shipping, setshipping] = React.useState(false);
  const [shipSuccecs, setshipSuccecs] = React.useState(false);
  const [succescfull, setsuccescfull] = React.useState(false);
  const [totalProducts, settotalProducts] = useState(0);
  const [totalPages, settotalPages] = useState(1);
  useEffect(() => {
    axios.get('http://127.0.0.1:5001/api/invoices/get-allInvoice?page=1&pageSize=8')
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.invoices);
          console.log(response.data.totalInvoices)
          settotalProducts(response.data.totalInvoices)
          settotalPages(Math.ceil((response.data.totalInvoices) / pageSize))
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  }

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("searchTerm", searchTerm);
    if (searchTerm !== '') {
      axios.get('http://127.0.0.1:5001/api/invoices/SearchInvoice/' + searchTerm)
        .then((response) => {
          if (response.status === 200) {
            setProducts(response.data);
            console.log("sad000",response.data);
          } else {
            console.error('Error fetching data:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
  const [selectedButton, setSelectedButton] = useState("all");
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setCurrentPage(1); // Reset to the first page when switching categories
    // Define the endpoint for the selected button
    let endpoint = '';
    switch (buttonName) {
      case 'all':
        endpoint = 'get-allInvoice';
        break;
      case 'waitingForPickup':
        endpoint = 'getInvoicesByConfirmInvoice';
        break;
      case 'inTransit':
        endpoint = 'getInvoicesByIsSuccess';
        break;
      case 'pending':
        endpoint = 'getInvoicesByisShipping';
        break;
      case 'canceled':
        endpoint = 'getInvoicesByIsCancel';
        break;
      default:
        endpoint = 'get-allInvoice'; // Handle any other button or default action
    }
    axios
      .get(`http://127.0.0.1:5001/api/invoices/${endpoint}?page=1&pageSize=${pageSize}`)
      .then((response) => {
        if (response.status === 200) {
          settotalProducts(response.data.totalItems || response.data.totalInvoices || response.totalItems);
          setProducts(response.data.invoices||response.data.responses);
          console.log("100",response.data.totalItems || response.data.totalInvoices || response.totalItems)
          settotalPages(Math.ceil((response.data.totalItems || response.data.totalInvoices || response.data) / pageSize))
          // Fetch data for the new category here
          // ...
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handlePageChange = (newPage) => {
    console.log("totalPages",totalPages)
    setCurrentPage(newPage);
    const endpoint = getEndpoint();
    let startPage = Math.max(1, newPage - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }
    if(totalPages)
    axios
      .get(`http://127.0.0.1:5001/api/invoices/${endpoint}?page=${newPage}&pageSize=8`)
      .then((response) => {
        settotalProducts(response.data.totalItems || response.data.totalInvoices || response.totalItems);
        setProducts(response.data.invoices||response.data.responses);
        console.log("sadasd",response.data.totalItems || response.data.totalInvoices || response.totalItems)
        settotalPages(Math.ceil((response.data.totalItems || response.data.totalInvoices || response.data) / pageSize))
        setCurrentPage(newPage);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      console.log("totalPages",totalPages)
  };

  const getEndpoint = () => {
    switch (selectedButton) {
      case 'all':
        return 'get-allInvoice';
      case 'waitingForPickup':
        return 'getInvoicesByConfirmInvoice';
      case 'inTransit':
        return 'getInvoicesByIsSuccess';
      case 'pending':
        return 'getInvoicesByisShipping';
      case 'canceled':
        return 'getInvoicesByIsCancel';
      default:
        return '';
    }
  };

  useEffect(() => {
    const endpoint = getEndpoint();

    axios
      .get(`http://127.0.0.1:5001/api/invoices/${endpoint}?page=1&pageSize=${pageSize}`)
      .then((response) => {
        if (response.status === 200) {
          settotalProducts(response.data.totalItems || response.data.totalInvoices || response.data);
          setProducts(response.data.invoices||response.data.responses);
          console.log("sadasd",response.data.invoices||response.data.responses)
          settotalPages(Math.ceil((response.data.totalItems || response.data.totalInvoices || response.data) / pageSize))
          // Fetch data for the selected category and page
          // ...
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [selectedButton]);
  // Chuyển đổi trang
  const pageSize = 8; // Kích thước trang
  const pagesToShow = 3; // Number of pages to display at a time
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = startPage + pagesToShow - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }
  let pages = [];
  if(totalPages >0){
    pages=Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }
  const sortedProducts = products.slice().sort((a, b) => {
    // Convert the dates to comparable values (timestamps) for sorting
    const dateA = new Date(a.order.updatedAt).getTime();
    const dateB = new Date(b.order.updatedAt).getTime();
    
    // Sort in ascending order
    return dateA - dateB;
  });
  return (
    <div className='admin-product-list scrollable-container'>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form className="search-form" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm Kiếm Theo Mã Đơn Hàng..."
                  onChange={handleSearchInputChange}
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-primary">
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </form>
            <div className="button-group" style={{ whiteSpace: 'nowrap' }}>
              <button
                style={{
                  display: 'inline-block',
                  backgroundColor: selectedButton === 'all' ? '#3498db' : '#cccccc',
                  color: selectedButton === 'all' ? 'white' : '',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  margin: '5px',
                }}
                onClick={() => handleButtonClick('all')}
              >
                Tất Cả
              </button>
              <button
                style={{
                  display: 'inline-block',
                  backgroundColor: selectedButton === 'canceled' ? '#e74c3c' : '#cccccc',
                  color: selectedButton === 'canceled' ? 'white' : '',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  margin: '5px',
                }}
                onClick={() => handleButtonClick('canceled')}
              >
                Đơn hàng đã hủy
              </button>
              <button
                style={{
                  display: 'inline-block',
                  backgroundColor: selectedButton === 'waitingForPickup' ? '#f39c12' : '#cccccc',
                  color: selectedButton === 'waitingForPickup' ? '#333' : '',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  margin: '5px',
                }}
                onClick={() => handleButtonClick('waitingForPickup')}
              >
                Đơn hàng chờ xách nhận
              </button>
              <button
                style={{
                  display: 'inline-block',
                  backgroundColor: selectedButton === 'pending' ? '#f1c40f' : '#cccccc',
                  color: selectedButton === 'pending' ? '#333' : '',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  margin: '5px',
                }}
                onClick={() => handleButtonClick('pending')}
              >
                Đơn hàng chờ vận chuyển
              </button>
              <button
                style={{
                  display: 'inline-block',
                  backgroundColor: selectedButton === 'inTransit' ? '#27ae60' : '#cccccc',
                  color: selectedButton === 'inTransit' ? 'white' : '',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  margin: '5px',
                }}
                onClick={() => handleButtonClick('inTransit')}
              >
                Đơn hàng đang giao
              </button>
            </div>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Địa chỉ</th>
            <th>Tổng tiền</th>
            <th>Ngày giờ</th>
            <th>Trạng Thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((invoice, index) => (
            <tr key={invoice.order._id}>
              <td>{index + 1}</td>
              <td>{invoice.order.code}</td>
              <td>{invoice.order.fullName}</td>
              <td>{invoice.order.shippingAddress}</td>
              <td>
                {invoice.order.total.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </td>
              <td>
                {format(new Date(invoice.order.updatedAt), 'dd/MM/yyyy HH:mm:ss')}
              </td>
              <td>
                {invoice.statusOrder.isCancel
                  ? 'Đã hủy'
                  : !invoice.statusOrder.confirmInvoice
                    ? 'Đơn Hàng Chờ Xách Nhận'
                    : !invoice.statusOrder.isShipping && invoice.statusOrder.confirmInvoice
                      ? 'Đơn Hàng Chờ Vận Chuyển'
                      : !invoice.statusOrder.isSuccess && invoice.statusOrder.isShipping
                        ? 'Đơn Hàng Đang Giao'
                        : invoice.statusOrder.isSuccess && invoice.statusOrder.isShipping
                          ? 'Đơn Hàng Đã Giao Thành Công'
                          : ''}
              </td>
              <td style={{ width: '13%' }}>
                <Link to={`/admin/order/detail?id=${invoice.order.code.substring(1)}`}>
                  <SearchOutlined />
                </Link>
                {invoice.statusOrder.shipSuccecs === true ||
                  invoice.statusOrder.isCancel === true ? (
                  <Link to="">
                    <FormOutlined
                      onClick={(e) => e.preventDefault()}
                      style={{ pointerEvents: 'none', opacity: 0.5 }}
                    />
                  </Link>
                ) : (
                  <Link to={`/admin/order/update?id=${invoice.order.code.substring(1)}`}>
                    <FormOutlined />
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {currentPage > 1 && (
          <button className="pagination-button" onClick={() => handlePageChange(currentPage - 1)}>
            <DoubleLeftOutlined />
          </button>
        )}
        {startPage > 1 && (
          <button className="pagination-button" onClick={() => handlePageChange(1)}>
            1
          </button>
        )}
        {startPage > 2 && (
          <span className="pagination-dots">...</span>
        )}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
        {endPage < totalPages && (
          <button className="pagination-button" onClick={() => handlePageChange(endPage + 1)}>
            <DoubleRightOutlined />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderList;