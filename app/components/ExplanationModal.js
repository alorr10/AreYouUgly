import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import images from '../../assets';
import Modal from 'react-native-modalbox';
import { heightStyle } from '../constants';

const ExplanationModal = ({ modalIsOpen, closeModal }) => (
  <Modal
    style={styles.modal}
    position={'center'}
    isOpen={modalIsOpen}
    swipeToClose={false}
    backdropPressToClose
    onClosed={closeModal}
  >
    <View style={styles.topModalContainer}>
      <Image
        source={images.cameraPermissions}
        style={styles.applicationSelfie}
        resizeMode="contain"
      />
      <Text style={styles.submittedSubtext}>
        Beauty is subjective. It may sound cliche, but everyone has something beautiful about them.
        Even if you don't look like the gorgeous people on TV, you have something unique and special
        that no one else does. It's your job to find it and share it with the world ☺️.
      </Text>
    </View>
    <View style={styles.line} />
    <View style={styles.button}>
      <TouchableOpacity onPress={closeModal} style={styles.yesButton}>
        <Text style={styles.yesText}>Ok</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

export const UglyModal = ({ modalIsOpen, closeModal, toggleUglyMode, uglyMode }) => (
  <Modal
    style={styles.modal}
    position={'center'}
    isOpen={modalIsOpen}
    swipeToClose={false}
    backdropPressToClose={false}
  >
    {uglyMode ? (
      <React.Fragment>
        <View style={styles.topModalContainer}>
          <Image
            source={images.moodboostLogo}
            style={styles.applicationSelfie}
            resizeMode="contain"
          />
          <Text style={styles.submittedText}>Switch back to nice mode?</Text>
          <Text style={styles.submittedSubtext}>You still are beautiful, don't worry.</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.button}>
          <TouchableOpacity onPress={closeModal} style={styles.noButtonUgly}>
            <Text style={styles.noText}>Maybe Later</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleUglyMode} style={styles.yesButtonUgly}>
            <Text style={styles.yesText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <View style={styles.topModalContainer}>
          <Image
            source={images.moodboostLogo}
            style={styles.applicationSelfie}
            resizeMode="contain"
          />
          <Text style={styles.submittedText}>Want to prank your friends?</Text>
          <Text style={styles.submittedSubtext}>
            Switch to ugly mode and share a picture to make it seem like your ugly.
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.button}>
          <TouchableOpacity onPress={closeModal} style={styles.noButtonUgly}>
            <Text style={styles.noText}>Maybe Later</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleUglyMode} style={styles.yesButtonUgly}>
            <Text style={styles.yesText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    )}
  </Modal>
);

const styles = EStyleSheet.create({
  modal: {
    ...heightStyle(
      {
        height: '37%',
      },
      {
        height: '45%',
      },
      {
        height: '50%',
      },
      {
        height: '65%',
      }
    ),
    width: '90%',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'rgb(242, 225, 207)',
    // justifyContent: 'center',
  },

  topModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  applicationSelfie: {
    width: 100,
    height: 100,
  },

  submittedText: {
    color: '#03CC99',
    fontSize: 16,
    fontFamily: '$mainTextFont',
    marginTop: 8,
  },

  submittedSubtext: {
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: '$mainTextFont',
    fontSize: 16,
    marginTop: 3,
  },

  line: {
    width: '100%',
    borderWidth: EStyleSheet.hairlineWidth,
    borderColor: 'lightgrey',
    marginTop: 20,
  },

  button: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
  },

  noButton: {
    width: '50%',
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: EStyleSheet.hairlineWidth,
    borderRightColor: 'lightgrey',
  },

  yesButton: {
    width: '100%',
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },

  noText: {
    fontSize: 16,
    fontFamily: '$mainTextFont',
  },

  yesText: {
    fontSize: 16,
    fontFamily: '$mainTextFont',
  },

  boldText: {
    fontFamily: '$boldTextFont',
  },

  noButtonUgly: {
    width: '50%',
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: EStyleSheet.hairlineWidth,
    borderRightColor: 'lightgrey',
  },

  yesButtonUgly: {
    width: '50%',
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: EStyleSheet.hairlineWidth,
    borderLeftColor: 'lightgrey',
  },
});

export default ExplanationModal;
