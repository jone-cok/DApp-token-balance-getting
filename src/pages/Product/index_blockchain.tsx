import { useSDK } from "@metamask/sdk-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import Web3 from 'web3';
import toast from 'react-hot-toast';
import { customToast } from "@/components/Toast";
import { abi, address } from '@/contract/constant_0_Taskipfs_demo';
import { ProductResponse, IProduct } from "@/types/Product.types";
import Product from '@/service/apis/product';
import path from "@/constants/path";

import { checkJWT } from "@/routes/AuthPageRoute";
import ProductCard from "@/components/Card/PictureCard";
import PageLoading from "@/components/Loading/PageLoading";

import heroimg from '@/assets/images/heroImage.png';
import LoaderImg from "@/assets/gifs/loader.gif";


interface IProductDetals {
    id: number;
    name: string;
    description: string;
    price: number;
    imageaddress: string;
    allowed: boolean;
}

const ProductPage = () => {

    const navigate = useNavigate();

    //====================== get product data from smartcontract ========================================//

    //====== state of connect to metamask =======//
    const [account, setAccount] = useState<string>();
    const { sdk, connected, connecting, provider, chainId } = useSDK();
    //====== state of get ProductDetails ========//
    const [isLoading, setIsLoading] = useState('idle');
    const [numProductt, setNumProduct] = useState<number>();
    const [productsDetails, setProductsDetails] = useState<IProductDetals[]>([]);
    //====== state of set ProductDetails ========//
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [allowed, setAllowed] = useState('');
    //======== ipfs file upload =================//
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [cid, setCid]: any = useState();

    const app = new Web3(provider);
    const web3 = new app.eth.Contract(abi, address);

    const getNumber = async () => {

        //======================= to display non-filtered productData =================//
        setFilterState(false);

        try {
            setIsLoading('fetching');
            const numProduct = await web3.methods.numProduct().call() as string;
            setIsLoading('idle');
            setNumProduct(parseInt(numProduct));
            console.log(numProduct);
        } catch (error) {
            setIsLoading('idle');
            toast.error('Error in fetching numProduct');
        }
    };
    const getProductData = async () => {
        try {
            setIsLoading('fetching');
            if (numProductt) {
                console.log("numProduct is exist", numProductt);
                let arrayMed = [];
                for (let _id = 0; _id < numProductt; _id++) {
                    const storedData = await web3.methods.products(_id).call() as IProductDetals;
                    arrayMed[_id] = storedData;
                }
                setProductsDetails(arrayMed);
                setIsLoading('idle');
            }
            console.log("fetch data is successed");
        } catch (error) {
            setIsLoading('idle');
            toast.error('Error in fetching fleet');
        }
    };

    useEffect(() => {
        if (connected) {
            getNumber();
        }
    }, [connected]);

    useEffect(() => {
        numProductt && getProductData();
    }, [numProductt]);


    //========================== filter product list =============================//
    const [filterName, setFilterName] = useState('');
    const [filterState, setFilterState] = useState(false);
    const [filteredNumber, setFilteredNumber] = useState(0);
    const [filteredProductsDetails, setFilteredProductsDetails] = useState<IProductDetals[]>([]);

    const handleSearchProductByName = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFilterState(() => true);
        console.log(filterState);
        console.log(numProductt);
        console.log(filterName);

        if (numProductt) {
            let arrayMed: IProductDetals[] = [];
            let filteredCnt: number = 0;
            for (let i = 0; i < numProductt; i++) {
                if (productsDetails[i].name.toLowerCase().includes(filterName.toLowerCase())) {
                    arrayMed[filteredCnt] = productsDetails[i];
                    filteredCnt++;
                }
            }
            console.log(filteredCnt);
            console.log(arrayMed);
            setFilteredNumber(filteredCnt);
            setFilteredProductsDetails(arrayMed);
        }
    }

    //=========================== Add to Cart by user ============================//
    const handleAddToCart = async () => {

    }

    return (
        <>
            {isLoading === 'fetching' ? (
                <PageLoading />
            ) : (
                <div className="flex flex-col justify-between items-center w-full bg-[#F5F5F5]">
                    <div className="w-full relative">
                        <img src={heroimg} alt="logo" className="w-full h-[450px] object-cover" />
                        <div className="absolute w-full flex justify-center items-center h-32 bg-amber-500 m-auto left-0 right-0 top-0 bottom-0 text-[60px] text-[#f5f5f5] font-medium font-serif">All Products</div>
                    </div>
                    <div className="flex flex-row justify-between items-center mt-[50px] w-full px-[34px]">
                        <div className="text-[24px] font-bold">
                            Search By Filter
                        </div>
                        <form onSubmit={handleSearchProductByName} className="relative h-[60px] flex flex-row justify-between items-center">
                            <input type="text" value={filterName} placeholder="Search By Name" onChange={(e) => setFilterName(e.target.value)} className="bg-white w-[359px] h-full px-4" />
                            <button type="submit" className="absolute w-[105px] h-[46px] top-0 bottom-0 right-[26px] m-auto bg-black text-[16px] text-white font-semibold rounded-[5px] z-10">
                                Filter
                            </button>
                        </form>
                    </div>
                    <div className='my-[10px] w-full px-[50px]'>
                        {(isLoading === 'fetching') ? (
                            <p>Fetching Data...</p>
                        ) : (!filterState ?
                            (<ul className="w-full rounded-lg">
                                <div>
                                    Products number: <span>{numProductt && numProductt.toString()}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-9 w-full">
                                    {productsDetails && productsDetails.map((product, index) => (
                                        <li className="mt-10 w-full" key={index}>
                                            <ProductCard name={product.name.toString()} description={product.description.toString()} price={product.price.toString()} imgsrc={`${process.env.VITE_GATEWAY_URL}/ipfs/${product.imageaddress.toString()}`} imgalt="ipfs image" id={product.id.toString()} allowed={product.allowed.toString()}
                                                showAddToCart={true} showDeleteProduct={false} showEditProduct={false}
                                                AddToCart={handleAddToCart} />
                                        </li>))
                                    }
                                </div>
                            </ul>)
                            :
                            (<ul className="w-full rounded-lg">
                                <div>
                                    Searched number: <span>{filteredNumber && filteredNumber.toString()}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-9 w-full">
                                    {filteredProductsDetails && filteredProductsDetails.map((product, index) => (
                                        <li className="mt-10 w-full" key={index}>
                                            <ProductCard name={product.name.toString()} description={product.description.toString()} price={product.price.toString()} imgsrc={`${process.env.VITE_GATEWAY_URL}/ipfs/${product.imageaddress.toString()}`} imgalt="ipfs image" id={product.id.toString()} allowed={product.allowed.toString()}
                                                showAddToCart={true} showDeleteProduct={false} showEditProduct={false}
                                                AddToCart={handleAddToCart} />
                                        </li>))
                                    }
                                </div>
                            </ul>)
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductPage;
