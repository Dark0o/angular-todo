export interface ITodo {
  id: string | null; // TODO: Make this param required
  title: string;
  description: string;
  isImportant: boolean;
  isCompleted: boolean;
  isPublic: boolean;
  createdAt: number;
  userID: string;
}
