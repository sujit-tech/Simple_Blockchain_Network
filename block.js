const {Genesis_Block,Mine_Rate} = require('./config') 
const cry_hash = require("./crypto-Hash")
const hexToBinary = require('hex-to-binary')

class Block{
    constructor({timestamp,nonce,difficulty,prevHash,data,hash}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.nonce = nonce;
        this.difficulty=difficulty;
        this.data = data;
        this.hash = hash;
    }
    static genesis(){
        return new this(Genesis_Block)
    }
    static mine_block({prevBlock,data}){
        let hash,timestamp; 
        const prevHash = prevBlock.hash
        let {difficulty} = prevBlock;

        let nonce = 0
            do{
                nonce++
                timestamp = Date.now()
                difficulty=Block.adjustDifficulty({originalBlock:prevBlock,timestamp})
                hash = cry_hash(timestamp,nonce,difficulty,prevHash,data)
            }while(hexToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty))
        return new this({
        timestamp,
        prevHash,
        nonce,
        difficulty,
        data,
        hash   
        })
    }
    static adjustDifficulty({originalBlock,timestamp}){
        const {difficulty} = originalBlock
        if(difficulty<1) return 1;
        const difference = timestamp - originalBlock.timestamp;
        if(difference>Mine_Rate) return difficulty -1
        return difficulty +1
    }
}

const block1 = new Block({
    timestamp: '2/2/12',
    prevHash:'0xjdlok544',
    hash: '0x524dfd5',
    data:'welcome'
});
//console.log(block1)
// const genesis_bl =  Block.genesis()
// console.log(genesis_bl)
// result = Block.mine_block({prevBlock: genesis_bl,data: 'konichiwa'})
// console.log(result)

module.exports = Block;