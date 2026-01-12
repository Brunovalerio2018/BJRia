import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PorIdDto {
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}
