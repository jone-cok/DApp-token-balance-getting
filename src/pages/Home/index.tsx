import React, { useState, FormEvent } from "react";
import { Contract, ethers, Wallet } from "ethers";
import { BigNumberish } from "ethers";

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

  //state variables

  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [address, setAddress] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAddress(address);
    fetchTokens()
      .then(data => {
        setTokens(data.result);
        console.log(data.result);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const fetchTokens = async (): Promise<TokensResponse> => {

    if (!ethers.isAddress(address)) {
      alert("Please enter a valid Etherem wallet address");
      throw new Error('Invalid Ethereum address');
    }
    const provider = new ethers.JsonRpcProvider('https://docs-demo.quiknode.pro/')
    const tokens = await provider.send("qn_getWalletTokenBalance", [{
      wallet: address,
      contracts: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', //WETH
        '0xdAC17F958D2ee523a2206206994597C13D831ec7', //USDT
        '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', //MATIC
        '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72', //ENS
      ]
    }]);
    // console.log(tokens);
    return tokens;
  }


  // Function to convert token balance to number
  const convertBalance = (balance: string, decimals: string) => {
    let balanceInEther =parseInt(balance, 10) / 1e18;
    let balanceFixed = balanceInEther.toFixed(2)
    return balanceFixed;
  };

  return (<div className="h-screen w-screen justify-center space-x-3">
    <div className="flex justify-center space-x-3 w-screen h-14 mt-10">
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
    </div>
    <div className="relative top-4/12 left-1/4 overflow-x-auto justify-center space-x-3 w-6/12 h-140 m-10">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead>
          <tr>
            <th
              className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-1000">
              Name
            </th>
            <th
              className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Symbol
            </th>
            <th
              className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Balance
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tokens.map((token, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-4 py-2 text-gray-900">{token.name}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-900">{token.symbol}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-900">{convertBalance(token.totalBalance, token.decimals)}</td>
              {/* <td className="whitespace-nowrap px-4 py-2 text-gray-900">{token.totalBalance}</td> */}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Home;
