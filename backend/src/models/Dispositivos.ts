import { Schema, model, Document, Model, HydratedDocument } from "mongoose";

type DataTypes =
	| { type: "boolean"; value: boolean }
	| { type: "number"; value: number }
	| { type: "string"; value: string };

export interface IComponent {
	name: string;
	style: string;
	data: DataTypes;
}

export interface IDispositivo extends Document {
	name: string;
	category: string;
	userId: string;
	favDisp: boolean;
	components: { component: IComponent }[];
}

const componentSchema = new Schema<IComponent>({
	name: { type: String, required: true },
	style: { type: String, required: true },
	data: {
		type: {
			type: String,
			enum: ["boolean", "number", "string"],
		},
		value: Schema.Types.Mixed,
	},
});

const dispSchema = new Schema<IDispositivo>({
	name: { type: String, required: true, unique: true },
	category: { type: String, required: true },
	userId: { type: String, required: true },
	favDisp: { type: Boolean, required: true },
	components: [{ component: componentSchema }],
});

const Dispositivo = model<IDispositivo>("Dispositivo", dispSchema);

export default Dispositivo;
