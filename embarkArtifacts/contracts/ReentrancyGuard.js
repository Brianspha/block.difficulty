import EmbarkJS from '../embarkjs';

const ReentrancyGuardConfig = {"abiDefinition":[{"constant":false,"inputs":[],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x8129fc1c"}],"deployedAddress":"0xDc3Fd0B18b0D3Da68fc719b422E13A31cc032C3E","className":"ReentrancyGuard","args":[],"gas":133660,"gasPrice":"20000000000","silent":false,"track":true,"deploy":true,"realRuntimeBytecode":"608060405234801561001057600080fd5b506004361061002b5760003560e01c80638129fc1c14610030575b600080fd5b61003861003a565b005b600054610100900460ff168061005357506100536100e1565b80610061575060005460ff16155b61009c5760405162461bcd60e51b815260040180806020018281038252602e8152602001806100e8602e913960400191505060405180910390fd5b600054610100900460ff161580156100c7576000805460ff1961ff0019909116610100171660011790555b600160335580156100de576000805461ff00191690555b50565b303b159056fe436f6e747261637420696e7374616e63652068617320616c7265616479206265656e20696e697469616c697a6564a265627a7a72305820f781b65b1039540051","realArgs":[],"code":"608060405234801561001057600080fd5b5061014a806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80638129fc1c14610030575b600080fd5b61003861003a565b005b600054610100900460ff168061005357506100536100e1565b80610061575060005460ff16155b61009c5760405162461bcd60e51b815260040180806020018281038252602e8152602001806100e8602e913960400191505060405180910390fd5b600054610100900460ff161580156100c7576000805460ff1961ff0019909116610100171660011790555b600160335580156100de576000805461ff00191690555b50565b303b159056fe436f6e747261637420696e7374616e63652068617320616c7265616479206265656e20696e697469616c697a6564a265627a7a72305820f781b65b10395400512ee2077886c23c6276dfd7ec17aebb8a30bccab66534f364736f6c634300050a0032","runtimeBytecode":"608060405234801561001057600080fd5b506004361061002b5760003560e01c80638129fc1c14610030575b600080fd5b61003861003a565b005b600054610100900460ff168061005357506100536100e1565b80610061575060005460ff16155b61009c5760405162461bcd60e51b815260040180806020018281038252602e8152602001806100e8602e913960400191505060405180910390fd5b600054610100900460ff161580156100c7576000805460ff1961ff0019909116610100171660011790555b600160335580156100de576000805461ff00191690555b50565b303b159056fe436f6e747261637420696e7374616e63652068617320616c7265616479206265656e20696e697469616c697a6564a265627a7a72305820f781b65b10395400512ee2077886c23c6276dfd7ec17aebb8a30bccab66534f364736f6c634300050a0032","linkReferences":{},"swarmHash":"2ee2077886c23c6276dfd7ec17aebb8a30bccab66534f364736f6c634300050a","gasEstimates":{"creation":{"codeDepositCost":"66000","executionCost":"117","totalCost":"66117"},"external":{"initialize()":"infinite"}},"functionHashes":{"initialize()":"8129fc1c"},"filename":"C:/Users/Spha/Documents/Github/block.difficulty/.embark/node_modules/@openzeppelin/contracts-ethereum-package/contracts/utils/ReentrancyGuard.sol","originalFilename":"contracts/C:/Users/Spha/Documents/Github/block.difficulty/.embark/node_modules/@openzeppelin/contracts-ethereum-package/contracts/utils/ReentrancyGuard.sol","path":"C:\\Users\\Spha\\Documents\\Github\\block.difficulty\\contracts\\C:\\Users\\Spha\\Documents\\Github\\block.difficulty\\.embark\\node_modules\\@openzeppelin\\contracts-ethereum-package\\contracts\\utils\\ReentrancyGuard.sol","type":"file","deploymentAccount":"0x6Bb26B7893C6Aad51A429F445E0F9a625B0ef3E0","transactionHash":"0xa0516f78fded4e84c248919ced3b59a9a0cd985d0e0b7a4e5c35fa14790e0cfa"};
const ReentrancyGuard = new EmbarkJS.Blockchain.Contract(ReentrancyGuardConfig);

export default ReentrancyGuard;
