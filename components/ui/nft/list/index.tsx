import { useListedNfts } from "@hooks/web3";
import { FunctionComponent } from "react";
import NftItem from "../item";


const NftList: FunctionComponent = () => {
  const { nfts } = useListedNfts();

  return (
    <>
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        { nfts.data?.map(nft =>
          <div key={nft.meta.image} className="flex flex-col rounded-lg shadow-lg overflow-hidden border border-lightest-red">
            <NftItem
              item={nft}
              buyNft={nfts.buyNft}
            />
          </div>
        )}
      </div>
      
      { nfts.data?.length === 0 &&
        <h2 className="text-3xl tracking-tight font-extrabold text-lighter-red text-center">
          Please connect your metamask wallet to load the marketplace
        </h2> 
      }
    </>
  )
}

export default NftList;