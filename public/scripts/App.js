var ABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_idMatch",
				"type": "uint256"
			}
		],
		"name": "getGamerOfMatch",
		"outputs": [
			{
				"name": "list",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfGamers",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_matchName",
				"type": "string"
			},
			{
				"name": "_dateTime",
				"type": "string"
			},
			{
				"name": "_rateWin",
				"type": "uint256"
			},
			{
				"name": "_rateDraw",
				"type": "uint256"
			},
			{
				"name": "_rateLose",
				"type": "uint256"
			}
		],
		"name": "CreateMatch",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_idMatch",
				"type": "uint256"
			},
			{
				"name": "_descriptions",
				"type": "string"
			},
			{
				"name": "_valueWin",
				"type": "uint256"
			},
			{
				"name": "_valueDraw",
				"type": "uint256"
			},
			{
				"name": "_valueLose",
				"type": "uint256"
			}
		],
		"name": "PlaceBet",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "matches",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "matchName",
				"type": "string"
			},
			{
				"name": "dateTime",
				"type": "string"
			},
			{
				"name": "rateWin",
				"type": "uint256"
			},
			{
				"name": "rateDraw",
				"type": "uint256"
			},
			{
				"name": "rateLose",
				"type": "uint256"
			},
			{
				"name": "winer",
				"type": "uint256"
			},
			{
				"name": "status",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_idMatch",
				"type": "uint256"
			},
			{
				"name": "_status",
				"type": "uint256"
			},
			{
				"name": "_result",
				"type": "uint256"
			}
		],
		"name": "updateMatch",
		"outputs": [
			{
				"name": "pay",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "viewOwners",
		"outputs": [
			{
				"name": "list",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newAddress",
				"type": "address"
			}
		],
		"name": "addOwners",
		"outputs": [
			{
				"name": "isadmin",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMatchToUpdate",
		"outputs": [
			{
				"name": "u",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferETHFromContract",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_idMatch",
				"type": "uint256"
			}
		],
		"name": "payWiners",
		"outputs": [
			{
				"name": "pay",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMatchToBet",
		"outputs": [
			{
				"name": "u",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "gamers",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "idMatch",
				"type": "uint256"
			},
			{
				"name": "player",
				"type": "address"
			},
			{
				"name": "descriptions",
				"type": "string"
			},
			{
				"name": "valueWin",
				"type": "uint256"
			},
			{
				"name": "valueDraw",
				"type": "uint256"
			},
			{
				"name": "valueLose",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllPlayers",
		"outputs": [
			{
				"name": "u",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_MatchName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_DateTime",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_RateWin",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_RateDraw",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_RateLose",
				"type": "uint256"
			}
		],
		"name": "LogMatch",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_address",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_idMatch",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_DateTime",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_RateWin",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_RateDraw",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_RateLose",
				"type": "uint256"
			}
		],
		"name": "LogHistory",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "_player",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_idMatch",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_dateTime",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_valueWin",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_valueDraw",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_valueLose",
				"type": "uint256"
			}
		],
		"name": "LogPlayerBet",
		"type": "event"
	}
];
async function loadMetamask() {

  if (typeof web3 === "undefined" ||
   !web3.currentProvider) {
  	alert("Please install Metamask");
    return;
	}

	window.web3 = new Web3(web3.currentProvider);

  if (!(await web3.eth.getAccounts()).length) {
  	alert("Please login Metamask");
    return;
	}
	else{
		let playerAdress = (await web3.eth.getAccounts())[0];
		let addressrow = document.getElementById("login");
		let buffer = playerAdress;
		addressrow.innerHTML = buffer;
	}


}
loadMetamask();
var address = "0x95E50b8689905B92bCe8BACD3f4260166F1f7ec5";
window.web3 = new Web3(web3.currentProvider);
var contract = new web3.eth.Contract(ABI,address);
const decemailRate = 100;
