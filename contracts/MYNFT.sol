// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./VRFCoordinatorV2Interface.sol";
import "./VRFConsumerBaseV2.sol";

contract MYNFT is Initializable,ERC721URIStorageUpgradeable,UUPSUpgradeable,OwnableUpgradeable,VRFConsumerBaseV2 {
    
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;
    uint64 s_subscriptionId;
    VRFCoordinatorV2Interface COORDINATOR;

    address vrfCoordinator;

    mapping(uint256=>address) s_rollers;
    mapping(address=>uint256) s_results;

    bytes32 s_keyHash;
    uint256 private constant ROLL_IN_PROGRESS=42;

    uint32 callbackGasLimit;

    uint16 requestConfirmations;
    uint32 numWords;

    uint256[] public s_randomWords;
    uint256 public s_requestId;
    event DiceRolled(uint256 indexed requestId, address indexed roller);
    event DiceLanded(uint256 indexed requestId, uint256 indexed result);
    event output(uint output);


    // constructor() ERC721(_name, _symbol) {}s
    function initialize() public initializer{
         vrfCoordinator = 0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed;
        s_keyHash = 0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f;
        callbackGasLimit =400000;
        requestConfirmations = 3;
        numWords = 1;
        s_subscriptionId=736;
        __ERC721_init("Pokemon_NFT","PKNFT");
        __initialize_init(vrfCoordinator);
        __Ownable_init();
        __UUPSUpgradeable_init();
       
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        
    }
    function _authorizeUpgrade(address newImplementation)internal override onlyOwner{}
    
    function mint(string memory tokenURI)public returns (uint256){
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_msgSender(), newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function rollDice(address roller) public returns (uint256 requestId) {
        // require(s_results[roller] == 0, 'Already rolled');
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            s_keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );

        s_rollers[requestId] = roller;
        s_results[roller] = ROLL_IN_PROGRESS;
        emit DiceRolled(requestId, roller);
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        uint256 d20Value = (randomWords[0] % 10) + 1;
        s_results[s_rollers[requestId]] = d20Value;
        emit DiceLanded(requestId, d20Value);
    }

    //     function link(address player) public view returns (string memory) {
    //     // require(s_results[player] != 0, 'Dice not rolled');
    //     // require(s_results[player] != ROLL_IN_PROGRESS, 'Roll in progress');
    //     return getThelink(s_results[player]);
    // }

    function house(address player) public view returns (string memory) {
        require(s_results[player] != 0, 'Dice not rolled');
        require(s_results[player] != ROLL_IN_PROGRESS, 'Roll in progress');
        uint _output=s_results[player];
        // s_results[player]=0;
        // emit output(_output);
        return getThelink(_output);
    }

    function resettherandomvalue(address player) public {
        s_results[player]=0;
    }


        function getThelink(uint id) private pure returns (string memory){
            string[10] memory links=[
            'https://ipfs.io/ipfs/QmT7BTX9KurTacAHsngK5dBDJwsPH95E5G1c32ELqQPwuS',
            'https://ipfs.io/ipfs/QmbirBnDzU8ZCdGXsMJhk34F8Y8PozhyFNcBw3pTo9wqHL',
            'https://ipfs.io/ipfs/QmXiPyK7o8jsrnxdRuavhCYqxuLVw9mzgw9iddgbnrHGCj',
            'https://ipfs.io/ipfs/QmT7BTX9KurTacAHsngK5dBDJwsPH95E5G1c32ELqQPwuS',
            'https://ipfs.io/ipfs/QmbirBnDzU8ZCdGXsMJhk34F8Y8PozhyFNcBw3pTo9wqHL',
            'https://ipfs.io/ipfs/QmXiPyK7o8jsrnxdRuavhCYqxuLVw9mzgw9iddgbnrHGCj',
            'https://ipfs.io/ipfs/QmT7BTX9KurTacAHsngK5dBDJwsPH95E5G1c32ELqQPwuS',
            'https://ipfs.io/ipfs/QmbirBnDzU8ZCdGXsMJhk34F8Y8PozhyFNcBw3pTo9wqHL',
            'https://ipfs.io/ipfs/QmXiPyK7o8jsrnxdRuavhCYqxuLVw9mzgw9iddgbnrHGCj',
            'https://ipfs.io/ipfs/QmT7BTX9KurTacAHsngK5dBDJwsPH95E5G1c32ELqQPwuS'
            
        ];
        return links[id-1];
        }


      
}