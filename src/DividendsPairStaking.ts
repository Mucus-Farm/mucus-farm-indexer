import { ponder } from "@/generated";
import { db } from "./db";
import { stakers } from "./db/schema"
import { eq } from "drizzle-orm";

ponder.on("DividendsPairStaking:StakeAdded", async ({ event }) => {
  const { staker, amount } = event.params;
  const { timestamp } = event.block;

  const [selectedStaker] = await db.select().from(stakers).where(eq(stakers.id, staker))

  console.log("amount for add staker: ", amount)

  if (selectedStaker) {
    await db
      .update(stakers)
      .set({
        amount: (BigInt(selectedStaker.amount) + amount).toString(),
        updatedAt: new Date(Number(timestamp) * 1000),
      })
      .where(eq(stakers.id, staker))
  } else {
    await db.insert(stakers)
      .values({
        id: staker,
        amount: amount.toString(),
        createdAt: new Date(Number(timestamp) * 1000),
        updatedAt: new Date(Number(timestamp) * 1000),
      })
  }
})

ponder.on("DividendsPairStaking:StakeRemoved", async ({ event }) => {
  const { staker, amount } = event.params;
  const { timestamp } = event.block;

  const [selectedStaker] = await db.select().from(stakers).where(eq(stakers.id, staker))

  console.log("amount for remove staker: ", amount)

  if (selectedStaker) {
    await db
      .update(stakers)
      .set({
        amount: (BigInt(selectedStaker.amount) - amount).toString(),
        updatedAt: new Date(Number(timestamp) * 1000),
      })
      .where(eq(stakers.id, staker))
  } else {
    await db.insert(stakers)
      .values({ 
        id: staker, amount: amount.toString(),
        createdAt: new Date(Number(timestamp) * 1000),
        updatedAt: new Date(Number(timestamp) * 1000),
      })
  }
})
