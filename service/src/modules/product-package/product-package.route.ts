import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IContractFirstPackReq, IMinimumPackageRequest } from '../../interfaces/package.interface';
import { IQueryPromotionCurrentPack } from '../../interfaces/queryPromotionCurrentPack.interface';
import { verifyToken } from '../../middleware/authMiddleware.middleware';
import Validate from '../../middleware/validation.middleware';
import { ProductPackageValidation } from '../../validations/product-package.validation';
import { ProductPackageService } from './product-package.service';

const router = express.Router();

router.post('/contract-first-pack', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body: IContractFirstPackReq = req.body;
		const response = await ProductPackageService.contractFirstPack(body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.post('/query-contract-first-pack', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body: IContractFirstPackReq = req.body;
		const response = await ProductPackageService.queryContractFirstPack(body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.post(
	'/query-promotion-current-pack',
	Validate(ProductPackageValidation.mapQueryPromotionCurrentPack),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		const body: IQueryPromotionCurrentPack = req.body;
		try {
			const response = await ProductPackageService.mapQueryPromotionCurrentPack(body);
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

router.post(
	'/queryPromotionCurrentPack',
	Validate(ProductPackageValidation.queryPromotionCurrentPack),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		const body: IQueryPromotionCurrentPack = req.body;
		try {
			const response = await ProductPackageService.queryPromotionCurrentPack(body);
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

router.post(
	'/get-packages-by-condition',
	// Validate(ProductPackageValidation.getPackagesByConditionData),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		const body: IMinimumPackageRequest = req.body;
		try {
			const response = await ProductPackageService.getPackagesByConditionData(body);
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
