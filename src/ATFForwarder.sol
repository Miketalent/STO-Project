pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ATFSigner.sol";
import "./IERC1400.sol";

/*
* Contract that acts as the wallet manager for users and help
* send/forward the transactions from user to the token contract
*/
contract ATFForwarder is Ownable {

    //user's wallet addresses. These also are the signers. 
    address[] private _wallets;

    event WalletEvent ( 
        address fromAddr,
        string action,
        uint256 amount
    );
    
    /**
    * Determine if an address is a signer on this wallet
    * @param signer address to check
    * returns boolean indicating whether address is signer or not
    */
    function _isSigner(address signer) private view returns (bool) {
        address[] memory signers = _wallets;

        // Iterate through all signers on the wallet and
        for (uint i = 0; i < signers.length; i++) {
            if (signers[i] == signer) {
                return true;
            }
        }
        return false;
    }

    /**
    * Modifier that will execute internal code block only if the sender is an authorized signer on this wallet
    */
    modifier onlySigner {
        if (!_isSigner(msg.sender)) {
            revert();
        }
        _;
    }

    function createWallet(address token) external onlyOwner returns (address) {
        address wallet = address(new ATFSigner(IERC1400(token), this));
        _wallets.push(wallet);
        emit WalletEvent(wallet, "wallet created", 0);
        return wallet;
    }

    function getWallets() external onlyOwner view returns (address[] memory){
        return _wallets;
    }

    function sendSig(
      address toAddress,
      uint value,
      address tokenContractAddress,
      uint expireTime,
      bytes memory signature
    ) private {

        //Verify the other signer
        bytes32 operationHash = keccak256(abi.encodePacked(signature, toAddress, value, tokenContractAddress, expireTime));
        verifySig(toAddress, operationHash, signature, expireTime);    
    }

    function verifySig(
      address toAddress,
      bytes32 operationHash,
      bytes memory signature,
      uint expireTime
    ) private returns (address) {

        //verify sender address is signer
        address signer = recoverAddressFromSignature(operationHash, signature);

        //verify toAddress is also a signer in the wallets
        if (!_isSigner(toAddress)) {
        revert();
        }
        // Verify that the transaction has not expired
        if (expireTime < block.timestamp) {
        // Transaction expired
        revert();
        }

        if (!_isSigner(signer)) {
        // Other signer not on this wallet or operation does not match arguments
        revert();
        }

        return signer;
    }

    function recoverAddressFromSignature(
    bytes32 operationHash,
    bytes memory signature
    ) private pure returns (address) {
        if (signature.length != 65) {
        revert();
        }
        // We need to unpack the signature, which is given as an array of 65 bytes (like eth.sign)
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
        r := mload(add(signature, 32))
        s := mload(add(signature, 64))
        v := and(mload(add(signature, 65)), 255)
        }
        if (v < 27) {
        v += 27; // Ethereum versions are 27 or 28 as opposed to 0 or 1 which is submitted by some signing libs
        }
        return ecrecover(operationHash, v, r, s);
     }

    function forwardTransfer(IERC1400 tokenContract, address toAddress, uint256 value) external onlySigner returns (bool) {
        //verify signature first
        sendSig(toAddress, value, address(tokenContract), block.timestamp, "Transfer");

        if (!tokenContract.transfer(toAddress, value)) {
            return false;
        }

        emit WalletEvent(msg.sender, "forward transfer transaction", value);
        return true;
    }

    function forwardRedeem(IERC1400 tokenContract, uint256 value, bytes calldata data) external onlySigner {
        sendSig(msg.sender, value, address(tokenContract), block.timestamp, "Redeem");

        tokenContract.redeem(value, data);
        
        emit WalletEvent(msg.sender, "forward redeem transaction", value);
    }
}