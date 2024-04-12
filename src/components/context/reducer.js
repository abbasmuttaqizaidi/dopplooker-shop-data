import { _actions } from "./actions";

export const appReducer = (state = {}, action) => {

    switch (action.type) {
        case _actions.editing:
        case _actions.updateRecord:
        case _actions.customerData:
        case _actions.todaysReport:
            return {
                ...state,
                ...action.payload
            }

        default:
            return { ...state };
    }
}