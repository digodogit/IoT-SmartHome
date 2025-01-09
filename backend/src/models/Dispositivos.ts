import { Schema, model, Document, Model, HydratedDocument } from "mongoose";

type DispCompType = {
	name: string;
	style: string;
	data: unknown;
};

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
	components: [{ component: { any: {} } }],
});

const Dispositivo = model<IDispositivo>("Dispositivo", dispSchema);

export default Dispositivo;
