import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { attachToken, verifyToken } from '../../middleware/authMiddleware.middleware';
import Validate from '../../middleware/validation.middleware';
import { CustomerValidation } from '../../validations/customer.validation';
import { CustomerService } from './customer.service';

const router = express.Router();

router.get('/subscription/:msisdn', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await CustomerService.subscriptionMobileNo(req.params.msisdn);
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
	'/query-contract-mobile',
	Validate(CustomerValidation.queryContractByMobileNo),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await CustomerService.queryContractByMobileNo(req.body, req.headers);
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
	'/otp/send',
	Validate(CustomerValidation.sendOTP),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await CustomerService.sendOTP(req.body.msisdn);
			res.status(StatusCodes.OK).json(response);
		} catch (error) {
			next(error);
		}
	},
);

router.post(
	'/otp/verify',
	Validate(CustomerValidation.verifyOTP),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await CustomerService.verifyOTP(req.body);
			res.status(StatusCodes.OK).json(response);
		} catch (error) {
			next(error);
		}
	},
);

router.get('/get-existing-mobile-care/:mobileNo', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await CustomerService.queryPersonalInformationMobileCareAndHandset(req.params.mobileNo);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.get('/billing/:mobileNo', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await CustomerService.queryBillingAddress(req.params.mobileNo);
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
	'/listMobileNo/:idCard',
	Validate(CustomerValidation.queryListMobileNo),
	verifyToken,
	attachToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await CustomerService.queryListMobileNo(req, req.headers);
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

router.post('/customer-profile', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await CustomerService.getCustomerProfile(req.body);
		res.status(StatusCodes.OK).json(response);
	} catch (error) {
		next(error);
	}
});

export default router;
