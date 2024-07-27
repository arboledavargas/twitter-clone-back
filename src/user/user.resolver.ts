import { Mutation, Resolver, Query, Args } from "@nestjs/graphql";
import { UUID } from "../common/uuid.decorator";
import { CreateUserPayload, User, CreateUserInput} from "../graphql";
import { UserService } from "../user/user.service";

@Resolver('User')
export class UserResolver {
	constructor(private readonly userService: UserService){

	}

	@Mutation()
	async createUser(@UUID() uuid: string, @Args('user') createUserInput: CreateUserInput): Promise<CreateUserPayload> {
		return await this.userService.createUser(createUserInput, uuid);
	}
	
	@Query()
	async currentUser(@UUID() uuid: string): Promise<User | null> {
		const result = await this.userService.getUser(uuid);

		if(!result) return null
		
		return result.serialize();
	}
}