export const AppDetails = () => {
    return <div className="appdetails__container">
        <h4>Edit Customer</h4>
        <div className="appdetails__layout">
            <div className="appdetails__layout--inputElement">
                <label>First Name: </label>
                <input />
            </div>
            <div className="appdetails__layout--inputElement">
                <label>Last Name: </label>
                <input />
            </div>
            <div className="appdetails__layout--inputElement">
                <label>Item Purchased: </label>
                <input />
            </div>
            <div className="appdetails__layout--inputElement">
                <label>Amount: </label>
                <input />
            </div>
        </div>
        <button>Update</button>
    </div>
}