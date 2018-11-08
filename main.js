const Transaction = require('./src/Transaction');
const BlockChain = require('./src/BlockChain');

const accountA = 'accountA';
const accountB = 'accountB';
const miner = 'miner';

const blockChain = new BlockChain();

blockChain.addTransaction(new Transaction(accountA, accountB, 100));
blockChain.addTransaction(new Transaction(accountB, accountA, 50));

blockChain.mineTransactions(miner);

console.log(blockChain.getBalanceOf(miner));

blockChain.mineTransactions(miner);

console.log(blockChain.getBalanceOf(miner));


// console.log(blockChain);