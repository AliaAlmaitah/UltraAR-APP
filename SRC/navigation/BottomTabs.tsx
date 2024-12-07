import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ScoresScreen from '../screens/ScoresScreen';
import SettingsScreen from '../screens/SettingScreen'; 
import ARScene from '../screens/ARScene'; // Import ARScene

// Define types for the bottom tab navigator
type RootStackParamList = {
  Home: undefined;
  Scores: undefined;
  Settings: undefined;
  Camera: undefined;
};

// Create a Bottom Tab Navigator
const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 0 }}>
              <Image
                source={require('../assets/Home.png')}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  tintColor: focused ? '#ff0000' : '#748c94',
                }}
              />
              <Text style={{ color: focused ? '#ff0000' : '#748c94', fontSize: 14 }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Scores"
        component={ScoresScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 0 }}>
              <Image
                source={require('../assets/Scores.png')}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  tintColor: focused ? '#ff0000' : '#748c94',
                }}
              />
              <Text style={{ color: focused ? '#ff0000' : '#748c94', fontSize: 14 }}>Scores</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 0 }}>
              <Image
                source={require('../assets/Settings.png')}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  tintColor: focused ? '#ff0000' : '#748c94',
                }}
              />
              <Text style={{ color: focused ? '#ff0000' : '#748c94', fontSize: 14 }}>Settings</Text>
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Camera"
        component={ARScene} // Set ARScene as the component for Camera
        options={{
          
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 0 }}>
              <Image
                source={require('../assets/AR.png')}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  tintColor: focused ? '#ff0000' : '#748c94',
                }}
              />
              <Text style={{ color: focused ? '#ff0000' : '#748c94', fontSize: 14 }}>Camera</Text>
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabs;
