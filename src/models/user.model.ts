import { Model } from "../primitives/model";

type props = {
  id: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  avatarUrl: string;
  followersCount: number;
  followingCount: number;
  createdAt: Date;
}

export class User extends Model {

  name: string;
  email: string;
  bio: string
  location: string
  avatarUrl: string
  followersCount: number
  followingCount: number
  createdAt: Date

	private constructor(props: props, isNew:boolean){
		super(props.id, isNew);
		this.avatarUrl = props.avatarUrl;
		this.bio = props.bio;
		this.email = props.email,
		this.followersCount = props.followersCount,
		this.followingCount = props.followingCount,
		this.location = props.location,
		this.name = props.name,
		this.createdAt = props.createdAt
	}

	static createNew(props: Omit<props, 'createdAt' | 'followersCount' | 'followingCount'>): User {

		return new User({
			id: props.id,
			avatarUrl: props.avatarUrl,
			bio: props.bio,
			email: props.email,
			followersCount: 0,
			followingCount: 0,
			location: props.location,
			name: props.name,
			createdAt: new Date(),
		}, true);
	}

	static createExisting(props: props): User {
		return new User(props, false);
	}
}