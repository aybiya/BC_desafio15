import React, { useState, useEffect } from 'react';
import "./App.css";
import ProductList from './Components/ProductList';
import ProductForm from './Components/ProductForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(false);


  const fetchProducts = async () => {
    try {
      const response = await fetch('https://6563bdebceac41c0761d128d.mockapi.io/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(true);
    }
  };
  if (error) return <p>Hubo un error al cargar los productos</p>;


  useEffect(() => {
    // Cargar productos desde la API al cargar la página
    fetchProducts();
  }, []);

  const addOrUpdateProduct = (editedProduct) => {
    // Verificar si el producto ya existe en la lista
    const index = products.findIndex((p) => p.id === editedProduct.id);
  
    if (index !== -1) {
      // Actualizar los datos editados del producto existente
      const updatedProducts = [...products];
      updatedProducts[index] = editedProduct;
      setProducts(updatedProducts);
      setSelectedProduct(null);
    } else {
      // Agregar producto nuevo
      setProducts([...products, { ...editedProduct, id: Date.now() }]);
    }
  };

  const handleDelete = (productId) => {
    // Eliminar producto de la lista
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ProductList products={products} onEdit={addOrUpdateProduct} onDelete={handleDelete} />
      <ProductForm addOrUpdateProduct={addOrUpdateProduct} selectedProduct={selectedProduct} />
      <ToastContainer />
    </div>
  );
};

export default App;