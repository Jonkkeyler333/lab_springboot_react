const ProductItem = ({ product, handleDeleteProduct, handleEditProduct }) => {

    const handleDelete = () => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar el producto "${product.name}"?`)) {
            handleDeleteProduct(product.id)
        }
    }

    return (
        <li>
            <h2>
                Nombre del producto: {product.name}
            </h2>
            <h3>
                Precio: {product.price}
            </h3>
            <p>
                Descripción: {product.description}
            </p>
            <p>
                Stock: {product.stock}
            </p>
            <button onClick={() => handleEditProduct(product)}>Editar</button>
            <button onClick={handleDelete}>Eliminar</button>
        </li>
    )
}

export default ProductItem