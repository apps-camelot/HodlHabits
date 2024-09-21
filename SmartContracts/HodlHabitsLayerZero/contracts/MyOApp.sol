// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { OApp, MessagingFee, Origin } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { MessagingReceipt } from "@layerzerolabs/oapp-evm/contracts/oapp/OAppSender.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyOApp is OApp {
    address constant TOKEN_ADDRESS = 0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83; // USDC Ethereum Sepolia
    IERC20 public token; // USDC or any ERC-20 token for staking
    
    struct Challenge {
        string name; // Name of the challenge
        address creator;
        string[] videoLinks; // YouTube video links for the challenge
        uint256 stakeAmount; // Amount to stake per participant
        uint256 repetitions; // Number of repetitions (habit sessions)
        uint256 startTime; // Start time of the challenge
        uint256 duration; // Duration of the challenge
        bool isOpenForSponsors; // Flag to allow sponsors to contribute
        bool rewardsDistributed; // Ensures rewards are distributed only once
        mapping(address => uint256) userStakes; // Track each participant's stake
        mapping(address => uint256) userProgress; // Track habit completion for each participant
        mapping(address => uint256) userStakeReturned; // if > 0 means the user has claimed the userStakes amount
        address[] participants; // New array to track participants
        uint256 totalStakeAmount; // Total stake amount from participants
        uint256 totalSponsoredAmount; // Total amount from sponsors
        uint256 totalPenalizedAmount; // Total amount from penalizations
    }

    uint256 public challengeCounter;
    mapping(uint256 => Challenge) public challenges; // Mapping of challenge ID to Challenge struct
    mapping(address => mapping(uint256 => uint256)) public sponsorFunds; // Sponsor funds for each challenge

    // Array to keep track of sponsors
    address[] public sponsors;

    // Event for creating a challenge
    event ChallengeCreated(uint256 challengeId, address creator, uint256 stakeAmount, uint256 repetitions, uint256 startTime, uint256 duration, string name);

    // Event for when a user completes a habit repetition
    event HabitCompleted(uint256 challengeId, address participant, uint256 progress);

    // Event for when sponsor rewards are distributed
    event SponsorRewardsDistributed(uint256 challengeId, uint256 totalParticipants);

    // Event for when a user joins a challenge
    event ChallengeJoined(uint256 challengeId, address participant, uint256 stakeAmount);

    // Event for when a user sponsors a challenge
    event ChallengeSponsored(uint256 challengeId, address sponsor, uint256 amount);



    constructor(address _endpoint, address _delegate) OApp(_endpoint, _delegate) Ownable(_delegate) {
        token = IERC20(TOKEN_ADDRESS); // Set the ERC-20 token used for staking (e.g., USDC)
    }

    string public data = "Nothing received yet.";
    
    // Function to create a new challenge
    function createChallenge(
        string memory _name, // New parameter for the challenge name
        string[] memory _videoLinks,
        uint256 _stakeAmount,
        uint256 _repetitions,
        uint256 _startTime,
        uint256 _duration,
        bool _isOpenForSponsors
    ) external {
        challengeCounter = challengeCounter + 1;
        Challenge storage newChallenge = challenges[challengeCounter];

        newChallenge.name = _name; // Assign the challenge name
        newChallenge.creator = msg.sender;
        newChallenge.videoLinks = _videoLinks;
        newChallenge.stakeAmount = _stakeAmount;
        newChallenge.repetitions = _repetitions;
        newChallenge.startTime = _startTime;
        newChallenge.duration = _duration;
        newChallenge.isOpenForSponsors = _isOpenForSponsors;
        newChallenge.rewardsDistributed = false; // Initialize as not yet distributed

        emit ChallengeCreated(challengeCounter, msg.sender, _stakeAmount, _repetitions, _startTime, _duration, _name);
    }

    // Function to join a challenge
    function joinChallenge(uint256 _challengeId) external {
        Challenge storage challenge = challenges[_challengeId];
        //require(block.timestamp < challenge.startTime, "Challenge has already started");
        require(challenge.userStakes[msg.sender] == 0, "User has already joined this challenge");

        // Transfer the stake amount to the contract
        // enable again this line when resolve the transfer: token.transferFrom(msg.sender, address(this), challenge.stakeAmount);

        // Record the participant's stake and initialize progress
        challenge.userStakes[msg.sender] = challenge.stakeAmount;
        challenge.userProgress[msg.sender] = 0; // Initial progress is zero
        challenge.userStakeReturned[msg.sender] = 0; // Initial returned stake is zero
        challenge.totalStakeAmount = challenge.totalStakeAmount + challenge.stakeAmount;

        // Add participant to the participants array
        challenge.participants.push(msg.sender);

        // Emit the ChallengeJoined event
        emit ChallengeJoined(_challengeId, msg.sender, challenge.stakeAmount);
    }


    // Function for participants to mark a habit repetition as completed
    function completeHabit(uint256 _challengeId) external {
        Challenge storage challenge = challenges[_challengeId];
        require(challenge.userStakes[msg.sender] > 0, "User has not joined this challenge");

        // Increment user's progress
        challenge.userProgress[msg.sender] = challenge.userProgress[msg.sender] + 1;

        // If user has completed all repetitions, return the staked tokens
        if (challenge.userProgress[msg.sender] >= challenge.repetitions) {
            // enable again this line when resolve the transfer: token.transfer(msg.sender, challenge.userStakes[msg.sender]);
            challenge.userStakeReturned[msg.sender] = challenge.userStakes[msg.sender];
        }
        
        // Emit the HabitCompleted event
        emit HabitCompleted(_challengeId, msg.sender, challenge.userProgress[msg.sender]);

    }

    // Function to penalize users who miss habit repetitions (this can be called after each session)
    function penalizeMissedRepetition(uint256 _challengeId, address _user) external onlyOwner {
        Challenge storage challenge = challenges[_challengeId];
        uint256 penalty = challenge.stakeAmount / challenge.repetitions; // Penalty for each missed repetition

        // Apply penalty if the user missed a repetition
        //if (block.timestamp > challenge.startTime && challenge.userProgress[_user] < challenge.repetitions) {
        if (challenge.userProgress[_user] < challenge.repetitions) {
            challenge.userStakes[_user] = challenge.userStakes[_user] - (penalty * (challenge.repetitions - challenge.userProgress[_user]));
        }
    }

    // Function to allow sponsors to contribute to a challenge
    function sponsorChallenge(uint256 _challengeId, uint256 _amount) external {
        Challenge storage challenge = challenges[_challengeId];
        require(challenge.isOpenForSponsors, "This challenge is not open for sponsorship");

        // Transfer sponsor's contribution to the contract
        // enable again this line when resolve the transfer: token.transferFrom(msg.sender, address(this), _amount);

        // Track sponsor's contribution for the specific challenge
        sponsorFunds[msg.sender][_challengeId] = sponsorFunds[msg.sender][_challengeId] + _amount;
        challenge.totalSponsoredAmount = challenge.totalSponsoredAmount + _amount;
        
        // Add sponsor to the sponsors array if not already added
        sponsors.push(msg.sender);

        // Emit the ChallengeSponsored event
        emit ChallengeSponsored(_challengeId, msg.sender, _amount);
    }

    // Function to distribute sponsor rewards, only callable once per challenge
    function distributeSponsorRewards(uint256 _challengeId) external onlyOwner {
        Challenge storage challenge = challenges[_challengeId];

        // Ensure rewards are not distributed more than once
        require(!challenge.rewardsDistributed, "Rewards already distributed for this challenge");

        uint256 totalParticipants = 0;
        address[] memory participants = getAllParticipants(_challengeId); // Placeholder function

        // Calculate number of participants who successfully completed the challenge
        for (uint256 i = 0; i < participants.length; i++) {
            if (challenge.userProgress[participants[i]] == challenge.repetitions) {
                totalParticipants++;
            }
        }

        // Distribute sponsor rewards
        for (uint256 i = 0; i < sponsors.length; i++) {
            address sponsor = sponsors[i];
            uint256 sponsorContribution = sponsorFunds[sponsor][_challengeId];

            if (sponsorContribution > 0 && totalParticipants > 0) {
                uint256 rewardPerParticipant = sponsorContribution / totalParticipants;
                for (uint256 j = 0; j < participants.length; j++) {
                    if (challenge.userProgress[participants[j]] == challenge.repetitions) {
                        // enable again this line when resolve the transfer: token.transfer(participants[j], rewardPerParticipant);
                    }
                }
            }
        }

        // Mark rewards as distributed
        challenge.rewardsDistributed = true;

        // Emit the SponsorRewardsDistributed event
        emit SponsorRewardsDistributed(_challengeId, totalParticipants);
    }

    // Placeholder function to get all participants in a challenge
    function getAllParticipants(uint256 _challengeId) internal view returns (address[] memory) {
        Challenge storage challenge = challenges[_challengeId];
        return challenge.participants;
    }

    function getParticipants(uint256 _challengeId) external view returns (address[] memory, uint256[] memory) {
        Challenge storage challenge = challenges[_challengeId];
        uint256 numParticipants = challenge.participants.length;
        
        address[] memory participants = new address[](numParticipants);
        uint256[] memory progress = new uint256[](numParticipants);
        
        for (uint256 i = 0; i < numParticipants; i++) {
            address participant = challenge.participants[i];
            participants[i] = participant;
            progress[i] = challenge.userProgress[participant];
        }
        return (participants, progress);    
    }

    function getUserChallenges(address _user) external view returns (uint256[] memory) {
        uint256 enrolledCount = 0;
        
        // First, determine how many challenges the user is enrolled in
        for (uint256 i = 1; i <= challengeCounter; i++) {
            if (challenges[i].userStakes[_user] > 0) {
                enrolledCount++;
            }
        }

        // Create an array to store the enrolled challenge IDs
        uint256[] memory userChallenges = new uint256[](enrolledCount);
        uint256 index = 0;

        // Populate the array with challenge IDs
        for (uint256 i = 1; i <= challengeCounter; i++) {
            if (challenges[i].userStakes[_user] > 0) {
                userChallenges[index] = i;
                index++;
            }
        }

        return userChallenges;
    }

    function isUserEnrolled(uint256 _challengeId, address _user) external view returns (bool) {
        Challenge storage challenge = challenges[_challengeId];
        return challenge.userStakes[_user] > 0;
    }

    function isUserSponsor(uint256 _challengeId, address _user) external view returns (bool) {
        // Check if the user has contributed sponsor funds for the specific challenge
        return sponsorFunds[_user][_challengeId] > 0;
    }

    function getChallengeVideos(uint256 _challengeId) external view returns (string[] memory) {
        Challenge storage challenge = challenges[_challengeId];
        return challenge.videoLinks;
    }



    /**
     * @notice Sends a message from the source chain to a destination chain.
     * @param _dstEid The endpoint ID of the destination chain.
     * @param _message The message string to be sent.
     * @param _options Additional options for message execution.
     * @dev Encodes the message as bytes and sends it using the `_lzSend` internal function.
     * @return receipt A `MessagingReceipt` struct containing details of the message sent.
     */
    function send(
        uint32 _dstEid,
        string memory _message,
        bytes calldata _options
    ) external payable returns (MessagingReceipt memory receipt) {
        bytes memory _payload = abi.encode(_message);
        receipt = _lzSend(_dstEid, _payload, _options, MessagingFee(msg.value, 0), payable(msg.sender));
    }

    /**
     * @notice Quotes the gas needed to pay for the full omnichain transaction in native gas or ZRO token.
     * @param _dstEid Destination chain's endpoint ID.
     * @param _message The message.
     * @param _options Message execution options (e.g., for sending gas to destination).
     * @param _payInLzToken Whether to return fee in ZRO token.
     * @return fee A `MessagingFee` struct containing the calculated gas fee in either the native token or ZRO token.
     */
    function quote(
        uint32 _dstEid,
        string memory _message,
        bytes memory _options,
        bool _payInLzToken
    ) public view returns (MessagingFee memory fee) {
        bytes memory payload = abi.encode(_message);
        fee = _quote(_dstEid, payload, _options, _payInLzToken);
    }

    /**
     * @dev Internal function override to handle incoming messages from another chain.
     * @dev _origin A struct containing information about the message sender.
     * @dev _guid A unique global packet identifier for the message.
     * @param payload The encoded message payload being received.
     *
     * @dev The following params are unused in the current implementation of the OApp.
     * @dev _executor The address of the Executor responsible for processing the message.
     * @dev _extraData Arbitrary data appended by the Executor to the message.
     *
     * Decodes the received payload and processes it as per the business logic defined in the function.
     */
    function _lzReceive(
        Origin calldata /*_origin*/,
        bytes32 /*_guid*/,
        bytes calldata payload,
        address /*_executor*/,
        bytes calldata /*_extraData*/
    ) internal override {
        data = abi.decode(payload, (string));
    }
}
