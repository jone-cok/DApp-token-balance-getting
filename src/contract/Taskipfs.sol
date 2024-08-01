0xB302F922B24420f3A3048ddDC4E2761CE37Ea098
[
	{
		"inputs": [],
		"name": "sendMoney",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_desc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_imgaddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_numproduct",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_allowed",
				"type": "bool"
			}
		],
		"name": "storeData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "withdrawAllMoney",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imageaddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "numProduct",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "allowed",
						"type": "bool"
					}
				],
				"internalType": "struct wallet.ProductDetail",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;     
contract wallet{

    //================= store data=====================//
    struct ProductDetail{
        uint id;
        string name;
        string description;
        uint price;
        string imageaddress;
        uint numProduct;
        bool allowed;
    }

    mapping (uint=>ProductDetail) products;

    function storeData(uint _id, string memory _name, string memory _desc, uint _price, string memory _imgaddress,uint _numproduct, bool _allowed) public {
        products[_id] = ProductDetail(_id, _name,_desc, _price,_imgaddress,_numproduct,_allowed);
    }

    function getData(uint _id) public view returns (ProductDetail memory) {
        return products[_id];
    }


    //================== wallet ========================//
    // address payable owner;

    // struct Transaction {
    //     uint amount;
    //     uint timestamp;
    // }

    // struct Balance {
    //     uint totalBalance;
    //     uint numDeposits;
    //     mapping(uint => Transaction) deposits;
    //     uint numWithdrawals;
    //     mapping(uint => Transaction) withdrawals;
    // }

    // mapping(address => Balance) public balanceReceived;

    // constructor() {
    //     owner = payable(msg.sender);
    // }

    
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function sendMoney() public payable {

    }

    function withdrawAllMoney(address payable _to) public {
        _to.transfer(address(this).balance);
    }

    // function depositMoney() public payable {
    //     balanceReceived[msg.sender].totalBalance += msg.value;

    //     Transaction memory deposit = Transaction(msg.value, block.timestamp);
    //     balanceReceived[msg.sender].deposits[balanceReceived[msg.sender].numDeposits] = deposit;
    //     balanceReceived[msg.sender].numDeposits++;
    // }

    // function withdrawMoney(address payable _to, uint _amount) public payable{
    //     balanceReceived[msg.sender].totalBalance -= _amount; //reduce the balance by the amount ot withdraw

    //     //record a new withdrawal
    //     Transaction memory withdrawal = Transaction(msg.value, block.timestamp);
    //     balanceReceived[msg.sender].withdrawals[balanceReceived[msg.sender].numWithdrawals] = withdrawal;
    //     balanceReceived[msg.sender].numWithdrawals++;

    //     //send the amount out.
    //     _to.transfer(_amount);
    // }
}