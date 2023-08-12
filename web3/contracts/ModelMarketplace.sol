// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ModelMarketplace is Ownable {
    struct Model {
        string name;
        uint256 price;
    }
    uint256 public modelCount = 0;
    mapping(uint256 => Model) public models;
    mapping(uint256 => bool) public modelExists;
    Model[] public listedModels;
    mapping(address => mapping(uint256 => bool)) public userHasModel;
    mapping(address => uint256[]) public userModels;

    event ModelAdded(uint256 indexed modelId, string name, uint256 price);
    event ModelPurchased(address indexed user, uint256 modelId);

    constructor() {
        addModel("Optimal control model", 0.001 ether);
    }

    function getListedModels() public view returns (Model[] memory) {
        return listedModels;
    }

    function addModel(string memory _name, uint256 _price) public onlyOwner {
        uint256 _modelId = modelCount;
        require(!modelExists[_modelId], "Model already exists");
        require(_price > 0, "Price must be greater than zero");

        models[_modelId] = Model({name: _name, price: _price});
        modelExists[_modelId] = true;
        listedModels.push(models[_modelId]);
        modelCount++;
        emit ModelAdded(_modelId, _name, _price);
    }

    function purchaseModel(uint256 _modelId) public payable {
        require(modelExists[_modelId], "Model does not exist");
        require(
            !userHasModel[msg.sender][_modelId],
            "User already owns the model"
        );

        Model memory model = models[_modelId];

        // Check if user has sent enough Ether
        require(
            msg.value >= model.price,
            string(
                bytes.concat(
                    bytes("Insufficient Ether sent "),
                    " ",
                    bytes(Strings.toString(msg.value)),
                    " ",
                    bytes(Strings.toString(model.price))
                )
            )
        );
        require(
            msg.sender.balance >= model.price,
            "Insufficient Ether balance"
        );
        payable(owner()).transfer(model.price); // Transfer Ether to the contract owner
        // Update user's ownership status
        userHasModel[msg.sender][_modelId] = true;
        userModels[msg.sender].push(_modelId);

        emit ModelPurchased(msg.sender, _modelId);
    }

    function listUserModels(
        address _user
    ) public view returns (uint256[] memory) {
        return userModels[_user];
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    receive() external payable {}
}
