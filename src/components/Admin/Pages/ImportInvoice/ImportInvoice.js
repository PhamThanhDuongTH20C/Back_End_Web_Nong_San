import React from 'react'
import { Link } from "react-router-dom";
import { AppstoreAddOutlined, ToolOutlined, SearchOutlined  } from "@ant-design/icons";
import ImportInvoiceList from './ImportInvoiceList';

const ImportInvoice = () => {
    return (
        <div>
            <div className="admin-product">
                <div className="admin-product-link" style={{height:'50px'}}></div>
                <ImportInvoiceList />
            </div>
        </div>
    )
}

export default ImportInvoice
