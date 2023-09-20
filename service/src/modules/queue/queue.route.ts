import express, { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestWithTokenAndUser, verifyToken } from '../../middleware/authMiddleware.middleware';
import { QueueService } from './queue.service';

const router = express.Router();

router.post(
	'/send-sms-qmatic',
	verifyToken,
	async (req: RequestWithTokenAndUser, res: Response, next: NextFunction) => {
		try {
			const customer: any = req.user;
			const response = await QueueService.sendSmsQMatic(req.body.mobileNo, customer.locationCode);
			if (response) {
				res.status(StatusCodes.OK).json(response);
			} else {
				res.status(StatusCodes.OK).json({ message: "Can't gen queue QMatic" });
			}
		} catch (error: any) {
			next(error);
		}
	},
);

router.post('/gen-queue-z', verifyToken, async (req: RequestWithTokenAndUser, res: Response, next: NextFunction) => {
	try {
		const response = await QueueService.genQueueZ(req.body.locationCode);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't gen queue Z" });
		}
	} catch (error: any) {
		next(error);
	}
});

export default router;
