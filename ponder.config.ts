import type { Config } from "@ponder/core";

export const config: Config = {
  networks: [
    { name: "mainnet", chainId: 1, rpcUrl: process.env.MAINNET_RPC_URL },
    // { name: "goerli", chainId: 5, rpcUrl: process.env.GOERLI_RPC_URL },
    // { name: "anvil", chainId: 1, rpcUrl: process.env.ANVIL_RPC_URL },
  ],
  contracts: [
   {
      name: "DividendsPairStaking",
      network: "goerli",
      address: process.env.DPS_CONTRACT_ADDRESS! as `0x${string}`,
      abi: "./abis/DividendsPairStaking.json",
      startBlock: Number(process.env.DPS_START_BLOCK!),
    },
    // {
    //   name: "FrogsAndDogs",
    //   network: "goerli",
    //   address: process.env.FND_CONTRACT_ADDRESS! as `0x${string}`,
    //   abi: "./abis/FrogsAndDogs.json",
    //   startBlock: Number(process.env.FND_START_BLOCK!),
    // },
    // {
    //   name: "MucusFarm",
    //   network: "goerli",
    //   address: process.env.MUCUS_FARM_CONTRACT_ADDRESS! as `0x${string}`,
    //   abi: "./abis/MucusFarm.json",
    //   startBlock: Number(process.env.MUCUS_FARM_START_BLOCK!),
    // }
  ],
};
