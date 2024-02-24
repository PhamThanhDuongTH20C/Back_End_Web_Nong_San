import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductTypeApi, updateProductTypeApi } from '../../../../api/ProductTypeList';
import { Modal, Button } from 'react-bootstrap';
function normalizeString(inputString) {
  // Bước 1: Loại bỏ dấu
  const stringWithoutDiacritics = inputString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Bước 2: Loại bỏ khoảng trắng và chuyển đổi thành chữ thường (lowercase)
  const normalizedText = stringWithoutDiacritics.replace(/\s+/g, '').toLowerCase();

  return normalizedText;
}


const EditProductType = () => {
  const { id } = useParams();
  const [categoryID, setcategoryID] = useState('');
  const [name, setname] = useState('');
  const [parentCategoryID, setparentCategoryID] = useState('');
  const [status, setStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [categoryIDError, setCategoryIDError] = useState('');
  const [nameError, setNameError] = useState('');
  const [parentCategoryIDError, setParentCategoryIDError] = useState('');
  const [show, setShow] = useState(false);
  const [brands, setbrands] = useState([]);
  useEffect(() => {
    fetchProductType(id);
  }, [id]);
  useEffect(() => {
    fetch('http://127.0.0.1:5001/api/categories/getCategoryID')
      .then((response) => response.json())
      .then((data) => {
        setbrands(data);
      })
      .catch((error) => console.log(error));
    })
  const fetchProductType = async (id) => {
    try {
      const response = await getProductTypeApi(id);
      const productType = response.data;
      setname(productType.name)
      setcategoryID(productType.categoryID);
      setparentCategoryID(productType.parentCategoryID)
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (e) => {
    setcategoryID(e.target.value);
  };

  const handleStatusChange = (e) => {
    setparentCategoryID(e.target.value);
  };
  const handleStatusChange1 = (e) => {
    setname(e.target.value);
  };
  const handleUpdate = async () => {
    let hasError = false;

      if (!categoryID) {
        setCategoryIDError('Vui lòng điền CategoryID.');
        hasError = true;
      }

      if (!name) {
        setNameError('Vui lòng điền Tên Loại Sản Phẩm.');
        hasError = true;
      }
      if (hasError) {
        setErrorMessage('Vui lòng điền đầy đủ thông tin.');
        setSuccessMessage('');
      } else {
    try {
      const updatedProductType = {
        categoryID:normalizeString(name.trim()),
        name: name.trim(),
        parentCategoryID:parentCategoryID
      };
      await updateProductTypeApi(id, updatedProductType);
      setSuccessMessage('Product type updated successfully');
      setErrorMessage('');
      setShow(true)
    } catch (error) {
      console.error(error);
      setSuccessMessage('');
      setErrorMessage('Failed to update product type');
    }}
  };
  const handleClose = () => {
    window.location.reload()
    setShow(false)
  }
  return (
    <div className="admin-create">
           <div className="centered-heading">
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontWeight: 'bold' }}>CẬP NHẬT LOẠI SẢN PHẨM</h2>
        </div>

      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>THÀNH CÔNG</Modal.Title>
        </Modal.Header>
        <Modal.Body>LOẠI SẢN PHẨM ĐÃ THAY ĐỔI THÀNH CÔNG</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
     
      <form
        className="admin-create-product"
        encType="multipart/form-data"
      >
      
        <div className="table-row">
          <div className="table-cell">
            <label>Tên Loại Sản Phẩm:</label>
          </div>
          <div className="table-cell">
            <input type="text" value={name} onChange={handleStatusChange1} className='status-check' />
            <div className="input-error">{nameError}</div>
          </div>
        </div>
        <div className="table-row">
          <div className="table-cell">
            <label>Tên Danh Mục:</label>
          </div>
          <div className="table-cell">
          <select style={{
                  width: '300px',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  backgroundColor: 'white',
                }} value={parentCategoryID} onChange={handleStatusChange}>
                  <option value="">Chọn Hãng Sản Xuất</option>
                  {brands.map((brands) => (
                    <option key={brands.categoryID} value={brands.categoryID}>
                      {brands.categoryID}
                    </option>
                  ))}
                </select>
          </div>
        </div>
        <div className="table-row">
          <div className="table-cell">
            <label></label>
          </div>
          <div className="table-cell">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
        </div>
        
        <div className="table-row">
          <div className="table-cell"></div>
          <div className="table-cell">
          <button type="button" onClick={handleUpdate}>
            Cập Nhật
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProductType;
