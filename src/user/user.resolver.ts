import { Mutation, Resolver } from "@nestjs/graphql";
import { UUID } from "../common/uuid.decorator";
import { CreateUserPayload } from "../graphql";
import { UserService } from "../user/user.service";

@Resolver('User')
export class UserResolver {
	constructor(private readonly userService: UserService){

	}

	@Mutation()
	async createUser(@UUID() uuid: string ): Promise<CreateUserPayload> {
		return await this.userService.createUser(uuid)
	}
	
}