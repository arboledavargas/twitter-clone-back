export interface IQuery<T> {
	getQuery(): T
}

export abstract class Query<T> implements IQuery<T>{
	constructor() {

	}

	abstract getQuery(): T
}