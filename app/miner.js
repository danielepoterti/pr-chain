const Wallet = require('../wallet');
const Trasaction = require('../wallet/transaction');
class Miner {
    constructor(blockchain, transactionPool, wallet, p2pServer) {
      this.blockchain = blockchain;
      this.transactionPool = transactionPool;
      this.wallet = wallet;
      this.p2pServer = p2pServer;
    }
  
    mine() {
      const validTransactions = this.transactionPool.validTransactions();
      validTransactions.push(Trasaction.rewardTransaction(this.wallet, this.wallet.blockchainWallet())
      );
      // create a block consisting of the valid transactions
      const block = this.blockchain.addBlock(validTransactions);
      // synchronize chains in the peer-to-peer server
      this.p2pServer.syncChains();
      // clear the transaction pool
      this.transactionPool.clear();
    }
  }
  
  module.exports = Miner;