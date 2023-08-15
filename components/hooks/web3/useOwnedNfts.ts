import { ethers } from "ethers";
import { useCallback } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { CryptoHookFactory } from "@_types/hooks";
import { Nft } from "@_types/nft";

type UseOwnedNftsResponse = {
  listNft: (tokenId: number, price: number) => Promise<boolean>
}
type OwnedNftsHookFactory = CryptoHookFactory<Nft[], UseOwnedNftsResponse>

export type UseOwnedNftsHook = ReturnType<OwnedNftsHookFactory>

export const hookFactory: OwnedNftsHookFactory = ({contract}) => () => {
  const {data, ...swr} = useSWR(
    contract ? "web3/useOwnedNfts" : null,
    async () => {
      const nfts = [] as Nft[];
      const coreNfts = await contract!.getOwnedNfts();

      coreNfts.map(async (nft) => { 
        const tokenURI = await contract!.tokenURI(nft.tokenId)
        const metaRes = await fetch(tokenURI)
        const meta = await metaRes.json();

        if (meta.image.startsWith(process.env.NEXT_PUBLIC_PINATA_DOMAIN)) {
          nfts.push({
            price: parseFloat(ethers.utils.formatEther(nft.price)),
            tokenId: nft.tokenId.toNumber(),
            creator: nft.creator,
            isListed: nft.isListed,
            meta
          })
        }
      })

      return nfts;
    }
  )  
  const _contract = contract;
  const listNft = useCallback(async (tokenId: number, price: number) => {
    try {
      const result = await _contract!.placeNftOnSale(
        tokenId,  
        ethers.utils.parseEther(price.toString()),
        {
          value: ethers.utils.parseEther(0.025.toString())
        }
      )

      await result?.wait();
      
      await toast.promise(
        result!.wait(), {
          pending: "Processing transaction",
          success: "Item has been listed",
          error: "Processing error"
        }
      );
      
      return true;
    } catch (e: any) {
      console.error(e.message);
      return false;
    }
  }, [_contract])
  
  return {
    ...swr,
    listNft,
    data: data || [],
  };
}