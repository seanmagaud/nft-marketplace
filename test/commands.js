const instance = await NftMarket.deployed();

instance.mintToken("https://gateway.pinata.cloud/ipfs/QmeqhT6YiGFqeAnxcxCP8YfKn7daiaPieBhFUSB53rzf3v","500000000000000000", {value: "25000000000000000",from: accounts[0]})

instance.mintToken("https://gateway.pinata.cloud/ipfs/QmRpRbBAyHq3JYJ6f7b4YXn2sGXZnb27EafmwXYNps2Njd","300000000000000000", {value: "25000000000000000",from: accounts[0]})