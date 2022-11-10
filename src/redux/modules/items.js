import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    storeItem: [],
    cart: [],
    item: {
        id: 0,
        title: '',
        price: 0,
        qty: 1,
        stock: 3,
        status: true,
    },
    comments:[],
    isLoading: false
}

const rootURL = 'https://nameless-cliffs-97979.herokuapp.com'

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
            // console.log(payload)
            
            return thunkApi.fulfillWithValue(cart)
        }
        catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export const __addComments = createAsyncThunk(
    'addComments',
    async (payload,thunkApi) => {
        await axios.post(`${rootURL}/comments`,{name: payload.name, comment: payload.comment})
    }
)
export const __getComments = createAsyncThunk(
    'getComments',
    async (payload,thunkApi) => {
        try {
            const {data} = await axios.get(`${rootURL}/comments`)
            return thunkApi.fulfillWithValue(data)
        } catch (e){
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
        searchItems(state, action) {
            console.log(action.payload)
            let query = action.payload.toLowerCase();
            console.log(query.length > 0)
            if (query.length > 0) {
                return {
                    ...state, storeItem: state.storeItem.filter(
                        (item) => item.title.toLowerCase().indexOf(query) >= 0
                    )
                }
            } else {
                return state

            }
        },
        plusQty(state, action) {

            return {
                ...state, storeItem: state.storeItem.map((item) => {
                    if (item.id === action.payload && item.qty < item.stock) {
                        // console.log(item.id + ' -1 ' + action.payload )
                        // console.log(item.qty < item.stock )
                        // console.log("sukses ")
                        return {
                            ...item,
                            qty: item.qty + 1,
                        };
                    } else {
                        console.log(item.id + ' - ' + action.payload)
                        console.log("gagal =" + item.id === action.payload && item.qty < item.stock)
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
        [__getComments.fulfilled]: (state, action) => {
            // console.log(action)
            return {
                ...state, comments: action.payload
            }
        },
        [__getStoreItems.fulfilled]: (state, action) => {
            // console.log('getstore success')
            return {
                ...state, storeItem: action.payload
            }
        },
        [__getStoreItems.pending]: () => {
            // console.log('getstore loading')
        },
        [__getStoreItems.rejected]: (state, action) => {
            // console.log('getstore failed')
            // console.log(action.payload)
        },
        [__checkout.pending]: () => {
            // console.log('checkout loading')
        },
        [__checkout.rejected]: (state, action) => {
            // console.log('checkout failed')
            // console.log(action.payload)
        },
        [__checkout.fulfilled]: (state, action) => {
            // console.log('checkout success')
        },
        [__addToCart.pending]: (state, action) => {
            // console.log('addtocart loading')
        },
        [__addToCart.fulfilled]: (state, action) => {
            // console.log('addtocart success')
        },
        [__addToCart.rejected]: (state, action) => {
            // console.log('addtocart failed')
            // console.log(action.payload)
        },
    }
});

export const { searchItems, plusQty, minusQty, addToCart, cancelCart, checkout, refreshCart } = items.actions
export default items.reducer;