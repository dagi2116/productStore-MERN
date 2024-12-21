import { NavLink } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useEffect } from "react"
import { useProductStore } from "../store/productStore"
import { ToastContainer } from "react-toastify";


function HomePage() {
    const { fetchProducts, products } = useProductStore();
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            {products.length === 0 ? (
                <div className="m-8 flex flex-col justify-center items-center gap-4">
                    <h1> List of Products</h1>
                    <div className="flex justify-center items-center gap-4">
                        <p>No Products Found! 😢</p>
                        <NavLink to={'/create'} className="px-4 py-2 rounded-md text-xl font-bold dark:bg-[#111] dark:text-white  hover:underline"> Add Products</NavLink>
                    </div>
                </div>
                //   List of Data
            ) : (
                <>
                    <div className="m-8 grid gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  ">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}

                    </div>
                </>
            )
            }
        </>
    )
}

export default HomePage
