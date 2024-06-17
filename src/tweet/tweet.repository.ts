import { Injectable } from "@nestjs/common";
import { IRepository } from "../primitives/repository";
import { Tweet } from "../models/tweet.model";
import { Prisma } from "@prisma/client";
import { IQuery } from "src/primitives/query";
import { PrismaService } from "../common/prisma.service";

@Injectable()
export class TweetRepository implements IRepository<Tweet, Prisma.UserWhereInput>{
	constructor( private db:PrismaService ){

	}

	async save(model: Tweet): Promise<void> {
		await this.db.tweet.create({
			data: {
				author: {
					connect: {
						id: model.authorId
					}
				},
				body: model.body,
				visibility: model.visibility,
				createdAt: model.createdAt,
				id: model.id,
				likeCount: model.likeCount,
				replyCount: model.replyCount,
				retweetCount: model.retweetCount,
				type: model.type
			}
		}) 
	}

	queryMany(query: IQuery<Prisma.UserWhereInput>): Tweet[] {
		throw new Error("Method not implemented.");
	}

	queryOne(query: IQuery<Prisma.UserWhereInput>): Tweet {
		throw new Error("Method not implemented.");
	}
}