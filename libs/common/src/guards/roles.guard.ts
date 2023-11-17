import { AuthGuard } from '@nestjs/passport';

export class RoleAuthGuard extends AuthGuard('role') {}
