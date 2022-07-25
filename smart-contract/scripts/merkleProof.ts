import { utils } from 'ethers';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import CollectionConfig from './../config/CollectionConfig';
import NftContractProvider from '../lib/NftContractProvider';

async function main() {
    // Check configuration
    if (CollectionConfig.whitelistAddresses.length < 1) {
      throw '\x1b[31merror\x1b[0m ' + 'The whitelist is empty, please add some addresses to the configuration.';
    }
  
    // Build the Merkle Tree
    const leafNodes = CollectionConfig.whitelistAddresses.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const rootHash = '0x' + merkleTree.getRoot().toString('hex');
  
    // Attach to deployed contract
    const contract = await NftContractProvider.getContract();
  
    // Update root hash (if changed)
    if ((await contract.merkleRoot()) !== rootHash) {
      console.log(`Updating the root hash to: ${rootHash}`);
  
      await (await contract.setMerkleRoot(rootHash)).wait();
    }
  
    console.log('MerkleProof start!');
    CollectionConfig.whitelistAddresses.map(addr => console.log(addr + " : " + "[" + merkleTree.getHexProof(keccak256(addr)) + "]"));
    console.log('MerkleProof updated!');
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });