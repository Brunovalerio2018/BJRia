import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto {
  @IsString()
  @ApiProperty()
  nome: string;
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  senha: string;
  @IsString()
  @ApiProperty()
  endereco: string;
  @IsString()
  @ApiProperty()
  cpf: string
  @IsString()
  @ApiProperty()
  matricula: string
  @IsString()
  @ApiProperty()
  perfil: string
}
