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
  Share,
  Linking,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {
  Camera,
  Permissions,
  FaceDetector,
  ImageManipulator,
  Constants,
  takeSnapshotAsync,
  MediaLibrary,
} from 'expo';
import _ from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet';
const { height, width } = Dimensions.get('window');
import { FontAwesome } from '@expo/vector-icons';
import { analyzations, responses, uglyResponses } from './constants';
import NoCameraPermissions, { NullPermissions } from './NoCameraAccess/NoCameraPermissions';
import { Reset, ShareButton, FlipButton, ActionButton } from './components/Buttons';
import MoodboostModal from './components/MoodboostModal';
import ExplanationModal, { UglyModal } from './components/ExplanationModal';
import images from '../assets';

const faceDetectorSettings = {
  mode: FaceDetector.Constants.Mode.fast,
  tracking: false,
  detectLandmarks: FaceDetector.Constants.Landmarks.all,
  runClassifications: FaceDetector.Constants.Classifications.all,
};
export default class EntryPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      scanning: false,
      faces: [],
      analyzationsIndex: 0,
      numberOfAnalyzations: 0,
      responseIndex: 0,
      uglyResponsesIndex: 0,
      uri: null,
      showResult: false,
      faceDetecting: true,
      modalIsOpen: false,
      explanationModalIsOpen: false,
      hasSeenMoodboostModal: false,
      uglyMode: false,
      uglyModalIsOpen: false,
    };
    this.heightValue = new Animated.Value(0);
    this.camera = React.createRef();
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  onFacesDetected = ({ faces }) => {
    if (faces.length) this.setState({ faces });
  };

  updateAnalyzationsIndex = () => {
    if (this.state.numberOfAnalyzations < 3) {
      this.setState(
        prevState => ({
          analyzationsIndex:
            prevState.analyzationsIndex === analyzations.length - 1
              ? 0
              : prevState.analyzationsIndex + 1,
          numberOfAnalyzations: prevState.numberOfAnalyzations + 1,
        }),
        () => {
          setTimeout(this.updateAnalyzationsIndex, 3000);
        }
      );
    }
  };

  scan = async () => {
    const { faces } = await this.detectFaces(this.state.uri);
    if (!faces.length) {
      Alert.alert('No Face Detected', 'Please Try Again', [{ text: 'OK', onPress: this.reset }]);
      return;
    }
    this.setState(
      {
        scanning: true,
        showResult: false,
        numberOfAnalyzations: 1,
        responseIndex: _.random(0, responses.length - 1),
      },
      () => setTimeout(this.updateAnalyzationsIndex, 3000)
    );

    this.heightValue.setValue(0);
    Animated.timing(this.heightValue, {
      toValue: 1,
      duration: 9000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(this.animationOver);
  };

  animationOver = () => {
    this.setState(prevState => ({
      showResult: true,
      scanning: false,
      analyzationsIndex:
        prevState.analyzationsIndex === analyzations.length - 1
          ? 0
          : prevState.analyzationsIndex + 1,
    }));
    // setTimeout(this.openMoodboostModal, 5000);
  };

  reset = () => {
    this.setState({
      scanning: false,
      faces: [],
      numberOfAnalyzations: 1,
      uri: null,
      showResult: false,
      faceDetecting: true,
      uglyMode: false,
    });
  };

  detectFaces = async imageUri => {
    return await FaceDetector.detectFacesAsync(imageUri, {
      mode: FaceDetector.Constants.Mode.fast,
    });
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 1 };
      try {
        const data = await this.camera.current.takePictureAsync(options);
        const { uri } = await ImageManipulator.manipulateAsync(data.uri, [
          { flip: { horizontal: true } },
        ]);
        this.setState({ uri });
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    return null;
  };

  renderFace = () => {
    const { faces } = this.state;
    if (faces[0]) {
      const { bounds, faceID, rollAngle, yawAngle } = faces[0];
      return (
        <View
          key={faceID}
          style={[
            styles.face,
            {
              ...bounds.size,
              left: bounds.origin.x,
              top: bounds.origin.y,
            },
          ]}
        />
      );
    }
  };

  takeScreenshot = async () => {
    // setTimeout(async () => {
    //   try {
    //     const options = {
    //       format: 'png', /// PNG because the view has a clear background
    //       result: 'file',
    //       quality: 1,
    //       height,
    //       width,
    //     };
    //     const result = await takeSnapshotAsync(this.imageView, options);
    //     console.log(result);
    //     this.share(result);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }, 200);
    Alert.alert(
      'Screenshot to share!',
      `Or switch ${
        this.state.uglyMode
          ? 'back to normal, beautiful mode.'
          : 'to ugly mode to prank your friends.'
      }`,
      [{ text: 'Switch', onPress: this.toggleUglyMode }, { text: 'OK', onPress: () => {} }]
    );
  };

  share = async result => {
    Share.share({
      message: '',
      url: result,
    })
      .then(info => setTimeout(this.openMoodboostModal, 1000))
      .catch(error => console.log(error));
    // if (result) {
    //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //   if (status === 'granted') {
    //     const asset = await Expo.MediaLibrary.createAssetAsync(result);
    //     let encodedURL = encodeURIComponent(asset);
    //     let instagramURL = `instagram://library?AssetPath=${encodedURL}`;
    //     try {
    //       await Linking.openURL(instagramURL);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // }
  };

  flip = () => {
    this.setState(prevState => ({
      type: prevState.type === 'back' ? 'front' : 'back',
    }));
  };

  openMoodboostModal = () => {
    if (!this.state.uri || this.state.hasSeenMoodboostModal) return;
    if (this.state.explanationModalIsOpen) {
      setTimeout(this.openMoodboostModal, 2000);
    } else {
      this.setState({ modalIsOpen: true, hasSeenMoodboostModal: true });
    }
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, explanationModalIsOpen: false, uglyModalIsOpen: false });
  };

  openExplanationModal = () => {
    this.setState({ explanationModalIsOpen: true });
  };

  openUglyModal = () => {
    this.setState({ uglyModalIsOpen: true });
  };

  link = () => {
    Linking.openURL('https://itunes.apple.com/us/app/mood-boost/id1375114377?mt=8');
    this.setState({ modalIsOpen: false });
  };

  toggleUglyMode = () => {
    this.setState(prevState => ({
      uglyMode: !prevState.uglyMode,
      uglyModalIsOpen: false,
      uglyResponsesIndex: _.random(0, uglyResponses.length - 1),
    }));
  };
  render() {
    const {
      hasCameraPermission,
      scanning,
      showResult,
      faces,
      analyzationsIndex,
      uri,
      responseIndex,
      faceDetecting,
      modalIsOpen,
      explanationModalIsOpen,
      uglyModalIsOpen,
      uglyMode,
      uglyResponsesIndex,
    } = this.state;

    const scaleInterpolateTwo = uri
      ? this.heightValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, -faces[0].bounds.size.height + 30, 0],
        })
      : null;

    const scaleStyleTwo = {
      transform: [{ translateY: scaleInterpolateTwo }],
    };

    if (hasCameraPermission === null) {
      return <NullPermissions />;
    } else if (!hasCameraPermission) {
      return <NoCameraPermissions />;
    } else if (uri !== null) {
      return (
        <View
          style={{ flex: 1 }}
          ref={view => {
            this.imageView = view;
          }}
        >
          <ImageBackground source={{ uri }} style={[styles.insideImageContainerStyle]}>
            <TopBar
              onPressReset={this.reset}
              onPressScreenshot={this.takeScreenshot}
              visible={showResult}
              resetVisible={!scanning}
            />
            {!scanning && !showResult ? (
              <BarButton onPress={this.scan} text="SCAN" />
            ) : showResult ? (
              <BarButton
                onPress={this.openExplanationModal}
                text={uglyMode ? uglyResponses[uglyResponsesIndex] : responses[responseIndex]}
              />
            ) : (
              <BarButton onPress={null} text={analyzations[analyzationsIndex]} />
            )}
            {scanning && (
              <View
                style={[
                  styles.face,
                  {
                    ...faces[0].bounds.size,
                    left: faces[0].bounds.origin.x,
                    top: faces[0].bounds.origin.y,
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.scanLine,
                    { width: faces[0].bounds.size.width - 4 },
                    scaleStyleTwo,
                  ]}
                />
              </View>
            )}
          </ImageBackground>
          {showResult && (
            <React.Fragment>
              <MoodboostModal
                modalIsOpen={modalIsOpen}
                closeModal={this.closeModal}
                link={this.link}
              />
              <ExplanationModal modalIsOpen={explanationModalIsOpen} closeModal={this.closeModal} />
              <UglyModal
                modalIsOpen={uglyModalIsOpen}
                closeModal={this.closeModal}
                toggleUglyMode={this.toggleUglyMode}
                uglyMode={uglyMode}
              />
            </React.Fragment>
          )}
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={this.camera}
            style={styles.container}
            type={this.state.type}
            faceDetectorSettings={faceDetectorSettings}
            onFacesDetected={faceDetecting ? this.onFacesDetected : null}
          >
            {this.renderFace()}
            <FirstTopBar flip={this.flip} />
            {faces[0] && <ActionButton onPress={this.takePicture} title="Take photo" />}
          </Camera>
        </View>
      );
    }
  }
}

const TopBar = ({ onPressReset, onPressScreenshot, visible, resetVisible }) => (
  <View style={styles.topbar}>
    <Reset onPress={onPressReset} visible={resetVisible} />
    <Text style={styles.title}>Are You Ugly?</Text>
    <ShareButton onPress={onPressScreenshot} visible={visible} />
  </View>
);

const FirstTopBar = ({ flip }) => (
  <View style={styles.topbar}>
    <FlipButton onPress={flip} />
    <Text style={styles.title}>Are You Ugly?</Text>
    <ShareButton onPress={null} visible={false} />
  </View>
);

const BarButton = ({ onPress, text }) => (
  <TouchableHighlight style={styles.analyzeContainer} onPress={onPress} underlayColor="#f5f3f1">
    <Text style={styles.analyzeText}>{text}</Text>
  </TouchableHighlight>
);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  topbar: {
    position: 'absolute',
    top: Constants.statusBarHeight,
    width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  scanLine: {
    position: 'absolute',
    bottom: 0,
    width,
    height: 30,
    backgroundColor: 'white',
  },
  insideImageContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: 'white',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  title: {
    fontSize: 30,
    fontFamily: '$mainTextFont',
  },

  analyzeContainer: {
    position: 'absolute',
    bottom: 50,
    height: 100,
    width,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  analyzeText: {
    fontSize: 20,
    fontFamily: '$mainTextFont',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
/*
faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              tracking: false,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.all,
            }}
            onFacesDetected={this.onFacesDetected}

            faces.map(face => <Glasses key={face.faceID} face={face} />)

            !faces.length && (
              <Text
                style={{ position: 'absolute', top: 150, backgroundColor: 'white', padding: 10 }}
              >
                {' '}
                No Face Detected{' '}
              </Text>
            )

            {(scanning || showResult) && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  marginBottom: 50,
                }}
              >
                <Text style={{ padding: 10, fontSize: 20 }}>
                  {scanning ? 'Hold Still...' : responses[index]}
                </Text>
              </View>
            )}
            */
