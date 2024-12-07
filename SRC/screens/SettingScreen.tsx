import React, { useState } from 'react';
import { Text, View, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.menuIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.settingsContainer}>
        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              thumbColor={darkMode ? 'red' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#ff8080' }}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              thumbColor={notifications ? 'red' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#ff8080' }}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Sound Effects</Text>
            <Switch
              value={sound}
              onValueChange={setSound}
              thumbColor={sound ? 'red' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#ff8080' }}
            />
          </View>
        </View>

        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 16,
    paddingTop: 50,
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    color: 'white',
    fontSize: 24,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsContainer: {
    flex: 1,
    padding: 20,
  },
  settingSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  versionText: {
    fontSize: 16,
    color: 'gray',
  }
});

export default SettingsScreen;