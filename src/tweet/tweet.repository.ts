import { Injectable } from "@nestjs/common";
import { IRepository } from "../primitives/repository";
import { Tweet } from "../models/tweet.model";
import { Prisma } from "@prisma/client";
import { IQuery } from "src/primitives/query";
import { PrismaService } from "../common/prisma.service";
import { TweetType, Visibility } from "../graphql";

@Injectable()
export class TweetRepository implements IRepository<Tweet, Prisma.TweetWhereInput>{
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

	async queryMany(query: IQuery<Prisma.TweetWhereInput>): Promise<Tweet[]> {
		const result = await this.db.tweet.findMany({
			where: query.getQuery()
		});

		return result.map(_ => Tweet.createExisting({
			authorId: _.authorId,
			body: _.body,
			createdAt: _.createdAt,
			id: _.id,
			likeCount: _.likeCount,
			replyCount: _.replyCount,
			retweetCount: _.retweetCount,
			type: _.type as TweetType,
			visibility: _.visibility as Visibility
		}))
	}

	async queryOne(query: IQuery<Prisma.TweetWhereInput>): Promise<Tweet | null> {
		throw new Error("Method not implemented.");
	}
}