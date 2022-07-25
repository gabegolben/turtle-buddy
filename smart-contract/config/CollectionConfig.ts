import CollectionConfigInterface from '../lib/CollectionConfigInterface';
import * as Networks from '../lib/Networks';
import * as Marketplaces from '../lib/Marketplaces';
import whitelistAddresses from './whitelist.json';

const CollectionConfig: CollectionConfigInterface = {
  testnet: Networks.ethereumTestnet,
  mainnet: Networks.ethereumMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: 'TURTLEBUDDY',
  tokenName: 'Turtle Buddy',
  tokenSymbol: 'TBuddy',
  hiddenMetadataUri: 'ipfs://QmZfZSNjFWoSgbBSj1pkySi786YfR8ARCpWAz7DsRMQf53/',
  maxSupply: 5555,
  whitelistSale: {
    price: 0.03,
    maxMintAmountPerTx: 10,
  },
  preSale: {
    price: 0.03,
    maxMintAmountPerTx: 10,
  },
  publicSale: {
    price: 0.03,
    maxMintAmountPerTx: 10,
  },
  contractAddress: "0x109dC834f21CfF80ae8eF23d5C18052B6f445154",
  marketplaceIdentifier: 'turtle-buddy',
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
};

export default CollectionConfig;
