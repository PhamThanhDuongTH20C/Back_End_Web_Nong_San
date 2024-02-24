import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
const SupplierEdit = () => {
  const [address, setAddress] = useState('');
  const [idBrand, setidBrand] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [base64Image, setBase64Image] = useState(null);
  const baseUrl = "http://127.0.0.1:5001/";
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5001/api/brands/getidBrand/${id}`)
      .then((response) => {
        const product = response.data;
        setidBrand(product.idBrand);
        setBase64Image(URL+product.urlImage);
        setName(product.name);
        console.log("ds",product)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const [nameError, setNameError] = useState('');
  const [idBrandError, setIdBrandError] = useState('');
  const [urlImageError, setUrlImageError] = useState('');
  const editsupplier = () => {
    // Initialize hasError to false
    let hasError = false;
  
    // Validate name
    if (!name) {
      setNameError('Tên Nhà Cung Cấp không được để trống.');
      hasError = true;
    }
  
    // Validate idBrand
    if (!idBrand) {
      setIdBrandError('Mã Nhà Cung Cấp không được để trống.');
      hasError = true;
    }
  
    // Validate image
    if (!base64Image) {
      setUrlImageError('Vui lòng chọn ảnh.');
      hasError = true;
    }
  
    // Check if there are any errors
    if (hasError) {
      return;
    }
  
    const data = {
      name: name,
      idBrand: idBrand,
      image: base64Image.replace(baseUrl, '')
    };
  
    axios
      .put(`http://127.0.0.1:5001/api/brands/updateidbrand/${id}`, data)
      .then((res) => {
        if (res.status === 200) {
          setShow(true);
        }
        console.log('Response:', res.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  const handleNameChange1 = (e) => {
    setidBrand(e.target.value);
  };
  const handleNameChange2 = (e) => {
    setName(e.target.value);
  };
  const handleNameChange3 = (e) => {
    setAddress(e.target.value);
  };
  const handleNameChange4 = (e) => {
    setIsAvailable(e.target.checked);
  };
  const handleNameChange5 = (e) => {
    setEmail(e.target.value);
  };
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;
        setBase64Image(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };
  let URL = "http://127.0.0.1:5001/"
  const handleClose = () => {
    window.location.reload()
    setShow(false)
  }
  const [show, setShow] = useState(false);
  return (
    <div className="admin-create">
    <div>
      <h3>Sửa Nhà Cung Cấp</h3>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>THÀNH CÔNG</Modal.Title>
          </Modal.Header>
          <Modal.Body>CẬP NHẬT HÃNG THÀNH CÔNG</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="admin-create-product" >
        <div className="table-row">
          <div className="table-cell">
            <label>Mã Nhà Cung Cấp:</label>
          </div>
          <div className="table-cell">
            <input type="text" value={idBrand} onChange={handleNameChange1} disabled />
            <div className="input-error">{idBrandError}</div>
          </div>
        </div>
        <div className="table-row">
          <div className="table-cell">
            <label>Tên Nhà Cung Cấp:</label>
          </div>
          <div className="table-cell">
            <input type="text" value={name} onChange={handleNameChange2} />
            <div className="input-error">{nameError}</div>
          </div>
        </div>
        <div className="table-row">
          <div className="table-cell">
            <label>LOGO Hãng:</label>
          </div>
          <div className="table-cell">
            <div className="file-upload">
              <label className="custom-file-upload">
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <span>CHỌN ẢNH</span>
              </label>
              
            </div>
            <div className="input-error">{urlImageError}</div>
          </div>
        </div>
        <div className="table-row">
          <div className="table-cell"></div>
          <div className="table-cell">
            {base64Image && (
              <div className="image-preview">
                <img src={base64Image} alt="Base64 Image" width="70" />
              </div>
            )}
          </div>
        </div>
        <div className="table-row">
          <div className="table-cell"></div>
          <div className="table-cell">
          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={editsupplier}
              style={{
                display: 'block',
                margin: '0 auto',
              }}
            >
              CẬP NHẬT NHÀ CUNG CẤP
            </button>
          </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default SupplierEdit;
