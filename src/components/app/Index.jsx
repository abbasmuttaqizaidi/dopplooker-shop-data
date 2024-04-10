import { useReducer, useState } from 'react';
import { AppCustomerList } from '../app-customer-list/Index';
import { AppDetails } from '../app-details/Index';
import '../styles.css/styles.css';
import { CustomerData } from '../../mockdata/mockdata';
import { ShopManagementSystemContext } from '../context';
import { appReducer } from '../context/reducer';


export const ShopManagementSystem = () => {

    const [states, handleStates] = useReducer(appReducer, {
        customerData: CustomerData
    });
    
    return (
        <ShopManagementSystemContext.Provider value={{
            states, handleStates
        }}>
            <div className='shopMS__container'>
                <AppCustomerList />
                <AppDetails />
            </div>
        </ShopManagementSystemContext.Provider>
    )
}
