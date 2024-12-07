import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();

  const handleSignOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'RoleSelection' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setShowMenu(!showMenu)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={showMenu}
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.dropdown}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => {
                setShowMenu(false);
                navigation.navigate('Home');
              }}
            >
              <Text style={styles.menuItemText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                navigation.navigate('Scores');
              }}
            >
              <Text style={styles.menuItemText}>Scores</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                navigation.navigate('Camera');
              }}
            >
              <Text style={styles.menuItemText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                navigation.navigate('Settings');
              }}
            >
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuItem, styles.signOutItem]}
              onPress={() => {
                setShowMenu(false);
                handleSignOut();
              }}
            >
              <Text style={[styles.menuItemText, styles.signOutText]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={require('../assets/splash.png')} style={styles.image} />
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Welcome to AR Education App
          </Text>
          
          <Text style={styles.description}>
            Our innovative AR education app brings learning to life through augmented reality technology.
            Experience interactive 3D models and immersive learning environments that make education more
            engaging and effective.
          </Text>

          <Text style={styles.subtitle}>
            Key Features:
          </Text>
          
          <View style={styles.featureList}>
            <Text style={styles.feature}>
              • Interactive 3D Models
            </Text>
            <Text style={styles.feature}>
              • Real-time Learning Assessment
            </Text>
            <Text style={styles.feature}>
              • Personalized Learning Path
            </Text>
            <Text style={styles.feature}>
              • Progress Tracking
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'red',
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    color: 'white',
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 180,
  },
  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
    color: '#000000',
  },
  signOutItem: {
    borderBottomWidth: 0,
  },
  signOutText: {
    color: 'red',
    fontWeight: 'bold',
  },
  scrollContent: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#000000',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    color: '#000000',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  featureList: {
    width: '100%',
    paddingLeft: 20,
  },
  feature: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
    color: '#000000',
  }
});

export default HomeScreen;