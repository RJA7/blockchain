const Transaction = require('./BlockChain/Transaction');
const BlockChain = require('./BlockChain');
const ec = require('./BlockChain/ec');

const miner = 'miner';
const somePublicKey = 'Some public key';

const blockChain = new BlockChain();

const key = ec.genKeyPair();
const transaction = new Transaction(key.getPublic('hex'), somePublicKey, 100);
transaction.sign(key);

blockChain.addTransaction(transaction);

blockChain.mineTransactions(miner); // mine my transaction
blockChain.mineTransactions(miner); // mine first award

console.log(blockChain.getBalanceOf(key.getPublic('hex')));
console.log(blockChain.getBalanceOf(somePublicKey));
console.log(blockChain.getBalanceOf(miner));
