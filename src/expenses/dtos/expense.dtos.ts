import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateExpenseDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly value: number;
}

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}
