import { IsString } from "class-validator"

export class CreatePostDto {
    @IsString()
    titulo:string

   @IsString()
    descripcion:string

   @IsString()
    imagen:string

   @IsString()
   user_id:string

}
