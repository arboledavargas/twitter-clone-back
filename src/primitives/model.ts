export interface IModel {
	id: string | undefined
	isNew: boolean
	serialize: <T>() => T
}

export abstract class Model implements IModel {

	id: string;
	isNew: boolean;

	constructor(id: string | undefined, isNew: boolean){
		this.id = id;
		this.isNew = isNew
	}

	abstract serialize();
}