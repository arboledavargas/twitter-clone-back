import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { UserRepository } from "./user.repository";
import { DatabaseModule } from "../common/database/database.module";
@Module({
	providers: [UserResolver, UserService, UserRepository],
	exports: [UserService],
	imports: [DatabaseModule]
})
export class UserModule {

}