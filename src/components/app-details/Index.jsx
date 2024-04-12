import { useEffect, useState } from "react"
import { useContextLayer } from "../context"
import { _actions } from "../context/actions";
import './styles.css';
import editcustomer from '../../assets/icons/edit.svg';
import { createDateKey } from "../helper";

export const AppDetails = () => {
    const { states, handleStates } = useContextLayer();

    const updateUser = (data = []) => {
        let originalIndex = states?.editing?.editedData?.index;
        let tempCustData = [...states?.customerData ?? []];

        let originalArray = tempCustData.filter(elem => elem?.firstName === data?.firstName || elem?.lastName === data?.lastName)?.[0];

        let newArray = { ...originalArray, ...data };
        if (!originalArray?.date)
            newArray = { ...originalArray, ...newArray, ...createDateKey(originalArray) };

        if (tempCustData?.length > 0) {
            tempCustData?.forEach((elem, index) => {
                if (originalIndex === index) {
                    tempCustData[index] = newArray ?? [];
                }
            })
        }
        handleStates({
            type: _actions.updateRecord,
            subType: 'update',
            payload: {
                [_actions.customerData]: tempCustData,
                [_actions.editing]: { ...states?.editing, isEditing: false }
            }
        })
    }

    const setDefaultValues = () => {
        return {
            firstName: states?.editing?.editedData?.data?.firstName ?? '',
            lastName: states?.editing?.editedData?.data?.lastName ?? '',
            numOfItemsPurchased: states?.editing?.editedData?.data?.numOfItemsPurchased ?? '',
            amount: states?.editing?.editedData?.data?.amount ?? '',
        }
    }

    return (
        <div className="header__container">
            <div className="header__todayspurchase">
                <div className="header__todayspurchase--container">
                    <p className='header__todayspurchase--todayHeading'>
                        <span>Edit Customer</span>
                        <img src={editcustomer} className='img__small' alt='sales' />
                    </p>
                    <div className="appdetails__container">
                        <div className="appdetails__container--body">
                            <CustomDetailsForm
                                buttonText="Update"
                                onChange={(props) => {
                                    updateUser(props)
                                }}
                                defaultValues={setDefaultValues()}
                                allowOnClose={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CustomDetailsForm({ buttonText = 'Submit', onChange = () => { }, defaultValues = {}, allowOnClose }) {
    const { states, handleStates } = useContextLayer();
    const [formDetails, setFormDetails] = useState({
        firstName: '',
        lastName: '',
        numOfItemsPurchased: '',
        amount: '',
    })

    useEffect(() => {
        Object.keys(defaultValues ?? {})?.length > 0 &&
            setFormDetails({
                firstName: defaultValues?.firstName ?? '',
                lastName: defaultValues?.lastName ?? '',
                numOfItemsPurchased: defaultValues?.numOfItemsPurchased ?? '',
                amount: defaultValues?.amount ?? '',
            })
    }, [defaultValues])

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
                <input type="text" value={formDetails.firstName} onChange={(event) => {
                    handleFormInputs('firstName', event.target.value);
                }} />
            </div>
            <div className="appdetails__layout--inputElement">
                <label>Last Name: </label>
                <input type="text" value={formDetails.lastName} onChange={(event) => {
                    handleFormInputs('lastName', event.target.value);
                }} />
            </div>
            <div className="appdetails__layout--inputElement">
                <label>Item Purchased: </label>
                <input type="number" value={formDetails.numOfItemsPurchased} onChange={(event) => {
                    handleFormInputs('numOfItemsPurchased', event.target.value);
                }} />
            </div>
            <div className="appdetails__layout--inputElement">
                <label>Amount: </label>
                <input type="number" value={formDetails.amount} onChange={(event) => {
                    handleFormInputs('amount', event.target.value);
                }} />
            </div>
            <div className="appdetails__layout--footer">
                {allowOnClose && <button className="button__small" onClick={() => {
                    const editing = {
                        isEditing: false,
                        editedData: { ...states?.editing?.editedData }
                    }
                    handleStates({
                        type: _actions.customerData,
                        subType: 'editData',
                        payload: {
                            [_actions.editing]: { ...editing }
                        }
                    })
                }}>Close</button>}
                <button className="button__small" onClick={() => { onDetailsSubmit() }}>{buttonText}</button>
            </div>
        </div>
    )
}