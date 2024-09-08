import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
// import {Dropdown} from 'react-native-element-dropdown';
import {paraGray} from '../../theme/styles/Base';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {COLORS} from '../../theme/Colors';
import {log} from 'react-native-reanimated';
import DropDown from '../../Components/DropDown';
import Ionicons from 'react-native-vector-icons/Ionicons';
const UpdateAss = props => {
  const {data} = props.route.params;
  const [openStream, setOpenStream] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
  const [openSubmissionMode, setOpenSubmissionMOde] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const {teacherid, userid, schoolid} = useSelector(state => state.userReducer);
  const [getdata, setdata] = useState([]);
  const [selectedfile, setselectedfile] = useState(data.assignment);
  const [file, setFile] = useState([]);
  const [desc, setDesc] = useState(data.note);
  const [currentDate, setCurrentDate] = useState(data.date);
  const [currentTime, setCurrentTime] = useState(data.time);

  // <------------Select Stream-------------->
  const [isstreamFocus, setIsstreamFocus] = useState(false);
  const [stream, setStream] = useState(data.class_id);
  const [selectedstream, setselectedStream] = useState(null);
  // <------------Select section-------------->
  const [selectedsection, setSelectedSection] = useState(null);
  const [section, setSection] = useState(data.section_id);
  const [issectionFocus, setIsSectionFocus] = useState(false);
  const [getsectiondata, setSectiondata] = useState([]);
  // <------------Select Subject-------------->
  const [selectedsubject, setSelectedSubject] = useState(null);
  const [subject, setsubject] = useState(data.subject_id);
  const [issubjectFocus, setIssubjectFocus] = useState(false);
  const [getsubjectdata, setsubjectdata] = useState([]);
  // <------------Select Mode-------------->
  const [selectedmode, setSelectedMode] = useState(data.mode);
  const [ismodeFocus, setIsmodeFocus] = useState(false);
  const [lecmode, setLecMode] = useState(data.mode);
  const [getmodedata, setmodedata] = useState([]);
  const [items, setItems] = useState([
    {label: 'Online', value: 'Online'},
    {label: 'Offline', value: 'Offline'},
  ]);

  // --------Date-time Picker----------
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState(data.deadline);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    //For Date Picker
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setText(fDate);
    console.log(fDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    getclassData();
    getsectionData();
    getsubjectData();
    console.log(data);
  }, []);

  const getclassData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);

      let resp = await fetch(`${Url.get_all_class}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          // console.log(result);
          setdata(result.data);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('subjectDetail getclassData Error => ' + error);
      setLoading(false);
    }
  };
  const getsectionData = async item => {
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      formData.append('class_id', stream);
      let resp = await fetch(`${Url.get_section_classId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          // console.log(result);
          setSectiondata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('AttendancePtm Error => ' + error);
      setLoading(false);
    }
  };
  const getsubjectData = async item => {
    try {
      const formData = new FormData();
      // formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      formData.append('class_id', stream);
      let resp = await fetch(`${Url.get_subject_classID}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          // console.log(result);
          setsubjectdata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('AttendancePtm Error => ' + error);
      setLoading(false);
    }
  };

  const selectFile = async () => {
    try {
      // <----for single selecton use (pick) for multiple selection use (pickMultiple)---->
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
      }).then(res => {
        // console.log("===>>",image);
        // setDp(image.path);
        setFile(res);
      });
      // console.log("Selected File ===>",
      //   JSON.stringify(file),
      //   // res.type, // mime type
      //   // res.name,
      //   // res.size,
      // )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const removeItem = index => {
    setFile(file.filter((o, i) => index !== i));
  };

  const UpdateAssignment = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('id', data.id);
      formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      formData.append('class_id', stream);
      formData.append('section_id', section);
      formData.append('subject_id', subject);
      formData.append('note', desc);
      formData.append('mode', lecmode);
      formData.append('deadline', text);
      formData.append('date', currentDate);
      formData.append('time', currentTime);
      file.length > 0 &&
        formData.append('assignment', {
          name: file[0].name,
          uri: file[0].uri,
          type: file[0].type,
        });

      console.log('UpdateAssignment Send Data ==> ' + JSON.stringify(formData));
      let resp = await fetch(`${Url.updateAssignment}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          if (result.status == true) {
            console.log(
              'UpdateAssignment result data' + JSON.stringify(result),
            );
            props.navigation.goBack();
            setLoading(false);
          } else {
            alert('Retry');
          }
        });
    } catch (error) {
      console.log('Update Assignment Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getclassData();
  }, []);

  return (
    // <View style={styles.container}>
    //   {loading == true && <Spinner visible={load} />}
    //   <ScrollView
    //     showsVerticalScrollIndicator={false}
    //     refreshControl={
    //       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //     }>
    //     <View>
    //       <View style={{marginTop: 15, paddingHorizontal: 20}}>
    //         <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
    //           Stream
    //         </Text>
    //         <Dropdown
    //           style={{
    //             height: 50,
    //             borderColor: isstreamFocus ? 'blue' : 'gray',
    //             borderWidth: 1,
    //             borderRadius: 8,
    //             paddingHorizontal: 8,
    //           }}
    //           placeholderStyle={{
    //             fontSize: 16,
    //             fontFamily: 'Montserrat-Regular',
    //           }}
    //           selectedTextStyle={{
    //             fontSize: 16,
    //             fontFamily: 'Montserrat-Regular',
    //           }}
    //           inputSearchStyle={{
    //             height: 40,
    //             fontSize: 16,
    //             fontFamily: 'Montserrat-Regular',
    //           }}
    //           iconStyle={{
    //             width: 20,
    //             height: 20,
    //           }}
    //           data={getdata.map(item => ({
    //             label: item.class_name,
    //             value: item.class_id,
    //           }))}
    //           search
    //           containerStyle={{
    //             backgroundColor: '#E5E5E5',
    //             borderColor: '#E5E5E5',
    //           }}
    //           fontFamily={'Montserrat-Regular'}
    //           maxHeight={300}
    //           labelField="label"
    //           valueField="value"
    //           placeholder={!isstreamFocus ? data.section_name : '...'}
    //           searchPlaceholder="Search..."
    //           value={stream}
    //           onFocus={() => setIsstreamFocus(true)}
    //           onBlur={() => setIsstreamFocus(false)}
    //           onChange={item => {
    //             // getsectionData(item);
    //             setselectedStream(item);
    //             setStream(item.value);
    //             setIsstreamFocus(false);
    //             getsectionData(item);
    //           }}
    //         />
    //       </View>
    //     </View>
    //     <View>
    //       <View style={{paddingHorizontal: 20}}>
    //         <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
    //           Section
    //         </Text>
    //         <Dropdown
    //           style={{
    //             height: 50,
    //             borderColor: issectionFocus ? 'blue' : 'gray',
    //             borderWidth: 1,
    //             borderRadius: 8,
    //             paddingHorizontal: 8,
    //           }}
    //           placeholderStyle={{
    //             fontSize: 16,
    //             fontFamily: 'Montserrat-Regular',
    //           }}
    //           selectedTextStyle={{
    //             fontSize: 16,
    //             fontFamily: 'Montserrat-Regular',
    //           }}
    //           inputSearchStyle={{
    //             height: 40,
    //             fontSize: 16,
    //             fontFamily: 'Montserrat-Regular',
    //           }}
    //           iconStyle={{
    //             width: 20,
    //             height: 20,
    //           }}
    //           data={getsectiondata.map(item => ({
    //             label: item.section_name,
    //             value: item.section_id,
    //             // subject: item.subject_id,
    //           }))}
    //           search
    //           containerStyle={{
    //             backgroundColor: '#E5E5E5',
    //             borderColor: '#E5E5E5',
    //           }}
    //           fontFamily={'Montserrat-Regular'}
    //           maxHeight={300}
    //           labelField="label"
    //           valueField="value"
    //           placeholder={!issectionFocus ? data.section_name : '...'}
    //           searchPlaceholder="Search..."
    //           value={section}
    //           onFocus={() => setIsSectionFocus(true)}
    //           onBlur={() => setIsSectionFocus(false)}
    //           onChange={item => {
    //             setSelectedSection(item);
    //             setSection(item.value);
    //             setIsSectionFocus(false);
    //             getsubjectData(item);
    //           }}
    //         />
    //       </View>
    //       <View style={{paddingHorizontal: 20}}>
    //         <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
    //           Subject
    //         </Text>
    //         <Dropdown
    //           style={{
    //             height: 50,
    //             borderColor: issubjectFocus ? 'blue' : 'gray',
    //             borderWidth: 1,
    //             borderRadius: 8,
    //             paddingHorizontal: 8,
    //           }}
    //           placeholderStyle={{
    //             fontSize: 16,
    //             fontFamily: 'Montserrat-Regular',
    //           }}
    //           selectedTextStyle={{
    //             fontSize: 16,
    //             fontFamily: 'Montserrat-Regular',
    //           }}
    //           inputSearchStyle={{
    //             height: 40,
    //             fontSize: 16,
    //             fontFamily: 'Montserrat-Regular',
    //           }}
    //           iconStyle={{
    //             width: 20,
    //             height: 20,
    //           }}
    //           data={getsubjectdata.map(item => ({
    //             label: item.name,
    //             value: item.id,
    //             // subject: item.subject_id,
    //           }))}
    //           search
    //           containerStyle={{
    //             backgroundColor: '#E5E5E5',
    //             borderColor: '#E5E5E5',
    //           }}
    //           fontFamily={'Montserrat-Regular'}
    //           maxHeight={300}
    //           labelField="label"
    //           valueField="value"
    //           placeholder={!issubjectFocus ? data.subject_name : '...'}
    //           searchPlaceholder="Search..."
    //           value={subject}
    //           onFocus={() => setIssubjectFocus(true)}
    //           onBlur={() => setIssubjectFocus(false)}
    //           onChange={item => {
    //             setSelectedSubject(item);
    //             setsubject(item.value);
    //             setIssubjectFocus(false);
    //             // setsubjectId(item.subject);
    //           }}
    //         />
    //       </View>
    //       <View>
    //         <TouchableOpacity
    //           style={{
    //             flexDirection: 'row',
    //             alignItems: 'center',
    //             backgroundColor: '#C4C4C4',
    //             width: '80%',
    //             height: 50,
    //             alignSelf: 'center',
    //             marginTop: '8%',
    //             marginBottom: 15,
    //             bottom: 0,
    //             borderRadius: 5,
    //             justifyContent: 'center',
    //           }}
    //           onPress={selectFile}>
    //           <Text
    //             style={{
    //               color: '#000000',
    //               fontSize: 18,
    //               fontFamily: 'Montserrat-SemiBold',
    //             }}>
    //             Attach File
    //             <MaterialCommunityIcons name="plus" size={20} />
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //       <View
    //         style={{
    //           flex: 1,
    //           flexDirection: 'row',
    //           flexWrap: 'wrap',
    //           marginBottom: 20,
    //           paddingHorizontal: 10,
    //         }}>
    //         {file.length > 0 ? (
    //           file.map((file, index) => (
    //             // {/* {file != '' && ( */}
    //             <TouchableOpacity
    //               // key={index}
    //               style={{marginHorizontal: 10, marginVertical: 10}}
    //               onPress={() => removeItem(index)}
    //               // onPress={() => setFile('')}
    //             >
    //               <AntDesign
    //                 style={{alignSelf: 'flex-end', marginRight: 5}}
    //                 name="closecircleo"
    //                 size={20}
    //                 color={COLORS.black}
    //               />
    //               <FontAwesome name="file-pdf-o" size={40} color={COLORS.red} />
    //               <Text>{file.name}</Text>
    //             </TouchableOpacity>

    //             // )}
    //           ))
    //         ) : (
    //           <TouchableOpacity
    //             // key={index}
    //             style={{marginHorizontal: 10, marginVertical: 10}}
    //             onPress={() => removeItem(index)}
    //             // onPress={() => setFile('')}
    //           >
    //             <FontAwesome name="file-pdf-o" size={40} color={COLORS.red} />
    //             <Text>{file}</Text>
    //           </TouchableOpacity>
    //         )}
    //       </View>
    //       <View style={{paddingHorizontal: 20}}>
    //         <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
    //           Modes of Submission
    //         </Text>
    //         <Dropdown
    //           style={{
    //             height: 50,
    //             borderColor: ismodeFocus ? 'blue' : 'gray',
    //             borderWidth: 1,
    //             borderRadius: 8,
    //             paddingHorizontal: 8,
    //           }}
    //           placeholderStyle={{
    //             fontSize: 16,
    //             fontFamily: 'Montserrat-Regular',
    //           }}
    //           selectedTextStyle={{
    //             fontSize: 16,
    //             fontFamily: 'Montserrat-Regular',
    //           }}
    //           inputSearchStyle={{
    //             height: 40,
    //             fontSize: 16,
    //             fontFamily: 'Montserrat-Regular',
    //           }}
    //           iconStyle={{
    //             width: 20,
    //             height: 20,
    //           }}
    //           data={items.map(item => ({
    //             label: item.label,
    //             value: item.value,
    //           }))}
    //           search
    //           containerStyle={{
    //             backgroundColor: '#E5E5E5',
    //             borderColor: '#E5E5E5',
    //           }}
    //           fontFamily={'Montserrat-Regular'}
    //           maxHeight={300}
    //           labelField="label"
    //           valueField="value"
    //           placeholder={!ismodeFocus ? data.mode : '...'}
    //           searchPlaceholder="Search..."
    //           value={lecmode}
    //           onFocus={() => setIsmodeFocus(true)}
    //           onBlur={() => setIsmodeFocus(false)}
    //           onChange={item => {
    //             setSelectedMode(item);
    //             setLecMode(item.value);
    //             setIsmodeFocus(false);
    //             // setsubjectId(item.subject);
    //           }}
    //         />
    //       </View>
    //       <Text style={styles.formtxt}>ADD Message:</Text>
    //       <AutoGrowingTextInput
    //         style={styles.txtboxDesc}
    //         value={desc}
    //         onChangeText={value => setDesc(value)}
    //         placeholder={'Add Message'}
    //       />
    //       <View style={{paddingHorizontal: 20}}>
    //         <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
    //           Date of Submission
    //         </Text>
    //         <TouchableOpacity
    //           style={{
    //             flex: 1,
    //             flexDirection: 'row',
    //             alignItems: 'center',
    //             backgroundColor: '#FFFFFF',
    //             borderColor: '#C4C4C4',
    //             borderWidth: 1,
    //             borderRadius: 5,
    //             alignSelf: 'center',
    //             paddingHorizontal: 5,
    //           }}
    //           onPress={showDatepicker}>
    //           <TextInput
    //             placeholder="Choose Date"
    //             placeholderTextColor="#808080"
    //             editable={false}
    //             style={{
    //               flex: 1,
    //               backgroundColor: '#FFFFFF',
    //               borderColor: '#C4C4C4',
    //               fontFamily: 'Montserrat-Regular',
    //             }}>
    //             {text}
    //           </TextInput>
    //           <MaterialCommunityIcons
    //             name="calendar-blank-outline"
    //             size={26}
    //             color="#434b56"
    //             onPress={showDatepicker}
    //           />

    //           {show && (
    //             <DateTimePicker
    //               testID="dateTimePicker"
    //               value={date}
    //               mode={mode}
    //               is24Hour={true}
    //               display="default"
    //               onChange={onChange}
    //             />
    //           )}
    //         </TouchableOpacity>
    //       </View>
    //       <View>
    //         <TouchableOpacity
    //           style={{
    //             flexDirection: 'row',
    //             alignItems: 'center',
    //             backgroundColor: '#000000',
    //             width: '80%',
    //             height: 50,
    //             borderColor: '#000000',
    //             alignSelf: 'center',
    //             borderWidth: 2,
    //             marginTop: 30,
    //             marginBottom: 30,
    //             bottom: 0,
    //             borderRadius: 15,
    //             justifyContent: 'center',
    //           }}
    //           onPress={() => {
    //             UpdateAssignment();
    //           }}>
    //           <Text
    //             style={{
    //               color: '#FFFFFF',
    //               fontSize: 17,
    //               fontFamily: 'Montserrat-SemiBold',
    //             }}>
    //             Submit
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </ScrollView>
    // </View>
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          justifyContent: 'space-between',

          paddingHorizontal: 10,
          borderBottomColor: '#275CE0',
          borderBottomWidth: 1,
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
              style={{marginVertical: 5, paddingHorizontal: 7}}
              name="arrow-back"
              size={20}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
          }}>
          <Text style={[paraGray.largebold, {color: 'black'}]}>
            Update Assigment
          </Text>
        </View>
      </View>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        style={{width: '90%', alignSelf: 'center'}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <View>
            {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#C4C4C4',
              width: '80%',
              height: 50,
              alignSelf: 'center',
              marginTop: '8%',
              marginBottom: 15,
              bottom: 0,
              borderRadius: 5,
              justifyContent: 'center',
            }}
            onPress={selectFile}>
            <Text
              style={{
                color: '#000000',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Attach File
              <MaterialCommunityIcons name="plus" size={20} />
            </Text>
          </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.bgColor,
                width: '80%',
                height: 96,
                borderRadius: 13,
                alignSelf: 'center',
                marginTop: 20,
                paddingHorizontal: 20,
              }}
              onPress={selectFile}>
              <AntDesign
                style={{marginVertical: 5}}
                name="pluscircle"
                size={30}
                color={COLORS.black}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  color: COLORS.black,
                  fontSize: 15,
                  marginLeft: 16,
                }}>
                Add Image(s) / Optional
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: 20,
              paddingHorizontal: 10,
            }}>
            {file.map((file, index) => (
              // {/* {file != '' && ( */}
              <TouchableOpacity
                // key={index}
                style={{marginHorizontal: 10, marginVertical: 10}}
                onPress={() => removeItem(index)}
                // onPress={() => setFile('')}
              >
                <AntDesign
                  style={{alignSelf: 'flex-end', marginRight: 5}}
                  name="closecircleo"
                  size={20}
                  color={COLORS.black}
                />
                <FontAwesome name="file-pdf-o" size={40} color={COLORS.red} />
                <Text>{file.name}</Text>
              </TouchableOpacity>
              // )}
            ))}
          </View>

          <View style={{marginTop: 0}}>
            <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
              Stream
            </Text>
            {/* <Dropdown
            style={{
              height: 50,
              borderColor: isstreamFocus ? 'blue' : 'gray',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 8,
            }}
            placeholderStyle={{
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            selectedTextStyle={{
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            inputSearchStyle={{
              height: 40,
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            data={getdata.map(item => ({
              label: item.class_name,
              value: item.class_id,
            }))}
            search
            containerStyle={{
              backgroundColor: '#E5E5E5',
              borderColor: '#E5E5E5',
            }}
            fontFamily={'Montserrat-Regular'}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isstreamFocus ? 'Select Stream' : '...'}
            searchPlaceholder="Search..."
            value={stream}
            onFocus={() => setIsstreamFocus(true)}
            onBlur={() => setIsstreamFocus(false)}
            onChange={item => {
              // getsectionData(item);
              setselectedStream(item);
              setStream(item.value);
              setIsstreamFocus(false);
              getsectionData(item);
            }}
          /> */}
            <DropDown
              open={openStream}
              setOpen={setOpenStream}
              value={stream}
              items={getdata.map(item => ({
                label: item.class_name,
                value: item.class_id,
              }))}
              placeholder={'Select Stream'}
              style={{paddingHorizontal: 10}}
              onSelectItem={item => {
                // getsectionData(item);
                setselectedStream(item);
                setStream(item.value);
                setIsstreamFocus(false);
                getsectionData(item);
              }}
            />
          </View>
        </View>
        <View>
          <View style={{}}>
            <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
              Section
            </Text>
            {/* <Dropdown
            style={{
              height: 50,
              borderColor: issectionFocus ? 'blue' : 'gray',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 8,
            }}
            placeholderStyle={{
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            selectedTextStyle={{
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            inputSearchStyle={{
              height: 40,
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            data={getsectiondata.map(item => ({
              label: item.section_name,
              value: item.section_id,
              // subject: item.subject_id,
            }))}
            search
            containerStyle={{
              backgroundColor: '#E5E5E5',
              borderColor: '#E5E5E5',
            }}
            fontFamily={'Montserrat-Regular'}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!issectionFocus ? 'Select Section' : '...'}
            searchPlaceholder="Search..."
            value={section}
            onFocus={() => setIsSectionFocus(true)}
            onBlur={() => setIsSectionFocus(false)}
            onChange={item => {
              setSelectedSection(item);
              setSection(item.value);
              setIsSectionFocus(false);
              getsubjectData(item);
            }}
          /> */}
            <DropDown
              open={openSection}
              setOpen={setOpenSection}
              value={section}
              items={getsectiondata.map(item => ({
                label: item.section_name,
                value: item.section_id,
                // subject: item.subject_id,
              }))}
              style={{paddingHorizontal: 10}}
              placeholder={'Select Section'}
              onSelectItem={item => {
                setSelectedSection(item);
                setSection(item.value);
                setIsSectionFocus(false);
                getsubjectData(item);
              }}
            />
          </View>
          <View style={{}}>
            <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
              Subject
            </Text>
            {/* <Dropdown
            style={{
              height: 50,
              borderColor: issubjectFocus ? 'blue' : 'gray',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 8,
            }}
            placeholderStyle={{
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            selectedTextStyle={{
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            inputSearchStyle={{
              height: 40,
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            data={getsubjectdata.map(item => ({
              label: item.name,
              value: item.id,
              // subject: item.subject_id,
            }))}
            search
            containerStyle={{
              backgroundColor: '#E5E5E5',
              borderColor: '#E5E5E5',
            }}
            fontFamily={'Montserrat-Regular'}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!issubjectFocus ? 'Select subject' : '...'}
            searchPlaceholder="Search..."
            value={subject}
            onFocus={() => setIssubjectFocus(true)}
            onBlur={() => setIssubjectFocus(false)}
            onChange={item => {
              setSelectedSubject(item);
              setsubject(item.value);
              setIssubjectFocus(false);
              // setsubjectId(item.subject);
            }}
          /> */}
            <DropDown
              open={openSubject}
              setOpen={setOpenSubject}
              value={section}
              items={getsubjectdata.map(item => ({
                label: item.name,
                value: item.id,
                // subject: item.subject_id,
              }))}
              style={{paddingHorizontal: 10}}
              placeholder={'Select subject'}
              onSelectItem={item => {
                setSelectedSubject(item);
                setsubject(item.value);
                setIssubjectFocus(false);
                // setsubjectId(item.subject);
              }}
            />
          </View>

          <View style={{}}>
            <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
              Modes of Submission
            </Text>
            {/* <Dropdown
            style={{
              height: 50,
              borderColor: ismodeFocus ? 'blue' : 'gray',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 8,
            }}
            placeholderStyle={{
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            selectedTextStyle={{
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            inputSearchStyle={{
              height: 40,
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            data={items.map(item => ({
              label: item.label,
              value: item.value,
            }))}
            search
            containerStyle={{
              backgroundColor: '#E5E5E5',
              borderColor: '#E5E5E5',
            }}
            fontFamily={'Montserrat-Regular'}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!ismodeFocus ? 'Submission Mode' : '...'}
            searchPlaceholder="Search..."
            value={lecmode}
            onFocus={() => setIsmodeFocus(true)}
            onBlur={() => setIsmodeFocus(false)}
            onChange={item => {
              setSelectedMode(item);
              setLecMode(item.value);
              setIsmodeFocus(false);
              // setsubjectId(item.subject);
            }}
          /> */}
            <DropDown
              open={openSubmissionMode}
              setOpen={setOpenSubmissionMOde}
              value={lecmode}
              items={items.map(item => ({
                label: item.label,
                value: item.value,
              }))}
              style={{paddingHorizontal: 10}}
              placeholder={'Submission Mode'}
              onSelectItem={item => {
                setSelectedMode(item);
                setLecMode(item.value);
                setIsmodeFocus(false);
                // setsubjectId(item.subject);
              }}
            />
          </View>
          <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
            ADD Message:
          </Text>
          <AutoGrowingTextInput
            style={{
              backgroundColor: 'transparent',
              borderColor: COLORS.primary,
              borderWidth: 0.6,
              borderRadius: 12,
              height: 80,
              width: '100%',
              alignSelf: 'center',
              fontSize: 13,
              paddingHorizontal: 10,
              //color: '#000000',
              fontFamily: 'Montserrat-Regular',
            }}
            value={desc}
            onChangeText={value => setDesc(value)}
            placeholder={'Add Message'}
          />
          <View style={{}}>
            <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
              Date of Submission
            </Text>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                //borderColor: '#C4C4C4',
                borderColor: COLORS.primary,
                borderWidth: 0.6,
                borderRadius: 12,
                alignSelf: 'center',
                paddingHorizontal: 10,
              }}
              onPress={showDatepicker}>
              <TextInput
                placeholder="Choose Date"
                placeholderTextColor="#808080"
                editable={false}
                style={{
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  borderColor: '#C4C4C4',
                  fontFamily: 'Montserrat-Regular',
                }}>
                {text}
              </TextInput>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={26}
                // color="#434b56"
                color={COLORS.primary}
                onPress={showDatepicker}
              />

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  minimumDate={new Date()}
                />
              )}
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: '#000000',
                backgroundColor: COLORS.primary,
                width: '80%',
                height: 50,
                // borderColor: '#000000',
                alignSelf: 'center',
                //borderWidth: 2,
                marginTop: 30,
                marginBottom: 30,
                bottom: 0,
                borderRadius: 15,
                justifyContent: 'center',
              }}
              onPress={() => {
                CreateAssignment();
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 17,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateAss;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  txtbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 50,
    borderColor: '#D3D3D3',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
  },
  txtboxDesc: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 80,
    borderColor: COLORS.lightbackground,
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  formtxt: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: -10,
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  labeltxt: {
    color: '#000000',
    marginLeft: 15,
    marginTop: 10,
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
});
