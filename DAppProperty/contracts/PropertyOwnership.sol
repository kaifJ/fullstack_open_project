// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

error PropertyOwnership__NotOwner();
error PropertyOwnership__InvalidPropertyId();
error PropertyOwnership__InvalidPrice();
error PropertyOwnership__InvalidOwner();
error PropertyOwnership__NoPndingRequests();

contract PropertyOwnership {
    address private contractOwner;
    uint256 private nextPropertyId;
    struct OwnershipTransferRequest {
        address requester;
        uint256 price;
    }

    struct PropertyDetails {
        uint256 propertyId;
        address owner;
        uint256 price;
    }

    mapping(uint256 => address) private propertyOwners;
    mapping(uint256 => uint256) private propertyPrices;
    mapping(uint256 => OwnershipTransferRequest) private transferRequests;

    event PropertyAdded(uint256 indexed propertyId, uint256 price);
    event OwnershipTransferred(
        uint256 indexed propertyId,
        address indexed previousOwner,
        address indexed newOwner
    );
    event OwnershipTransferRequested(
        uint256 indexed propertyId,
        address indexed requester,
        uint256 price
    );

    constructor() {
        contractOwner = msg.sender;
        nextPropertyId = 1;
    }

    modifier onlyContractOwner() {
        if (msg.sender != contractOwner) {
            revert PropertyOwnership__NotOwner();
        }
        _;
    }

    function addProperty(uint256 price) public onlyContractOwner {
        propertyOwners[nextPropertyId] = contractOwner;
        propertyPrices[nextPropertyId] = price;

        emit PropertyAdded(nextPropertyId, price);

        nextPropertyId++;
    }

    function getOwner(uint256 propertyId) public view returns (address) {
        return propertyOwners[propertyId];
    }

    function getPrice(uint256 propertyId) public view returns (uint256) {
        return propertyPrices[propertyId];
    }

    function getContractOwner() public view returns (address) {
        return contractOwner;
    }

    function getNextPropertyId() public view returns (uint256) {
        return nextPropertyId;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getAllProperties() public view returns (PropertyDetails[] memory) {
        PropertyDetails[] memory properties = new PropertyDetails[](
            nextPropertyId - 1
        );

        for (uint256 i = 1; i < nextPropertyId; i++) {
            properties[i - 1] = PropertyDetails(
                i,
                propertyOwners[i],
                propertyPrices[i]
            );
        }

        return properties;
    }

    function getPendingRequest(
        uint256 propertyid
    ) public view returns (OwnershipTransferRequest memory) {
        return transferRequests[propertyid];
    }

    function requestOwnershipTransfer(uint256 propertyId) public payable {
        if (propertyOwners[propertyId] == address(0)) {
            revert PropertyOwnership__InvalidPropertyId();
        }
        if (propertyPrices[propertyId] != msg.value) {
            revert PropertyOwnership__InvalidPrice();
        }
        if (propertyOwners[propertyId] == msg.sender) {
            revert PropertyOwnership__InvalidOwner();
        }
        // require(msg.value == price, "Please send the correct amount of Ether");
        transferRequests[propertyId] = OwnershipTransferRequest({
            requester: msg.sender,
            price: msg.value
        });

        emit OwnershipTransferRequested(propertyId, msg.sender, msg.value);
    }

    function approveOwnershipTransfer(
        uint256 propertyId,
        address newOwner
    ) public {
        if (propertyOwners[propertyId] == address(0)) {
            revert PropertyOwnership__InvalidPropertyId();
        }

        if (propertyOwners[propertyId] != msg.sender) {
            revert PropertyOwnership__NotOwner();
        }
        if (propertyOwners[propertyId] == newOwner) {
            revert PropertyOwnership__InvalidOwner();
        }

        // Perform the ownership transfer
        address previousOwner = propertyOwners[propertyId]; // Store the previous owner's address
        uint256 price = propertyPrices[propertyId]; // Store the price of the property

        // Transfer the price to the previous owner
        (bool success, ) = payable(previousOwner).call{value: price}("");
        require(success, "Payment to previous owner failed");

        propertyOwners[propertyId] = newOwner; // Update the ownership after the payment is successful

        delete transferRequests[propertyId];
        emit OwnershipTransferred(propertyId, msg.sender, newOwner);
    }

    function cancelOwnershipTransfer(uint256 propertyId) public {
        if (
            msg.sender != contractOwner &&
            msg.sender != transferRequests[propertyId].requester
        ) {
            revert PropertyOwnership__InvalidOwner();
        }

        if (transferRequests[propertyId].requester == address(0)) {
            revert PropertyOwnership__NoPndingRequests();
        }

        uint256 price = transferRequests[propertyId].price;
        payable(transferRequests[propertyId].requester).transfer(price);

        delete transferRequests[propertyId];
    }
}
