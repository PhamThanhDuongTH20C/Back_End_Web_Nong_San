import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ImportInvoiceEdit = () => {

    return (
        <div className="admin-create">
            <div>
                <h3>Sửa nhập hàng</h3>
                {/* {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>} */}
                <form
                    className="admin-create-product"
                    encType="multipart/form-data"
                >
                    <div className="table-row">
                        <div className="table-cell">
                            <label>Tên sản phẩm:</label>
                        </div>
                        <div className="table-cell">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">
                            <label>Nhà cung cấp:</label>
                        </div>
                        <div className="table-cell">
                            <select>
                                <option value="">-- Chọn nhà cung cấp --</option>
                                <option value="nha-cung-cap-1">Nhà cung cấp 1</option>
                                <option value="nha-cung-cap-2">Nhà cung cấp 2</option>
                                <option value="nha-cung-cap-3">Nhà cung cấp 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">
                            <label>Giá nhập:</label>
                        </div>
                        <div className="table-cell">
                            <textarea type="text" />
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">
                            <label>Số lượng:</label>
                        </div>
                        <div className="table-cell">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">
                            <label>Hạn sử dụng:</label>
                        </div>
                        <div className="table-cell">
                            <input type="datetime" />
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">
                            <label>Tổng tiền:</label>
                        </div>
                        <div className="table-cell">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">
                            <label>Trạng thái:</label>
                        </div>
                        <div className="table-cell">
                            <input
                                type="checkbox"
                                className='status-check'
                            />
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell"></div>
                        <div className="table-cell">
                            <button type='submit'>Cập Nhật</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ImportInvoiceEdit
