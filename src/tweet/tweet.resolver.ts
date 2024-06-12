import { Query, Resolver } from "@nestjs/graphql";

@Resolver('Tweet')
export class TweetResolver {

	constructor() {

	}

	@Query()
	async feed() {
		
	}
}