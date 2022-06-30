pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "@openzeppelin/upgrades/contracts/Initializable.sol";

/*
 *@dev contract definition
    @notice contract contains function which were going to be used in a different version of the game
 */
contract BlockDotDifficultyTournamentManager is Initializable {
    using SafeMath for uint256;
    /**=========================================structs definitions=========================================*/
    struct Player {
        address id;
        bytes32[] scoreIds;
        bytes32[] tournamentIds;
        address[] nftsCollected;
        uint256[] nftIds;
        bool active;
    }
    struct Score {
        address player;
        uint256 score;
        bytes32 tournamentId;
        bytes32 id;
    }
    struct Stream {
        address player;
        address tokenAddress;
        uint256 streamId;
        bytes32 id;
        bool exists;
    }
    struct Tournament {
        bytes32[] playerScores;
        bytes32[] nftsLocked;
        uint256 duration;
        bytes32 tournamentId;
        bool exists;
    }
    struct NFT {
        address parentAddress;
        uint256 tokenIndex;
        bytes32 id;
    }
    struct Recording {
        bytes url;
        address owner;
    }
    struct NFTMinted {
        uint256 id;
        bool minted;
    }
    /**=========================================Modifiers definitions=========================================*/
    modifier onlyAdmin() {
        require(msg.sender == owner);
        _;
    }
    /**=========================================Events definitions=========================================*/
    /**=========================================contract variable definitions=========================================*/
    address owner;
    address[] internal playerIds;
    bytes32[] internal playerScoreIds;
    bytes32[] internal streamIds;
    bytes32[] internal tournamentIds;
    bytes32[] internal nftLockedIds;
    bytes[] internal recordingKeys;
    uint256[] internal collectedNFTKeys;
    mapping(bytes32 => NFT) internal nftsLocked;
    mapping(bytes32 => Tournament) internal tournaments;
    mapping(bytes32 => Stream) internal streams;
    mapping(address => Player) internal players;
    mapping(bytes32 => Score) internal playerScores;
    mapping(bytes => Recording) internal recordings;
    mapping(uint256 => NFTMinted) internal collectedNFTS;

    /**=========================================function definitions=========================================*/
    function init() public initializer {
        require(msg.sender != address(0), "Invalid init address");
        owner = msg.sender;
    }

    /**=========================================Player function definitions=========================================*/
    //@dev to fix checking if a token id does exist
    function registerPlayerScore(
        uint256 score,
        address[] memory nfts,
        uint256[] memory nftIds,
        bytes32 tournamentId
    ) public returns (bool) {
        require(msg.sender != address(0), "Invalid player address");
        require(nfts.length == nftIds.length, "nfts size not equal nfts");
        require(
            tournaments[tournamentId].exists,
            " torunament not exists or completed"
        );
        players[msg.sender].id = msg.sender;
        bytes32 id = keccak256(
            abi.encodePacked(msg.sender, block.timestamp, score)
        ); //@dev to revise
        players[msg.sender].scoreIds.push(id);
        playerScores[id].score = score;
        playerScores[id].id = id;
        playerScores[id].player = msg.sender;
        playerScoreIds.push(id);
        for (uint256 i = 0; i < nfts.length; i++) {
            //@dev really bad programming using loops need to refactor and store all of this information on IPFS or Skynet
            bytes32 nftId = keccak256(
                abi.encodePacked(i, nftIds[i], nfts[i], block.timestamp)
            );
            tournaments[tournamentId].nftsLocked.push(nftId);
            tournaments[tournamentId].nftsLocked.push(nftId);
            nftLockedIds.push(nftId);
            nftsLocked[nftId].parentAddress = nfts[i];
            nftsLocked[nftId].tokenIndex = nftIds[i];
            nftsLocked[nftId].id = nftId;
        }
        players[msg.sender].active = true;
        players[msg.sender].tournamentIds.push(tournamentId);
        tournaments[tournamentId].playerScores.push(id);
    }

    function getPlayerTournamentScore(bytes32 id)
        public
        view
        returns (uint256, address)
    {
        return (playerScores[id].score, playerScores[id].player);
    }

    function getPlayerCollectedNFTIds()
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        return (players[msg.sender].nftsCollected, players[msg.sender].nftIds);
    }

    /**=========================================Tournament function definitions=========================================*/
    function registerTournament(bytes32 tournamentId, uint256 duration)
        public
        onlyAdmin
    {
        require(!tournaments[tournamentId].exists, "already exists");
        require(duration > 0, "duration must be > 0");
        tournaments[tournamentId].tournamentId = tournamentId;
        tournaments[tournamentId].exists = true;
        tournaments[tournamentId].duration = duration;
        tournamentIds.push(tournamentId);
    }

    function tournamentActive(bytes32 tournamentId) public view returns (bool) {
        return tournaments[tournamentId].exists;
    }

    function getPlayerTournamentScoreIds(bytes32 tournamentId)
        public
        view
        returns (bytes32[] memory)
    {
        return tournaments[tournamentId].playerScores;
    }

    function endTournament(bytes32 tournamentId) public onlyAdmin {
        tournaments[tournamentId].exists = false;
    }

    function getTournamentDetails(bytes32 tournamentId)
        public
        returns (
            bytes32[] memory,
            bytes32[] memory,
            uint256
        )
    {
        return (
            tournaments[tournamentId].playerScores,
            tournaments[tournamentId].nftsLocked,
            tournaments[tournamentId].duration
        );
    }

    function saveRecording(bytes memory url) public {
        require(msg.sender != address(0), "invalid sender");
        recordings[url].owner = msg.sender;
        recordings[url].url = url;
        recordingKeys.push(url);
    }

    function getRecordingKeys() public view returns (bytes[] memory) {
        return recordingKeys;
    }

    function getRecordingDetails(bytes memory url)
        public
        view
        returns (address)
    {
        recordings[url].owner;
    }

    function addToMinted(uint256 nftId) public {
        collectedNFTS[nftId].id = nftId;
        collectedNFTS[nftId].minted = true;
        collectedNFTKeys.push(nftId);
    }

    function getMintedNFTKeys() public view returns (uint256[] memory) {
        return collectedNFTKeys;
    }

    function isMinted(uint256 nftId) public view returns (bool) {
        return collectedNFTS[nftId].minted;
    }

    /**=========================================Sablier function definitions=========================================*/
    function purchaseTime(uint256 streamId, address tokenAddress)
        public
        returns (bool)
    {
        require(msg.sender != address(0), "Invalid sender address");
        bytes32 id = keccak256(
            abi.encodePacked(
                msg.sender,
                streamId,
                tokenAddress,
                block.timestamp
            )
        );
        require(!streams[id].exists, "streamid exists");
        streams[id].exists = true;
        streams[id].streamId = streamId;
        streams[id].tokenAddress = tokenAddress;
        streams[id].player = msg.sender;
        return true;
    }
}
