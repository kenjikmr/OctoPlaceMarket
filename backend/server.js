const http = require("http");
const app = require("./app");

/*************************************************************************************************
 * Implement and test the ability to receive and store events from newly deployed smart contracts.
 * Network : Theta test net
 * Contract address : 0x680c79E9863FCce243BFB33b939539b9696a2C36
 * Database : MySQL
 *************************************************************************************************/

const mysql = require("mysql");
const { ethers } = require("ethers");
const contractAbi = require("./abi/OctoplaceMarket.json");

// Set up a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "theta_contract_events",
});

// Create a new provider using the Theta network
const contractAddress = "0x680c79E9863FCce243BFB33b939539b9696a2C36";
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-rpc-api-testnet.thetatoken.org/rpc"
);

// Create a new contract instance
const contract = new ethers.Contract(
  contractAddress,
  contractAbi.abi,
  provider
);

// Listen for all events from the contract
contract.on("*", (event) => {
  // Save the event data to the MySQL database
  connection.query(
    "INSERT INTO events SET ?",
    {
      event_name: event.event,
      event_data: JSON.stringify(event.args),
    },
    (error, results, fields) => {
      if (error) throw error;
      console.log(results);
    }
  );
});

/*************************************************************************************************
 * End
 *************************************************************************************************/

// Define the port number to listen on
const port = process.env.PORT || 8000;

// Create a new HTTP server using the Express app
const server = http.createServer(app);

// Start listening on the specified port
server.listen(port, () => console.log(`Server started on port ${port}`));

// Export the server for testing purposes
module.exports = server;
