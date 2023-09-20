import ConfigSaleChannelModel from '../src/models/config-sale-channel.model';
import ConfigMenuModel from '../src/models/configMC.model';
import { MCConfigService } from '../src/modules/mc-config/mc-config.service';

const mockValue = {
	outChnSalesCode: 'AISSHOP',
	Flow: 'AIS',
	subStockCodeDT: 'BRN',
	ScanIMEI: 'N',
	MOC: 'N',
};
const expectData = {
	config: {
		outChnSalesCode: 'AISSHOP',
		Flow: 'AIS',
		subStockCodeDT: 'BRN',
		ScanIMEI: 'N',
		MOC: 'N',
	},
};

describe('getConfigSaleChannel', () => {
	beforeEach(() => {
		console.log = jest.fn();
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('should return config sale channal', async () => {
		console.log = jest.fn();
		ConfigSaleChannelModel.findOne = jest.fn().mockResolvedValue(mockValue);
		const result = await MCConfigService.getConfigSaleChannel('AISSHOP');
		expect(result).toEqual(expectData);
		expect(ConfigSaleChannelModel.findOne).toHaveBeenCalledWith({ outChnSalesCode: 'AISSHOP' });
	});

	it('rethrows error when an error occurs', async () => {
		const mockError = new Error('Test error message');
		ConfigSaleChannelModel.findOne = jest.fn().mockRejectedValue(mockError);

		expect(MCConfigService.getConfigSaleChannel('AISONLINE')).rejects.toThrow(mockError);
		expect(ConfigSaleChannelModel.findOne).toHaveBeenCalledWith({ outChnSalesCode: 'AISONLINE' });
	});

	it('should get config menu', async () => {
		ConfigMenuModel.find = jest.fn().mockResolvedValueOnce({ data: 'data' });
		const configData = await MCConfigService.getConfigMenu('menu');
		expect(configData.data).toEqual({ data: 'data' });
	});

	it('should handle error when get config menu throw', async () => {
		ConfigMenuModel.find = jest.fn().mockRejectedValueOnce(new Error('error'));
		expect(MCConfigService.getConfigMenu('menu')).rejects.toThrow();
	});
});
