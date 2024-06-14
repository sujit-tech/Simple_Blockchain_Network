const Block = require('./block')
const cry_hash = require("./crypto-Hash")

class BlockChain{
    constructor(){
        this.chain = [Block.genesis()]
    }
    addBlock({data}){
        const newBlock = Block.mine_block({
            prevBlock: this.chain[this.chain.length-1],
            data
        });
        this.chain.push(newBlock);
    }
    replaceChain(chain){
        if(chain.length<=this.chain.length){
            console.error("this chain is short")
            return;
        }
        if(!BlockChain.isValidChain(chain)){
            console.log("this chain is sus")
            return;
        }
        this.chain = chain
    }
    static isValidChain(chain){
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())){
            return false
        }
        for(let i =1; i<chain.length;i++){
            const {timestamp,nonce,difficulty,prevHash,data,hash} = chain[i]
            const lastDifficulty =  chain[i-1].difficulty;
            const lastHash = chain[i-1].hash
        
        if(prevHash !== lastHash){
            return false
        }
        const validHash = cry_hash(timestamp,nonce,difficulty,prevHash,data)
        if(hash !== validHash){
            return false
        }
        if(Math.abs(lastDifficulty-difficulty)>1) return false;
        }
        return true
    }
}

const blockChain = new BlockChain()
blockChain.addBlock({data:"ohaya"})
blockChain.addBlock({data:"konichiwa"})
blockChain.addBlock({data:"hi"})
//console.log(blockChain)
chains = BlockChain.isValidChain(blockChain.chain)
//console.log(chains)
module.exports = BlockChain