import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/"

const getAllProducts = async () => {
    const response = await axios.get(`${API_URL}products/`)
    return response.data
}

const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}products/${id}`)
    return response.data
}

const createProduct = async (product) => {
    const response = await axios.post(`${API_URL}products/`, product)
    return response.data
}

const updateProduct = async (id, product) => {
    const response = await axios.put(`${API_URL}products/${id}`, product)
    return response.data
}

export default {
    getAllProducts,
    deleteProduct,
    createProduct,
    updateProduct,
}