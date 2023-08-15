# NFT Marketplace

Welcome to the NFT Marketplace repository! This project aims to provide a decentralized platform for trading NFTs (Non-Fungible Tokens).

The marketplace is hosted on Vercel and can be accessed at [https://nftmarketplace-kohl.vercel.app/](https://nftmarketplace-kohl.vercel.app/).
![screen1](https://github.com/seanmagaud/nftmarketplace/assets/90192506/d428c180-815c-47a0-ba24-e7d9b72d2275)



## Getting Started

To explore and use the NFT Marketplace, you need to be connected to the Sepolia network using a MetaMask wallet. 

You can find all the transactions on [Etherscan](https://sepolia.etherscan.io/address/0x7abe7b293f2debbd24f066fec70597fa6ebea13f).

## Technology Stack

The NFT Marketplace leverages a robust technology stack to deliver its functionality:

- **Smart Contracts**: The backend of the marketplace is powered by Solidity smart contracts. These contracts handle the core logic of creating, listing, and trading NFTs. The contracts are developed using the [Truffle framework](https://trufflesuite.com/docs/truffle/) and deployed on the [Sepolia network](https://ethereum.org/nb/developers/docs/networks/#ethereum-testnets).

- **Web3 Development**: The integration with the Sepolia network and [MetaMask](https://metamask.io/) is achieved using [ethers.js library](https://docs.ethers.org/v5/), which provides an easy way to interact with Ethereum-based networks.

- **IPFS Integration**: NFT images and metadata are stored securely on IPFS using [Pinata](https://www.pinata.cloud/), ensuring efficient and reliable content hosting.

- **API Requests**: The frontend communicates with backend services using the [Axios library](https://axios-http.com/fr/docs/intro), enabling efficient handling of API requests for seamless user interactions.

## Local Development

For those interested in contributing or running the project locally, follow these steps:

1. Install and set up Ganache for local blockchain development.
2. Clone this repository and navigate to the project directory.
3. Install project dependencies using `npm install`.
4. rename .env.example to .env.development with your own private key.
5. Deploy the smart contracts to your local Ganache blockchain using Truffle.
6. Start the Next.js frontend by running `npm run dev`.

## Frontend Stack

The frontend of the NFT Marketplace is built with cutting-edge technologies to provide a seamless user experience:

- **Next.js**: A popular React framework that offers server-side rendering and efficient routing, contributing to fast page load times.

- **Typescript**: The project is developed using TypeScript, providing enhanced code quality and improved developer productivity.

- **React**: Utilized for building dynamic and responsive user interfaces.

- **Tailwind CSS**: Used for designing the user interface, allowing for rapid and customizable styling.

- **SWR**: The application employs SWR (Stale-While-Revalidate) for caching and efficient management of API requests.


I welcome contributions from the open-source community to enhance and expand the NFT Marketplace. Feel free to fork this repository, make improvements, and submit pull requests.

Happy trading and creating with NFTs!
