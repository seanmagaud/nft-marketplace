/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next'
import { BaseLayout } from '@ui'

import { Nft } from '@_types/nft';
import { useOwnedNfts } from '@hooks/web3';
import { useEffect, useState } from 'react';

const tabs = [
  { name: 'Your Collection', href: '#', current: true },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Profile: NextPage = () => {
  const { nfts }  = useOwnedNfts();
  const [activeNft, setActiveNft] = useState<Nft>();

  useEffect(() => {
    if (nfts.data && nfts.data.length > 0) {
      setActiveNft(nfts.data[0]);
    }

    return () => setActiveNft(undefined)
  }, [nfts.data])

  return (
    <BaseLayout>
      <div className="h-full flex">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-bold text-lighter-red">Your NFTs</h1>
                </div>
                <div className="mt-3 sm:mt-2">
                  <div className="hidden sm:block">
                    <div className="flex items-center border-b border-light-red">
                      <nav className="flex-1 -mb-px flex space-x-6 xl:space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            aria-current={tab.current ? 'page' : undefined}
                            className={classNames(
                              tab.current
                                ? 'border-light-red text-lighter-red'
                                : 'border-transparent text-lighter-red hover:text-lighter-red hover:border-light-red',
                              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                            )}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>

                <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                  <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                  >
                    {(nfts.data as Nft[]).map((nft) => (
                      <li
                        key={nft.tokenId}
                        onClick={() => setActiveNft(nft)}
                        className="relative">
                        <div
                          className={classNames(
                            nft.tokenId === activeNft?.tokenId 
                              ? 'ring-2 ring-light-red'
                              : 'focus-within:ring-light-red',
                            'group block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden'
                          )}
                        >
                          <img
                            src={nft.meta.image}
                            alt=""
                            className={classNames(
                              nft.tokenId === activeNft?.tokenId  ? '' : 'group-hover:opacity-75',
                              'h-[200px] object-contain pointer-events-none'
                            )}
                          />
                          <button type="button" className="absolute inset-0 focus:outline-none">
                            <span className="sr-only">View details for {nft.meta.name}</span>
                          </button>
                        </div>
                        <p className="mt-2 block text-sm font-medium text-light-red truncate pointer-events-none text-center">
                          {nft.meta.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </main>

            {/* Details sidebar */}
            { activeNft &&
              <aside className="hidden w-96 bg-dark-blue p-8 rounded-md overflow-y-auto lg:block">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-center w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                      <img src={activeNft.meta.image} alt="" className="object-cover" />
                    </div>
                    <div className="mt-4 flex items-start justify-between">
                      <div>
                        <h2 className="text-xl test-center mb-4 font-medium text-light-red">
                          <span className="sr-only">Details for </span>
                          {activeNft.meta.name}
                        </h2>
                        <p className="text-sm font-medium text-light-red">{activeNft.meta.description}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-light-red">Information</h3>
                    <dl className="mt-2 border-t border-b border-light-red divide-y divide-light-red">
                      {activeNft.meta.attributes.map((attr) => (
                        <div key={attr.trait_type} className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-light-red">{attr.trait_type}: </dt>
                          <dd className="text-light-red text-right">{attr.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="flex">
                    <button
                      disabled={activeNft.isListed}
                      onClick={async () => {
                        const listing = nfts.listNft(
                          activeNft.tokenId,
                          activeNft.price
                        )
                        
                        if (await listing) {
                          setActiveNft({...activeNft, isListed: true})
                        }
                      }}
                      type="button"
                      className="disabled:text-gray-400 disabled:cursor-not-allowed flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    >
                      {activeNft.isListed ? "Nft is listed": "List Nft"}
                    </button>
                  </div>
                </div>
              </aside>
            }
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default Profile