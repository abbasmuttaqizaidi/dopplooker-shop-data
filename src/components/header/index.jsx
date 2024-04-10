import { useState } from 'react';
import './styles.css';
import { Modal } from '../../common/modal';
import { CustomDetailsForm } from '../app-details/Index';
import { useContextLayer } from '../context';
import { prepareBodyData } from '../helper';
import { _actions } from '../context/actions';
export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { states, handleStates } = useContextLayer();
    return (
        <div className="header__container">
            <button>Today's Purchase</button>
            <button onClick={() => {
                setIsOpen(!isOpen);
            }}>Add Customer</button>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(!isOpen);
                }}
                title={"Add Customer"}
            >
                <CustomDetailsForm
                    buttonText='Add Customer'
                    onChange={(props) => {
                        let tempSt = [...states?.customerData ?? [], props];
                        handleStates({
                            type: _actions.customerData,
                            payload: {
                                customerData: prepareBodyData(tempSt)
                            }
                        })
                    }} />
            </Modal>
        </div>
    )
}