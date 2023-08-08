const instance = await NftMarket.deployed();

instance.mintToken("https://gateway.pinata.cloud/ipfs/QmZk2Ls6tiug6tSGd8s1Ea87Dj4xQGP28GewnLvu6mnpcQ","500000000000000000", {value: "25000000000000000",from: accounts[0]})

instance.mintToken("https://gateway.pinata.cloud/ipfs/QmQT55t8HfyW5yuUiMNZNTnSAMSZtzGsbbcDGBccY7wF5n","300000000000000000", {value: "25000000000000000",from: accounts[0]})