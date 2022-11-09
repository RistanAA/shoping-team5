import { BrowserRouter, Route, Routes } from "react-router-dom"
import Checkout from "./pages/Checkout"
import Home from "./pages/Home"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router