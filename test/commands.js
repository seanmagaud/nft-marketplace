const instance = await NftMarket.deployed();

instance.mintToken("https://gateway.pinata.cloud/ipfs/Qmb6YGuq4bDuqyuDArWpGxSvQifEui67hipbcFrpz84oKW","500000000000000000", {value: "25000000000000000",from: accounts[0]})

instance.mintToken("https://gateway.pinata.cloud/ipfs/QmcqxBeE2XfagzEBYnaCUfHHTRLMiHi6xap6BDFLoNUfTN","300000000000000000", {value: "25000000000000000",from: accounts[0]})