import EmbarkJS from '../embarkjs';

const ERC721Config = {"abiDefinition":[{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x01ffc9a7"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x081812fc"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x095ea7b3"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x23b872dd"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x42842e0e"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x6352211e"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x70a08231"},{"constant":false,"inputs":[],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x8129fc1c"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xa22cb465"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xb88d4fde"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xe985e9c5"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event","signature":"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event","signature":"0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event","signature":"0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"}],"deployedAddress":"0x9E986A171bfdA783a6AaC83883f9607C66DE2B8f","className":"ERC721","args":[],"gas":1105384,"gasPrice":"20000000000","silent":false,"track":true,"deploy":true,"realRuntimeBytecode":"608060405234801561001057600080fd5b50600436106100a95760003560e01c80636352211e116100715780636352211e146101bc57806370a08231146101d95780638129fc1c14610211578063a22cb46514610219578063b88d4fde14610247578063e985e9c51461030d576100a9565b806301ffc9a7146100ae578063081812fc146100e9578063095ea7b31461012257806323b872dd1461015057806342842e0e14610186575b600080fd5b6100d5600480360360208110156100c457600080fd5b50356001600160e01b03191661033b565b604080519115158252519081900360200190f35b610106600480360360208110156100ff57600080fd5b503561035a565b604080516001600160a01b039092168252519081900360200190f35b61014e6004803603604081101561013857600080fd5b506001600160a01b0381351690602001356103bc565b005b61014e6004803603606081101561016657600080fd5b506001600160a01b038135811691602081013590911690604001356104e4565b61014e6004803603606081101561019c57600080fd5b506001600160a01b03813581169160208101359091169060400135610540565b610106600480360360208110156101d257600080fd5b503561055b565b6101ff600480360360208110156101ef57600080fd5b50356001600160a01b03166105b5565b60408051918252519081900360200190f35b61014e61061d565b61014e6004803603604081101561022f57600080fd5b506001600160a01b03813516906020013515156106d7565b61014e6004803603608081101561025d57600080fd5b6001600160a01b0382358116926020810135909116916040820135919081019060808101606082013564010000000081111561029857600080fd5b8201836020820111156102aa57600080fd5b803590602001918460018302840111640100000000831117156102cc57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506107dc945050505050565b6100d56004803603604081101561032357600080fd5b506001600160a01b038135811691602001351661083a565b6001600160e01b03191660009081526033602052604090205460ff1690565b600061036582610868565b6103a05760405162461bcd60e51b815260040180806020018281038252602c8152602001806110a7602c913960400191505060405180910390fd5b506000908152606760205260409020546001600160a01b031690565b60006103c78261055b565b9050806001600160a01b0316836001600160a01b0316141561041a5760405162461bcd60e51b815260040180806020018281038252602181526020018061112a6021913960400191505060405180910390fd5b806001600160a01b031661042c610885565b6001600160a01b0316148061044d575061044d81610448610885565b61083a565b6104885760405162461bcd60e51b815260040180806020018281038252603881526020018061101c6038913960400191505060405180910390fd5b60008281526067602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b6104f56104ef610885565b82610889565b6105305760405162461bcd60e51b815260040180806020018281038252603181526020018061114b6031913960400191505060405180910390fd5b61053b83838361092d565b505050565b61053b838383604051806020016040528060008152506107dc565b6000818152606660205260408120546001600160a01b0316806105af5760405162461bcd60e51b815260040180806020018281038252602981526020018061107e6029913960400191505060405180910390fd5b92915050565b60006001600160a01b0382166105fc5760405162461bcd60e51b815260040180806020018281038252602a815260200180611054602a913960400191505060405180910390fd5b6001600160a01b03821660009081526068602052604090206105af90610a71565b600054610100900460ff16806106365750610636610a75565b80610644575060005460ff16155b61067f5760405162461bcd60e51b815260040180806020018281038252602e8152602001806110d3602e913960400191505060405180910390fd5b600054610100900460ff161580156106aa576000805460ff1961ff0019909116610100171660011790555b6106b2610a7b565b6106c26380ac58cd60e01b610b14565b80156106d4576000805461ff00191690555b50565b6106df610885565b6001600160a01b0316826001600160a01b03161415610745576040805162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b8060696000610752610885565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155610796610885565b60408051841515815290516001600160a01b0392909216917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319181900360200190a35050565b6107ed6107e7610885565b83610889565b6108285760405162461bcd60e51b815260040180806020018281038252603181526020018061114b6031913960400191505060405180910390fd5b61083484848484610b98565b50505050565b6001600160a01b03918216600090815260696020908152604080832093909416825291909152205460ff1690565b6000908152606660205260409020546001600160a01b0316151590565b3390565b600061089482610868565b6108cf5760405162461bcd60e51b815260040180806020018281038252602c815260200180610ff0602c913960400191505060405180910390fd5b60006108da8361055b565b9050806001600160a01b0316846001600160a01b031614806109155750836001600160a01b031661090a8461035a565b6001600160a01b0316145b806109255750610925818561083a565b949350505050565b826001600160a01b03166109408261055b565b6001600160a01b0316146109855760405162461bcd60e51b81526004018080602001828103825260298152602001806111016029913960400191505060405180910390fd5b6001600160a01b0382166109ca5760405162461bcd60e51b8152600401808060200182810382526024815260200180610fcc6024913960400191505060405180910390fd5b6109d381610bea565b6001600160a01b03831660009081526068602052604090206109f490610c25565b6001600160a01b0382166000908152606860205260409020610a1590610c3c565b60008181526066602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b5490565b303b1590565b600054610100900460ff1680610a945750610a94610a75565b80610aa2575060005460ff16155b610add5760405162461bcd60e51b815260040180806020018281038252602e8152602001806110d3602e913960400191505060405180910390fd5b600054610100900460ff16158015610b08576000805460ff1961ff0019909116610100171660011790555b6106c26301ffc9a760e01b5b6001600160e01b03198082161415610b73576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152603360205260409020805460ff19166001179055565b610ba384848461092d565b610baf84848484610c45565b6108345760405162461bcd60e51b8152600401808060200182810382526032815260200180610f9a6032913960400191505060405180910390fd5b6000818152606760205260409020546001600160a01b0316156106d457600090815260676020526040902080546001600160a01b0319169055565b8054610c3890600163ffffffff610e8016565b9055565b80546001019055565b6000610c59846001600160a01b0316610ec9565b610c6557506001610925565b600060606001600160a01b038616630a85bd0160e11b610c83610885565b89888860405160240180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610cfc578181015183820152602001610ce4565b50505050905090810190601f168015610d295780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909a16999099178952518151919890975087965094509250829150849050835b60208310610d915780518252601f199092019160209182019101610d72565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610df3576040519150601f19603f3d011682016040523d82523d6000602084013e610df8565b606091505b509150915081610e4957805115610e125780518082602001fd5b60405162461bcd60e51b8152600401808060200182810382526032815260200180610f9a6032913960400191505060405180910390fd5b6000818060200190516020811015610e6057600080fd5b50516001600160e01b031916630a85bd0160e11b14935061092592505050565b6000610ec283836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610f02565b9392505050565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470818114801590610925575050151592915050565b60008184841115610f915760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f56578181015183820152602001610f3e565b50505050905090810190601f168015610f835780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50505090039056fe4552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e436f6e747261637420696e7374616e63652068617320616c7265616479206265656e20696e697469616c697a65644552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a265627a7a723058206d0074a485b38218d1","realArgs":[],"code":"60806040526111b0806100136000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80636352211e116100715780636352211e146101bc57806370a08231146101d95780638129fc1c14610211578063a22cb46514610219578063b88d4fde14610247578063e985e9c51461030d576100a9565b806301ffc9a7146100ae578063081812fc146100e9578063095ea7b31461012257806323b872dd1461015057806342842e0e14610186575b600080fd5b6100d5600480360360208110156100c457600080fd5b50356001600160e01b03191661033b565b604080519115158252519081900360200190f35b610106600480360360208110156100ff57600080fd5b503561035a565b604080516001600160a01b039092168252519081900360200190f35b61014e6004803603604081101561013857600080fd5b506001600160a01b0381351690602001356103bc565b005b61014e6004803603606081101561016657600080fd5b506001600160a01b038135811691602081013590911690604001356104e4565b61014e6004803603606081101561019c57600080fd5b506001600160a01b03813581169160208101359091169060400135610540565b610106600480360360208110156101d257600080fd5b503561055b565b6101ff600480360360208110156101ef57600080fd5b50356001600160a01b03166105b5565b60408051918252519081900360200190f35b61014e61061d565b61014e6004803603604081101561022f57600080fd5b506001600160a01b03813516906020013515156106d7565b61014e6004803603608081101561025d57600080fd5b6001600160a01b0382358116926020810135909116916040820135919081019060808101606082013564010000000081111561029857600080fd5b8201836020820111156102aa57600080fd5b803590602001918460018302840111640100000000831117156102cc57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506107dc945050505050565b6100d56004803603604081101561032357600080fd5b506001600160a01b038135811691602001351661083a565b6001600160e01b03191660009081526033602052604090205460ff1690565b600061036582610868565b6103a05760405162461bcd60e51b815260040180806020018281038252602c8152602001806110a7602c913960400191505060405180910390fd5b506000908152606760205260409020546001600160a01b031690565b60006103c78261055b565b9050806001600160a01b0316836001600160a01b0316141561041a5760405162461bcd60e51b815260040180806020018281038252602181526020018061112a6021913960400191505060405180910390fd5b806001600160a01b031661042c610885565b6001600160a01b0316148061044d575061044d81610448610885565b61083a565b6104885760405162461bcd60e51b815260040180806020018281038252603881526020018061101c6038913960400191505060405180910390fd5b60008281526067602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b6104f56104ef610885565b82610889565b6105305760405162461bcd60e51b815260040180806020018281038252603181526020018061114b6031913960400191505060405180910390fd5b61053b83838361092d565b505050565b61053b838383604051806020016040528060008152506107dc565b6000818152606660205260408120546001600160a01b0316806105af5760405162461bcd60e51b815260040180806020018281038252602981526020018061107e6029913960400191505060405180910390fd5b92915050565b60006001600160a01b0382166105fc5760405162461bcd60e51b815260040180806020018281038252602a815260200180611054602a913960400191505060405180910390fd5b6001600160a01b03821660009081526068602052604090206105af90610a71565b600054610100900460ff16806106365750610636610a75565b80610644575060005460ff16155b61067f5760405162461bcd60e51b815260040180806020018281038252602e8152602001806110d3602e913960400191505060405180910390fd5b600054610100900460ff161580156106aa576000805460ff1961ff0019909116610100171660011790555b6106b2610a7b565b6106c26380ac58cd60e01b610b14565b80156106d4576000805461ff00191690555b50565b6106df610885565b6001600160a01b0316826001600160a01b03161415610745576040805162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b8060696000610752610885565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155610796610885565b60408051841515815290516001600160a01b0392909216917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319181900360200190a35050565b6107ed6107e7610885565b83610889565b6108285760405162461bcd60e51b815260040180806020018281038252603181526020018061114b6031913960400191505060405180910390fd5b61083484848484610b98565b50505050565b6001600160a01b03918216600090815260696020908152604080832093909416825291909152205460ff1690565b6000908152606660205260409020546001600160a01b0316151590565b3390565b600061089482610868565b6108cf5760405162461bcd60e51b815260040180806020018281038252602c815260200180610ff0602c913960400191505060405180910390fd5b60006108da8361055b565b9050806001600160a01b0316846001600160a01b031614806109155750836001600160a01b031661090a8461035a565b6001600160a01b0316145b806109255750610925818561083a565b949350505050565b826001600160a01b03166109408261055b565b6001600160a01b0316146109855760405162461bcd60e51b81526004018080602001828103825260298152602001806111016029913960400191505060405180910390fd5b6001600160a01b0382166109ca5760405162461bcd60e51b8152600401808060200182810382526024815260200180610fcc6024913960400191505060405180910390fd5b6109d381610bea565b6001600160a01b03831660009081526068602052604090206109f490610c25565b6001600160a01b0382166000908152606860205260409020610a1590610c3c565b60008181526066602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b5490565b303b1590565b600054610100900460ff1680610a945750610a94610a75565b80610aa2575060005460ff16155b610add5760405162461bcd60e51b815260040180806020018281038252602e8152602001806110d3602e913960400191505060405180910390fd5b600054610100900460ff16158015610b08576000805460ff1961ff0019909116610100171660011790555b6106c26301ffc9a760e01b5b6001600160e01b03198082161415610b73576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152603360205260409020805460ff19166001179055565b610ba384848461092d565b610baf84848484610c45565b6108345760405162461bcd60e51b8152600401808060200182810382526032815260200180610f9a6032913960400191505060405180910390fd5b6000818152606760205260409020546001600160a01b0316156106d457600090815260676020526040902080546001600160a01b0319169055565b8054610c3890600163ffffffff610e8016565b9055565b80546001019055565b6000610c59846001600160a01b0316610ec9565b610c6557506001610925565b600060606001600160a01b038616630a85bd0160e11b610c83610885565b89888860405160240180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610cfc578181015183820152602001610ce4565b50505050905090810190601f168015610d295780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909a16999099178952518151919890975087965094509250829150849050835b60208310610d915780518252601f199092019160209182019101610d72565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610df3576040519150601f19603f3d011682016040523d82523d6000602084013e610df8565b606091505b509150915081610e4957805115610e125780518082602001fd5b60405162461bcd60e51b8152600401808060200182810382526032815260200180610f9a6032913960400191505060405180910390fd5b6000818060200190516020811015610e6057600080fd5b50516001600160e01b031916630a85bd0160e11b14935061092592505050565b6000610ec283836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610f02565b9392505050565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470818114801590610925575050151592915050565b60008184841115610f915760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f56578181015183820152602001610f3e565b50505050905090810190601f168015610f835780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50505090039056fe4552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e436f6e747261637420696e7374616e63652068617320616c7265616479206265656e20696e697469616c697a65644552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a265627a7a723058206d0074a485b38218d1cc664eb479fcb5152c2d4ad933ee1496168f0c8d3f575d64736f6c634300050a0032","runtimeBytecode":"608060405234801561001057600080fd5b50600436106100a95760003560e01c80636352211e116100715780636352211e146101bc57806370a08231146101d95780638129fc1c14610211578063a22cb46514610219578063b88d4fde14610247578063e985e9c51461030d576100a9565b806301ffc9a7146100ae578063081812fc146100e9578063095ea7b31461012257806323b872dd1461015057806342842e0e14610186575b600080fd5b6100d5600480360360208110156100c457600080fd5b50356001600160e01b03191661033b565b604080519115158252519081900360200190f35b610106600480360360208110156100ff57600080fd5b503561035a565b604080516001600160a01b039092168252519081900360200190f35b61014e6004803603604081101561013857600080fd5b506001600160a01b0381351690602001356103bc565b005b61014e6004803603606081101561016657600080fd5b506001600160a01b038135811691602081013590911690604001356104e4565b61014e6004803603606081101561019c57600080fd5b506001600160a01b03813581169160208101359091169060400135610540565b610106600480360360208110156101d257600080fd5b503561055b565b6101ff600480360360208110156101ef57600080fd5b50356001600160a01b03166105b5565b60408051918252519081900360200190f35b61014e61061d565b61014e6004803603604081101561022f57600080fd5b506001600160a01b03813516906020013515156106d7565b61014e6004803603608081101561025d57600080fd5b6001600160a01b0382358116926020810135909116916040820135919081019060808101606082013564010000000081111561029857600080fd5b8201836020820111156102aa57600080fd5b803590602001918460018302840111640100000000831117156102cc57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506107dc945050505050565b6100d56004803603604081101561032357600080fd5b506001600160a01b038135811691602001351661083a565b6001600160e01b03191660009081526033602052604090205460ff1690565b600061036582610868565b6103a05760405162461bcd60e51b815260040180806020018281038252602c8152602001806110a7602c913960400191505060405180910390fd5b506000908152606760205260409020546001600160a01b031690565b60006103c78261055b565b9050806001600160a01b0316836001600160a01b0316141561041a5760405162461bcd60e51b815260040180806020018281038252602181526020018061112a6021913960400191505060405180910390fd5b806001600160a01b031661042c610885565b6001600160a01b0316148061044d575061044d81610448610885565b61083a565b6104885760405162461bcd60e51b815260040180806020018281038252603881526020018061101c6038913960400191505060405180910390fd5b60008281526067602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b6104f56104ef610885565b82610889565b6105305760405162461bcd60e51b815260040180806020018281038252603181526020018061114b6031913960400191505060405180910390fd5b61053b83838361092d565b505050565b61053b838383604051806020016040528060008152506107dc565b6000818152606660205260408120546001600160a01b0316806105af5760405162461bcd60e51b815260040180806020018281038252602981526020018061107e6029913960400191505060405180910390fd5b92915050565b60006001600160a01b0382166105fc5760405162461bcd60e51b815260040180806020018281038252602a815260200180611054602a913960400191505060405180910390fd5b6001600160a01b03821660009081526068602052604090206105af90610a71565b600054610100900460ff16806106365750610636610a75565b80610644575060005460ff16155b61067f5760405162461bcd60e51b815260040180806020018281038252602e8152602001806110d3602e913960400191505060405180910390fd5b600054610100900460ff161580156106aa576000805460ff1961ff0019909116610100171660011790555b6106b2610a7b565b6106c26380ac58cd60e01b610b14565b80156106d4576000805461ff00191690555b50565b6106df610885565b6001600160a01b0316826001600160a01b03161415610745576040805162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b8060696000610752610885565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155610796610885565b60408051841515815290516001600160a01b0392909216917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319181900360200190a35050565b6107ed6107e7610885565b83610889565b6108285760405162461bcd60e51b815260040180806020018281038252603181526020018061114b6031913960400191505060405180910390fd5b61083484848484610b98565b50505050565b6001600160a01b03918216600090815260696020908152604080832093909416825291909152205460ff1690565b6000908152606660205260409020546001600160a01b0316151590565b3390565b600061089482610868565b6108cf5760405162461bcd60e51b815260040180806020018281038252602c815260200180610ff0602c913960400191505060405180910390fd5b60006108da8361055b565b9050806001600160a01b0316846001600160a01b031614806109155750836001600160a01b031661090a8461035a565b6001600160a01b0316145b806109255750610925818561083a565b949350505050565b826001600160a01b03166109408261055b565b6001600160a01b0316146109855760405162461bcd60e51b81526004018080602001828103825260298152602001806111016029913960400191505060405180910390fd5b6001600160a01b0382166109ca5760405162461bcd60e51b8152600401808060200182810382526024815260200180610fcc6024913960400191505060405180910390fd5b6109d381610bea565b6001600160a01b03831660009081526068602052604090206109f490610c25565b6001600160a01b0382166000908152606860205260409020610a1590610c3c565b60008181526066602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b5490565b303b1590565b600054610100900460ff1680610a945750610a94610a75565b80610aa2575060005460ff16155b610add5760405162461bcd60e51b815260040180806020018281038252602e8152602001806110d3602e913960400191505060405180910390fd5b600054610100900460ff16158015610b08576000805460ff1961ff0019909116610100171660011790555b6106c26301ffc9a760e01b5b6001600160e01b03198082161415610b73576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152603360205260409020805460ff19166001179055565b610ba384848461092d565b610baf84848484610c45565b6108345760405162461bcd60e51b8152600401808060200182810382526032815260200180610f9a6032913960400191505060405180910390fd5b6000818152606760205260409020546001600160a01b0316156106d457600090815260676020526040902080546001600160a01b0319169055565b8054610c3890600163ffffffff610e8016565b9055565b80546001019055565b6000610c59846001600160a01b0316610ec9565b610c6557506001610925565b600060606001600160a01b038616630a85bd0160e11b610c83610885565b89888860405160240180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610cfc578181015183820152602001610ce4565b50505050905090810190601f168015610d295780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909a16999099178952518151919890975087965094509250829150849050835b60208310610d915780518252601f199092019160209182019101610d72565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610df3576040519150601f19603f3d011682016040523d82523d6000602084013e610df8565b606091505b509150915081610e4957805115610e125780518082602001fd5b60405162461bcd60e51b8152600401808060200182810382526032815260200180610f9a6032913960400191505060405180910390fd5b6000818060200190516020811015610e6057600080fd5b50516001600160e01b031916630a85bd0160e11b14935061092592505050565b6000610ec283836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610f02565b9392505050565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470818114801590610925575050151592915050565b60008184841115610f915760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f56578181015183820152602001610f3e565b50505050905090810190601f168015610f835780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50505090039056fe4552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e436f6e747261637420696e7374616e63652068617320616c7265616479206265656e20696e697469616c697a65644552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a265627a7a723058206d0074a485b38218d1cc664eb479fcb5152c2d4ad933ee1496168f0c8d3f575d64736f6c634300050a0032","linkReferences":{},"swarmHash":"cc664eb479fcb5152c2d4ad933ee1496168f0c8d3f575d64736f6c634300050a","gasEstimates":{"creation":{"codeDepositCost":"905600","executionCost":"918","totalCost":"906518"},"external":{"approve(address,uint256)":"infinite","balanceOf(address)":"infinite","getApproved(uint256)":"infinite","initialize()":"infinite","isApprovedForAll(address,address)":"772","ownerOf(uint256)":"infinite","safeTransferFrom(address,address,uint256)":"infinite","safeTransferFrom(address,address,uint256,bytes)":"infinite","setApprovalForAll(address,bool)":"infinite","supportsInterface(bytes4)":"561","transferFrom(address,address,uint256)":"infinite"},"internal":{"_burn(address,uint256)":"infinite","_burn(uint256)":"infinite","_checkOnERC721Received(address,address,uint256,bytes memory)":"infinite","_clearApproval(uint256)":"20614","_exists(uint256)":"311","_hasBeenInitialized()":"infinite","_isApprovedOrOwner(address,uint256)":"infinite","_mint(address,uint256)":"infinite","_safeMint(address,uint256)":"infinite","_safeMint(address,uint256,bytes memory)":"infinite","_safeTransferFrom(address,address,uint256,bytes memory)":"infinite","_transferFrom(address,address,uint256)":"infinite"}},"functionHashes":{"approve(address,uint256)":"095ea7b3","balanceOf(address)":"70a08231","getApproved(uint256)":"081812fc","initialize()":"8129fc1c","isApprovedForAll(address,address)":"e985e9c5","ownerOf(uint256)":"6352211e","safeTransferFrom(address,address,uint256)":"42842e0e","safeTransferFrom(address,address,uint256,bytes)":"b88d4fde","setApprovalForAll(address,bool)":"a22cb465","supportsInterface(bytes4)":"01ffc9a7","transferFrom(address,address,uint256)":"23b872dd"},"filename":"C:/Users/Spha/Documents/Github/block.difficulty/.embark/node_modules/@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721.sol","originalFilename":"contracts/C:/Users/Spha/Documents/Github/block.difficulty/.embark/node_modules/@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721.sol","path":"C:\\Users\\Spha\\Documents\\Github\\block.difficulty\\contracts\\C:\\Users\\Spha\\Documents\\Github\\block.difficulty\\.embark\\node_modules\\@openzeppelin\\contracts-ethereum-package\\contracts\\token\\ERC721\\ERC721.sol","type":"file","deploymentAccount":"0x6Bb26B7893C6Aad51A429F445E0F9a625B0ef3E0","transactionHash":"0xef40ca0a8cd5586f5cf171b09f93365860d693283870de4d134ef926664676c2"};
const ERC721 = new EmbarkJS.Blockchain.Contract(ERC721Config);

export default ERC721;
