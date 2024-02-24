import React, { useEffect, useState } from 'react';
import { getProductTypesApi } from '../../../../api/ProductTypeList';
import { deleteProductTypeApi } from '../../../../api/ProductTypeList';
import { Link } from 'react-router-dom';
import { DeleteOutlined, FormOutlined, DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Modal, Button } from 'react-bootstrap';

const ProductTypeList = () => {

  const [productTypes, setProductTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [deleteId, setDeleteId] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getProductTypesApi();
      setProductTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // Lấy chỉ số sản phẩm đầu và cuối của trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProductType = productTypes.slice(indexOfFirstProduct, indexOfLastProduct);

  // Chuyển đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClose = () => {
    setShow(false)
  }

  const handleDeleteItem = async () => {
    try {
      await deleteProductTypeApi(deleteId);

      window.location.reload();
      setShow(false);
    } catch (error) {
      console.log('API delete error:', error);
      setShow(false);
    }
  };

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  return (
    <div className='admin-product-list scrollable-container'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa loại sản phẩm này?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa loại sản phẩm này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteItem}>
            Đồng ý
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      <table>
        <thead>
          <tr>
            <th style={{width:'20px'}}>Stt</th>
            <th>Mã Sản Phẩm</th>
            <th>Tên Sản Phẩm</th>
            <th>Nhóm Sản Phẩm</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {currentProductType.map((productType, index) => (
            <tr key={productType._id}>
              <td style={{width:'20px'}}>{indexOfFirstProduct + index + 1}</td>
              <td>{productType.categoryID}</td>
              <td>{productType.name}</td>
              <td>{productType.parentCategoryID}</td>
              <td style={{ width: "13%" }}>
                <Link onClick={() => handleClickDelete(productType.categoryID)}>
                  <DeleteOutlined />
                </Link>
                <Link to={`/admin/producttype/edit/${productType.categoryID}`}>
                  <FormOutlined />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Hiển thị phân trang */}
      <div className="pagination">
        {currentPage > 1 && (
          <button className="pagination-button" onClick={() => paginate(currentPage - 1)}>
            <DoubleLeftOutlined />
          </button>
        )}
        {Array.from({ length: Math.ceil(productTypes.length / productsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}>
            {index + 1}
          </button>
        ))}
        {currentPage < Math.ceil(productTypes.length / productsPerPage) && (
          <button className="pagination-button" onClick={() => paginate(currentPage + 1)}>
            <DoubleRightOutlined />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductTypeList;