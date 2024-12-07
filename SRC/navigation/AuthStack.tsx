import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import BottomTabs from './BottomTabs';
import RoleSelectionScreen from './SRC/screens/RoleSelectionScreen';

export type AuthStackParamList = {
  RoleSelection: undefined;
  Login: { role: string };
  Signup: undefined;
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface AuthStackProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthStack: React.FC<AuthStackProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <Stack.Navigator initialRouteName="RoleSelection">
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="RoleSelection"
            component={RoleSelectionScreen}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {(props) => (
              <LoginScreen
                {...props}
                //onLogin={() => setIsAuthenticated(true)}
              />
            )}
          </Stack.Screen>

          <Stack.Screen 
            name="Signup" 
            component={SignupScreen} 
            options={{ headerShown: false }} 
          />
        </>
      ) : (
        <Stack.Screen 
          name="HomeScreen" 
          component={BottomTabs} 
          options={{ headerShown: false }} 
        />
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;