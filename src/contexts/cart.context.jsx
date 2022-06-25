import { type } from '@testing-library/user-event/dist/type';
import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

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

// the best practice in reducer is: not include the business logic inside reducer switch
const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_CART_ITEM':
            return {
                ...state,
                ...payload
            };
        case 'TOGGLE_IS_CART_OPEN':
            return {
                ...state,
                ...payload
            };
        default:
            throw new Error(`Unhandled type of ${type} in cart reducer`);
    }
};

export const CartProvider = ({ children }) => {
    const [{ cartCount, cartItems, isCartOpen, cartTotal }, dispatch] = useReducer(
        cartReducer,
        INITIAL_STATE
    );

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((s, cartItem) => s + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce(
            (s, cartItem) => s + cartItem.quantity * cartItem.price,
            0
        );

        dispatch({
            type: 'SET_CART_ITEMS',
            payload: { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount }
        });
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = () => {
        const newIsCartOpen = !isCartOpen;
        dispatch({ type: 'TOGGLE_IS_CART_OPEN', payload: { isCartOpen: newIsCartOpen } });
    };

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
