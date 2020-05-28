import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import TodoScreen from '../screens/TodoScreen';
import UsersScreen from "../screens/UsersScreen";

const BottomTab = createMaterialBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {


  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
          <BottomTab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                  title: 'Feed',
                  tabBarIcon: ({ focused }) => <TabBarIcon focused={!focused} name="md-home" />,
              }}
          />
          <BottomTab.Screen
              name="Users"
              component={UsersScreen}
              options={{
                  title: 'Users',
                  tabBarIcon: ({ focused }) => <TabBarIcon focused={!focused} name="md-people" />,
              }}
          />
          <BottomTab.Screen
              name="Todo"
              component={TodoScreen}
              options={{
                  title: 'To-Do',
                  tabBarIcon: ({ focused }) => <TabBarIcon focused={!focused} name="md-book" />,
              }}
          />
      </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Feed Time';
    case 'Todo':
      return 'View To-Do List';
    case 'Users':
      return 'View all Users';
  }
}
