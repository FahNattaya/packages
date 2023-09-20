import { IProductMaster } from '../src/models/product.model';
import { ProductService } from '../src/modules/product/product.service';
import { handsetMasterResponse } from './product-search-data';

describe('Product Search', () => {
	const handsetJson = JSON.stringify(handsetMasterResponse);
	let mockData: IProductMaster;
	beforeEach(() => {
		mockData = JSON.parse(handsetJson);
	});
	test('group all brand together', async () => {
		const result = ProductService.mapSearchedProduct(mockData as any);
		expect(result).toMatchObject([{ brand: 'APPLE' }, { brand: 'SAMSUNG' }]);
	});
	test('remove subProducts.detail from response', async () => {
		const result = ProductService.mapSearchedProduct(mockData as any);
		result
			.map((r) => r.products)
			.flat()
			.forEach((product) => {
				product.subProducts.forEach((sub: any) => {
					expect(sub.detail).toBeUndefined();
				});
			});
	});
	test('add subProducts.colors to response', async () => {
		const result = ProductService.mapSearchedProduct(mockData as any);
		result
			.map((r) => r.products)
			.flat()
			.forEach((product) => {
				product.subProducts.forEach((sub: any) => {
					expect(sub.colors).toBeDefined();
				});
			});
	});
});
