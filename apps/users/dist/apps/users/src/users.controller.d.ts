import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(updateUserDto: UpdateUserDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
