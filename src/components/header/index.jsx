import './styles.css';
export const Header = () => {

    return (
        <div className="header__container">
            <div className="header__todayspurchase">
                <div className="header__todayspurchase--container">
                    <p className='header__todayspurchase--todayHeading'>Today's Sales</p>
                    <div class="purchase__info">
                        <p className='purchase__info--heading'>Items Purchased</p>
                        <p className='purchase__info--value'>50</p>
                    </div>
                    <div class="purchase__info">
                        <p className='purchase__info--heading'>Amount</p>
                        <p className='purchase__info--value'>$500</p>
                    </div>
                </div>
            </div>
        </div>
    )
}