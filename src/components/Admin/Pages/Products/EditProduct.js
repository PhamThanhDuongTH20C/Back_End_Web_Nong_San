import React, { useState, useEffect, useRef } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomUploadAdapter from './CustomUploadAdapter';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const EditProduct = ({ match }) => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [ProductTypes, setProductTypes] = useState('');
  const [sku, setsku] = useState('');
  const [retailprice, setretailprice] = useState(Number);
  const [productName, setName] = useState('');
  const [warrantyPeriod, setwarrantyPeriod] = useState('');
  const [originalPrice, setoriginalPrice] = useState(Number);
  const [sellingPrice, setsellingPrice] = useState(Number);
  const [quantity, setquantity] = useState(Number);
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [base64Images, setBase64Images] = useState([]);
  const [status, setChecked] = React.useState(Boolean);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [contactToPurchase, setcontactToPurchase] = React.useState(Boolean);
  const [bestseller, setbestseller] =  React.useState(Boolean);
  const [brandId, setbrandId] = useState('');
  const [brandIdname, setbrandIdname] = useState('');
  const [category, setcategory] = useState([]);
  const [categoryId, setcategoryId] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [description, setDescription] = useState('');
  const editorRef = useRef(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [brands, setbrands] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [imagess, setimagess] = useState([]);
  const [imagec, setimagec] = useState([]);
  const [parentCategoryID1, setParentCategoryID1] = useState([]);
  const [parentCategoryID2, setparentCategoryID2] = useState([]);
  const [specification, setspecification] = useState([]);
  let URL = "http://127.0.0.1:5001/"
  const [description1, setDescription1] = useState('');
  const [skuError, setSkuError] = useState('');
  const [productNameError, setProductNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [originalPriceError, setOriginalPriceError] = useState('');
  const [sellingPriceError, setSellingPriceError] = useState('');
  const [retailpriceError, setretailpriceError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [categoryIdError, setCategoryIdError] = useState('');
  const [brandIdError, setBrandIdError] = useState('');
  const [warrantyPeriodError, setWarrantyPeriodError] = useState('');
  const [SpecificationsError, setSpecificationsError] = useState('');
  const [urlvideo, seturlvideo] = useState('');

  const handleCreate = async () => {

    const filteredSpecification = specification.filter((spec) => spec.title.trim() !== '' && spec.content.trim() !== '');
    // const filteredSpecification1 = specification.filter((spec) => spec.title.trim() === '' || spec.content.trim() === '');
    const filteredSpecificationFormatted = filteredSpecification.map(item => ({
      title: item.title.trim(),
      content: item.content.trim(),
    }));

    setProductData(prevProductData => ({
      ...prevProductData,
      specification: filteredSpecificationFormatted,
    }));

    const updatedImageProduct = [...productData.imageProduct, ...selectedFiles];
    const updatedProductData = {
      ...productData,
      imageProduct: updatedImageProduct,
    };


    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    let isValid = true;
    if (!sku) {
      setSkuError('Vui lòng nhập SKU');
      isValid = false;
    } else {
      setSkuError('');
    }

    if (!productName) {
      setProductNameError('Vui lòng nhập Tên Sản Phẩm');
      isValid = false;
    } else {
      setProductNameError('');
    }

    if (!description) {
      setDescriptionError('Vui lòng nhập Mô Tả');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    if (!originalPrice) {
      setOriginalPriceError('Vui lòng nhập Giá Gốc');
      isValid = false;
    } else {
      setOriginalPriceError('');
    }

    if (!sellingPrice) {
      setSellingPriceError('Vui lòng nhập Giá Bán');
      isValid = false;
    } else {
      setSellingPriceError('');
    }

    if (!quantity) {
      setQuantityError('Vui lòng nhập Số Lượng');
      isValid = false;
    } else {
      setQuantityError('');
    }

    if (!categoryId) {
      setCategoryIdError('Vui lòng chọn Loại Sản Phẩm');
      isValid = false;
    } else {
      setCategoryIdError('');
    }

    if (!brandId) {
      setBrandIdError('Vui lòng chọn Hãng Sản Xuất');
      isValid = false;
    } else {
      setBrandIdError('');
    }
    if (retailprice === 0 || retailprice === "0") {
      setretailpriceError('Vui lòng nhập Giá Bán Lẻ');
      isValid = false;
    } else {
      setretailprice('');
    }
    if (!warrantyPeriod) {
      setWarrantyPeriodError('Vui lòng nhập Thời Gian Bảo Hành');
      isValid = false;
    } else {
      setWarrantyPeriodError('');
    }
    if (specification.some(spec => spec.title === "" || spec.content === "")) {
      setSpecificationsError(" Vui lòng không để title hoặc content trống");
      isValid = false;
      // console.log("productDatasssssssssss");
    }
    if (specification.some(spec => spec.title === "" && spec.content === "")) {
      // setSpecificationsError("Vui lòng không để title và content trống");
      isValid = true;
      // console.log("productData1111111");
    }
    // console.log("filteredSpecification", filteredSpecificationFormatted);
  //  console.log("productData", updatedProductData);
    //  console.log("descriptionrước", description);
    //  console.log("description1111", description1);
    if (isValid) {
      axios
        .put(`http://127.0.0.1:5001/api/products/updateproduct/${sku}`, updatedProductData, config)
        .then((response) => {
          // console.log('Product updated successfully:', response.data);
          setShow(true);
        })
        .catch((error) => {
          console.error('Error updating product:', error);
        });
    }

  };


  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5001/api/products/get/${id}`)
      .then((response) => {
        const product = response.data;
        console.log("ASSA", product)
        setsku(product.product.sku);
        setName(product.product.productName);
        let modifiedDescription = response.data.product.description;
        // Replace <div class=\"frame-image\"><img ...><p class=\"title\">demo</p></div>
        // with <figure class="image"><img ...><figcaption>demo</figcaption></figure>
        modifiedDescription = modifiedDescription.replace(
          /<div class=\"frame-image\"><img src=\"([^"]+)\" alt=\"\"><p class=\"title\">([^<]+)<\/p><\/div>/g,
          '<figure class="image"><img src="$1" alt=""><figcaption>$2</figcaption></figure>'
        );
  
        // Replace <div class="title">DD</div> with <h3>DD</h3>
        modifiedDescription = modifiedDescription.replace(
          /<div class=\"title\">([^<]+)<\/div>/g,
          '<h3>$1</h3>'
        );
        modifiedDescription = modifiedDescription.replace(
          /<div class=\"title\">(<strong>[^<]+<\/strong>)<\/div>/g,
          '<h3>$1</h3>'
        );
        modifiedDescription = modifiedDescription.replace(
          /<div class=\"title\">(.+?)<\/strong><\/div>/g,
          '<h3>$1</strong></h3>'
        );
        // Replace <div class="title">DD</div> with <h3>DD</h3>
        modifiedDescription = modifiedDescription.replace(
          /<div class=\"title\">(.*?)<\/div>/g,
          '<h3>$1</h3>'
        )
        setDescription(modifiedDescription);

        setoriginalPrice(product.product.originalPrice);
        setsellingPrice(product.product.sellingPrice)
        setquantity(product.product.quantity);
        setretailprice(product.product.retailprice)
        setwarrantyPeriod(product.product.warrantyPeriod);
        setChecked(product.product.status);
        seturlvideo(product.product.urlvideo);
        setcontactToPurchase(product.product.contactToPurchase);
        setBase64Image(URL + product.product.urlImage)
        setspecification(response.data.specification)
        setcategoryId(response.data.product.categoryId)
        setcategoryname(response.data.category.name)
        setbrandId(response.data.product.brandId)
        setbestseller(response.data.product.bestseller)
        setbrandIdname(response.data.brand.name)
        setSelectedFiles(response.data.imageProduct)
        // console.log("description",product.product.description)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/api/brands/getbrands')
      .then((response) => response.json())
      .then((data) => {
        setbrands(data.brands);

      })
      .catch((error) => console.log(error));
    fetch('http://127.0.0.1:5001/api/categories/getall')
      .then((response) => response.json())
      .then((data) => {
        setcategory(data);
      })
      .catch((error) => console.log(error));

  }, []);

  const handleInput1 = (e, setVariable) => {
    const inputText = e.target.value;
    const numericValue = parseFloat(inputText.replace(/[^0-9.]+/g, '')); // Allow decimals
    setVariable(isNaN(numericValue) ? 0 : numericValue);
  };

  const handleKeyPress1 = (event) => {
    const validKeys = /[0-9\b\r]/;
    if (!validKeys.test(event.key)) {
      event.preventDefault();
    }
  };
  const handleInput = (e, setVariable) => {
    const inputText = e.target.value;

    // Remove any non-digit characters and keep only digits
    const numericText = inputText.replace(/\D/g, '');

    // Remove leading zeros
    const trimmedNumericText = numericText.replace(/^0+/, '');

    // Format the numeric value with thousands separators
    const formattedValue = trimmedNumericText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    setVariable(formattedValue);
  };


  const handleChange = () => {
    setChecked(!status);
  };
  const handleChange1 = () => {
    setcontactToPurchase(!contactToPurchase);
  };
  const handleChange1222 = () => {
    setbestseller(!bestseller);
  };
  useEffect(() => {
    const updatedDescription = description.replace(/<p>([^<]+)<\/p>/g, '<span class=\"content\">$1</span>')
      .replace(/<p>([^<]+<strong>[^<]+<\/strong>[^<]+)<\/p>/g, '<span class=\"content\">$1</span>')
      .replace(/<p>([\s\S]+?)<\/p>/g, '<span class=\"content\">$1</span>')
      .replace(/Base64 Image/, '')
      .replace(
        /<figure class="image"><img src="([^"]+)"><figcaption>([^<]+)<\/figcaption><\/figure>/g,
        '<div class=\"frame-image\"><img src=$1 alt=\'\' /><p class=\"title\">$2</p></div>')
      .replace(/<h2><strong>([^<]+)<\/strong><\/h2>/g, '<div class=\"title\"><strong>$1</strong></div>')
      .replace(
        /<figure class="image"><img src="([^"]+)">(?:<figcaption>([^<]+)<\/figcaption>)?<\/figure>/g,
        '<div class=\"frame-image\"><img src= $1 alt=\'\' /><p class=\"title\">$2</p></div>')
      .replace(/<figure class="image">(.+?)<\/figure>/g, '<div class=\"frame-image\">$1</div>')
      .replace(/<figcaption>([\s\S]*?)<\/figcaption>/g, '<p class=\"title\">$1</p>')
      .replace(/<img src="([^"]+)" alt="([^"]+)">/g, '<div class=\"frame-image\"><img src="$1"alt=""/><p class=\"title\">$2</p></div>')
      .replace(
        /<span class="content"><img src="([^"]+)" alt=""><\/span>/g,
        '<div class=\"frame-image\">\n  <img src="$1" alt="" />\n  <p class=\ "title\"></p>\n</div>'
      )
      //h2
      .replace(/<h2>(.*?)<\/h2>/g, '<div class=\"title\">$1</div>')
      .replace(/<h[2-4]><strong>([^<]+)<\/strong>([^<]+)<\/h[2-4]>/g, '<div class=\"title\"><strong>$1</strong>$2</div>')
      .replace(/<h[2-4]>([^<]+)<strong>([^<]+)<\/strong>([^<]+)<\/h[2-4]>/, '<div class=\"title\">$1<strong>$2</strong>$3</div>')
      .replace(/<h[2-4]>([^<]+)<strong>([^<]+)<\/strong><\/h[2-4]>/, '<div class=\"title\">$1<strong>$2</strong></div>')
      .replace(/<h2>([^<]+)<\/h2>/, '<div class=\"title\">$1</div>')
      //h3
      .replace(/<h3>(.*?)<\/h3>/g,'<div class=\"title\">$1</div>')
      .replace(/<h3><strong>([^<]+)<\/strong>([^<]+)<\/h3>/g, '<div class=\"title\"><strong>$1</strong>$2</div>')
      .replace(/<h3>([^<]+)<strong>([^<]+)<\/strong>([^<]+)<\/h3>/g, '<div class=\"title\">$1<strong>$2</strong>$3</div>')
      .replace(/<h3>([^<]+)<strong>([^<]+)<\/strong><\/h3>/g, '<div class=\"title\">$1<strong>$2</strong></div>')
      .replace(/<h3>([^<]+)<\/h3>/g, '<div class=\"title\">$1</div>')
      //h4
      .replace(/<h4>(.*?)<\/h4>/g, '<div class=\"title\">$1</div>')
      .replace(/<h4><strong>([^<]+)<\/strong>([^<]+)<\/h4>/g, '<div class=\"title\"><strong>$1</strong>$2</div>')
      .replace(/<h4>([^<]+)<strong>([^<]+)<\/strong>([^<]+)<\/h4>/g, '<div class=\"title\">$1<strong>$2</strong>$3</div>')
      .replace(/<h4>([^<]+)<strong>([^<]+)<\/strong><\/h4>/g, '<div class=\"title\">$1<strong>$2</strong></div>')
      .replace(/<h4>([^<]+)<\/h4>/g, '<div class=\"title\">$1</div>')
      .replace(/<figure class="image">([\s\S]+?)<\/figure>/g, '<div class=\"frame-image\"><img src=""alt=""/><p class=\"title\"></p></div>');

    setDescription1(updatedDescription);
  }, [description]);

  const [productData, setProductData] = useState({
    // brand: [],
    // category: [],
    imageProduct: [],
    product: [],
    specification: [],
    parentCategories: []
  });

  useEffect(() => {
    setProductData((prevProductData) => ({
      ...prevProductData,
      product: {
        ...prevProductData.product,
        description: description1.trim(),
        sku: sku.trim(),
        productName: productName.trim(),
        urlvideo: urlvideo.trim(),
        originalPrice: typeof originalPrice === 'string'
          ? parseFloat(originalPrice.replace(/[^\d.]+/g, '').replace('.', '').replace(',', '.'))
          : originalPrice,
        sellingPrice: typeof sellingPrice === 'string'
          ? parseFloat(sellingPrice.replace(/[^\d.]+/g, '').replace('.', '').replace(',', '.'))
          : sellingPrice,
        retailprice: typeof retailprice === 'string'
          ? parseFloat(retailprice.replace(/[^\d.]+/g, '').replace('.', '').replace(',', '.'))
          : retailprice,
        quantity: quantity,
        brandId: brandId,
        categoryId: categoryId,
        warrantyPeriod: warrantyPeriod.trim(),
        contactToPurchase: contactToPurchase,
        bestseller:bestseller,
        status: status
      }
    }));
  }, [retailprice, description1, sku, productName, originalPrice, sellingPrice, quantity, brandId, categoryId, warrantyPeriod, contactToPurchase, status, urlvideo,bestseller]);
  const handleFileSelect = (event) => {
    const file = event.target.files[0]; // Get the selected file from the input element

    if (file) {
      const reader = new FileReader(); // Create a new FileReader object
      reader.onload = (e) => {
        const base64Data = e.target.result; // Read the selected file as a base64 data URL
        setBase64Image(base64Data); // Update the state with the base64 data
        setSelectedFile(base64Data); // Update the selected file in the state
        const newImage = {
          sku: id,
          urlImage: base64Data,
          cardinal: true,
        };
        const newImages = [newImage];
        const updatedProductData = {
          ...productData,
          imageProduct: newImages,
        };
        setProductData(updatedProductData);
        // Log or perform any other actions with the selected file here
      };

      reader.readAsDataURL(file); // Read the selected file as a data URL
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0]; // Get the dropped file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;
        setBase64Image(base64Data);
        setSelectedFile(base64Data);
        const newImage = {
          sku: id,
          urlImage: base64Data,
          cardinal: true,
        };
        const newImages = [newImage];
        const updatedProductData = {
          ...productData,
          imageProduct: newImages,
        };
        setProductData(updatedProductData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelects = (event) => {
    const files = Array.from(event.target.files);

    // Copy the existing state to new variables
    const newFiles = [...selectedFiles];
    const newBase64Images = [...base64Images];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;

        // Create an object with unique ID to track the file
        const newFile = {
          id: new Date().getTime(), // Unique ID
          urlImage: base64Data,
          cardinal: false,
        };

        newFiles.push(newFile);
        newBase64Images.push(base64Data);

        setSelectedFiles(newFiles);
        setBase64Images(newBase64Images);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const dt = event.dataTransfer;
    const files = Array.from(dt.files);
    handleFileSelects({ target: { files } });
  };
  const handleClearFile = (index) => {
    const newFiles = [...selectedFiles];
    const newBase64Images = [...base64Images];
    const newImages = [...imagess]; // Change the variable name here

    newFiles.splice(index, 1);
    newBase64Images.splice(index, 1);
    newImages.splice(index, 1);

    setSelectedFiles(newFiles);
    setBase64Images(newBase64Images);
    setimagess(newImages);
  };

  const handleNameChange = (e) => {
    setsku(e.target.value);
  };
  const handleNameChange1 = (e) => {
    setName(e.target.value);
  };
  const handleNameChange11 = (e) => {
    setwarrantyPeriod(e.target.value);
  };
  useEffect(() => {
    async function fetchData() {
      if (categoryId) {
        try {
          const response = await fetch(`http://127.0.0.1:5001/api/categories/getid/${categoryId}`);
          const dataFromAPI = await response.json();
          // console.log("dataFromAPI", dataFromAPI);
          // console.log("parentCategoryID", dataFromAPI.parentCategoryID);

          const newData = {
            categoryID: dataFromAPI.categoryID,
            name: dataFromAPI.name,
            parentCategoryID: dataFromAPI.parentCategoryID,
          };

          // Update parentCategoryID1
          setParentCategoryID1((prevParentCategoryID1) => [
            ...prevParentCategoryID1,
            newData,
          ]);

          // console.log("newData1", newData);

          // Perform the second API call
          if (dataFromAPI.parentCategoryID) {
            const response2 = await fetch(`http://127.0.0.1:5001/api/categories/getid/${dataFromAPI.parentCategoryID}`);
            const dataFromAPI2 = await response2.json();
            const newData2 = {
              categoryID: dataFromAPI2.categoryID,
              name: dataFromAPI2.name,
              parentCategoryID: dataFromAPI2.parentCategoryID,
            };

            // Update parentCategoryID2
            setparentCategoryID2((prevParentCategoryID2) => [
              ...prevParentCategoryID2,
              newData2,
            ]);

            // console.log("newData2", newData2);

            // Update the ProductData state
            setProductData((prevProductData) => ({
              ...prevProductData,
              parentCategories: [
                ...prevProductData.parentCategories,
                newData,
                newData2,
              ],
            }));
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchData();
  }, [categoryId]);

  const handleNameChange67 = (event) => {
    const selectedCategoryId = event.target.value;
    setProductData((prevProductData) => ({
      ...prevProductData,
      parentCategories: [], // Reset parentCategories to an empty array
    }));
    setcategoryId(selectedCategoryId);
    // console.log("categoryId", selectedCategoryId);

  };
  const handleNameChangev = (e) => {
    setbrandId(e.target.value);
  };

  const handleEditorChange = (event, editor) => {
    try {
      const data = editor.getData();
      setDescription(data);
    } catch (error) {
      console.error('Error in handleEditorChange:', error);
    }
  };
  const [newSpec, setNewSpec] = useState({
    title: '',
    content: '',
  });
  useEffect(() => {
    const filteredSpecification = specification.filter(item => item.title !== "" || item.content !== "");

    const filteredSpecificationFormatted = filteredSpecification.map(item => ({
      id: item._id, // Update 'id' from '_id'
      title: item.title,
      content: item.content,
      sku: sku,
    }));

    setProductData(prevProductData => ({
      ...prevProductData,
      specification: filteredSpecificationFormatted,
    }));
  }, [specification, productData.product.sku]);




  const handleAddRow = () => {
    const newRow = {
      title: "",
      content: "",

    };

    setspecification([...specification, newRow]);
    // console.log()
  };
  const handleNameChange13 = (e) => {
    seturlvideo(e.target.value);
  };

  const handleInputChanges = (index, field, value) => {
    const updatedSpecification = [...specification];
    if (updatedSpecification[index]) {
      updatedSpecification[index][field] = value;
      setspecification(updatedSpecification);
    }
  };
  const handleClose = () => {
    window.location.reload()
    setShow(false)
  }
  return (
    <div className="admin-create">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>THÀNH CÔNG</Modal.Title>
        </Modal.Header>
        <Modal.Body>SẢN PHẨM ĐÃ ĐƯỢC THAY ĐỔI THÀNH CÔNG</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <h3>Cập Nhật Sản Phẩm</h3>
        <div className="scrollable-container">
          <form
            className="admin-create-product"
            encType="multipart/form-data"
            disabled={isFormDisabled}
          >
            <div className="table-row">
              <div className="table-cell">
                <label>SKU:</label>
              </div>
              <div className="table-cell">
                <input type="text" value={sku} onChange={handleNameChange} disabled={true} />
                <div className="input-error">{skuError}</div>
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Tên Sản Phẩm: </label>
              </div>
              <div className="table-cell">
                <textarea
                  style={{ width: '100%', height: '35px' }}
                  value={productName}
                  onChange={handleNameChange1}
                />
                <div className="input-error">{productNameError}</div>
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Mô Tả:</label>
              </div>
              <div className="table-cell">
              <CKEditor
    editor={ClassicEditor}
    data={description}
    onChange={handleEditorChange}
    config={{
      extraPlugins: [CustomUploadAdapter],
    }}
    onReady={(editor) => {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new CustomUploadAdapter(loader);
      };
      editorRef.current = editor;
    }}
  />
                <div className="input-error">{descriptionError}</div>
              </div>
            </div>

            <div className="table-row">
              <div className="table-cell">
                <label>Giá Gốc(VND):</label>
              </div>
              <div className="table-cell">
                <input
                  type="text"
                  placeholder={originalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                  value={originalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                  onChange={(e) => handleInput(e, setoriginalPrice)}
                />
                <div className="input-error">{originalPriceError}</div>
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Giá Bán(VND):</label>
              </div>
              <div className="table-cell">
                <input
                  type="text"
                  placeholder={sellingPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                  value={sellingPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                  onChange={(e) => handleInput(e, setsellingPrice)}
                />
                <div className="input-error">{sellingPriceError}</div>
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Giá Bán Sỉ(VND):</label>
              </div>
              <div className="table-cell">
                <input
                  type="text"
                  placeholder={(retailprice || 0).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                  value={(retailprice || 0).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                  onChange={(e) => handleInput(e, setretailprice)}
                />
                <div className="input-error">{retailpriceError}</div>
              </div>


            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Số Lượng:</label>
              </div>
              <div className="table-cell">
                <input
                  type="text"
                  placeholder={quantity}
                  value={quantity}
                  onInput={(e) => handleInput1(e, setquantity)}
                  onKeyPress={handleKeyPress1}
                />
                <div className="input-error">{quantityError}</div>
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Ảnh Chính:</label>
              </div>
              <div onDrop={handleFileDrop} onDragOver={handleDragOver} style={{ border: '1px dashed #ccc', padding: '10px' }}>
                <label className="custom-file-upload">
                  <input type="file" multiple onChange={handleFileSelect} style={{ display: 'none' }} />
                  <span>CHỌN ẢNH HOẶC KÉO VÀ THẢ ẢNH VÀO ĐÂY</span>
                </label>
                {base64Image && (
                  <div>
                    <img src={base64Image} alt="Base64 Image" width="70" />
                  </div>
                )}
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Ảnh Phụ:</label>
              </div>
              <div onDrop={handleDrop} onDragOver={handleDragOver} style={{ border: '1px dashed #ccc', padding: '10px' }}>
                <label className="custom-file-upload">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelects}
                    style={{ display: 'none' }}
                  />
                  <span>CHỌN ẢNH HOẶC KÉO VÀ THẢ ẢNH VÀO ĐÂY</span>
                </label>
                {selectedFiles.length > 0 && (
                  <div className="image-preview-container">
                    {selectedFiles.map((file, index) => (
                      <div key={file.id}>
                        <img
                          src={file.urlImage.startsWith('data:image') ? file.urlImage : URL + file.urlImage}
                          alt="Base64 Image"
                          width="70"
                          className="base64-image"
                        />
                        <button
                          type="button"
                          onClick={() => handleClearFile(index)}
                          style={{
                            padding: '3px 9px',
                            fontSize: '12px',
                            backgroundColor: 'red',
                            color: 'white',
                          }}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Link Video:</label>
              </div>
              <div className="table-cell">
                <textarea
                  style={{ width: '100%', height: '35px' }}
                  value={urlvideo}
                  onChange={handleNameChange13}
                />
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Tên Loại Sản Phẩm </label>
              </div>
              <div className="table-cell">
                <select
                  style={{
                    width: '300px',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    outline: 'none',
                    backgroundColor: 'white',
                  }}
                  value={categoryId}
                  onChange={handleNameChange67}
                >
                  <option value="">{categoryname}</option>
                  {category.map((category) => (
                    <option key={category.categoryID} value={category.categoryID}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="input-error">{categoryIdError}</div>
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Hãng Sản Xuất</label>
              </div>
              <div className="table-cell">
                <select style={{
                  width: '300px',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  backgroundColor: 'white',
                }} value={brandId} onChange={handleNameChangev}>
                  <option value="">{brandIdname}</option>
                  {brands.map((brands) => (
                    <option key={brands.idBrand} value={brands.idBrand}>
                      {brands.name}
                    </option>
                  ))}
                </select>
                <div className="input-error">{brandIdError}</div>
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Thời Gian Bảo Hành:</label>
              </div>
              <div className="table-cell">
                <input type="text" value={warrantyPeriod} onChange={handleNameChange11} />
                <div className="input-error">{warrantyPeriodError}</div>
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Trạng thái:</label>
              </div>
              <div className="table-cell">
                <input
                  type="checkbox"
                  checked={status}
                  onChange={handleChange}
                  className='status-check'
                />
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Hiện Giá</label>
              </div>
              <div className="table-cell">
                <input
                  type="checkbox"
                  checked={contactToPurchase}
                  onChange={handleChange1}
                  className='status-check'
                />
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Sản Phẩm Nổi Bậc</label>
              </div>
              <div className="table-cell">
                <input
                  type="checkbox"
                  checked={bestseller}
                  onChange={handleChange1222}
                  className='status-check'
                />
              </div>

            </div>
            <div className="table-row">
              <div className="table-cell">
                <label>Thông Số Kỹ Thuật</label>
              </div>
              <div className="table-cell">
                <div className="input-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Tên Thông Số Kỹ Thuật</th>
                        <th>Giá Trị Thông Số Kỹ Thuật</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specification.map((element, index) => (
                        <tr key={index}>
                          <td>
                            <textarea
                              type="text"
                              name="title"
                              value={element.title}
                              onChange={(e) => handleInputChanges(index, "title", e.target.value)}
                              placeholder="Title"
                            />
                          </td>
                          <td>
                            <textarea
                              type="text"
                              name="content"
                              value={element.content}
                              onChange={(e) => handleInputChanges(index, "content", e.target.value)}
                              placeholder="Content"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <div className="input-error">{SpecificationsError}</div>
                  </table>
                  <button
                    type="button"
                    onClick={handleAddRow}
                    style={{
                      fontSize: '12px',
                      padding: '5px 10px',
                    }}
                  >
                    +
                  </button>
                </div>

              </div>
            </div>

            <div className="table-row">
              <div className="table-cell"></div>
              <div className="table-cell">
                <button type="button" onClick={handleCreate}>Cập Nhật Sản Phẩm</button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditProduct;
