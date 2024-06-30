import { randomUUID } from "crypto";
import { TweetType, User, Visibility, Tweet as gqlTweet } from "../graphql";
import { Model } from "../primitives/model";

type TweetProps = {
	id: string | undefined,
	body: string,
	authorId: string,
	createdAt: Date,
	retweetCount: number,
	likeCount: number,
	replyCount: number,
	visibility: Visibility,
	type: TweetType,
}

export class Tweet extends Model {

	body: string;
	authorId: string;
	createdAt: Date;
	retweetCount: number;
	likeCount: number;
	replyCount: number;
	visibility: Visibility;
	type: TweetType;

	private constructor(props: TweetProps, isNew: boolean){
		super(props.id, isNew);
		this.body = props.body;
		this.authorId = props.authorId;
		this.createdAt = props.createdAt;
		this.retweetCount = props.retweetCount;
		this.likeCount = props.likeCount;
		this.replyCount = props.replyCount;
		this.visibility = props.visibility;
		this.type = props.type;
	}

	static createNew(props: Omit<TweetProps, 'id' | 'createdAt' | 'likeCount' | 'replyCount' | 'retweetCount' | 'type'>): Tweet {
		const id = randomUUID();
		return new Tweet({
			id: id,
			createdAt: new Date(),
			likeCount: 0,
			replyCount: 0,
			retweetCount: 0,
			type: TweetType.ORIGINAL,
			...props
		}, true);
	}

	static createExisting(props: TweetProps): Tweet {
		return new Tweet(props, false);
	}

	serialize(): gqlTweet {
			return {
				author: { id: this.authorId } as User,
				body: this.body,
				createdAt: this.createdAt.toISOString(),
				id: this.id,
				likeCount: this.likeCount,
				replyCount: this.replyCount,
				retweetCount: this.retweetCount,
				type: this.type,
				visibility: this.visibility
			}
	}
}