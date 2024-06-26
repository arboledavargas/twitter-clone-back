import { Injectable } from "@nestjs/common";
import { CreateTweetInput, CreateTweetPayload, User, Tweet as gqlTweet } from "../graphql";
import { TweetRepository } from "./tweet.repository";
import { Tweet } from "../models/tweet.model";
import { GetUserTweetsQuery } from "./queries/get-user-tweets.query";
@Injectable()
export class TweetService {
	constructor(private tweetRepository: TweetRepository){  }

	async createTweet(createTweetInput:CreateTweetInput, userId: string): Promise<CreateTweetPayload> {
		const newTweet = Tweet.createNew({
			authorId: userId,
			body: createTweetInput.body,
			visibility: createTweetInput.visibility
		});

		await this.tweetRepository.save(newTweet);

		return {
			successfull: true,
			tweet: {
				author: {} as User,
				body: newTweet.body,
				visibility: newTweet.visibility,
				createdAt: newTweet.createdAt.toISOString(),
				id: newTweet.id,
				likeCount: newTweet.likeCount,
				replyCount: newTweet.replyCount,
				retweetCount: newTweet.retweetCount,
				type: newTweet.type
			}
		}
	}

	async getFeedForUser(uuid:string): Promise<gqlTweet[]> {
		const result = await this.tweetRepository.queryMany(new GetUserTweetsQuery({
			uuid
		}));

		return result.map( _ => ({
			author: {} as User,
			body: _.body,
			createdAt: _.createdAt.toISOString(), 
			id: _.id,
			likeCount: _.likeCount,
			replyCount: _.replyCount,
			retweetCount: _.retweetCount,
			type: _.type,
			visibility: _.visibility,
		}))
	}
}