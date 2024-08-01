// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
 contract Storage {
    uint public data;
 
    constructor(){
        data = 0;
    }
 
    function setData(uint _data) public {
        data = _data;
    }
 
    function getData() public view returns (uint) {
        return data;
    }
}