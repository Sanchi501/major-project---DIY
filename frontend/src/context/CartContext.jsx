'use client';
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const CartProvider = ({ children }) => {


    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== "undefined") {
            const storedCartItems = localStorage.getItem('cartItems');
            return storedCartItems ? JSON.parse(storedCartItems) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        console.log(cartItems);
        
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem=> cartItem._id === item._id);
            if (existingItem) {
                return prevItems.map(cartItem =>
                    cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1}
                    :cartItem
                );
            }else{
                return[...prevItems, {...item, quantity: 1}];
            }
        });
    }

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item._id !== itemId));
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const calculateTotal = () => {
        return cartItems.reduce((total, items) => total + items.price, 0).toFixed(2);
    };

    const isInCart = (itemId) => {
        return cartItems.some(item => item._id === itemId);
    }
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, calculateTotal, isInCart }}>
            {children}
        </CartContext.Provider>
    );
}

const useCartContext = () => useContext(CartContext);

export default useCartContext;