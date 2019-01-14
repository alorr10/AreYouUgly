import { Dimensions, Platform, StatusBar } from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

export function isIphoneXS() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height > 812 || dimen.width > 812)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function whichIphone() {
  switch (height) {
    case 568:
      return 'iPhone 5, 5s, 5c, SE';
    case 667:
      return 'iPhone 6, 6s, 7, 8';
    case 812:
      return 'iPhone X';
    case 896:
      return 'iphone Xs';
  }
}

export function heightStyle(
  iphoneXSStyle = {},
  iphoneXStyle = {},
  regularStyle = {},
  smallStyle = {}
) {
  if (height > 890) return iphoneXSStyle;
  else if (height > 810) return iphoneXStyle;
  else if (height > 660) return regularStyle;
  return smallStyle;
}

export const responses = [
  "Guess what... You're hot!",
  "Guess what... You're beautiful!",
  'Guess what... You are gorgeous!',
  '10/10',
  'I would totally kiss that face',
  "Dangggg you're hot!",
  'Wow. You are gorgeous.',
  "What were you worried about?! You're stunning.",
  'Let me connect you to my friend who manages models.',
];

export const uglyResponses = [
  'Um, no comment.',
  '4/10',
  'Uh, you could try being a voice actor?',
  "Let's just say modeling isn't in the cards for you.",
  "Yeah, you're ugly.",
  "The good news: you're finally in the top 1% of something. The bad news: it's for being ugly.",
  'I hope you have a good personality...',
  "Don't even bother wasting money on a makeover. It's hopeless.",
];

export const analyzations = [
  'Analyzing facial symmetry...',
  'Comparing bone structure to control group...',
  'Correcting for pimple you thought no one would notice...',
  'Detecting facial landmarks for analysis...',
  'Searching database for facsimile faces in range...',
  'Removing skin blemishes on the backend...',
];
