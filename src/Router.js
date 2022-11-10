import { BrowserRouter, Route, Routes } from "react-router-dom"
import Checkout from "./pages/Checkout"
import First from "./pages/First"
import Home from "./pages/Home"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<First />} />
                <Route path="/home" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router