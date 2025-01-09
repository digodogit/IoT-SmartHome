import User, { IUser } from "../models/User";
import Dispositivo, { IDispositivo } from "../models/Dispositivos";

const createDisp = async (disp: Partial<IDispositivo>, userId: string) => {
	const { name, category, favDisp } = disp;

	const existingDisp = await Dispositivo.findOne({ name, userId });
	if (existingDisp) {
		return {
			error: "Nome de dispositivo já existente. Escolha outro.",
		};
	}
	const newDisp = new Dispositivo({ name, category, userId, favDisp });
	await newDisp.save();
	return {
		disp: newDisp,
	};
};
//necessario arrumar o update para quando tiver dados provavelmente
const editDisp = async (disp: Partial<IDispositivo>) => {
	const { name, userId } = disp;

	const existingDisp = await Dispositivo.findOneAndUpdate(
		{ name, userId },
		disp
	);
	if (!existingDisp) {
		return {
			error: "Dispositivo não encontrado.",
		};
	}
	await existingDisp.save();
	return {
		disp: existingDisp,
	};
};

//necessario arrumar o delete para quando tiver dados de fato
const deleteDisp = async (disp: Partial<IDispositivo>) => {
	const { name, userId } = disp;

	const existingDisp = await Dispositivo.findOneAndDelete({ name, userId });
	if (!existingDisp) {
		return {
			error: "Dispositivo não encontrado.",
		};
	}
	return {
		message: `${existingDisp} deletado com sucesso.`,
	};
};

const getAllDisp = async (disp: Partial<IDispositivo>) => {
	const { userId } = disp;

	const existingDisps = await Dispositivo.find({ userId });
	if (!existingDisps) {
		return {
			error: "Dispositivo não encontrado.",
		};
	}
	return existingDisps;
};

export { createDisp, editDisp, deleteDisp, getAllDisp };