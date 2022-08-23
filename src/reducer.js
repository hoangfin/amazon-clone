export const initialState = {
    basket: JSON.parse(sessionStorage.getItem("basket") || "[]"),
    user: null
};

export const getBasketTotal = basket => basket?.reduce((accumulator, item) => item.price * item.quantity + accumulator, 0);

export const getBasketQuantity = basket => basket?.reduce((accumulator, item) => item.quantity + accumulator, 0);

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET": {
            const index = state.basket.findIndex(item => item.id === action.item.id);
            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket[index] = { ...newBasket[index], quantity: action.item.quantity }
            } else {
                newBasket.push(action.item);
            }

            return {
                ...state,
                basket: newBasket
            };
        }

        case 'UPDATE_QUANTITY': {
            const index = state.basket.findIndex(item => item.id === action.id);
            if (index >= 0) {
                console.log(index);
                let newBasket = [...state.basket];
                newBasket[index] = {...newBasket[index], quantity: action.quantity};
                return {
                    ...state,
                    basket: newBasket
                }
            } else {
                console.warn(`Can't remove product (id: ${action.id}) as it's not in the basket`);
                return state;
            }
        }

        case "EMPTY_BASKET":
            return {
                ...state,
                basket: []
            };

        case "REMOVE_FROM_BASKET": {
            const index = state.basket.findIndex(item => item.id === action.id);

            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`Can't remove product (id: ${action.id}) as it's not in the basket`);
            }

            return {
                ...state,
                basket: newBasket
            }
        }

        case "SET_USER":
            return {
                ...state,
                user: action.user
            };

        default:
            return state;
    }
};

export default reducer;