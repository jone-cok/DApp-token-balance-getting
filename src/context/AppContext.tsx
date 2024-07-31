// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useSDK } from '@metamask/sdk-react';
// import Web3 from 'web3';
// import { abi, address } from '@/contract/constant';

// // Define the shape of the context state
// interface AppContextState {
//     account: string;
//     connectToMetaMask: () => void;
//     connected: boolean;
//     connecting: boolean;
//     provider: any; // Replace with the actual type if available
//     sdk: any; // Replace with the actual type if available
//     web3: any; // Web3 instance
// };

// // Default context state
// const defaultContextState: AppContextState = {
//     account: '',
//     connectToMetaMask: () => { },
//     connected: false,
//     connecting: false,
//     provider: {}, // Replace with the actual type if available
//     sdk: {}, // Replace with the actual type if available
//     web3: {}, // Initialize with a default Web3 instance
// };

// // Create context with default state
// const AppContext = createContext<AppContextState>(defaultContextState);

// interface IAppContextProvider {
//     children?: React.ReactNode;
// }

// export const AppContext: React.FC<IAppContextProvider> = ({ children }) => {
//     const [account, setAccount] = useState('');
//     const { sdk, connected, connecting, provider } = useSDK();

//     const connectToMetaMask = async () => {
//         console.log('Connecting to');
//         try {
//             const accounts: any = await sdk?.connect();
//             setAccount(accounts?.[0] || '');
//             console.log("failed to connect to meta mask");
//         } catch (err) {
//             console.log(`failed to connect..`, err);
//         }
//     };

//     const app = new Web3(provider);
//     const web3 = new app.eth.Contract(abi, address);

//     useEffect(() => {
//         if (!account) {
//             connectToMetaMask();
//         }
//     }, [connected]);

//     return (
//         <AppContext.Provider
//             value={{
//                 account,
//                 connectToMetaMask,
//                 connected,
//                 connecting,
//                 provider,
//                 sdk,
//                 web3,
//             }}
//         >
//             {children}
//         </AppContext.Provider>
//     );
// };

// export const useAppContext = () => useContext(AppContext);
// export default AppContext;
import React from 'react'

const AppContext = () => {
  return (
    <div>
      
    </div>
  )
}

export default AppContext
