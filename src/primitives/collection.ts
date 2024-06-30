import { Model } from "./model";

export class Edge<T extends Model> {
	constructor(public node: T, public cursor: string){

	}

	serialize() {
		return {
			node: this.node.serialize(),
			cursor: this.cursor
		}
	}
}

export class PageInfo {
	endCursor: string | null;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export class Connection<T extends Model> {
	constructor(public edges:Edge<T>[] = [], public pageInfo: PageInfo){

	}

	serialize() {
		return {
			edges: this.edges.map(edge => edge.serialize()),
			pageInfo: this.pageInfo
		}
	}
}