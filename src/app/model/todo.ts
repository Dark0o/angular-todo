export interface ITodo {
  id: string;
  title: string;
  description: string;
  isImportant: boolean;
  isCompleted: boolean;
  isPublic: boolean;
  createdAt: string;
  userID: string;
}
export type TodoDto = Omit<ITodo, 'id'>;
