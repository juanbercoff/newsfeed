import { User, Prisma } from '@prisma/client';

export type UserProfile = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userName: string;
  firstName: string;
  lastName: string;
};
