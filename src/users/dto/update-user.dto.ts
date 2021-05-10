import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';

export class UpdateUserDto {

  @ApiProperty()
  id: number

  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(10)
  name: string;
}
