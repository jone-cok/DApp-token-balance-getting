import { useSDK } from "@metamask/sdk-react";
import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import { abi, address } from '@/contract/constant';
import toast from 'react-hot-toast';

const index = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  // const inputRef = useRef(null);

  const [isLoading, setIsLoading] = useState('idle');
  const [number, setNumber] = useState(0);
  const [number_set, setNumber_set] = useState(0);

  const connectToMetaMask = async () => {
    try {
      const accounts: any = await sdk?.connect();
      setAccount(accounts?.[0] || '');
      console.log("success to connect to meta mask");
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const app = new Web3(provider);
  const web3 = new app.eth.Contract(abi, address);

  const getNumber = async () => {
    try {
      setIsLoading('fetching');
      const number = await web3.methods.getData().call() as number;
      setIsLoading('idle');
      setNumber(number);
      console.log(number);
    } catch (error) {
      setIsLoading('idle');
      toast.error('Error in fetching fleet');
    }
  };

  const handleAddNumber = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (inputRef.current && inputRef.current.value === '') {
    //   return;
    // }
    console.log(number_set);
    console.log(account);
    try {
      setIsLoading('adding');
      if (!account) {
        toast.error('Please connect to your wallet');
        setIsLoading('idle');
        return;
      }

      await web3.methods
        .setData(number_set)
        .send({
          from: account,
          gas: '3000000',
        })
        .on('receipt', () => {
          setNumber_set(0);
          getNumber();
          toast.success('Number added successfully');
          setIsLoading('idle');
        })
        .on('error', () => {
          throw new Error('Error in adding number');
        });
    } catch (error) {
      toast.error('Error in adding number');
      setIsLoading('idle');
    }
  };

  useEffect(() => {
    if (connected) {
      getNumber();
    }
  }, [connected]);

  return (
    <div className="App">

      <section className='my-[20px]'>
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
        <div className='my-[10px]'>
          {isLoading === 'fetching' ? (
            <p>Fetching number...</p>
          ) : (
            <p>
              Number: <span>{number}</span>
            </p>
          )}
        </div>
        <div className='my-[10px]'>
          <form onSubmit={handleAddNumber}>
            <input
              type="number"
              placeholder="Enter number"
              value={number_set}
              onChange={(e) => {
                setNumber_set(Number(e.target.value));
              }}
              required
              disabled={!connected}
            />
            <button type="submit" disabled={!connected || isLoading === 'adding'} className="bg-curiousblue rounded-md hover:bg-codgray">
              {isLoading === 'adding' ? 'Adding...' : 'Add Number'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default index
