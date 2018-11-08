const Transaction = require('./Transaction');
const Block = require('./Block');

class BlockChain {
  constructor() {
    this.chain = [new Block('Genesis', [])];
    this.transactions = [];

    this.difficulty = 3;
    this.miningReward = 100;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  mineTransactions(rewardAddress) {
    const { transactions, chain, miningReward } = this;

    const block = new Block([...transactions], this.getLastBlock().hash);
    block.mine(this.difficulty);

    chain.push(block);

    transactions.length = 0;
    this.addTransaction(new Transaction(null, rewardAddress, miningReward));
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  isValid() {
    const { chain } = this;

    for (let i = 1, l = chain.length; i < l; i++) {
      const block = chain[i];
      const prev = chain[i - 1];

      if (block.isValid() && block.prevHash === prev.hash) continue;

      return false;
    }

    return true;
  }

  getBalanceOf(address) {
    const { chain } = this;
    let balance = 0;

    for (let i = 0, iLen = chain.length; i < iLen; i++) {
      const { transactions } = chain[i];

      for (let j = 0, jLen = transactions.length; j < jLen; j++) {
        const transaction = transactions[j];

        if (transaction.from === address) {
          balance -= transaction.amount;
        }

        if (transaction.to === address) {
          balance += transaction.amount;
        }
      }
    }

    return balance;
  }

  toString() {
    return JSON.stringify(this);
  }
}

module.exports = BlockChain;
