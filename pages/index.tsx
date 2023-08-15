import { BaseLayout, NftList } from "@ui";
import { useNetwork } from '@hooks/web3';
import { ExclamationIcon } from '@heroicons/react/solid';

export default function Home() {
  const { network } = useNetwork();

  return (
    <BaseLayout> 
      <div className="relative bg-dark pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="h-1/3 sm:h-2/3" />
        </div>
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-lighter-red sm:text-4xl">Sbab Creatures NFTs</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-light-red sm:mt-4">
              Mint a NFT to get unlimited ownership forever!
            </p>
          </div>
            { network.isConnectedToNetwork ?
            <NftList /> :
            <div className="rounded-md bg-yellow-50 p-4 mt-10">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                    { network.isLoading ?
                      "Loading..." :
                      `Connect to ${network.targetNetwork}`
                    }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </BaseLayout>
  )
}
