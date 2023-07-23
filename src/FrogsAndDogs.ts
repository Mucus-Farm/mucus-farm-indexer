import { ponder } from "@/generated";
import { db } from "./db";
import { owners } from "./db/schema"

ponder.on("FrogsAndDogs:Transfer", async ({ event }) => {
  const { to, tokenId } = event.params;
  const { timestamp } = event.block;

  console.log("Transferred: ", to, tokenId)

  if (to !== process.env.MUCUS_FARM_CONTRACT_ADDRESS) {
    await db
      .insert(owners)
      .values({ id: Number(tokenId), address: to, createdAt: new Date(Number(timestamp) * 1000), updatedAt: new Date(Number(timestamp) * 1000) })
      .onConflictDoUpdate({ target: owners.id,  set: { address: to, updatedAt: new Date(Number(timestamp) * 1000) } })
  }
})
