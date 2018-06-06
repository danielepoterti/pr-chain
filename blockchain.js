const Block = require('./block');

class Blockchain {
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        const lastBlock = this.chain[this.chain.length-1];
        const block = Block.mineBlock(lastBlock, data);

        this.chain.push(block);

        return block;

    }

    isValidChain(chain) 
	{
		if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
			return false;
		
		for (let i=1; i<chain.length; i++)
		{
			const block = chain[i];
			const lastBlock = chain[i-1];
			
            if (   block.lastHash !== lastBlock.hash ||
                   block.hash !== Block.blockHash(block)   )
			{
				return false;
			}
		}
		return true;
    }

    //se un altro nodo invia una catena valida
    //viene sostituita la catena dell'host con la nuova ricevuta
    
    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) {
          console.log('Received chain is not longer than the current chain.'); //non è più lunga
          return;
        } else if (!this.isValidChain(newChain)) {
          console.log('The received chain is not valid.'); //non è valida
          return;
        }
      
        //se i due controlli sono successful allora può essere sostituita

        console.log('Replacing blockchain with the new chain.');
        this.chain = newChain;
      }
}

module.exports = Blockchain;