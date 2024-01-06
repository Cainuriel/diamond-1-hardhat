// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./OwnershipFacet.sol";
library LibA {

struct DiamondStorage {
    address owner;
    bytes32 dataA;
    string testSring;
}


function diamondStorage() internal pure returns(DiamondStorage storage ds) {
    bytes32 storagePosition = keccak256("diamond.storage.LibA");
    assembly {
    ds.slot := storagePosition
    }
}
}

contract FacetA {


    function setDataA(bytes32 _dataA) external {
        LibA.DiamondStorage storage ds = LibA.diamondStorage();
        ds.dataA = _dataA;
    }

    function getDataA() external view returns (bytes32) {
        return LibA.diamondStorage().dataA;
    }

      function setStringData(string memory _string) external {
        LibA.DiamondStorage storage ds = LibA.diamondStorage();
        ds.testSring = _string;
    }

    function getStringData() external view returns (string memory) {
        if(msg. sender != getOwner()) revert("You are not the Owner");
        return LibA.diamondStorage().testSring;
    }

    // testing using a function from other Facet
    function getOwner() public view returns (address) {
        return OwnershipFacet(0x7D005138A26110bAd9075807Bb16B5527951074e).owner();
    }
}
