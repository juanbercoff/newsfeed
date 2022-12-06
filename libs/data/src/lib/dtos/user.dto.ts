import { Prisma } from '@prisma/client';

const userWithUserProfileResponseDto = Prisma.validator<Prisma.UserArgs>()({
  include: { profile: true },
});

export type UserWithUserProfileResponseDto = Prisma.UserGetPayload<
  typeof userWithUserProfileResponseDto
>;

export type UserProfileUpdateInput = Prisma.UserProfileUpdateInput;
