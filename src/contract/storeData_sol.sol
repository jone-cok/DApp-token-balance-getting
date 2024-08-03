// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;     
contract wallet{

    //================= store data=====================//
    uint public numProduct;

    struct ProductDetail{
        uint id;
        string name;
        string description;
        uint price;
        string imageaddress;
        bool allowed;
    }

    mapping (uint=>ProductDetail) public products;

    function storeData(string memory _name, string memory _desc, uint _price, string memory _imgaddress, bool _allowed) public {
        products[numProduct] = ProductDetail(numProduct, _name,_desc, _price,_imgaddress,_allowed);
        numProduct++;
    }

     function getNumProduct() public view returns (uint) {
        return numProduct;
    }
}