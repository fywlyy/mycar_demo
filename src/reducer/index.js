import { combineReducers } from 'redux';
import computer from '../container/home/home_reducer';
import demo from '../container/demo/demo-reducer';
import stockList from '../container/stock-manage/stock-list/list-reducer';
import newDeliveryOrder from '../container/delivery/new-delivery-order/new-delivery-order-reducer';
import returnFormList from '../container/return-manage/return-form-list/return-form-list-reducer';
import returnResultList from '../container/return-manage/return-result-list/return-result-list-reducer';
import returnDetails from '../container/return-manage/return-details/return-details-reducer';
import SellAnticipateList from '../container/sell-anticipate/manage-list/manage-list-reducer';

export default combineReducers({
    computer,
    demo,
    newDeliveryOrder,
    returnFormList,
    returnResultList,
    returnDetails,
    stockList,
    sellAnticipateList: SellAnticipateList,
});
