export type JobType = {
  _id?: string;
  title: string;
  description: string;
  payment: number;
};

export type UserType = {
  firstName?: string;
  lastName?: string;
  password: string;
  email: string;
  gender?: string;
  phoneNumber?: number;
};