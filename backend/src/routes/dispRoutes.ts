import express, { Express, Request, Response } from "express";
import { IDispositivo } from "../models/Dispositivos";
import { IUser } from "../models/User";
import {
	createDisp,
	editDisp,
	deleteDisp,
	getAllDisp,
} from "../controllers/dispController";
import auth, { CustomRequest } from "../middleware/auth";

const router = express.Router();

router.post(
	"/createDisp",
	auth,
	async (req: CustomRequest, res: Response): Promise<any> => {
		if (!req.user) {
			return res.status(400).json({
				error: "usuario inexistente",
			});
		}
		const newDisp: Partial<IDispositivo> = {
			name: req.body.name,
			category: req.body.category,
			favDisp: req.body.favDisp,
		};
		const createdDisp = await createDisp(newDisp, req.user.name);
		if (createdDisp?.error) {
			return res.status(400).json({
				error: createdDisp.error,
			});
		}

		return res.status(200).json(createdDisp);
	}
);

router.post(
	"/editDisp",
	auth,
	async (req: CustomRequest, res: Response): Promise<any> => {
		if (!req.user) {
			return res.status(400).json({
				error: "usuario inexistente",
			});
		}

		const editedDisp = await editDisp(req.body.disp);
		if (editedDisp?.error) {
			return res.status(400).json({
				error: editedDisp.error,
			});
		}
		console.log(editedDisp);
		return res.status(200).json(editedDisp);
	}
);

router.delete(
	"/deleteDisp",
	auth,
	async (req: CustomRequest, res: Response): Promise<any> => {
		if (!req.user) {
			return res.status(400).json({
				error: "usuario inexistente",
			});
		}
		const disp: Partial<IDispositivo> = {
			_id: req.body.id,
			userId: req.user.name,
		};
		const delDisp = await deleteDisp(disp);
		if (delDisp?.error) {
			return res.status(400).json({
				error: delDisp.error,
			});
		}

		return res.status(200).send(delDisp);
	}
);

router.get("/allDisp", auth, async (req: CustomRequest, res): Promise<any> => {
	if (!req.user) {
		return res.status(400).json({
			error: "usuario inexistente",
		});
	}
	const allDisps: Partial<IDispositivo> = {
		userId: req.user.name,
	};
	const dispList = await getAllDisp(allDisps);
	return res.status(200).json({
		disps: dispList,
	});
});

export default router;
