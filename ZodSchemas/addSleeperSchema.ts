import { z } from 'zod'

export const addSleeperSchema = z.object({
  sleeperName:z.string(),
  sleeperPrice:z.number(),
  busNumber:z.number()
});
