pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ATFForwarder.sol";
import "./IERC1400.sol";


/*
* Contract representing a signer who needs to do the transactions.
*/
contract ATFSigner is Ownable {

    IERC1400 private _token;
    ATFForwarder private _forwarder;

    constructor (IERC1400 tokenContract, ATFForwarder forwarder) {
        _token = tokenContract;
        _forwarder = forwarder;
    }

    function transfer(address toAddress, uint256 value) external returns (bool){
        return _forwarder.forwardTransfer(_token, toAddress, value);
    }

    function redeem(uint256 value, bytes calldata data) external {
        return _forwarder.forwardRedeem(_token, value, data);
    }
}