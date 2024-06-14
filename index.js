const bodyParse = require('body-parser')   
const request = require('request')
const express = require('express')
const BlockChain = require('./Blockchain')
const PubSub = require('./publishSubscribe')

const app = express()

const blockChain = new BlockChain()
const pubsub = new PubSub({blockchain:blockChain})

const Default_port=5500;
const Root_Address = `http://localhost:${Default_port}`
setTimeout(()=>pubsub.broadcastChain(),1000)


app.use(bodyParse.json())
app.get('/api/blocks',(req,res)=>{
    res.json(blockChain.chain)
})
app.post('/api/mine',(req,res)=>{
    const {data} = req.body
    blockChain.addBlock({data})
    pubsub.broadcastChain();
    res.redirect('/api/blocks')
})
const syncChain= ()=>{
    request(
        {url:`${Root_Address}/api/blocks`},
        (error,response,body)=>{
            if(!error && response.statusCode===200){
                const rootChain = JSON.parse(body)
                console.log("replace of chain sync with: ",rootChain)
                blockChain.replaceChain(rootChain)
            }
        }
    )
}

let Peer_Port 
if(process.env.GENERATE_PEER_PORT==="true"){
    Peer_Port = Default_port + Math.ceil(Math.random()*1000)
}
const port = Peer_Port || Default_port 
app.listen(port,()=>{
console.log(`app listening to: ${port}`);
syncChain();
})