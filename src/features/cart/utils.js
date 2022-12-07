export const getCartQuantity = cart => {
    return cart.reduce((acc, cartItem) => acc + cartItem?.quantity, 0);
};

export const getCartSum = cart => {
    const sum = cart.reduce(
        (acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0
    );
    return sum / 100;
};