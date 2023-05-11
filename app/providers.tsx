'use client';

import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { LensConfig, development } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import { LensProvider } from '@lens-protocol/react-web';

const { provider, webSocketProvider } = configureChains([polygon, mainnet], [publicProvider()]);
const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
});
const lensConfig: LensConfig = {
    bindings: wagmiBindings(),
    environment: development,
};

export function Providers({ children }: any) {
    return (
        <WagmiConfig client={client}>
            <LensProvider config={lensConfig}>
                {children}
            </LensProvider>
        </WagmiConfig>
    );
}