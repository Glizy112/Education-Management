import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {paraGray} from '../../theme/styles/Base';
import {COLORS} from '../../theme/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import Url from '../../Config/Api/Url';
import {useSelector, useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';

const StudentEdit = props => {
  const {studentdetail} = props.route.params;
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
  const {userinfo, userid, teacherid, schoolid, userimage} = useSelector(
    state => state.userReducer,
  );
  const [selected, setSelected] = useState([]);
  const [showimage, setshowimage] = useState(false);
  const [isstreamFocus, setIsstreamFocus] = useState(false);
  const [isgenderFocus, setIsgenderFocus] = useState(false);
  // const [gender, setGender] = useState(null);
  const [stream, setStream] = useState(studentdetail.class_name);
  const [studentimage, setStudentImage] = useState(studentdetail.photo);
  const [studentname, setStudentName] = useState(studentdetail.student_name);
  const [studentmobileno, setStudentMobileno] = useState(studentdetail.phone);
  const [studentemail, setStudentEmail] = useState(studentdetail.email);

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
  const [studentaadhar, setStudentAadhar] = useState(
    studentdetail.aadharcard_no,
  );

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
  console.log(studentimage.image);
  return (
    <KeyboardAvoidingView style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={[paraGray.darklarge, {textAlign: 'center', marginTop: 5}]}>
            INFO
          </Text>
        </View>
      </View>
      <View
        style={{flex: 1, borderBottomWidth: 1.5, borderColor: COLORS.section}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              //backgroundColor: '#C4C4C440',
              backgroundColor: COLORS.bgColor,
              width: '70%',
              height: 80,
              borderRadius: 16,
              alignSelf: 'center',
              marginTop: 20,

              //paddingHorizontal: 20,
            }}
            onPress={SelectImage}>
            {studentimage == null ? (
              <FontAwesome5 name="user-alt" size={20} color="#000000" />
            ) : (
              //   <Avatar.Image size={50} source={{uri: studentdetail.image}} />
              <FastImage
                style={{width: 50, height: 50, borderRadius: 50}}
                source={{
                  uri: showimage
                    ? studentimage
                    : Url.student_IMG + studentimage,
                }}
              />
            )}
            <Text style={styles.label}>Add Profile Picture</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#C4C4C440',
              width: '80%',
              height: 80,
              borderRadius: 13,
              alignSelf: 'center',
              marginTop: 20,
              paddingHorizontal: 20,
            }}
            onPress={SelectImage}>
            {showimage == false ? (
              studentimage == null ? (
                <FontAwesome5 name="user-alt" size={20} color="#000000" />
              ) : (
                <FastImage
                  style={{width: 50, height: 50, borderRadius: 50}}
                  source={{uri: Url.student_IMG + studentdetail.photo}}
                />
              )
            ) : (
              <FastImage
                style={{width: 50, height: 50, borderRadius: 50}}
                source={{uri: studentimage}}
              />
            )}
            <Text style={styles.label}>Add Profile Picture</Text>
          </TouchableOpacity> */}

          <Text style={[styles.formtxt, {marginTop: 24}]}>Name:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="ENTER NAME"
              placeholderTextColor={COLORS.lightergray}
              value={studentname}
              onChangeText={value => {
                setStudentName(value);
              }}
              style={{
                marginLeft: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                color: COLORS.black,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          <Text style={styles.formtxt}>Mobile No:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="ENTER MOBILE NUMBER"
              placeholderTextColor="#808080"
              value={studentmobileno}
              onChangeText={value => {
                setStudentMobileno(value);
              }}
              style={{
                marginLeft: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          <Text style={styles.formtxt}>Email ID:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="EMAIL ID HERE"
              placeholderTextColor="#808080"
              value={studentemail}
              onChangeText={value => {
                setStudentEmail(value);
              }}
              style={{
                marginLeft: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          <Text style={styles.formtxt}>Aadharcard No:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="Aadharcard No"
              placeholderTextColor="#808080"
              value={studentaadhar}
              onChangeText={value => {
                setStudentAadhar(value);
              }}
              style={{
                marginLeft: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>

          <Text style={styles.formtxt}>Stream:</Text>
          <View>
            {/* <Dropdown
              style={[styles.txtbox, {paddingHorizontal: 8}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
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
              placeholder={!isstreamFocus ? stream : '...'}
              searchPlaceholder="Search..."
              value={stream}
              onFocus={() => setIsstreamFocus(true)}
              onBlur={() => setIsstreamFocus(false)}
              onChange={item => {
                // getsectionData(item);
                setStream(item.value);
                setIsstreamFocus(false);
              }}
            /> */}
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={[styles.txtbox, {paddingHorizontal: 8}]}
              placeholder={!isstreamFocus ? stream : '...'}
              placeholderStyle={{color: COLORS.lightergray, paddingLeft: 4}}
              dropDownDirection="TOP"
              dropDownContainerStyle={{
                width: '90%',
                alignSelf: 'center',
                borderColor: COLORS.primary,
              }}
              textStyle={{
                fontSize: 13,
                color: '#000000',
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          <Text style={styles.formtxt}>Gender:</Text>

          {/* <Dropdown
              style={[styles.dropdown, isgenderFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              // data={getsubdata.map(item => ({
              //   label: item.name,
              //   value: item.id,
              // }))}
              data={items}
              search
              containerStyle={{
                backgroundColor: '#E5E5E5',
                borderColor: '#E5E5E5',
              }}
              fontFamily={'Montserrat-Regular'}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isgenderFocus ? studentgender : '...'}
              searchPlaceholder="Search..."
              value={studentgender}
              onFocus={() => setIsgenderFocus(true)}
              onBlur={() => setIsgenderFocus(false)}
              onChange={item => {
                // getsectionData(item);
                setStudentGender(item.value);
                setIsgenderFocus(false);
              }}
            /> */}
          <DropDownPicker
            open={opens}
            value={values}
            items={Genderitems}
            setOpen={setOpens}
            setValue={setValues}
            setItems={setGenderItems}
            style={[styles.txtbox, {paddingHorizontal: 8}]}
            placeholder={!isgenderFocus ? studentgender : '...'}
            placeholderStyle={{color: COLORS.lightergray, paddingLeft: 4}}
            // dropDownDirection="Bottom"
            dropDownContainerStyle={{
              width: '90%',
              alignSelf: 'center',
              borderColor: COLORS.primary,
            }}
            textStyle={{
              fontSize: 13,
              color: '#000000',
              fontFamily: 'Montserrat-Regular',
            }}
          />

          <Text style={styles.formtxt}>DOB:</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              width: '90%',
              height: 50,
              borderColor: COLORS.primary,
              paddingHorizontal: 0,
              borderWidth: 0.8,
              marginTop: 15,
              borderRadius: 12,
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="SELECT DOB"
              placeholderTextColor={COLORS.lightergray}
              editable={false}
              value={studentdob}
              style={{
                marginLeft: 8,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                color: COLORS.black,
                fontFamily: 'Montserrat-Regular',
                paddingLeft: 4,
              }}
            />

            <MaterialCommunityIcons
              name="calendar-blank-outline"
              size={26}
              color={COLORS.primary}
              style={{marginLeft: -4}}
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
              />
            )}
          </View>
          <Text style={styles.formtxt}>Father Name:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="ENTER NAME"
              placeholderTextColor="#808080"
              value={studentfathername}
              onChangeText={value => {
                setStudentFatherName(value);
              }}
              style={{
                marginLeft: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          <Text style={styles.formtxt}>Father Mobile No:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="ENTER MOBILE NUMBER"
              placeholderTextColor="#808080"
              value={studentfathermobileno}
              onChangeText={value => {
                setStudentFatherMobileNo(value);
              }}
              style={{
                marginLeft: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          <Text style={styles.formtxt}>Father Email Id:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="ENTER EMAIL ID HERE"
              placeholderTextColor="#808080"
              value={studentfatheremail}
              onChangeText={value => {
                setStudentFatherEmail(value);
              }}
              style={{
                marginLeft: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          <Text style={styles.formtxt}>Mother Name:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="ENTER NAME"
              placeholderTextColor="#808080"
              value={studentmothername}
              onChangeText={value => {
                setStudentMotherName(value);
              }}
              style={{
                marginLeft: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          <Text style={styles.formtxt}>Mother Mobile No:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="ENTER MOBILE NUMBER"
              placeholderTextColor="#808080"
              value={studentmothermobileno}
              onChangeText={value => {
                setStudentMotherMobileNo(value);
              }}
              style={{
                marginLeft: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          <Text style={styles.formtxt}>Mother Email Id:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="ENTER EMAIL HERE"
              placeholderTextColor="#808080"
              value={studentmotheremail}
              onChangeText={value => {
                setStudentMotherEmail(value);
              }}
              style={{
                marginLeft: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          <Text style={styles.formtxt}>Parmanent Add:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="Parmanent Add"
              placeholderTextColor="#808080"
              value={studentAddress}
              onChangeText={value => {
                setStudentAddress(value);
              }}
              style={{
                marginLeft: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          {/* <Text style={styles.formtxt}>School Bus No:</Text>
        <DropDownPicker
          open={openbus}
          value={valuebus}
          items={Busitem}
          setOpen={setOpenbus}
          setValue={setValuebus}
          setItems={setBusItem}
          style={styles.txtbox}
          placeholder="SELECT BUS"
          // dropDownDirection="Bottom"
          dropDownContainerStyle={{
            width: '90%',
            alignSelf: 'center',
            borderColor: '#C4C4C4',
          }}
          textStyle={{
            fontSize: 13,
            color: '#000000',
            fontFamily: 'Montserrat-Regular',
          }}
        /> */}
          {/* <Text style={styles.formtxt}>Select Subjects:</Text>
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={items}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={selected}
              onChange={item => {
                setSelected(item);
              }}
            />
          </View> */}
          {/* <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 12,
              marginBottom: 60,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.red,
                width: '62%',
                height: 56,
                borderColor: COLORS.red,
                alignSelf: 'center',
                borderWidth: 1.2,
                marginTop: 15,
                borderRadius: 12,
                justifyContent: 'center',
              }}>
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
              onPress={Update}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View> */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 12,
              marginBottom: 60,
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
              }}>
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
              onPress={Update}>
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StudentEdit;

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  label: {
    flexDirection: 'row',
    color: 'black', // <-- The magic
    textAlign: 'center', // <-- The magic
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    paddingHorizontal: '10%',
  },
  txtbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 50,
    paddingHorizontal: 4,
    //borderColor: '#D3D3D3',
    borderColor: COLORS.primary,
    alignSelf: 'center',
    borderWidth: 0.8,
    marginTop: 15,
    borderRadius: 12,
  },
  formtxt: {
    marginTop: 14,
    paddingHorizontal: 24,
    marginBottom: -10,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: COLORS.black,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
});
