'use client';

import { useAccount, useConnect, useDisconnect, useEnsName, useSignMessage } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MyButton } from "./MyButton"

function Profile() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()
    const { data, isSuccess } = useEnsName({
        address: address,
        chainId: 1,
    })

    if (isConnected)
        return (
            <div className="flex flex-col place-items-center bg-gray-200">
                <div className="">
                    Connected to
                </div>
                <div>
                    {
                        isSuccess ?
                            data :
                            address?.slice(0, 6).concat("...").concat(address?.slice(-4))
                    }
                </div>
                <div>
                    <MyButton onClick={() => disconnect()}>Disconnect</MyButton>
                </div>
            </div>
        )
    return <MyButton onClick={() => connect()}>Connect Wallet</MyButton>
}

function Sign() {
    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
        message: 'gm wagmi frens',
    })

    return (
        <div className="flex flex-col place-items-center bg-gray-200">
            <MyButton disabled={isLoading} onClick={() => signMessage()}>
                Sign message
            </MyButton>
            {isSuccess && <div className="bg-green-200">success</div>}
            {isError && <div className="bg-red-200">Error signing message</div>}
        </div>
    )
}

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>test</div>
            <Sign />
            <Profile />
        </main>
    )
}
