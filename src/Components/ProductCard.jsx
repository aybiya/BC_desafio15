import { useEffect, useState } from "react";
import React from 'react'


const ProductCard = ({ product, onEdit, onDelete }) => {
  const [editableProduct, setEditableProduct] = useState(null);

  const handleEdit = () => {
    setEditableProduct({ ...product });
  };

  const handleSave = () => {
    // Guardar la edición
    onEdit(editableProduct);

    // Limpiar estado de edición
    setEditableProduct(null);
  };

  const handleCancel = () => {
    // Cancelar la edición
    setEditableProduct(null);
  };

  const handleFieldChange = (fieldName, value) => {
    setEditableProduct((prevProduct) => ({
      ...prevProduct,
      [fieldName]: value,
    }));
  };

  return (
    <article className="product-card">
      {editableProduct && editableProduct.id === product.id ? (
        // formulario edicion de producto
        <article className="form-editar">
          <input
            type="text"
            value={editableProduct.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
          />
          <input
            type="text"
            value={editableProduct.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
          />
          <input
            type="number"
            value={editableProduct.price}
            onChange={(e) => handleFieldChange('price', e.target.value)}
          />
          <div>
            <button className="btn" onClick={handleSave}>Guardar</button>
            <button className="delete-btn" onClick={handleCancel}>Cancelar</button>
          </div>
        </article>
      ) : (
        // Info del producto
        <>
          <h3>{product.name}</h3>
          <p className="description">{product.description}</p>
          <p className="price">${product.price}</p>
          <button className="btn" onClick={handleEdit}>Editar</button>
          <button className="delete-btn" onClick={() => onDelete(product.id)}>Eliminar</button>
        </>
      )}
    </article>
  );
};

export default ProductCard;