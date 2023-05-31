# Test Projects

Directories
- backend

  Backend API Server
  
- frontend

  Dashboard App to execute two “onlyOwner” functions

- hardhat

  Smart contract

## Quick start

Run the backend with:

```sh
cd backend
npm install
npm start
```

Run the frontend with:

```sh
cd frontend
npm install
npm start
```

Compile and deploy the smart contract with:

```sh
cd hardhat
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network theta
```
