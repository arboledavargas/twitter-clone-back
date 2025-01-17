import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "../models/user.model";
import { CreateUserPayload, CreateUserInput} from "../graphql";
import { findUserById } from "./queries/find-user-by-id.query";
import { findUserByIdIn } from "./queries/find-user-with-id-in.query";
import { UpdateUserHandlePayload } from "../graphql";

@Injectable()
export class UserService {

	constructor(private userRepository: UserRepository) {

	}

	async getUsersByIds(keys: string[]): Promise<User[]> {
    const result = await this.userRepository.queryMany(new findUserByIdIn({ ids: keys }));

		return keys.map( key => result.find(user => user.id == key));
  }

	async createUser(user: CreateUserInput, uuid: string): Promise<CreateUserPayload>{

		const existingUser = await this.userRepository.queryOne(new findUserById({ id: uuid }))

		if(existingUser) {
			return {
			successfull: true,
			user: existingUser.serialize()
		}
	}

		const newUser = User.createNew({
			id: uuid,
			avatarUrl: user.avatarUrl,
			bio: user.bio ?? null,
			email: user.email,
			name: user.name,
			location: user.location,
			handle: user.handle,
			birthDate: new Date(user.birthDate)
		})

		await this.userRepository.save(newUser);

		return {
			successfull: true,
			user: newUser.serialize()
		}
	}

	async getUser(uuid: string): Promise<User | null> {
		const user = await this.userRepository.queryOne(new findUserById({ id: uuid }));

		if(!user) return null

		return user
	}

	async updateUserHandle(uuid: string, handle: string):Promise<UpdateUserHandlePayload> {
		const user = await this.userRepository.queryOne(new findUserById({ id: uuid }));

		if(!user) return {
			successfull: false
		}

		user.updateHandle(handle);

		await this.userRepository.save(user);

		return {
			successfull: true
		}

	}
}