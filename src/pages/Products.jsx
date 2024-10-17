import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    const productId = productList.length + 1; // สร้าง ID ใหม่ตามจำนวนสินค้าที่มีอยู่
    const formattedPrice = `฿${newProduct.price}`; // เพิ่มสัญลักษณ์ ฿ ก่อนราคาสินค้า
    dispatch(addProduct({ id: productId, ...newProduct, price: formattedPrice }));
    setNewProduct({ name: '', price: '', description: '' }); // ล้างฟอร์มหลังจากเพิ่มสินค้า
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  const formatPrice = (price) => {
    // ถ้าราคาเริ่มต้นด้วย $, ให้เปลี่ยนเป็นสัญลักษณ์ ฿
    if (price.startsWith('$')) {
      return price.replace('$', '฿');
    }
    return price;
  };

  return (
    <div>
      <h2>รายการสินค้า</h2>
      <ul>
        {productList.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              {product.name} - {formatPrice(product.price)} {/* แปลง $ เป็น ฿ ถ้ามี */}
            </Link>
            <button onClick={() => handleRemoveProduct(product.id)}>ลบ</button>
          </li>
        ))}
      </ul>

      <h3>เพิ่มสินค้าใหม่</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProduct();
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="ชื่อสินค้า"
          value={newProduct.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="ราคาสินค้า"
          value={newProduct.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="รายละเอียดสินค้า"
          value={newProduct.description}
          onChange={handleInputChange}
          required
        />
        <button type="submit">เพิ่มสินค้า</button>
      </form>
    </div>
  );
}

export default Products;
