import { Query } from "../../primitives/query";
import { Prisma } from "@prisma/client";

type props = {
	id: string
}

export class findUserById extends Query<Prisma.UserWhereInput> {

	private readonly id: string

	constructor(props: props){
		super()
		this.id = props.id
	}

	getQuery(): Prisma.UserWhereInput {
		return {
			id: this.id
		}
	}
}