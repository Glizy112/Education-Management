import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import {Shadow} from 'react-native-shadow-2';

const TeachersProfile = props => {
  const {
    userinfo,
    userid,
    username,
    userimage,
    useremail,
    userdob,
    userphone,
    useraddress,
  } = useSelector(state => state.userReducer);
  const [image, setImage] = useState(null);
  // useEffect(() => {
  //    console.log("us"+JSON.stringify(userdob))
  //    console.log("us"+JSON.stringify(useraddress))
  //    console.log("us"+JSON.stringify(userphone))
  // }, []);
  const SelectImage = () => {
    let imageList = [];
    ImagePicker.openPicker({
      width: 250,
      height: 250,
      cropping: true,
    }).then(image => {
      console.log('===>>', image);
      // setDp(image.path);
      setImage(image.path);
    });
  };
  return (
    <View style={container.container}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              //height: 50,
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingTop: 12,
            }}>
            <View
              style={{
                alignItems: 'flex-start',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: 20,
                }}
                onPress={() =>
                  //   props.navigation.navigate('StudentEdit', {
                  //     studentdetail: studentdetail,
                  //   })
                  props.navigation.goBack()
                }>
                <Ionicons
                  style={{marginVertical: 5, marginHorizontal: 8}}
                  name="arrow-back"
                  size={24}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={[
                  paraGray.largebold,
                  {
                    textAlign: 'center',
                  },
                ]}
              > My Profile </Text>
            </View>
            <View>
              <Text style={{fontSize: 9}}> My Profile </Text>
            </View>
          </View>
          <View
            style={{
              paddingTop: 12,
              borderBottomWidth: 0.8,
              borderColor: COLORS.primary,
            }}
          />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.bg,
              paddingBottom: 30,
              width: '90%',
              alignSelf: 'center',
            }}
          >
            <View
              style={{
                width: '70%',
                borderRadius: 16,
                alignSelf: 'center',
                marginTop: 20,
              }}
            >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            >
              <View>
                {userimage == null ? (
                  <ImageBackground
                    style={{
                      backgroundColor: COLORS.black,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: 30,
                    }}>
                    <FontAwesome5 name="user-alt" size={25} color="#FFFFFF" />
                  </ImageBackground>
                ) : (
                  // <Avatar.Image
                  //   size={70}

                  //   source={{uri: Url.student_IMG + student.photo}}
                  //   backgroundColor={COLORS.black}
                  // />
                  <FastImage
                    style={{
                      width: 128,
                      height: 128,
                      borderRadius: 12,
                    }}
                    source={{uri: Url.profile_IMG + userimage}}
                  />
                )}
              </View>

              <View style={{marginVertical: 16}}>
                <Text
                  style={[
                    paraGray.parahome,
                    {fontSize: 16, textAlign: 'center'},
                  ]}>
                  {username}
                </Text>
              </View>
              <View style={{}}>
                <View
                  style={{
                    height: 64,
                    elevation: 4,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    justifyContent: 'center',
                    paddingHorizontal: 12,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        width: 70,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        //alignSelf: 'center',
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Medium',
                          fontSize: 14,
                          textAlign: 'center',
                          color: '#97A7C3D6',
                        }}>
                        Gender
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline',
                          justifyContent: 'center',
                          //alignSelf: 'center',
                          marginTop: 5,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Medium',
                            fontSize: 13,
                            lineHeight: 15,
                            color: COLORS.primary,
                            textAlign: 'center',
                          }}>
                          Female
                        </Text>
                        <FontAwesome
                          size={16}
                          name="user"
                          color={COLORS.primary}
                          style={{textAlign: 'right', marginLeft: 5}}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        //width: 1,
                        height: 40,
                        borderWidth: 0.6,
                        borderColor: '#97A7C3D6',
                        marginLeft: 12,
                        marginVertical: 10,
                      }}
                    />
                    <View
                      style={{
                        width: 100,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        //alignSelf: 'center',
                        marginHorizontal: 12,
                        //borderWidth: 1,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Medium',
                          fontSize: 14,
                          textAlign: 'center',
                          alignSelf: 'center',
                          lineHeight: 15,
                          color: '#97A7C3D6',
                        }}>
                        Experience
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline',
                          justifyContent: 'center',
                          //alignSelf: 'center',
                          marginTop: 5,
                          marginHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Medium',
                            fontSize: 13,
                            lineHeight: 15,
                            color: COLORS.primary,
                            textAlign: 'center',
                          }}>
                          2 Years
                        </Text>
                        <FontAwesome5
                          size={16}
                          name="briefcase"
                          color={COLORS.primary}
                          style={{textAlign: 'right', marginLeft: 5}}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        //width: 1,
                        height: 40,
                        borderWidth: 0.6,
                        borderColor: '#97A7C3D6',
                        marginVertical: 10,
                      }}
                    />

                    <View
                      style={{
                        width: 70,
                        alignItems: 'flex-start',
                        marginLeft: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Medium',
                          fontSize: 14,
                          textAlign: 'center',
                          lineHeight: 15,
                          color: '#97A7C3D6',
                        }}>
                        City
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline',
                          justifyContent: 'center',
                          marginTop: 5,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Medium',
                            fontSize: 13,
                            lineHeight: 15,
                            color: COLORS.primary,
                            textAlign: 'center',
                          }}>
                          Pune
                        </Text>
                        <Ionicons
                          size={16}
                          name="location"
                          color={COLORS.primary}
                          style={{textAlign: 'right', marginLeft: 5}}
                        />
                      </View>
                    </View>

                    {/* <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.lightblack, fontSize: 12},
                  ]}>
                  Class {student.class_name} | Roll no: {student.roll_no}
                </Text> */}
                  </View>
                </View>
              </View>
            </View>
          </View>
          
          <View
            style={{
              marginTop: 40,
              alignSelf: 'center',
              width: '100%',
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: 'rgba(0,0,0,0.8)',
                fontSize: 16,
                lineHeight: 16,
                marginBottom: 10,
                textAlign: 'left',
              }}>
              Basic Info
            </Text>

            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 12,
                width: '100%',
                //height: 242,
                alignSelf: 'center',
                justifyContent: 'center',
                paddingVertical: 24,
              }}>
              <View>
                <View style={[styles.mainViewContainer, {marginTop: -15}]}>
                  <View
                    style={{
                      width: '45%',
                    }}>
                    <View style={[styles.mainView, {marginTop: 12}]}>
                      <Text
                        style={[paraGray.darkpara, {fontSize: 15, color: COLORS.txtGray}]}>
                        Mobile No.
                      </Text>
                      <View style={styles.inputTextView}>
                        <Text style={[paraGray.darkpara, styles.userText]}>
                          {userphone}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.mainView}>
                      <Text
                        style={[paraGray.darkpara, {fontSize: 15, color: COLORS.txtGray}]}>
                        Class Incharge
                      </Text>
                      <View style={styles.inputTextView}>
                        <Text style={[paraGray.darkpara, styles.userText]}>
                          Fifth
                        </Text>
                      </View>
                    </View>
                    <View style={styles.mainView}>
                      <Text
                        style={[paraGray.darkpara, {fontSize: 15, color: COLORS.txtGray}]}>
                        ID Card
                      </Text>
                      <View style={styles.inputTextView}>
                        <Text style={[paraGray.darkpara, styles.userText]}>
                          {userid}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      //alignSelf: 'flex-start',
                      width: '45%',
                    }}>
                    <View style={[styles.mainView, {marginTop: 12}]}>
                      <Text
                        style={[paraGray.darkpara, {fontSize: 15, color: COLORS.txtGray}]}>
                        E-Mail ID
                      </Text>
                      <View style={styles.inputTextView}>
                        <Text style={[paraGray.darkpara, styles.userText]}>
                          {useremail ? useremail : 'surekha@gmail.com'}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.mainView}>
                      <Text
                        style={[paraGray.darkpara, {fontSize: 15, color: COLORS.txtGray}]}>
                        Date of Birth
                      </Text>
                      <View style={styles.inputTextView}>
                        <Text style={[paraGray.darkpara, styles.userText]}>
                          {userdob.split('-').reverse().join('-')}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.mainView}>
                      <Text
                        style={[paraGray.darkpara, {fontSize: 15, color: COLORS.txtGray}]}>
                        Aadhaar No.
                      </Text>
                      <View style={styles.inputTextView}>
                        <Text style={[paraGray.darkpara, styles.userText]}>
                          {username}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.mainView,
                    {width: '90%', alignSelf: 'center'},
                  ]}>
                  <Text style={[paraGray.darkpara, {fontSize: 15, color: COLORS.txtGray}]}>
                    Permanent Address
                  </Text>
                  <View style={styles.inputTextView}>
                    <Text style={[paraGray.darkpara, styles.userText]}>
                      {useraddress
                        ? useraddress
                        : 'St. 10, XYZ Colony, ABC City'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default TeachersProfile;
const styles = StyleSheet.create({
  mainViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  mainView: {
    backgroundColor: 'white',
    marginTop: 16,
    width: '100%',
  },
  inputTextView: {
    marginTop: 5,
  },
  userText: {
    color: COLORS.primary,
    fontSize: 14,
  },
});
