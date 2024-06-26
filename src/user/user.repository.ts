import { Injectable } from "@nestjs/common";
import { IRepository } from "../primitives/repository";
import { User } from "../models/user.model";
import { Prisma } from "@prisma/client";
import { IQuery } from "src/primitives/query";
import { PrismaService } from "../common/prisma.service";
@Injectable()
export class UserRepository implements IRepository<User, Prisma.UserWhereInput> {

	constructor(private readonly db: PrismaService){}

	async save(model: User): Promise<void> {
		if(model.isNew) {
			await this.db.user.create({
				data: {
					avatarUrl: model.avatarUrl,
					bio: model.bio,
					email: model.email,
					id: model.id,
					location: model.location,
					name: model.name,
					createdAt: model.createdAt,
					followersCount: model.followersCount,
					followingCount: model.followingCount
				}
			})
		} else {
			await this.db.user.update({
				where: {
					id: model.id
				},
				data: {
					avatarUrl: model.avatarUrl,
					bio: model.bio,
					email: model.email,
					id: model.id,
					location: model.location,
					name: model.name,
					createdAt: model.createdAt,
					followersCount: model.followersCount,
					followingCount: model.followingCount
				}
			})
		}
	}

	async queryMany(query: IQuery<Prisma.UserWhereInput>): Promise<User[]> {
		return (await this.db.user.findMany({
			where: query.getQuery()
		})).map(user => User.createExisting({
			avatarUrl: user.avatarUrl,
			bio: user.bio,
			email: user.email,
			id: user.id,
			location: user.location,
			name: user.name,
			createdAt: user.createdAt,
			followersCount: user.followersCount,
			followingCount: user.followingCount
		}))
	}

	async queryOne(query: IQuery<Prisma.UserWhereInput>): Promise<User | null> {
		const user = await this.db.user.findFirst({
			where: query.getQuery()
		})

		if(!user) return null

		return User.createExisting({
			avatarUrl: user.avatarUrl,
			bio: user.bio,
			email: user.email,
			id: user.id,
			location: user.location,
			name: user.name,
			createdAt: user.createdAt,
			followersCount: user.followersCount,
			followingCount: user.followingCount
		})
	}
}