import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const { format, parseISO } = require('date-fns');

const OrderEdit = () => {
    const [show, setShow] = useState(false);
    const [resean, setresean] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const [Invoices, setInvoices] = useState([]);
    const [isCancel, setisCancel] = React.useState(false);
    const [confirmInvoice, setconfirmInvoice] = React.useState(false);
    const [isShipping, setisShipping] = React.useState(false);
    const [isSuccess, setisSuccess] = React.useState(false);
    const [statuss, setstatuss] = React.useState(false);
    const [ships, setships] = React.useState(false);
    const [shippings, setshippings] = React.useState(false);
    const [shipSuccecss, setshipSuccecss] = useState('2023-10-16T10:30:00.000Z');
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [mess, setmess] = useState('');
    useEffect(() => {

        axios
            .get("http://127.0.0.1:5001/api/invoices/SearchInvoice/" + id)
            .then((response) => {
                // Assuming response.data is an array of objects
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const orderData = response.data[0].order; // Access the "order" object
                    setInvoices(orderData);
                    console.log("Invoices1", orderData.updatedAt);
                    setshipSuccecss(orderData.updatedAt)
                    console.log("Invoices1ư", response.data);
                    const statusOrder = response.data[0].statusOrder;
                    console.log("statusOrder", statusOrder);
                    setisCancel(statusOrder.isCancel);
                    setisShipping(statusOrder.isShipping)
                    setisSuccess(statusOrder.isSuccess)
                    setconfirmInvoice(statusOrder.confirmInvoice)
                    setOption1Disabled(statusOrder.confirmInvoice)
                    setOption1Disabled1(statusOrder.isShipping)
                    setOption1Disabled2(statusOrder.isSuccess)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        if (confirmInvoice === false) {
            setmess("Đơn Hàng Chờ Xách Nhận");
        } else if (isShipping === false) {
            setmess("Đơn Hàng Chờ Vận Chuyển");
        } else if (isSuccess === false) {
            setmess("Đơn Hàng Đang Giao");
        } else {
            setmess("Đơn Hàng Đã Giao Thành Công");
        }
    }, [confirmInvoice, isShipping, isSuccess]);
    const updatedInvoice = (statuss, ships, shippings) => {
        const data = {
            "isCancel": false,
            "confirmInvoice": statuss,
            "isShipping": ships,
            "isSuccess": shippings
        }
        const token = localStorage.getItem('accessToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        axios.put("http://127.0.0.1:5001/api/invoices/updateinvoice/" + id, data, config)
            .then(response => {
                window.location.reload()
            })
            .catch(error => {
                console.error('Failed to update the invoice:', error);
            })
    }
    const handleNameChange1 = (e) => {
        setresean(e.target.value);
    };
    const Huydonhang = (rea) => {
        const data = {
            "isCancel": true,
            "confirmInvoice": false,
            "isShipping": false,
            "isSuccess": false
        }
        const token = localStorage.getItem('accessToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        axios.put("http://127.0.0.1:5001/api/invoices/updateinvoice/" + id, data, config)
            .then(response => {
                window.location.reload()
            })
            .catch(error => {
                console.error('Failed to update the invoice:', error);
            })
    }

    const [selectedOption, setSelectedOption] = useState('');
    const [isOption1Disabled, setOption1Disabled] = useState(false);
    const [isOption1Disabled1, setOption1Disabled1] = useState(false);
    const [isOption1Disabled2, setOption1Disabled2] = useState(false);
    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        const value = event.target.value;
        setSelectedOption(selectedValue);
        if (value === "option1") {
            setstatuss(true);
        } else
            if (value === "option2") {
                setships(true);
                setstatuss(true);
                console.log("ships", ships);
            } else
                if (value === "option3") {
                    setshippings(true);
                    setships(true);
                    setstatuss(true);
                    console.log("shippings", shippings);
                }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisableSubmit(false);
    };

    return (
        <div className="admin-create">
            <div>
                <div className="centered-heading">
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontWeight: 'bold' }}>CẬP NHẬT ĐƠN HÀNG</h2>
                    </div>

                </div>
                {/* {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>} */}
                <form
                    className="admin-create-product"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >
                    <div className="table-row">
                        <div className="table-cell">
                            <label>Mã đơn: </label>
                        </div>
                        <div className="table-cell">
                            <input type="text" defaultValue={Invoices.code} disabled />
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">
                            <label>Khách hàng:</label>
                        </div>
                        <div className="table-cell">

                            <input type="text" placeholder={Invoices.fullName} disabled />

                        </div>
                    </div>

                    <div className="table-row">
                        <div className="table-cell">
                            <label>Địa chỉ:</label>
                        </div>
                        <div className="table-cell">
                            <input type="text" placeholder={Invoices.shippingAddress} disabled />
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">
                            <label>Tổng tiền:</label>
                        </div>
                        <div className="table-cell">
                            {Invoices && Invoices.total !== undefined ? (
                                <input
                                    type="text"
                                    placeholder={Invoices.total.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                    disabled
                                />
                            ) : (

                                <p>Total not available</p>
                            )}

                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">
                            <label>Ngày Lập:</label>
                        </div>
                        <div className="table-cell">
                            <input type="text" placeholder={format(new Date(shipSuccecss), 'dd/MM/yyyy HH:mm:ss')} disabled />
                        </div>
                    </div>

                    <div className="table-row">
                        <div className="table-cell">
                            <label>Trạng thái:</label>
                        </div>
                        <div className="table-cell">
                            {mess}
                        </div>

                    </div>
                    <div className="table-row">
                        <div className="table-cell">
                            <label></label>
                        </div>
                        <div className="table-cell">
                            <div>
                                <select
                                    style={{
                                        width: '300px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        outline: 'none',
                                        backgroundColor: 'white',
                                    }}
                                    value={selectedOption}
                                    onChange={handleOptionChange}
                                >
                                    <option value="">CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG</option>
                                    <option value="option1" disabled={isOption1Disabled}>
                                        ĐÃ XÁCH NHẬN
                                    </option>
                                    <option value="option2" disabled={isOption1Disabled && isOption1Disabled1}>
                                        ĐÃ GIAO HÀNG CHO SHIPPER
                                    </option>
                                    <option value="option3" disabled={isOption1Disabled && isOption1Disabled1 && isOption1Disabled2}>
                                        ĐÃ GIAO HÀNG THANH CÔNG
                                    </option>
                                </select>

                            </div>
                        </div>

                    </div>

                </form>
                <div className="d-flex justify-content-center mt-4">
                    <div className="btn btn-solid-primary btn--m btn--inline btn--color" aria-disabled="false" onClick={() => updatedInvoice(statuss, ships, shippings)}>
                        Cập nhật đơn hàng
                    </div>
                    <Button
                        variant="primary"
                        onClick={handleShow}
                        style={{ marginLeft: '20px', backgroundColor: 'red' }}
                        disabled={isShipping || isSuccess}
                    >
                        Hủy Đơn Hàng
                    </Button>

                </div>

                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Lý Do Hủy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>  <input type="text" value={resean} onChange={handleNameChange1} /></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={() => Huydonhang(resean)}>
                            Hủy đơn hàng
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default OrderEdit
