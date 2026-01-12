import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumber()
  idade: number;

  @ApiProperty()
  @IsString()
  cpf: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  endereco?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  telefone?: string;
}
