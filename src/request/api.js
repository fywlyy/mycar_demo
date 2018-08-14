/**
 * Created by zhongwangsheng on 2017/12/18.
 */
// const baseUrl = 'http://app.ecsphere.net:9011';
const baseUrl = '';

export default {
    login: `${baseUrl}/ks-bpm/user/login`,
    logout: `${baseUrl}/ks-bpm/user/logout`,
    queryCustomerList: `${baseUrl}/customer`,
    queryDepartmentList: `${baseUrl}/department`,
    queryBusinessPersonalList: `${baseUrl}/personal`,
    queryOrderList: `${baseUrl}/order`,
    // mock demo api
    demoPager: `${baseUrl}/demo/pager`,
    demoSave: `${baseUrl}/demo/add`,
    // stock manage
    stockListPager: `${baseUrl}/stock/pager`,

    // sell-anticipate
    querySellAnticipateList: `${baseUrl}/sell-anticipate/page`,
    deleteSellAnticipate: `${baseUrl}/sell-anticipate/delete`,
    querySellAnticipateListByDistrict: `${baseUrl}/sell-anticipate/district`,
    queryDistrictList: `${baseUrl}/district/list`,
    queryFuzzyProductList: `${baseUrl}/fuzzy-product/list`,

    // return
    queryReturnFormLsit: `${baseUrl}/return-form/page`,
    queryReturnResultLsit: `${baseUrl}/return-result/page`,
};
