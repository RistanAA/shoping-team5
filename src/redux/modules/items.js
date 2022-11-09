import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    storeItem: [
        // {
        //     id: 1,
        //     title: 'Item 1',
        //     price: 100000,
        //     category: 'Sweets',
        //     qty: 1,
        //     stock: 3,
        //     status: true,
        // },
        // {
        //     id: 2,
        //     title: 'Item 2',
        //     price: 200000,
        //     category: 'Drinks',
        //     qty: 1,
        //     stock: 3,
        //     status: true,
        // },
        // {
        //     id: 3,
        //     title: 'Item 3',
        //     price: 200000,
        //     category: 'Crisp',
        //     qty: 1,
        //     stock: 3,
        //     status: true,
        // },
    ],
    cart: [],
    item: {
        id: 0,
        title: '',
        price: 0,
        qty: 1,
        stock: 3,
        status: true,
    },
    isLoading: false
}

const rootURL = 'http://localhost:3001'

export const __getStoreItems = createAsyncThunk(
    'getStoreItems',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get(`${rootURL}/storeItem`)
            // console.log(data)
            return thunkApi.fulfillWithValue(data)
        }
        catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)
export const __checkout = createAsyncThunk(
    'checkout',
    async (payload, thunkApi) => {
        try {
            // const { data } = await axios.get(`${rootURL}storeItem`)
            const { items: { cart } } = thunkApi.getState()
            Promise.all(cart.map(async ({ id, stock, qty }) => {
                // const newStock = stock - qty
                // console.log(id, stock, qty , stock - qty)
                await axios.patch(`${rootURL}/storeItem/${id}`, { stock: stock - qty })
            }))
            // console.log(data)
            return thunkApi.fulfillWithValue(cart)
        }
        catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)
// let number = 1
export const __addToCart = createAsyncThunk(
    'addToCart',
    async (payload, thunkApi) => {
        try {
            // const { data } = await axios.get(`${rootURL}storeItem`)
            // console.log(data)
            const { items: { cart } } = thunkApi.getState()
            // number++
            // const savedData = {number: cart}
            // console.log(savedData)
            Promise.all(cart.map(async ({ category, price, qty, status, stick, title }) => {
                // console.log(item)
                await axios.post(`${rootURL}/cart`, { category, price, qty, status, stick, title })
            }))
            return thunkApi.fulfillWithValue(cart)
        }
        catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

const items = createSlice({
    name: 'items',
    initialState,
    reducers: {
        plusQty(state, action) {
            return {
                ...state, storeItem: state.storeItem.map((item) => {
                    if (item.id === action.payload && item.qty < item.stock) {
                        return {
                            ...item,
                            qty: item.qty + 1,
                        };
                    } else {
                        return item;
                    }
                })
            }
        },
        minusQty(state, action) {
            return {
                ...state, storeItem: state.storeItem.map((item) => {
                    if (item.id === action.payload && item.qty > 1) {
                        return {
                            ...item,
                            qty: item.qty - 1,
                        };
                    } else {
                        return item;
                    }
                })
            }
        },
        addToCart(state, action) {
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

                cart: [...state.cart, { ...action.payload, price: action.payload.qty * action.payload.price }]
            }
        },
        cancelCart(state, action) {
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
        },
        // checkout(state, action) {
        //     return {
        //         ...state, storeItem: state.storeItem.map((item) => {
        //             if (!item.status) {
        //                 return {
        //                     ...item,
        //                     stock: item.stock - item.qty,
        //                 };
        //             } else {
        //                 return item;
        //             }
        //         })
        //     }
        // },
        refreshCart(state, action) {
            return {
                ...state, storeItem: state.storeItem.map((item) => {
                    return {
                        ...item,
                        qty: 1,
                        status: true,
                    };
                }),
                cart: []
            }
        }
    },
    extraReducers: {
        [__getStoreItems.fulfilled]: (state, action) => {
            console.log('getstore success')
            return {
                ...state, storeItem: action.payload
            }
        },
        [__getStoreItems.pending]: () => {
            console.log('getstore loading')
        },
        [__getStoreItems.rejected]: (state, action) => {
            console.log('getstore failed')
            console.log(action.payload)
        },
        [__checkout.pending]: () => {
            console.log('checkout loading')
        },
        [__checkout.rejected]: (state, action) => {
            console.log('checkout failed')
            console.log(action.payload)
        },
        [__checkout.fulfilled]: (state, action) => {
            console.log('checkout success')
        },
        [__addToCart.pending]: (state, action) => {
            console.log('addtocart loading')
        },
        [__addToCart.fulfilled]: (state, action) => {
            console.log('addtocart success')
        },
        [__addToCart.rejected]: (state, action) => {
            console.log('addtocart failed')
            console.log(action.payload)
        },
    }
});

export const { plusQty, minusQty, addToCart, cancelCart, checkout, refreshCart } = items.actions
export default items.reducer;