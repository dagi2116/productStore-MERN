import { useState } from "react"
import { useProductStore } from "../store/productStore";
import { ToastContainer, toast } from 'react-toastify';
import HomePage from "./HomePage";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";

function CreateProduct() {
    const navigate = useNavigate()
    // 
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        image: "",
    });
    const { createProduct } = useProductStore();

    const handleAddProduct = async (e) => {
        e.preventDefault();

        // 
        const { success, message } = await createProduct(newProduct);
        if (!success) {
            toast.error(message);
        } else {
            toast.success(message);
            // Delay navigation to allow the toast to appear
            setTimeout(() => {
                navigate('/');
            }, 1000); // 1-second delay
            // Reset the form fields
            setNewProduct({ title: '', price: '', image: '' });
        }
    };
    // 
    return (
        <div className="m-8">
            <h1 className="w-[30rem] h-auto my-0 mx-auto mb-8">CreateProduct</h1>
            <div className="w-96 h-auto my-0 mx-auto dark:bg-[#333] bg-[#eee]  rounded-md flex flex-col justify-center items-start p-8">
                <form action="" onSubmit={handleAddProduct}  >
                    <label id="title">Product Title</label>
                    <input type="text" placeholder="Title"
                        value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        className="w-full p-2 border-b-2 border-b-gray-400 hover:border-b-gray-800 outline-none
                         dark:bg-[#222]  dark:text-white" />
                    <label id="Price">Product Price</label>
                    <input type="number" placeholder="Price"
                        value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full p-2 border-b-2 border-b-gray-400 hover:border-b-gray-800 outline-none
                           dark:bg-[#222] dark:text-white" />
                    <label id="Image">Product Image</label>
                    <input type="text" placeholder="Image"
                        value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="w-full p-2 border-b-2 border-b-gray-400 hover:border-b-gray-800 outline-none
                           dark:bg-[#222] dark:text-white" />
                    <div className=" relative flex gap-4 mt-4">
                        <button type="submit" className="w-full px-4 py-2 bg-green-900 text-white rounded-sm">
                            Add Product
                        </button>

                        <button type="button" className="w-full px-4 py-2 bg-gray-400 dark:text-white rounded-sm"
                            onClick={() => setNewProduct({ title: "", price: "", image: "" })} >
                            Clear
                        </button>
                        <button type="button" className="absolute bottom-60 right-0 text-gray-400 rounded-sm"
                            onClick={() => navigate('/')}
                        ><IoIosCloseCircleOutline size={30} /> </button>
                    </div>
                </form>


                <ToastContainer position="top-right" autoClose={5000} />

            </div>

        </div>
    )
}

export default CreateProduct