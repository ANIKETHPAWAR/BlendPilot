export interface IContact {
  _id?: any;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  createdAt?: Date;
  updatedAt?: Date;
}
