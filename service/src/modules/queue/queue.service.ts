import axios from 'axios';
import { URLConfig } from '../../config/url.config';
import { counterModel, queueModel } from '../../models/queue.model';

export class QueueService {
	static async sendSmsQMatic(mobileNo: string, locationCode: string): Promise<any> {
		const body: any = `phoneNumber=${mobileNo}&branchCode=${locationCode}&lang=th&service=Device Purchase&channel=MyChannel&authen=bWNhaXM6c2lhY20=`;
		const headers = {
			'Content-type': 'application/x-www-form-urlencoded',
		};
		try {
			const response = await axios.post(URLConfig.ticketIssue, body, { headers });
			return response.data;
		} catch (error: any) {
			throw error;
		}
	}

	static async genQueueZ(locationCode: string): Promise<any> {
		try {
			const response = await counterModel.findOneAndUpdate(
				{ ID: locationCode },
				{ $inc: { SEQUENCE_VALUE: 1 } },
				{ new: true },
			);
			if (response) {
				let queue: string = this.convertQueue(response.SEQUENCE_VALUE);
				let Queue: any = queueModel;
				let newQueue: any = new Queue({ LOCATION_CODE: locationCode, QUEUE: queue });
				newQueue.save();
				return {
					resultCode: '20000',
					resultDescription: 'Success',
					developerMessage: 'Success',
					data: {
						queueZ: queue,
					},
				};
			} else {
				let Counter: any = counterModel;
				let newCounter: any = new Counter({ ID: locationCode, SEQUENCE_VALUE: 1 });
				newCounter.save();
				let Queue: any = queueModel;
				let newQueue: any = new Queue({ LOCATION_CODE: locationCode, QUEUE: 'Z001' });
				newQueue.save();
				return {
					resultCode: '20000',
					resultDescription: 'Success',
					developerMessage: 'Success',
					data: {
						queueZ: 'Z001',
					},
				};
			}
		} catch (error: any) {
			throw error;
		}
	}
	static convertQueue(n: any): string {
		n = n + '';
		return 'Z' + (n.length >= 3 ? n : new Array(3 - n.length + 1).join('0') + n);
	}
}
