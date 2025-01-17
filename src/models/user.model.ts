import { Model } from "../primitives/model";
import { User as gqlUser } from "../graphql";

type props = {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  location: string | null;
  avatarUrl: string;
  followersCount: number;
  followingCount: number;
  createdAt: Date;
	handle: string | null;
	birthDate: Date;
}

export class User extends Model {

  name: string;
  email: string;
  bio: string | null;
  location: string | null;
  avatarUrl: string;
  followersCount: number;
  followingCount: number;
  createdAt: Date;
	handle: string;
	birthDate: Date | null;

	private constructor(props: props, isNew:boolean){
		super(props.id, isNew);
		this.avatarUrl = props.avatarUrl;
		this.bio = props.bio;
		this.email = props.email;
		this.followersCount = props.followersCount;
		this.followingCount = props.followingCount;
		this.location = props.location;
		this.name = props.name;
		this.createdAt = props.createdAt;
		this.handle = props.handle;
		this.birthDate = props.birthDate;
	}

	updateHandle(handle: string) {
		this.handle = handle;
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
			handle: props.handle,
			birthDate: props.birthDate
		}, true);
	}

	static createExisting(props: props): User {
		return new User(props, false);
	}

	serialize(): gqlUser {
		return {
			avatarUrl: this.avatarUrl,
			bio: this.bio,
			email: this.email,
			followersCount: this.followersCount,
			followingCount: this.followingCount,
			location: this.location,
			name: this.name,
			createdAt: this.createdAt.toISOString(),
			id: this.id,
			handle: this.handle,
			birthDate: this.birthDate.toISOString()
		}
	}
}