import { createContext, useState, useEffect } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    clearItemFromCart: () => {},
    cartTotal: 0,
    removeItemFromCart: () => {}
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        setCartCount(cartItems.reduce((s, cartItem) => s + cartItem.quantity, 0));
    }, [cartItems]);

    useEffect(() => {
        setCartTotal(cartItems.reduce((s, cartItem) => s + cartItem.quantity * cartItem.price, 0));
    }, [cartItems]);

    const addItemToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));

    const removeItemFromCart = (cartItemToRemove) =>
        setCartItems(removeCartItem(cartItems, cartItemToRemove));

    const clearItemFromCart = (cartItemToClear) =>
        setCartItems(clearCartItem(cartItems, cartItemToClear));

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
        removeItemFromCart,
        clearItemFromCart,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
