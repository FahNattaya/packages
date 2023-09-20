import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ICarePlusBody } from '../../interfaces/cpc.interface';
import { RequestWithTokenAndUser, verifyToken } from '../../middleware/authMiddleware.middleware';
import Validate from '../../middleware/validation.middleware';
import { ServiceCareValidation } from '../../validations/service-care.validation';
import { getCarePromotionsByShelfTest } from './service-care-test.service';
import { ServiceCareService } from './service-care.service';

const router = express.Router();
router.post(
	'/care-promotions',
	// Validate(ServiceCareValidation.getCarePromotionsByShelf),
	verifyToken,
	async (req: RequestWithTokenAndUser, res: Response, next: NextFunction) => {
		const customer: any = req.user;
		const body: ICarePlusBody = req.body;
		try {
			const response = await ServiceCareService.getCarePromotionsByShelf(body, customer.locationCode);
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
	'/care-promotions-test',
	Validate(ServiceCareValidation.getCarePromotionsByShelfTest),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		const body: ICarePlusBody = req.body;
		try {
			const response = await getCarePromotionsByShelfTest(body);
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

router.get('/maximum-care-service', verifyToken, async (req, res, next: NextFunction) => {
	try {
		const response = await ServiceCareService.getMaxLimitMobileCare();
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.post('/sky-auth', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await ServiceCareService.skyAuthentication();
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.post('/provision-mobilecare', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await ServiceCareService.provisionMobileCare(req.body['transactionId']);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

export default router;
