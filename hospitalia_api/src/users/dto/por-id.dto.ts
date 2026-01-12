import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UsersPorIdDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: "ID do usuário", required: false, example: 1 })
  id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "Login do usuário", required: false, example: "admin" })
  login?: string;
}
