import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import images from '../../assets';
import Modal from 'react-native-modalbox';
import { heightStyle } from '../constants';

const MoodboostModal = ({ modalIsOpen, closeModal, link }) => (
  <Modal
    style={styles.modal}
    position={'center'}
    isOpen={modalIsOpen}
    swipeToClose={false}
    backdropPressToClose={false}
  >
    <View style={styles.topModalContainer}>
      <Image source={images.moodboostLogo} style={styles.applicationSelfie} resizeMode="contain" />
      <Text style={styles.submittedText}>Want more uplifting content?</Text>
      <Text style={styles.submittedSubtext}>
        Check out the Moodboost App for quick positive news stories
        <Text style={styles.boldText}> that will make you smile</Text>
      </Text>
    </View>
    <View style={styles.line} />
    <View style={styles.button}>
      <TouchableOpacity onPress={closeModal} style={styles.noButton}>
        <Text style={styles.noText}>Maybe Later</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={link} style={styles.yesButton}>
        <Text style={styles.yesText}>Ok</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

const styles = EStyleSheet.create({
  modal: {
    ...heightStyle(
      {
        height: '32%',
      },
      {
        height: '32%',
      },
      {
        height: '45%',
      },
      {
        height: '50%',
      }
    ),
    '@media (min-height: 1023)': {
      height: '25%',
    },
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
    width: '50%',
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: EStyleSheet.hairlineWidth,
    borderLeftColor: 'lightgrey',
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
});

export default MoodboostModal;
