import { ponder } from "@/generated";
import { db } from "./db";
import { owners, mucusFarmed } from "./db/schema"
import { eq } from "drizzle-orm";

ponder.on("MucusFarm:TokensStaked", async ({ event }) => {
  const { parent, tokenIds } = event.params;
  const { timestamp } = event.block;

  console.log("tokens staked: ", parent);

  await Promise.all(tokenIds.map(async (tokenId) => {
    await db
      .insert(owners)
      .values({
        id: Number(tokenId),
        address: parent,
        staked: true,
        stakedAt: new Date(Number(timestamp) * 1000),
        createdAt: new Date(Number(timestamp) * 1000),
        updatedAt: new Date(Number(timestamp) * 1000),
      })
      .onConflictDoUpdate({ 
        target: owners.id, 
        set: { 
          address: parent, 
          staked: true, 
          stakedAt: new Date(Number(timestamp) * 1000), 
          updatedAt: new Date(Number(timestamp) * 1000) 
        } 
      })
  }))
})

ponder.on("MucusFarm:TokensUnstaked", async ({ event }) => {
  const { tokenIds } = event.params;
  const { timestamp } = event.block;

  console.log("tokens unstaked: ", tokenIds)

  await Promise.all(tokenIds.map(async (tokenId) => {
    await db
      .update(owners)
      .set({ id: Number(tokenId), staked: false, updatedAt: new Date(Number(timestamp) * 1000) })
      .where(eq(owners.id, Number(tokenId)))
  }))
})

ponder.on("MucusFarm:TokensFarmed", async ({ event }) => {
  const { parent, mucusFarmed: amount } = event.params;
  const { timestamp } = event.block;

  console.log("tokens farmed: ", parent, mucusFarmed, amount)

  const [mucusFarmedOwner] = await db.select().from(mucusFarmed).where(eq(mucusFarmed.id, parent))

  if (mucusFarmedOwner) {
    await db
      .update(mucusFarmed)
      .set({ 
        amount: (BigInt(mucusFarmedOwner.amount) + amount).toString(),
        createdAt: new Date(Number(timestamp) * 1000),
        updatedAt: new Date(Number(timestamp) * 1000),
      })
  } else {
    await db
      .insert(mucusFarmed)
      .values({ 
        id: parent,
        amount: amount.toString(),
        createdAt: new Date(Number(timestamp) * 1000),
        updatedAt: new Date(Number(timestamp) * 1000),
      })
  }
})
