import { CryptoHookFactory } from "@_types/hooks";
import { Nft } from "@_types/nft";
import { ethers } from "ethers";
import { useCallback } from "react";
import useSWR from "swr";

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

        nfts.push({
          price: parseFloat(ethers.utils.formatEther(nft.price)),
          tokenId: nft.tokenId.toNumber(),
          creator: nft.creator,
          isListed: nft.isListed,
          meta
        })
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
      alert("Item has been listed!")
      
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