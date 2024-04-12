import { useEffect, useState } from "react";
import { useContextLayer } from "../context"
import { prepareBodyData } from "../helper";
import { _actions } from "../context/actions";
import './styles.css';
import { Modal } from "../../common/modal";
import { CustomDetailsForm } from "../app-details/Index";
import customerDetails from '../../assets/icons/details.svg'

export const AppCustomerList = () => {
    const { states, handleStates } = useContextLayer();
    const [bodyData, setBodyData] = useState([...states?.customerData]);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setBodyData(prepareBodyData(states?.customerData ?? []))
    }, [states?.customerData])

    return <div className="appcustomerlist__container">
        <div className="appcustomerlist__table--title">
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: 'center',
                gap: '1rem'
            }}>
                <p> Customers Details </p>
                <img src={customerDetails} className="img__small" alt="customer's details" />
            </div>
            <button className="button__hollow button__medium" onClick={() => {
                setIsOpen(!isOpen);
            }}>Add Customer</button>
        </div>
        <table>
            <thead>
            </thead>
            <tbody>
                <TableBody tableBody={[...bodyData]} />
            </tbody>
        </table>

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
                    let tempSt = [props, ...states?.customerData ?? []];
                    handleStates({
                        type: _actions.customerData,
                        payload: {
                            customerData: prepareBodyData(tempSt)
                        }
                    })
                }} />
        </Modal>
    </div>
}

export const TableBody = (props = {}) => {
    const { tableBody } = props;

    if (tableBody.length > 0) {
        return tableBody?.map((tabRow, index) => <tr className="table__body--row">
            <td>
                <div className="table__body--recordContainer">
                    <p className="table_body--recordNameheading">Name</p>
                    <p className="table__body--recordValue">{tabRow.name}</p>
                </div>
            </td>
            <td>
                <div className="table__body--recordContainer">
                    <p className="table_body--recordNameheading">Item Purchased</p>
                    <p className="table__body--recordValue">{tabRow.numOfItemsPurchased}</p>
                </div>
            </td>
            <td>
                <div className="table__body--recordContainer">
                    <p className="table_body--recordNameheading">Amount</p>
                    <p className="table__body--recordValue">{tabRow.amount}</p>
                </div>
            </td>
            <td className="table__body--actionsColumn">
                <div className="table__body--recordContainer">
                    <p className="table_body--recordNameheading">Actions</p>
                    <div className="table__body--recordValue"><Action rowIndex={index} rowData={tabRow} /></div>
                </div>

            </td>
        </tr>
        )
    }
    return <></>
}

export function Action({ rowIndex, rowData }) {
    const { states, handleStates } = useContextLayer();
    const { customerData } = states;
    const removeCustomer = () => {
        const newCustomers = customerData?.filter((elem, index) => index !== rowIndex);
        handleStates({
            type: _actions.customerData,
            subType: 'delete',
            payload: {
                [_actions.customerData]: newCustomers
            }
        })
    }

    const editUser = () => {
        const editing = {
            isEditing: true,
            editedData: {
                data: rowData,
                index: rowIndex
            }
        }
        handleStates({
            type: _actions.customerData,
            subType: 'editData',
            payload: {
                [_actions.editing]: { ...editing }
            }
        })
    }

    return <div className="table__action">
        <button onClick={() => {
            editUser()
        }}>Edit</button>
        <button className="button__small" onClick={() => {
            removeCustomer(rowIndex)
        }}>Delete</button>
    </div>
}