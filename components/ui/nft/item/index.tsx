import { FunctionComponent } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { Nft } from "@_types/nft";

type NftItemProps = {
  item: Nft;
  buyNft: (token: number, value: number) => Promise<void>;
}

function shortifyAddress(address: string) {
  return `0x****${address.slice(-4)}`
}

const NftItem: FunctionComponent<NftItemProps> = ({item, buyNft}) => {
  return (
    <>
      <div className="flex-shrink-0">
        <img
          className={`h-full w-full object-cover`}
          src={item.meta.image}
          alt="New NFT"
        />
      </div>
      <div className="flex-1 bg-dark-blue p-6 flex flex-col justify-between">
        <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="flex">
                <Jazzicon seed={jsNumberForAddress(item.creator)} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-lighter-red">Creator</p>
                <p className="text-xs font-medium text-lighter-red">{shortifyAddress(item.creator)}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-lighter-red">
              Sbab Creatures NFT
            </p>
          </div>
        </div>
        <div className="overflow-hidden mb-4">
          <dl className="-mx-4 -mt-4 flex flex-wrap justify-center">
            <div className="flex flex-col px-4 pt-4">
              <dt className="order-2 text-sm font-medium text-gray-500">Price</dt>
              <dd className="order-1 text-xl font-extrabold text-light-red">
                <div className="flex justify-center items-center">
                {item.price}
                  <img className="h-6" src="/images/small-eth.webp" alt="ether icon"/>
                </div>
              </dd>
            </div>
            { item.meta.attributes.map(attribute =>
              <div key={attribute.trait_type} className="flex flex-col px-4 pt-4">
                <dt className="order-2 text-sm font-medium text-gray-500">
                  {attribute.trait_type}
                </dt>
                <dd className="order-1 text-xl font-extrabold text-light-red">
                  {attribute.value}
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="flex justify-center">
          <button  
            onClick={() => {
              buyNft(item.tokenId, item.price);
            }}
            type="button"
            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-light-red hover:bg-lighter-red focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
            Purchase
          </button>
        </div>
      </div>
    </>
  )
}

export default NftItem;