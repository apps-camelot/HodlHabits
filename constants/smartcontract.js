export const SMART_CONTRACT_ADDRESS = "0xbF7E66c61e868CFe06a249d0ca501A7F76458B23";

export const SMART_CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_endpoint",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_delegate",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "target",
				"type": "address"
			}
		],
		"name": "AddressEmptyCode",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "AddressInsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "FailedInnerCall",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidDelegate",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidEndpointCall",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "LzTokenUnavailable",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "eid",
				"type": "uint32"
			}
		],
		"name": "NoPeer",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "msgValue",
				"type": "uint256"
			}
		],
		"name": "NotEnoughNative",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "OnlyEndpoint",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "eid",
				"type": "uint32"
			},
			{
				"internalType": "bytes32",
				"name": "sender",
				"type": "bytes32"
			}
		],
		"name": "OnlyPeer",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "SafeERC20FailedOperation",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "challengeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "stakeAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "repetitions",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			}
		],
		"name": "ChallengeCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "challengeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "stakeAmount",
				"type": "uint256"
			}
		],
		"name": "ChallengeJoined",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "challengeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sponsor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ChallengeSponsored",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "challengeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "progress",
				"type": "uint256"
			}
		],
		"name": "HabitCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "eid",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "peer",
				"type": "bytes32"
			}
		],
		"name": "PeerSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "challengeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalParticipants",
				"type": "uint256"
			}
		],
		"name": "SponsorRewardsDistributed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "srcEid",
						"type": "uint32"
					},
					{
						"internalType": "bytes32",
						"name": "sender",
						"type": "bytes32"
					},
					{
						"internalType": "uint64",
						"name": "nonce",
						"type": "uint64"
					}
				],
				"internalType": "struct Origin",
				"name": "origin",
				"type": "tuple"
			}
		],
		"name": "allowInitializePath",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "challengeCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "challenges",
		"outputs": [
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "stakeAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "repetitions",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isOpenForSponsors",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "rewardsDistributed",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "totalStakeAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalSponsoredAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalPenalizedAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_challengeId",
				"type": "uint256"
			}
		],
		"name": "completeHabit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_videoLinks",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "_stakeAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_repetitions",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isOpenForSponsors",
				"type": "bool"
			}
		],
		"name": "createChallenge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "data",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_challengeId",
				"type": "uint256"
			}
		],
		"name": "distributeSponsorRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endpoint",
		"outputs": [
			{
				"internalType": "contract ILayerZeroEndpointV2",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_challengeId",
				"type": "uint256"
			}
		],
		"name": "getChallengeVideos",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_challengeId",
				"type": "uint256"
			}
		],
		"name": "getParticipants",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserChallenges",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "srcEid",
						"type": "uint32"
					},
					{
						"internalType": "bytes32",
						"name": "sender",
						"type": "bytes32"
					},
					{
						"internalType": "uint64",
						"name": "nonce",
						"type": "uint64"
					}
				],
				"internalType": "struct Origin",
				"name": "",
				"type": "tuple"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			}
		],
		"name": "isComposeMsgSender",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_challengeId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "isUserEnrolled",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_challengeId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "isUserSponsor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_challengeId",
				"type": "uint256"
			}
		],
		"name": "joinChallenge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "srcEid",
						"type": "uint32"
					},
					{
						"internalType": "bytes32",
						"name": "sender",
						"type": "bytes32"
					},
					{
						"internalType": "uint64",
						"name": "nonce",
						"type": "uint64"
					}
				],
				"internalType": "struct Origin",
				"name": "_origin",
				"type": "tuple"
			},
			{
				"internalType": "bytes32",
				"name": "_guid",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "_message",
				"type": "bytes"
			},
			{
				"internalType": "address",
				"name": "_executor",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "_extraData",
				"type": "bytes"
			}
		],
		"name": "lzReceive",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "nextNonce",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "nonce",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "oAppVersion",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "senderVersion",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "receiverVersion",
				"type": "uint64"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "eid",
				"type": "uint32"
			}
		],
		"name": "peers",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "peer",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_challengeId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "penalizeMissedRepetition",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_dstEid",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"internalType": "bytes",
				"name": "_options",
				"type": "bytes"
			},
			{
				"internalType": "bool",
				"name": "_payInLzToken",
				"type": "bool"
			}
		],
		"name": "quote",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "nativeFee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lzTokenFee",
						"type": "uint256"
					}
				],
				"internalType": "struct MessagingFee",
				"name": "fee",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_dstEid",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"internalType": "bytes",
				"name": "_options",
				"type": "bytes"
			}
		],
		"name": "send",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "guid",
						"type": "bytes32"
					},
					{
						"internalType": "uint64",
						"name": "nonce",
						"type": "uint64"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "nativeFee",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "lzTokenFee",
								"type": "uint256"
							}
						],
						"internalType": "struct MessagingFee",
						"name": "fee",
						"type": "tuple"
					}
				],
				"internalType": "struct MessagingReceipt",
				"name": "receipt",
				"type": "tuple"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_delegate",
				"type": "address"
			}
		],
		"name": "setDelegate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_eid",
				"type": "uint32"
			},
			{
				"internalType": "bytes32",
				"name": "_peer",
				"type": "bytes32"
			}
		],
		"name": "setPeer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_challengeId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "sponsorChallenge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sponsorFunds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sponsors",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];