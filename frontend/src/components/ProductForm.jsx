import { useState } from 'react'

const ProductForm = ({ product, onSubmit, submitLabel = 'Guardar' }) => {
    const [name, setName] = useState(product?.name || '')
    const [description, setDescription] = useState(product?.description || '')
    const [price, setPrice] = useState(product?.price ?? '')
    const [stock, setStock] = useState(product?.stock ?? '')
    const [errors, setErrors] = useState({})

    const clearForm = () => {
        setName('')
        setDescription('')
        setPrice('')
        setStock('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const productData = {
            name,
            description,
            price: price === '' ? null : parseFloat(price),
            stock: stock === '' ? null : parseInt(stock, 10)
        }

        try {
            await onSubmit(productData)
            setErrors({})
            if (!product) {
                clearForm()
            }
        } catch (error) {
            const fieldErrors = error.response?.data
            if (fieldErrors && typeof fieldErrors === 'object' && !Array.isArray(fieldErrors)) {
                setErrors(fieldErrors)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Nombre:
                    <input type="text" value={name} onChange={({ target }) => setName(target.value)} />
                </label>
                {errors.name && <p>{errors.name}</p>}
            </div>
            <div>
                <label>
                    Descripción:
                    <input type="text" value={description} onChange={({ target }) => setDescription(target.value)} />
                </label>
                {errors.description && <p>{errors.description}</p>}
            </div>
            <div>
                <label>
                    Precio:
                    <input type="number" value={price} onChange={({ target }) => setPrice(target.value)} />
                </label>
                {errors.price && <p>{errors.price}</p>}
            </div>
            <div>
                <label>
                    Stock:
                    <input type="number" value={stock} onChange={({ target }) => setStock(target.value)} />
                </label>
                {errors.stock && <p>{errors.stock}</p>}
            </div>
            <div>
                <button type="submit">{submitLabel}</button>
            </div>
        </form>
    )
}

export default ProductForm