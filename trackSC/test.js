var Web3 = require("web3")
const fs = require('fs')
 
var web3;
 
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/8b7f48790d10405ea93d990399c42d71"));
}
        
var contractAbi = [
        {
                "constant": false,
                "inputs": [
                        {
                                "name": "key",
                                "type": "string"
                        },
                        {
                                "name": "value",
                                "type": "string"
                        }
                ],
                "name": "setvalue",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
        },
        {
                "constant": true,
                "inputs": [
                        {
                                "name": "key",
                                "type": "string"
                        }
                ],
                "name": "getvalue",
                "outputs": [
                        {
                                "name": "",
                                "type": "string"
                        }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
        },
        {
                "anonymous": false,
                "inputs": [
                        {
                                "indexed": true,
                                "name": "action",
                                "type": "string"
                        },
                        {
                                "indexed": true,
                                "name": "key",
                                "type": "string"
                        },
                        {
                                "indexed": false,
                                "name": "value",
                                "type": "string"
                        }
                ],
                "name": "orderlog",
                "type": "event"
        }
];
 
var contractaAddress = "0xb7010b4Fa9C9C60A5d4599b4d710715CE858d8a0";
       

MyContract = new web3.eth.Contract(contractAbi, contractaAddress);
// console.log(MyContract.events.orderlog);
        
var myEvent = MyContract.events.orderlog({
        filter:{},
        fromBlock: 0
}, function(error, event){})
        .on('data', function(event){
        console.log(event); // same results as the optional callback above
        

})
        .on('changed', function(event){
                    // remove event from local database
        })        
    .on('error', console.error);


    

var util    = require('util')
 
var logPath = 'upgrade.log'
var logFile = fs.createWriteStream(logPath, { flags: 'a' })
 
console.log = function() {
  logFile.write(util.format.apply(null, arguments) + '\n')
  process.stdout.write(util.format.apply(null, arguments) + '\n')
}
 
console.error = function() {
  logFile.write(util.format.apply(null, arguments) + '\n')
  process.stderr.write(util.format.apply(null, arguments) + '\n')
}

    
 
/*
    MyContract.getPastEvents('allEvents', {
        filter: {},
        fromBlock: 0,
        toBlock: 'latest'
    }, function(error, events){ console.log(events); })
    .then(function(events){
        console.log(events) // same results as the optional callback above
    });
*/