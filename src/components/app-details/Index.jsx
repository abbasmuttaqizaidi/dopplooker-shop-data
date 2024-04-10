import { useState } from "react"
import { useContextLayer } from "../context"
import { _actions } from "../context/actions";

export const AppDetails = () => {
    const { states, handleStates } = useContextLayer();


    const updateUser = (data = []) => {
        let originalIndex = states?.editing?.editedData?.index;
        let tempCustData = [...states?.customerData ?? []];
        if (tempCustData?.length > 0) {
            tempCustData?.map((elem, index) => {
                if (originalIndex === index) {
                    tempCustData[index] = data;
                }
            })
        }
        handleStates({
            type: _actions.updateRecord,
            subType: 'update',
            payload: {
                [_actions.customerData]: tempCustData
            }
        })
    }

    return <div className="appdetails__container">
        <h4>Edit Customer</h4>
        <CustomDetailsForm buttonText="Update" onChange={(props) => {
            updateUser(props)
        }} />
    </div>
}

export function CustomDetailsForm({ buttonText = 'Submit', onChange = () => { } }) {

    const { states } = useContextLayer();

    const [formDetails, setFormDetails] = useState({
        firstName: states?.editing?.editedData?.data?.firstName ?? '',
        lastName: states?.editing?.editedData?.data?.lastName ?? '',
        numOfItemsPurchased: states?.editing?.editedData?.data?.numOfItemsPurchased ?? '',
        amount: states?.editing?.editedData?.data?.amount ?? '',
    })

    const handleFormInputs = (key, value) => {
        let tempFormDetails = { ...formDetails };
        tempFormDetails[key] = value;
        setFormDetails(tempFormDetails);
    }

    const onDetailsSubmit = () => {
        onChange(formDetails);
    }

    return (
        <div className="appdetails__layout">
            <div className="appdetails__layout--inputElement">
                <label>First Name: </label>
                <input value={formDetails.firstName} onChange={(event) => {
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