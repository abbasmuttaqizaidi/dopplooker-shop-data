import { useContextLayer } from "../context"

export const AppCustomerList = () => {
    const { states, handleStates } = useContextLayer();
    console.log(states, 'fdsaafsaf');
    return <>AppCustomerList</>
}