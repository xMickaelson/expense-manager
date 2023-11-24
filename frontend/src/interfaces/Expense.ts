import { Account } from "./Account";
import { Category } from "./Category";
import { ExpenseType } from "./ExpenseType";

export interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: ExpenseType;
  category?: Category;
  account: Account;
}
