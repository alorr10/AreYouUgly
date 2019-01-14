import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import EStyleSheet from 'react-native-extended-stylesheet';

export const Reset = ({ onPress, visible }) => {
  if (!visible) return <View style={styles.invisible} />;
  return (
    <TouchableOpacity style={styles.resetButton} onPress={onPress}>
      <FontAwesome name="remove" size={30} color="#333333" />
    </TouchableOpacity>
  );
};

export const FlipButton = ({ onPress }) => (
  <TouchableOpacity style={styles.resetButton} onPress={onPress}>
    <FontAwesome name="rotate-right" size={30} color="#333333" />
  </TouchableOpacity>
);

export const ShareButton = ({ onPress, visible }) => {
  if (!visible) return <View style={styles.invisible} />;
  return (
    <TouchableOpacity style={styles.resetButton} onPress={onPress}>
      <FontAwesome name="share" size={28} color="#333333" />
    </TouchableOpacity>
  );
};

export const ActionButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.scanButton}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = EStyleSheet.create({
  invisible: {
    width: 50,
    height: 50,
  },

  scanButton: {
    position: 'absolute',
    bottom: 25,
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },

  buttonText: {
    textAlign: 'center',
    fontFamily: '$boldTextFont',
  },

  resetButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
