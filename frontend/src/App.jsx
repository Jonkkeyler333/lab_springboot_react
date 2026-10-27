import { useState, useEffect } from 'react'
import productService from './services/productService'
import ProductItem from './components/ProductItem'
import ProductForm from './components/ProductForm'

const App = () => {
    const [products, setProducts] = useState([])
    const [notify, setNotify] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [idFilter, setIdFilter] = useState('')

    useEffect(() => {
        productService.getAllProducts()
        .then((data) => setProducts(data))
        .catch(error => {
            console.error('Error al obtener los productos:', error)
            setNotify(error.response?.data?.message || 'Error al obtener los productos')
        })
    }, [])

    const handleNewProduct = async (product) => {
        try {
            const newProduct = await productService.createProduct(product)
            setProducts(currentProducts => [...currentProducts, newProduct])
            setNotify('Producto creado exitosamente')
            setTimeout(() => setNotify(''), 4000)
        } catch (error) {
            console.error('Error al crear el producto:', error)
            setNotify(error.response?.data?.message || 'Revisa los errores de validación')
            setTimeout(() => setNotify(''), 4000)
            throw error
        }
    }

    const handleUpdateProduct = async (product) => {
        try {
            const updatedProduct = await productService.updateProduct(product.id, product.data)
            setProducts(currentProducts => currentProducts.map(currentProduct =>
                currentProduct.id === updatedProduct.id ? updatedProduct : currentProduct
            ))
            setEditingProduct(null)
            setNotify('Producto actualizado exitosamente')
            setTimeout(() => setNotify(''), 4000)
        } catch (error) {
            console.error('Error al actualizar el producto:', error)
            setNotify(error.response?.data?.message || 'Revisa los errores de validación')
            setTimeout(() => setNotify(''), 4000)
            throw error
        }
    }

    const handleDeleteProduct = async (id) => {
        try {
            await productService.deleteProduct(id)
            setProducts(currentProducts => currentProducts.filter(product => product.id !== id))
            setNotify('Producto eliminado exitosamente')
            setTimeout(() => setNotify(''), 4000)
        } catch (error) {
            setNotify(error.message || error.response?.data?.message )
            setTimeout(() => setNotify(''), 4000)
        }
    }

    const filteredProducts = products.filter(product =>
        idFilter.trim() === '' || String(product.id).includes(idFilter.trim())
    )

    return (
        <div>
            <h1>Lista de productos</h1>
            <label>
                Filtrar por ID:
                <input
                    type="search"
                    value={idFilter}
                    onChange={({ target }) => setIdFilter(target.value)}
                    placeholder="Escribe un ID"
                />
            </label>
            {filteredProducts.length > 0 ? (
                <ul>
                    {filteredProducts.map(product => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            handleDeleteProduct={handleDeleteProduct}
                            handleEditProduct={setEditingProduct}
                        />
                    ))}
                </ul>
            ) : (<h2>{products.length > 0 ? 'No hay productos con ese ID' : 'Nada por ahora'}</h2>)}
            {notify && <p><b>{notify}</b></p>}
            {editingProduct ? (
                <div>
                    <h2>Editar producto</h2>
                    <ProductForm
                        product={editingProduct}
                        onSubmit={data => handleUpdateProduct({ id: editingProduct.id, data })}
                        submitLabel="Actualizar"
                    />
                    <button onClick={() => setEditingProduct(null)}>Cancelar</button>
                </div>
            ) : showForm ? (
                <div>
                    <h2>Agregar producto</h2>
                    <ProductForm onSubmit={handleNewProduct} submitLabel="Agregar" />
                    <button onClick={() => setShowForm(false)}>Cancelar</button>
                </div>
            ) : (
                <button onClick={() => setShowForm(true)}>Agregar producto</button>
            )}
        </div>
    )

}

export default App