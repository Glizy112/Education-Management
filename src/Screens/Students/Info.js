import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  //TouchableOpacity,
} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {paraGray} from '../../theme/styles/Base';
import {COLORS} from '../../theme/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import {MultiSelect} from 'react-native-element-dropdown';
const Info = () => {
  const [student, setStudent] = useState({
    image: null,
    name: null,
    mobileno: null,
    email: null,
    fathername: null,
    fathermobileno: null,
    fatheremail: null,
    mothername: null,
    mothermobileno: null,
    motheremail: null,
    Address: null,
  });
  const [selected, setSelected] = useState([]);
  //   -----------------DropDownPicker------------
  DropDownPicker.setListMode('SCROLLVIEW');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);
  const [opens, setOpens] = useState(false);
  const [values, setValues] = useState(null);
  const [Genderitems, setGenderItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ]);

  // --------Date-time Picker----------
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

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
      width: 250,
      height: 250,
      cropping: true,
    }).then(image => {
      console.log(image);
      setStudent({image: image.path});
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
  console.log(student.image);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          //height: 48,
          justifyContent: 'center',
          paddingHorizontal: 15,
          paddingBottom: 4,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0,
          }}>
          <Text
            style={[paraGray.largebold, {textAlign: 'center', marginTop: 16}]}>
            Add Student
          </Text>
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
            {student.image == null ? (
              <FontAwesome5 name="user-alt" size={20} color="#000000" />
            ) : (
              <Avatar.Image size={50} source={{uri: student.image}} />
            )}
            <Text style={styles.label}>Add Profile Picture</Text>
          </TouchableOpacity>

          <Text style={[styles.formtxt, {marginTop: 24}]}>Name</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="Enter student name"
              placeholderTextColor={COLORS.lightergray}
              value={student.name}
              onChangeText={value => {
                setStudent({...student, name: value});
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
          <Text style={styles.formtxt}>Mobile No</Text>
          <View style={styles.txtbox}>
            <TextInput
              textContentType="number"
              keyboardType="number-pad"
              maxLength={10}
              placeholder="Enter mobile number"
              placeholderTextColor={COLORS.lightergray}
              value={student.mobileno}
              onChangeText={value => {
                setStudent({...student, mobileno: value});
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
          <Text style={styles.formtxt}>Email ID</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="Enter email id"
              placeholderTextColor={COLORS.lightergray}
              value={student.email}
              onChangeText={value => {
                setStudent({...student, email: value});
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
          <Text style={styles.formtxt}>Stream</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={[styles.txtbox, {paddingHorizontal: 8}]}
            placeholder="Select Stream"
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
          <Text style={styles.formtxt}>Gender</Text>
          <DropDownPicker
            open={opens}
            value={values}
            items={Genderitems}
            setOpen={setOpens}
            setValue={setValues}
            setItems={setGenderItems}
            style={[styles.txtbox, {paddingHorizontal: 8}]}
            placeholder="Select Gender"
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
          <Text style={styles.formtxt}>Date of Birth</Text>
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
              placeholder="Select D.O.B."
              placeholderTextColor={COLORS.lightergray}
              style={{
                marginLeft: 8,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                color: COLORS.black,
                fontFamily: 'Montserrat-Regular',
                paddingLeft: 4,
              }}>
              {text}
            </TextInput>
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              size={26}
              //color="#434b56"
              color={COLORS.primary}
              onPress={showDatepicker}
              style={{marginLeft: -4}}
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
          <Text style={styles.formtxt}>Father Name</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="Enter name"
              placeholderTextColor={COLORS.lightergray}
              value={student.fathername}
              onChangeText={value => {
                setStudent({...student, fathername: value});
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
          <Text style={styles.formtxt}>Father Mobile No.</Text>
          <View style={styles.txtbox}>
            <TextInput
              textContentType="telephoneNumber"
              keyboardType="number-pad"
              maxLength={10}
              placeholder="Enter mobile number"
              placeholderTextColor={COLORS.lightergray}
              value={student.fathermobileno}
              onChangeText={value => {
                setStudent({...student, fathermobileno: value});
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
          <Text style={styles.formtxt}>Father Email Id</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="Enter email id"
              placeholderTextColor={COLORS.lightergray}
              value={student.fatheremail}
              onChangeText={value => {
                setStudent({...student, fatheremail: value});
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
          <Text style={styles.formtxt}>Mother Name</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="Enter Name"
              placeholderTextColor={COLORS.lightergray}
              value={student.mothername}
              onChangeText={value => {
                setStudent({...student, mothername: value});
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
          <Text style={styles.formtxt}>Mother Mobile No.</Text>
          <View style={styles.txtbox}>
            <TextInput
              textContentType="telephoneNumber"
              keyboardType="number-pad"
              maxLength={10}
              placeholder="Enter mobile number"
              placeholderTextColor={COLORS.lightergray}
              value={student.mothermobileno}
              onChangeText={value => {
                setStudent({...student, mothermobileno: value});
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
          <Text style={styles.formtxt}>Mother Email Id</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="Enter email id"
              placeholderTextColor={COLORS.lightergray}
              value={student.motheremail}
              onChangeText={value => {
                setStudent({...student, motheremail: value});
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
          <Text style={styles.formtxt}>Permanent Address</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="Enter Permanent Address"
              placeholderTextColor={COLORS.lightergray}
              value={student.Address}
              onChangeText={value => {
                setStudent({...student, Address: value});
              }}
              style={{
                marginLeft: 4,
                backgroundColor: '#FFFFFF',
                width: '98%',
                height: 40,
                color: COLORS.black,
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
              data={Busitem}
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
          <View
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
              onPress={() => console.log('Saved')}>
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
          {/* <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                width: '80%',
                height: 56,
                borderColor: COLORS.primary,
                alignSelf: 'center',
                borderWidth: 1.2,
                //marginTop: 15,
                borderRadius: 12,
                justifyContent: 'center',
                //elevation: 3,
              }}
              onPress={()=> console.log('Student Detail->', student)}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                }}>
                Check
              </Text>
            </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Info;

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
    paddingHorizontal: '4%',
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
    //borderColor: 'gray',
    borderColor: COLORS.primary,
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
