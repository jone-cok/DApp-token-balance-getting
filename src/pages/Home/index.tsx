import React, { useState, FormEvent, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Contract, ethers, Wallet } from "ethers";
import { BigNumberish } from "ethers";
import dotenv from 'dotenv';
dotenv.config();
//================= ipfs ========================//
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

//================= token ========================//
interface TokenBalance {
  adress: string;
  // decimals: number;
  decimals: string;
  name: string;
  quantitityIn: string;
  quantitityOut: string;
  symbol: string;
  // amount: ethers.BigNumberish;
  totalBalance: string;
}
interface TokensResponse {
  address: string;
  ensName: string;
  nativeTokenBalance: string;
  pageNumber: number;
  result: TokenBalance[];
  totalItems: number;
  totalPages: number;
}
const Home = () => {
  //======================= token =====================//
  // const [tokens, setTokens] = useState<TokenBalance[]>([]);
  // const [address, setAddress] = useState('');
  //========================= ipfs =================//
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cid, setCid]: any = useState();

  //========================= token =================//
  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   setAddress(address);
  //   fetchTokens()
  //     .then(data => {
  //       setTokens(data.result);
  //       console.log(data.result);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  // const fetchTokens = async (): Promise<TokensResponse> => {

  //   if (!ethers.isAddress(address)) {
  //     alert("Please enter a valid Etherem wallet address");
  //     throw new Error('Invalid Ethereum address');
  //   }
  //   const provider = new ethers.JsonRpcProvider('https://docs-demo.quiknode.pro/')
  //   const tokens = await provider.send("qn_getWalletTokenBalance", [{
  //     wallet: address,
  //     contracts: [
  //       '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', //WETH
  //       '0xdAC17F958D2ee523a2206206994597C13D831ec7', //USDT
  //       '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', //MATIC
  //       '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72', //ENS
  //     ]
  //   }]);
  //   // console.log(tokens);
  //   return tokens;
  // }


  // // Function to convert token balance to number
  // const convertBalance = (balance: string, decimals: string) => {
  //   let balanceInEther = parseInt(balance, 10) / 1e18;
  //   let balanceFixed = balanceInEther.toFixed(2)
  //   return balanceFixed;
  // };


  //========================= ipfs upload files =====================//
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


  // async function fetchMetadataFromIpfs(cid: string): Promise<void> {
  //   try {
  //     const gatewayUrl = `https://ipfs.io/ipfs/${cid}`;

  //     const response = await fetch(gatewayUrl);
  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status} ${response.statusText}`);
  //     }
  //     // Try to parse as JSON
  //     try {
  //       const jsonData = await response.json();
  //       console.log('Fetched JSON data:', jsonData);
  //     } catch (jsonError) {
  //       // If JSON parsing fails, handle as binary data
  //       const blob = await response.blob();
  //       const url = URL.createObjectURL(blob);
  //       console.log('Fetched binary data:', url);

  //       // For demonstration, open the file in a new tab
  //       window.open(url);

  //       // Or create an <a> element to download the file
  //       // const link = document.createElement('a');
  //       // link.href = url;
  //       // link.download = 'file'; // Change to the desired file name
  //       // document.body.appendChild(link);
  //       // link.click();
  //       // document.body.removeChild(link);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data from IPFS:', error);
  //   }
  // }

  // Example usage
  // const cid = 'your_ipfs_cid_here';  // Replace with your IPFS CID

  // cid && fetchMetadataFromIpfs(cid);
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-x-3">
      <div className="bg-green my-[20px]">
        <Link to="/about">Go to the About Page</Link>
      </div>
      {/* <div className="flex justify-center space-x-3 w-screen h-14 mt-10">
        <form
          onSubmit={handleSubmit}
          className="w-4/12 h-15 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
          <input
            onChange={e => setAddress(e.target.value)}
            type="text"
            placeholder="Enter your Address here 🎯"
            className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
          <button
            type='submit'
            className="rounded-lg top-1 right-1 bottom-1 border absolute w-12 justify-center bg-blue-400 text-white p-3 font-bold uppercase bg-green"
          >
            GO
          </button>

        </form>
      </div> */}
      {/* <button
        onClick={pinFileToIPFS}
        className="rounded-lg w-[400px] justify-center bg-blue-400 text-white p-3 font-bold uppercase bg-green mt-[50px]">
        file upload
      </button> */}
      {/* <label className="form-label bg-warn"> Choose File</label> */}
      <div className="flex flex-col items-start justify-center space-x-3 my-[20px]">
        <div>
          <label htmlFor="file" className="sr-only">
            Choose a file
          </label>
          <input id="file" type="file" onChange={handleFileChange} />
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
          {selectedFile && <button onClick={handleSubmission} className="bg-green w-[100px]">Upload a file</button>}
        </div>
        {cid && (
          <div>
            <img
              src={`${process.env.VITE_GATEWAY_URL}/ipfs/${cid}`}
              alt="ipfs image"
              className="w-[200px] h-[200px] object-cover"
            />
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
