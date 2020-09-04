//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.7.0;

contract Voting {
    //Address of the contract owner
    address private owner;
    //Mapping to store the voting options
    mapping(string => uint256) voteOptions;
    //Maping to store address which has voted
    mapping(address => bool) hasVoted;
    //Mapping to store adrress allowed to vote
    mapping(address => bool) isAllowed;

    /**
     * @dev contract constructor
     * @param optionA 
     * @param optionB 
     */
    constructor(string memory optionA, string memory optionB) public {
        owner = msg.sender;
        voteOptions[optionA] = 0;
        voteOptions[optionB] = 0;
    }

    /**
     * @dev modifier to apply in functions only for owner
     */
    modifier isOwner() {
        require(msg.sender == owner, "Only owner can allow address");
        _;
    }

    /**
    * @dev function to return the owner of the contract
     */
    function getOwner() public view returns (address) {
        return owner;
    }

    /**
     *@dev event sent on vote action
     */
    event OptionVoted(string indexed option);


    /**
     * @dev vote function
     * @param option the option to vote
     */
    function vote(string memory option) public {
        require(isAllowed[msg.sender], "Address not allowed to vote");
        require(hasVoted[msg.sender] == false, "Only one vote is allowed");
        voteOptions[option]++;
        hasVoted[msg.sender] = true;
        emit OptionVoted(option);
    }

   /**
     * @dev returns vote count for the option
     * @param option to the count
     */
    function getVoteCount(string memory option) public view returns (uint256) {
        return voteOptions[option];
    }

    /**
     * @dev function to allow owner add address
     * @param voter address to allow
     */
    function allowVote(address voter) public isOwner {
        isAllowed[voter] = true;
    }
}
