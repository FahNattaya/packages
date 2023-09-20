import axios from 'axios';
import { URLConfig } from '../../config/url.config';
import { IGetCondition } from '../../interfaces/cpc.interface';
export class DataConditionService {
	static async getDataCondition(body: IGetCondition, headers: any): Promise<any> {
		try {
			const response = await axios.post(URLConfig.getCondition, body, headers);
			if (response.data) {
				return response.data;
			}
			return response.data;
		} catch (error) {
			return error;
		}
	}
}
