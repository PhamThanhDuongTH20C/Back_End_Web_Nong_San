import React, { useState } from 'react';
import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';

const SupplierCreate = () => {
  const [base64Image, setBase64Image] = useState(null);
  const [base64Images, setBase64Images] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [name, setname] = useState('');
  const [idBrand, setidBrand] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);


  const handleNameChange = (e) => {
    setidBrand(e.target.value);
  };
  const handleNameChange1 = (e) => {
    setname(e.target.value);
  };
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;
        setBase64Image(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const [nameError, setNameError] = useState('');
  const [idBrandError, setIdBrandError] = useState('');
  const [urlImageError, setUrlImageError] = useState('');

  const handleSubmit = async (event) => {
    try {
      let hasError = false;

      if (!base64Image) {
        setUrlImageError('Vui lòng chọn ảnh.');
        hasError = true;
      }

      if (!idBrand) {
        setIdBrandError('Mã Nhà Cung Cấp không được để trống.');
        hasError = true;
      }
      if (!name) {
        setNameError('Tên Nhà Cung Cấp không được để trống.');
        hasError = true;
      }

      if (hasError) {
        return;
      }

      const supplierData = {
        idBrand,
        name,
        image: base64Image,
      };

      const response = await axios.post('http://127.0.0.1:5001/api/brands/createbrand', supplierData);

      if (response.status === 201) {
        setSuccessMessage('Thêm Nhà Cung Cấp Thành Công');
        setShow(true);
      } else {
        setErrorMessage('Thêm Nhà Cung Cấp Thất Bại');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleClose = () => {
    window.location.reload()
    setShow(false)
  }
  const [show, setShow] = useState(false);
  return (
    <div className="admin-create">
      <div>
        <h3>Thêm Nhà Cung Cấp</h3>
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
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form
          className="admin-create-product"
        >
          <div className="form-group">
            <label htmlFor="idBrand">Mã Nhà Cung Cấp:</label>
            <input
              type="text"
              id="idBrand"
              name="idBrand"
              value={idBrand}
              onChange={handleNameChange}
            />
            <div className="input-error">{idBrandError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Tên Nhà Cung Cấp:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange1}
            />
          </div>
          <div className="input-error">{nameError}</div>
          <div className="form-group">
            <label>LOGO Hãng:</label>
            <div className="file-upload">
             
              <div className="input-error">{urlImageError}</div>
            </div>

          </div>
          <div className="table-row">
            <div onDrop={handleFileDrop} onDragOver={handleDragOver} style={{ border: '1px dashed #ccc', padding: '10px' }}>
            <label className="custom-file-upload">
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  onDrop={handleFileDrop}
                  onDragOver={handleDragOver}
                  style={{ display: 'none' }}
                />
                <span>CHỌN ẢNH HOẶC KÉO VÀ THẢ ẢNH VÀO ĐÂY</span>
              </label>
              {base64Image && (
                <div>
                  <img src={base64Image} alt="Base64 Image" width="70" />
                </div>
              )}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                display: 'block',
                margin: '0 auto',
              }}
            >
              TẠO NHÀ CUNG CẤP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SupplierCreate
