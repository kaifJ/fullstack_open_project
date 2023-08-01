const { deployments, ethers, getNamedAccounts } = require('hardhat');
const { assert, expect } = require('chai');
const { PROPERTY_PRICES, addProperty, requestOwnershipTransfer } = require('./helper');

describe('PropertyOwnership', () => {
    let propertyOwnership
    let deployer
    beforeEach(async () => {
        //deploy contract using hardhat deploy
        // const accounts = await ethers.getSigners();
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["property"]);
        propertyOwnership = await ethers.getContract('PropertyOwnership', deployer)
    });

    describe('constructor', async function () {
        it('sets contractOwner as deployer', async function () {
            const contractOwner = await propertyOwnership.getContractOwner();
            assert.equal(contractOwner, deployer);
        });
    })

    describe('request ownership transfer', async function () {
        it('5 contracts should be added', async function () {
            // Adding five initial properties with prices
            for (let price in PROPERTY_PRICES) {
                await propertyOwnership.addProperty(price);
            }
            const nextPropertyId = await propertyOwnership.getNextPropertyId();
            assert.equal(nextPropertyId, 3);
        })

        it('test ownershipTransferRequest event', async function () {
            const taxReceipt = await requestOwnershipTransfer(propertyOwnership)
            const events = await taxReceipt.wait();
            const ownershipTransferRequestEvent = events.events.filter((log) => log.event == 'OwnershipTransferRequest');
            assert.exists(ownershipTransferRequestEvent, 'OwnershipTransferRequest event should be emitted');
        })

        it('test ownershipTransferRequest event error invalid price', async function () {
            try {
                await requestOwnershipTransfer(propertyOwnership)
            } catch (error) {
                expect(error.message).to.include('PropertyOwnership__InvalidPrice')
            }
        })

        it('test ownershipTransferRequest event error invalid owner', async function () {
            await addProperty(propertyOwnership);
            try {
                await propertyOwnership.requestOwnershipTransfer(1, { value: `${PROPERTY_PRICES[0]}` });
            } catch (error) {
                expect(error.message).to.include('PropertyOwnership__InvalidOwner')
            }
        })

        it('test ownershipTransferRequest event error invalid property', async function () {
            await addProperty(propertyOwnership);
            try {
                await propertyOwnership.requestOwnershipTransfer(4, { value: `${PROPERTY_PRICES[0]}` });
            } catch (error) {
                expect(error.message).to.include('PropertyOwnership__InvalidPropertyId')
            }
        })
    })

    describe('approve ownership transfer', async function () {
        it('test approveOwnershipTransfer event', async function () {
            const accounts = await ethers.getSigners();
            const owner2 = propertyOwnership.connect(accounts[1]);
            await requestOwnershipTransfer(propertyOwnership);
            let propertyOwner = await propertyOwnership.getOwner(1);

            assert.equal(propertyOwner, deployer);

            const taxReceipt = await propertyOwnership.approveOwnershipTransfer(1, owner2.address);
            const events = await taxReceipt.wait();
            const approveOwnershipTransferEvent = events.events.filter((log) => log.event == 'OwnershipTransferred');
            propertyOwner = await propertyOwnership.getOwner(1);

            assert.exists(approveOwnershipTransferEvent, 'OwnershipTransferred event should be emitted');
            assert.equal(propertyOwner, owner2.address);
        })

        it('test approveOwnershipTransfer event error invalid property', async function () {
            const accounts = await ethers.getSigners();
            const owner2 = propertyOwnership.connect(accounts[1]);
            await requestOwnershipTransfer(propertyOwnership);
            try {
                await propertyOwnership.approveOwnershipTransfer(1, owner2.address);
            } catch (error) {
                expect(error.message).to.include('PropertyOwnership__InvalidPropertyId')
            }
        })

        it('test approveOwnershipTransfer event error not owner', async function () {
            const accounts = await ethers.getSigners();
            const owner2 = propertyOwnership.connect(accounts[1]);
            await requestOwnershipTransfer(propertyOwnership);
            try {
                await owner2.approveOwnershipTransfer(1, owner2.address);
            } catch (error) {
                expect(error.message).to.include('PropertyOwnership__NotOwner')
            }
        })

        it('test approveOwnershipTransfer event error invalid new owner', async function () {
            await propertyOwnership.addProperty(PROPERTY_PRICES[0]);
            const accounts = await ethers.getSigners();

            const owner2 = propertyOwnership.connect(accounts[1]);
            await owner2.requestOwnershipTransfer(1, { value: `${PROPERTY_PRICES[0]}` });
            try {
                await propertyOwnership.approveOwnershipTransfer(1, propertyOwnership.address);
            } catch (error) {
                expect(error.message).to.include('PropertyOwnership__InvalidOwner')
            }
        })
    })

    describe('cancel ownership transfer', async function () {
        it('test cancelOwnershipTransfer function by contract owner', async function () {
            const taxReceipt = await requestOwnershipTransfer(propertyOwnership);
            let pendingRequest = await propertyOwnership.getPendingRequest(1);
            let contractBalance = await propertyOwnership.getBalance();

            assert.equal(pendingRequest[0], taxReceipt.from);
            assert.equal(contractBalance.toString(), PROPERTY_PRICES[0].toString());

            await propertyOwnership.cancelOwnershipTransfer(1);

            pendingRequest = await propertyOwnership.getPendingRequest(1);
            contractBalance = await propertyOwnership.getBalance();

            assert.equal(pendingRequest[0], ethers.constants.AddressZero);
            assert.equal(contractBalance.toString(), '0');
        })

        it('test cancelOwnershipTransfer function by requester', async function () {
            const accounts = await ethers.getSigners();
            const owner2 = propertyOwnership.connect(accounts[1]);
            const taxReceipt = await requestOwnershipTransfer(propertyOwnership);
            await owner2.cancelOwnershipTransfer(1);
            const pendingRequest = await propertyOwnership.getPendingRequest(1);
            const contractBalance = await propertyOwnership.getBalance();

            assert.equal(pendingRequest[0], ethers.constants.AddressZero);
            assert.equal(contractBalance.toString(), '0');
        })

        it('test cancelOwnershipTransfer functin by invalid address', async function () {
            const accounts = await ethers.getSigners();
            const owner3 = propertyOwnership.connect(accounts[2]);
            const taxReceipt = await requestOwnershipTransfer(propertyOwnership);
            try {
                await owner3.cancelOwnershipTransfer(1);
            } catch (error) {
                expect(error.message).to.include('PropertyOwnership__InvalidOwner')
            }
        })
    })

    describe('public view functions', async function () {
        it('test getContractOwner function', async function () {
            const contractOwner = await propertyOwnership.getContractOwner();
            assert.equal(contractOwner, deployer);
        })

        it('test getBalance function', async function () {
            let contractBalance = await propertyOwnership.getBalance();
            assert.equal(contractBalance.toString(), '0');

            await requestOwnershipTransfer(propertyOwnership);
            contractBalance = await propertyOwnership.getBalance();
            assert.equal(contractBalance.toString(), PROPERTY_PRICES[0].toString());
        })

        it('test getPendingRequest function', async function () {
            const taxReceipt = await requestOwnershipTransfer(propertyOwnership);
            const pendingRequest = await propertyOwnership.getPendingRequest(1);
            assert.equal(pendingRequest[0], taxReceipt.from);
            assert.equal(pendingRequest[1].toString(), PROPERTY_PRICES[0].toString());
        })
    })
});