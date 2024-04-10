import { createContext, useContext } from "react";

export const ShopManagementSystemContext = createContext({});


export const useContextLayer = () => {
    const context = useContext(ShopManagementSystemContext);
    const { states, handleStates } = context;
    if (states !== undefined && handleStates !== undefined)
        return { states, handleStates };
    else throw Error("Context Error");
}