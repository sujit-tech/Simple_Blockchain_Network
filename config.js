const cry_hash = require("./crypto-Hash")
const Mine_Rate = 1000 //1s
const INITIAL_DIFF = 2;
const Genesis_Block = {
    timestamp : 1718185609814,
    nonce : 0,
    difficulty: INITIAL_DIFF,
    prevHash : '000000000000000000',
    data : ' ',
    hash  : ''
}
const blockString = JSON.stringify(Genesis_Block);
Genesis_Block.hash = cry_hash(blockString);
module.exports = {Genesis_Block,Mine_Rate};