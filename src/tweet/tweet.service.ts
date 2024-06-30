import { Injectable } from "@nestjs/common";
import { CreateTweetInput, CreateTweetPayload, User, Tweet as gqlTweet } from "../graphql";
import { TweetRepository } from "./tweet.repository";
import { Tweet } from "../models/tweet.model";
import { GetUserTweetsQuery } from "./queries/get-user-tweets.query";
import { Connection, Edge } from "../primitives/collection";
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

	async getFeedForUser(uuid:string): Promise<Connection<Tweet>> {
		const result = await this.tweetRepository.queryMany(new GetUserTweetsQuery({
			uuid
		}));

		return new Connection<Tweet>(result.map((tweet) => new Edge(tweet, 'cursor')), {
			endCursor: 'end cursor',
			hasNextPage: true,
			hasPreviousPage: true
		})
	}
}