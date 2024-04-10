import { useState } from "react"

export const AppDetails = () => {
    return <div className="appdetails__container">
        <h4>Edit Customer</h4>
        <CustomDetailsForm />
    </div>
}

export function CustomDetailsForm({ buttonText = 'Submit', onChange = () => { } }) {

    const [formDetails, setFormDetails] = useState({
        firstName: '',
        lastName: '',
        numOfItemsPurchased: '',
        amount: ''
    })

    const handleFormInputs = (key, value) => {
        let tempFormDetails = { ...formDetails };
        tempFormDetails[key] = value;
        setFormDetails(tempFormDetails);
    }

    const onDetailsSubmit = () => {
        onChange(formDetails)
    }

    return (
        <div className="appdetails__layout">
            <div className="appdetails__layout--inputElement">
                <label>First Name: </label>
                <input value={formDetails.name} onChange={(event) => {
                    handleFormInputs('firstName', event.target.value);
                }} />
            </div>
            <div className="appdetails__layout--inputElement">
                <label>Last Name: </label>
                <input value={formDetails.lastName} onChange={(event) => {
                    handleFormInputs('lastName', event.target.value);
                }} />
            </div>
            <div className="appdetails__layout--inputElement">
                <label>Item Purchased: </label>
                <input value={formDetails.numOfItemsPurchased} onChange={(event) => {
                    handleFormInputs('numOfItemsPurchased', event.target.value);
                }} />
            </div>
            <div className="appdetails__layout--inputElement">
                <label>Amount: </label>
                <input value={formDetails.amount} onChange={(event) => {
                    handleFormInputs('amount', event.target.value);
                }} />
            </div>
            <button onClick={() => { onDetailsSubmit() }}>{buttonText}</button>
        </div>
    )
}