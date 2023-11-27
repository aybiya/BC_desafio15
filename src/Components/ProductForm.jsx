import React, { useState } from 'react';
import { toast } from "react-toastify";
import { MdAssignmentAdd } from "react-icons/md";

const ProductForm = ({ addOrUpdateProduct, selectedProduct }) => {
  const [formProduct, setFormProduct] = useState(
    selectedProduct || { name: '', description: '', price: '' }
  );

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // Validar datos antes de agregar o actualizar
    if (!formProduct.name || !formProduct.price) {
      toast.error('Por favor, complete el nombre y el precio del producto.');
      return;
    }
    

    if (selectedProduct) {
      // Modo edición
      addOrUpdateProduct(formProduct);
    } else {
      // Modo agregar
      try {
        const response = await fetch('https://6563bdebceac41c0761d128d.mockapi.io/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formProduct),
        });

        if (!response.ok) {
          throw new Error('Error al agregar el producto');
        }

        const data = await response.json();
        addOrUpdateProduct(data);
        // Usar toast para mostrar una notificación de éxito
        toast.success('Producto agregado correctamente.');
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    }

    // Limpiar el formulario después de agregar o actualizar
    setFormProduct({ name: '', description: '', price: '' });
  };

  return (
    <section className='form-container'>
      <h2>Agregar Producto</h2>
      <article  className='form-product'>
      <form onSubmit={handleSubmitForm}>
        <label>
          Nombre:
          <input
            type="text"
            value={formProduct.name}
            onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Descripción:
          <input
            type="text"
            value={formProduct.description}
            onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
          />
        </label>
        <br />
        <label>
          Precio:
          <input
            type="number"
            value={formProduct.price}
            onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })}
          />
        </label>
        <br />
        <button className="btn" type="submit"><MdAssignmentAdd /> {selectedProduct ? 'Actualizar' : 'Agregar'}</button>
      </form>
      </article>
    </section>
  );
};

export default ProductForm;