import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UUID } from "../common/uuid.decorator";
import { CreateTweetInput, CreateTweetPayload } from "../graphql";
import { TeeetService } from "./tweet.service";
@Resolver('Tweet')
export class TweetResolver {

	constructor(private tweetService: TeeetService) { }

	@Query()
	async feed() {
		
	}

	@Mutation()
	async createTweet(@UUID() UUID: string, @Args('tweet') tweet:CreateTweetInput ): Promise<CreateTweetPayload> {
		return await this.tweetService.createTweet(tweet, UUID);
	}
}