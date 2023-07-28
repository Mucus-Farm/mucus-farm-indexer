import type { Config } from "@ponder/core";

console.log("anvil rpc: ", process.env.ANVIL_RPC_URL);

export const config: Config = {
  networks: [
    // { name: "goerli", chainId: 5, rpcUrl: process.env.GOERLI_RPC_URL },
    { name: "anvil", chainId: 1, rpcUrl: process.env.ANVIL_RPC_URL },
  ],
  contracts: [
    // {
    //   name: "Mucus",
    //   network: "goerli",
    //   address: process.env.MUCUS_CONTRACT_ADDRESS! as `0x${string}`,
    //   abi: "./abis/Mucus.json",
    //   startBlock: process.env.MUCUS_START_BLOCK! as unknown as number,
    // },
    {
      name: "DividendsPairStaking",
      network: "anvil",
      address: process.env.DPS_CONTRACT_ADDRESS! as `0x${string}`,
      abi: "./abis/DividendsPairStaking.json",
      // startBlock: Number(process.env.DPS_START_BLOCK!),
      startBlock: 16183400,
    },
    {
      name: "FrogsAndDogs",
      network: "anvil",
      address: process.env.FND_CONTRACT_ADDRESS! as `0x${string}`,
      abi: "./abis/FrogsAndDogs.json",
      // startBlock: Number(process.env.FND_START_BLOCK!),
      startBlock: 16183400,
    },
    {
      name: "MucusFarm",
      network: "anvil",
      address: process.env.MUCUS_FARM_CONTRACT_ADDRESS! as `0x${string}`,
      abi: "./abis/MucusFarm.json",
      // startBlock: Number(process.env.MUCUS_FARM_START_BLOCK!),
      startBlock: 16182000,
    }
  ],
};
