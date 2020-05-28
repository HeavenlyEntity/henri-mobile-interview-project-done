import * as React from 'react'
const initialState = { loadingUsers: false, usersData: [], userImages: [] }
const usersState = { loadingUsers: false, usersData: [], userImages: [] }

export default function usersReducer(state = usersState, action) {

	const fetchUsers = async () => {
		await fetch('https://jsonplaceholder.typicode.com/users')
			.then(res => res.json())
			.then(resJSON => usersState.usersData = resJSON)
			.catch(e => console.error(e))
	}

	const fetchUserImages = async () => {
		const headerOptions = {
			method: 'GET',
			headers: {
				'X-API-KEY': "7be8a2126b17bb9d2f3aecf9c4ad63",
				'Accept': 'application/json',
				'Cache-Control': 'no-cache'
			}
		}

		await fetch('https://uifaces.co/api', headerOptions)
			.then(res => res.json())
			.then((resJSON) => usersState.userImages = resJSON)
			// .then(() => {
			// 	console.log('Users Images', state.userImages)
			// } )
			.catch(e => console.error(e))
		// .finally(() => console.log(userImages))

	}

	const syncPhotoToUser = async () => {
		if (usersState.usersData !== undefined && usersState.userImages !== undefined) {
			let mergedImages = [...state.usersData];
			mergedImages.map((user, i) => {
				user.photo = state.userImages[i].photo
			})
			usersState.usersData = mergedImages
		}
	}

	switch (action.type) {
		case "FETCH_USERS": {
			// fetchUsers()
			// 	.then(() => console.log('Redux Action - FETCH_USERS'))
			// 	.then(() => fetchUserImages())
			// 	.then(() => syncPhotoToUser())
			// 	.then(() => console.log('Redux Action - FETCH_USERS Completed'))
			// 	.catch((e) => console.error('Redux Action Error ' + e))
			return {
				...state,
				loadingUsers: true,
				userImages: null,
				userData: null
			};
		}
		case "FETCH_USERS_SUCCESS": {
			return {
				...state,
				loadingUsers: false,
				usersData: action.payload,
			};
		}
		case "FETCH_USER_AVATARS": {
			return {
				...state,
				userImages: null,
			};
		}
		case "FETCH_USER_AVATARS_SUCCESS": {
			return {
				...state,
				userImages: action.payload,
			};
		}
		case "UPDATE_USERS": {
			return {
				...state,
				usersData: action.payload,
			};
		}
		case "RESET": {
			return initialState;
		}

		default:
			return state
	}
}
