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
    allowed: number;
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


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };
    const handleSubmission = async () => {
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            const metadata = JSON.stringify({
                name: "File name",
            });
            formData.append("pinataMetadata", metadata);
            const options = JSON.stringify({
                cidVersion: 0,
            });
            formData.append("pinataOptions", options);
            const res = await fetch(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${process.env.VITE_PINATA_JWT}`,
                    },
                    body: formData as unknown as BodyInit,  // Cast FormData to BodyInit
                }
            );
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            const resData = await res.json();
            setCid(resData.IpfsHash);
            console.log(resData);
        } catch (error) {
            console.log(error);
        }
    };

    const connectToMetaMask = async () => {
        try {
            const accounts: any = await sdk?.connect();
            setAccount(accounts?.[0] || '');
            console.log("success to connect to meta mask");
            numProductt && console.log(numProductt.toString());

        } catch (err) {
            console.warn("failed to connect..", err);
        }
    };

    const app = new Web3(provider);
    const web3 = new app.eth.Contract(abi, address);

    const getNumber = async () => {
        try {
            setIsLoading('fetching');
            const numProduct = await web3.methods.numProduct().call() as string;
            setIsLoading('idle');
            setNumProduct(parseInt(numProduct));
            console.log(numProduct);

            // getProductData();
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
                    // storedData && console.log("stored data:", storedData);
                    // console.log("circle", _id);
                    arrayMed[_id] = storedData;
                }
                setProductsDetails(arrayMed);

                // console.log("retrieved data array is :", productsDetails);
                setIsLoading('idle');
            }
            console.log("fetch data is successed");
            // console.log(productsDetails);
        } catch (error) {
            setIsLoading('idle');
            toast.error('Error in fetching fleet');
        }
    };

    const handleAddProductData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading('adding');
            if (!account) {
                toast.error('Please connect to your wallet');
                setIsLoading('idle');
                return;
            }
            //=================== upload data to ipfs  =================//
            // handleSubmission();
            //==========================================================//
            await web3.methods
                .storeData(name, description, Number(price), cid, Number(allowed))
                .send({
                    from: account,
                    gas: '3000000',
                })
                .on('receipt', () => {
                    // setProductsDetails([]);
                    setNumProduct(Number(numProductt) + 1);
                    // console.log(numProductt);
                    // getNumber();
                    // getProductData();
                    toast.success('ProductData added to blockchain successfully');
                    setIsLoading('idle');
                })
                .on('error', () => {
                    throw new Error('Error in adding Productdata to blockchain');
                });

        } catch (error) {
            toast.error('Error in adding ProductData to blockchain');
            setIsLoading('idle');
        }

        // handleAddProductDataToDB();
    };

    const handleDeleteProductData = async (product: IProductDetals) => {

    }
    const handleEditProductData = async (product: IProductDetals) => {

    }

    useEffect(() => {
        if (connected) {
            connectToMetaMask();
            getNumber();
        }
    }, [connected]);

    useEffect(() => {
        numProductt && getProductData();
    }, [numProductt]);

    useEffect(() => {
        selectedFile && handleSubmission();
    }, [selectedFile]);

    //================================== filter product list =================================//
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

    return (
        <>
            {isLoading === 'fetching' ? (
                <PageLoading />
            ) : (
                <div className="flex flex-col justify-between items-center w-full bg-[#F5F5F5]">

                    {/* hero section */}
                    <div className="w-full relative">
                        <img src={heroimg} alt="logo" className="w-full h-[450px] object-cover" />
                        <div className="absolute w-full flex justify-center items-center h-32 bg-amber-500 m-auto left-0 right-0 top-0 bottom-0 text-[60px] text-[#f5f5f5] font-medium font-serif">All Products</div>
                    </div>

                    {/* create , update, delete products by administrators */}
                    <form onSubmit={handleAddProductData} className="grid grid-cols-2 gap-4 px-[40px] my-[20px] justify-between items-center w-full">
                        <div className="flex flex-col items-start justify-center space-x-3 w-full h-full">
                            {cid && (
                                <div className="w-full flex justify-center items-center mt-4">
                                    <img
                                        src={`${process.env.VITE_GATEWAY_URL}/ipfs/${cid}`}
                                        alt="ipfs image"
                                        className="max-w-[400px] w-full object-cover"
                                    />
                                    <div></div>
                                </div>
                            )}
                            {selectedFile && (
                                <section className="w-full flex flex-col justify-center items-center mt-4">
                                    File details:
                                    <ul className="w-full flex flex-col justify-center items-center">
                                        <li className="w-full flex justify-center items-center text-[14px] text-black font-medium m-atuo">Name: {selectedFile.name}</li>
                                        <li className="w-full flex justify-center items-center text-[14px] text-black font-medium m-atuo">Type: {selectedFile.type}</li>
                                        <li className="w-full flex justify-center items-center text-[14px] text-black font-medium m-atuo">Size: {selectedFile.size} bytes</li>
                                    </ul>
                                </section>
                            )}
                            {/* {selectedFile && <div onClick={handleSubmission} className="bg-green w-[100px]">Upload a file</div>} */}
                            <form className="flex flex-col justify-between items-center m-auto w-full">
                                <label htmlFor="file" className='w-[40%] flex justify-center items-center h-[40px] text-white font-medium
                                         bg-[#6C18D8] rounded-full px-5 border border-solid border-[#000000]' >
                                    Choose a photo.
                                </label>
                                <input id="file" type="file" onChange={handleFileChange} required style={{ display: "none" }} />
                            </form>

                        </div>
                        <div className="w-full h-full flex flex-col justify-between items-center">
                            <input
                                className="w-full bg-gray mt-4 h-10 rounded-lg px-5"
                                type="number"
                                placeholder="Enter productId"
                                value={productId}
                                onChange={(e) => {
                                    setProductId(e.target.value);
                                }}
                                required
                                disabled={!connected}
                            />
                            <input
                                className="w-full bg-gray mt-4 h-10 rounded-lg px-5"
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                required
                                disabled={!connected}
                            />
                            <input
                                className="w-full bg-gray mt-4 h-10 rounded-lg px-5"
                                type="text"
                                placeholder="Enter Descriptions"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                required
                                disabled={!connected}
                            />
                            <input
                                className="w-full bg-gray mt-4 h-10 rounded-lg px-5"
                                type="number"
                                placeholder="Enter Price"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                                required
                                disabled={!connected}
                            />

                            <input
                                className="w-full bg-gray mt-4 h-10 rounded-lg px-5"
                                type="text"
                                placeholder="Enter Allowed"
                                value={allowed}
                                onChange={(e) => {
                                    setAllowed(e.target.value);
                                }}
                                required
                                disabled={!connected}
                            />
                            <button className="w-full bg-gray mt-4 h-10 rounded-lg"
                                type="submit" disabled={!connected || isLoading === 'adding'}>
                                {isLoading === 'adding' ? 'Registering...' : 'Registe Productdata'}
                            </button>
                        </div>
                    </form>

                    {/* search for products by name */}
                    <div className="flex flex-row justify-between items-center mt-[50px] w-full px-[34px]">
                        <div className="text-[24px] font-bold">
                            Search By Filter
                        </div>
                        <form onSubmit={handleSearchProductByName} className="relative h-[60px] flex flex-row justify-between items-center">
                            <input type="text" value={filterName} placeholder="Search By Name..." onChange={(e) => setFilterName(e.target.value)} className="bg-white w-[359px] h-full px-4 rounded-md" />
                            <button type="submit" className="absolute w-[105px] h-[46px] top-0 bottom-0 right-[26px] m-auto bg-black text-[16px] text-white font-semibold rounded-[5px] z-10">
                                Filter
                            </button>
                        </form>
                    </div>

                    {/* display products */}
                    <div className='my-[10px] w-full px-[50px]'>
                        {isLoading === 'fetching' ? (
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
                                                showDeleteProduct={true} showEditProduct={true} showAddToCart={false}
                                                DeleteProduct={() => handleDeleteProductData(product)} EditProduct={() => handleEditProductData(product)}
                                            />
                                        </li>))
                                    }
                                </div>
                            </ul>)
                            :
                            (<ul className="w-full rounded-lg">
                                <div>
                                    Products number: <span>{filteredNumber && filteredNumber.toString()}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-9 w-full">
                                    {filteredProductsDetails && filteredProductsDetails.map((product, index) => (
                                        <li className="mt-10 w-full" key={index}>
                                            <ProductCard name={product.name.toString()} description={product.description.toString()} price={product.price.toString()} imgsrc={`${process.env.VITE_GATEWAY_URL}/ipfs/${product.imageaddress.toString()}`} imgalt="ipfs image" id={product.id.toString()} allowed={product.allowed.toString()}
                                                showDeleteProduct={true} showEditProduct={true} showAddToCart={false}
                                                DeleteProduct={() => handleDeleteProductData(product)} EditProduct={() => handleEditProductData(product)}
                                            />
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
