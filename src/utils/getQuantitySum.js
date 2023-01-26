export const getQuantitySum = items => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
};