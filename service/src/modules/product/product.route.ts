import axios from 'axios';
import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { attachToken, verifyToken } from '../../middleware/authMiddleware.middleware';
import Validate from '../../middleware/validation.middleware';
import { ProductMasterModel } from '../../models/product.model';
import { ProductValidation } from '../../validations/product.validation';
import { ProductService } from './product.service';
const router = express.Router();

router.post('/product-by-brand', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await ProductService.findAllProductsByBrand(req.body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.post('/product-by-brands', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await ProductService.findAllProductsByBrands(req.body);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.get('/products/search', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await ProductService.searchProductsByKeyword(String(req.query.keyword));
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.get('/all-brands/:locationCode', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await ProductService.findAllBrands(req.params.locationCode);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		} else {
			res.status(StatusCodes.OK).json({ message: "Can't find Data" });
		}
	} catch (error) {
		next(error);
	}
});

router.post('/product-detail', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	// Validate(ProductValidation.getProductDetail)
	try {
		const response = await ProductService.getProductDetail(req.body);
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
	'/query-stock-omni',
	Validate(ProductValidation.queryStock),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await ProductService.queryStock(req.body, req.headers);
			if (response) {
				res.status(StatusCodes.OK).json({ response });
			} else {
				res.status(StatusCodes.OK).json({ message: "Can't find Data" });
			}
		} catch (error) {
			next(error);
		}
	},
);

router.post(
	'/imei-dt',
	Validate(ProductValidation.checkImeiDt),
	verifyToken,
	attachToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await ProductService.imeiDt(req.body, req.headers);
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
	'/product-by-matcode',
	Validate(ProductValidation.getProductsByMatrialCode),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await ProductService.productsByMaterialCode(req.body);
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

router.post('/brand-model-by-imei', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const imei = req.body.imei;

		const response = await ProductService.brandModelByIMEI(imei);
		if (response) {
			res.status(StatusCodes.OK).json(response);
		}
	} catch (error) {
		next(error);
	}
});

router.post(
	'/check-imei',
	Validate(ProductValidation.checkImeiDt),
	verifyToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const isCartPage = req.headers.referer?.includes('cart')!;
			const response = await ProductService.checkImei(req.body, req.headers, isCartPage);
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

router.post('/batch', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await mapProductMaster();
		updateHandsetMaster(result);
		res.status(StatusCodes.OK).json({
			message: 'updated successfully',
			updatedData: result,
		});
	} catch (error) {
		next(error);
	}
});
export async function updateHandsetMaster(updatedData: any): Promise<void> {
	try {
		updatedData.forEach(async (record: any) => {
			record.products.forEach(async (product: any) => {
		await ProductMasterModel.create(product);
			});
		});
	} catch (error) {
		throw error;
	}
}
export async function mapProductMaster(): Promise<any> {
	try {
		const locationCode = '1100';
		const OFFSET = 1;
		const MAX_ROW = 100;
		let brands: any[] = ['APPLE', 'OPPO'];
		const header = {
			'x-authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNISVJBUEhSIiwidGltZXN0YW1wIjoiMjAyMzA3MjUxNzI0IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoiY2hpcmFwaHJAYWlzLmNvLnRoIiwiZmlyc3RuYW1lIjoiY2hpcmFwaGFuIiwibGFzdG5hbWUiOiJyYXdhbmd3b25nIiwic2hhcmVkVXNlciI6IiIsInVzZXJUeXBlIjoiQUlTIiwicm9sZSI6IkFJUyIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IjA4OTUwMDQ1MzciLCJzdWIiOiJFTVBMT1lFRUxEQVAiLCJwaW5Db2RlIjoiMDAwMjM0NDAiLCJhdXRoZW50aWNhdGlvbiI6Im5ld0xvZ2luIiwibG9jYXRpb25PbmxpbmUiOiIiLCJmbGFnVXNlclR5cGUiOiJJTkRJVklEVUFMIiwicm9sZUFjaW0iOiJBSVNTSE9QIiwib3V0UG9zaXRpb24iOiJPZmZpY2VyIiwib3V0Q2huU2FsZXMiOiJBSVMgU2hvcCIsIm91dENoblNhbGVzQ29kZSI6IkFJU1NIT1AiLCJvdSI6IkVNUExPWUVFIiwiaWF0IjoxNjkwMjgwNjgzLCJleHAiOjk5OTk5OTk5OTl9.urWOyZmp4GjeOUN_aM_FiPiWf1vqs5FRzdtXTB6msvs`,
		};
		const allBrands = await axios.get(
			`https://dev-mychannel.cdc.ais.th/api/device-sales/v1/product/all-brands/${locationCode}`,
			{
				headers: header,
			},
		);
		const brandsData = allBrands.data.brands;
		brands = brandsData.map((brand: any) => {
			return brand.name;
		});

		const allProductGroups =
			(await axios.post(
				`https://dev-mychannel.cdc.ais.th/api/device-sales/v1/product/product-by-brands`,
				{
					brands: brands,
					offset: OFFSET,
					maxRow: MAX_ROW,
					location: locationCode,
					productType: ['DEVICE'],
					productSubtype: ['HANDSET', 'HANDSET BUNDLE'],
				},
				{
					headers: header,
				},
			)) || [];

		const productGroups = allProductGroups.data.data || [];
		const result = await Promise.all(
			productGroups.map(async (group: any) => {
				const products = group.products;
				const mappedProducts = await Promise.all(
					products.map(async (product: any) => {
						const subProducts = product.subProducts;
						const mappedSubProducts = await Promise.all(
							subProducts.map(async (subProduct: any) => {
								const reqSubproduct = {
									brand: product.brand,
									model: subProduct.model || '',
									location: locationCode,
									productType: 'DEVICE',
									productSubtype: 'HANDSET',
								};

								const productDetail = await axios.post(
									`https://dev-mychannel.cdc.ais.th/api/device-sales/v1/product/product-detail`,
									reqSubproduct,
									{
										headers: header,
									},
								);

								subProduct.detail = {
									name: productDetail.data.name,
									products: productDetail.data.products,
								};
								subProduct.sanitizedName = (productDetail.data.name || '').toLowerCase().replaceAll(' ','').trim()
								return subProduct;
							}),
						);
						product.subProducts = mappedSubProducts;
						return product;
					}),
				);
				group.products = mappedProducts;
				return group;
			}),
		);

		return result;
	} catch (error) {
		throw error;
	}
}

export default router;
