import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import UserInsight from "../components/UserInsight";
import {ActivityIndicator, Caption} from "react-native-paper";
import store from "../store/store";
import {useSelector} from "react-redux";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function UsersScreen() {

	const users = useSelector(state => state.users.usersData);
	const isLoading = useSelector(state => state.users.loadingUsers);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
				{isLoading ?
					<View>
						<ActivityIndicator animating={true} />
						<Caption style={{textAlign: 'center'}}>Loading Users...</Caption>
					</View> :
					users.map((user,index) => {
						// console.log('User', user)
						return (
							<UserInsight key={`user-${index}`} userImage={user.photo}  name={user.name} address={user.address} company={user.company} email={user.email} username={user.username} website={user.website}/>
						)
					})
				}
			</ScrollView>
	</View>
	);
}

UsersScreen.navigationOptions = {
	header: null,
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	contentContainer: {
		paddingTop: 30,
	}
});
