import { IProducts } from '../interfaces/stock.interface';

export const responseMockProduct = {
	resultCode: '20000',
	resultDescription: 'Success',
	developerMessage: 'Success',
	data: [
		{
			name: 'APPLE',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/APPLE_Apple-Logo-black250.png',
			priority: '0',
		},
		{
			name: 'SAMSUNG',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/SAMSUNG_samsung-logo-250.png',
			priority: '0',
		},
		{
			name: 'ASUS',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/ASUS_asuz-logo-250.png',
			priority: '1',
		},
		{
			name: 'HUAWEI',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/HUAWEI_HuaweiLogo-250.png',
			priority: '1',
		},
		{
			name: 'I-MOBILE',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/I-MOBILE_logo_imobile-250.png',
			priority: '1',
		},
		{
			name: 'INHON',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/INHON_inhon-logo-250.png',
			priority: '1',
		},
		{
			name: 'LAVA',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/LAVA_LavaLogo-250.png',
			priority: '1',
		},
		{
			name: 'MICROSOFT',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/MICROSOFT_Microsoft-Logo250.png',
			priority: '1',
		},
		{
			name: 'NEX',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/NEX_Nex-logo-250.png',
			priority: '1',
		},
		{
			name: 'NOKIA',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/NOKIA_Nokia_wordmark250.png',
			priority: '1',
		},
		{
			name: 'OPPO',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/OPPO_OPPO_logo250.png',
			priority: '1',
		},
		{
			name: 'SONY',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/SONY_sony-logo-250.png',
			priority: '1',
		},
		{
			name: 'VIVO',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/VIVO_vivologo-250.png',
			priority: '1',
		},
		{
			name: 'ACER',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/ACER_acer-Logo250.png',
			priority: '99',
		},
		{
			name: 'LENOVO',
			imageUrl: 'https://cpc.ais.co.th/CPC-FE-WEB/api/contents/upload/LENOVO_lenovo_logo250.png',
			priority: '100',
		},
		{
			name: 'REALME',
			imageUrl: null,
			priority: '9999',
		},
	],
};

export const mockShareTrans = {
	TRANSACTION_ID: 'bu2023014358391',
	DATA: {
		customer: {
			idCardNo: '735d7927386b6c792764746c7539694d:049ca4ae039c30a188d7f15c7276ba15',
			imageReadSmartCard: '',
			idCardType: 'IMM_CARD',
			titleName: 'นางสาว',
			citizenship: 'Laos',
			firstName: '735d7927386b6c792764746c7539694d:17ecdfb32b554929e3081807e8a4b41f',
			lastName: '735d7927386b6c792764746c7539694d:2c5aa02972527c6b74214f534f7c882c',
			birthdate: '735d7927386b6c792764746c7539694d:c02d1fd67aafccc29a2ab982e8430c9a',
			gender: 'F',
			homeNo: '735d7927386b6c792764746c7539694d:04438416a1217bbf894ac9147a08d4d4',
			moo: '735d7927386b6c792764746c7539694d:58635d679d91f044bf0a72465d4bedd9',
			mooBan: '735d7927386b6c792764746c7539694d:591a6b2f2d39d31d637c5e439cfc1935',
			room: '735d7927386b6c792764746c7539694d:faca35cf23d7a13a824c805fc50845c3',
			floor: '735d7927386b6c792764746c7539694d:591a6b2f2d39d31d637c5e439cfc1935',
			buildingName: '735d7927386b6c792764746c7539694d:85e5b4ef8224c8e737b8fbfebfa288a8',
			street: '735d7927386b6c792764746c7539694d:60ec9ce867703892a89a614e340a78eb',
			soi: '735d7927386b6c792764746c7539694d:a64e8491c5c4454a3bfd53c4b4ce44f9',
			tumbol: '735d7927386b6c792764746c7539694d:0cdd96978fd0a8a9bdd3cb6b3e21c3e4',
			amphur: '735d7927386b6c792764746c7539694d:958198e811b2b681f2196e3feed33ef5',
			province: '735d7927386b6c792764746c7539694d:4d38a768cf315453a851cf39e9e1f909',
			zipCode: '735d7927386b6c792764746c7539694d:14b81b88dc75f05072b1eb3bb5c4ccc5',
			firstNameEn: '735d7927386b6c792764746c7539694d:60ec9ce867703892a89a614e340a78eb',
			lastNameEn: '735d7927386b6c792764746c7539694d:60ec9ce867703892a89a614e340a78eb',
			issueDate: null,
			expireDate: null,
			mainMobile: '735d7927386b6c792764746c7539694d:61e88e03c1fb15d76d62bc8697a2af09',
			mainPhone: '735d7927386b6c792764746c7539694d:60ec9ce867703892a89a614e340a78eb',
			billCycle: '17',
			isNewCa: false,
			caNumber: '32200050388940',
			billLanguage: 'ENG',
			accountSubCat: 'FOR',
			engFlag: 'Y'
		},
		device: {
			model: 'IPHONEXSM256',
			brand: 'APPLE',
			amount: 1,
			name: 'iPhone Xs MAX 256GB',
			colorName: 'SPACE GREY',
			colorCode: '',
			imei: '',
			company: 'AWN',
		},
		preBooking: {
			prebookingNo: '',
			depositAmt: '',
			receiptNum: '',
		},
		knoxguard: '',
		queue: '',
		seller: {
			sellerName: 'undefined undefined',
			locationCode: '1100',
			employeeId: null,
		},
		order: {
			soId: '219733',
		},
		provision: {},
		currentProcess: {},
		status: {
			code: '004',
			description: 'batch cancel',
		},
		transactionType: 'Port-InAIS',
		deleteOntopPackage: null,
	},
	CREATE_BY: 'MC',
	CREATE_DATE: '2023-01-04T15:00:23+07:00',
	LAST_UPDATE_BY: 'batch',
	LAST_UPDATE_DATE: '2023-01-05T03:00:00+07:00',
	__v: 0,
};

export const mockShareTransReq = {
	soId: '18425',
	locationSource: '1177',
	locationReceipt: '1177',
	grandTotalAmt: '52800.00',
	userId: 'tdmols',
	saleCode: '',
	queueNo: '',
	cusNameOrder: 'Nutty Ammy',
	taxCardId: '8451924750424',
	cusMobileNoOrder: '0878214321',
	soOrderTransNo: '',
	customerAddress: {
		addrNo: '1',
		moo: '',
		mooban: '',
		buildingName: 'ESV Tower',
		floor: '19',
		room: '',
		soi: '',
		streetName: 'พหลโยธิน',
		tumbon: 'สามเสนใน',
		amphur: 'พญาไท',
		province: 'กรุงเทพ',
		zipCode: '10400',
		country: '',
	},
	paymentRemark: '',
	paymentMethod: '',
	bankCode: '',
	installmentTerm: '',
	installmentRate: '',
	focCode: '',
	mobileAisFlg: '',
	bankAbbr: '',
	reqMinimumBalance: '',
	preBookingNo: '',
	depositAmt: '',
	qrTransId: '',
	qrAmt: '',
	qrAirtimeTransId: '',
	qrAirtimeAmt: '',
	convertToNetwotkType: '',
	soChannelType: 'OCP',
	soDocumentType: 'RECEIPT',
	shipCusName: '',
	shipCusAddr: ' ',
	shipCustAddr2: ' ',
	storeName: '',
	shipLocation: ' ',
	shipMobileNo: '0898889999',
	productList: [
		{
			soCompany: 'AWN',
			productType: 'DEVICE',
			productSubType: 'HANDSET',
			brand: 'APPLE',
			model: 'I6 16GB',
			color: 'GOLD',
			matCode: 'NEWAPP0I616-GD01',
			priceIncAmt: '30000.00',
			priceDiscountAmt: '0.00',
			tradeNo: '',
			ussdCode: '',
			returnCode: '',
			cashBackFlg: '',
			matAirTime: '',
			tradeAirtimeId: '',
			tradeDiscountId: '',
			qty: '1',
			listMatFreeGoods: [
				{
					matCodeFG: '52000012',
					qtyFG: '1',
					tradeFreeGoodsId: '',
				},
			],
		},
	],
	remarkReceipt: '2NE456724',
};

export const mockResponseProductByBrand: IProducts[] = [
	{
		productId: 5,
		brand: 'APPLE',
		name: 'IPHONEXSM512',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '57900',
			max: '57900',
		},
		promotionPrice: {
			min: '55900',
			max: '57900',
		},
		subProducts: [
			{
				productId: 5,
				name: 'IPHONEXSM512',
				model: 'IPHONEXSM512',
				imageUrl: 'N/A',
				normalPrice: {
					min: '57900',
					max: '57900',
				},
				promotionPrice: {
					min: '55900',
					max: '57900',
				},
			},
		],
	},
	{
		productId: 1,
		brand: 'APPLE',
		name: 'iPhone 11',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '50000',
			max: '50000',
		},
		promotionPrice: {
			min: '40300',
			max: '50000',
		},
		subProducts: [
			{
				productId: 1,
				name: 'iPhone 11 256GB',
				model: 'IPHONE11256',
				imageUrl: 'N/A',
				normalPrice: {
					min: '50000',
					max: '50000',
				},
				promotionPrice: {
					min: '40300',
					max: '50000',
				},
			},
		],
	},
	{
		productId: 2,
		brand: 'APPLE',
		name: 'IPHONE1264',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '10000',
			max: '10000',
		},
		promotionPrice: {
			min: '10000',
			max: '10000',
		},
		subProducts: [
			{
				productId: 2,
				name: 'IPHONE1264',
				model: 'IPHONE1264',
				imageUrl: 'N/A',
				normalPrice: {
					min: '10000',
					max: '10000',
				},
				promotionPrice: {
					min: '10000',
					max: '10000',
				},
			},
		],
	},
	{
		productId: 4,
		brand: 'APPLE',
		name: 'AIR3256GB',
		model: null,
		imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-gold-cell-360-1_2_1_1.jpg',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '9990',
			max: '9990',
		},
		promotionPrice: {
			min: '9990',
			max: '9990',
		},
		subProducts: [
			{
				productId: 4,
				name: 'AIR3256GB',
				model: 'AIR3256GB',
				imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-gold-cell-360-1_2_1_1.jpg',
				normalPrice: {
					min: '9990',
					max: '9990',
				},
				promotionPrice: {
					min: '9990',
					max: '9990',
				},
			},
		],
	},
	{
		productId: 3,
		brand: 'APPLE',
		name: 'MN564GB',
		model: null,
		imageUrl:
			'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_mini_cellular_space_gray_850x850_3_3.jpg',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '27990',
			max: '27990',
		},
		promotionPrice: {
			min: '27990',
			max: '27990',
		},
		subProducts: [
			{
				productId: 3,
				name: 'MN564GB',
				model: 'MN564GB',
				imageUrl:
					'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_mini_cellular_space_gray_850x850_3_3.jpg',
				normalPrice: {
					min: '27990',
					max: '27990',
				},
				promotionPrice: {
					min: '27990',
					max: '27990',
				},
			},
		],
	},
	{
		productId: 7,
		brand: 'APPLE',
		name: 'IPHONE12PRO512',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '45000',
			max: '45000',
		},
		promotionPrice: {
			min: '45000',
			max: '45000',
		},
		subProducts: [
			{
				productId: 7,
				name: 'IPHONE12PRO512',
				model: 'IPHONE12PRO512',
				imageUrl: 'N/A',
				normalPrice: {
					min: '45000',
					max: '45000',
				},
				promotionPrice: {
					min: '45000',
					max: '45000',
				},
			},
		],
	},
	{
		productId: 6,
		brand: 'APPLE',
		name: 'IPHONE12PRO256',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '45000',
			max: '45000',
		},
		promotionPrice: {
			min: '45000',
			max: '45000',
		},
		subProducts: [
			{
				productId: 6,
				name: 'IPHONE12PRO256',
				model: 'IPHONE12PRO256',
				imageUrl: 'N/A',
				normalPrice: {
					min: '45000',
					max: '45000',
				},
				promotionPrice: {
					min: '45000',
					max: '45000',
				},
			},
		],
	},
	{
		productId: 8,
		brand: 'APPLE',
		name: 'IPHONEXSM512',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '57900',
			max: '57900',
		},
		promotionPrice: {
			min: '55900',
			max: '57900',
		},
		subProducts: [
			{
				productId: 8,
				name: 'IPHONEXSM512',
				model: 'IPHONEXSM512',
				imageUrl: 'N/A',
				normalPrice: {
					min: '57900',
					max: '57900',
				},
				promotionPrice: {
					min: '55900',
					max: '57900',
				},
			},
		],
	},
	{
		productId: 9,
		brand: 'APPLE',
		name: 'IPHONE12PRO512',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '45000',
			max: '45000',
		},
		promotionPrice: {
			min: '45000',
			max: '45000',
		},
		subProducts: [
			{
				productId: 9,
				name: 'IPHONE12PRO512',
				model: 'IPHONE12PRO512',
				imageUrl: 'N/A',
				normalPrice: {
					min: '45000',
					max: '45000',
				},
				promotionPrice: {
					min: '45000',
					max: '45000',
				},
			},
		],
	},
];

export const mockExpectedProductByBrandDescendingById: IProducts[] = [
	{
		productId: 9,
		brand: 'APPLE',
		name: 'IPHONE12PRO512',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '45000',
			max: '45000',
		},
		promotionPrice: {
			min: '45000',
			max: '45000',
		},
		subProducts: [
			{
				productId: 9,
				name: 'IPHONE12PRO512',
				model: 'IPHONE12PRO512',
				imageUrl: 'N/A',
				normalPrice: {
					min: '45000',
					max: '45000',
				},
				promotionPrice: {
					min: '45000',
					max: '45000',
				},
			},
		],
	},
	{
		productId: 8,
		brand: 'APPLE',
		name: 'IPHONEXSM512',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '57900',
			max: '57900',
		},
		promotionPrice: {
			min: '55900',
			max: '57900',
		},
		subProducts: [
			{
				productId: 8,
				name: 'IPHONEXSM512',
				model: 'IPHONEXSM512',
				imageUrl: 'N/A',
				normalPrice: {
					min: '57900',
					max: '57900',
				},
				promotionPrice: {
					min: '55900',
					max: '57900',
				},
			},
		],
	},
	{
		productId: 7,
		brand: 'APPLE',
		name: 'IPHONE12PRO512',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '45000',
			max: '45000',
		},
		promotionPrice: {
			min: '45000',
			max: '45000',
		},
		subProducts: [
			{
				productId: 7,
				name: 'IPHONE12PRO512',
				model: 'IPHONE12PRO512',
				imageUrl: 'N/A',
				normalPrice: {
					min: '45000',
					max: '45000',
				},
				promotionPrice: {
					min: '45000',
					max: '45000',
				},
			},
		],
	},
	{
		productId: 6,
		brand: 'APPLE',
		name: 'IPHONE12PRO256',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '45000',
			max: '45000',
		},
		promotionPrice: {
			min: '45000',
			max: '45000',
		},
		subProducts: [
			{
				productId: 6,
				name: 'IPHONE12PRO256',
				model: 'IPHONE12PRO256',
				imageUrl: 'N/A',
				normalPrice: {
					min: '45000',
					max: '45000',
				},
				promotionPrice: {
					min: '45000',
					max: '45000',
				},
			},
		],
	},
	{
		productId: 5,
		brand: 'APPLE',
		name: 'IPHONEXSM512',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '57900',
			max: '57900',
		},
		promotionPrice: {
			min: '55900',
			max: '57900',
		},
		subProducts: [
			{
				productId: 5,
				name: 'IPHONEXSM512',
				model: 'IPHONEXSM512',
				imageUrl: 'N/A',
				normalPrice: {
					min: '57900',
					max: '57900',
				},
				promotionPrice: {
					min: '55900',
					max: '57900',
				},
			},
		],
	},
	{
		productId: 4,
		brand: 'APPLE',
		name: 'AIR3256GB',
		model: null,
		imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-gold-cell-360-1_2_1_1.jpg',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '9990',
			max: '9990',
		},
		promotionPrice: {
			min: '9990',
			max: '9990',
		},
		subProducts: [
			{
				productId: 4,
				name: 'AIR3256GB',
				model: 'AIR3256GB',
				imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-gold-cell-360-1_2_1_1.jpg',
				normalPrice: {
					min: '9990',
					max: '9990',
				},
				promotionPrice: {
					min: '9990',
					max: '9990',
				},
			},
		],
	},
	{
		productId: 3,
		brand: 'APPLE',
		name: 'MN564GB',
		model: null,
		imageUrl:
			'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_mini_cellular_space_gray_850x850_3_3.jpg',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '27990',
			max: '27990',
		},
		promotionPrice: {
			min: '27990',
			max: '27990',
		},
		subProducts: [
			{
				productId: 3,
				name: 'MN564GB',
				model: 'MN564GB',
				imageUrl:
					'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_mini_cellular_space_gray_850x850_3_3.jpg',
				normalPrice: {
					min: '27990',
					max: '27990',
				},
				promotionPrice: {
					min: '27990',
					max: '27990',
				},
			},
		],
	},
	{
		productId: 2,
		brand: 'APPLE',
		name: 'IPHONE1264',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '10000',
			max: '10000',
		},
		promotionPrice: {
			min: '10000',
			max: '10000',
		},
		subProducts: [
			{
				productId: 2,
				name: 'IPHONE1264',
				model: 'IPHONE1264',
				imageUrl: 'N/A',
				normalPrice: {
					min: '10000',
					max: '10000',
				},
				promotionPrice: {
					min: '10000',
					max: '10000',
				},
			},
		],
	},
	{
		productId: 1,
		brand: 'APPLE',
		name: 'iPhone 11',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '50000',
			max: '50000',
		},
		promotionPrice: {
			min: '40300',
			max: '50000',
		},
		subProducts: [
			{
				productId: 1,
				name: 'iPhone 11 256GB',
				model: 'IPHONE11256',
				imageUrl: 'N/A',
				normalPrice: {
					min: '50000',
					max: '50000',
				},
				promotionPrice: {
					min: '40300',
					max: '50000',
				},
			},
		],
	},
];

export const mockResponseProductByBrandDuplicateName = {
	statusCode: 'test',
	statusDesc: 'test',
	countRow: 10,
	totalRow: 1,
	products: [
		{
			productId: 9,
			brand: 'APPLE',
			name: 'IPHONE12PRO512',
			model: null,
			imageUrl: '',
			itemType: null,
			flag5G: 'N',
			dv: [],
			productType: 'DEVICE',
			productSubtype: 'HANDSET',
			normalPrice: {
				min: '45000',
				max: '45000',
			},
			promotionPrice: {
				min: '45000',
				max: '45000',
			},
			subProducts: [
				{
					productId: 9,
					name: 'IPHONE12PRO512',
					model: 'IPHONE12PRO512',
					imageUrl: 'N/A',
					normalPrice: {
						min: '45000',
						max: '45000',
					},
					promotionPrice: {
						min: '45000',
						max: '45000',
					},
				},
			],
		},
		{
			productId: 8,
			brand: 'APPLE',
			name: 'IPHONEXSM512',
			model: null,
			imageUrl: '',
			itemType: null,
			flag5G: 'N',
			dv: [],
			productType: 'DEVICE',
			productSubtype: 'HANDSET',
			normalPrice: {
				min: '57900',
				max: '57900',
			},
			promotionPrice: {
				min: '55900',
				max: '57900',
			},
			subProducts: [
				{
					productId: 8,
					name: 'IPHONEXSM512',
					model: 'IPHONEXSM512',
					imageUrl: 'N/A',
					normalPrice: {
						min: '57900',
						max: '57900',
					},
					promotionPrice: {
						min: '55900',
						max: '57900',
					},
				},
			],
		},
		{
			productId: 7,
			brand: 'APPLE',
			name: 'IPHONE12PRO512',
			model: null,
			imageUrl: '',
			itemType: null,
			flag5G: 'N',
			dv: [],
			productType: 'DEVICE',
			productSubtype: 'HANDSET',
			normalPrice: {
				min: '45000',
				max: '45000',
			},
			promotionPrice: {
				min: '45000',
				max: '45000',
			},
			subProducts: [
				{
					productId: 7,
					name: 'IPHONE12PRO512',
					model: 'IPHONE12PRO512',
					imageUrl: 'N/A',
					normalPrice: {
						min: '45000',
						max: '45000',
					},
					promotionPrice: {
						min: '45000',
						max: '45000',
					},
				},
			],
		},
		{
			productId: 6,
			brand: 'APPLE',
			name: 'IPHONE12PRO256',
			model: null,
			imageUrl: '',
			itemType: null,
			flag5G: 'N',
			dv: [],
			productType: 'DEVICE',
			productSubtype: 'HANDSET',
			normalPrice: {
				min: '45000',
				max: '45000',
			},
			promotionPrice: {
				min: '45000',
				max: '45000',
			},
			subProducts: [
				{
					productId: 6,
					name: 'IPHONE12PRO256',
					model: 'IPHONE12PRO256',
					imageUrl: 'N/A',
					normalPrice: {
						min: '45000',
						max: '45000',
					},
					promotionPrice: {
						min: '45000',
						max: '45000',
					},
				},
			],
		},
		{
			productId: 5,
			brand: 'APPLE',
			name: 'IPHONEXSM512',
			model: null,
			imageUrl: '',
			itemType: null,
			flag5G: 'N',
			dv: [],
			productType: 'DEVICE',
			productSubtype: 'HANDSET',
			normalPrice: {
				min: '57900',
				max: '57900',
			},
			promotionPrice: {
				min: '55900',
				max: '57900',
			},
			subProducts: [
				{
					productId: 5,
					name: 'IPHONEXSM512',
					model: 'IPHONEXSM512',
					imageUrl: 'N/A',
					normalPrice: {
						min: '57900',
						max: '57900',
					},
					promotionPrice: {
						min: '55900',
						max: '57900',
					},
				},
			],
		},
		{
			productId: 4,
			brand: 'APPLE',
			name: 'AIR3256GB',
			model: null,
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-gold-cell-360-1_2_1_1.jpg',
			itemType: null,
			flag5G: 'N',
			dv: [],
			productType: 'DEVICE',
			productSubtype: 'HANDSET',
			normalPrice: {
				min: '9990',
				max: '9990',
			},
			promotionPrice: {
				min: '9990',
				max: '9990',
			},
			subProducts: [
				{
					productId: 4,
					name: 'AIR3256GB',
					model: 'AIR3256GB',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-gold-cell-360-1_2_1_1.jpg',
					normalPrice: {
						min: '9990',
						max: '9990',
					},
					promotionPrice: {
						min: '9990',
						max: '9990',
					},
				},
			],
		},
		{
			productId: 3,
			brand: 'APPLE',
			name: 'MN564GB',
			model: null,
			imageUrl:
				'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_mini_cellular_space_gray_850x850_3_3.jpg',
			itemType: null,
			flag5G: 'N',
			dv: [],
			productType: 'DEVICE',
			productSubtype: 'HANDSET',
			normalPrice: {
				min: '27990',
				max: '27990',
			},
			promotionPrice: {
				min: '27990',
				max: '27990',
			},
			subProducts: [
				{
					productId: 3,
					name: 'MN564GB',
					model: 'MN564GB',
					imageUrl:
						'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_mini_cellular_space_gray_850x850_3_3.jpg',
					normalPrice: {
						min: '27990',
						max: '27990',
					},
					promotionPrice: {
						min: '27990',
						max: '27990',
					},
				},
			],
		},
		{
			productId: 2,
			brand: 'APPLE',
			name: 'IPHONE1264',
			model: null,
			imageUrl: '',
			itemType: null,
			flag5G: 'N',
			dv: [],
			productType: 'DEVICE',
			productSubtype: 'HANDSET',
			normalPrice: {
				min: '10000',
				max: '10000',
			},
			promotionPrice: {
				min: '10000',
				max: '10000',
			},
			subProducts: [
				{
					productId: 2,
					name: 'IPHONE1264',
					model: 'IPHONE1264',
					imageUrl: 'N/A',
					normalPrice: {
						min: '10000',
						max: '10000',
					},
					promotionPrice: {
						min: '10000',
						max: '10000',
					},
				},
			],
		},
		{
			productId: 1,
			brand: 'APPLE',
			name: 'iPhone 11',
			model: null,
			imageUrl: '',
			itemType: null,
			flag5G: 'N',
			dv: [],
			productType: 'DEVICE',
			productSubtype: 'HANDSET',
			normalPrice: {
				min: '50000',
				max: '50000',
			},
			promotionPrice: {
				min: '40300',
				max: '50000',
			},
			subProducts: [
				{
					productId: 1,
					name: 'iPhone 11 256GB',
					model: 'IPHONE11256',
					imageUrl: 'N/A',
					normalPrice: {
						min: '50000',
						max: '50000',
					},
					promotionPrice: {
						min: '40300',
						max: '50000',
					},
				},
			],
		},
	],
};

export const mockExpectedProductByBrandNotDuplicateName: IProducts[] = [
	{
		productId: 9,
		brand: 'APPLE',
		name: 'IPHONE12PRO512',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '45000',
			max: '45000',
		},
		promotionPrice: {
			min: '45000',
			max: '45000',
		},
		subProducts: [
			{
				productId: 9,
				name: 'IPHONE12PRO512',
				model: 'IPHONE12PRO512',
				imageUrl: 'N/A',
				normalPrice: {
					min: '45000',
					max: '45000',
				},
				promotionPrice: {
					min: '45000',
					max: '45000',
				},
			},
		],
	},
	{
		productId: 8,
		brand: 'APPLE',
		name: 'IPHONEXSM512',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '57900',
			max: '57900',
		},
		promotionPrice: {
			min: '55900',
			max: '57900',
		},
		subProducts: [
			{
				productId: 8,
				name: 'IPHONEXSM512',
				model: 'IPHONEXSM512',
				imageUrl: 'N/A',
				normalPrice: {
					min: '57900',
					max: '57900',
				},
				promotionPrice: {
					min: '55900',
					max: '57900',
				},
			},
		],
	},
	{
		productId: 6,
		brand: 'APPLE',
		name: 'IPHONE12PRO256',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '45000',
			max: '45000',
		},
		promotionPrice: {
			min: '45000',
			max: '45000',
		},
		subProducts: [
			{
				productId: 6,
				name: 'IPHONE12PRO256',
				model: 'IPHONE12PRO256',
				imageUrl: 'N/A',
				normalPrice: {
					min: '45000',
					max: '45000',
				},
				promotionPrice: {
					min: '45000',
					max: '45000',
				},
			},
		],
	},
	{
		productId: 4,
		brand: 'APPLE',
		name: 'AIR3256GB',
		model: null,
		imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-gold-cell-360-1_2_1_1.jpg',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '9990',
			max: '9990',
		},
		promotionPrice: {
			min: '9990',
			max: '9990',
		},
		subProducts: [
			{
				productId: 4,
				name: 'AIR3256GB',
				model: 'AIR3256GB',
				imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-gold-cell-360-1_2_1_1.jpg',
				normalPrice: {
					min: '9990',
					max: '9990',
				},
				promotionPrice: {
					min: '9990',
					max: '9990',
				},
			},
		],
	},
	{
		productId: 3,
		brand: 'APPLE',
		name: 'MN564GB',
		model: null,
		imageUrl:
			'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_mini_cellular_space_gray_850x850_3_3.jpg',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '27990',
			max: '27990',
		},
		promotionPrice: {
			min: '27990',
			max: '27990',
		},
		subProducts: [
			{
				productId: 3,
				name: 'MN564GB',
				model: 'MN564GB',
				imageUrl:
					'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_mini_cellular_space_gray_850x850_3_3.jpg',
				normalPrice: {
					min: '27990',
					max: '27990',
				},
				promotionPrice: {
					min: '27990',
					max: '27990',
				},
			},
		],
	},
	{
		productId: 2,
		brand: 'APPLE',
		name: 'IPHONE1264',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '10000',
			max: '10000',
		},
		promotionPrice: {
			min: '10000',
			max: '10000',
		},
		subProducts: [
			{
				productId: 2,
				name: 'IPHONE1264',
				model: 'IPHONE1264',
				imageUrl: 'N/A',
				normalPrice: {
					min: '10000',
					max: '10000',
				},
				promotionPrice: {
					min: '10000',
					max: '10000',
				},
			},
		],
	},
	{
		productId: 1,
		brand: 'APPLE',
		name: 'iPhone 11',
		model: null,
		imageUrl: '',
		itemType: null,
		flag5G: 'N',
		dv: [],
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
		normalPrice: {
			min: '50000',
			max: '50000',
		},
		promotionPrice: {
			min: '40300',
			max: '50000',
		},
		subProducts: [
			{
				productId: 1,
				name: 'iPhone 11 256GB',
				model: 'IPHONE11256',
				imageUrl: 'N/A',
				normalPrice: {
					min: '50000',
					max: '50000',
				},
				promotionPrice: {
					min: '40300',
					max: '50000',
				},
			},
		],
	},
];
export const mockResponseFindAllProductsByBrands = {
	resultCode: '20000',
	resultDescription: 'Success',
	developerMessage: 'Success',
	data: 
		{
			brand: 'Brand1',
			products: [
				{
					productId: 1,
					brand: 'SAMSUNG',
					name: 'G1478',
					model: null,
					imageUrl: '',
					itemType: null,
					flag5G: 'N',
					dv: [],
					productType: 'DEVICE',
					productSubtype: 'HANDSET BUNDLE',
					normalPrice: {
						min: '890',
						max: '890',
					},
					promotionPrice: {
						min: '890',
						max: '890',
					},
					subProducts: [
						{
							productId: 9545336,
							name: 'G1478',
							model: 'G1478',
							imageUrl: 'N/A',
							normalPrice: {
								min: '890',
								max: '890',
							},
							promotionPrice: {
								min: '890',
								max: '890',
							},
						},
					],
				},
			]
		},
	
};


export const mockAllBrandsData = {
	statusCode: '20000',
	statusDesc: 'Success',
	brands: [
		{
			name: 'APPLE',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/APPLE_Apple-Logo-black250.png',
			priority: '0',
		},
		{
			name: 'SAMSUNG',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/SAMSUNG_samsung-logo-250.png',
			priority: '0',
		},
		{
			name: 'ASUS',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ASUS_asuz-logo-250.png',
			priority: '1',
		},
		{
			name: 'HUAWEI',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/HUAWEI_HuaweiLogo-250.png',
			priority: '1',
		},
		{
			name: 'I-MOBILE',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/I-MOBILE_logo_imobile-250.png',
			priority: '1',
		},
		{
			name: 'INHON',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/INHON_inhon-logo-250.png',
			priority: '1',
		},
		{
			name: 'LAVA',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/LAVA_LavaLogo-250.png',
			priority: '1',
		},
		{
			name: 'MICROSOFT',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/MICROSOFT_Microsoft-Logo250.png',
			priority: '1',
		},
		{
			name: 'NEX',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/NEX_Nex-logo-250.png',
			priority: '1',
		},
		{
			name: 'NOKIA',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/NOKIA_Nokia_wordmark250.png',
			priority: '1',
		},
		{
			name: 'OPPO',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/OPPO_OPPO_logo250.png',
			priority: '1',
		},
		{
			name: 'SONY',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/SONY_sony-logo-250.png',
			priority: '1',
		},
		{
			name: 'VIVO',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/VIVO_vivologo-250.png',
			priority: '1',
		},
		{
			name: 'ACER',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ACER_acer-Logo250.png',
			priority: '99',
		},
		{
			name: 'LENOVO',
			imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/LENOVO_lenovo_logo250.png',
			priority: '100',
		},
		{
			name: 'REALME',
			imageUrl: null,
			priority: '9999',
		},
	],
};

export const mockAllProductsData = {
    "resultCode": "20000",
    "resultDescription": "Success",
    "developerMessage": "Success",
    "data": [
        {
            "brand": "APPLE",
            "products": [
                {
                    "productId": 13691868,
                    "brand": "APPLE",
                    "name": "IPHONEXSM512",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "57900",
                        "max": "57900"
                    },
                    "promotionPrice": {
                        "min": "55900",
                        "max": "57900"
                    },
                    "subProducts": [
                        {
                            "productId": 13691868,
                            "name": "IPHONEXSM512",
                            "model": "IPHONEXSM512",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "57900",
                                "max": "57900"
                            },
                            "promotionPrice": {
                                "min": "55900",
                                "max": "57900"
                            }
                        }
                    ]
                },
                {
                    "productId": 8534201,
                    "brand": "APPLE",
                    "name": "iPhone 11",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_6.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "13990",
                        "max": "50000"
                    },
                    "promotionPrice": {
                        "min": "4290",
                        "max": "50000"
                    },
                    "subProducts": [
                        {
                            "productId": 8534201,
                            "name": "iPhone 11 256GB",
                            "model": "IPHONE11256",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_6.jpg",
                            "normalPrice": {
                                "min": "13990",
                                "max": "50000"
                            },
                            "promotionPrice": {
                                "min": "4290",
                                "max": "50000"
                            }
                        },
                        {
                            "productId": 85341,
                            "name": "iPhone 11 128GB",
                            "model": "IPHONE11128",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_6_1.jpg",
                            "normalPrice": {
                                "min": "26900",
                                "max": "26900"
                            },
                            "promotionPrice": {
                                "min": "17200",
                                "max": "26900"
                            }
                        },
                        {
                            "productId": 85327,
                            "name": "iPhone 11 64GB",
                            "model": "IPHONE1164",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_6_2.jpg",
                            "normalPrice": {
                                "min": "14900",
                                "max": "24900"
                            },
                            "promotionPrice": {
                                "min": "5200",
                                "max": "24900"
                            }
                        }
                    ]
                },
                {
                    "productId": 8531203,
                    "brand": "APPLE",
                    "name": "IPHONE1264",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "10000",
                        "max": "60000"
                    },
                    "promotionPrice": {
                        "min": "10000",
                        "max": "60000"
                    },
                    "subProducts": [
                        {
                            "productId": 8531203,
                            "name": "IPHONE1264",
                            "model": "IPHONE1264",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "10000",
                                "max": "60000"
                            },
                            "promotionPrice": {
                                "min": "10000",
                                "max": "60000"
                            }
                        }
                    ]
                },
                {
                    "productId": 684476,
                    "brand": "APPLE",
                    "name": "AIR3256GB",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-gold-cell-360-1_2_1_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "9990",
                        "max": "9990"
                    },
                    "promotionPrice": {
                        "min": "9990",
                        "max": "9990"
                    },
                    "subProducts": [
                        {
                            "productId": 684476,
                            "name": "AIR3256GB",
                            "model": "AIR3256GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-gold-cell-360-1_2_1_1.jpg",
                            "normalPrice": {
                                "min": "9990",
                                "max": "9990"
                            },
                            "promotionPrice": {
                                "min": "9990",
                                "max": "9990"
                            }
                        }
                    ]
                },
                {
                    "productId": 684474,
                    "brand": "APPLE",
                    "name": "MN564GB",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_mini_cellular_space_gray_850x850_3_3.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "27990",
                        "max": "27990"
                    },
                    "promotionPrice": {
                        "min": "27990",
                        "max": "27990"
                    },
                    "subProducts": [
                        {
                            "productId": 684474,
                            "name": "MN564GB",
                            "model": "MN564GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_mini_cellular_space_gray_850x850_3_3.jpg",
                            "normalPrice": {
                                "min": "27990",
                                "max": "27990"
                            },
                            "promotionPrice": {
                                "min": "27990",
                                "max": "27990"
                            }
                        }
                    ]
                },
                {
                    "productId": 644837,
                    "brand": "APPLE",
                    "name": "IPHONE12PRO512",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "45000",
                        "max": "45000"
                    },
                    "promotionPrice": {
                        "min": "45000",
                        "max": "45000"
                    },
                    "subProducts": [
                        {
                            "productId": 644837,
                            "name": "IPHONE12PRO512",
                            "model": "IPHONE12PRO512",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "45000",
                                "max": "45000"
                            },
                            "promotionPrice": {
                                "min": "45000",
                                "max": "45000"
                            }
                        }
                    ]
                },
                {
                    "productId": 644835,
                    "brand": "APPLE",
                    "name": "IPHONE12PRO256",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "45000",
                        "max": "45000"
                    },
                    "promotionPrice": {
                        "min": "45000",
                        "max": "45000"
                    },
                    "subProducts": [
                        {
                            "productId": 644835,
                            "name": "IPHONE12PRO256",
                            "model": "IPHONE12PRO256",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "45000",
                                "max": "45000"
                            },
                            "promotionPrice": {
                                "min": "45000",
                                "max": "45000"
                            }
                        }
                    ]
                },
                {
                    "productId": 641659,
                    "brand": "APPLE",
                    "name": "IPHONE 6",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6-gld_850x850_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "10500",
                        "max": "35000"
                    },
                    "promotionPrice": {
                        "min": "9500",
                        "max": "35000"
                    },
                    "subProducts": [
                        {
                            "productId": 641659,
                            "name": "APPLE iPhone 6 16GB",
                            "model": "I6 16GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s_gld_850x850_3_3.jpg",
                            "normalPrice": {
                                "min": "12500",
                                "max": "25500"
                            },
                            "promotionPrice": {
                                "min": "9500",
                                "max": "22500"
                            }
                        },
                        {
                            "productId": 641174,
                            "name": "APPLE iPhone 6 32GB",
                            "model": "I632GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6-gld_850x850_1.jpg",
                            "normalPrice": {
                                "min": "10500",
                                "max": "10500"
                            },
                            "promotionPrice": {
                                "min": "10500",
                                "max": "10500"
                            }
                        },
                        {
                            "productId": 51541,
                            "name": "APPLE iPhone 6 128GB",
                            "model": "I6 128GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6_svr_850x850_2.jpg",
                            "normalPrice": {
                                "min": "29500",
                                "max": "35000"
                            },
                            "promotionPrice": {
                                "min": "29500",
                                "max": "35000"
                            }
                        },
                        {
                            "productId": 51489,
                            "name": "APPLE iPhone 6 64GB",
                            "model": "I6 64GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "28000",
                                "max": "29400"
                            },
                            "promotionPrice": {
                                "min": "28000",
                                "max": "29400"
                            }
                        }
                    ]
                },
                {
                    "productId": 641510,
                    "brand": "APPLE",
                    "name": "IPAD6TH32",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/ipad6/ipad%20glod.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "16500",
                        "max": "16500"
                    },
                    "promotionPrice": {
                        "min": "13500",
                        "max": "14500"
                    },
                    "subProducts": [
                        {
                            "productId": 641510,
                            "name": "IPAD6TH32",
                            "model": "IPAD6TH32",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/ipad6/ipad%20glod.jpg",
                            "normalPrice": {
                                "min": "16500",
                                "max": "16500"
                            },
                            "promotionPrice": {
                                "min": "13500",
                                "max": "14500"
                            }
                        }
                    ]
                },
                {
                    "productId": 641509,
                    "brand": "APPLE",
                    "name": "IPAD6TH128",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_pureangles_svr-1_3.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "14000",
                        "max": "19900"
                    },
                    "promotionPrice": {
                        "min": "9000",
                        "max": "18900"
                    },
                    "subProducts": [
                        {
                            "productId": 641509,
                            "name": "IPAD6TH128",
                            "model": "IPAD6TH128",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_pureangles_svr-1_3.jpg",
                            "normalPrice": {
                                "min": "14000",
                                "max": "19900"
                            },
                            "promotionPrice": {
                                "min": "9000",
                                "max": "18900"
                            }
                        }
                    ]
                },
                {
                    "productId": 641503,
                    "brand": "APPLE",
                    "name": "IPAD6WF128",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_pureangles_svr-1_5.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "14900",
                        "max": "17499"
                    },
                    "promotionPrice": {
                        "min": "14900",
                        "max": "17499"
                    },
                    "subProducts": [
                        {
                            "productId": 641503,
                            "name": "IPAD6WF128",
                            "model": "IPAD6WF128",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_pureangles_svr-1_5.jpg",
                            "normalPrice": {
                                "min": "14900",
                                "max": "17499"
                            },
                            "promotionPrice": {
                                "min": "14900",
                                "max": "17499"
                            }
                        }
                    ]
                },
                {
                    "productId": 641500,
                    "brand": "APPLE",
                    "name": "PRO12WF512GB3",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "47900",
                        "max": "47900"
                    },
                    "promotionPrice": {
                        "min": "47900",
                        "max": "47900"
                    },
                    "subProducts": [
                        {
                            "productId": 641500,
                            "name": "PRO12WF512GB3",
                            "model": "PRO12WF512GB3",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "47900",
                                "max": "47900"
                            },
                            "promotionPrice": {
                                "min": "47900",
                                "max": "47900"
                            }
                        }
                    ]
                },
                {
                    "productId": 641498,
                    "brand": "APPLE",
                    "name": "PRO12WF256GB3",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "40900",
                        "max": "40900"
                    },
                    "promotionPrice": {
                        "min": "40900",
                        "max": "40900"
                    },
                    "subProducts": [
                        {
                            "productId": 641498,
                            "name": "PRO12WF256GB3",
                            "model": "PRO12WF256GB3",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "40900",
                                "max": "40900"
                            },
                            "promotionPrice": {
                                "min": "40900",
                                "max": "40900"
                            }
                        }
                    ]
                },
                {
                    "productId": 641492,
                    "brand": "APPLE",
                    "name": "IPAD6WF32",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_pureangles_svr-1_6.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "9550",
                        "max": "11500"
                    },
                    "promotionPrice": {
                        "min": "9550",
                        "max": "11500"
                    },
                    "subProducts": [
                        {
                            "productId": 641492,
                            "name": "IPAD6WF32",
                            "model": "IPAD6WF32",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_pureangles_svr-1_6.jpg",
                            "normalPrice": {
                                "min": "9550",
                                "max": "11500"
                            },
                            "promotionPrice": {
                                "min": "9550",
                                "max": "11500"
                            }
                        }
                    ]
                },
                {
                    "productId": 641489,
                    "brand": "APPLE",
                    "name": "PRO12WF64GB3",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "35900",
                        "max": "35900"
                    },
                    "promotionPrice": {
                        "min": "35900",
                        "max": "35900"
                    },
                    "subProducts": [
                        {
                            "productId": 641489,
                            "name": "PRO12WF64GB3",
                            "model": "PRO12WF64GB3",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png",
                            "normalPrice": {
                                "min": "35900",
                                "max": "35900"
                            },
                            "promotionPrice": {
                                "min": "35900",
                                "max": "35900"
                            }
                        }
                    ]
                },
                {
                    "productId": 641487,
                    "brand": "APPLE",
                    "name": "PRO12WF1TB3",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "61900",
                        "max": "61900"
                    },
                    "promotionPrice": {
                        "min": "61900",
                        "max": "61900"
                    },
                    "subProducts": [
                        {
                            "productId": 641487,
                            "name": "PRO12WF1TB3",
                            "model": "PRO12WF1TB3",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png",
                            "normalPrice": {
                                "min": "61900",
                                "max": "61900"
                            },
                            "promotionPrice": {
                                "min": "61900",
                                "max": "61900"
                            }
                        }
                    ]
                },
                {
                    "productId": 641481,
                    "brand": "APPLE",
                    "name": "iPad PRO 11",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadpro129cell-silver-pureangles-1_6.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "33900",
                        "max": "59900"
                    },
                    "promotionPrice": {
                        "min": "33900",
                        "max": "59900"
                    },
                    "subProducts": [
                        {
                            "productId": 641481,
                            "name": "APPLE iPad PRO 11\" 512GB",
                            "model": "PRO11512GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadpro129cell-silver-pureangles-1_6.jpg",
                            "normalPrice": {
                                "min": "45900",
                                "max": "45900"
                            },
                            "promotionPrice": {
                                "min": "45900",
                                "max": "45900"
                            }
                        },
                        {
                            "productId": 641479,
                            "name": "APPLE iPad PRO 11\" 256GB",
                            "model": "PRO11256GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadpro129cell-silver-pureangles-1_5.jpg",
                            "normalPrice": {
                                "min": "38900",
                                "max": "38900"
                            },
                            "promotionPrice": {
                                "min": "38900",
                                "max": "38900"
                            }
                        },
                        {
                            "productId": 641475,
                            "name": "APPLE iPad PRO 11\" 64GB",
                            "model": "PRO1164GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadpro129cell-silver-pureangles-1_4.jpg",
                            "normalPrice": {
                                "min": "33900",
                                "max": "33900"
                            },
                            "promotionPrice": {
                                "min": "33900",
                                "max": "33900"
                            }
                        },
                        {
                            "productId": 641473,
                            "name": "APPLE iPad PRO 11\" 1TB",
                            "model": "PRO111TB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadpro129cell-silver-pureangles-1_7.jpg",
                            "normalPrice": {
                                "min": "59900",
                                "max": "59900"
                            },
                            "promotionPrice": {
                                "min": "59900",
                                "max": "59900"
                            }
                        }
                    ]
                },
                {
                    "productId": 641477,
                    "brand": "APPLE",
                    "name": "PRO121TB3RD",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadpro129cell-silver-pureangles-1_3.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "66900",
                        "max": "66900"
                    },
                    "promotionPrice": {
                        "min": "62900",
                        "max": "66900"
                    },
                    "subProducts": [
                        {
                            "productId": 641477,
                            "name": "PRO121TB3RD",
                            "model": "PRO121TB3RD",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadpro129cell-silver-pureangles-1_3.jpg",
                            "normalPrice": {
                                "min": "66900",
                                "max": "66900"
                            },
                            "promotionPrice": {
                                "min": "62900",
                                "max": "66900"
                            }
                        }
                    ]
                },
                {
                    "productId": 641435,
                    "brand": "APPLE",
                    "name": "PRO12512GB3RD",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadpro129cell-silver-pureangles-1_2.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "52900",
                        "max": "52900"
                    },
                    "promotionPrice": {
                        "min": "48900",
                        "max": "52900"
                    },
                    "subProducts": [
                        {
                            "productId": 641435,
                            "name": "PRO12512GB3RD",
                            "model": "PRO12512GB3RD",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadpro129cell-silver-pureangles-1_2.jpg",
                            "normalPrice": {
                                "min": "52900",
                                "max": "52900"
                            },
                            "promotionPrice": {
                                "min": "48900",
                                "max": "52900"
                            }
                        }
                    ]
                },
                {
                    "productId": 641433,
                    "brand": "APPLE",
                    "name": "PRO12256GB3RD",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadpro129cell-silver-pureangles-1_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "45900",
                        "max": "45900"
                    },
                    "promotionPrice": {
                        "min": "41900",
                        "max": "45900"
                    },
                    "subProducts": [
                        {
                            "productId": 641433,
                            "name": "PRO12256GB3RD",
                            "model": "PRO12256GB3RD",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadpro129cell-silver-pureangles-1_1.jpg",
                            "normalPrice": {
                                "min": "45900",
                                "max": "45900"
                            },
                            "promotionPrice": {
                                "min": "41900",
                                "max": "45900"
                            }
                        }
                    ]
                },
                {
                    "productId": 641431,
                    "brand": "APPLE",
                    "name": "PRO1264GB3RD",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadpro129cell-silver-pureangles-1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "40900",
                        "max": "40900"
                    },
                    "promotionPrice": {
                        "min": "36900",
                        "max": "40900"
                    },
                    "subProducts": [
                        {
                            "productId": 641431,
                            "name": "PRO1264GB3RD",
                            "model": "PRO1264GB3RD",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadpro129cell-silver-pureangles-1.jpg",
                            "normalPrice": {
                                "min": "40900",
                                "max": "40900"
                            },
                            "promotionPrice": {
                                "min": "36900",
                                "max": "40900"
                            }
                        }
                    ]
                },
                {
                    "productId": 641257,
                    "brand": "APPLE",
                    "name": "IPHONE7P256",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "35500",
                        "max": "35500"
                    },
                    "promotionPrice": {
                        "min": "35500",
                        "max": "35500"
                    },
                    "subProducts": [
                        {
                            "productId": 641257,
                            "name": "IPHONE7P256",
                            "model": "IPHONE7P256",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "35500",
                                "max": "35500"
                            },
                            "promotionPrice": {
                                "min": "35500",
                                "max": "35500"
                            }
                        }
                    ]
                },
                {
                    "productId": 641210,
                    "brand": "APPLE",
                    "name": "IPHONE7256",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone_7_productred_front_2.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "27500",
                        "max": "34500"
                    },
                    "promotionPrice": {
                        "min": "27500",
                        "max": "34500"
                    },
                    "subProducts": [
                        {
                            "productId": 641210,
                            "name": "IPHONE7256",
                            "model": "IPHONE7256",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone_7_productred_front_2.jpg",
                            "normalPrice": {
                                "min": "27500",
                                "max": "34500"
                            },
                            "promotionPrice": {
                                "min": "27500",
                                "max": "34500"
                            }
                        }
                    ]
                },
                {
                    "productId": 641157,
                    "brand": "APPLE",
                    "name": "IPHONE6S128",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-silver-pureangles_5.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "25000",
                        "max": "30500"
                    },
                    "promotionPrice": {
                        "min": "25000",
                        "max": "30500"
                    },
                    "subProducts": [
                        {
                            "productId": 641157,
                            "name": "IPHONE6S128",
                            "model": "IPHONE6S128",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-silver-pureangles_5.jpg",
                            "normalPrice": {
                                "min": "25000",
                                "max": "30500"
                            },
                            "promotionPrice": {
                                "min": "25000",
                                "max": "30500"
                            }
                        }
                    ]
                },
                {
                    "productId": 641156,
                    "brand": "APPLE",
                    "name": "iPhone 6s Plus",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-spacegray-pureangles_3.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "2600",
                        "max": "39200"
                    },
                    "promotionPrice": {
                        "min": "2600",
                        "max": "39200"
                    },
                    "subProducts": [
                        {
                            "productId": 641156,
                            "name": "APPLE iPhone 6s Plus 32GB",
                            "model": "IPHONE6SP32",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-spacegray-pureangles_3.jpg",
                            "normalPrice": {
                                "min": "15200",
                                "max": "15200"
                            },
                            "promotionPrice": {
                                "min": "15200",
                                "max": "15200"
                            }
                        },
                        {
                            "productId": 549382,
                            "name": "TRADE IN-APPLE iPhone 6s Plus 128GB",
                            "model": "IPHONE6SP128",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6splus-rosegold-pureangles_1_1.jpg",
                            "normalPrice": {
                                "min": "2600",
                                "max": "39200"
                            },
                            "promotionPrice": {
                                "min": "2600",
                                "max": "39200"
                            }
                        },
                        {
                            "productId": 56973,
                            "name": "TRADE IN-APPLE iPhone 6s Plus 64GB",
                            "model": "IPHONE6SP64",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6splus-silver-pureangles_1_3.jpg",
                            "normalPrice": {
                                "min": "25000",
                                "max": "35100"
                            },
                            "promotionPrice": {
                                "min": "25000",
                                "max": "35100"
                            }
                        }
                    ]
                },
                {
                    "productId": 641156,
                    "brand": "APPLE",
                    "name": "IPHONE6SP32",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-spacegray-pureangles_3.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "15200",
                        "max": "15200"
                    },
                    "promotionPrice": {
                        "min": "15200",
                        "max": "15200"
                    },
                    "subProducts": [
                        {
                            "productId": 641156,
                            "name": "IPHONE6SP32",
                            "model": "IPHONE6SP32",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-spacegray-pureangles_3.jpg",
                            "normalPrice": {
                                "min": "15200",
                                "max": "15200"
                            },
                            "promotionPrice": {
                                "min": "15200",
                                "max": "15200"
                            }
                        }
                    ]
                },
                {
                    "productId": 606293,
                    "brand": "APPLE",
                    "name": "IPHONE7128",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone_7_productred_front.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "22900",
                        "max": "33500"
                    },
                    "promotionPrice": {
                        "min": "22900",
                        "max": "33500"
                    },
                    "subProducts": [
                        {
                            "productId": 606293,
                            "name": "IPHONE7128",
                            "model": "IPHONE7128",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone_7_productred_front.jpg",
                            "normalPrice": {
                                "min": "22900",
                                "max": "33500"
                            },
                            "promotionPrice": {
                                "min": "22900",
                                "max": "33500"
                            }
                        }
                    ]
                },
                {
                    "productId": 606291,
                    "brand": "APPLE",
                    "name": "IPHONE 7 PLUS",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/phone_7plus_productred_front.png",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "27900",
                        "max": "39500"
                    },
                    "promotionPrice": {
                        "min": "27900",
                        "max": "39500"
                    },
                    "subProducts": [
                        {
                            "productId": 606291,
                            "name": "APPLE iPhone 7 Plus 128GB",
                            "model": "IPHONE7P128",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/phone_7plus_productred_front.png",
                            "normalPrice": {
                                "min": "27900",
                                "max": "35500"
                            },
                            "promotionPrice": {
                                "min": "27900",
                                "max": "35500"
                            }
                        },
                        {
                            "productId": 606290,
                            "name": "APPLE iPhone 7 Plus 256GB",
                            "model": "IPHONE7P256",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/phone_7plus_productred_front_2.png",
                            "normalPrice": {
                                "min": "35500",
                                "max": "39500"
                            },
                            "promotionPrice": {
                                "min": "35500",
                                "max": "39500"
                            }
                        },
                        {
                            "productId": 70369,
                            "name": "APPLE iPhone 7 Plus 32GB",
                            "model": "IPHONE7P32",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone7plus-black-pureangles_2_6.jpg",
                            "normalPrice": {
                                "min": "31500",
                                "max": "31500"
                            },
                            "promotionPrice": {
                                "min": "31500",
                                "max": "31500"
                            }
                        }
                    ]
                },
                {
                    "productId": 606266,
                    "brand": "APPLE",
                    "name": "IPHONE6S128GB",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6splus-silver-pureangles_1_5.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "15000",
                        "max": "15000"
                    },
                    "promotionPrice": {
                        "min": "15000",
                        "max": "15000"
                    },
                    "subProducts": [
                        {
                            "productId": 606266,
                            "name": "IPHONE6SP128",
                            "model": "IPHONE6S128GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6splus-silver-pureangles_1_5.jpg",
                            "normalPrice": {
                                "min": "15000",
                                "max": "15000"
                            },
                            "promotionPrice": {
                                "min": "15000",
                                "max": "15000"
                            }
                        }
                    ]
                },
                {
                    "productId": 549383,
                    "brand": "APPLE",
                    "name": "IPHONE6S16",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-rosegold-pureangles_7.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "16500",
                        "max": "26900"
                    },
                    "promotionPrice": {
                        "min": "16500",
                        "max": "26900"
                    },
                    "subProducts": [
                        {
                            "productId": 549383,
                            "name": "IPHONE6S16",
                            "model": "IPHONE6S16",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-rosegold-pureangles_7.jpg",
                            "normalPrice": {
                                "min": "16500",
                                "max": "26900"
                            },
                            "promotionPrice": {
                                "min": "16500",
                                "max": "26900"
                            }
                        }
                    ]
                },
                {
                    "productId": 549382,
                    "brand": "APPLE",
                    "name": "IPHONE6SP128",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6splus-rosegold-pureangles_1_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "2600",
                        "max": "39200"
                    },
                    "promotionPrice": {
                        "min": "2600",
                        "max": "39200"
                    },
                    "subProducts": [
                        {
                            "productId": 549382,
                            "name": "IPHONE6SP128",
                            "model": "IPHONE6SP128",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6splus-rosegold-pureangles_1_1.jpg",
                            "normalPrice": {
                                "min": "2600",
                                "max": "39200"
                            },
                            "promotionPrice": {
                                "min": "2600",
                                "max": "39200"
                            }
                        }
                    ]
                },
                {
                    "productId": 549378,
                    "brand": "APPLE",
                    "name": "IPHONE6S64",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-spacegray-pureangles_6.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "30900",
                        "max": "32500"
                    },
                    "promotionPrice": {
                        "min": "30900",
                        "max": "32500"
                    },
                    "subProducts": [
                        {
                            "productId": 549378,
                            "name": "IPHONE6S64",
                            "model": "IPHONE6S64",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-spacegray-pureangles_6.jpg",
                            "normalPrice": {
                                "min": "30900",
                                "max": "32500"
                            },
                            "promotionPrice": {
                                "min": "30900",
                                "max": "32500"
                            }
                        }
                    ]
                },
                {
                    "productId": 549283,
                    "brand": "APPLE",
                    "name": "IPHONE SE",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonese-rsgld_850x850.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "15900",
                        "max": "41000"
                    },
                    "promotionPrice": {
                        "min": "15900",
                        "max": "41000"
                    },
                    "subProducts": [
                        {
                            "productId": 549283,
                            "name": "APPLE iPhone SE 16GB",
                            "model": "IPHONESE16GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonese-rsgld_850x850.jpg",
                            "normalPrice": {
                                "min": "41000",
                                "max": "41000"
                            },
                            "promotionPrice": {
                                "min": "41000",
                                "max": "41000"
                            }
                        },
                        {
                            "productId": 61044,
                            "name": "APPLE iPhone SE 64GB",
                            "model": "IPHONESE64GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonese-rsgld_850x850_4.jpg",
                            "normalPrice": {
                                "min": "15900",
                                "max": "15900"
                            },
                            "promotionPrice": {
                                "min": "15900",
                                "max": "15900"
                            }
                        }
                    ]
                },
                {
                    "productId": 549280,
                    "brand": "APPLE",
                    "name": "I6PS 16GB",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-silver-pureangles_7.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "30000",
                        "max": "30000"
                    },
                    "promotionPrice": {
                        "min": "30000",
                        "max": "30000"
                    },
                    "subProducts": [
                        {
                            "productId": 549280,
                            "name": "I6PS 16GB",
                            "model": "I6PS 16GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-silver-pureangles_7.jpg",
                            "normalPrice": {
                                "min": "30000",
                                "max": "30000"
                            },
                            "promotionPrice": {
                                "min": "30000",
                                "max": "30000"
                            }
                        }
                    ]
                },
                {
                    "productId": 545430,
                    "brand": "APPLE",
                    "name": "IPHONE5S 16GB",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "16500",
                        "max": "16500"
                    },
                    "promotionPrice": {
                        "min": "16500",
                        "max": "17900"
                    },
                    "subProducts": [
                        {
                            "productId": 545430,
                            "name": "IPHONE5S 16GB",
                            "model": "IPHONE5S 16GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "16500",
                                "max": "16500"
                            },
                            "promotionPrice": {
                                "min": "16500",
                                "max": "17900"
                            }
                        }
                    ]
                },
                {
                    "productId": 424270,
                    "brand": "APPLE",
                    "name": "I4S32",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "5000",
                        "max": "5000"
                    },
                    "promotionPrice": {
                        "min": "5000",
                        "max": "5000"
                    },
                    "subProducts": [
                        {
                            "productId": 424270,
                            "name": "I4S32",
                            "model": "I4S32",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "5000",
                                "max": "5000"
                            },
                            "promotionPrice": {
                                "min": "5000",
                                "max": "5000"
                            }
                        }
                    ]
                },
                {
                    "productId": 424262,
                    "brand": "APPLE",
                    "name": "IPHONE 4S",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/awn_newapp0i4s8-wh01_1.png",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "2000",
                        "max": "28900"
                    },
                    "promotionPrice": {
                        "min": "2000",
                        "max": "28900"
                    },
                    "subProducts": [
                        {
                            "productId": 424262,
                            "name": "TRADE IN-APPLE iPhone 4s 8GB",
                            "model": "IPHONE4S 8GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/awn_newapp0i4s8-wh01_1.png",
                            "normalPrice": {
                                "min": "2000",
                                "max": "14900"
                            },
                            "promotionPrice": {
                                "min": "2000",
                                "max": "14900"
                            }
                        },
                        {
                            "productId": 42436,
                            "name": "IPHONE 4S 16GB",
                            "model": "IPHONE4S 16GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "19600",
                                "max": "20700"
                            },
                            "promotionPrice": {
                                "min": "19600",
                                "max": "20700"
                            }
                        },
                        {
                            "productId": 41079,
                            "name": "IPHONE 4S 64GB",
                            "model": "IPHONE4S 64GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "28900",
                                "max": "28900"
                            },
                            "promotionPrice": {
                                "min": "28900",
                                "max": "28900"
                            }
                        },
                        {
                            "productId": 41077,
                            "name": "IPHONE 4S 32GB",
                            "model": "IPHONE4S 32GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "24500",
                                "max": "24500"
                            },
                            "promotionPrice": {
                                "min": "24500",
                                "max": "24500"
                            }
                        }
                    ]
                },
                {
                    "productId": 116381,
                    "brand": "APPLE",
                    "name": "IP14PM_256GB",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "47000",
                        "max": "47000"
                    },
                    "promotionPrice": {
                        "min": "45000",
                        "max": "45000"
                    },
                    "subProducts": [
                        {
                            "productId": 116381,
                            "name": "IP14PM_256GB",
                            "model": "IP14PM_256GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "47000",
                                "max": "47000"
                            },
                            "promotionPrice": {
                                "min": "45000",
                                "max": "45000"
                            }
                        }
                    ]
                },
                {
                    "productId": 116361,
                    "brand": "APPLE",
                    "name": "IP14P_256GB",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "44000",
                        "max": "44000"
                    },
                    "promotionPrice": {
                        "min": "44000",
                        "max": "44000"
                    },
                    "subProducts": [
                        {
                            "productId": 116361,
                            "name": "IP14P_256GB",
                            "model": "IP14P_256GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "44000",
                                "max": "44000"
                            },
                            "promotionPrice": {
                                "min": "44000",
                                "max": "44000"
                            }
                        }
                    ]
                },
                {
                    "productId": 116354,
                    "brand": "APPLE",
                    "name": "IP14P_128GB",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "40000",
                        "max": "40000"
                    },
                    "promotionPrice": {
                        "min": "40000",
                        "max": "40000"
                    },
                    "subProducts": [
                        {
                            "productId": 116354,
                            "name": "IP14P_128GB",
                            "model": "IP14P_128GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "40000",
                                "max": "40000"
                            },
                            "promotionPrice": {
                                "min": "40000",
                                "max": "40000"
                            }
                        }
                    ]
                },
                {
                    "productId": 114240,
                    "brand": "APPLE",
                    "name": "IP12SL_128GB",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "24500",
                        "max": "24500"
                    },
                    "promotionPrice": {
                        "min": "20500",
                        "max": "24000"
                    },
                    "subProducts": [
                        {
                            "productId": 114240,
                            "name": "IP12SL_128GB",
                            "model": "IP12SL_128GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "24500",
                                "max": "24500"
                            },
                            "promotionPrice": {
                                "min": "20500",
                                "max": "24000"
                            }
                        }
                    ]
                },
                {
                    "productId": 109964,
                    "brand": "APPLE",
                    "name": "IP13_256GB",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "32200",
                        "max": "32700"
                    },
                    "promotionPrice": {
                        "min": "27200",
                        "max": "32700"
                    },
                    "subProducts": [
                        {
                            "productId": 109964,
                            "name": "IP13_256GB",
                            "model": "IP13_256GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png",
                            "normalPrice": {
                                "min": "32200",
                                "max": "32700"
                            },
                            "promotionPrice": {
                                "min": "27200",
                                "max": "32700"
                            }
                        }
                    ]
                },
                {
                    "productId": 109960,
                    "brand": "APPLE",
                    "name": "IP13_128GB",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "28200",
                        "max": "28700"
                    },
                    "promotionPrice": {
                        "min": "23200",
                        "max": "28700"
                    },
                    "subProducts": [
                        {
                            "productId": 109960,
                            "name": "IP13_128GB",
                            "model": "IP13_128GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png",
                            "normalPrice": {
                                "min": "28200",
                                "max": "28700"
                            },
                            "promotionPrice": {
                                "min": "23200",
                                "max": "28700"
                            }
                        }
                    ]
                },
                {
                    "productId": 109918,
                    "brand": "APPLE",
                    "name": "IP13PM_256GB",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/consumer/store/devices/apple/iphone/iphone-13-series/iphone-13-pro-max/iphone-13-pro.png",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "45000",
                        "max": "45000"
                    },
                    "promotionPrice": {
                        "min": "40000",
                        "max": "45000"
                    },
                    "subProducts": [
                        {
                            "productId": 109918,
                            "name": "IP13PM_256GB",
                            "model": "IP13PM_256GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/consumer/store/devices/apple/iphone/iphone-13-series/iphone-13-pro-max/iphone-13-pro.png",
                            "normalPrice": {
                                "min": "45000",
                                "max": "45000"
                            },
                            "promotionPrice": {
                                "min": "40000",
                                "max": "45000"
                            }
                        }
                    ]
                },
                {
                    "productId": 109914,
                    "brand": "APPLE",
                    "name": "IP13PM_128GB",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/consumer/store/devices/apple/iphone/iphone-13-series/iphone-13-pro-max/iphone-13-pro.png",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "41000",
                        "max": "41000"
                    },
                    "promotionPrice": {
                        "min": "36000",
                        "max": "41000"
                    },
                    "subProducts": [
                        {
                            "productId": 109914,
                            "name": "IP13PM_128GB",
                            "model": "IP13PM_128GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/consumer/store/devices/apple/iphone/iphone-13-series/iphone-13-pro-max/iphone-13-pro.png",
                            "normalPrice": {
                                "min": "41000",
                                "max": "41000"
                            },
                            "promotionPrice": {
                                "min": "36000",
                                "max": "41000"
                            }
                        }
                    ]
                },
                {
                    "productId": 109898,
                    "brand": "APPLE",
                    "name": "IP13P_256GB",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "41000",
                        "max": "41000"
                    },
                    "promotionPrice": {
                        "min": "36000",
                        "max": "41000"
                    },
                    "subProducts": [
                        {
                            "productId": 109898,
                            "name": "IP13P_256GB",
                            "model": "IP13P_256GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png",
                            "normalPrice": {
                                "min": "41000",
                                "max": "41000"
                            },
                            "promotionPrice": {
                                "min": "36000",
                                "max": "41000"
                            }
                        }
                    ]
                },
                {
                    "productId": 109894,
                    "brand": "APPLE",
                    "name": "IP13P_128GB",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "37500",
                        "max": "37500"
                    },
                    "promotionPrice": {
                        "min": "32500",
                        "max": "37500"
                    },
                    "subProducts": [
                        {
                            "productId": 109894,
                            "name": "IP13P_128GB",
                            "model": "IP13P_128GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png",
                            "normalPrice": {
                                "min": "37500",
                                "max": "37500"
                            },
                            "promotionPrice": {
                                "min": "32500",
                                "max": "37500"
                            }
                        }
                    ]
                },
                {
                    "productId": 94807,
                    "brand": "APPLE",
                    "name": "iPhone 12 Pro Max",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th-iphone_12_pro_max_silver_pdp_image_position-1a_1.jpg",
                    "itemType": null,
                    "flag5G": "Y",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "39900",
                        "max": "51900"
                    },
                    "promotionPrice": {
                        "min": "32700",
                        "max": "51900"
                    },
                    "subProducts": [
                        {
                            "productId": 94807,
                            "name": "iPhone 12 Pro Max 512GB",
                            "model": "IP12PM_512GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th-iphone_12_pro_max_silver_pdp_image_position-1a_1.jpg",
                            "normalPrice": {
                                "min": "51900",
                                "max": "51900"
                            },
                            "promotionPrice": {
                                "min": "44700",
                                "max": "51900"
                            }
                        },
                        {
                            "productId": 94798,
                            "name": "iPhone 12 Pro Max 256GB",
                            "model": "IP12PM_256GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th-iphone_12_pro_max_silver_pdp_image_position-1a_2.jpg",
                            "normalPrice": {
                                "min": "43900",
                                "max": "43900"
                            },
                            "promotionPrice": {
                                "min": "36700",
                                "max": "43900"
                            }
                        },
                        {
                            "productId": 94791,
                            "name": "iPhone 12 Pro Max 128GB",
                            "model": "IP12PM_128GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th-iphone_12_pro_max_silver_pdp_image_position-1a.jpg",
                            "normalPrice": {
                                "min": "39900",
                                "max": "39900"
                            },
                            "promotionPrice": {
                                "min": "32700",
                                "max": "39900"
                            }
                        }
                    ]
                },
                {
                    "productId": 94767,
                    "brand": "APPLE",
                    "name": "iPhone 12 Pro",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th-iphone_12_pro_silver_pdp_image_position-1a_2.jpg",
                    "itemType": null,
                    "flag5G": "Y",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "36900",
                        "max": "48900"
                    },
                    "promotionPrice": {
                        "min": "0",
                        "max": "48900"
                    },
                    "subProducts": [
                        {
                            "productId": 94767,
                            "name": "iPhone 12 Pro 512GB",
                            "model": "IP12P_512GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th-iphone_12_pro_silver_pdp_image_position-1a_2.jpg",
                            "normalPrice": {
                                "min": "48900",
                                "max": "48900"
                            },
                            "promotionPrice": {
                                "min": "41700",
                                "max": "48900"
                            }
                        },
                        {
                            "productId": 94760,
                            "name": "iPhone 12 Pro 256GB",
                            "model": "IP12P_256GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th-iphone_12_pro_silver_pdp_image_position-1a_1.jpg",
                            "normalPrice": {
                                "min": "40900",
                                "max": "40900"
                            },
                            "promotionPrice": {
                                "min": "33700",
                                "max": "40900"
                            }
                        },
                        {
                            "productId": 94750,
                            "name": "iPhone 12 Pro 128GB",
                            "model": "IP12P_128GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th-iphone_12_pro_silver_pdp_image_position-1a.jpg",
                            "normalPrice": {
                                "min": "36900",
                                "max": "36900"
                            },
                            "promotionPrice": {
                                "min": "0",
                                "max": "36400"
                            }
                        }
                    ]
                },
                {
                    "productId": 94740,
                    "brand": "APPLE",
                    "name": "iPhone 12",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/consumer/store/devices/apple/iphone/iphone-12-series/iphone-12/product-detail/en/red/iphone-12-pdp-position-1a-color-product-red-en.png",
                    "itemType": null,
                    "flag5G": "Y",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "25000",
                        "max": "35900"
                    },
                    "promotionPrice": {
                        "min": "17800",
                        "max": "35900"
                    },
                    "subProducts": [
                        {
                            "productId": 94740,
                            "name": "iPhone 12 256GB",
                            "model": "IP12_256GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/consumer/store/devices/apple/iphone/iphone-12-series/iphone-12/product-detail/en/red/iphone-12-pdp-position-1a-color-product-red-en.png",
                            "normalPrice": {
                                "min": "31900",
                                "max": "35900"
                            },
                            "promotionPrice": {
                                "min": "24700",
                                "max": "35900"
                            }
                        },
                        {
                            "productId": 94730,
                            "name": "iPhone 12 128GB",
                            "model": "IP12_128GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th-iphone_12_white_pdp_image_position-1a_1.jpg",
                            "normalPrice": {
                                "min": "31900",
                                "max": "31900"
                            },
                            "promotionPrice": {
                                "min": "24700",
                                "max": "31900"
                            }
                        },
                        {
                            "productId": 94710,
                            "name": "iPhone 12 64GB",
                            "model": "IP12_64GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th-iphone_12_white_pdp_image_position-1a.jpg",
                            "normalPrice": {
                                "min": "25000",
                                "max": "29900"
                            },
                            "promotionPrice": {
                                "min": "17800",
                                "max": "29900"
                            }
                        }
                    ]
                },
                {
                    "productId": 93242,
                    "brand": "APPLE",
                    "name": "AIR4_64GB",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th-ipad_air_cellular_10.9_in_space_gray_850x850_2.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "24900",
                        "max": "24900"
                    },
                    "promotionPrice": {
                        "min": "24900",
                        "max": "24900"
                    },
                    "subProducts": [
                        {
                            "productId": 93242,
                            "name": "AIR4_64GB",
                            "model": "AIR4_64GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th-ipad_air_cellular_10.9_in_space_gray_850x850_2.jpg",
                            "normalPrice": {
                                "min": "24900",
                                "max": "24900"
                            },
                            "promotionPrice": {
                                "min": "24900",
                                "max": "24900"
                            }
                        }
                    ]
                },
                {
                    "productId": 93001,
                    "brand": "APPLE",
                    "name": "IPHONEXR128L",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "28900",
                        "max": "33900"
                    },
                    "promotionPrice": {
                        "min": "28900",
                        "max": "33900"
                    },
                    "subProducts": [
                        {
                            "productId": 93001,
                            "name": "IPHONEXR128L",
                            "model": "IPHONEXR128L",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "28900",
                                "max": "33900"
                            },
                            "promotionPrice": {
                                "min": "28900",
                                "max": "33900"
                            }
                        }
                    ]
                },
                {
                    "productId": 89348,
                    "brand": "APPLE",
                    "name": "PRO11WF1TB2",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "45400",
                        "max": "45400"
                    },
                    "promotionPrice": {
                        "min": "45400",
                        "max": "45400"
                    },
                    "subProducts": [
                        {
                            "productId": 89348,
                            "name": "PRO11WF1TB2",
                            "model": "PRO11WF1TB2",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "45400",
                                "max": "45400"
                            },
                            "promotionPrice": {
                                "min": "45400",
                                "max": "45400"
                            }
                        }
                    ]
                },
                {
                    "productId": 89339,
                    "brand": "APPLE",
                    "name": "PRO11WF512GB2",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th_ipad_pro_2nd_generation_gps_silver_aluminum_11in_pdp_us_1a_1_4.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "38400",
                        "max": "38400"
                    },
                    "promotionPrice": {
                        "min": "38400",
                        "max": "38400"
                    },
                    "subProducts": [
                        {
                            "productId": 89339,
                            "name": "PRO11WF512GB2",
                            "model": "PRO11WF512GB2",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th_ipad_pro_2nd_generation_gps_silver_aluminum_11in_pdp_us_1a_1_4.jpg",
                            "normalPrice": {
                                "min": "38400",
                                "max": "38400"
                            },
                            "promotionPrice": {
                                "min": "38400",
                                "max": "38400"
                            }
                        }
                    ]
                },
                {
                    "productId": 89325,
                    "brand": "APPLE",
                    "name": "PRO11WF256GB2",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th_ipad_pro_2nd_generation_gps_space_gray_aluminum_11in_pdp_us_1a_1_2.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "31400",
                        "max": "31400"
                    },
                    "promotionPrice": {
                        "min": "31400",
                        "max": "31400"
                    },
                    "subProducts": [
                        {
                            "productId": 89325,
                            "name": "PRO11WF256GB2",
                            "model": "PRO11WF256GB2",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th_ipad_pro_2nd_generation_gps_space_gray_aluminum_11in_pdp_us_1a_1_2.jpg",
                            "normalPrice": {
                                "min": "31400",
                                "max": "31400"
                            },
                            "promotionPrice": {
                                "min": "31400",
                                "max": "31400"
                            }
                        }
                    ]
                },
                {
                    "productId": 89321,
                    "brand": "APPLE",
                    "name": "PRO11WF128GB2",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th_ipad_pro_2nd_generation_gps_silver_aluminum_11in_pdp_us_1a_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "27900",
                        "max": "27900"
                    },
                    "promotionPrice": {
                        "min": "27900",
                        "max": "27900"
                    },
                    "subProducts": [
                        {
                            "productId": 89321,
                            "name": "PRO11WF128GB2",
                            "model": "PRO11WF128GB2",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th_ipad_pro_2nd_generation_gps_silver_aluminum_11in_pdp_us_1a_1.jpg",
                            "normalPrice": {
                                "min": "27900",
                                "max": "27900"
                            },
                            "promotionPrice": {
                                "min": "27900",
                                "max": "27900"
                            }
                        }
                    ]
                },
                {
                    "productId": 88104,
                    "brand": "APPLE",
                    "name": "IPHONE8P128L",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone8plus-spgry-pureangles_850x850_rv1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "18400",
                        "max": "18400"
                    },
                    "promotionPrice": {
                        "min": "18400",
                        "max": "18400"
                    },
                    "subProducts": [
                        {
                            "productId": 88104,
                            "name": "IPHONE8P128L",
                            "model": "IPHONE8P128L",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone8plus-spgry-pureangles_850x850_rv1.jpg",
                            "normalPrice": {
                                "min": "18400",
                                "max": "18400"
                            },
                            "promotionPrice": {
                                "min": "18400",
                                "max": "18400"
                            }
                        }
                    ]
                },
                {
                    "productId": 85409,
                    "brand": "APPLE",
                    "name": "iPhone 11 Pro",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_pro_position_1_850x850_2_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "13990",
                        "max": "48900"
                    },
                    "promotionPrice": {
                        "min": "4290",
                        "max": "48900"
                    },
                    "subProducts": [
                        {
                            "productId": 85409,
                            "name": "iPhone 11 Pro 256GB",
                            "model": "IPHONE11P256",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_pro_position_1_850x850_2_1.jpg",
                            "normalPrice": {
                                "min": "13990",
                                "max": "41900"
                            },
                            "promotionPrice": {
                                "min": "4290",
                                "max": "41900"
                            }
                        },
                        {
                            "productId": 85397,
                            "name": "iPhone 11 Pro 64GB",
                            "model": "IPHONE11P64",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_pro_position_1_850x850_2.jpg",
                            "normalPrice": {
                                "min": "35900",
                                "max": "35900"
                            },
                            "promotionPrice": {
                                "min": "26200",
                                "max": "35900"
                            }
                        },
                        {
                            "productId": 85385,
                            "name": "iPhone 11 Pro 512GB",
                            "model": "IPHONE11P512",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "48900",
                                "max": "48900"
                            },
                            "promotionPrice": {
                                "min": "38200",
                                "max": "48900"
                            }
                        }
                    ]
                },
                {
                    "productId": 85398,
                    "brand": "APPLE",
                    "name": "iPhone 11 Pro Max",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_pro_max_position_1_850x850_2_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "39900",
                        "max": "60000"
                    },
                    "promotionPrice": {
                        "min": "29200",
                        "max": "60000"
                    },
                    "subProducts": [
                        {
                            "productId": 85398,
                            "name": "iPhone 11 Pro Max 64GB",
                            "model": "IPHONE11PM64",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_pro_max_position_1_850x850_2_1.jpg",
                            "normalPrice": {
                                "min": "39900",
                                "max": "39900"
                            },
                            "promotionPrice": {
                                "min": "29200",
                                "max": "39900"
                            }
                        },
                        {
                            "productId": 85388,
                            "name": "iPhone 11 Pro Max 512GB",
                            "model": "IPHONE11PM512",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_pro_max_position_1_850x850_2.jpg",
                            "normalPrice": {
                                "min": "52900",
                                "max": "60000"
                            },
                            "promotionPrice": {
                                "min": "43200",
                                "max": "60000"
                            }
                        },
                        {
                            "productId": 85386,
                            "name": "iPhone 11 Pro Max 256GB",
                            "model": "IPHONE11PM256",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_pro_max_position_1_850x850_2_2.jpg",
                            "normalPrice": {
                                "min": "45900",
                                "max": "45900"
                            },
                            "promotionPrice": {
                                "min": "36200",
                                "max": "45900"
                            }
                        }
                    ]
                },
                {
                    "productId": 85302,
                    "brand": "APPLE",
                    "name": "IPAD7WF128",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_7_gold_850x850_1_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "18400",
                        "max": "18400"
                    },
                    "promotionPrice": {
                        "min": "6400",
                        "max": "18400"
                    },
                    "subProducts": [
                        {
                            "productId": 85302,
                            "name": "IPAD7WF128",
                            "model": "IPAD7WF128",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad_7_gold_850x850_1_1.jpg",
                            "normalPrice": {
                                "min": "18400",
                                "max": "18400"
                            },
                            "promotionPrice": {
                                "min": "6400",
                                "max": "18400"
                            }
                        }
                    ]
                },
                {
                    "productId": 85283,
                    "brand": "APPLE",
                    "name": "IPAD7TH128",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th_ipad_silver_cellular_850x850_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "18400",
                        "max": "61000"
                    },
                    "promotionPrice": {
                        "min": "16400",
                        "max": "60000"
                    },
                    "subProducts": [
                        {
                            "productId": 85283,
                            "name": "IPAD7TH128",
                            "model": "IPAD7TH128",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/th_ipad_silver_cellular_850x850_1.jpg",
                            "normalPrice": {
                                "min": "18400",
                                "max": "61000"
                            },
                            "promotionPrice": {
                                "min": "16400",
                                "max": "60000"
                            }
                        }
                    ]
                },
                {
                    "productId": 80957,
                    "brand": "APPLE",
                    "name": "iPhone Xs MAX",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-1_2.jpg",
                    "itemType": null,
                    "flag5G": "Y",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "6420",
                        "max": "57900"
                    },
                    "promotionPrice": {
                        "min": "-5580",
                        "max": "57900"
                    },
                    "subProducts": [
                        {
                            "productId": 80957,
                            "name": "iPhone Xs MAX 256GB",
                            "model": "IPHONEXSM256",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-1_4.jpg",
                            "normalPrice": {
                                "min": "6420",
                                "max": "24500"
                            },
                            "promotionPrice": {
                                "min": "-5580",
                                "max": "24500"
                            }
                        },
                        {
                            "productId": 76822,
                            "name": "iPhone Xs MAX 512GB",
                            "model": "IPHONEXSM512",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-1_2.jpg",
                            "normalPrice": {
                                "min": "33000",
                                "max": "57900"
                            },
                            "promotionPrice": {
                                "min": "31000",
                                "max": "57900"
                            }
                        },
                        {
                            "productId": 76782,
                            "name": "iPhone Xs MAX 64GB",
                            "model": "IPHONEXSM64",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-1_1.jpg",
                            "normalPrice": {
                                "min": "43900",
                                "max": "43900"
                            },
                            "promotionPrice": {
                                "min": "43900",
                                "max": "43900"
                            }
                        }
                    ]
                },
                {
                    "productId": 76859,
                    "brand": "APPLE",
                    "name": "iPhone Xs",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexs-silver-pureangles-1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "39900",
                        "max": "55000"
                    },
                    "promotionPrice": {
                        "min": "39900",
                        "max": "54000"
                    },
                    "subProducts": [
                        {
                            "productId": 76859,
                            "name": "iPhone Xs 512GB",
                            "model": "IPHONEXS512",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexs-silver-pureangles-1.jpg",
                            "normalPrice": {
                                "min": "50400",
                                "max": "55000"
                            },
                            "promotionPrice": {
                                "min": "47400",
                                "max": "54000"
                            }
                        },
                        {
                            "productId": 76852,
                            "name": "iPhone Xs 256GB",
                            "model": "IPHONEXS256",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexs-silver-pureangles-1_1.jpg",
                            "normalPrice": {
                                "min": "45900",
                                "max": "45900"
                            },
                            "promotionPrice": {
                                "min": "40000",
                                "max": "45900"
                            }
                        },
                        {
                            "productId": 76809,
                            "name": "iPhone Xs 64GB",
                            "model": "IPHONEXS64",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexs-silver-pureangles-1_2.jpg",
                            "normalPrice": {
                                "min": "39900",
                                "max": "39900"
                            },
                            "promotionPrice": {
                                "min": "39900",
                                "max": "39900"
                            }
                        }
                    ]
                },
                {
                    "productId": 76846,
                    "brand": "APPLE",
                    "name": "iPhone Xr",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexr-yellow-pureangles-1_2.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "21900",
                        "max": "60000"
                    },
                    "promotionPrice": {
                        "min": "17400",
                        "max": "55400"
                    },
                    "subProducts": [
                        {
                            "productId": 76846,
                            "name": "iPhone Xr 256GB",
                            "model": "IPHONEXR256",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "35900",
                                "max": "60000"
                            },
                            "promotionPrice": {
                                "min": "31300",
                                "max": "55400"
                            }
                        },
                        {
                            "productId": 76834,
                            "name": "iPhone Xr 128GB",
                            "model": "IPHONEXR128",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexr-yellow-pureangles-1_2.jpg",
                            "normalPrice": {
                                "min": "21900",
                                "max": "21900"
                            },
                            "promotionPrice": {
                                "min": "17400",
                                "max": "21900"
                            }
                        },
                        {
                            "productId": 76800,
                            "name": "iPhone Xr 64GB",
                            "model": "IPHONEXR64",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexr-yellow-pureangles-1_3.jpg",
                            "normalPrice": {
                                "min": "29500",
                                "max": "29900"
                            },
                            "promotionPrice": {
                                "min": "24500",
                                "max": "24900"
                            }
                        }
                    ]
                },
                {
                    "productId": 73518,
                    "brand": "APPLE",
                    "name": "iPhone 8 Plus",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone8plus_red_850x850_1.jpg",
                    "itemType": null,
                    "flag5G": "Y",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "33000",
                        "max": "39000"
                    },
                    "promotionPrice": {
                        "min": "10000",
                        "max": "39000"
                    },
                    "subProducts": [
                        {
                            "productId": 73518,
                            "name": "APPLE iPhone 8 Plus 256GB",
                            "model": "IPHONE8P256",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone8plus_red_850x850_1.jpg",
                            "normalPrice": {
                                "min": "39000",
                                "max": "39000"
                            },
                            "promotionPrice": {
                                "min": "37000",
                                "max": "39000"
                            }
                        },
                        {
                            "productId": 73516,
                            "name": "APPLE iPhone 8 Plus 64GB",
                            "model": "IPHONE8P64",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone8plus_red_850x850.jpg",
                            "normalPrice": {
                                "min": "33000",
                                "max": "33000"
                            },
                            "promotionPrice": {
                                "min": "10000",
                                "max": "33000"
                            }
                        }
                    ]
                },
                {
                    "productId": 73514,
                    "brand": "APPLE",
                    "name": "iPhone 8",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone8_red_850x850_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "7500",
                        "max": "33500"
                    },
                    "promotionPrice": {
                        "min": "6500",
                        "max": "33500"
                    },
                    "subProducts": [
                        {
                            "productId": 73514,
                            "name": "APPLE iPhone 8 256GB",
                            "model": "IPHONE8256",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone8_red_850x850_1.jpg",
                            "normalPrice": {
                                "min": "33500",
                                "max": "33500"
                            },
                            "promotionPrice": {
                                "min": "26500",
                                "max": "33500"
                            }
                        },
                        {
                            "productId": 73512,
                            "name": "APPLE iPhone 8 64GB",
                            "model": "IPHONE864",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone8_red_850x850.jpg",
                            "normalPrice": {
                                "min": "7500",
                                "max": "30000"
                            },
                            "promotionPrice": {
                                "min": "6500",
                                "max": "30000"
                            }
                        }
                    ]
                },
                {
                    "productId": 70424,
                    "brand": "APPLE",
                    "name": "iPhone X",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonex-svr_850x850_2.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "17990",
                        "max": "40000"
                    },
                    "promotionPrice": {
                        "min": "17990",
                        "max": "40000"
                    },
                    "subProducts": [
                        {
                            "productId": 70424,
                            "name": "APPLE iPhone X 256GB",
                            "model": "IPHONEX256",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonex-svr_850x850_2.jpg",
                            "normalPrice": {
                                "min": "17990",
                                "max": "40000"
                            },
                            "promotionPrice": {
                                "min": "17990",
                                "max": "40000"
                            }
                        },
                        {
                            "productId": 70409,
                            "name": "APPLE iPhone X 64GB",
                            "model": "IPHONEX64",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonex-svr_850x850.jpg",
                            "normalPrice": {
                                "min": "39000",
                                "max": "39000"
                            },
                            "promotionPrice": {
                                "min": "31000",
                                "max": "39000"
                            }
                        }
                    ]
                },
                {
                    "productId": 70371,
                    "brand": "APPLE",
                    "name": "IPHONE732",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone7plus-silver-pureangles_2_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "18900",
                        "max": "26500"
                    },
                    "promotionPrice": {
                        "min": "18900",
                        "max": "26500"
                    },
                    "subProducts": [
                        {
                            "productId": 70371,
                            "name": "IPHONE732",
                            "model": "IPHONE732",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone7plus-silver-pureangles_2_1.jpg",
                            "normalPrice": {
                                "min": "18900",
                                "max": "26500"
                            },
                            "promotionPrice": {
                                "min": "18900",
                                "max": "26500"
                            }
                        }
                    ]
                },
                {
                    "productId": 63806,
                    "brand": "APPLE",
                    "name": "IPHONE 6S",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-silver-pureangles_4.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "11000",
                        "max": "11000"
                    },
                    "promotionPrice": {
                        "min": "11000",
                        "max": "11000"
                    },
                    "subProducts": [
                        {
                            "productId": 63806,
                            "name": "APPLE iPhone 6s 32GB",
                            "model": "IPHONE6S32",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s-silver-pureangles_4.jpg",
                            "normalPrice": {
                                "min": "11000",
                                "max": "11000"
                            },
                            "promotionPrice": {
                                "min": "11000",
                                "max": "11000"
                            }
                        }
                    ]
                },
                {
                    "productId": 56973,
                    "brand": "APPLE",
                    "name": "IPHONE6SP64",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6splus-silver-pureangles_1_3.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "25000",
                        "max": "35100"
                    },
                    "promotionPrice": {
                        "min": "25000",
                        "max": "35100"
                    },
                    "subProducts": [
                        {
                            "productId": 56973,
                            "name": "IPHONE6SP64",
                            "model": "IPHONE6SP64",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6splus-silver-pureangles_1_3.jpg",
                            "normalPrice": {
                                "min": "25000",
                                "max": "35100"
                            },
                            "promotionPrice": {
                                "min": "25000",
                                "max": "35100"
                            }
                        }
                    ]
                },
                {
                    "productId": 56693,
                    "brand": "APPLE",
                    "name": "IPAD MINI4",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "20900",
                        "max": "20900"
                    },
                    "promotionPrice": {
                        "min": "20900",
                        "max": "20900"
                    },
                    "subProducts": [
                        {
                            "productId": 56693,
                            "name": "APPLE iPad Mini4 64GB",
                            "model": "MINI464GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "20900",
                                "max": "20900"
                            },
                            "promotionPrice": {
                                "min": "20900",
                                "max": "20900"
                            }
                        }
                    ]
                },
                {
                    "productId": 51698,
                    "brand": "APPLE",
                    "name": "IPHONE 6 PLUS",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ip6-silver-01_5_2.png",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "15000",
                        "max": "37300"
                    },
                    "promotionPrice": {
                        "min": "12500",
                        "max": "37300"
                    },
                    "subProducts": [
                        {
                            "productId": 51698,
                            "name": "APPLE iPhone 6 Plus 128GB",
                            "model": "I6P 128GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ip6-silver-01_5_2.png",
                            "normalPrice": {
                                "min": "35500",
                                "max": "37300"
                            },
                            "promotionPrice": {
                                "min": "35500",
                                "max": "37300"
                            }
                        },
                        {
                            "productId": 51650,
                            "name": "APPLE iPhone 6 Plus 64GB",
                            "model": "I6P 64GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s_plus_svr_850x850_1_1_1.jpg",
                            "normalPrice": {
                                "min": "29500",
                                "max": "34000"
                            },
                            "promotionPrice": {
                                "min": "29500",
                                "max": "34000"
                            }
                        },
                        {
                            "productId": 51621,
                            "name": "APPLE iPhone 6 Plus 16GB",
                            "model": "I6P 16GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone6s_plus_gld_850x850_1_3_2.jpg",
                            "normalPrice": {
                                "min": "15000",
                                "max": "29400"
                            },
                            "promotionPrice": {
                                "min": "12500",
                                "max": "29400"
                            }
                        }
                    ]
                },
                {
                    "productId": 47702,
                    "brand": "APPLE",
                    "name": "IPAD AIR",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-sliver-front_5.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "21000",
                        "max": "45500"
                    },
                    "promotionPrice": {
                        "min": "21000",
                        "max": "43000"
                    },
                    "subProducts": [
                        {
                            "productId": 47702,
                            "name": "APPLE iPad Air 128GB",
                            "model": "IPADAIR128GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-sliver-front_5.jpg",
                            "normalPrice": {
                                "min": "31500",
                                "max": "31500"
                            },
                            "promotionPrice": {
                                "min": "29500",
                                "max": "30000"
                            }
                        },
                        {
                            "productId": 47698,
                            "name": "APPLE iPad Air 64GB",
                            "model": "IPAD AIR64GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-sliver-front_3.jpg",
                            "normalPrice": {
                                "min": "45500",
                                "max": "45500"
                            },
                            "promotionPrice": {
                                "min": "42500",
                                "max": "43000"
                            }
                        },
                        {
                            "productId": 47690,
                            "name": "APPLE iPad Air 32GB",
                            "model": "IPAD AIR32GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-sliver-front_2.jpg",
                            "normalPrice": {
                                "min": "24500",
                                "max": "24500"
                            },
                            "promotionPrice": {
                                "min": "24500",
                                "max": "24500"
                            }
                        },
                        {
                            "productId": 47611,
                            "name": "APPLE iPad Air 16GB",
                            "model": "IPAD AIR16GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipadair-sliver-front.jpg",
                            "normalPrice": {
                                "min": "21000",
                                "max": "26000"
                            },
                            "promotionPrice": {
                                "min": "21000",
                                "max": "26000"
                            }
                        }
                    ]
                },
                {
                    "productId": 47595,
                    "brand": "APPLE",
                    "name": "IPAD MINI2",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad-mini-front-white_3.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "2000",
                        "max": "66900"
                    },
                    "promotionPrice": {
                        "min": "2000",
                        "max": "66900"
                    },
                    "subProducts": [
                        {
                            "productId": 47595,
                            "name": "APPLE iPad Mini2 128GB",
                            "model": "IPADMN2128GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "21900",
                                "max": "28400"
                            },
                            "promotionPrice": {
                                "min": "21900",
                                "max": "28400"
                            }
                        },
                        {
                            "productId": 47587,
                            "name": "APPLE iPad Mini2 64GB",
                            "model": "IPADMN264GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad-mini-front-white_3.jpg",
                            "normalPrice": {
                                "min": "24900",
                                "max": "66900"
                            },
                            "promotionPrice": {
                                "min": "24900",
                                "max": "66900"
                            }
                        },
                        {
                            "productId": 47559,
                            "name": "APPLE iPad Mini2 32GB",
                            "model": "IPADMN232GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad-mini-front-white_1.jpg",
                            "normalPrice": {
                                "min": "2000",
                                "max": "52900"
                            },
                            "promotionPrice": {
                                "min": "2000",
                                "max": "52900"
                            }
                        },
                        {
                            "productId": 47527,
                            "name": "APPLE iPad Mini2 16GB",
                            "model": "IPADMN216GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ipad-mini-front-white.jpg",
                            "normalPrice": {
                                "min": "17900",
                                "max": "40900"
                            },
                            "promotionPrice": {
                                "min": "17900",
                                "max": "40900"
                            }
                        }
                    ]
                },
                {
                    "productId": 46827,
                    "brand": "APPLE",
                    "name": "IPHONE 5S",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/silver-48-front-resize_new_5.png",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "15000",
                        "max": "31950"
                    },
                    "promotionPrice": {
                        "min": "15000",
                        "max": "31950"
                    },
                    "subProducts": [
                        {
                            "productId": 46827,
                            "name": "TRADE IN-APPLE iPhone 5s 64GB",
                            "model": "IPHONE5S 64GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/silver-48-front-resize_new_5.png",
                            "normalPrice": {
                                "min": "20000",
                                "max": "31950"
                            },
                            "promotionPrice": {
                                "min": "20000",
                                "max": "31950"
                            }
                        },
                        {
                            "productId": 46818,
                            "name": "TRADE IN-APPLE iPhone 5s 32GB",
                            "model": "IPHONE5S 32GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/silver-48-front-resize_new_3.png",
                            "normalPrice": {
                                "min": "28250",
                                "max": "29900"
                            },
                            "promotionPrice": {
                                "min": "28250",
                                "max": "29900"
                            }
                        },
                        {
                            "productId": 46808,
                            "name": "TRADE IN-APPLE iPhone 5s 16GB",
                            "model": "IPHONE5S 16GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone5s_svr_850x850.jpg",
                            "normalPrice": {
                                "min": "15000",
                                "max": "24550"
                            },
                            "promotionPrice": {
                                "min": "15000",
                                "max": "24550"
                            }
                        }
                    ]
                },
                {
                    "productId": 46804,
                    "brand": "APPLE",
                    "name": "IPHONE 5C",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/white-01_2.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "7990",
                        "max": "24550"
                    },
                    "promotionPrice": {
                        "min": "7990",
                        "max": "24550"
                    },
                    "subProducts": [
                        {
                            "productId": 46804,
                            "name": "TRADE IN-APPLE iPhone 5c 32GB",
                            "model": "IPHONE5C 32GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/white-01_2.jpg",
                            "normalPrice": {
                                "min": "17000",
                                "max": "24550"
                            },
                            "promotionPrice": {
                                "min": "17000",
                                "max": "24550"
                            }
                        },
                        {
                            "productId": 46795,
                            "name": "TRADE IN-APPLE iPhone 5c 16GB",
                            "model": "IPHONE5C 16GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "7990",
                                "max": "20700"
                            },
                            "promotionPrice": {
                                "min": "7990",
                                "max": "20700"
                            }
                        }
                    ]
                },
                {
                    "productId": 43115,
                    "brand": "APPLE",
                    "name": "IPHONE 5",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone5-white-01_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "12000",
                        "max": "31950"
                    },
                    "promotionPrice": {
                        "min": "12000",
                        "max": "31950"
                    },
                    "subProducts": [
                        {
                            "productId": 43115,
                            "name": "IPHONE5 16GB",
                            "model": "IPHONE5 16GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone5-white-01_1.jpg",
                            "normalPrice": {
                                "min": "12000",
                                "max": "24550"
                            },
                            "promotionPrice": {
                                "min": "12000",
                                "max": "24550"
                            }
                        },
                        {
                            "productId": 43111,
                            "name": "IPHONE5 64GB",
                            "model": "IPHONE5 64GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "31950",
                                "max": "31950"
                            },
                            "promotionPrice": {
                                "min": "31950",
                                "max": "31950"
                            }
                        },
                        {
                            "productId": 43109,
                            "name": "IPHONE5 32GB",
                            "model": "IPHONE5 32GB",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphone5-black-01_3.jpg",
                            "normalPrice": {
                                "min": "28250",
                                "max": "28250"
                            },
                            "promotionPrice": {
                                "min": "28250",
                                "max": "28250"
                            }
                        }
                    ]
                },
                {
                    "productId": 19206,
                    "brand": "APPLE",
                    "name": "ABC-4s",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "20000",
                        "max": "23807"
                    },
                    "promotionPrice": {
                        "min": "20000",
                        "max": "23807"
                    },
                    "subProducts": [
                        {
                            "productId": 19206,
                            "name": "ABC-4s-16GB",
                            "model": "IPHONE4 16GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "20000",
                                "max": "23807"
                            },
                            "promotionPrice": {
                                "min": "20000",
                                "max": "23807"
                            }
                        }
                    ]
                },
                {
                    "productId": 6171,
                    "brand": "APPLE",
                    "name": "IPHONE 3GS 8GB",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "13900",
                        "max": "13900"
                    },
                    "promotionPrice": {
                        "min": "13900",
                        "max": "13900"
                    },
                    "subProducts": [
                        {
                            "productId": 6171,
                            "name": "IPHONE 3GS 8GB",
                            "model": "IPHONE 3GS 8GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "13900",
                                "max": "13900"
                            },
                            "promotionPrice": {
                                "min": "13900",
                                "max": "13900"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "brand": "OPPO",
            "products": [
                {
                    "productId": 694350,
                    "brand": "OPPO",
                    "name": "A3S32G-1853SL",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "5990",
                        "max": "11500"
                    },
                    "promotionPrice": {
                        "min": "5990",
                        "max": "11500"
                    },
                    "subProducts": [
                        {
                            "productId": 694350,
                            "name": "A3S32G-1853SL",
                            "model": "A3S32G-1853SL",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "5990",
                                "max": "11500"
                            },
                            "promotionPrice": {
                                "min": "5990",
                                "max": "11500"
                            }
                        }
                    ]
                },
                {
                    "productId": 684460,
                    "brand": "OPPO",
                    "name": "CPH1969-F11PRO",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo_f11pro_green_01_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "31900",
                        "max": "31900"
                    },
                    "promotionPrice": {
                        "min": "31900",
                        "max": "31900"
                    },
                    "subProducts": [
                        {
                            "productId": 684460,
                            "name": "CPH1969-F11PRO",
                            "model": "CPH1969-F11PRO",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo_f11pro_green_01_1.jpg",
                            "normalPrice": {
                                "min": "31900",
                                "max": "31900"
                            },
                            "promotionPrice": {
                                "min": "31900",
                                "max": "31900"
                            }
                        }
                    ]
                },
                {
                    "productId": 684119,
                    "brand": "OPPO",
                    "name": "N5206",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "6000",
                        "max": "6000"
                    },
                    "promotionPrice": {
                        "min": "6000",
                        "max": "6000"
                    },
                    "subProducts": [
                        {
                            "productId": 684119,
                            "name": "N5206",
                            "model": "N5206",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "6000",
                                "max": "6000"
                            },
                            "promotionPrice": {
                                "min": "6000",
                                "max": "6000"
                            }
                        }
                    ]
                },
                {
                    "productId": 641334,
                    "brand": "OPPO",
                    "name": "A51F",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/small_image.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "7990",
                        "max": "7990"
                    },
                    "promotionPrice": {
                        "min": "7990",
                        "max": "7990"
                    },
                    "subProducts": [
                        {
                            "productId": 641334,
                            "name": "A51F",
                            "model": "A51F",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/small_image.jpg",
                            "normalPrice": {
                                "min": "7990",
                                "max": "7990"
                            },
                            "promotionPrice": {
                                "min": "7990",
                                "max": "7990"
                            }
                        }
                    ]
                },
                {
                    "productId": 641226,
                    "brand": "OPPO",
                    "name": "CPH1819-F764",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo_f7silver-side.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "9990",
                        "max": "10990"
                    },
                    "promotionPrice": {
                        "min": "9990",
                        "max": "10990"
                    },
                    "subProducts": [
                        {
                            "productId": 641226,
                            "name": "CPH1819-F764",
                            "model": "CPH1819-F764",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo_f7silver-side.jpg",
                            "normalPrice": {
                                "min": "9990",
                                "max": "10990"
                            },
                            "promotionPrice": {
                                "min": "9990",
                                "max": "10990"
                            }
                        }
                    ]
                },
                {
                    "productId": 641184,
                    "brand": "OPPO",
                    "name": "A71(2018)SL",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "8900",
                        "max": "19800"
                    },
                    "promotionPrice": {
                        "min": "8900",
                        "max": "19800"
                    },
                    "subProducts": [
                        {
                            "productId": 641184,
                            "name": "A71(2018)SL",
                            "model": "A71(2018)SL",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "8900",
                                "max": "19800"
                            },
                            "promotionPrice": {
                                "min": "8900",
                                "max": "19800"
                            }
                        }
                    ]
                },
                {
                    "productId": 606288,
                    "brand": "OPPO",
                    "name": "A37FW",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "4990",
                        "max": "4990"
                    },
                    "promotionPrice": {
                        "min": "4990",
                        "max": "4990"
                    },
                    "subProducts": [
                        {
                            "productId": 606288,
                            "name": "OPPO A37",
                            "model": "A37FW",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "4990",
                                "max": "4990"
                            },
                            "promotionPrice": {
                                "min": "4990",
                                "max": "4990"
                            }
                        }
                    ]
                },
                {
                    "productId": 606242,
                    "brand": "OPPO",
                    "name": "OPPO F1F",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo-f1-rg_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "5990",
                        "max": "5990"
                    },
                    "promotionPrice": {
                        "min": "2990",
                        "max": "4990"
                    },
                    "subProducts": [
                        {
                            "productId": 606242,
                            "name": "OPPO F1",
                            "model": "F1F",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo-f1-rg_1.jpg",
                            "normalPrice": {
                                "min": "5990",
                                "max": "5990"
                            },
                            "promotionPrice": {
                                "min": "2990",
                                "max": "4990"
                            }
                        }
                    ]
                },
                {
                    "productId": 549276,
                    "brand": "OPPO",
                    "name": "OPPO A2019",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "9900",
                        "max": "9900"
                    },
                    "promotionPrice": {
                        "min": "9900",
                        "max": "9900"
                    },
                    "subProducts": [
                        {
                            "productId": 549276,
                            "name": "A2019",
                            "model": "A2019",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "9900",
                                "max": "9900"
                            },
                            "promotionPrice": {
                                "min": "9900",
                                "max": "9900"
                            }
                        }
                    ]
                },
                {
                    "productId": 119991,
                    "brand": "OPPO",
                    "name": "FN2FLIP_8/256W",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "4000",
                        "max": "4000"
                    },
                    "promotionPrice": {
                        "min": "4000",
                        "max": "4000"
                    },
                    "subProducts": [
                        {
                            "productId": 119991,
                            "name": "FN2FLIP_8/256W",
                            "model": "FN2FLIP_8/256W",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "4000",
                                "max": "4000"
                            },
                            "promotionPrice": {
                                "min": "4000",
                                "max": "4000"
                            }
                        }
                    ]
                },
                {
                    "productId": 119990,
                    "brand": "OPPO",
                    "name": "FN2FLIP_8/256",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "4000",
                        "max": "4000"
                    },
                    "promotionPrice": {
                        "min": "4000",
                        "max": "4000"
                    },
                    "subProducts": [
                        {
                            "productId": 119990,
                            "name": "FN2FLIP_8/256",
                            "model": "FN2FLIP_8/256",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "4000",
                                "max": "4000"
                            },
                            "promotionPrice": {
                                "min": "4000",
                                "max": "4000"
                            }
                        }
                    ]
                },
                {
                    "productId": 108398,
                    "brand": "OPPO",
                    "name": "RN6Z5G_8/128",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "12990",
                        "max": "12990"
                    },
                    "promotionPrice": {
                        "min": "12990",
                        "max": "12990"
                    },
                    "subProducts": [
                        {
                            "productId": 108398,
                            "name": "RN6Z5G_8/128",
                            "model": "RN6Z5G_8/128",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "12990",
                                "max": "12990"
                            },
                            "promotionPrice": {
                                "min": "12990",
                                "max": "12990"
                            }
                        }
                    ]
                },
                {
                    "productId": 105626,
                    "brand": "OPPO",
                    "name": "A74_6/128GB",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "7999",
                        "max": "7999"
                    },
                    "promotionPrice": {
                        "min": "6999",
                        "max": "7499"
                    },
                    "subProducts": [
                        {
                            "productId": 105626,
                            "name": "A74_6/128GB",
                            "model": "A74_6/128GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "7999",
                                "max": "7999"
                            },
                            "promotionPrice": {
                                "min": "6999",
                                "max": "7499"
                            }
                        }
                    ]
                },
                {
                    "productId": 105315,
                    "brand": "OPPO",
                    "name": "A94_8/128GB",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "8999",
                        "max": "8999"
                    },
                    "promotionPrice": {
                        "min": "8999",
                        "max": "8999"
                    },
                    "subProducts": [
                        {
                            "productId": 105315,
                            "name": "A94_8/128GB",
                            "model": "A94_8/128GB",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "8999",
                                "max": "8999"
                            },
                            "promotionPrice": {
                                "min": "8999",
                                "max": "8999"
                            }
                        }
                    ]
                },
                {
                    "productId": 93522,
                    "brand": "OPPO",
                    "name": "A31(4/128)-KK",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo-a31_850x850.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET BUNDLE",
                    "normalPrice": {
                        "min": "12500",
                        "max": "12500"
                    },
                    "promotionPrice": {
                        "min": "9500",
                        "max": "10500"
                    },
                    "subProducts": [
                        {
                            "productId": 93522,
                            "name": "A31(4/128)-KK",
                            "model": "A31(4/128)-KK",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo-a31_850x850.jpg",
                            "normalPrice": {
                                "min": "12500",
                                "max": "12500"
                            },
                            "promotionPrice": {
                                "min": "9500",
                                "max": "10500"
                            }
                        }
                    ]
                },
                {
                    "productId": 93516,
                    "brand": "OPPO",
                    "name": "RN4Z5G_8/128",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "13900",
                        "max": "13900"
                    },
                    "promotionPrice": {
                        "min": "13900",
                        "max": "13900"
                    },
                    "subProducts": [
                        {
                            "productId": 93516,
                            "name": "RN4Z5G_8/128",
                            "model": "RN4Z5G_8/128",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "13900",
                                "max": "13900"
                            },
                            "promotionPrice": {
                                "min": "13900",
                                "max": "13900"
                            }
                        }
                    ]
                },
                {
                    "productId": 93513,
                    "brand": "OPPO",
                    "name": "RN4P5G_12/256",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "12900",
                        "max": "18990"
                    },
                    "promotionPrice": {
                        "min": "11900",
                        "max": "18490"
                    },
                    "subProducts": [
                        {
                            "productId": 93513,
                            "name": "RN4P5G_12/256",
                            "model": "RN4P5G_12/256",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "12900",
                                "max": "18990"
                            },
                            "promotionPrice": {
                                "min": "11900",
                                "max": "18490"
                            }
                        }
                    ]
                },
                {
                    "productId": 92598,
                    "brand": "OPPO",
                    "name": "A53_4/64CDMSL",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo-a53_fancy-blue_850x850_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "5499",
                        "max": "5499"
                    },
                    "promotionPrice": {
                        "min": "2499",
                        "max": "4999"
                    },
                    "subProducts": [
                        {
                            "productId": 92598,
                            "name": "A53_4/64CDMSL",
                            "model": "A53_4/64CDMSL",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo-a53_fancy-blue_850x850_1.jpg",
                            "normalPrice": {
                                "min": "5499",
                                "max": "5499"
                            },
                            "promotionPrice": {
                                "min": "2499",
                                "max": "4999"
                            }
                        }
                    ]
                },
                {
                    "productId": 92560,
                    "brand": "OPPO",
                    "name": "RENO4_8/128",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/kv_oppo_reno4_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "12500",
                        "max": "12500"
                    },
                    "promotionPrice": {
                        "min": "9500",
                        "max": "10500"
                    },
                    "subProducts": [
                        {
                            "productId": 92560,
                            "name": "RENO4_8/128",
                            "model": "RENO4_8/128",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/kv_oppo_reno4_1.jpg",
                            "normalPrice": {
                                "min": "12500",
                                "max": "12500"
                            },
                            "promotionPrice": {
                                "min": "9500",
                                "max": "10500"
                            }
                        }
                    ]
                },
                {
                    "productId": 91738,
                    "brand": "OPPO",
                    "name": "A12(3/32)",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "9000",
                        "max": "13990"
                    },
                    "promotionPrice": {
                        "min": "9000",
                        "max": "13990"
                    },
                    "subProducts": [
                        {
                            "productId": 91738,
                            "name": "A12(3/32)",
                            "model": "A12(3/32)",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "9000",
                                "max": "13990"
                            },
                            "promotionPrice": {
                                "min": "9000",
                                "max": "13990"
                            }
                        }
                    ]
                },
                {
                    "productId": 89797,
                    "brand": "OPPO",
                    "name": "A12-3/32CDMSL",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "9900",
                        "max": "9900"
                    },
                    "promotionPrice": {
                        "min": "9900",
                        "max": "9900"
                    },
                    "subProducts": [
                        {
                            "productId": 89797,
                            "name": "A12-3/32CDMSL",
                            "model": "A12-3/32CDMSL",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "9900",
                                "max": "9900"
                            },
                            "promotionPrice": {
                                "min": "9900",
                                "max": "9900"
                            }
                        }
                    ]
                },
                {
                    "productId": 88862,
                    "brand": "OPPO",
                    "name": "A314/128CDMSL",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo_a31_850x850_black_1_3.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "5499",
                        "max": "5499"
                    },
                    "promotionPrice": {
                        "min": "1190",
                        "max": "4999"
                    },
                    "subProducts": [
                        {
                            "productId": 88862,
                            "name": "A314/128CDMSL",
                            "model": "A314/128CDMSL",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo_a31_850x850_black_1_3.jpg",
                            "normalPrice": {
                                "min": "5499",
                                "max": "5499"
                            },
                            "promotionPrice": {
                                "min": "1190",
                                "max": "4999"
                            }
                        }
                    ]
                },
                {
                    "productId": 85852,
                    "brand": "OPPO",
                    "name": "C1907-RENO2",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo-reno2_sunset_pink_850x850_1_1.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "17990",
                        "max": "17990"
                    },
                    "promotionPrice": {
                        "min": "17990",
                        "max": "17990"
                    },
                    "subProducts": [
                        {
                            "productId": 85852,
                            "name": "C1907-RENO2",
                            "model": "C1907-RENO2",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo-reno2_sunset_pink_850x850_1_1.jpg",
                            "normalPrice": {
                                "min": "17990",
                                "max": "17990"
                            },
                            "promotionPrice": {
                                "min": "17990",
                                "max": "17990"
                            }
                        }
                    ]
                },
                {
                    "productId": 85846,
                    "brand": "OPPO",
                    "name": "C1989-RENO2F",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "11990",
                        "max": "11990"
                    },
                    "promotionPrice": {
                        "min": "11990",
                        "max": "11990"
                    },
                    "subProducts": [
                        {
                            "productId": 85846,
                            "name": "C1989-RENO2F",
                            "model": "C1989-RENO2F",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "11990",
                                "max": "11990"
                            },
                            "promotionPrice": {
                                "min": "11990",
                                "max": "11990"
                            }
                        }
                    ]
                },
                {
                    "productId": 81215,
                    "brand": "OPPO",
                    "name": "A3S(3/32GB)SL",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "13500",
                        "max": "13500"
                    },
                    "promotionPrice": {
                        "min": "13500",
                        "max": "13500"
                    },
                    "subProducts": [
                        {
                            "productId": 81215,
                            "name": "A3S(3/32GB)SL",
                            "model": "A3S(3/32GB)SL",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "13500",
                                "max": "13500"
                            },
                            "promotionPrice": {
                                "min": "13500",
                                "max": "13500"
                            }
                        }
                    ]
                },
                {
                    "productId": 75618,
                    "brand": "OPPO",
                    "name": "A3S 16GB",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "25700",
                        "max": "27500"
                    },
                    "promotionPrice": {
                        "min": "25700",
                        "max": "27500"
                    },
                    "subProducts": [
                        {
                            "productId": 75618,
                            "name": "A3S 16GB",
                            "model": "A3S(2/16GB)",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "25700",
                                "max": "25700"
                            },
                            "promotionPrice": {
                                "min": "25700",
                                "max": "25700"
                            }
                        },
                        {
                            "productId": 75526,
                            "name": "A3S 16GB Sim Lock",
                            "model": "A3S(2/16GB)SL",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "27500",
                                "max": "27500"
                            },
                            "promotionPrice": {
                                "min": "27500",
                                "max": "27500"
                            }
                        }
                    ]
                },
                {
                    "productId": 72217,
                    "brand": "OPPO",
                    "name": "CPH1729-A83",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "6490",
                        "max": "6490"
                    },
                    "promotionPrice": {
                        "min": "6490",
                        "max": "6490"
                    },
                    "subProducts": [
                        {
                            "productId": 72217,
                            "name": "CPH1729-A83",
                            "model": "CPH1729-A83",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "6490",
                                "max": "6490"
                            },
                            "promotionPrice": {
                                "min": "6490",
                                "max": "6490"
                            }
                        }
                    ]
                },
                {
                    "productId": 55117,
                    "brand": "OPPO",
                    "name": "OPPO R8106",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "8490",
                        "max": "8490"
                    },
                    "promotionPrice": {
                        "min": "8490",
                        "max": "8490"
                    },
                    "subProducts": [
                        {
                            "productId": 55117,
                            "name": "OPPO R5",
                            "model": "R8106",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "8490",
                                "max": "8490"
                            },
                            "promotionPrice": {
                                "min": "8490",
                                "max": "8490"
                            }
                        }
                    ]
                },
                {
                    "productId": 50604,
                    "brand": "OPPO",
                    "name": "OPPO N1 Mini",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/n1-mini-mint-01.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "9990",
                        "max": "12990"
                    },
                    "promotionPrice": {
                        "min": "9990",
                        "max": "12990"
                    },
                    "subProducts": [
                        {
                            "productId": 50604,
                            "name": "OPPO N1 Mini",
                            "model": "N5111",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/n1-mini-mint-01.jpg",
                            "normalPrice": {
                                "min": "9990",
                                "max": "12990"
                            },
                            "promotionPrice": {
                                "min": "9990",
                                "max": "12990"
                            }
                        }
                    ]
                },
                {
                    "productId": 50254,
                    "brand": "OPPO",
                    "name": "OPPO Neo",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "4990",
                        "max": "5990"
                    },
                    "promotionPrice": {
                        "min": "4990",
                        "max": "5990"
                    },
                    "subProducts": [
                        {
                            "productId": 50254,
                            "name": "OPPO Neo 3",
                            "model": "R831K",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "5990",
                                "max": "5990"
                            },
                            "promotionPrice": {
                                "min": "5990",
                                "max": "5990"
                            }
                        },
                        {
                            "productId": 48572,
                            "name": "OPPO Neo",
                            "model": "R831",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "4990",
                                "max": "4990"
                            },
                            "promotionPrice": {
                                "min": "4990",
                                "max": "4990"
                            }
                        }
                    ]
                },
                {
                    "productId": 50193,
                    "brand": "OPPO",
                    "name": "OPPO Find 7",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "15990",
                        "max": "19990"
                    },
                    "promotionPrice": {
                        "min": "15990",
                        "max": "19990"
                    },
                    "subProducts": [
                        {
                            "productId": 50193,
                            "name": "OPPO Find 7",
                            "model": "X9076",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "19990",
                                "max": "19990"
                            },
                            "promotionPrice": {
                                "min": "19990",
                                "max": "19990"
                            }
                        },
                        {
                            "productId": 49464,
                            "name": "OPPO Find 7a",
                            "model": "X9006",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "15990",
                                "max": "15990"
                            },
                            "promotionPrice": {
                                "min": "15990",
                                "max": "15990"
                            }
                        }
                    ]
                },
                {
                    "productId": 50070,
                    "brand": "OPPO",
                    "name": "OPPO R2001",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "6990",
                        "max": "6990"
                    },
                    "promotionPrice": {
                        "min": "6990",
                        "max": "6990"
                    },
                    "subProducts": [
                        {
                            "productId": 50070,
                            "name": "OPPO Yoyo",
                            "model": "R2001",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "6990",
                                "max": "6990"
                            },
                            "promotionPrice": {
                                "min": "6990",
                                "max": "6990"
                            }
                        }
                    ]
                },
                {
                    "productId": 50068,
                    "brand": "OPPO",
                    "name": "OPPO R1001",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "3990",
                        "max": "3990"
                    },
                    "promotionPrice": {
                        "min": "3990",
                        "max": "3990"
                    },
                    "subProducts": [
                        {
                            "productId": 50068,
                            "name": "OPPO Joy",
                            "model": "R1001",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "3990",
                                "max": "3990"
                            },
                            "promotionPrice": {
                                "min": "3990",
                                "max": "3990"
                            }
                        }
                    ]
                },
                {
                    "productId": 48570,
                    "brand": "OPPO",
                    "name": "OPPO R829",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/white_back.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "2990",
                        "max": "11990"
                    },
                    "promotionPrice": {
                        "min": "2990",
                        "max": "11990"
                    },
                    "subProducts": [
                        {
                            "productId": 48570,
                            "name": "OPPO R1",
                            "model": "R829",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/white_back.jpg",
                            "normalPrice": {
                                "min": "2990",
                                "max": "11990"
                            },
                            "promotionPrice": {
                                "min": "2990",
                                "max": "11990"
                            }
                        }
                    ]
                },
                {
                    "productId": 48380,
                    "brand": "OPPO",
                    "name": "OPPO R827",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "8990",
                        "max": "8990"
                    },
                    "promotionPrice": {
                        "min": "8990",
                        "max": "8990"
                    },
                    "subProducts": [
                        {
                            "productId": 48380,
                            "name": "OPPO Find 5 Mini",
                            "model": "R827",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "8990",
                                "max": "8990"
                            },
                            "promotionPrice": {
                                "min": "8990",
                                "max": "8990"
                            }
                        }
                    ]
                },
                {
                    "productId": 48106,
                    "brand": "OPPO",
                    "name": "OPPO Find Way",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "8990",
                        "max": "9990"
                    },
                    "promotionPrice": {
                        "min": "8990",
                        "max": "9990"
                    },
                    "subProducts": [
                        {
                            "productId": 48106,
                            "name": "OPPO Find Way S",
                            "model": "U707",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "9990",
                                "max": "9990"
                            },
                            "promotionPrice": {
                                "min": "9990",
                                "max": "9990"
                            }
                        },
                        {
                            "productId": 45339,
                            "name": "OPPO Find Way",
                            "model": "U7015",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "8990",
                                "max": "8990"
                            },
                            "promotionPrice": {
                                "min": "8990",
                                "max": "8990"
                            }
                        }
                    ]
                },
                {
                    "productId": 48100,
                    "brand": "OPPO",
                    "name": "OPPO Find 5",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "4000",
                        "max": "12990"
                    },
                    "promotionPrice": {
                        "min": "4000",
                        "max": "12990"
                    },
                    "subProducts": [
                        {
                            "productId": 48100,
                            "name": "OPPO Find 5",
                            "model": "X909",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "4000",
                                "max": "12990"
                            },
                            "promotionPrice": {
                                "min": "4000",
                                "max": "12990"
                            }
                        }
                    ]
                },
                {
                    "productId": 48099,
                    "brand": "OPPO",
                    "name": "OPPO R815",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "5990",
                        "max": "5990"
                    },
                    "promotionPrice": {
                        "min": "5990",
                        "max": "5990"
                    },
                    "subProducts": [
                        {
                            "productId": 48099,
                            "name": "OPPO Find Clover",
                            "model": "R815",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "5990",
                                "max": "5990"
                            },
                            "promotionPrice": {
                                "min": "5990",
                                "max": "5990"
                            }
                        }
                    ]
                },
                {
                    "productId": 48009,
                    "brand": "OPPO",
                    "name": "OPPO N1",
                    "model": null,
                    "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo-n1-01.jpg",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "17990",
                        "max": "17990"
                    },
                    "promotionPrice": {
                        "min": "17990",
                        "max": "17990"
                    },
                    "subProducts": [
                        {
                            "productId": 48009,
                            "name": "OPPO N1",
                            "model": "N1",
                            "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/oppo-n1-01.jpg",
                            "normalPrice": {
                                "min": "17990",
                                "max": "17990"
                            },
                            "promotionPrice": {
                                "min": "17990",
                                "max": "17990"
                            }
                        }
                    ]
                },
                {
                    "productId": 46538,
                    "brand": "OPPO",
                    "name": "OPPO R819",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "9990",
                        "max": "9990"
                    },
                    "promotionPrice": {
                        "min": "9990",
                        "max": "9990"
                    },
                    "subProducts": [
                        {
                            "productId": 46538,
                            "name": "OPPO Find Mirror",
                            "model": "R819",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "9990",
                                "max": "9990"
                            },
                            "promotionPrice": {
                                "min": "9990",
                                "max": "9990"
                            }
                        }
                    ]
                },
                {
                    "productId": 46333,
                    "brand": "OPPO",
                    "name": "OPPO R821",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "3990",
                        "max": "3990"
                    },
                    "promotionPrice": {
                        "min": "3990",
                        "max": "3990"
                    },
                    "subProducts": [
                        {
                            "productId": 46333,
                            "name": "OPPO Find Muse",
                            "model": "R821",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "3990",
                                "max": "3990"
                            },
                            "promotionPrice": {
                                "min": "3990",
                                "max": "3990"
                            }
                        }
                    ]
                },
                {
                    "productId": 45337,
                    "brand": "OPPO",
                    "name": "OPPO R8113",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "4990",
                        "max": "4990"
                    },
                    "promotionPrice": {
                        "min": "4990",
                        "max": "4990"
                    },
                    "subProducts": [
                        {
                            "productId": 45337,
                            "name": "OPPO Find Piano",
                            "model": "R8113",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "4990",
                                "max": "4990"
                            },
                            "promotionPrice": {
                                "min": "4990",
                                "max": "4990"
                            }
                        }
                    ]
                },
                {
                    "productId": 45335,
                    "brand": "OPPO",
                    "name": "OPPO R8111",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "3290",
                        "max": "9000"
                    },
                    "promotionPrice": {
                        "min": "3290",
                        "max": "9000"
                    },
                    "subProducts": [
                        {
                            "productId": 45335,
                            "name": "OPPO Find Melody",
                            "model": "R8111",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "3290",
                                "max": "9000"
                            },
                            "promotionPrice": {
                                "min": "3290",
                                "max": "9000"
                            }
                        }
                    ]
                },
                {
                    "productId": 45332,
                    "brand": "OPPO",
                    "name": "OPPO Find Gemini",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "5990",
                        "max": "8990"
                    },
                    "promotionPrice": {
                        "min": "5990",
                        "max": "8990"
                    },
                    "subProducts": [
                        {
                            "productId": 45332,
                            "name": "OPPO Find Gemini Plus",
                            "model": "U7011S",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "5990",
                                "max": "8000"
                            },
                            "promotionPrice": {
                                "min": "5990",
                                "max": "8000"
                            }
                        },
                        {
                            "productId": 42405,
                            "name": "OPPO Find Gemini",
                            "model": "U7011",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "8990",
                                "max": "8990"
                            },
                            "promotionPrice": {
                                "min": "8990",
                                "max": "8990"
                            }
                        }
                    ]
                },
                {
                    "productId": 44329,
                    "brand": "OPPO",
                    "name": "OPPO R8015",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "3290",
                        "max": "5000"
                    },
                    "promotionPrice": {
                        "min": "3290",
                        "max": "5000"
                    },
                    "subProducts": [
                        {
                            "productId": 44329,
                            "name": "OPPO Find Guitar",
                            "model": "R8015",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "3290",
                                "max": "5000"
                            },
                            "promotionPrice": {
                                "min": "3290",
                                "max": "5000"
                            }
                        }
                    ]
                },
                {
                    "productId": 42413,
                    "brand": "OPPO",
                    "name": "OPPO Finder",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "6000",
                        "max": "13990"
                    },
                    "promotionPrice": {
                        "min": "6000",
                        "max": "13990"
                    },
                    "subProducts": [
                        {
                            "productId": 42413,
                            "name": "OPPO Finder",
                            "model": "X9017",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "6000",
                                "max": "13990"
                            },
                            "promotionPrice": {
                                "min": "6000",
                                "max": "13990"
                            }
                        }
                    ]
                },
                {
                    "productId": 41875,
                    "brand": "OPPO",
                    "name": "OPPO Find 3",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "10990",
                        "max": "10990"
                    },
                    "promotionPrice": {
                        "min": "10990",
                        "max": "10990"
                    },
                    "subProducts": [
                        {
                            "productId": 41875,
                            "name": "OPPO Find 3",
                            "model": "X9015",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "10990",
                                "max": "10990"
                            },
                            "promotionPrice": {
                                "min": "10990",
                                "max": "10990"
                            }
                        }
                    ]
                },
                {
                    "productId": 40897,
                    "brand": "OPPO",
                    "name": "OPPO T1017",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "3990",
                        "max": "3990"
                    },
                    "promotionPrice": {
                        "min": "3990",
                        "max": "3990"
                    },
                    "subProducts": [
                        {
                            "productId": 40897,
                            "name": "OPPO T1017",
                            "model": "T1017",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "3990",
                                "max": "3990"
                            },
                            "promotionPrice": {
                                "min": "3990",
                                "max": "3990"
                            }
                        }
                    ]
                },
                {
                    "productId": 40613,
                    "brand": "OPPO",
                    "name": "A6117",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "3990",
                        "max": "3990"
                    },
                    "promotionPrice": {
                        "min": "3990",
                        "max": "3990"
                    },
                    "subProducts": [
                        {
                            "productId": 40613,
                            "name": "A6117",
                            "model": "A6117",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "3990",
                                "max": "3990"
                            },
                            "promotionPrice": {
                                "min": "3990",
                                "max": "3990"
                            }
                        }
                    ]
                },
                {
                    "productId": 40282,
                    "brand": "OPPO",
                    "name": "OPPO U5211",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "4990",
                        "max": "4990"
                    },
                    "promotionPrice": {
                        "min": "4990",
                        "max": "4990"
                    },
                    "subProducts": [
                        {
                            "productId": 40282,
                            "name": "OPPO Chatty Dot",
                            "model": "U5211",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "4990",
                                "max": "4990"
                            },
                            "promotionPrice": {
                                "min": "4990",
                                "max": "4990"
                            }
                        }
                    ]
                },
                {
                    "productId": 8379,
                    "brand": "OPPO",
                    "name": "OPPO U520T",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "3990",
                        "max": "3990"
                    },
                    "promotionPrice": {
                        "min": "3990",
                        "max": "3990"
                    },
                    "subProducts": [
                        {
                            "productId": 8379,
                            "name": "OPPO Funtacy",
                            "model": "U520T",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "3990",
                                "max": "3990"
                            },
                            "promotionPrice": {
                                "min": "3990",
                                "max": "3990"
                            }
                        }
                    ]
                },
                {
                    "productId": 7720,
                    "brand": "OPPO",
                    "name": "OPPO U525T",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "5990",
                        "max": "5990"
                    },
                    "promotionPrice": {
                        "min": "5990",
                        "max": "5990"
                    },
                    "subProducts": [
                        {
                            "productId": 7720,
                            "name": "OPPO Blink Blink Bloom",
                            "model": "U525T",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "5990",
                                "max": "5990"
                            },
                            "promotionPrice": {
                                "min": "5990",
                                "max": "5990"
                            }
                        }
                    ]
                },
                {
                    "productId": -114306,
                    "brand": "OPPO",
                    "name": "FX5P_12/256",
                    "model": null,
                    "imageUrl": "",
                    "itemType": null,
                    "flag5G": "N",
                    "dv": [],
                    "productType": "DEVICE",
                    "productSubtype": "HANDSET",
                    "normalPrice": {
                        "min": "39990",
                        "max": "39990"
                    },
                    "promotionPrice": {
                        "min": "39990",
                        "max": "39990"
                    },
                    "subProducts": [
                        {
                            "productId": -114306,
                            "name": "FX5P_12/256",
                            "model": "FX5P_12/256",
                            "imageUrl": "N/A",
                            "normalPrice": {
                                "min": "39990",
                                "max": "39990"
                            },
                            "promotionPrice": {
                                "min": "39990",
                                "max": "39990"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

export const mockAllSubProductsData  = {
    "statusCode": "20000",
    "statusDesc": "Success",
    "name": "iPhone 11 256GB",
    "productSubtype": "HANDSET",
    "products": [
        {
            "colorName": "BLACK",
            "colorCode": "000000",
            "sku": [
                "NEW0AP00113-BK01",
                "NEW0AP00113-BK01W"
            ],
            "images": {
                "thumbnail": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_1.jpg",
                "baseView": [
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_1.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_2_850x850_1.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_3_850x850_1.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_4_850x850_1.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_6_850x850_5.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_7_850x850_1.jpg"
                    }
                ]
            }
        },
        {
            "colorName": "GREEN",
            "colorCode": "00A382",
            "sku": [
                "NEW0AP00113-GN01",
                "NEW0AP00113-GN01W"
            ],
            "images": {
                "thumbnail": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_2.jpg",
                "baseView": [
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_2.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_2_850x850_2.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_3_850x850_2.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_4_850x850_2.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_6_850x850.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_7_850x850_2.jpg"
                    }
                ]
            }
        },
        {
            "colorName": "BLACK01",
            "colorCode": "",
            "sku": [
                "NEW0AP00113-KK01"
            ],
            "images": {
                "thumbnail": null,
                "baseView": []
            }
        },
        {
            "colorName": "PURPLE",
            "colorCode": "523353",
            "sku": [
                "NEW0AP00113-PP01",
                "NEW0AP00113-PP01W"
            ],
            "images": {
                "thumbnail": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_3.jpg",
                "baseView": [
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_3.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_2_850x850_3.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_3_850x850_3.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_4_850x850_3.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_5_850x850_1.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_6_850x850_1.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_7_850x850_3.jpg"
                    }
                ]
            }
        },
        {
            "colorName": "RED",
            "colorCode": "C30709",
            "sku": [
                "NEW0AP00113-RD01",
                "NEW0AP00113-RD01W"
            ],
            "images": {
                "thumbnail": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_4.jpg",
                "baseView": [
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_4.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_2_850x850_4.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_3_850x850_4.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_4_850x850_4.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_6_850x850_3.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_7_850x850_4.jpg"
                    }
                ]
            }
        },
        {
            "colorName": "WHITE",
            "colorCode": "FFFFFF",
            "sku": [
                "NEW0AP00113-WH01",
                "NEW0AP00113-WH01W"
            ],
            "images": {
                "thumbnail": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_5.jpg",
                "baseView": [
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_5.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_2_850x850_5.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_3_850x850_5.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_4_850x850_5.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_6_850x850_4.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_7_850x850_5.jpg"
                    }
                ]
            }
        },
        {
            "colorName": "YELLOW",
            "colorCode": "DCDA51",
            "sku": [
                "NEW0AP00113-YL01",
                "NEW0AP00113-YL01W"
            ],
            "images": {
                "thumbnail": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_6.jpg",
                "baseView": [
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_1_850x850_6.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_2_850x850_6.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_3_850x850_6.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_4_850x850_6.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_6_850x850_2.jpg"
                    },
                    {
                        "imageUrl": "https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/sea_iphone_11_position_7_850x850_6.jpg"
                    }
                ]
            }
        }
    ]
} 
