const { expect, assert } = require('chai');

const Voting = artifacts.require("../contracts/Voting.sol");

contract("Voting", accounts => {

    let voting;

    it('Should deploy the contract', async () => {
        voting = await Voting.new("Playa", "Montaña", { from: accounts[0] });
        expect(voting.address).contains('0x');
    })

    it('Should allow address to vote', async () => {
        const result = await voting.allowVote(accounts[0], { from: accounts[0] });
        const result2 = await voting.allowVote(accounts[2], { from: accounts[0] });
        expect(result.tx).contains('0x');
        expect(result2.tx).contains('0x');
    })

    it('Should vote the Playa option', async () => {
        const result = await voting.vote("Playa", { from: accounts[0] });
        expect(result.tx).contains('0x');
    })

    it('Should get the Playa option value', async () => {
        const result = await voting.getVoteCount("Playa", { from: accounts[0] });
        expect(result.toNumber()).equal(1);
    })

    it('Should denied to duplicate vote', async () => {
        const result = await voting.vote("Playa", { from: accounts[0] })
            .catch(e => {
                assert(e.message.includes("Only one vote is allowed"))
            })
    })

    it('Should denied to vote, not allowed', async () => {
        const result = await voting.vote("Playa", { from: accounts[1] })
            .catch(e => {
                assert(e.message.includes("Address not allowed to vote"))
            })
    })

    it('Should emit a event', async () => {
        const result = await voting.vote("Montaña", {from: accounts[2]});
        assert.equal(result.logs[0].event, 'OptionVoted'); 
    })


})