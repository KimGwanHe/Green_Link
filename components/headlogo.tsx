import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const HeaderLogo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo_end.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: 80,
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 50,
  },
});

export default HeaderLogo;
