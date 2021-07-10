const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('03a35dbadf9be84ff76a46a4482cc9ac63412a93777329ac02f62308eeeab54b');
const myWalletAddress = myKey.getPublic('hex');
// console.log(myWalletAddress);

// Create instance of the Blockchain
let satCoin = new Blockchain();

// Mine first block
satCoin.minePendingTransactions(myWalletAddress);

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
satCoin.addTransaction(tx1);
// console.log(tx1);

console.log('\n Starting the miner...');
satCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of xavier is', satCoin.getBalanceOfAddress(myWalletAddress));

// const tx2 = new Transaction(myWalletAddress, 'public key goes here', 40);
// tx2.signTransaction(myKey);
// satCoin.addTransaction(tx2);

// console.log('\n Starting the miner again...');
// satCoin.minePendingTransactions(myWalletAddress);

// console.log('\nBalance of xavier is', satCoin.getBalanceOfAddress(myWalletAddress));

// console.log(satCoin);
