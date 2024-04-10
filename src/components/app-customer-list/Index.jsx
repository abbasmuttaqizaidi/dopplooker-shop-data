import { useEffect, useState } from "react";
import { useContextLayer } from "../context"
import { prepareBodyData } from "../helper";

export const AppCustomerList = () => {
    const { states, handleStates } = useContextLayer();
    const [bodyData, setBodyData] = useState([...states?.customerData]);

    useEffect(() => {
        setBodyData(prepareBodyData(states?.customerData ?? []))
    }, [states?.customerData])

    return <div className="appcustomerlist__container">
        <table>
            <thead>
                <tr>
                    <td colSpan={4}>Customers Details</td>
                </tr>
                <tr>

                    <td>Name</td>
                    <td># of Items</td>
                    <td>Amount</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                <TableBody tableBody={[...bodyData]} />
            </tbody>
        </table>
    </div>
}

export const TableBody = (props = {}) => {
    const { tableBody } = props;

    if (tableBody.length > 0) {
        return tableBody?.map(tabRow => <tr>
            <td>{tabRow.name}</td>
            <td>{tabRow.numOfItemsPurchased}</td>
            <td>{tabRow.amount}</td>
            <td><Action /></td>
        </tr>
        )
    }
    return <></>
}

export function Action() {
    return <div className="table__action">
        <button>Edit</button>
        <button>Delete</button>
    </div>
}