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
import {Avatar} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import FastImage from 'react-native-fast-image';
import {Shadow} from 'react-native-shadow-2';
import {setuserName} from '../../Redux/Actions/actions';
import ImagePicker from 'react-native-image-crop-picker';

const StudentProfile = props => {
  const {studentdetail} = props.route.params;

  const {userinfo, userid, username, showmodal} = useSelector(
    state => state.userReducer,
  );
  useEffect(() => {
    //  console.log("us"+JSON.stringify(student))
  }, []);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);
  const dispatch = useDispatch();
  //   const {userinfo, userid, teacherid, schoolid, userimage} = useSelector(
  //     state => state.userReducer,
  //   );
  const [selected, setSelected] = useState([]);
  const [showimage, setshowimage] = useState(false);
  const [isstreamFocus, setIsstreamFocus] = useState(false);
  const [isgenderFocus, setIsgenderFocus] = useState(false);
  // const [gender, setGender] = useState(null);

  const [studentimage, setStudentImage] = useState(studentdetail.photo);
  const [studentname, setStudentName] = useState(studentdetail.student_name);
  const [studentmobileno, setStudentMobileno] = useState(studentdetail.phone);
  const [studentemail, setStudentEmail] = useState(studentdetail.email);
  const [studentrollno, setStudentRollNO] = useState(studentdetail.roll_no);
  const [studentrouteno, setStudentRouteNO] = useState(studentdetail.dob);

  const [studentdob, setStudentDOB] = useState(studentdetail.dob);
  const [studentfathername, setStudentFatherName] = useState(
    studentdetail.father_name,
  );
  const [studentfathermobileno, setStudentFatherMobileNo] = useState(
    studentdetail.father_phone,
  );
  const [studentfatheremail, setStudentFatherEmail] = useState(null);
  const [studentmothername, setStudentMotherName] = useState(
    studentdetail.mother_name,
  );
  const [studentmothermobileno, setStudentMotherMobileNo] = useState(
    studentdetail.mother_phone,
  );
  const [studentmotheremail, setStudentMotherEmail] = useState(null);
  const [studentAddress, setStudentAddress] = useState(
    studentdetail.permanent_address,
  );
  const [studentgender, setStudentGender] = useState(studentdetail.gender);
  const [studentschoolbusno, setStudentSchoolBusNo] = useState(
    studentdetail.gender,
  );
  const [studentschoolno, setStudentSchoolNo] = useState(
    studentdetail.school_id,
  );
  const [studentaadhar, setStudentAadhar] = useState(
    studentdetail.aadharcard_no,
  );
  const [studentclassname, setStudentClassName] = useState(
    studentdetail.class_name,
  );
  const [saveChanges, setSaveChanges] = useState(false);
  const [opens, setOpens] = useState(false);
  const [values, setValues] = useState(null);
  const [Genderitems, setGenderItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ]);
  const [getdata, setData] = useState([]);

  // --------Date-time Picker----------
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    //For Date Picker
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getDate();
    setStudentDOB(fDate);
    // console.log(fDate);

    //  -------For Both Date and Time Picker---------
    // let tempDate = new Date(currentDate);
    // let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    // let fTime = 'Hours:' + tempDate.getHours() + '| Minutes: ' + tempDate.getMinutes();
    // setText(fDate + '/n + fTime)
    // console.log(fDate + '(n' + fTime + ')')
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // const showTimepicker = () => {
  //     showMode('time');
  // };

  // ---------------Image Picker-------------------
  // ----------To Select from gallery-------------------
  const SelectImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(image => {
      console.log(image);
      setshowimage(true);
      setStudentImage(image.path);
    });

    // -----------------For Camera------------------------
    // ImagePicker.openCamera({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then(image => {
    //   console.log(image);
    //   setSelectedImage(image.path);
    // });
  };

  useEffect(() => {
    getclassData();
  }, []);

  const getclassData = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('teacher_id', teacherid);
      formData.append('school_id', schoolid);
      let resp = await fetch(`${Url.get_all_class}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          return response.json();
        })
        .then(result => {
          // console.log(result.data);
          setData(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('StudentEdit Error => ' + error);
      setLoading(false);
    }
  };

  const Update = async () => {
    setLoading(true);
    try {
      let uri = studentimage;
      let fileType = uri.substring(uri.lastIndexOf('.') + 1);
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('user_id', studentdetail.user_id);
      formData.append('student_id', studentdetail.student_id);
      formData.append('aadharcard_no', studentaadhar);
      formData.append('name', studentname);
      formData.append('phone', studentmobileno);
      formData.append('email', studentemail);
      formData.append('gender', studentgender);
      formData.append('dob', studentdob);
      formData.append('father_name', studentfathername);
      formData.append('father_phone', studentfathermobileno);
      // formData.append('father_email', studentfatheremail);
      formData.append('mother_name', studentmothername);
      formData.append('mother_phone', studentmothermobileno);
      // formData.append('mother_email', studentmotheremail);
      formData.append('permanent_address', studentAddress);
      if (showimage == true) {
        formData.append('photo', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      } else {
        formData.append('photo', null);
      }
      // console.log('send data==>', formData);
      let resp = await fetch(`${Url.update_student_details}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          return response.json();
        })
        .then(result => {
          // console.log(result);
          if (result.status == true) {
            // alert('Successful');
            props.navigation.navigate('Student');
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('Update Student Details Error => ' + error);
      alert('Retry');
      setLoading(false);
    }
  };
  const convertToOrdinal = word => {
    const ordinalMap = {
      first: '1st',
      second: '2nd',
      third: '3rd',
      fourth: '4th',
      fifth: '5th',
      // Add more ordinals as needed
    };

    // Check if the word exists in the ordinal map
    if (ordinalMap.hasOwnProperty(word.toLowerCase())) {
      return ordinalMap[word.toLowerCase()];
    } else {
      return word; // Return the word unchanged if not found in the map
    }
  };
  const trimBirthDate = value => {
    const inputDate = value;
    const parts = inputDate.split('-');

    const year = parts[0].slice(-2);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    const formattedDate = `${year}-${month}-${day}`;

    // setStudentDOB()
    setStudentDOB(() => formattedDate);
  };
  useEffect(() => {
    const result = convertToOrdinal(studentclassname);
    setStudentClassName(result);
    trimBirthDate(studentdob);
  }, [studentdob]);

  //console.log(studentimage.image);

  return (
    <View style={container.container}>
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
          }}>
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
              style={{marginVertical: 5, marginHorizontal: 7}}
              name="arrow-back"
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={[
              paraGray.largebold,
              {
                textAlign: 'center',
                //marginLeft: 30,
                // fontFamily: 'Montserrat-Medium',
                // fontSize: 16,
                // color: COLORS.black,
              },
            ]}>
            Student Profile
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: COLORS.primary,
            }}
            onPress={() =>
              //   props.navigation.navigate('StudentEdit', {
              //     studentdetail: studentdetail,
              //   })
              setSaveChanges(() => !saveChanges)
            }>
            <Ionicons
              style={{marginVertical: 5, marginHorizontal: 7}}
              name="pencil-sharp"
              size={20}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingTop: 12,
          borderBottomWidth: 0.8,
          borderColor: COLORS.primary,
        }}
      />
      {/* <View
        style={{flex: 1, borderBottomWidth: 1.5, borderColor: COLORS.section}}
      /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
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
              <TouchableOpacity onPress={SelectImage}>
                {studentimage == null ? (
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
                    source={{
                      uri: showimage
                        ? studentimage
                        : Url.student_IMG + studentimage,
                    }}
                  />
                )}
              </TouchableOpacity>

              <View style={{marginVertical: 20}}>
                <Text
                  style={[
                    paraGray.parahome,
                    {fontSize: 16, textAlign: 'center'},
                  ]}>
                  {studentdetail.student_name}
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
                    paddingHorizontal: 16,
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
                        Class
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          //alignSelf: 'center',
                          marginTop: 5,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Medium',
                            fontSize: 14,
                            lineHeight: 15,
                            color: COLORS.primary,
                            textAlign: 'center',
                          }}>
                          {studentclassname}
                        </Text>
                        <Ionicons
                          size={18}
                          name="book"
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
                        //marginHorizontal: 10,
                        marginVertical: 10,
                      }}
                    />
                    <View
                      style={{
                        width: 110,
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
                        Academic Yr.
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
                            fontSize: 14,
                            lineHeight: 15,
                            color: COLORS.primary,
                            textAlign: 'center',
                          }}>
                          2020-21
                        </Text>
                        <FontAwesome5
                          size={18}
                          name="calendar-week"
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
                        width: 74,
                        //justifyContent: 'center',
                        alignItems: 'flex-start',
                        //alignSelf: 'center',
                        marginLeft: 20,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Medium',
                          fontSize: 14,
                          textAlign: 'center',
                          lineHeight: 15,
                          color: '#97A7C3D6',
                        }}>
                        D.O.B.
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline',
                          justifyContent: 'center',
                          //alignSelf: 'center',
                          //marginLeft: 28,
                          marginTop: 5,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Medium',
                            fontSize: 14,
                            lineHeight: 15,
                            color: COLORS.primary,
                            textAlign: 'center',
                          }}>
                          {studentdob}
                        </Text>
                        <MaterialCommunityIcons
                          size={18}
                          name="clock"
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

          <View style={{marginTop: 50}}>
            <View style={{marginTop: 25}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  color: COLORS.primary,
                  fontSize: 16,
                  lineHeight: 16,
                  marginBottom: 12,
                }}>
                Basic Info
              </Text>
              <View
                style={{
                  borderRadius: 12,
                  elevation: 4,
                  backgroundColor: 'white',
                }}>
                <View style={{paddingTop: 15, paddingBottom: 20}}>
                  <View style={[styles.mainViewContainer, {marginTop: -10}]}>
                    <View style={styles.mainView}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, opacity: 0.5},
                        ]}>
                        Aadhar No.
                      </Text>
                      <View style={styles.inputTextView}>
                        <TextInput
                          placeholder="Enter Aadhar No"
                          placeholderTextColor={COLORS.lightergray}
                          value={studentAddress}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          onChangeText={value => {
                            setStudentAadhar(value);
                          }}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                    <View style={[styles.mainView, {width: '52%'}]}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, opacity: 0.5},
                        ]}>
                        Roll No.
                      </Text>
                      <View style={[styles.inputTextView, {width: 60}]}>
                        <TextInput
                          placeholder="Enter RollNo"
                          placeholderTextColor={COLORS.lightergray}
                          value={studentrollno}
                          onChangeText={value => {
                            setStudentRollNO(value);
                          }}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.mainViewContainer}>
                    <View style={[styles.mainView, {width: '40%'}]}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {fontSize: 13, color: COLORS.black, opacity: 0.5},
                        ]}>
                        Student Mobile No
                      </Text>
                      <View style={styles.inputTextView}>
                        <TextInput
                          placeholder="Enter Mobile NO"
                          placeholderTextColor={COLORS.lightergray}
                          value={studentmobileno}
                          onChangeText={value => {
                            setStudentMobileno(value);
                          }}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                    <View style={[styles.mainView, {width: 180}]}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, opacity: 0.5},
                        ]}>
                        Student E-mail ID
                      </Text>
                      <View style={styles.inputTextView}>
                        <TextInput
                          placeholder="Enter E-mail ID"
                          placeholderTextColor={COLORS.lightergray}
                          value={studentemail}
                          onChangeText={value => {
                            setStudentEmail(value);
                          }}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={[styles.mainView, {width: '90%'}]}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {color: COLORS.black, opacity: 0.5},
                      ]}>
                      Permanent Address
                    </Text>
                    <View style={styles.inputTextView}>
                      <TextInput
                        placeholder="Enter Student Address"
                        placeholderTextColor={COLORS.lightergray}
                        value={studentAddress}
                        onChangeText={value => {
                          setStudentAddress(value);
                        }}
                        style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                        editable={saveChanges}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  color: COLORS.primary,
                  fontSize: 16,
                  lineHeight: 16,
                  marginBottom: 10,
                }}>
                School Info
              </Text>
              <View
                style={{
                  borderRadius: 12,
                  width: '100%',
                  elevation: 4,
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    paddingTop: 15,
                    paddingBottom: 20,
                  }}>
                  <View style={[styles.mainViewContainer, {marginTop: -10}]}>
                    <View style={[styles.mainView, {width: 110}]}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, opacity: 0.5},
                        ]}>
                        School Bus No.
                      </Text>
                      <View style={[styles.inputTextView, {width: 100}]}>
                        <TextInput
                          placeholder="Enter School Bus No"
                          placeholderTextColor={COLORS.lightergray}
                          value={studentschoolbusno}
                          onChangeText={value => {
                            setStudentSchoolBusNo(value);
                          }}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                    <View style={[styles.mainView, {width: 160}]}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, opacity: 0.5},
                        ]}>
                        Route No.
                      </Text>
                      <View style={[styles.inputTextView, {width: 70}]}>
                        <TextInput
                          //placeholder="Enter Route"
                          placeholderTextColor={COLORS.lightergray}
                          value={studentrouteno}
                          onChangeText={value => {
                            setStudentRouteNO(value);
                          }}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                    <View
                      style={[
                        styles.mainView,
                        {
                          marginLeft: -80,
                          width: 120,
                        },
                      ]}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, opacity: 0.5},
                        ]}>
                        School No.
                      </Text>
                      <View style={[styles.inputTextView, {borderWidth: 1}]}>
                        <TextInput
                          placeholder="Enter School No"
                          placeholderTextColor={COLORS.lightergray}
                          value={studentschoolno}
                          onChangeText={value => {
                            setStudentSchoolNo(value);
                          }}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.mainViewContainer}>
                    <View style={[styles.mainView, {width: '100%'}]}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, opacity: 0.5},
                        ]}>
                        Class Teacher Name
                      </Text>
                      <View style={styles.inputTextView}>
                        <TextInput
                          placeholder="Enter Class Teacher Name"
                          placeholderTextColor={COLORS.lightergray}
                          value={username}
                          onChangeText={value => {
                            // setStudentSchoolNo(value);
                            dispatch(setuserName(value));
                          }}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  color: COLORS.primary,
                  fontSize: 16,
                  lineHeight: 16,
                  marginBottom: 10,
                }}>
                Guardian Info
              </Text>
              <View
                style={{
                  borderRadius: 12,
                  width: '100%',
                  backgroundColor: 'white',
                  elevation: 4,
                  //paddingHorizontal: 10,
                }}>
                <View style={{paddingTop: 15, paddingBottom: 20}}>
                  <View style={[styles.mainViewContainer, {marginTop: -10}]}>
                    <View style={[styles.mainView, {width: 156}]}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, opacity: 0.5},
                        ]}>
                        Mother Name
                      </Text>
                      <View style={[styles.inputTextView]}>
                        <TextInput
                          placeholder="Enter Mother Name"
                          placeholderTextColor={COLORS.lightergray}
                          value={studentmothername}
                          onChangeText={value => {
                            setStudentMotherName(value);
                          }}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                    <View style={[styles.mainView, {width: 156}]}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, width: 500, opacity: 0.5},
                        ]}>
                        Mother Mobile No.
                      </Text>
                      <View style={[styles.inputTextView]}>
                        <TextInput
                          placeholder="Enter Mother Mobile No."
                          placeholderTextColor={COLORS.lightergray}
                          value={studentmothermobileno}
                          onChangeText={value => {
                            setStudentMotherMobileNo(value);
                          }}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.mainViewContainer}>
                    <View style={[styles.mainView, {width: 156}]}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, opacity: 0.5},
                        ]}>
                        Mother Email ID
                      </Text>
                      <View style={styles.inputTextView}>
                        <TextInput
                          placeholder="Enter Mother Email ID"
                          placeholderTextColor={COLORS.lightergray}
                          value={studentmotheremail}
                          onChangeText={value => {
                            setStudentMotherEmail(value);
                          }}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                    <View style={[styles.mainView, {width: 156}]}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, opacity: 0.5},
                        ]}>
                        Father Name
                      </Text>
                      <View style={styles.inputTextView}>
                        <TextInput
                          placeholder="Enter Father Name"
                          placeholderTextColor={COLORS.lightergray}
                          value={studentfathername}
                          onChangeText={value => {
                            setStudentFatherName(value);
                          }}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.mainViewContainer}>
                    <View style={[styles.mainView, {width: 156}]}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, opacity: 0.5},
                        ]}>
                        Father Mobile No.
                      </Text>
                      <View style={styles.inputTextView}>
                        <TextInput
                          placeholder="Enter Father Mobile No"
                          placeholderTextColor={COLORS.lightergray}
                          value={studentfathermobileno}
                          onChangeText={value => {
                            setStudentMotherName(value);
                          }}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                    <View style={[styles.mainView, {width: 156}]}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, opacity: 0.5},
                        ]}>
                        Father Email ID
                      </Text>
                      <View style={styles.inputTextView}>
                        <TextInput
                          placeholder="Enter Father Email ID"
                          placeholderTextColor={COLORS.lightergray}
                          value={studentfatheremail}
                          onChangeText={value => {
                            setStudentFatherEmail(value);
                          }}
                          style={[styles.textInput, saveChanges ? {color: COLORS.black} : {color: COLORS.lightergray}]}
                          editable={saveChanges}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* <View
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
                Books Name:
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
                  Business Communication ( Manan ) Business Mathematics ( Vipul
                  ) Economics ( Manan ) Foundation Course ( Manan ) Business Law
                  ( Rishabh ) Financial Accounts ( Manan ) Direct Tax ( Manan )
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
            </View> */}
          </View>
          {saveChanges ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 12,
                marginBottom: 30,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLORS.red,
                  width: '42%',
                  height: 56,
                  borderColor: COLORS.red,
                  alignSelf: 'center',
                  borderWidth: 1.2,
                  marginTop: 15,
                  borderRadius: 12,
                  justifyContent: 'center',
                  //elevation: 3,
                }}
                onPress={()=> setSaveChanges(false)}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLORS.primary,
                  width: '42%',
                  height: 56,
                  borderColor: COLORS.primary,
                  alignSelf: 'center',
                  borderWidth: 1.2,
                  marginTop: 15,
                  borderRadius: 12,
                  justifyContent: 'center',
                  marginLeft: 16,
                  //elevation: 3,
                }}
                //</View>onPress={Update}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default StudentProfile;
const styles = StyleSheet.create({
  mainViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    //marginVertical: 5,
  },
  mainView: {
    alignSelf: 'center',
    marginTop: 12,
    width: 140,
    heigth: 60,
    backgroundColor: 'white',
  },
  inputTextView: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: '100%',
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    paddingTop: 2,
    marginTop: 8,
  },
  textInput: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    //lineHeight: 16,
    //color: COLORS.lightergray,
  },
});
