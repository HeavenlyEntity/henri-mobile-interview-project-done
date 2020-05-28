import * as React from 'react'
import axios from "axios";
const initialState = { loadingComment: false, selectedPost: null, commentData: [], selectedComment: {}, newComment: {} }

export default function commentReducer(state = initialState, action) {

	const fetchComments = async () => {
		await fetch('https://jsonplaceholder.typicode.com/comments') // Works the same as fetch for GET
			.then(res => res.json())
			.then(async resJSON => state.commentData = resJSON)
			.catch(e => console.error('Redux Reducer "Comment": ',e))
	}

	const addComment = async (newComment) => {
		await axios.post('https://jsonplaceholder.typicode.com/comments', newComment)
			.then(res => console.log(res))
			.catch(e => console.error('Redux Reducer "Comment": ',e))
	}

	const deleteComment = async (commentId) => {
		await axios.delete('https://jsonplaceholder.typicode.com/comment/' + commentId)
			.then(res => console.log(res))
			.catch(e => console.error('Redux Reducer "Comment": ',e))
	}

	switch (action.type) {
		case "ADD_COMMENT": {
			return {
				...state,
				selectedPost: action.payload,
				newComment: action.payload
			};
		}
		case "DELETE_COMMENT": {
			return {
				...state,
				selectedPost: action.payload,
				selectedComment: action.payload
			};
		}
		case "FETCH_COMMENTS": {

			return {
				...state,
				loadingComment: true,
				commentData: null
			};
		}
		case "FETCH_COMMENTS_SUCCESS": {
			return {
				...state,
				loadingComment: false,
				commentData: action.payload
			};
		}

		case "RESET": {
			return initialState;
		}

		default:
			return state
	}
}
