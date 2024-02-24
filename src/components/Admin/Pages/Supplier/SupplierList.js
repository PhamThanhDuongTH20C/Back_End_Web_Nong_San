import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined, FormOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const SupplierList = () => {
  const [totalBrands, setTotalBrands] = useState(0);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [deleteId, setDeleteId] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = (page) => {
    axios
      .get(`http://127.0.0.1:5001/api/brands/getBrandpage?page=${page}&perPage=${pageSize}`)
      .then((response) => {
        setBrands(response.data.brands);
        setTotalBrands(response.data.totalItems);
        setCurrentPage(page);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handlePageChange = (newPage) => {
    fetchData(newPage);
  };

  const totalPages = Math.ceil(totalBrands / pageSize);
  const pagesToShow = 3;
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = startPage + pagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  const handleDeleteItem=(id)=>{
    axios.delete(`http://127.0.0.1:5001/api/brands/deletebrand/${deleteId}`)
    .then((response) => {
      console.log('Response:', response.data);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);

    });
  }
  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShow(true);
  };
  return (
    <div className='admin-product-list scrollable-container'>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa loại sản phẩm này?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa loại sản phẩm này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteItem}>
            Đồng ý
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Nhà Cung Cấp</th>
            <th>Tên Nhà Cung Cấp</th>
            <th>LOGO Thương Hiệu</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => (
            <tr key={brand.idBrand}>
              <td>{index + 1}</td>
              <td>{brand.idBrand}</td>
              <td>{brand.name}</td>
              <td>
                <img
                  src={`http://127.0.0.1:5001/${brand.urlImage}`}
                  alt="Brand Logo"
                  width="70"
                  className="base64-image"
                />
              </td>
              <td style={{ width: "13%" }}>
                <Link to={`/admin/supplier/edit?id=${brand.idBrand}`}>
                  <FormOutlined />
                </Link>
                <Link to='' onClick={() => handleClickDelete(brand.idBrand)}>
                  <DeleteOutlined />
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

export default SupplierList;
