const { ethers } = require("ethers");
const { getContract } = require("../utils/provider");
const contractAbi = require("../abi/OctoplaceMarket.json");

const MarketItem = {
  itemId: 0,
  nftContract: "",
  tokenId: 0,
  seller: "",
  owner: "",
  highestOffer: 0,
  bidder: "",
  category: "",
  price: 0,
  isSold: false,
};

// Define the function that will handle the `/market` route
async function getAllMarkets(req, res) {
  try {
    const count = await getContract().getLastMarketId();

    let marketItems = [];

    for (let i = 1; i <= count; i++) {
      const marketItem = await getContract().getByMarketId(i);

      console.log(marketItem.itemId.toNumber());

      let newItem = {
        itemId: marketItem.itemId.toNumber(),
        nftContract: marketItem.nftContract,
        tokenId: marketItem.tokenId.toNumber(),
        seller: marketItem.seller,
        owner: marketItem.owner,
        highestOffer: marketItem.highestOffer.toNumber(),
        bidder: marketItem.bidder,
        category: marketItem.category,
        price: marketItem.price.toString(),
        isSold: marketItem.isSold,
      };

      marketItems.push(newItem);
    }

    // Define the HTML table headers
    let tableHeaders = `
      <tr>
        <th>Item ID</th>
        <th>NFT Contract</th>
        <th>Token ID</th>
        <th>Seller</th>
        <th>Owner</th>
        <th>Highest Offer</th>
        <th>Current Bidder</th>
        <th>Category</th>
        <th>Price</th>
        <th>IsSold</th>
      </tr>
    `;

    // Build the HTML table rows from the marketItems array
    let tableRows = "";
    marketItems.forEach((item) => {
      tableRows += `
        <tr>
          <td>${item.itemId}</td>
          <td>${item.nftContract}</td>
          <td>${item.tokenId}</td>
          <td>${item.seller}</td>
          <td>${item.owner}</td>
          <td>${item.highestOffer}</td>
          <td>${item.bidder}</td>
          <td>${item.category}</td>
          <td>${item.price}</td>
          <td>${item.isSold}</td>
        </tr>
      `;
    });

    let htmlTable = `
      <table border=1>
        ${tableHeaders}
        ${tableRows}
      </table>
    `;

    res.setHeader("Content-Type", "text/html");
    res.end(htmlTable);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

// Define the function that will handle the `/market-by-user/:address` route
async function getMarketsByUser(req, res) {
  try {
    const userId = req.params.id;

    const count = await getContract().getLastMarketId();

    let marketItems = [];

    for (let i = 1; i <= count; i++) {
      const marketItem = await getContract().getByMarketId(i);

      if (marketItem.seller !== userId) {
        continue;
      }

      console.log(marketItem.itemId.toNumber());

      let newItem = {
        itemId: marketItem.itemId.toNumber(),
        nftContract: marketItem.nftContract,
        tokenId: marketItem.tokenId.toNumber(),
        seller: marketItem.seller,
        owner: marketItem.owner,
        highestOffer: marketItem.highestOffer.toNumber(),
        bidder: marketItem.bidder,
        category: marketItem.category,
        price: marketItem.price.toString(),
        isSold: marketItem.isSold,
      };

      marketItems.push(newItem);
    }

    // Define the HTML table headers
    let tableHeaders = `
          <tr>
            <th>Item ID</th>
            <th>NFT Contract</th>
            <th>Token ID</th>
            <th>Seller</th>
            <th>Owner</th>
            <th>Highest Offer</th>
            <th>Current Bidder</th>
            <th>Category</th>
            <th>Price</th>
            <th>IsSold</th>
          </tr>
        `;

    // Build the HTML table rows from the marketItems array
    let tableRows = "";
    marketItems.forEach((item) => {
      tableRows += `
            <tr>
              <td>${item.itemId}</td>
              <td>${item.nftContract}</td>
              <td>${item.tokenId}</td>
              <td>${item.seller}</td>
              <td>${item.owner}</td>
              <td>${item.highestOffer}</td>
              <td>${item.bidder}</td>
              <td>${item.category}</td>
              <td>${item.price}</td>
              <td>${item.isSold}</td>
            </tr>
          `;
    });

    let htmlTable = `
          <table border=1>
            ${tableHeaders}
            ${tableRows}
          </table>
        `;

    res.setHeader("Content-Type", "text/html");
    res.end(htmlTable);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

// Define the function that will handle the `/market-successful` route
async function getSellTransactions(req, res) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-rpc-api.thetatoken.org/rpc"
    );
    const contractAddress = "0x465a8f1a0bd542f1ea9ae10165e6eeb5ec51f4c3";
    const abi = contractAbi.abi;

    const sellEvent = "Sell";
    const successStatus = true;

    const filter = {
      address: contractAddress,
      fromBlock: 5000, // Replace with the block number of when your contract was deployed
      toBlock: 9900,
      topics: [
        ethers.utils.id(
          `${sellEvent}(address,address,uint256,uint256,uint256,bool)`
        ),
      ],
    };

    const logs = await provider.getLogs(filter);
    const events = logs.map((log) => {
      return ethers.utils.defaultAbiCoder.decode(
        ["address", "address", "uint256", "uint256", "uint256", "bool"],
        log.data
      );
    });

    const successfulEvents = events.filter(
      (event) => event[5] === successStatus
    );
    
    console.log(successfulEvents);

    res.json(successfulEvents);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAllMarkets,
  getMarketsByUser,
  getSellTransactions,
};
