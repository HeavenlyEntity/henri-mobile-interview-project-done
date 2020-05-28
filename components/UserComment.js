import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Caption, Divider, Paragraph} from 'react-native-paper';

const UserComment = props => {

	const getFirstLastInitials = (name) => {
		return name.split(' ').map(name => name[0]).join('')
	}

	return (
		<View style={styles.container}>
			<View style={{ paddingTop: '2%', paddingBottom: '-20%'}}>
				{props.userImage !== undefined  ? <Avatar.Image style={styles.avatar} size={40} source={{uri: props.userImage}} /> : <Avatar.Text size={40} label={getFirstLastInitials(props.name)} /> }
				<View style={{ marginLeft: '17%', position: 'absolute', top: '15%'}}>
					<Text style={styles.userNameText}>{props.name}</Text>
				</View>
				<Divider/>
				<View style={styles.description}>
					<Paragraph>{props.body}</Paragraph>
					<Caption>{props.email}</Caption>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {display: 'flex', justifyContent: 'center', width: '100%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '2%', backgroundColor: 'whitesmoke', borderRadius: 8},
	avatar: {direction: 'ltr', marginLeft: '2%', marginTop: '2%', marginBottom: '1%'},
	userNameText: {fontWeight: 'bold', fontSize: 15},
	description: {marginLeft: '2%'},
	positionTitle: {position: 'relative', top: '-5%', fontStyle: 'italic'}
})

UserComment.propTypes = {
	userImage: PropTypes.string
};

export default UserComment;
