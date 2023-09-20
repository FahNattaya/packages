import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { attachToken, verifyToken } from '../../middleware/authMiddleware.middleware';
import { AuthService } from './auth.service';

const router = express.Router();

router.get('/refresh-token', verifyToken, attachToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await AuthService.refreshToken(req.headers);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't Refresh Token" });
		}
	} catch (error) {
		next(error);
	}
});

export default router;
