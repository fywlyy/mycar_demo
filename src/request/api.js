/**
 * Created by zhongwangsheng on 2017/12/18.
 */
// const baseUrl = 'http://app.ecsphere.net:9011';
const baseUrl = '';

export default {
    login: `${baseUrl}/ks-bpm/user/login`,
    logout: `${baseUrl}/ks-bpm/user/logout`,
    omsPager: `${baseUrl}/oms/pager`, // test post api
    saveOms: `${baseUrl}/oms/add`, // test get api
};
