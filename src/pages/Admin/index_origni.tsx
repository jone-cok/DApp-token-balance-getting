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

interface IProductDetals {
  id: number;
  name: string;
  description: string;
  price: number;
  imageaddress: string;
  allowed: boolean;
}

const index = () => {
  const navigate = useNavigate();

  //====================== active ========================================//

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
          setProductsDetails(arrayMed);
        }
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
        .storeData(name, description, Number(price), imageaddress, Boolean(allowed))
        .send({
          from: account,
          gas: '3000000',
        })
        .on('receipt', () => {
          // setProductsDetails([]);
          numProductt && setNumProduct(numProductt + 1);
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

    handleAddProductDataToDB();
  };

  useEffect(() => {
    if (connected) {
      getNumber();
    }
  }, [connected]);

  useEffect(() => {
    numProductt && getProductData();
  }, [numProductt]);
  useEffect(() => {
    selectedFile && handleSubmission();
  }, [selectedFile]);












  //====================== test mongodb =================================//
  const [productFromDB, setProductFromDB] = useState<IProduct>()

  const handleAddProductDataToDB = async () => {
    checkJWT();
    const productIdn: number = Number(productId);
    const allowedn: number = Number(allowed);
    const pricen: number = Number(price);
    console.log(localStorage.getItem('token'));
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
  };
  const handleUpdateProductDataById = async () => {
    checkJWT();
    const productIdn: number = Number(productId);
    const allowedn: number = Number(allowed);
    const pricen: number = Number(price);
    console.log(localStorage.getItem('token')); const resp = (await Product.updateProduct(productId, { productId: productIdn, name, description, price: pricen, imageaddress, allowed: allowedn }) as ProductResponse);
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

  const handleDeleteProductDataById = async () => {
    const resp = (await Product.deleteProduct(productId) as ProductResponse);
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
  };

  return (
    <div className="App">

      {/* connect to metamask section */}
      <button style={{ padding: 10, margin: 10 }} onClick={connectToMetaMask}>
        Connect
      </button>
      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )}

      {/* product data register and get section with block and mongodb */}

      <section className='my-[20px] flex flex-row justify-between items-center'>
        <div className='my-[10px] w-[50%] flex flex-col justify-between items-center'>

          {/* product data register section */}

          <form onSubmit={handleAddProductData} className="flex flex-col justify-between items-center w-full">
            <input
              className="w-[50%] bg-gray mt-4 h-10 rounded-lg"
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
              className="w-[50%] bg-gray mt-4 h-10 rounded-lg"
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
              className="w-[50%] bg-gray mt-4 h-10 rounded-lg"
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
              className="w-[50%] bg-gray mt-4 h-10 rounded-lg"
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
              className="w-[50%] bg-gray mt-4 h-10 rounded-lg"
              type="text"
              placeholder="Enter Allowed"
              value={allowed}
              onChange={(e) => {
                setAllowed(e.target.value);
              }}
              required
              disabled={!connected}
            />
            <div className="flex flex-col items-start justify-center space-x-3 my-[50px]">
              <div>
                <label htmlFor="file" className="sr-only">
                  Choose a file
                </label>
                <input id="file" type="file" onChange={handleFileChange} required />
              </div>
              <div className="flex flex-col justify-center items-center">
                {selectedFile && (
                  <section>
                    File details:
                    <ul>
                      <li>Name: {selectedFile.name}</li>
                      <li>Type: {selectedFile.type}</li>
                      <li>Size: {selectedFile.size} bytes</li>
                    </ul>
                  </section>
                )}
                {/* {selectedFile && <div onClick={handleSubmission} className="bg-green w-[100px]">Upload a file</div>} */}
              </div>
              {imageaddress && (
                <div>
                  <img
                    src={`${process.env.VITE_GATEWAY_URL}/ipfs/${imageaddress}`}
                    alt="ipfs image"
                    className="w-[200px] h-[200px] object-cover"
                  />
                  <div></div>
                </div>
              )}
            </div>
            <button className="w-[50%] bg-gray mt-4 h-10 rounded-lg"
              type="submit" disabled={!connected || isLoading === 'adding'}>
              {isLoading === 'adding' ? 'Adding...' : 'Add productdata'}
            </button>
          </form>

          {/* product data get by id section from mongodb*/}
          <div>
            <label>{productFromDB?.name}</label>
          </div>
          <button className="w-[50%] bg-gray mt-4 h-10 rounded-lg" onClick={handleGetProductDataById}>
            Get Product by Id from DB
          </button>
          <button className="w-[50%] bg-gray mt-4 h-10 rounded-lg" onClick={handleDeleteProductDataById}>
            Delete Product by Id from DB
          </button>
          <button className="w-[50%] bg-gray mt-4 h-10 rounded-lg" onClick={handleUpdateProductDataById}>
            Update Product by Id from DB
          </button>
        </div>

        {/* product data get from blockchain(ipfs and smartcontract) section */}

        <div className="flex flex-col justify-between items-center w-[50%]">
          {/* <div className='my-[10px] bg-salmon rounded-sm '>
            {!connected && (
              <button onClick={connectToMetaMask}>
                {connecting ? 'Connecting...' : 'Connect to MetaMask'}
              </button>
            )}
          </div> */}
          <div className='my-[10px] w-full'>
            {isLoading === 'fetching' ? (
              <p>Fetching Data...</p>
            ) : (
              <ul className="w-full rounded-lg">
                <div>
                  Products number: <span>{numProductt && numProductt.toString()}</span>
                </div>
                {productsDetails && productsDetails.map((product, index) => (
                  <li className="bg-green mt-10 rounded-lg" key={index}>
                    <div>
                      id: <span>{product.id.toString()}</span>
                    </div>
                    <div>
                      name: <span>{product.name.toString()}</span>
                    </div>
                    <div>
                      desc: <span>{product.description.toString()}</span>
                    </div>
                    <div>
                      price: <span>{product.price.toString()}</span>
                    </div>
                    {/* <div>
                      imgaddress: <span>{product.imageaddress.toString()}</span>
                      <img
                        src={`${process.env.VITE_GATEWAY_URL}/ipfs/${product.imageaddress.toString()}`}
                        alt="ipfs image"
                        className="w-[200px] h-[200px] object-cover"
                      />
                    </div> */}
                    <div>
                      allowed: <span>{product.allowed.toString()}</span>
                    </div>
                  </li>))
                }
              </ul>
            )}
          </div>

        </div>
      </section>
    </div>
  )
}

export default index
