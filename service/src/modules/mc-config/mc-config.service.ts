import ConfigSaleChannalModel from '../../models/config-sale-channel.model';
import ConfigMenuModel, { ConfigMenuType } from '../../models/configMC.model';

export class MCConfigService {
	static async getConfigSaleChannel(outChnSalesCode: string) {
		const config = ConfigSaleChannalModel;
		try {
			const configSaleChannal = await config.findOne({ outChnSalesCode: outChnSalesCode });
			return { config: configSaleChannal };
		} catch (error) {
			throw error;
		}
	}

	static async getConfigMenu(body: string) {
		const config = ConfigMenuModel;
		try {
			const configMenu = (await config.find(
				{ nameConfig: body },
				{
					_id: 0,
					'data._id': 0
				},
			)) as unknown as ConfigMenuType[];
			return {
				resultCode: '20000',
				developerMessage: 'Success',
				data: configMenu,
			};
		} catch (error) {
			throw error;
		}
	}
}
