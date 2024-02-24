import React from 'react';
import ImportInvoiceDetail from './ImportInvoiceDetail';
import { useReactToPrint } from 'react-to-print';

const PrintButton = ({ invoiceRef }) => {
    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
    });

    return (
        <button onClick={handlePrint} className='btn-import'>In hóa đơn</button>
    );
};

const PrintInvoice = () => {
    const invoiceRef = React.useRef();

    return (
        <div className='invoice-detail-container'>
            <ImportInvoiceDetail ref={invoiceRef} />
            <PrintButton invoiceRef={invoiceRef} />
        </div>
    );
};

export default PrintInvoice;
