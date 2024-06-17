import { Injectable } from "@nestjs/common";
import { CreateTweetInput, CreateTweetPayload, User } from "../graphql";
import { TweetRepository } from "./tweet.repository";
import { Tweet } from "../models/tweet.model";

@Injectable()
export class TeeetService {
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
}