import React, { useState, useEffect, useRef } from 'react';
import { createProductTypeApi } from '../../../../api/ProductTypeList';
import { Modal, Button } from 'react-bootstrap';
function normalizeString(inputString) {

  const stringWithoutDiacritics = inputString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');


  const stringWithoutD = stringWithoutDiacritics.replace(/đ/g, 'd');


  const normalizedText = stringWithoutD.replace(/\s+/g, '').toLowerCase();

  return normalizedText;
}



const CreateProductType = () => {
  const [categoryID, setCategoryID] = useState('');
  const [name, setName] = useState('');
  const [parentCategoryID, setParentCategoryID] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [categoryIDError, setCategoryIDError] = useState('');
  const [nameError, setNameError] = useState('');
  const [parentCategoryIDError, setParentCategoryIDError] = useState('');
  const [show, setShow] = useState(false);
  const [brands, setbrands] = useState([]);
  const handleNameChange = (e) => {
    setCategoryID(e.target.value);
    setCategoryIDError('');
  };

  const handleStatusChange1 = (e) => {
    setName(e.target.value);
    setNameError('');
  };

  const handleStatusChange = (e) => {
    setParentCategoryID(e.target.value);

  };

  const handleCreate = async (id) => {
    try {
      let hasError = false;
      if (!name) {
        setNameError('Vui lòng điền Tên Loại Sản Phẩm.');
        hasError = true;
      }
      if (hasError) {
        setErrorMessage('Vui lòng điền đầy đủ thông tin.');
        setSuccessMessage('');
      } else {
        const newProductType = {
          categoryID: normalizeString(name.trim()),
          name: name.trim(),
          parentCategoryID: parentCategoryID
        };
        // console.log("dasdas",newProductType)

        await createProductTypeApi(newProductType);

        setCategoryID('');
        setName('');
        setShow(true)
        setParentCategoryID('');
        setSuccessMessage('Tạo loại sản phẩm thành công');
        setErrorMessage('');
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage('');
      setErrorMessage('Tạo sản phẩm thất bại');
    }
  };
  const handleClose = () => {
    window.location.reload()
    setShow(false)
  }
  useEffect(() => {
    fetch('http://127.0.0.1:5001/api/categories/getCategoryID')
      .then((response) => response.json())
      .then((data) => {
        setbrands(data);
      })
      .catch((error) => console.log(error));
  })
  return (
    <div className="admin-create">
      <div className="centered-heading">
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontWeight: 'bold' }}>TẠO MỚI LOẠI SẢN PHẨM</h2>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>THÀNH CÔNG</Modal.Title>
        </Modal.Header>
        <Modal.Body>LOẠI SẢN PHẨM ĐÃ THÊM THÀNH CÔNG</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <form className="admin-create-product" encType="multipart/form-data">

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
          <select style={{
            width: '300px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            outline: 'none',
            backgroundColor: 'white',
          }} value={parentCategoryID} onChange={handleStatusChange}>
            <option value="">Chọn Danh Mục</option>
            {brands.map((brands) => (
              <option key={brands.categoryID} value={brands.categoryID}>
                {brands.categoryID}
              </option>
            ))}
          </select>
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
            <button type="button" onClick={handleCreate}>Tạo Mới </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProductType;
