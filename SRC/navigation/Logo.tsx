import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo: React.FC = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        //source={require('../assets/splash.png')} // Replace with your logo path
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',  // Position the logo absolutely
    top: -72,  // Adjust the top position as needed
    right: 8,  // Adjust the right position as needed
    zIndex: 10,  // Ensure the logo is on top of other elements
  },
  logo: {
    width: 103,  // Adjust the width as needed
    height: 102,  // Adjust the height as needed
    resizeMode: 'contain',  // Ensure the logo maintains its aspect ratio
  },
});

export default Logo;
