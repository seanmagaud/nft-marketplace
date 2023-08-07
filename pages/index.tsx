import { BaseLayout, NftList } from "@ui";
import { NftMeta } from '@_types/nft';
import nfts from "../content/meta.json";
import { useWeb3 } from "@providers/web3";
import { useListedNfts } from '@hooks/web3';

export default function Home() {
  const {provider, contract} = useWeb3()
  const { nfts } = useListedNfts();

  console.log(nfts.data);
  const getNftInfo = async () => {
    // console.log(await contract!.name())
    // console.log(await contract!.symbol())
  }
  if (contract) {
    getNftInfo()
  }
  const getAccounts = async () => {
    // const accounts = await provider!.listAccounts();
    // console.log(accounts[0], "eheheh")
  }
  if (provider) {
    getAccounts()
  }
  return (
    <BaseLayout> 
      <div className="relative bg-cyan pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="h-1/3 sm:h-2/3" />
        </div>
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-200 sm:text-4xl">Amazing Creatures NFTs</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-200 sm:mt-4">
              Mint a NFT to get unlimited ownership forever!
            </p>
          </div>
          <NftList
            nfts={nfts?.data}
          />
        </div>
      </div>
    </BaseLayout>
  )
}
