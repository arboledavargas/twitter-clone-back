import { Mutation, Resolver, Query } from "@nestjs/graphql";
import { UUID } from "../common/uuid.decorator";
import { CreateUserPayload, User} from "../graphql";
import { UserService } from "../user/user.service";

@Resolver('User')
export class UserResolver {
	constructor(private readonly userService: UserService){

	}

	@Mutation()
	async createUser(@UUID() uuid: string ): Promise<CreateUserPayload> {
		return await this.userService.createUser(uuid)
	}
	
	@Query()
	async currentUser(@UUID() uuid: string): Promise<User | null> {
		const result = await this.userService.getUser(uuid);

		if(!result) return null
		
		return result.serialize();
	}
}