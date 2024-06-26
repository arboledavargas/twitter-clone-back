import { Query } from "../../primitives/query";
import { Prisma } from "@prisma/client";

type props = {
	uuid: string;
}

export class GetUserTweetsQuery extends Query<Prisma.TweetWhereInput> {

	uuid: string

	constructor(props:props){
		super()
		this.uuid = props.uuid		
	}

	getQuery(): Prisma.TweetWhereInput {
		return {
			author: {
				id: this.uuid
			}
		}
	}

}