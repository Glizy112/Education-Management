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
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import {Header} from '../../Components/Header';

const UserProfile = props => {
  const {student} = props.route.params;
  const {userinfo, userid, username, showmodal} = useSelector(
    state => state.userReducer,
  );
  const users = [
    {
      id: '1',
      name: 'Ayushi Gupta',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '10 min ago',
      image: require('../../../assets/user2.png'),
      msg: '2',
      type: 'single',
      role: 'Student',
      class: 'FYBCOM',
      details: [
        {
          id: '3',
          name: 'Simran Gupta',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: '1 hour ago',
          image: require('../../../assets/user2.png'),
          msg: '4',
          type: 'single',
          role: 'Parent',
        },
        {
          id: '5',
          name: 'Vikash Gupta',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: '1 hour ago',
          image: require('../../../assets/user2.png'),
          msg: '0',
          type: 'single',
          role: 'Parent',
        },
      ],
    },
    {
      id: '2',
      name: 'FY(BCA)',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '1 hour ago',
      image: require('../../../assets/user1.png'),
      msg: '1',
      type: 'group',
      admin: true,
    },
    {
      id: '3',
      name: 'Simran Gupta',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '1 hour ago',
      image: require('../../../assets/user2.png'),
      msg: '4',
      type: 'single',
      role: 'Parent',
      details: [
        {
          id: '1',
          name: 'Ayushi Gupta',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: '10 min ago',
          image: require('../../../assets/user2.png'),
          msg: '2',
          type: 'single',
          role: 'Student',
          class: 'FTBCOM',
        },
      ],
    },
    {
      id: '4',
      name: 'SY(BCA)',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '50 min ago',
      image: require('../../../assets/user1.png'),
      msg: '0',
      type: 'group',
      admin: false,
    },
    {
      id: '5',
      name: 'Vikash Gupta',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '1 hour ago',
      image: require('../../../assets/user2.png'),
      msg: '0',
      type: 'single',
      role: 'Parent',
      details: [
        {
          id: '1',
          name: 'Ayushi Gupta',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: '10 min ago',
          image: require('../../../assets/user2.png'),
          msg: '2',
          type: 'single',
          role: 'Student',
          class: 'FTBCOM',
        },
      ],
    },
  ];
  useEffect(() => {
    console.log('us', student);
  }, []);

  return (
    <View style={container.container}>
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName={student.name}
          marginLeft
        />
      </View>
      <View
        style={{flex: 1, borderBottomWidth: 1.5, borderColor: COLORS.section}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {student.role !== 'Admin' ? (
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.bg,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingHorizontal: 15,
              paddingBottom: 30,
            }}>
            <View
              style={{
                flex: 1,
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLORS.outline,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                {student.image == null ? (
                  <Avatar.Image
                    size={70}
                    source={require('../../../assets/user.jpg')}
                    backgroundColor={COLORS.black}
                  />
                ) : (
                  <Avatar.Image
                    size={70}
                    //   source={{uri: Url.student_IMG + student.photo}}
                    source={student.image}
                    backgroundColor={COLORS.black}
                  />
                )}
                <View style={{marginLeft: 10}}>
                  <Text style={[paraGray.parahome, {fontSize: 15}]}>
                    {student.name}
                  </Text>
                  <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                    Class {student.class_name} | Roll no: {student.roll_no}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: -30,
                    // marginRight: 25,
                  }}>
                  {/* <Feather name="camera" size={25} color={COLORS.lightblack} /> */}
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  marginBottom: 10,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    width: '45%',
                    heigth: 150,
                    backgroundColor: 'white',
                    // paddingHorizontal: 10,
                  }}>
                  <Text style={[paraGray.darkpara, {color: COLORS.label}]}>
                    Aadhar No
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '80%',
                        marginTop: 10,
                      },
                    ]}>
                    null
                  </Text>
                </View>
                <View
                  style={{
                    width: '50%',
                    heigth: 150,
                    backgroundColor: 'white',
                    // paddingHorizontal: 10,
                    marginLeft: 10,
                  }}>
                  <Text style={[paraGray.darkpara, {color: COLORS.label}]}>
                    Academic Year
                  </Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          borderBottomColor: COLORS.bottom,
                          borderBottomWidth: 1,
                          width: '80%',
                          marginTop: 10,
                        },
                      ]}>
                      2020-2021
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="lock" size={15} color={COLORS.label} />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    width: '45%',
                    heigth: 150,
                    backgroundColor: 'white',
                    // paddingHorizontal: 10,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.label, marginBottom: 10},
                    ]}>
                    Admission Class
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          borderBottomColor: COLORS.bottom,
                          borderBottomWidth: 1,
                          width: '80%',
                        },
                      ]}>
                      {student.class_name}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="lock" size={15} color={COLORS.label} />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '50%',
                    heigth: 150,
                    backgroundColor: 'white',
                    // paddingHorizontal: 10,
                    marginLeft: 10,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.label, marginBottom: 10},
                    ]}>
                    Old School Name
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          borderBottomColor: COLORS.bottom,
                          borderBottomWidth: 1,
                          width: '80%',
                        },
                      ]}>
                      {student.previous_school}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="lock" size={15} color={COLORS.label} />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    width: '45%',
                    heigth: 150,
                    backgroundColor: 'white',
                    // paddingHorizontal: 10,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.label, marginBottom: 10},
                    ]}>
                    Date of Admission
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          borderBottomColor: COLORS.bottom,
                          borderBottomWidth: 1,
                          width: '80%',
                        },
                      ]}>
                      {student.admission_date}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="lock" size={15} color={COLORS.label} />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '50%',
                    heigth: 150,
                    backgroundColor: 'white',
                    // paddingHorizontal: 10,
                    marginLeft: 10,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.label, marginBottom: 10},
                    ]}>
                    Date of Birth
                  </Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          borderBottomColor: COLORS.bottom,
                          borderBottomWidth: 1,
                          width: '80%',
                        },
                      ]}>
                      {student.dob}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="lock" size={15} color={COLORS.label} />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 10,
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.label, marginBottom: 10},
                  ]}>
                  Student Mobile NO
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                      },
                    ]}>
                    {student.phone}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 10,
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.label, marginBottom: 10},
                  ]}>
                  Student E-mail ID
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                      },
                    ]}>
                    {student.email}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    width: '45%',
                    heigth: 150,
                    backgroundColor: 'white',
                    // paddingHorizontal: 10,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.label, marginBottom: 10},
                    ]}>
                    School Bus NO
                  </Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          borderBottomColor: COLORS.bottom,
                          borderBottomWidth: 1,
                          width: '80%',
                        },
                      ]}>
                      null
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="lock" size={15} color={COLORS.label} />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '50%',
                    heigth: 150,
                    backgroundColor: 'white',
                    // paddingHorizontal: 10,
                    marginLeft: 10,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.label, marginBottom: 10},
                    ]}>
                    Route No
                  </Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          borderBottomColor: COLORS.bottom,
                          borderBottomWidth: 1,
                          width: '80%',
                        },
                      ]}>
                      null
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="lock" size={15} color={COLORS.label} />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    width: '45%',
                    heigth: 150,
                    backgroundColor: 'white',
                    // paddingHorizontal: 10,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.label, marginBottom: 10},
                    ]}>
                    Class Teacher Name
                  </Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          borderBottomColor: COLORS.bottom,
                          borderBottomWidth: 1,
                          width: '80%',
                        },
                      ]}>
                      {username}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="lock" size={15} color={COLORS.label} />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '50%',
                    heigth: 150,
                    backgroundColor: 'white',
                    // paddingHorizontal: 10,
                    marginLeft: 10,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.label, marginBottom: 10},
                    ]}>
                    School No
                  </Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          borderBottomColor: COLORS.bottom,
                          borderBottomWidth: 1,
                          width: '80%',
                        },
                      ]}>
                      null
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="lock" size={15} color={COLORS.label} />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.label, marginBottom: 10},
                  ]}>
                  Mother Mail ID
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                      },
                    ]}>
                    null
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                  //   paddingHorizontal: 15,
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.label, marginBottom: 10},
                  ]}>
                  Mother Mobile No.
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                      },
                    ]}>
                    {student.father_phone}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.label, marginBottom: 10},
                  ]}>
                  Mother Name
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                      },
                    ]}>
                    {student.mother_name}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.label, marginBottom: 10},
                  ]}>
                  Father Mail ID
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                      },
                    ]}>
                    null
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.label, marginBottom: 10},
                  ]}>
                  Father Name
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                      },
                    ]}>
                    {student.father_name}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                  //   paddingHorizontal: 15,
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.label, marginBottom: 10},
                  ]}>
                  Father Mobile No.
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                      },
                    ]}>
                    {student.father_phone}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                  //   paddingHorizontal: 15,
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.label, marginBottom: 10},
                  ]}>
                  Parmanent Add.
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                      },
                    ]}>
                    {student.present_address}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 20,
                  //   paddingHorizontal: 15,
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.label, marginBottom: 10},
                  ]}>
                  Subjects Name:
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                      },
                    ]}>
                    Business Communication ( Manan ) Business Mathematics (
                    Vipul ) Economics ( Manan ) Foundation Course ( Manan )
                    Business Law ( Rishabh ) Financial Accounts ( Manan ) Direct
                    Tax ( Manan )
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.label, marginBottom: 10},
                  ]}>
                  {student.role == 'Student'
                    ? 'Chat with Parents'
                    : 'Chat with Children'}
                </Text>
                {users.map(
                  (data, index) =>
                    data.id == student.id &&
                    data.details.map((user, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{marginVertical: 5}}
                        onPress={() =>
                          props.navigation.navigate('ChatDetail', {
                            user: data.details[index],
                          })
                        }>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginTop: 15,
                          }}>
                          <Avatar.Image size={45} source={user.image} />
                          <View style={{flex: 1}}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  marginRight: 10,
                                  alignItems: 'center',
                                }}>
                                <Text
                                  numberOfLines={1}
                                  style={[
                                    paraGray.parahome,
                                    {
                                      marginLeft: 10,
                                      fontSize: 15,
                                      color: COLORS.black,
                                    },
                                  ]}>
                                  {user.name}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  justifyContent: 'flex-end',
                                  alignItems: 'center',
                                }}>
                                <AntDesign
                                  name="message1"
                                  size={22}
                                  color={COLORS.bluee}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )),
                )}
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.bg,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingHorizontal: 15,
              paddingBottom: 30,
            }}>
            <View
              style={{
                flex: 1,
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLORS.outline,
                // alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                {student.image == null ? (
                  <Avatar.Image
                    size={70}
                    // source={{uri: Url.student_IMG + student.photo}}
                    source={require('../../../assets/user.jpg')}
                    backgroundColor={COLORS.black}
                  />
                ) : (
                  <Avatar.Image
                    size={70}
                    // source={{uri: Url.student_IMG + student.photo}}
                    source={student.image}
                    backgroundColor={COLORS.black}
                  />
                )}
                <View style={{marginLeft: 10}}>
                  <Text style={[paraGray.parahome, {fontSize: 15}]}>
                    {student.name}
                  </Text>
                  <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                    Class V | ID Card: 123456
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                  marginTop: 20,
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.label, marginBottom: 10},
                  ]}>
                  Name
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darklarge,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                        marginTop: 5,
                      },
                    ]}>
                    {student.name}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                }}>
                <Text style={[paraGray.darkpara, {color: COLORS.label}]}>
                  Phone Number
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darklarge,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                        marginTop: 5,
                      },
                    ]}>
                    {student.contact}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                }}>
                <Text style={[paraGray.darkpara, {color: COLORS.label}]}>
                  E-mail ID
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darklarge,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                        marginTop: 5,
                      },
                    ]}>
                    {student.email}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                }}>
                <Text style={[paraGray.darkpara, {color: COLORS.label}]}>
                  Classroom
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darklarge,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                        marginTop: 5,
                      },
                    ]}>
                    V
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                }}>
                <Text style={[paraGray.darkpara, {color: COLORS.label}]}>
                  Date of Birth
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darklarge,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                        marginTop: 5,
                      },
                    ]}>
                    {student.dob}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                }}>
                <Text style={[paraGray.darkpara, {color: COLORS.label}]}>
                  ID Card
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darklarge,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                        marginTop: 5,
                      },
                    ]}>
                    9082111479
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  heigth: 150,
                  backgroundColor: 'white',
                  marginBottom: 25,
                }}>
                <Text style={[paraGray.darkpara, {color: COLORS.label}]}>
                  Lecturer
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={[
                      paraGray.darklarge,
                      {
                        borderBottomColor: COLORS.bottom,
                        borderBottomWidth: 1,
                        width: '90%',
                        marginTop: 5,
                      },
                    ]}>
                    {student.Lecturer}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="lock" size={15} color={COLORS.label} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default UserProfile;
