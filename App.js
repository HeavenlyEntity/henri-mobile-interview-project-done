import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import { Portal } from 'react-native-paper';

import {Provider, useSelector} from 'react-redux'
import store from "./store/store";
const Stack = createStackNavigator();

export default function App(props) {

    const isLoadingComplete = useCachedResources();

store.subscribe(() => console.log('Redux Store', store.getState()))

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store}>
            <Portal.Host>
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
                    <NavigationContainer linking={LinkingConfiguration}>
                        <Stack.Navigator>
                            <Stack.Screen name="Root" component={BottomTabNavigator} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </View>
            </Portal.Host>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
