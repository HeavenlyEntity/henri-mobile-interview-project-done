import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
	ActivityIndicator,
	Avatar,
	Button, Caption,
	Card,
	Dialog,
	Divider,
	IconButton,
	Paragraph,
	Portal,
	Title
} from 'react-native-paper';
import store from "../store/store";
import {useSelector} from "react-redux";
import UserComment from "./UserComment";


const UserPost = props => {
	const [postOptionsOpen, setPostOptionsOpen] = React.useState(false)
	const [deletingPost, setDeletingPost] = React.useState(false)
	const [commentModalVisible, setCommentModalVisible] = React.useState(false)
	const [loadedComments, setLoadedComments] = React.useState([])
	const [loadingComments, setLoadingComments] = React.useState([])
	const commentData = useSelector(state => state.comments.commentData);
	const posts = useSelector(state => state.posts.postsData);

	const deletePost = async (postId) => {
		setDeletingPost(true)
		const deleteFeedPost = async () => {
			const deletePost = () => {
				return {
					type: 'DELETE_POST',
					payload: postId
				}
			}
			store.dispatch(deletePost())
		}
		await fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {method: 'DELETE'})
			.then(res => console.log(res))
			.then(() => deleteFeedPost())
			.catch(e => console.error('Redux Action "DELETE_POST": ', e))
		setDeletingPost(false)
		setPostOptionsOpen(false)
	}

	const getFirstLastInitials = (name) => {
		return name.split(' ').map(name => name[0]).join('')
	}

	const AvatarImage = () => {
		return props.userImage !== undefined ?
			<Avatar.Image {...props} style={styles.avatar} size={50} source={{uri: props.userImage}} />
			: <Avatar.Text {...props} size={50}
						   label={props.name ? getFirstLastInitials(props.name ? props.name : props.title) : null}
			/>
	}

	const PostOptions = () => {
		return (
			<View>
				<IconButton size={22} icon="dots-vertical" onPress={() => setPostOptionsOpen(true)} />
			</View>
		)
	}

	const loadPostedComments = (post) => {
		setCommentModalVisible(true)
		setLoadingComments(true)
		let foundComments = []
		commentData.forEach((comment) => {
			if (comment.postId === props.id) {
				foundComments.push(comment)
			}
			// console.log('loaded comment', comment)
		})
		setLoadedComments(foundComments)
		setLoadingComments(false)

	}

	return (
		<Card style={styles.container}>
			<Card.Content>
				<Card.Title
					subtitle={props.date}
					title={<Text style={styles.userNameText}>{props.name}</Text>}
					left={AvatarImage}
					right={PostOptions}
				/>
				<View style={{paddingTop: '2%', paddingBottom: '-20%', overflow: 'scroll'}}>
					<Divider />
					<View style={styles.descriptionContainer}>
						<Title>{props.title}</Title>
						<Paragraph style={styles.description}>{props.description}</Paragraph>
					</View>
				</View>
			</Card.Content>

			<Card.Actions style={{justifyContent: 'space-evenly'}}>
				<IconButton size={22} icon="thumb-up-outline" color="black" />
				<Button mode="outlined" color="#2e78b7" onPress={() => loadPostedComments()}>Comment</Button>
				<IconButton size={22} icon="thumb-down-outline" color="black" />
			</Card.Actions>
			<Portal>
				<Dialog
					visible={commentModalVisible}
					onDismiss={() => {
						setCommentModalVisible(false)
						setLoadedComments([])
					}}>
				<Dialog.ScrollArea>
					<ScrollView>
						{loadingComments ?
							<View style={styles.loadingComments}>
								<ActivityIndicator animating={true} />
								<Caption style={{textAlign: 'center'}}>Loading Comments...</Caption>
							</View>
							:
							loadedComments.map((comment, i) => {
								return (
									<View>
										<UserComment key={`comment-${i}`} email={comment.email} name={comment.name} userImage={comment.photo} body={comment.body}/>
									</View>
								)
							})
						}
					</ScrollView>
				</Dialog.ScrollArea>
				</Dialog>
				<Dialog
					visible={postOptionsOpen} onDismiss={() => setPostOptionsOpen(false)}
				>
					<Dialog.Title>Post Options</Dialog.Title>
					<Dialog.Actions>
						<Button
							loading={deletingPost}
							icon="delete"
							onPress={() => deletePost(props.id)}
						>Delete</Button>
						<Button onPress={() => setPostOptionsOpen(false)}>Cancel</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 0.35,
		borderBottomColor: 'rgb(0,0,0)',
		borderTopWidth: 0.35,
		borderTopColor: 'rgb(0,0,0)'
	},
	avatar: {direction: 'ltr', marginLeft: '2%', marginTop: '2%', marginBottom: '1%'},
	userNameText: {fontWeight: 'bold', fontSize: 15, marginTop: '2%'},
	descriptionContainer: {marginLeft: '2%', flexWrap: 'nowrap', marginRight: '2%'},
	description: {fontSize: 17,},
	loadingComments: {paddingTop: '5%', paddingBottom: '5%'},
	date: {position: 'relative', top: '-5%'}
})

UserPost.propTypes = {
	userImage: PropTypes.string
};

export default UserPost;
