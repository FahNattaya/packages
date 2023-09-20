import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { attachToken, verifyToken } from '../../middleware/authMiddleware.middleware';
import validate from '../../middleware/validation.middleware';
import { CartValidation } from '../../validations/cart.validation';
import { CartService } from './cart.service';

const router = express.Router();

router.get(
	'/list/:mobileNo',
	validate(CartValidation.cartListByMobileNo),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		const mobileNo = req.params.mobileNo;
		const locationCode = req.query.locationCode;
		try {
			const response = await CartService.cartListByMobileNo(mobileNo, locationCode as string);
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
	'/add-cart-list',
	validate(CartValidation.addToCartList),
	verifyToken,
	attachToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await CartService.addToCartList(req.body, req.headers);
			if (response) {
				res.status(StatusCodes.OK).json({
					resultCode: '2000',
					resultDescription: 'Success',
					developerMessage: 'Success',
					data: response,
				});
			} else {
				res.status(StatusCodes.OK).json({ message: "Can't find Data" });
			}
		} catch (error) {
			next(error);
		}
	},
);

router.post('/create-transaction', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		console.log('req.body', req.body);

		const response = await CartService.createSharedTransaction(req.body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't create transaction" });
		}
	} catch (error) {
		next(error);
	}
});

router.post('/create-order-list', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await CartService.createOrderListService(req.body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't create order list" });
		}
	} catch (error) {
		next(error);
	}
});

router.post('/update/:transactionId', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const transactionId = req.params.transactionId;
		const response = await CartService.updateShareTransactions(transactionId, req.body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't update transaction" });
		}
	} catch (error) {
		next(error);
	}
});

router.post(
	'/delete/transactions',
	validate(CartValidation.validateDeleteTransaction),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const transactionId = req.body.transactionId;
			const response = await CartService.removeShareTransactions(transactionId, req.body);
			if (response) {
				res.status(StatusCodes.OK).json(response);
			} else {
				res.status(StatusCodes.OK).json({ message: "Can't update transaction" });
			}
		} catch (error) {
			next(error);
		}
	},
);

router.post('/updatePayments/:transactionId', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const transactionId = req.params.transactionId;
		const response = await CartService.updatePaymentShareTransactions(transactionId, req.body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't update transaction" });
		}
	} catch (error) {
		next(error);
	}
});

router.post(
	'/create-compensation',
	validate(CartValidation.createCompensation),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await CartService.createCompensation(req.body['transactionId']);
			res.status(StatusCodes.OK).json(response);
		} catch (error) {
			next(error);
		}
	},
);

export default router;
