import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestWithTokenAndUser, verifyToken } from '../../middleware/authMiddleware.middleware';
import { LocationService } from './location.service';

const router = express.Router();

router.get('/another', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const filterType = req.query.filterType as string;
		const locationCode = req.query.locationCode as string;
		const locationType = req.query.locationType as string;
		if (!filterType && !locationCode && !locationType) {
			return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Missing required parameters' });
		}
		const response = await LocationService.findListLocationByLocationCode(filterType, locationCode, locationType);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error: any) {
		next(error);
	}
});

router.get('/getLocationName', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const locationCode = req.query.locationCode as string;
		const response = await LocationService.getLocationName(locationCode);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error: any) {
		next(error);
	}
});

router.get('/get-company/:company', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const company = req.params.company as string;
		const response = await LocationService.getCompanyName(company);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.get(
	'/check-queue-location',
	verifyToken,
	async (req: RequestWithTokenAndUser, res: Response, next: NextFunction) => {
		try {
			const customer: any = req.user;
			const response = await LocationService.checkQueueLocation(customer.locationCode);
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

router.get('/get-provinces', async (req: RequestWithTokenAndUser, res: Response, next: NextFunction) => {
	try {
		const zipCode = req.query.zipCode as string | undefined;
		const response = await LocationService.getZipCode(zipCode);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.get('/zip-code', async (req: RequestWithTokenAndUser, res: Response, next: NextFunction) => {
	const tumbol = req.query.tumbol as string | undefined;
	const city = req.query.city as string | undefined;
	const response = await LocationService.getZipCodeByTumbol(tumbol, city);
	res.status(StatusCodes.OK).json(response);
});

export default router;
