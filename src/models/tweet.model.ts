import { Model } from "../primitives/model";
import { Visibility, TweetType } from "../graphql";
import { randomUUID } from "crypto";

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

	id: string;
	body: string;
	authorId: string;
	createdAt: Date;
	retweetCount: number;
	likeCount: number;
	replyCount: number;
	visibility: Visibility;
	type: TweetType;

	private constructor(props: TweetProps){
		super(props.id);
		this.id = props.id;
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
		});
	}

	static createExisting(props: TweetProps): Tweet {
		return new Tweet(props);
	}
}