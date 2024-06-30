import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UUID } from "../common/uuid.decorator";
import { CreateTweetInput, CreateTweetPayload, FeedConnection, Tweet } from "../graphql";
import { TweetService } from "./tweet.service";
import type DataLoader from "dataloader";
import { User } from "../models/user.model";

@Resolver('Tweet')
export class TweetResolver {

	constructor(private tweetService: TweetService) { }

	@Query()
	async feed(@UUID() UUID: string): Promise<FeedConnection> {
		const result = await this.tweetService.getFeedForUser(UUID)

		return result.serialize()
	}

	@Mutation()
	async createTweet(@UUID() UUID: string, @Args('tweet') tweet:CreateTweetInput ): Promise<CreateTweetPayload> {
		return await this.tweetService.createTweet(tweet, UUID);
	}

	@ResolveField()
	async author(@Parent() tweet: Tweet, @Context() context: { usersLoader: DataLoader<string, User> }){
		const user = await context.usersLoader.load(tweet.author.id);

		return user.serialize()
	}
}