// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;   
 
 contract ContractBalanceTest {

address public owner;
 
     constructor() payable {
         owner = msg.sender;
     }
    //================= store data=====================//
    uint public numProduct;

    struct ProductDetail{
        uint id;
        string name;
        string description;
        uint price;
        string imageaddress;
        uint allowed;
    }

    mapping (uint=>ProductDetail) public products;

    function storeData(string memory _name, string memory _desc, uint _price, string memory _imgaddress, uint _allowed) public {
        products[numProduct] = ProductDetail(numProduct, _name,_desc, _price,_imgaddress,_allowed);
        numProduct++;
    }
    function updateData(uint _id,string memory _name, string memory _desc, uint _price, string memory _imgaddress, uint _allowed) public {
        products[_id] = ProductDetail(_id, _name,_desc, _price,_imgaddress,_allowed);
    }

    function getData(uint _id) public view returns (ProductDetail memory) {
        return products[_id];
    }


    //================== wallet ========================//
     uint public balanceReceived;
     
     modifier onlyOwner () {
       require(msg.sender == owner, "This can only be called by the contract owner!");
       _;
     }
 
     function receiveMoney() payable public {
     }
 
     function receiveMoneyAmount(uint256 amount) payable public {
         require(msg.value == amount);
     }
 
    
     function withdrawMoney() payable onlyOwner public {
        address payable to = payable(msg.sender);
        to.transfer(address(this).balance);
     }
 
     function withdrawMoneyAmount(uint256 amount) onlyOwner payable public {
         require(msg.value == amount);
         require(amount <= getBalance());
         address payable to = payable(msg.sender);
         to.transfer(amount); //this not work
         //msg.sender.transfer(getBalance()); // this ok
     }
 
 
     function getBalance() public view returns (uint256) {
         return address(this).balance;
     }
 }