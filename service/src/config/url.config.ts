const BASH_URL = process.env.URL_APIM as string;
export class URLConfig {
	static subscriptionAccount(msisdn: string) {
		return `${BASH_URL}/phx-atn/domain/customer-subscription/v1/subscription-account/msisdn/${msisdn}.json`;
	}

	static mobilePackageCurrent(mobileNo: string) {
		return `${BASH_URL}/phx-atn/domain/atn/customers/v1/customerSubscription/mobilePackageCurrent/${mobileNo}.json`;
	}
	static searchProducts(keyword: string) {
		return `${BASH_URL}/api/product-catalog/search?keyword=${keyword}`;
	}

	static queryContractMobile = `${BASH_URL}/dev-ctm/domain/agreement-query/query-contractmobile.json`;

	static sendOneTimePW = `${BASH_URL}/gsso/api/v1/gsso/sendOneTimePW.json`;

	static confirmOneTimePassword = `${BASH_URL}/gsso/api/v1/gsso/confirmOneTimePassword.json`;

	static getCondition = `${BASH_URL}/cpc/CPC-FE-WEB/api/myChannel/getCondition`;

	static getPayments = `${BASH_URL}/cpc/CPC-MyChannelFE-WEB/rest/payment/getPayments`;

	static getBanksPromotion = `${BASH_URL}/cpc/CPC-MyChannelFE-WEB/rest/bank/GetBanksPromotion`;

	static authGenerate = `${BASH_URL}/privilege-sales-portal-cloud/api/auth/v1/auth/generate`;

	static campaignCheck = `${BASH_URL}/privilege-sales-portal-cloud/api/campaign/v1/campaign/check`;

	static getTransaction = `${BASH_URL}/privilege-sales-portal-cloud/api/handset/v1/transaction/get`;

	static getAllProduct = `${BASH_URL}/cpc/CPC-MyChannelFE-WEB/rest/model/GetAllProduct`;

	static getProductDetail = `${BASH_URL}/cpc/CPC-MyChannelFE-WEB/rest/product/GetProductDetail`;

	static queryStockOMNI = `${BASH_URL}/digital-trading/DTWS/api/stock/v1/query-stock-omni`;

	static queryProductCrossSelling = `${BASH_URL}/digital-trading/DTWS/api/productCrossSell/v1/queryProductCrossSelling`;

	static getPromotionShelves = `${BASH_URL}/cpc/CPC-FE-WEB/api/myChannel/getPromotionShelves`;

	static getAllPromotionsByShelf = `${BASH_URL}/cpc/CPC-FE-WEB/api/myChannel/getAllPromotionsByShelf`;

	static getCampaignPromotions = `${BASH_URL}/cpc/CPC-MyChannelFE-WEB/rest/campaign/getCampaignPromotions`;

	static getTradePromotions = `${BASH_URL}/cpc/CPC-MyChannelFE-WEB/rest/promotion/getTradePromotions`;

	static getPaymentsByCampaign = `${BASH_URL}/cpc/CPC-MyChannelFE-WEB/rest/payment/getPaymentsByCampaign`;

	static ticketIssue = `${BASH_URL}/qt/qmt-service/rest/ticket/issue`;

	static addCartList = `${BASH_URL}/dt/DTWS/api/omnichannel/v1/addCartList`;

	static createOrderList = `${BASH_URL}/dt/DTWS/api/omnichannel/v1/createOrderList`;

	static campaignRedeem = `${BASH_URL}/privilege-sales-portal-cloud/api/campaign/v1/campaign/redeem`;

	static trn = `${BASH_URL}/ssb-it-transform/apitrn`;

	static ssbTransform = `${BASH_URL}/ssb-it-transform/ssb/transform`;

	static personalInformationQuery = `${BASH_URL}/ssb-it-profile/ssb/profile/personalInformation/query`;

	static getProductsByMaterialCode = `${BASH_URL}/cpc/CPC-MyChannelFE-WEB/rest/product/getProductsByMatetrialCode`;

	static imeiDT = `${BASH_URL}/dt/DTWS/api/omnichannel/v1/checkSerial`;

	static queryCardInfo = `${BASH_URL}/digital-trading/DTWS/api/sale/v1/query-card-info`;

	static getInstallmentsForPartner = `${BASH_URL}/cpc/CPC-MyChannelFE-WEB/rest/bank/getInstallmentsForPartner`;

	static pgzServiceProvision = `${BASH_URL}/phx-pgzinv/api/v1/PGZInventory/synchronous/ServiceProvisioning`;

	static skyAuthentication = `${BASH_URL}/dev-sky/sky-auth/v1/user/authenticate`;

	static provisionMobileCare = `${BASH_URL}/dev-sky/mobile-postpaid/change-product/conductor/v1/order`;

	static removeCart(soId: string, userId: string) {
		return `${BASH_URL}/dt-core/DTWS/api/omnichannel/v1/removeCart?soId=${soId}&userId=${userId}`;
	}

	static createCompensation = `${BASH_URL}/dt-core/DTWS/api/cm/v1/createCompensation`;

	static queryListMobileNo = `${BASH_URL}/ssb-it-profile/ssb/profile/listmobileno/query`;

	static getNetworkType = `${BASH_URL}/ssb-it-profile/ssb/profile/getNetworkType`;

	static customerProfile = `${BASH_URL}/phx-atn/domain/customer-profile/v1/customer.json`;

	static getAllBrandOfProduct = `${BASH_URL}/cpc/CPC-MyChannelFE-WEB/rest/brand/GetBrandsOfProduct`;

	static checkPrivilege = `${BASH_URL}/privilege-sales-portal/PrivApiRestful/v1.0/checkPrivilege`;

	static checkDeviceTransaction = `${BASH_URL}/privilege-sales-portal/PrivApiRestful/v1.0/checkDeviceTransaction`;

	static getPinCodeByUser = `${BASH_URL}/omdb/omws/WS_OM_OMService.svc`
	
	static evAscInfo(inASCCode: string) {
		return `${BASH_URL}/phxPartner/v1/partner/ChannelASCProfile.json?filter=(&(inEvent=evASCInfo)(inSource=MYCHANNEL)(inASCCode=${inASCCode}))`;
	}

	static evLocationInfo(inPinCode: string) {
		return `${BASH_URL}/phxPartner/v1/partner/ChannelASCProfile.json?filter=(&(inEvent=evLocationInfo)(inSource=MYCHANNEL)(inPincode=${inPinCode}))`;
	}
	
	static getChannelASCProfile = `${BASH_URL}/phxPartner/v1/partner/ChannelASCProfile.json`
}
