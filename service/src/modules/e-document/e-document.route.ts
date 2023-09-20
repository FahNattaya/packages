import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { IGetCondition } from '../../interfaces/cpc.interface';
import { attachToken, verifyToken } from '../../middleware/authMiddleware.middleware';
import Validate from '../../middleware/validation.middleware';
import { EDocumentValidation } from './../../validations/e-document.validation';
import { DataConditionService } from './condition.service';
import { EDocumentService } from './e-document.service';
const router = express.Router();

router.post(
	'/e-contract',
	Validate(EDocumentValidation.createEContract),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
		}
		try {
			const response = await EDocumentService.createEContract(req.body);
			res.status(StatusCodes.OK).json(response);
		} catch (error) {
			next(error);
		}
	},
);

router.post(
	'/condition-code',
	Validate(EDocumentValidation.getDataCondition),
	verifyToken,
	attachToken,
	async (req: Request, res: Response, next: NextFunction) => {
		const body: IGetCondition = req.body;
		try {
			const response = await DataConditionService.getDataCondition(body, req.headers);
			if (response) {
				res.status(StatusCodes.OK).json(response);
			} else {
				res.status(StatusCodes.OK).json({ message: "Can't find Data" });
			}
		} catch (error) {
			next(error);
		}
	},
);

export default router;
