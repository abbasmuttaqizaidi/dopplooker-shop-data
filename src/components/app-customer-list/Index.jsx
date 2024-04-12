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
    useEffect(() => {
        setBodyData(prepareBodyData(states?.customerData ?? []))
    }, [states?.customerData])

    const [modal, handleModal] = useState({
        title: '',
        isOpen: false,
        structure: [],
        onPrimaryButtonClicked: () => { }
    })

    const modalHandler = (isOpen = false, title = '', structure = [], onPrimaryButtonClicked = () => { }) => {
        let tempModal = { ...modal };
        tempModal['title'] = title ?? '';
        tempModal['isOpen'] = isOpen ?? false;
        tempModal['structure'] = structure;
        tempModal['onPrimaryButtonClicked'] = onPrimaryButtonClicked;
        handleModal(tempModal);
    }

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
                let tempStructure = [];
                tempStructure.push(
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
                )
                modalHandler(!modal.isOpen, "Add Customer", tempStructure);
            }}>Add Customer</button>
        </div>
        <table>
            <thead>
            </thead>
            <tbody>
                <TableBody tableBody={[...bodyData]} modal={{ modalHandler }} />
            </tbody>
        </table>

        <Modal
            isOpen={modal.isOpen}
            onClose={() => {
                modalHandler(!modal.isOpen)
            }}
            title={"Add Customer"}
            primaryButton={{
                enable: modal?.title === 'Delete User',
                onPrimaryButtonClicked: () => {
                    modal.onPrimaryButtonClicked();
                }
            }}
        >
            {modal.structure}
        </Modal>
    </div>
}

export const TableBody = (props = {}) => {
    const { tableBody, modal } = props;



    if (tableBody.length > 0) {
        return tableBody?.map((tabRow, index) => <tr className="table__body--row">
            <td>
                <div className="table__body--recordContainer">
                    <p className="table_body--recordNameheading">Name</p>
                    <p className="table__body--recordValue">{tabRow.name || 'N/A'}</p>
                </div>
            </td>
            <td>
                <div className="table__body--recordContainer">
                    <p className="table_body--recordNameheading">Item Purchased</p>
                    <p className="table__body--recordValue">{tabRow.numOfItemsPurchased || 'N/A'}</p>
                </div>
            </td>
            <td>
                <div className="table__body--recordContainer">
                    <p className="table_body--recordNameheading">Amount</p>
                    <p className="table__body--recordValue">{tabRow.amount || 'N/A'}</p>
                </div>
            </td>
            <td className="table__body--actionsColumn">
                <div className="table__body--recordContainer">
                    <p className="table_body--recordNameheading">Actions</p>
                    <div className="table__body--recordValue"><Action rowIndex={index} rowData={tabRow} modal={modal} /></div>
                </div>

            </td>
        </tr>
        )
    }
    return <></>
}

export function Action({ rowIndex, rowData, modal }) {
    const { states, handleStates } = useContextLayer();
    const { modalHandler } = modal;
    const { customerData } = states;

    const onDelete = () => {
        const newCustomers = customerData?.filter((elem, index) => index !== rowIndex);
        handleStates({
            type: _actions.customerData,
            subType: 'delete',
            payload: {
                [_actions.customerData]: newCustomers
            }
        });
        modalHandler(false);
    }

    const removeCustomer = () => {
        let tempStructure = [];
        tempStructure.push(
            <p>Confirm Delete entry ?</p>
        )
        modalHandler(true, 'Delete User', tempStructure, onDelete);
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