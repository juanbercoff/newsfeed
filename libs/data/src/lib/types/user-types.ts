import { User, Prisma } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  password: string;
}

const userAsAuthor = Prisma.validator<Prisma.UserArgs>()({
  select: { id: true, username: true },
});

export type UserAsAuthor = Prisma.UserGetPayload<typeof userAsAuthor>;
