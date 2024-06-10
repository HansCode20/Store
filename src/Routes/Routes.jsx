import Product from "../Pages/Product.jsx";
import Home from "../Pages/Home.jsx";
import ProductDetail from "../components/ProductDetail.jsx";




const routeList = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/product",
        element: <Product />,
    },
    {
        path: "/product/:id",
        element: <ProductDetail />,
    }
];

export default routeList;