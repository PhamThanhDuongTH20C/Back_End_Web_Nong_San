import React, { useEffect, useState } from 'react';
import { DeleteOutlined, FormOutlined, DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import './Style.css'
import { Modal, Button } from 'react-bootstrap';

const Products = () => {
  const [Products, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Kích thước trang
  const [deleteId, setDeleteId] = useState('');
  const [show, setShow] = useState(false);
  let URL = "http://127.0.0.1:5001/";
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalProducts, settotalProducts] = useState(0);
  let URL1 = "http://127.0.0.1:5001/api/products/getall?page=1&pageSize=8";
  let URL2 = "http://127.0.0.1:5001/api/products/getname/"
  useEffect(() => {
    // Make a GET request to the API endpoint
    axios.get(URL1)
      .then((response) => {
        setProducts(response.data.products);
        console.log(response.data.totalProducts)
        settotalProducts(response.data.totalProducts)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Lấy chỉ số sản phẩm đầu và cuối của trang hiện tại

  const handleClickDelete = (id) => {
    setDeleteId(id)
    setShow(true)
    // console.log(id)
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleDeleteItem = () => {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    axios
      .delete(`http://127.0.0.1:5001/api/products/delete/${deleteId}`, config)
      .then(() => {
        setProduct((prevProducts) => prevProducts.filter((product) => product.id !== deleteId));
        setShow(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setShow(false);
      });
  };

  const handleSearch = (event) => {

    event.preventDefault();

    const searchTerm2 = encodeURIComponent(searchTerm);
    // console.log("searchTerm",)
    if (searchTerm !== '') {
      fetch(URL2 + searchTerm2)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.log(error));
    }
    settotalProducts(0)
  }
  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  }
  const handlePageChange = (newPage) => {
    axios
      .get(`http://127.0.0.1:5001/api/products/getall?page=${newPage}&pageSize=${pageSize}`)
      .then((response) => {
        setProducts(response.data.products);
        setCurrentPage(newPage);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  
  const totalPages = Math.ceil(totalProducts / pageSize);
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
  return (
    <div className='admin-product-list scrollable-container'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa sản phẩm này?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa sản phẩm này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteItem}>
            Đồng ý
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form className="search-form" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm Kiếm Theo Tên Có Dấu..."
                  onChange={handleSearchInputChange}
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-primary">
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: '50px' }}>STT</th>
            <th>SKU</th>
            <th>Hình</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số Lượng</th>
            <th>Loại Sản Phẩm</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.product._id}>
              <td style={{ width: '50px' }}>{index + 1}</td>
              <td>{product.product.sku}</td>
              <td>
                <img
                  src={URL + product.product.urlImage}
                  alt="Base64 Image"
                  width="70"
                  className="base64-image"
                />
              </td>
              <td>{product.product.productName}</td>
              <td>{product.product.sellingPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}</td>
              <td>{product.product.quantity}</td>
              <td>{product.product.categoryId}</td>
              <td>{product.product.status ? 'Active' : 'Inactive'}</td>
              <td style={{ width: "13%" }}>
                <Link onClick={() => handleClickDelete(product.product.sku)}>
                  <DeleteOutlined />
                </Link>
                <Link to={`/admin/products/edit/${product.product.sku}`}>
                  <FormOutlined></FormOutlined>
                </Link>
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

export default Products;