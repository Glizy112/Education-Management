import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {COLORS} from '../theme/Colors';
import {paraGray} from '../theme/styles/Base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export class Header extends Component {
  state = {
    notificationAlertShow: false,
    notificationMessage: '',
  };
  render() {
    return (
      <>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: this.props.justifyContent
              ? 'space-between'
              : 'flex-start',
            alignItems: 'center',
            backgroundColor: this.props.backgroundColor ? '' : COLORS.active,
            marginTop: 10,
            paddingBottom: 5,
          }}>
          {this.props.profile ? (
            <TouchableOpacity
              onPress={() =>
                this.props.onPress ? this.props.onPress() : null
              }>
              <View
                darkShadowColor={this.props.darkTheme ? '#070707' : '#97A7C3'} // <- set this
                lightShadowColor={this.props.darkTheme ? '#727272' : 'white'} // <- this
                swapShadows
                useArt
                style={{
                  ...styles.iconStyle,
                  // backgroundColor: COLORS.bg,
                }}>
                <Feather name="menu" size={22} color="#B9BCC5" />
              </View>
            </TouchableOpacity>
          ) : this.props.back ? (
            <TouchableOpacity
              onPress={() =>
                this.props.onPress
                  ? this.props.onPress()
                  : this.props.navigation.goBack()
              }
              style={{marginLeft: -10, marginBottom: 0}}>
              <View
                darkShadowColor={this.props.darkTheme ? '#070707' : '#97A7C3'} // <- set this
                lightShadowColor={this.props.darkTheme ? '#727272' : 'white'} // <- this
                swapShadows
                useArt
                style={{
                  ...styles.iconStyle,
                  // backgroundColor: COLORS.bg,
                }}>
                <AntDesign
                  name="arrowleft"
                  size={22}
                  color={
                    this.props.color
                      ? this.props.color
                      : this.props.darkTheme
                      ? '#B9BCC5'
                      : COLORS.bg
                  }
                />
              </View>
            </TouchableOpacity>
          ) : this.props.backbutton ? (
            <TouchableOpacity
              onPress={() =>
                this.props.backPress
                  ? this.props.backPress()
                  : this.props.navigation.navigate()
              }
              style={{marginLeft: -10, marginBottom: 0}}>
              <View
                darkShadowColor={this.props.darkTheme ? '#070707' : '#97A7C3'} // <- set this
                lightShadowColor={this.props.darkTheme ? '#727272' : 'white'} // <- this
                swapShadows
                useArt
                style={{
                  ...styles.iconStyle,
                  // backgroundColor: COLORS.bg,
                }}>
                <AntDesign
                  name="left"
                  size={24}
                  color={
                    this.props.color
                      ? this.props.color
                      : this.props.darkTheme
                      ? '#B9BCC5'
                      : COLORS.bg
                  }
                />
              </View>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {this.props.Image && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 15,
              }}>
              <Image
                source={
                  //   this.props.darkTheme
                  // ? require('../assets/logo-white.png')
                  // :
                  this.props.source ? this.props.source() : ''
                }
              />
            </View>
          )}
          {this.props.image ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={
                  //   this.props.darkTheme
                  // ? require('../assets/logo-white.png')
                  // :
                  this.props.source ? this.props.source() : ''
                }
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: this.props.marginLeft ? 20 : 0,
              }}>
              <Text
                style={[
                  paraGray.largebold,
                  {
                    fontSize: 20,
                    color: this.props.color ? this.props.color : COLORS.bg,
                    opacity: 1,
                    // textTransform: 'uppercase',
                  },
                ]}>
                {this.props.headerFirstName}
              </Text>
              <Text
                style={[
                  paraGray.darklarge,
                  {
                    fontSize: 17,
                    color: this.props.color ? this.props.color : COLORS.txtGray,
                    opacity: 1,
                  },
                ]}>
                {this.props.headerName}
              </Text>
            </View>
          )}
          {this.props.rightIcon ? (
            <TouchableOpacity
              onPress={() =>
                this.props.onPresss
                  ? this.props.onPresss()
                  : this.props.navigation.navigate()
              }>
              <View
                darkShadowColor={this.props.darkTheme ? '#070707' : '#97A7C3'} // <- set this
                lightShadowColor={this.props.darkTheme ? '#727272' : 'white'} // <- this
                swapShadows
                useArt
                style={{
                  ...styles.iconStyle,
                  // backgroundColor: COLORS.bg,
                }}>
                <Feather name="settings" size={22} color={COLORS.bg} />
              </View>
            </TouchableOpacity>
          ) : this.props.rightshare ? (
            <TouchableOpacity
              onPress={() =>
                this.props.onPresss
                  ? this.props.onPresss()
                  : this.props.navigation.navigate()
              }>
              <View
                darkShadowColor={this.props.darkTheme ? '#070707' : '#97A7C3'} // <- set this
                lightShadowColor={this.props.darkTheme ? '#727272' : 'white'} // <- this
                swapShadows
                useArt
                style={{
                  ...styles.iconStyle,
                  // backgroundColor: COLORS.bg,
                }}>
                <AntDesign name="sharealt" size={22} color={COLORS.bg} />
              </View>
            </TouchableOpacity>
          ) : this.props.rightdownload ? (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              onPress={() =>
                this.props.onPresss
                  ? this.props.onPresss()
                  : this.props.navigation.navigate()
              }>
              <View
                darkShadowColor={this.props.darkTheme ? '#070707' : '#97A7C3'} // <- set this
                lightShadowColor={this.props.darkTheme ? '#727272' : 'white'} // <- this
                swapShadows
                useArt
                style={{
                  ...styles.iconStyle,
                  // backgroundColor: COLORS.bg,
                }}>
                <Feather name="download" size={30} color={COLORS.bg} />
              </View>
            </TouchableOpacity>
          ) : this.props.rightText ? (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              onPress={() =>
                this.props.onPresss
                  ? this.props.onPresss()
                  : this.props.navigation.navigate()
              }>
              <View
                darkShadowColor={this.props.darkTheme ? '#070707' : '#97A7C3'} // <- set this
                lightShadowColor={this.props.darkTheme ? '#727272' : 'white'} // <- this
                swapShadows
                useArt
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.bg,
                  width: '32%',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.active, marginTop: 2},
                  ]}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          ) : this.props.righthistory ? (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              onPress={() =>
                this.props.onPresss
                  ? this.props.onPresss()
                  : this.props.navigation.navigate()
              }>
              <View
                darkShadowColor={this.props.darkTheme ? '#070707' : '#97A7C3'} // <- set this
                lightShadowColor={this.props.darkTheme ? '#727272' : 'white'} // <- this
                swapShadows
                useArt
                style={{
                  flexDirection: 'row',
                  // backgroundColor: COLORS.bg,
                  width: '40%',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[paraGray.darkpara, {color: COLORS.bg, fontSize: 16}]}>
                  History
                </Text>
              </View>
            </TouchableOpacity>
          ) : this.props.righttxt ? (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              onPress={() =>
                this.props.onPresss
                  ? this.props.onPresss()
                  : this.props.navigation.navigate()
              }>
              <View
                darkShadowColor={this.props.darkTheme ? '#070707' : '#97A7C3'} // <- set this
                lightShadowColor={this.props.darkTheme ? '#727272' : 'white'} // <- this
                swapShadows
                useArt
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.bg,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {
                      color: COLORS.black,
                      marginHorizontal: 10,
                      marginVertical: 4,
                    },
                  ]}>
                  Publish
                </Text>
              </View>
            </TouchableOpacity>
          ) : this.props.bellicon ? (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              onPress={() =>
                this.props.onPresss
                  ? this.props.onPresss()
                  : this.props.navigation.navigate()
              }>
              <View
                darkShadowColor={this.props.darkTheme ? '#070707' : '#97A7C3'} // <- set this
                lightShadowColor={this.props.darkTheme ? '#727272' : 'white'} // <- this
                swapShadows
                useArt
                style={{
                  flexDirection: 'row',
                  // backgroundColor: COLORS.bg,
                  width: '40%',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather
                  style={{marginRight: 5, marginTop: 2}}
                  name="bell"
                  size={17}
                  color={COLORS.active}
                />
              </View>
            </TouchableOpacity>
          ) : this.props.time ? (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              onPress={() =>
                this.props.onPresss
                  ? this.props.onPresss()
                  : this.props.navigation.navigate()
              }>
              <View
                darkShadowColor={this.props.darkTheme ? '#070707' : '#97A7C3'} // <- set this
                lightShadowColor={this.props.darkTheme ? '#727272' : 'white'} // <- this
                swapShadows
                useArt
                style={{
                  flexDirection: 'row',
                  // backgroundColor: COLORS.bg,
                  // width: '40%',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Entypo
                  style={{marginTop: 2}}
                  name="back-in-time"
                  size={24}
                  color={COLORS.bg}
                />
              </View>
            </TouchableOpacity>
          ) : this.props.qr ? (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              onPress={() =>
                this.props.onPresss
                  ? this.props.onPresss()
                  : this.props.navigation.navigate()
              }>
              <View
                darkShadowColor={this.props.darkTheme ? '#070707' : '#97A7C3'} // <- set this
                lightShadowColor={this.props.darkTheme ? '#727272' : 'white'} // <- this
                swapShadows
                useArt
                style={{
                  flexDirection: 'row',
                  // backgroundColor: COLORS.bg,
                  // width: '40%',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons
                  name="qr-code-scanner"
                  size={22}
                  color={COLORS.white}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <Text> </Text>
          )}
        </View>
        {/* <AlertComponent
          onPress={() => this.setState({notificationAlertShow: false})}
          showAlert={this.state.notificationAlertShow}
          alertMessage={this.state.notificationMessage}
        /> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    borderRadius: 100,

    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
