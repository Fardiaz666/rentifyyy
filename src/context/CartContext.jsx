import React, { createContext, useState } from 'react';
// PENTING: Ambil data mentah (INITIAL_PRODUCTS) dari mockData
import { INITIAL_PRODUCTS } from '../data/mockData'; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // STATE GLOBAL UNTUK PRODUK
    const [allProducts, setAllProducts] = useState(INITIAL_PRODUCTS);
    
    // State Pembeli
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
        const toast = document.createElement('div');
        toast.innerText = `🛒 ${product.name} masuk keranjang!`;
        toast.className = 'fixed bottom-5 right-5 bg-slate-900 text-[#14e9ff] px-6 py-3 rounded-xl shadow-2xl font-bold z-50 animate-bounce flex items-center gap-2';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    const removeFromCart = (indexToRemove) => {
        setCart(cart.filter((_, index) => index !== indexToRemove));
    };

    const addOrder = (orderData) => {
        setOrders([orderData, ...orders]);
        setCart([]);
    };
    
    // --- FUNGSI SELLER UNTUK MENGELOLA PRODUK ---
    
    // FUNGSI BARU UNTUK SELLER: Menambah Produk
    const addProduct = (newProduct) => {
        const newId = (allProducts.length + 1).toString();
        const productWithId = { 
            ...newProduct, 
            id: newId, 
            rating: 5.0, 
            reviews: 0, 
            availability: newProduct.stock > 0,
            specs: { 'Dibuat': new Date().toLocaleDateString('id-ID') } 
        };
        // Tambahkan ke daftar produk global
        setAllProducts([productWithId, ...allProducts]); 
    };
    
    // FUNGSI BARU UNTUK SELLER: Mengedit Produk
    const updateProduct = (updatedProduct) => {
        setAllProducts(allProducts.map(p => 
            p.id === updatedProduct.id ? { ...updatedProduct, availability: updatedProduct.stock > 0 } : p
        ));
    };

    // FUNGSI BARU UNTUK SELLER: Menghapus Produk (Simulasi)
    const deleteProduct = (productId) => {
        setAllProducts(allProducts.filter(p => p.id !== productId));
    };


    const totalPrice = cart.reduce((total, item) => total + item.pricePerDay, 0);

    return (
        <CartContext.Provider value={{ 
            cart, addToCart, removeFromCart, totalPrice, orders, addOrder,
            // Produk Global (Digunakan oleh Buyer dan Seller Page)
            allProducts, addProduct, updateProduct, deleteProduct
        }}>
            {children}
        </CartContext.Provider>
    );
};