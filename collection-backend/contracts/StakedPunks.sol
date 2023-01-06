//SPDX-License-Identifier: MIT
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IWhitelist.sol";

contract StakedPunks is ERC721Enumerable, Ownable {
    /**
     * @dev _baseTokenURI for computing {tokenURI}. If set, the resulting
     * URI token will be the concatenation of the `baseURI` and the `tokenId`.
     */
    string _baseTokenURI;

    uint256 public _price = 0.001 ether;
    // _paused is used to pause the contract in case of an emergency
    bool public _paused;

    uint256 public maxTokenIds = 20;
    // amount of tokens minted
    uint256 public tokenIds;

    //whitelist contract instance
    IWhitelist whitelist;

    //boolean to keep track of whether presale started or not
    bool public presaleStarted;

    // timestamp for when presale would end
    uint256 public presaleEnded;

    modifier onlyWhenNotPaused() {
        require(!_paused, "contract currently paused");
        _;
    }

    /**
     * @dev ERC721 constructor takes in a `name` and a `symbol` to the token collection
     * name which in this case is `StakedPunks` and `SP`.
     * constructor for StakedPunks takes in the baseURI to set _baseTokenURI for the collection
     * also initializes an instance of the IWhitelist interface.
     */
    constructor(
        string memory baseURI,
        address whitelistContract
    ) ERC721("Staked Punks", "SP") {
        _baseTokenURI = baseURI;
        whitelist = IWhitelist(whitelistContract);
    }

    /**
     * @dev startPresale starts a presale for the whitelisted addresses
     */
    function startPresale() {
        presaleStarted = true;

        block.timestamp + 5 minutes;
    }
}
