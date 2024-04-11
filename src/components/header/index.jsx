import './styles.css'; 
export const Header = () => {

    return (
        <div className="header__container">
            <div className="header__todayspurchase">
                <div className="header__todayspurchase--container">
                    <div class="purchase__info">
                        <p>Total Items Purchased</p>
                        <h2>50</h2>
                    </div>
                    <div class="purchase__info">
                        <p>Total Amount Received Today</p>
                        <h2>$500</h2>
                    </div>
                </div>
            </div>
            
        </div>
    )
}