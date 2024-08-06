import { useSDK } from "@metamask/sdk-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import Web3 from 'web3';
import toast from 'react-hot-toast';
import { customToast } from "@/components/Toast";
import { abi, address } from '@/contract/constant_9_smartContractBank';
import { ProductResponse, IProduct } from "@/types/Product.types";
import Product from '@/service/apis/product';
import path from "@/constants/path";

import { checkJWT } from "@/routes/AuthPageRoute";
import ProductCard from "@/components/Card/PictureCard";
import PageLoading from "@/components/Loading/PageLoading";

import heroimg from '@/assets/images/heroImage.png';
import LoaderImg from "@/assets/gifs/loader.gif";
import { ethers } from "ethers";


interface IProductDetals {
    productId: number;
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
    const [imageaddress, setImageaddress]: any = useState();

    //======== update or register product =========//
    const [updateProductState, setUpdateProductState] = useState(false);


    //===================== get products from blockchain =================//
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

    // const getNumber = async () => {
    //     try {
    //         setIsLoading('fetching');
    //         const numProduct = await web3.methods.numProduct().call() as string;
    //         setIsLoading('idle');
    //         setNumProduct(parseInt(numProduct));
    //         console.log(numProduct);

    //         // getProductData();
    //     } catch (error) {
    //         setIsLoading('idle');
    //         toast.error('Error in fetching numProduct');
    //     }
    // };
    // const getProductData = async () => {
    //     try {
    //         setIsLoading('fetching');
    //         if (numProductt) {
    //             console.log("numProduct is exist", numProductt);

    //             let arrayMed = [];
    //             for (let _id = 0; _id < numProductt; _id++) {
    //                 const storedData = await web3.methods.products(_id).call() as IProductDetals;
    //                 // storedData && console.log("stored data:", storedData);
    //                 // console.log("circle", _id);
    //                 arrayMed[_id] = storedData;
    //             }
    //             setProductsDetails(arrayMed);

    //             // console.log("retrieved data array is :", productsDetails);
    //             setIsLoading('idle');
    //         }
    //         console.log("fetch data is successed");
    //         // console.log(productsDetails);
    //     } catch (error) {
    //         setIsLoading('idle');
    //         toast.error('Error in fetching fleet');
    //     }
    // };

    //========== prodcut create, read, update, delete handlers =========//
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
            setImageaddress(resData.IpfsHash);
            console.log(resData);
        } catch (error) {
            console.log(error);
        }
    };
    const handleAddProductData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateProductState ? handleUpdateProductDataById() : handleAddProductDataToDB();
        updateProductState && setUpdateProductState(() => false);
    };

    const handleDeleteProductData = async (product: IProduct) => {
        handleDeleteProductDataById(product);
    }
    const handleEditProductData = async (product: IProduct) => {
        setProductId(() => product.productId.toString());
        setName(() => product.name.toString());
        setDescription(() => product.description.toString());
        setPrice(() => product.price.toString());
        setImageaddress(() => product.imageaddress.toString());
        setAllowed(() => product.allowed.toString());
        setUpdateProductState(() => true);
        console.log(product.imageaddress);
        console.log(imageaddress);
    }

    //====================== product create, read, update, delete implement with mongodb =================================//
    const [productAllFromDB, setProductAllFromDB] = useState<IProductDetals[]>([]);
    const [productFromDB, setProductFromDB] = useState<IProductDetals>();

    const handleAddProductDataToDB = async () => {
        checkJWT();
        console.log(localStorage.getItem('token'));
        const productIdn: number = Number(productId);
        const allowedn: number = Number(allowed);
        const pricen: number = Number(price);

        const resp = (await Product.addProduct({ productId: productIdn, name, description, price: pricen, imageaddress, allowed: allowedn }) as ProductResponse);
        if (resp.status === 200) {
            customToast({
                toastType: "success",
                title: "Product is registered successfully!",
            });

        } else if (resp.status === 401) {
            customToast({
                toastType: "error",
                title: resp.message as string,
            });
            localStorage.removeItem("token");
            navigate(path.LOGIN);
        } else {
            customToast({
                toastType: "error",
                title: resp.message as string,
            });
        }
        handleGetProductDataAll();
    };
    const handleUpdateProductDataById = async () => {
        checkJWT();
        console.log(localStorage.getItem('token'));
        const productIdn: number = Number(productId);
        const allowedn: number = Number(allowed);
        const pricen: number = Number(price);
        const resp = (await Product.updateProduct(productId, { productId: productIdn, name, description, price: pricen, imageaddress, allowed: allowedn }) as ProductResponse);
        if (resp.status === 200) {
            customToast({
                toastType: "success",
                title: "Product is registered successfully!",
            });
        } else if (resp.status === 401) {
            customToast({
                toastType: "error",
                title: resp.message as string,
            });
            localStorage.removeItem("token");
            navigate(path.LOGIN);
        } else {
            customToast({
                toastType: "error",
                title: resp.message as string,
            });
        }
        handleGetProductDataAll();

    };

    const handleGetProductDataById = async () => {
        const resp = (await Product.getProduct(productId) as ProductResponse);

        if (resp.status === 200) {
            setProductFromDB(resp.productData);
            console.log(String(resp.productData));
            customToast({
                toastType: "success",
                title: "Product is getted successfully!",
            });
        } else if (resp.status === 401) {
            customToast({
                toastType: "error",
                title: resp.message as string,
            });
            localStorage.removeItem("token");
            navigate(path.LOGIN);
        } else {
            customToast({
                toastType: "error",
                title: resp.message as string,
            });
        }
    };

    const handleDeleteProductDataById = async (product: IProduct) => {
        const resp = (await Product.deleteProduct(product.productId.toString()) as ProductResponse);
        if (resp.status === 200) {
            customToast({
                toastType: "success",
                title: "Product is deleted successfully!",
            });
        } else if (resp.status === 401) {
            customToast({
                toastType: "error",
                title: resp.message as string,
            });
            localStorage.removeItem("token");
            navigate(path.LOGIN);
        } else {
            customToast({
                toastType: "error",
                title: resp.message as string,
            });
        }
        handleGetProductDataAll();

    };
    const handleGetProductDataAll = async () => {
        try {
            setIsLoading('fetching');
            const resp = (await Product.getProduct('') as ProductResponse);

            if (resp.status === 200) {
                // resp.productAll && setProductAllFromDB(resp.productAll);
                // console.log(resp.productAll);
                let arrayMed = [];
                if (resp.productAll) {
                    for (let j = 0; j < resp.productAll.length; j++) {
                        arrayMed[j] = resp.productAll[j] as IProductDetals;
                    }
                }
                setProductAllFromDB(arrayMed);
                // console.log("products length", arrayMed);
                // customToast({
                //     toastType: "success",
                //     title: "Product is getted successfully!",
                // });
                // console.log("retrieved data array is :", productsDetails);
                setIsLoading('idle');
            } else if (resp.status === 401) {
                setIsLoading('idle');
                // customToast({
                //     toastType: "error",
                //     title: resp.message as string,
                // });
                localStorage.removeItem("token");
                navigate(path.LOGIN);
            } else {
                setIsLoading('idle');
                // customToast({
                //     toastType: "error",
                //     title: resp.message as string,
                // });
            }
        } catch (error) {
            setIsLoading('idle');
            toast.error('Error in fetching fleet');
        }
    };

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

        if (productAllFromDB) {
            let arrayMed: IProductDetals[] = [];
            let filteredCnt: number = 0;
            for (let i = 0; i < productAllFromDB.length; i++) {
                if (productAllFromDB[i].name.toLowerCase().includes(filterName.toLowerCase())) {
                    arrayMed[filteredCnt] = productAllFromDB[i];
                    filteredCnt++;
                }
            }
            console.log(filteredCnt);
            console.log(arrayMed);
            setFilteredNumber(filteredCnt);
            setFilteredProductsDetails(arrayMed);
        }
    }

    //========================== withraw eth from smart wallet to owner account ===============//
    const [withrawedEth, setWithrawedEth] = useState('0');
    const [totalWithrawedEth, setTotalWithrawedEth] = useState('0');
    const getWithraedEth = async () => {
        try {
            // setIsLoading('fetching');
            const withraedEth = await web3.methods.getBalance().call() as string;
            // setIsLoading('idle');
            // setNumProduct(parseInt(numProduct));
            console.log(withraedEth);
            setWithrawedEth(ethers.formatEther(BigInt(withraedEth)));

            // getProductData();
        } catch (error) {
            setIsLoading('idle');
            toast.error('Error in fetching numProduct');
        }
    };
    const getTotalWithraedEth = async () => {
        try {
            // setIsLoading('fetching');
            const totalWithraedEth = await web3.methods.balanceReceived().call() as string;
            // setIsLoading('idle');
            // setNumProduct(parseInt(numProduct));
            console.log(totalWithraedEth);
            setTotalWithrawedEth(ethers.formatEther(BigInt(totalWithraedEth)));

            // getProductData();
        } catch (error) {
            setIsLoading('idle');
            toast.error('Error in fetching numProduct');
        }
    };
    const handleWithrawToOwner = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('withraw is clicked');
        getWithraedEth();

        try {
            // setIsLoading('adding');
            if (!account) {
                toast.error('Please connect to your wallet');
                // setIsLoading('idle');
                return;
            }
            //=================== upload data to ipfs  =================//
            // handleSubmission();
            //==========================================================//
            await web3.methods
                .withdrawMoney()
                .send({
                    from: account,
                    // value: availableToWithdraw,
                })
                // .on("transactionHash", function (hash: string) {
                //     console.log(hash);
                // })
                // .on(
                //     "confirmation",
                //     function (confirmationNumber: number, receipt: unknown) {
                //         console.log(confirmationNumber);
                //         console.log(receipt);
                //     }
                // )
                .on("receipt", (receipt: unknown) => {
                    // receipt example
                    console.log(receipt);
                    // setWithrawedEth(Number(receipt));
                })
                .on("error", () => {
                    // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                    throw new Error('Error in adding Productdata to blockchain');
                });

        } catch (error) {
            toast.error('Error in adding ProductData to blockchain');
            // setIsLoading('idle');
        }

    };

    useEffect(() => {
        if (connected) {
            connectToMetaMask();
            // getNumber();
            handleGetProductDataAll();
            getTotalWithraedEth();
        }
    }, [connected]);

    // useEffect(() => {
    //     numProductt && getProductData();
    // }, [numProductt]);

    useEffect(() => {
        selectedFile && handleSubmission();
    }, [selectedFile]);

    return (
        <>
            {isLoading === 'fetching' ? (
                <PageLoading />
            ) : (
                <div className="flex flex-col justify-between items-center w-full bg-[#F5F5F5]">

                    {/* hero section */}
                    <div className="w-full relative">
                        <img src={heroimg} alt="logo" className="w-full h-[450px] object-cover" />
                        <div className="absolute w-full flex justify-center items-center h-32 bg-amber-500 m-auto left-0 right-0 top-0 bottom-0 text-[60px] text-[#f5f5f5] font-medium font-serif">
                            Administrator
                        </div>
                    </div>

                    <form onSubmit={handleWithrawToOwner} className="w-full flex justify-around items-center bg-slategray p-10 ">
                        <button className="text-[20px] text-white cursor-pointer" type='submit' >Withraw all balance</button>
                        <label className="text-[16px] text-white">Withrawed Eth:<span className="px-5">{withrawedEth}</span></label>
                        <label className="text-[16px] text-white">Total Withrawed Eth:<span className="px-5">{totalWithrawedEth}</span></label>

                    </form>
                    {/* create , update, delete products by administrators */}
                    <form onSubmit={handleAddProductData} className="grid grid-cols-2 gap-4 px-[40px] my-[20px] justify-between items-center w-full">
                        <div className="flex flex-col items-start justify-between space-x-3 w-full h-[400px] border border-solid border-green">
                            {imageaddress && (
                                <div className="w-full flex justify-center items-center mt-4">
                                    <img
                                        src={`${process.env.VITE_GATEWAY_URL}/ipfs/${imageaddress}`}
                                        alt="ipfs image"
                                        className="max-w-[400px] w-full h-[300px] object-fit"
                                    />
                                </div>
                            )}
                            {selectedFile && (
                                <section className="w-full flex flex-col justify-center items-center mt-auto">
                                    File details:
                                    <ul className="w-full flex flex-col justify-center items-center">
                                        <li className="w-full flex justify-center items-center text-[14px] text-black font-medium m-atuo">Name: {selectedFile.name}</li>
                                        <li className="w-full flex justify-center items-center text-[14px] text-black font-medium m-atuo">Type: {selectedFile.type}</li>
                                        <li className="w-full flex justify-center items-center text-[14px] text-black font-medium m-atuo">Size: {selectedFile.size} bytes</li>
                                    </ul>
                                </section>
                            )}
                            {/* {selectedFile && <div onClick={handleSubmission} className="bg-green w-[100px]">Upload a file</div>} */}
                            <div className="flex flex-col justify-between items-center m-auto w-full">
                                <label htmlFor="file" className='w-[40%] flex justify-center items-center h-[40px] text-white font-medium
                                         bg-[#6C18D8] rounded-full px-5 border border-solid border-[#000000]' >
                                    Choose a photo.
                                </label>
                                <input id="file" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                            </div>

                        </div>
                        <div className="w-full h-full flex flex-col justify-between items-center">
                            <input
                                className="w-full bg-gray h-10 rounded-lg px-5"
                                type="number"
                                placeholder="Enter productId"
                                value={productId}
                                onChange={(e) => {
                                    setProductId(e.target.value);
                                }}
                                required
                                disabled={!connected}
                            ></input>
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
                                {isLoading === 'adding' ? (updateProductState ? 'Updating...' : 'Registering...') : (updateProductState ? 'Update Productdata' : 'Registe Productdata')}
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
                                    Products number: <span>{productAllFromDB && productAllFromDB.length.toString()}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-9 w-full">
                                    {productAllFromDB && productAllFromDB.map((product, index) => (
                                        <li className="mt-10 w-full" key={index}>
                                            <ProductCard name={product.name.toString()} description={product.description.toString()} price={product.price.toString()} imgsrc={`${process.env.VITE_GATEWAY_URL}/ipfs/${product.imageaddress.toString()}`} imgalt="ipfs image" id={product.productId.toString()} allowed={product.allowed.toString()}
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
                                            <ProductCard name={product.name.toString()} description={product.description.toString()} price={product.price.toString()} imgsrc={`${process.env.VITE_GATEWAY_URL}/ipfs/${product.imageaddress.toString()}`} imgalt="ipfs image" id={product.productId.toString()} allowed={product.allowed.toString()}
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
