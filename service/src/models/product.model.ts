import * as mongoose from 'mongoose';
import { ProductDetail, Products } from '../interfaces/product.interface';

interface IPriceMinMax {
	min: string;
	max: string;
}

interface ISubProductDetail {
	name: string;
	products: {
		colorName: string;
		colorCode: string;
		sku: string[];
		images: {
			thumbnail: string;
			baseView: {
				imageUrl: string;
			}[];
		};
	}[];
}

interface ISubProduct {
	productId: number;
	name: string;
	model: string;
	imageUrl: string;
	normalPrice: IPriceMinMax;
	promotionPrice: IPriceMinMax;
	detail: ISubProductDetail;
	sanitizedName?: string;
}

interface IProductMaster {
	productId: number;
	brand: string;
	name: string;
	model: string;
	imageUrl: string;
	itemType: string;
	flag5G: string;
	dv: string[];
	productType: string;
	productSubtype: string;
	normalPrice: IPriceMinMax;
	promotionPrice: IPriceMinMax;
	subProducts: ISubProduct[];
}

const PriceMinMaxSchema = new mongoose.Schema({ min: String, max: String }, { _id: false });
const SubProductDetail = new mongoose.Schema(
	{
		name: String,
		products: [
			{
				colorName: String,
				colorCode: String,
				sku: [String],
				images: {
					thumbnail: String,
					baseview: [
						{
							imageUrl: String,
						},
					],
				},
			},
		],
	},
	{ _id: false },
);

const SubProduct = new mongoose.Schema<ISubProduct>(
	{
		productId: Number,
		name: String,
		model: String,
		imageUrl: String,
		normalPrice: PriceMinMaxSchema,
		promotionPrice: PriceMinMaxSchema,
		detail: SubProductDetail,
		sanitizedName: String,
	},
	{ _id: false },
);

const ProductMasterSchema = new mongoose.Schema<IProductMaster>({
	brand: String,
	name: String,
	model: String,
	imageUrl: String,
	itemType: String,
	flag5G: String,
	dv: Array,
	productType: String,
	productSubtype: String,
	normalPrice: PriceMinMaxSchema,
	promotionPrice: PriceMinMaxSchema,
	subProducts: [SubProduct],
});

const ProductsSchema = new mongoose.Schema(
	{
		brand: String,
		name: String,
		model: String,
		imageUrl: String,
		itemType: String,
		flag5G: String,
		dv: Array,
		productType: String,
		productSubtype: String,
		normalPrice: {
			min: String,
			max: String,
		},
		promotionPrice: {
			min: String,
			max: String,
		},
		subProducts: Array,
	},
	{ versionKey: false },
);

const ProductDetailSchema = new mongoose.Schema(
	{
		name: String,
		brand: String,
		model: String,
		productType: String,
		productSubtype: String,
		dv: Array,
		price: String,
		products: Array,
	},
	{ versionKey: false },
);

const ProductsModel = mongoose.model<Products & mongoose.Document>('Products', ProductsSchema);
const ProductDetailModel = mongoose.model<ProductDetail & mongoose.Document>('ProductDetail', ProductDetailSchema);
const ProductMasterModel = mongoose.model('Handset', ProductMasterSchema, 'handsetMaster');

export { ProductDetailModel, ProductsModel, ProductMasterModel, IProductMaster };
