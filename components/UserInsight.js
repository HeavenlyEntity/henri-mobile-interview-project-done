import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';

const UserInsight = props => {

	const getFirstLastInitials = (name) => {
		return name.split(' ').map(name => name[0]).join('')
	}
	// const imageUrl = new URL(props.userImage)
	return (
		<View style={styles.container}>
			<View style={{ paddingTop: '2%', paddingBottom: '-20%'}}>
				{props.userImage !== undefined  ? <Avatar.Image style={styles.avatar} size={50} source={{uri: props.userImage}} /> : <Avatar.Text size={50} label={getFirstLastInitials(props.name)} /> }
				<View style={{ marginLeft: '17%', position: 'absolute', top: '15%'}}>
					<Text style={styles.userNameText}>{props.name}</Text>
					<Text style={styles.positionTitle}>{props.company.catchPhrase}</Text>
				</View>
				<Divider/>
				<View style={styles.description}>
					<Text>Company: {props.company.bs}</Text>
					<Text>City: {props.address.city}</Text>
					<Text>Email: {props.email}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {display: 'flex', justifyContent: 'center', width: '90%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '2%', backgroundColor: 'whitesmoke', borderRadius: 8},
	avatar: {direction: 'ltr', marginLeft: '2%', marginTop: '2%', marginBottom: '1%'},
	userNameText: {fontWeight: 'bold', fontSize: 15},
	description: {marginLeft: '2%'},
	positionTitle: {position: 'relative', top: '-5%', fontStyle: 'italic' +
			''}
})

UserInsight.propTypes = {
	userImage: PropTypes.string
};

export default UserInsight;
