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
    return this.hash === this.calcHash();
  }
}

module.exports = Block;
