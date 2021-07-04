const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
    // console.log('This is the first this.hash: ' + this.hash)
  }

  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty){
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash);
  }  
}



class Blockchain {
  constructor(){
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock(){
    return new Block(0, '01/01/2021', 'Genesis blcok', '0');
  }

  getLatestblock(){
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLatestblock().hash;
    newBlock.mineBlock(this.difficulty);
    // newBlock.hash = newBlock.calculateHash();
    // previous line removed to implement mine
    this.chain.push(newBlock);
  }

  isChainValid(){
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if(currentBlock.hash != currentBlock.calculateHash()){
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }

    return true;
  }
}

// Create instance of the Blockchain
let satCoin = new Blockchain();

// Create new blocks
console.log('Mining block 1...')
satCoin.addBlock(new Block(1, '10/01/2021', { amount: 4}));

console.log('Mining block 2...')
satCoin.addBlock(new Block(2, '12/01/2021', { amount: 10}));


// ALL BELOW: from Part 1 of tutorial
// console.log('This is the stringified satCoin at the end: ' + JSON.stringify(satCoin, null, 4));

// Check if blockchain is valid
// console.log('Is blockchain valid: ' + satCoin.isChainValid());

// Tamper with blockchain test
// satCoin.chain[1].data = {amoun : 100};
// satCoin.chain[1].hash = satCoin.chain[1].calculateHash();

// Re-Check if blockchain is valid after tampering
// console.log('Is blockchain valid: ' + satCoin.isChainValid());
