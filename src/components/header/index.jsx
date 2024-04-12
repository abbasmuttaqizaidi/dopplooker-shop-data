import './styles.css';
import sales from '../../assets/icons/sales.svg';
import { useContextLayer } from '../context';
import { useEffect } from 'react';
import { extractCurrentDate } from '../helper';
import { _actions } from '../context/actions';
import refresh from '../../assets/icons/refresh.svg';

export const Header = () => {

    const { states, handleStates } = useContextLayer();

    useEffect(() => {
        const currentDate = extractCurrentDate();
        let itemsPurchasedToday = 0;
        let totalAmountToday = 0;

        states?.customerData?.forEach(data => {
            if (currentDate === data?.date) {
                itemsPurchasedToday += +data?.numOfItemsPurchased;
                totalAmountToday += +data?.amount;
            }
        });

        handleStates({
            type: _actions.todaysReport,
            payload: {
                itemsPurchasedToday,
                totalAmountToday
            }
        })
    }, [])

    return (
        <div className="header__container">
            <div className="header__todayspurchase">
                <div className="header__todayspurchase--container">
                    <p className='header__todayspurchase--todayHeading'>
                        <span>Today's Sales</span>
                        <img src={sales} className='img__small' alt='sales' />
                    </p>
                    <div class="purchase__info">
                        <p className='purchase__info--heading'>Items Purchased</p>
                        <p className='purchase__info--value'>{states?.itemsPurchasedToday || 0}</p>
                    </div>
                    <div class="purchase__info">
                        <p className='purchase__info--heading'>Amount</p>
                        <p className='purchase__info--value'>${states?.totalAmountToday || 0}</p>
                    </div>
                </div>
            </div>
            <div className="header__footer">
                <div>Refresh</div>
            </div>
        </div>
    )
}