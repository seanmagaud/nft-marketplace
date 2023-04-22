import useSWR from "swr";
import { CryptoHookFactory } from "@_types/hooks";
import { useEffect } from "react";

type UseAccountResponse = {
  connect: () => void;
  isLoading: boolean;
  isInstalled: boolean;
}

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>

export type UseAccountHook = ReturnType<AccountHookFactory>
export const hookFactory: AccountHookFactory = ({provider, ethereum, isLoading}) => () => {  
  const {data, mutate, isValidating, ...swr} = useSWR(
    provider ? "web3/useAccount" : null,
    async () => {
      const account = await provider!.listAccounts();
      
      if (!account[0]) throw "Cannot retreive account. Please, connect to web3 wallet."
      return account[0];
    }, {
      revalidateOnFocus: false
    }
  )

  useEffect(() => {
    ethereum?.on("accountsChanged", handleAccountsChanged)

    return () => {
      ethereum?.removeListener("accountsChanged", handleAccountsChanged)
    }
  })

  const handleAccountsChanged = (...args: unknown[]) => {
    const accounts = args[0] as string[];

    if (accounts.length === 0) console.error("Please, connect to Web3 wallet")
    else if (accounts[0] !== data) mutate(accounts[0])
  }

  const connect = async () => {
    try {
      ethereum?.request({method: "eth_requestAccounts"});
    } catch(e) {
      console.error(e);
    }
  }

  return {
    ...swr,
    data,
    isValidating,
    isLoading: isLoading || isValidating,
    isInstalled: ethereum?.isMetaMask || false,
    mutate,
    connect
  };
}

export const useAccount = hookFactory({ethereum: undefined, provider: undefined});