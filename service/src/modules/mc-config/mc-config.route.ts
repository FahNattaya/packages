import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../../middleware/authMiddleware.middleware';
import { MCConfigService } from './mc-config.service';

const router = express.Router();

router.post('/getConfigSaleChannel', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await MCConfigService.getConfigSaleChannel(req.body.outChnSalesCode);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.post('/getConfigMC', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await MCConfigService.getConfigMenu(req.body.nameConfig);
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
