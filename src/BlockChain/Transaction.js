const SHA256 = require('crypto-js/sha256');
const ec = require('./ec');

class Transaction {
  constructor(from, to, amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;

    this.time = Date.now();
    this.signature = '';
  }

  calcHash() {
    return SHA256(`${this.from}${this.to}${this.amount}${this.time}`).toString();
  }

  sign(key) {
    if (key.getPublic('hex') !== this.from) {
      throw new Error('You cannot sign another wallet transactions');
    }

    const hash = this.calcHash();
    const sin = key.sign(hash, 'base64');

    this.signature = sin.toDER('hex');
  }

  isValid() {
    if (this.from === null) {
      return true; // todo
    }

    const key = ec.keyFromPublic(this.from, 'hex');

    return key.verify(this.calcHash(), this.signature);
  }
}

module.exports = Transaction;
