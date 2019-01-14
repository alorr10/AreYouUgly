import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from 'react-native';
const NoCameraPermissions = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      We don't have permission to use your camera. Go to settings to turn it on 👍
    </Text>
  </View>
);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  text: {
    fontSize: 20,
    fontFamily: '$mainTextFont',
  },
  waitingContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export const NullPermissions = () => <View style={styles.waitingContainer} />;

export default NoCameraPermissions;
