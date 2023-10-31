import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    create(createUserDto: CreateUserDto): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number): string;
    remove(id: number): string;
}
