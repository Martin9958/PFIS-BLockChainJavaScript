const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(position, information, previousBlockHash = ''){
        this.position = position;
        this.blockHash = this.hashCreator();
        this.previousBlockHash = previousBlockHash;
        this.date = new Date();
        this.information = information;
        this.nonce = 0;
    }

    hashCreator(){
        return SHA256(this.position + this.date + this.information + this.previousBlockHash + this.nonce).toString();
    }

    blockMine(difficulty){
        while(!this.blockHash.startsWith(difficulty)){
            this.nonce++;
            this.blockHash = this.hashCreator();
        }

    }

}

module.exports = Block;
