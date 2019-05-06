var block = require('./block');

class BlockChainManager{
    constructor(entrydata, difficulty){
        this.chain = [this.createFirstBlock(entrydata)];
        this.difficulty = difficulty;
    }

    createFirstBlock(entrydata) {
        return new block(0,entrydata);
    }

    getLastBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(entrydata){
        let previusBlock = this.getLastBlock();
        let addedBlock = new block(previusBlock.position+1, entrydata, previusBlock.blockHash);
        addedBlock.blockMine(this.difficulty);
        console.log('¡Mining Block ' + addedBlock.position + ' ... !');
        console.log('¡Blocked Mined! : '+addedBlock.blockHash+' with nonce: '+addedBlock.nonce);
        this.chain.push(addedBlock);
    }

    validation(){
        for(let i=1; i<this.chain.length; i++){
            let prevBlock = this.chain[i-1];
            let actualBlock = this.chain[i];

            if(actualBlock.previousBlockHash !== prevBlock.blockHash)
                return false;
            if(actualBlock.hashCreator() !== actualBlock.blockHash)
                return false;
        }
        return true;
    }
}

let pyroCoin = new BlockChainManager('Genesis Block','00');
pyroCoin.addBlock('First block');
pyroCoin.addBlock('Second block');
console.log(JSON.stringify(pyroCoin,null,2));
console.log("¿¿Is valid??" + pyroCoin.validation());
pyroCoin.chain[1].information = "This is a fake data to prove the validation!"
console.log("¿¿Is valid??" + pyroCoin.validation());

