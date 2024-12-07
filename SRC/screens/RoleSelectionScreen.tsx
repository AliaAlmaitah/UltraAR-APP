import React from 'react';
import { View, StyleSheet, Image, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type RoleSelectionScreenProps = NativeStackScreenProps<RootStackParamList, 'RoleSelection'>;

const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../assets/splash.png')} style={styles.logo} />
        <Text style={styles.title}>Select Your Role</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.roleButton}
            onPress={() => navigation.navigate('Login', { role: 'student' })}
          >
            <Text style={styles.buttonText}>Student</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.roleButton}
            onPress={() => navigation.navigate('Login', { role: 'instructor' })}
          >
            <Text style={styles.buttonText}>Instructor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 20,
  },
  roleButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'red',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default RoleSelectionScreen;