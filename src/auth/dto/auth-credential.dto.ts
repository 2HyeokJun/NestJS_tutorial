import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class authCredentialDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^[a-zA-z0-9]*$/, { // 영어와 숫자만 가능
        message: 'password only accepts english and number'
    }) 
    password: string;
}