import { IsUUID, IsNotEmpty, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCommentLikeDto {
  @IsNotEmpty()
  @IsUUID()
  commentId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsBoolean()
  like: boolean;
}

export class CreateOrUpdateCommentLikeDto extends PartialType(
  CreateCommentLikeDto
) {}

export class UpdateCommentLikeDto extends PartialType(CreateCommentLikeDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class GetUserCommentLikeDto extends PartialType(CreateCommentLikeDto) {}

export type AllCommentsLikesDto = {
  commentId: string;
  _sum: {
    like: number;
  };
};
