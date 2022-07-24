import { IsUUID, IsNotEmpty, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrUpdateLikesEntityPayload } from '../types/likes-payload-types';

export class CreateCommentLikeDto {
  @IsNotEmpty()
  @IsUUID()
  commentId: string;

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
  commentLikeId: string;
}

export class GetUserCommentLikeDto extends PartialType(CreateCommentLikeDto) {}

export type AllCommentsLikesDto = {
  commentId: string;
  _sum: {
    like: number;
  };
};

export interface CreateCommentLikePayload
  extends CreateOrUpdateLikesEntityPayload {
  commentId: string;
}

export interface UpdateCommentLikePayload
  extends CreateOrUpdateLikesEntityPayload {
  commentLikeId: string;
}

export interface DeleteCommentLikePayload {
  commentLikeId: string;
  authToken: string;
}
