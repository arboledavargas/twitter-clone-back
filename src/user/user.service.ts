import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "../models/user.model";
import { CreateUserPayload } from "../graphql";
import { findUserById } from "./queries/find-user-by-id.query";
@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {

	}

	async createUser(uuid: string): Promise<CreateUserPayload>{

		const existingUser = await this.userRepository.queryOne(new findUserById({ id: uuid }))

		if(existingUser) return {
			successfull: true,
			user: {
				avatarUrl: existingUser.avatarUrl,
				bio: existingUser.bio,
				createdAt: existingUser.createdAt.toISOString(),
				email: existingUser.email,
				followersCount: existingUser.followersCount,
				followingCount: existingUser.followingCount,
				id: existingUser.id,
				location: existingUser.location,
				name: existingUser.name
			}
		}

		const newUser = User.createNew({
			id: uuid,
			avatarUrl: '',
			bio: '',
			email: '',
			name: '',
			location: ''
		})

		await this.userRepository.save(newUser);

		return {
			successfull: true,
			user: {
				avatarUrl: newUser.avatarUrl,
				bio: newUser.bio,
				createdAt: newUser.createdAt.toISOString(),
				email: newUser.email,
				followersCount: newUser.followersCount,
				followingCount: newUser.followingCount,
				id: newUser.id,	
				location: newUser.location,
				name: newUser.name
			}
		}
	}
}