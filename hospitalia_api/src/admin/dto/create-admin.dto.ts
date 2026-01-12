import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength } from "class-validator";

export class CreateAdminDto {
  @IsString()
  @ApiProperty({ example: "" }) // Campo vazio no Swagger
  name: string;

  @IsEmail()
  @ApiProperty({ example: "" }) // Campo vazio
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: "" }) // Campo vazio
  password: string;
}
