const ADD_ITEM = 'ADD_ITEM'
const ADD_TO_CART = 'ADD_TO_CART'
const PLUS_QTY = 'PLUS_QTY'
const MINUS_QTY = 'MINUS_QTY'
const CANCEL_CART = 'CANCEL_CART'

const initialState = {
    storeItem: [
        {
            id: 1,
            title: 'Item 1',
            price: 100000,
            qty: 1,
            status: true,
        },
        {
            id: 2,
            title: 'Item 2',
            price: 200000,
            qty: 1,
            status: true,
        },
    ],
    cart: [],
    item: {
        id: 0,
        title: '',
        price: 0,
        qty: 1,
        status: true,
    }
}

export const plusQty = payload => {
    return {
        type: PLUS_QTY,
        payload
    }
}
export const minusQty = payload => {
    return {
        type: MINUS_QTY,
        payload
    }
}
export const addToCart = payload => {
    return {
        type: ADD_TO_CART,
        payload
    }
}
export const cancelCart = payload => {
    return {
        type: CANCEL_CART,
        payload
    }
}


const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state, storeItem: [...state.storeItem, action.payload]
            }
        case ADD_TO_CART:
            // let newData = action.payload
            // newData.price = newData.qty * newData.price
            return {
                ...state, storeItem: state.storeItem.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            status: !item.status,
                        };
                    } else {
                        return item;
                    }
                }),
                
                cart: [...state.cart,{ ...action.payload , price: action.payload.qty * action.payload.price} ]
            }
        case CANCEL_CART:
            return {
                ...state, storeItem: state.storeItem.map((item) => {
                    if (item.id === action.payload) {
                        return {
                            ...item,
                            status: !item.status,
                        };
                    } else {
                        return item;
                    }
                }),
                cart: state.cart.filter((cart) => cart.id !== action.payload)
            }
        case PLUS_QTY:
            return {
                ...state, storeItem: state.storeItem.map((item) => {
                    if (item.id === action.payload && item.qty > 0) {
                        return {
                            ...item,
                            qty: item.qty + 1,
                        };
                    } else {
                        return item;
                    }
                })
            }
        case MINUS_QTY:
            return {
                ...state, storeItem: state.storeItem.map((item) => {
                    if (item.id === action.payload && item.qty - 1 > 0) {
                        return {
                            ...item,
                            qty: item.qty - 1,
                        };
                    } else {
                        return item;
                    }
                })
            }
        default:
            return state

    }
}

export default Reducer;