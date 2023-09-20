import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { attachToken, verifyToken } from '../../middleware/authMiddleware.middleware';
import Validate from '../../middleware/validation.middleware';
import { PaymentValidation } from '../../validations/payment.validation';
// import { getNameMethod, PaymentTestService } from './payment-test.service';
import { PaymentTestService } from './payment-test.service';
import { PaymentService } from './payment.service';

const router = express.Router();

router.post('/', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await PaymentService.createQrCode(req.body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.post('/getPaymentsByTrade', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await PaymentService.getPayments(req.body);
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
	'/getBankPromotion',
	Validate(PaymentValidation.banksPromotion),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await PaymentService.banksPromotion(req.body);
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
	'/getPaymentsByTradeWithCondition',
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await PaymentService.getPaymentsWithCondition(req.body);
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

router.post('/getPaymentAppleCare', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await PaymentService.getAppleCare(req.body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.post('/payment-for-partner', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await PaymentService.getPaymentsForPartner(req.body, req.headers);
		res.status(StatusCodes.OK).json(response);
	} catch (error) {
		next(error);
	}
});

router.post(
	'/query-card-info',
	Validate(PaymentValidation.queryCardInfo),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await PaymentService.getQueryCardInfo(req.body, req.headers);
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
	'/installments-for-partner',
	Validate(PaymentValidation.installmentsForPartner),
	verifyToken,
	attachToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await PaymentService.getInstallmentsForPartner(req.body, req.headers);
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
	'/payment-for-partner-test',
	verifyToken,
	attachToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await PaymentTestService.getPaymentsForPartner(req.body, req.headers);
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

router.get(
	'/loan-address/:name',
	Validate(PaymentValidation.loanAddress),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await PaymentService.loanAddressByName(req.params['name']);
			if (response) {
				res.status(StatusCodes.OK).json({
					name: req.params['name'],
					address: response,
				});
			} else {
				res.status(StatusCodes.OK).json({ message: "Can't find Data" });
			}
		} catch (error) {
			next(error);
		}
	},
);

router.post(
	'/payment-campaign-partner',
	Validate(PaymentValidation.installmentsForPartner),
	verifyToken,
	attachToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await PaymentService.getPaymentPartnerByCampaign(req.body, req.headers);
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
// router.get('/testname', async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		const response = await getNameMethod();
// 		if (response) {
// 			res.status(StatusCodes.OK).json(response);
// 		} else {
// 			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
// 		}
// 	} catch (error) {
// 		next(error);
// 	}
// });

router.post('/get-pin-by-user', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await PaymentService.getPinCodeByUser(req.body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		} 
	} catch (error) {
		next(error);
	}
});

router.get('/asc-info/:ascCode', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await PaymentService.ascInfoByAscCode(req.params.ascCode);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		} 
	} catch (error) {
		next(error);
	}
});

router.get('/location-by-info/:pinCode', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await PaymentService.locationInfoByPinCode(req.params.pinCode);
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
