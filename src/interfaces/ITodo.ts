export interface ITodo {
  id: number;
  title: String;
  completed: Boolean;
  createdAt: Date;
  userId?: string;
  access?: "public" | "registered" | "private";
}
