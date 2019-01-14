import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
} from 'react-native';
import { AppLoading, Font, Asset } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';

import fonts from './assets/fonts';
import requiredImages from './assets/requiredImages';

import { FontAwesome } from '@expo/vector-icons';
import EntryPoint from './app/EntryPoint';
EStyleSheet.build({
  $error: '#A51325',
  $mainTextFont: 'Circular',
  $boldTextFont: 'Circular-Bold',
  $mediumFont: 'Circular-Book',
  $blackTextFont: 'Circular-Black',
});

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  _loadAssetsAsync = async () => {
    const imageAssets = cacheImages(requiredImages);
    const fontAssets = cacheFonts(fonts);

    await Promise.all([...fontAssets, ...imageAssets]);
  };
  render() {
    return this.state.isReady ? (
      <EntryPoint />
    ) : (
      <AppLoading
        startAsync={this._loadAssetsAsync}
        onFinish={() => this.setState({ isReady: true })}
        onError={e => console.warn(e)}
      />
    );
    // return (
    //   <View
    //     style={{
    //       flex: 1,
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Text> HI ALEC </Text>
    //   </View>
    // );
  }
}

/*
   return (

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text> HI ALEC </Text>
      </View>
    );

*/
