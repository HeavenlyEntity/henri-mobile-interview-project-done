import * as React from 'react'
 const initialState = { loading: false, selectedUser: "", userData: null }

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case "USER_SELECTED": {
			return {
				...state,
				selectedUser: action.payload
			};
		}
		case "FETCH_USER": {
			return {
				...state,
				loading: true,
				userData: null
			};
		}
		case "FETCH_USER_SUCCESS": {
			return {
				...state,
				loading: false,
				userData: action.payload
			};
		}

		case "RESET": {
			return initialState;
		}

		// default:
		// 	throw new Error( `Not supported action ${action.type}` );
	}
}
