import { Schema, model, Document, Model, HydratedDocument } from "mongoose";

interface DispCompType {
	name: string;
	style: string;
	data: {
		dataType: string;
		dataValue: string;
	};
}

export interface IDispositivo extends Document {
	name: string;
	category: string;
	userId: string;
	favDisp: boolean;
	components: { component: DispCompType }[];
}
const dispSchema = new Schema<IDispositivo>({
	name: { type: String, required: true, unique: true },
	category: { type: String, required: true },
	userId: { type: String, required: true },
	favDisp: { type: Boolean, required: true },
	components: [
		{
			component: new Schema<DispCompType>({
				name: { type: String, required: true },
				style: {
					type: String,
					immutable: true,
					enum: ["switch", "slider", "color"],
					required: true,
				},
				data: {
					dataType: {
						type: String,
						immutable: true,
						default: function () {
							switch (this.style) {
								case "switch":
									return "boolean";
								case "slider":
									return "number";
								case "color":
									return "string";
							}
						},
					},
					dataValue: { type: String, required: true },
				},
			}),
		},
	],
});

const Dispositivo = model<IDispositivo>("Dispositivo", dispSchema);

export default Dispositivo;
