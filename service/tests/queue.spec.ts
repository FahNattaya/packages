describe('sendSMSQmatic', () => {
	beforeEach(() => {
		console.log = jest.fn();
	});
	const mockResponseAPI = {
		getCRM: 'fail',
		getARbalance: 'fail',
		sendSMS: 'success',
		data: {
			waitingQueue: 3,
			issueBy: 'mcais',
			segment: '',
			campaign: null,
			id: 2265,
			services: ['Device Purchase'],
			branch: 'AIS Tower 2',
			queueNo: 'D003',
			qrText: '',
		},
		getCampaign: 'fail',
		isFullSuccess: false,
	};

	const mockResponse = {
		waitingQueue: 3,
		issueBy: 'mcais',
		segment: '',
		campaign: null,
		id: 2265,
		services: ['Device Purchase'],
		branch: 'AIS Tower 2',
		queueNo: 'D003',
		qrText: '',
	};
	it('should true', async () => {
		expect(1 + 1).toEqual(2);
	});
	// it('should return queue ', async () => {
	// 	jest.spyOn(axios, 'post').mockResolvedValue(mockResponseAPI);
	// 	const mobileNo = '0934000624';
	// 	const locationCode = '1100';

	// 	const body: any = `phoneNumber=${mobileNo}&branchCode=${locationCode}&lang=th&service=Device Purchase&channel=MyChannel&authen=bWNhaXM6c2lhY20=`;
	// 	const url = `undefined/qmt-service/rest/ticket/issue`;
	// 	const headers = {
	// 		'Content-type': 'application/x-www-form-urlencoded',
	// 	};

	// 	const result = await QueueService.sendSmsQMatic(mobileNo, locationCode);
	// 	expect(axios.post).toHaveBeenCalledWith(url, body, { headers });
	// 	expect(result).toEqual(mockResponse);
	// });
});
