import { Query } from "../../primitives/query";
import { Prisma } from "@prisma/client";

type props = {
	 ids: string[]
}

export class findUserByIdIn extends Query<Prisma.UserWhereInput> {

	private ids: string[]

	constructor(props: props){
		super()
		this.ids = props.ids
	}

	getQuery(): Prisma.UserWhereInput {
		return {
			id: {
				in: this.ids
			}
		}
	}
}