import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './SRC/screens/HomeScreen';
import LoginScreen from './SRC/screens/LoginScreen';
import SignupScreen from './SRC/screens/SignupScreen';
import ScoresScreen from './SRC/screens/ScoresScreen';
import SettingsScreen from './SRC/screens/SettingScreen';
import ARScene from './SRC/screens/ARScene';
import RoleSelectionScreen from './SRC/screens/RoleSelectionScreen';

export type RootStackParamList = {
  RoleSelection: undefined;
  Login: { onLogin: () => void; role: string };
  Signup: undefined;
  Home: undefined;
  Scores: undefined;
  Settings: undefined;
  Camera: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppPro: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="RoleSelection"
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              initialParams={{ onLogin: () => setIsAuthenticated(true) }}
            />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Scores" component={ScoresScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Camera" component={ARScene} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppPro;