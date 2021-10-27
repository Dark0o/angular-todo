export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
}
export type UserDto = Omit<User, 'id'>;
