import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UUID } from "../common/uuid.decorator";
import { CreateTweetInput, CreateTweetPayload, Tweet } from "../graphql";
import { TweetService } from "./tweet.service";
@Resolver('Tweet')
export class TweetResolver {

	constructor(private tweetService: TweetService) { }

	@Query()
	async feed(@UUID() UUID: string): Promise<Tweet[]> {
		return this.tweetService.getFeedForUser(UUID)
	}

	@Mutation()
	async createTweet(@UUID() UUID: string, @Args('tweet') tweet:CreateTweetInput ): Promise<CreateTweetPayload> {
		return await this.tweetService.createTweet(tweet, UUID);
	}
}