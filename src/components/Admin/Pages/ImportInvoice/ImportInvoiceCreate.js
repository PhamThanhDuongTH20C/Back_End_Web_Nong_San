import { DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ImportInvoiceCreate = () => {
  const [quantity, setQuantity] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [nhaCungCap, setNhaCungCap] = useState(0);
  const [soLuong, setSoLuong] = useState(0);
  const [donGia, setDonGia] = useState(0);
  const [thanhTien, setThanhTien] = useState(0);
  const [thanhTotalAmountTien, setTotalAmount] = useState(0);
  const [maSanPham, setMaSanPham] = useState('');
  const [tenSanPham, setTenSanPham] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cartimpor, setcartimpor] = useState([]);
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7225/api/ImportInvoices/invoice');
        setcartimpor(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);



  const requestData = async () => {

    try {
      const data = {
        "applicationUserId": '',
        "productId": maSanPham,
        "supplerid": nhaCungCap,
        "name": tenSanPham,
        "priceImport": donGia,
        "quantity": soLuong
      };

      const response = await axios.post('https://localhost:7225/api/ImportInvoices', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Response:', response.data);
      window.location.reload()
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    if (searchText) {
      axios
        .get(`https://localhost:7225/api/Products/product/${searchText}`)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };



  const handleProductClick = (product) => {
    setSelectedProduct(product);

    if (product.name !== null && product.name !== '') {
      setTenSanPham(product.name);
    }

    if (product.productId !== '' && product.productId !== null) {
      setMaSanPham(product.id);
    }
  };

  useEffect(() => {
    console.log("DEMO", tenSanPham, soLuong, donGia);
  }, [tenSanPham]);

  useEffect(() => {
    console.log("demo1", maSanPham, token);
  }, [maSanPham]);


  const calculateTotal = () => {
    let total = 0;
    cartimpor.forEach((pp) => {
      total += pp.quantity * pp.priceImport;
    });
    return total;
  };

  const createimport = async (totals, Supler) => {
    console.log("sssastola", totals, "sssuol", Supler)
    try {
      const data = {
        "code": "string",
        "applicationUserId": "string",
        "issuedDate": "2023-07-13T06:20:31.996Z",
        "supplierId": Supler,
        "total": totals,
        "status": true
      }

      const response = await axios.post('https://localhost:7225/api/ImportInvoices/Postss', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Response:', response.data);
      window.location.reload()
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const Deletedata = (id) => {
    try {
      axios.delete('https://localhost:7225/api/Carts/Cartimport/' + id);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="admin-create">
      <div className="admin-product-list scrollable-container">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '60%' }}>
            <h6>CHỌN SẢN PHẨM ĐỂ TẠO HÓA ĐƠN NHẬP</h6>
            <div>
              <input
                type="text"
                style={{ marginBottom: '10px' }}
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Tìm kiếm ..."
              />
              {searchResults.length > 0 ? (
                <ul className='search-h'>
                 {searchResults.slice(0, 6).map((product) => (
              <li key={product.id} onClick={() => handleProductClick(product)}>
                {product.name}
              </li>
            ))}
          </ul>
            ) : (
                <p></p>
              )}
              {selectedProduct && (
                <div>
                  <p>TÊN SẢN PHẨM: {selectedProduct.name}</p>
                  {tenSanPham === "" && setTenSanPham(selectedProduct.name)}
                  <p>Mã SẢN PHẨM: {selectedProduct.productId}</p>
                  {maSanPham === "" && setMaSanPham(selectedProduct.id)}
                </div>
              )}
            </div>
            <div class="product-info">
              <div class="product-info-row">
                <div class="table-cell">
                  <label>GIÁ TIỀN NHẬP: </label>
                </div>
                <div class="table-cell">
                  <input type="number" value={donGia} onChange={(e) => setDonGia(e.target.value)} />
                </div>
              </div>
            </div>

            <div class="product-info">
              <div class="product-info-row">
                <div class="table-cell">
                  <label>SỐ LƯỢNG: </label>
                </div>
                <div class="table-cell" style={{marginLeft:'28px'}}>
                  <input type="number" value={soLuong} onChange={(e) => setSoLuong(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '40%',
            marginTop: '50px',
          }}
          >
            <button
              onClick={() => requestData()}
              style={{ marginBottom: '10px', width: '220px' }}
              className="btn-import"
            >
              Thêm vào hóa đơn nhập
            </button>

            <button
              onClick={() => createimport(calculateTotal(), nhaCungCap)} className="btn-import" style={{ width: '220px' }}>
              Tạo hóa đơn nhập
            </button>

            <div style={{marginTop:'50px'}}>
              <label style={{ paddingRight: '3px' }}>Nhà cung cấp: </label>
              <select
                style={{ width: '200px', padding: '2px 10px' }}
                onChange={(e) =>
                  setNhaCungCap(
                    e.target.value === 'Bạn nhà nông' ? 1 : (e.target.value === 'Nông trại sạch' ? 3 : 2)
                  )
                }
              >
                <option>Bạn nhà nông</option>
                <option>Nông trại sạch</option>
                <option>Trang Trại việt</option>
              </select>
            </div>
          </div>

        </div>
        <br></br>
        <br></br>
        <h3>Hóa đơn nhập trước khi tạo</h3>
        <table>
          <thead>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          {cartimpor.map((pp, index) => (
            <tr key={index}>
              <td>{pp.productId}</td>
              <td>{pp.name}</td>
              <td>{pp.quantity}</td>
              <td>{pp.priceImport.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
              <td>{(pp.quantity * pp.priceImport).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
              <td>
                <button onClick={() => Deletedata(pp.id)}>
                  <DeleteOutlined />
                </button>
              </td>
            </tr>
          ))}
        </table>
        <div style={{ marginTop: '20px' }}>
          <label style={{ paddingRight: '10px' }}>Tổng tiền: {calculateTotal().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</label>

        </div>
      </div>

    </div>
  );
};

export default ImportInvoiceCreate;
