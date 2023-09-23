# Full stack open project (Decentralized property )

## Description
[Link to the deployed app](https://dapproperty.fly.dev/)

**Note**: Requires Meta Mask extension. Create an account and switch to 'Sepolia' network.

[MetaMask Tutorial for Beginners - How to Set Up MetaMask](https://www.youtube.com/watch?v=Af_lQ1zUnoM&ab_channel=MoneyZG)

**Purpos and motivatione**: As Blockchain technology provides security, transparency, immutability and most of all decentralization it created a trustable source of information. The idea was to create a decentralized application that tracks property owners so that it cannot be forged or wrongfully claimed by any individual or an organization. The idea is to start with an organization let's say a government organization that ownes properties/apartments/land etc and is put to sale which can then be requested by other users to buy. Every transcation can be traced and the ownership of a particular property/apartment/land hence cannot be mutated in the blockchain.

# Project Setup
The project is divided into three main parts:

- **Frontend**: The frontend is developed using React.js, and packages such as moralis,web3, web3uikit and react-moralis to interact with MetaMask wallet. Tested using unit tests with jest. Some research was done for e2e testing using Synpress that uses Cypress to test the interaction with MetaMask wallet but was unsuccessful.
- **Backend**: The backend is developed using Node.js, Express and MongoDB for database. The backend handles authentication of the frontend website and the no the wallet. The wallet authentication is handled by MetaMask. The backend is also used to handle the meta data of the property/apartment/land etc.
- **DAppProperty**: This folder contains the smart contract for the decentralized application and is the heart of the application. The smart contract is developed using Solidity. Hardhat is used to develop, test and deploy the smart contract.

# Work Time Log

| Date   | Hours | Task Description  |
| :----: | :---: | :---------------- |
| 13.6.  | 4     | Initial planning, creating todos, planning learning material for Blockchain and smart contracts, setting up github repo and initial commit.|
| 28.6.  | 8     | Backend development, adding user api route, models and unit tests. Initial ci setup for backend |
| 02.7.  | 5     | Backend: add login api, tests, and unit tests. Update the CI work flow for backend and frontend |
| 03.7.  | 3     | Work on frontend ci workflow, trying to keep the pipeline green |
| 06.07.   | 4     | Refactor initial cypress tests, refactor users api, Add new Register component to the UI and add tests|
| 15.07.   | 8     | Learning the basics of blockchain, remix, remix factory from the learning material given below.|
| 16.07.   | 8     | Revising the learning material and learning furthermore about smart contract and solidity|
| 22.07.   | 8     | Revising the learning materal and learning about hardhat to work with smart contracts.|
| 23.07.   | 8     | Learning more about hardhat tool and learnign how to create, test, and deploy smart contracts. Furthermore, learning how the frontend can interact with the deployed smart contract.|
| 24.07.   | 3     | Initial implementation of smart contract for the project|
| 29.07.   | 8     | Learning how to build Full stack with hardhat and smart contracts.|
| 30.07.   | 8     | Learning how to test the smart contarcts using hardhat, how to verify the deployed smart contracts, and pracising further.|
| 31.07.   | 8     | Creating a design plan for the smart contarct and initial implementation started with respect to the project. Creation of smart contract and even writing of unit test|
| 1.08.   | 8     | Building up on the initial implementation of the smart contract, adding further unit tests and pushing to github|
| 3.08.   | 5     | Frontend development|
|    |      | Update Dashboard, Header, Implement List component to list the properties, Implement add Property form|
|    |      | Update deploy script for smart contract deploy command|
| 4.08.   | 9     | Frontend development and creating services for contract and client communication.|
|    |      | Update Dashboard, Implement Property Details page, Notification component and Update Add Property Form|
|    |      | Implement contract services that allow the frontned client to communicate and make requests with the smart contract|
| 5.08.   | 3     | Update addProperty form, code refactoring|
| 6.08.   | 9     | Update frontend and backend to support image upload.|
|    |      | Update Property Model and Controller in the backend to support image updload. Add form validation|
|    |      | Implement price converter helper methods to convert amount between, USD, ether and Wei|
|    |      | Fix minor bugs and fix CI job errors such as lint jobs.|
| 9.08.   | 2     | frontend: ui changes
||| support wei, ether and USD|
||| add price priceFormatter|
||| update form validation||
| 11.08.   | 2     | frontend: Update styling|
| 12.08.   | 8     | Bug fixes, adding new features to image uploading process.|
|    |      | Fix price conversion bug fixes, required extensive debugging to figure out the issue|
|    |      | Add at the max 3 image support. Add navigation for the image viewer and Delete image button|
| 13.08.   | 9     | Add Empty list component|
|    |      | Update contract services and necessary changes accordingly in the components.|
|    |      | Fix eslint errors|
|    |      | Initial implemenation for filters (did not push to GitHub)|
| 19.08.   | 10     | Property List Filter component and fix price conversion bugs|
|    |      | Add Info Modal component|
|    |      | Add unit tests for Property Route in the backend|
|    |      | Add Smart contrct CI workflow, and updating to keep it green.|
| 02.09.   | 2     | Debugging and fixing minor bugs|
| 08.09.   | 5     | Deploying to fly.io|
|    |      | Encountered various bugs while deploying.|
| 13.09.   | 6     | Setting up CD workflow using GitHub actions.|
|    |      | Add unit tests to test a few frontend components.|
|    |      | Encountered various bugs while setting up CI/CD for the entire project.|
| 15.09.   | 2     | Keeping the pipeline green|
| 17.09.   | 6     | Updating the README.md file|
|    |      | Making the demo video and editing|
|    |      | Manual testing and writing development guide.|
| 23.09.   | 6     | Updating the README.md file|
|    |      | Fix production bugs that were missed in development, remove inline styling|
|    |      | Code refactoring|

| **Total**  | **175**    | |

# Setting up the development environmet

This guide explains how to set up and run the project in a local development environment:

[Video Demo on how to setup the local development environment](https://drive.google.com/file/d/1V8Fbvgh7Tb16gBLURPnRMYXfUdQ9LpWV/view?usp=sharing)
## 1. Smart Contract Setup

- First, set up the Smart Contract and run a mock blockchain in the local environment using Hardhat.

- Create a `.env` file in the root directory of the Smart Contract repository and populate it with the following required keys:

```
SEPOLIA_RPC_URL= // add Sepolia network RPC URL
SEPOLIA_PRIVATE_KEY= // add Sepolia network private key
ETHERSCAN_API_KEY= // add the Etherscan API key
UPDATE_FRONT_END=true
```


[Follow these steps to add an RPC link using Alchemy.](https://www.web3.university/article/how-to-add-alchemy-rpc-endpoints-to-metamask)

[Learn how to add Sepolia to MetaMask.](https://www.alchemy.com/overviews/how-to-add-sepolia-to-metamask)

[Find out how to add the Sepolia testnet to MetaMask and obtain Sepolia ETH from a Faucet.](https://medium.com/@razor07/how-to-get-sepolia-eth-from-a-faucet-7420e5ceacb3)

[Get your private key from MetaMask](https://www.youtube.com/watch?v=AM2iob1pNiU&ab_channel=MajestyCrypto)

```
// open a new terminal and navigate to DAppProperty folder

// install npm packages
> yarn install

// deploy a local blockchain that generates 20 accounts
> yarn run node

// please check other scripts in DAppProperty/package.json scripts.
```

- In the MetaMask wallet create a network called hardhat-localhost with the RPC url given by running ```yarn run node```
- Use the Private key of first account displayed in the terminal by running the above command. This account will be the owner of the smart contract and hence will be the only account allowed to add the properties/apartment listing/land etc


## 2. Setting up the backend
- create a ```.env ```file and add the following required keys
```
PORT=3001
JWT_SECRET=somejwtsecretkey
MONGODB_URI='production mongodburi'
TEST_MONGODB_URI='test mongodb uri'
```

[Here is how to create a MongoDB cluster and get the MongoDB URI](https://medium.com/featurepreneur/how-to-create-a-cluster-in-mongodb-28996662b3ac)

```
// open a new terminal and navigate to the backend folder
> yarn install

// run the test server
> yarn run test:server
```

## 3. Setting up the frontend
- Prerequisite: Install MetaMask chrome extension, create account, import account from the first step, change the network to hardhat-localhost.
```
> yarn install
> yarn start
```

## Testing

### 1. Testing the smart contract

- The DAppProperty has unit tests that cover all the major APIs that are exposed. The tests can be found in DAppProperty/tests/unit

```
// to run the unit tests
> yarn run test

// to check the test coverage
> yarn run coverage
```

### 2. Testing the backend
- App the API's are tested using unit tests and can be found in backend/tests
```
// to run the unit tests
> yarn run test
```

### 3. Testing the frontend
- Some of the components are tests using unit tests.
```
> yarn run test
```

- End to end testing is only done for the Register user and login part
```
> yarn run cypress:open
```

- End to end testing for the rest of the application becomes tricky as it involes interaction with the MetaMask extension. Initial reseach was done with 'Synpress' testing but was not successful. Will be done in the furture.

## CI/CD Pipeline
- The CI/CD is implemented using the github actions and there are 3 workflows created
- The workflows can be found in .github/workflows

- **smart-contract.yml**: This is the first workflow is run when changes are pushed to the main branch. This workfow run 2 jobs, first running the lint and the runnig the tests for the smart contract.

- **backend-ci.yml**: This worflow is spawned only the smart-contract worflow is completed and successful. This workflow also run 2 jobs, first running the lint and then unit tests

- **frontend-ci.yml**: This worflow is spawned only the backend worflow is completed and successful. This workflow also run 2 jobs, first running the lint and then unit tests

- **fly-deploy.yml**: This workflow is spawned last and deploys the application to fly.

## Study material
- [Learning basics of blockchain, smart contracts, solidity and full stack development with smart contract](https://www.youtube.com/watch?v=gyMwXuJrbJQ&t=12731s&ab_channel=freeCodeCamp.org)
- [Repo recommended in the previous link](https://github.com/smartcontractkit/full-blockchain-solidity-course-js)
- [Full stack development](https://fullstackopen.com/en/)
- [Synpress testing for metamask](https://medium.com/coinmonks/test-e2e-login-to-dapp-with-metamask-with-synpress-5248dd1f17c1)