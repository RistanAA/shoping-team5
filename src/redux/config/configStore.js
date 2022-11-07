import { createStore } from "redux";
import { combineReducers } from "redux";
import items from "../modules/items";

const rootReducer = combineReducers({
    items,
});
const store = createStore(rootReducer);

export default store;
