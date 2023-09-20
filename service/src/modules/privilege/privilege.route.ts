import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../../middleware/authMiddleware.middleware';
import { PrivilegeService } from './privilege.service';

const router = express.Router();

router.post('/get-token-privilege', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await PrivilegeService.getTokenPrivilege(req.body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.post('/check-privilege-status', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await PrivilegeService.checkPrivilege(req.body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.post('/request-privilege-barcode', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await PrivilegeService.requestPrivilegeBarCode(req.body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.post('/check-device-transaction', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await PrivilegeService.checkDeviceTrans(req.body);
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
