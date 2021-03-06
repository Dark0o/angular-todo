export interface Todo {
  id: string;
  title: string;
  description: string;
  isImportant: boolean;
  isCompleted: boolean;
  isPublic: boolean;
  createdAt: string;
  userID: string;
  name?: string;
}
export type TodoDto = Omit<Todo, 'id'>;
