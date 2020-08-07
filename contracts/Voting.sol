//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.7.0;

contract Voting {
    address private owner;
    mapping(string => uint256) voteOptions;
    mapping(address => bool) hasVoted;
    mapping(address => bool) isAllowed;

    constructor(string memory optionA, string memory optionB) public  {
        owner = msg.sender;
        voteOptions[optionA] = 0;
        voteOptions[optionB] = 0;
    }

    modifier isOwner(){
        require(msg.sender == owner, "Only owner can allow address");
        _;
    }

    function getOwner() public view returns (address){
        return owner;
    }

    event OptionVoted(string indexed option);

    function vote(string memory option) public {
        require(isAllowed[msg.sender], "Address not allowed to vote");
        require(hasVoted[msg.sender]==false, "Only one vote is allowed");
        voteOptions[option]++;
        hasVoted[msg.sender] = true;
        emit OptionVoted(option);
    }

    function getVoteCount(string memory option) public view returns (uint256) {
        return voteOptions[option];
    }

    function allowVote(address voter) public isOwner {
        isAllowed[voter] = true;
    }
}
