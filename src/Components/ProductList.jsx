import ProductCard from "./ProductCard";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ProductList = ({ products, onEdit, onDelete }) => {
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`https://6563bdebceac41c0761d128d.mockapi.io/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      onDelete(productId); // Actualizar el estado local después de la eliminación exitosa
      // Mostrar notificación de éxito
      toast.success('Producto eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      // Mostrar notificación de error
      toast.error('Error al eliminar el producto.');
    }
  };

  return (
    <section className="container-products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
      <ToastContainer />
    </section>
  );
};

export default ProductList;