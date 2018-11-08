const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(transactions, prevHash) {
    this.transactions = transactions;
    this.prevHash = prevHash;
    this.nonce = 0;

    this.hash = this.calcHash();
  }

  calcHash() {
    return SHA256(`${this.prevHash}${JSON.stringify(this.transactions)}${this.nonce}`).toString();
  }

  mine(difficulty) {
    const goal = new Array(difficulty + 1).join('0');
    let hash = this.hash;

    while (!hash.startsWith(goal)) {
      this.nonce++;
      hash = this.calcHash();
    }

    this.hash = hash;
  }

  isValid() {
    if (this.hash !== this.calcHash()) {
      return false;
    }

    const { transactions } = this;

    for (let i = 0, l = transactions.length; i < l; i++) {
      if (transactions[i].isValid()) continue;

      return false;
    }

    return true;
  }
}

module.exports = Block;
