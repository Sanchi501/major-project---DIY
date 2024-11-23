'use client';
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const router = useRouter();

    const [wishlistItems, setWishlistItems] = useState(() => {
        if (typeof window !== "undefined") {
            const storedItems = localStorage.getItem('wishlist');
            return storedItems ? JSON.parse(storedItems) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (item) => {
        console.log(item, wishlistItems);

        if (wishlistItems.includes(item)) {
            setWishlistItems(wishlistItems.filter(obj => obj._id !== item._id))
        } else {
            setWishlistItems([...wishlistItems, item]);
        }
    }

    const removeFromWishlist = (itemId) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
    }

    const clearWishlist = () => {
        setWishlistItems([]);
    }

    const isInWishlist = (itemId) => {
        return wishlistItems.some(item => item._id === itemId);
    }

    return (
        <WishlistContext.Provider value={{  wishlistItems, addToWishlist, removeFromWishlist, clearWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

const useWishlistContext = () => useContext(WishlistContext);

export default useWishlistContext;