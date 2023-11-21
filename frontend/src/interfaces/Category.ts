import { Budget } from "./Budget";

export interface Category {
  id: string;
  name: string;
  emoji?: string;
  budget?: Budget
}
