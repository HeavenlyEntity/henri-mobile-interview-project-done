import * as React from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from "react-redux";
import UserPost from "../components/UserPost";
import {ActivityIndicator, Button, Caption, Dialog, FAB, Portal, TextInput} from "react-native-paper";
import store from "../store/store";


/* 2 Endpoints to link data
*  https://jsonplaceholder.typicode.com/posts
* https://jsonplaceholder.typicode.com/comments
*
* Link via ID
* */

function HomeScreen() {

	const [addingPost, setAddingPost] = React.useState(false)
	const [fabOpen, setFabOpen] = React.useState(false)
	const [newPostModalOpen, setNewPostModalOpen] = React.useState(false)
	const users = useSelector(state => state.users.usersData);
	const userImages = useSelector(state => state.users.userImages);
	const posts = useSelector(state => state.posts.postsData);
	const isLoadingPosts = useSelector(state => state.posts.loadingPosts);
	const isLoadingUsers = useSelector(state => state.users.loadingUsers);
	const [newPostTitle, setNewPostTitle] = React.useState('')
	const [newPostBody, setNewPostBody] = React.useState('')

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	// Send, Save, and fetch "Feed" (Posts) from endpoint and send to redux store
	const fetchPosts = async () => {
		await fetch('https://jsonplaceholder.typicode.com/posts')
			.then(async res => {
				let posts = await res.json()
				const sendPostsFetchingToStore = () => {
					return {
						type: 'FETCH_POSTS'
					}
				}

				store.dispatch(sendPostsFetchingToStore()) // setState redux store to ready for data
				return posts
			})
			.then(resJSON => {
				const setPostsState = () => {
					return {
						type: 'FETCH_POSTS_SUCCESS',
						payload: resJSON
					}
				}

				store.dispatch(setPostsState()) // setState Posts redux store data
			})
			.catch(e => console.error(e))
	}

	const addPost = async () => {
		setAddingPost(true)
		let newId = Math.max(posts.map(post => post.id)) + 1
		let newPostUserId = users[getRandomInt(10)].id

		let newPost = {
			body: newPostBody,
			title: newPostTitle,
			postId: newId,
			userId: newPostUserId,
			avatar: users[newPostUserId].photo,
			name: users[newPostUserId].name
		}

		let updatedPosts = posts.slice()
		const addNewFeedPost = async () => {
			const addNewPost = () => {
				return {
					type: 'ADD_POST',
					payload: updatedPosts.concat(newPost)
				}
			}
			store.dispatch(addNewPost())
		}
		await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify(newPost),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => response.json() && setAddingPost(false))
			.then(json => console.log(json))
			.catch(e => console.error('"Add Post": ', e))

		await addNewFeedPost()
		setNewPostModalOpen(false)
		setNewPostBody('')
		setNewPostTitle('')
	}

	const fetchUsers = async () => {
		await fetch('https://jsonplaceholder.typicode.com/users')
			.then(res => {
				let response = res.json()
				const fetchUsers = () => {
					return {
						type: 'FETCH_USERS',
					}
				}
				store.dispatch(fetchUsers())
				return response
			})
			.then(resJSON => {
				const setFetchedUsers = () => {
					return {
						type: 'FETCH_USERS_SUCCESS',
						payload: resJSON
					}
				}
				store.dispatch(setFetchedUsers())
			})
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
			.then(res => {
				let response = res.json()
				const fetchedUserImages = () => {
					return {
						type: 'FETCH_USER_AVATARS'
					}
				}
				store.dispatch(fetchedUserImages())
				return response
			})
			.then((resJSON) => {
				// FETCH_USER_AVATARS_SUCCESS
				const setFetchedUserImages = () => {
					return {
						type: 'FETCH_USER_AVATARS_SUCCESS',
						payload: resJSON
					}
				}
				store.dispatch(setFetchedUserImages())
			},reason => console.log('Rejected FETCH_USER_AVATARS_SUCCESS', reason))
			.catch(e => console.error(e))
		// .finally(() => console.log(userImages))

	}

	const syncPhotoToUser = async () => {
		let mergedImages = [...users];
		mergedImages.map((user, i) => {
			console.log('image', user)
              user.photo = userImages[i].photo
		})
		const updateUsers = () => {
			return {
				type: 'UPDATE_USERS',
				payload: mergedImages
			}
		}
		store.dispatch(updateUsers())
	}

	const syncPostsToUser = async () => {
		const found = (post) => users.find((user) => user.id === post.userId);
		let updatedPosts = [...posts];
		updatedPosts.map((post) => {
			if (found(post)) {
				console.log('found', found(post))
				post.avatar = found(post).photo,
				post.name = found(post).name
			}
		})
		const updatePosts = () => {
			return {
				type: 'SYNC_POSTED_USERS',
				payload: updatedPosts
			}
		}
		store.dispatch(updatePosts())
	}

	const fetchComments = async () => {
		await fetch('https://jsonplaceholder.typicode.com/comments')
			.then(res => {
				let response = res.json()
				const fetchComments = () => {
					return {
						type: 'FETCH_COMMENTS',
					}
				}
				store.dispatch(fetchComments())
				return response
			},reason => console.warn('Promise Rejetion Fetch Comments: ', reason))
			.then(resJSON => {
				const setReceivedComments = () => {
					return {
						type: 'FETCH_COMMENTS_SUCCESS',
						payload: resJSON
					}
				}
				store.dispatch(setReceivedComments())
			})
			.catch(e => console.error(e))
	}

	React.useEffect(() => {
		// fetchUsers()
		fetchPosts()
			.then(() => fetchUsers())
			.then(() =>  fetchUserImages())
	}, [])

	React.useEffect(() => {
		 if (users === undefined || users === null || users.length === 0 || userImages === null) {
		   return () => {}
         } else {
           if (!Object.keys(users[0]).includes('photo')) {
               console.log('syncing user photos and posts')
               const timerSync = setTimeout(() => {
                 syncPhotoToUser()
               }, 1000)
             return () => clearTimeout(timerSync)
           }
         }
	}, [users, userImages])

	React.useEffect(() => {
	  if (userImages !== null && users !== null) {
        if (users.length !== 0 || userImages.length !== 0) {
          console.log('211: ', (Object.keys(users[0]).includes('photo') && !Object.keys(posts[0]).includes('avatar') && !Object.keys(posts[0]).includes('name')))
          if (Object.keys(users[0]).includes('photo') && !Object.keys(posts[0]).includes('avatar') && !Object.keys(posts[0]).includes('name')) {
            syncPostsToUser()
          }
        else {
            return () => {}
          }
        }
      }
	  else {
	    return () => {}
      }
	}, [users, userImages])

	React.useEffect(() => {
		if (posts !== null && users !== null && userImages !== null) {
			if (posts.length !== 0) {
				if (Object.keys(posts[0]).includes('avatar') && Object.keys(posts[0]).includes('name') ){
					fetchComments()
				}
			}
		}
	},[users, posts, userImages])



	return (
		<View style={styles.container}>
			<Portal>
				<Dialog visible={newPostModalOpen} onDismiss={() => setNewPostModalOpen(false)}>
					<Dialog.Title>Whats the new post?</Dialog.Title>
					<Dialog.Content>
						<TextInput
							style={{marginBottom: '3%'}}
							mode='outlined'
							value={newPostTitle}
							label='Title'
							onChangeText={text => setNewPostTitle(text)}
						/>
						<TextInput
							mode='outlined'
							value={newPostBody}
							multiline
							placeholder='Whats on your mind?'
							label='Description'
							onChangeText={text => setNewPostBody(text)}
					/>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => {
							setNewPostTitle('')
							setNewPostBody('')
							setNewPostModalOpen(false)
						}}>Cancel</Button>
						<Button loading={addingPost} onPress={() => addPost()}>Post</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

				<View style={styles.welcomeContainer}>
					<Image
						source={require('../assets/images/FeedStart.jpg')} style={styles.welcomeImage}
					/>
				</View>

				{isLoadingPosts || isLoadingUsers || posts === null ?
					<View style={styles.getStartedContainer}>
						<ActivityIndicator animating={true} />
						<Caption style={{textAlign: 'center'}}>Loading Feed...</Caption>
					</View>
					: posts.map((post, i) => {
						return (
							<UserPost
								key={`post-${i}`}
								id={post.id}
								postId={post.postId}
								userImage={post.avatar}
								name={post.name}
								title={post.title}
								description={post.body}
								date={new Date().toLocaleDateString()}
							/>
						)
					})
				}
				<View style={styles.getStartedContainer}>

				</View>

			</ScrollView>
			<FAB.Group
				fabStyle={styles.fab} open={fabOpen} icon={fabOpen ? 'close' : 'plus'} actions={[
				// {icon: 'close', onPress: () => console.log('Pressed add')},
				// {icon: 'star', label: 'Star', onPress: () => console.log('Pressed star')},
				// {icon: 'email', label: 'Email', onPress: () => console.log('Pressed email')},
				{icon: 'note-plus-outline', label: `📝 New Post ` , onPress: () => setNewPostModalOpen(true)},
			]} onStateChange={() => setFabOpen((prevState => !prevState))} onPress={() => {
				if (fabOpen) {
					// do something if the speed dial is open
				}
			}}
			/>
		</View>
	);
}

HomeScreen.navigationOptions = {
	header: null,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center',
	},
	contentContainer: {
		paddingTop: 30,
	},
	welcomeContainer: {
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
	},
	welcomeImage: {
		width: 100,
		height: 80,
		resizeMode: 'contain',
		marginTop: 3,
		marginLeft: -10,
	},
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	codeHighlightText: {
		color: 'rgba(96,100,109, 0.8)',
	},
	codeHighlightContainer: {
		backgroundColor: 'rgba(0,0,0,0.05)',
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 24,
		textAlign: 'center',
	},
	tabBarInfoContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		...Platform.select({
			ios: {
				shadowColor: 'black',
				shadowOffset: {width: 0, height: -3},
				shadowOpacity: 0.1,
				shadowRadius: 3,
			},
			android: {
				elevation: 20,
			},
		}),
		alignItems: 'center',
		backgroundColor: '#fbfbfb',
		paddingVertical: 20,
	},
	tabBarInfoText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		textAlign: 'center',
	},
	navigationFilename: {
		marginTop: 5,
	},
	helpContainer: {
		marginTop: 15,
		alignItems: 'center',
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
	fab: {
		backgroundColor: '#000000',
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
});

export default HomeScreen
