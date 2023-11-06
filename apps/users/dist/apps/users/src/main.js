"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const users_module_1 = require("./users.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(users_module_1.UsersModule);
    await app.listen(3000);
    console.log(`User application listening on port 3000`);
}
bootstrap();
//# sourceMappingURL=main.js.map