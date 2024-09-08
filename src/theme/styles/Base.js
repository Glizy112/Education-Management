import {StyleSheet, Dimensions, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {COLORS} from '../Colors';

const container = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,

    // paddingTop: 10,
  },
});
const btnStyles = StyleSheet.create({
  login1: {
    fontSize: 18,
    color: COLORS.txtBlu,
    backgroundColor: '#e5e6ec',
  },
  signup1: {
    fontSize: 18,
    color: COLORS.white,
    backgroundColor: COLORS.bluBg,
  },
});
const paraGray = StyleSheet.create({
  lightPara: {
    fontSize: 14,
    textAlign: 'center',
    color: '#97a7c3',
    fontFamily: 'Poppins-Regular',

    opacity: 0.71,
  },
  para: {
    fontSize: 30,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    // fontWeight: "500",
    opacity: 0.71,
  },
  darkpara: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    //lineHeight: 18,
  },
  parahome: {
    fontSize: 25,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    // fontWeight: "500",
    // opacity: 0.71
  },
  largebold: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    // fontWeight: "500",
    // opacity: 0.71
  },
  largeBoldLight: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    // fontWeight: "500",
    // opacity: 0.71
  },
  lightParaSmall: {
    color: '#999999',
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  },
  header: {
    fontSize: 30,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
  },
  whitepara: {
    // fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#FFFFFF',
  },
  whitelarge: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    color: '#FFFFFF',
  },
  darklarge: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
});

const heading = StyleSheet.create({
  heading: {
    color: COLORS.bluBg,
    fontSize: 23,
    paddingBottom: 40,
    alignSelf: 'center',
    fontFamily: 'NotoSans',
    fontWeight: '600',
  },
});
const securityCheck = StyleSheet.create({
  securityCheck: {
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.7,
    shadowRadius: 6,
    borderRadius: 4,
    backgroundColor: COLORS.bg,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {btnStyles, container, paraGray, heading, securityCheck};
