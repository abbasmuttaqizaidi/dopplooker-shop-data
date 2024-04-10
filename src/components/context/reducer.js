import { _actions } from "./actions";

export const appReducer = (state = {}, action) => {

    switch (action.type) {
        case _actions.customerData:
            return {
                ...state,
                ...action.payload
            }

        default:
            return { ...state };
    }
}