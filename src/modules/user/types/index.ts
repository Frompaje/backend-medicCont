export type User = {
  id: string;
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type InputCreateUser = {
  name: string;
  password: string;
  email: string;
};

export type InputLoginUser = {
  password: string;
  email: string;
};
