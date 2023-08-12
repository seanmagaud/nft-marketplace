
import { CryptoHookFactory } from "@_types/hooks";
import { Nft } from "@_types/nft";
import { ethers } from "ethers";
import { useCallback } from "react";
import useSWR from "swr";

type UseListedNftsResponse = {
  buyNft: (token: number, value: number) => Promise<void>
}

type ListedNftsHookFactory = CryptoHookFactory<Nft[], UseListedNftsResponse>

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>

export const hookFactory: ListedNftsHookFactory = ({contract}) => () => {
  const {data, ...swr} = useSWR(
    contract ? "web3/useListedNfts" : null,
    async () => {
      const nfts = [] as Nft[];
      const coreNfts = await contract!.getAllNftsOnSale();
      
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
  const buyNft = useCallback(async (tokenId: number, value: number) => {
    try {
      const result = await _contract!.buyNft(
        tokenId, {
          value: ethers.utils.parseEther(value.toString())
        }
      )

      await result?.wait();
      alert("You have bought Nft. See profile page.")
    } catch (e: any) {
      console.error(e.message);
    }
  }, [_contract])

  return {
    ...swr,
    buyNft,
    data: data || [],
  };
}