const Wallet = require('./wallet');
const Transaction = require('./wallet/transaction');

let transaction, wallet, recipient, amount;

wallet = new Wallet();
amount = 50;
recipient = 'r3c1p13nt';
transaction = Transaction.newTransaction(wallet, recipient, amount);

transaction = transaction.update(wallet, 'r3c1p13nt2', 1 );


