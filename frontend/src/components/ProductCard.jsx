import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { useProductStore } from "../store/productStore";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import Modal from "./Modal";


function ProductCard({ product, }) {
    const { deleteProduct, updateProduct } = useProductStore()
    const handleDeleteProduct = async (pid) => {
        try {
            const { success, message } = await deleteProduct(pid);
            if (success) {
                toast.info(message);
            } else {
                toast.error(message || "Failed to delete product.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    }
    // 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState(product);

    // 
    const handleUpdateProduct = async (pid, updatedProduct) => {
        try {
            const { success, message } = await updateProduct(pid, updatedProduct)
            if (success) {
                toast.success(message);
            } else {
                toast.error(message || "Failed to update product.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
        setIsModalOpen(false);
    };

    return (
        <>
            <div className=" ">
                < div className="flex flex-col gap-2 " key={product._id} >
                    <div className="hover:-translate-y-2 transition-[.3]">
                        <img src={product.image} alt="" className="w-full h-[20rem]  object-cover rounded-xl" />
                        <div className="flex flex-col justify-start items-start gap-4  dark:bg-[#111] dark:text-white ">
                            <h1>{product.title}</h1>
                            <p>${product.price}</p>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-4 dark:bg-[#111] dark:text-white ">
                        <button className=" text-blue-500" onClick={() => setIsModalOpen(true)} ><CiEdit size={20} /></button>
                        <button className="text-red-500" onClick={() => handleDeleteProduct(product._id)}><CiTrash size={20} /></button>
                    </div>
                </div >
                {/* Update Modal  */}
                <Modal isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={() => handleUpdateProduct(product._id, updatedProduct)}>

                    <form action=""  >
                        <label id="title">Product Title</label>
                        <input type="text" placeholder="Title"
                            value={updatedProduct.title} onChange={(e) => setUpdatedProduct({ ...updatedProduct, title: e.target.value })}
                            className="w-full p-2 border-b-2 border-b-gray-400 hover:border-b-gray-800 outline-none
                         dark:bg-[#222] dark:text-white" />
                        <label id="Price">Product Price</label>
                        <input type="number" placeholder="Price"
                            value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            className="w-full p-2 border-b-2 border-b-gray-400 hover:border-b-gray-800 outline-none
                          dark:bg-[#222] dark:text-white" />
                        <label id="Image">Product Image</label>
                        <input type="text" placeholder="Image"
                            value={updatedProduct.image} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            className="w-full p-2 border-b-2 border-b-gray-400 hover:border-b-gray-800 outline-none
                          dark:bg-[#222] dark:text-white" />
                        <div className="flex justify-center gap-8">
                        </div>
                    </form>
                </Modal>


            </div >
        </>

    )
};

export default ProductCard;
