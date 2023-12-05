import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateRefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsDate()
  @IsNotEmpty()
  expiresAt: Date;
}
