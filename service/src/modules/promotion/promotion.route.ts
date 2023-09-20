import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
	ICampaignPaymentReq,
	IGetAllPromotionsByShelf,
	IGetPromotionShelves,
	IGetTradePromotion,
} from '../../interfaces/cpc.interface';
import { verifyToken } from '../../middleware/authMiddleware.middleware';
import Validate from '../../middleware/validation.middleware';
import { PromotionValidation } from '../../validations/promotion.validation';
import { PromotionService } from './promotion.service';

const router = express.Router();

router.post(
	'/campaign-promotion',
	Validate(PromotionValidation.getCampaignPromotion),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await PromotionService.getCampaignPromotion(req.body);
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
	'/trade-promotion',
	Validate(PromotionValidation.getTradePromotion),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body: IGetTradePromotion = req.body;
			const response = await PromotionService.getTradePromotion(body);
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
	'/product-crossSelling',
	Validate(PromotionValidation.productCrossSelling),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await PromotionService.productCrossSelling(req.body);
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

router.post('/promotion-shelves', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body: IGetPromotionShelves = req.body;
		const response = await PromotionService.getPromotionShelves(body);
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
	'/all-promotions-by-shelf',
	// Validate(PromotionValidation.getAllPromotionsByShelf),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body: IGetAllPromotionsByShelf = req.body;
			const response = await PromotionService.getAllPromotionsByShelf(body);
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

router.post('/payments-by-campaign', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body: any = req.body;
		const response = await PromotionService.getPaymentsByCampaign(body);
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
	'/campaign-and-payments',
	Validate(PromotionValidation.getCampaignPromotion),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body: ICampaignPaymentReq = req.body;
			const response = await PromotionService.getCampaignAndPayments(body, req.header);
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
