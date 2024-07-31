import React from 'react';
import { MetaMaskProvider } from '@metamask/sdk-react';
import icon from '@/assets/koc.png';

interface IMetamaskProvider {
    children?: React.ReactNode;
}
const myurl = window.location.host;
console.log(myurl);
const MetamaskProvider: React.FC<IMetamaskProvider> = ({ children }) => {
    return (
        <>
            <MetaMaskProvider
                debug={true}
                sdkOptions={{
                    dappMetadata: {
                        name: 'Storage App',
                        url: window.location.href,
                    },
                    infuraAPIKey: process.env.INFURA_API_KEY,

                }}
            >
                {children};
            </MetaMaskProvider>
        </>
    );
};

export default MetamaskProvider;