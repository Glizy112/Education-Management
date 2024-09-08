import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {Header} from '../../Components/Header';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

const TeacherLeaveApply = props => {
  const dispatch = useDispatch();
  const [active, setActive] = useState('1');
  const {schoolid, classid, sectionid, studentid} = useSelector(
    state => state.userReducer,
  );
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [getdata, setdata] = useState([]);
  const [desc, setDesc] = useState('');
  // <------------Select section-------------->
  const list = [
    {label: 'On Duty', value: 'On Duty'},
    {label: 'Paid Leave', value: 'Paid Leave'},
    {label: 'Paid Holiday', value: 'Paid Holiday'},
    {label: 'LWOP', value: 'LWOP'},
  ];
  const lists = [
    {label: 'Supervisor', value: 'Supervisor'},
    {label: 'Principle', value: 'Principle'},
  ];
  const [selectedsection, setSelectedSection] = useState(null);
  const [section, setSection] = useState('');
  const [issectionFocus, setIsSectionFocus] = useState(false);
  const [showlist, setShowList] = useState(false);
  const [getsectiondata, setSectiondata] = useState([]);
  // <------------Select section-------------->
  const [selectedfaculty, setSelectedFaculty] = useState(null);
  const [faculty, setFaculty] = useState(lists[0].label);
  const [isfacultyFocus, setIsFacultyFocus] = useState(false);
  const [facultylist, setFacultyList] = useState(false);
  const [getFacultydata, setFacultydata] = useState([]);

  // <----------Time Picker---------->
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
    // console.log(fDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [dates, setDates] = useState(new Date());
  const [modes, setModes] = useState('date');
  const [shows, setShows] = useState(false);
  const [texts, setTexts] = useState('');

  const onChanges = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShows(Platform.OS === 'ios');
    setDates(currentDate);

    //For Date Picker
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setTexts(fDate);
    // console.log(fDate);
  };

  const showModes = currentMode => {
    setShows(true);
    setModes(currentMode);
  };

  const showDatepickers = () => {
    showModes('date');
  };

  useEffect(() => {}, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={loading} />}
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.bluee}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName="Request Leave"
          marginLeft
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Image
          style={{backgroundColor: COLORS.bluee, width: '100%'}}
          source={require('../../../assets/star_pattern.png')}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.bg,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 15,
            paddingBottom: 30,
            marginTop: -30,
          }}>
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={[paraGray.darklarge]}>31-11-2020</Text>
          </View>
          <View style={{marginTop: 20}}>
            <Dropdown
              style={{
                height: 50,
                borderColor: issectionFocus ? 'blue' : COLORS.blue,
                borderWidth: 0.5,
                borderRadius: 8,
                paddingHorizontal: 8,
              }}
              placeholderStyle={{
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
                color: COLORS.black,
              }}
              selectedTextStyle={{
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
                color: COLORS.lightblack,
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
              data={list.map(item => ({
                label: item.label,
                value: item.label,
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
              placeholder={!issectionFocus ? 'Leave Type' : '...'}
              searchPlaceholder="Search..."
              value={section}
              onFocus={() => setIsSectionFocus(true)}
              onBlur={() => setIsSectionFocus(false)}
              onChange={item => {
                setSelectedSection(item);
                setSection(item.value);
                setIsSectionFocus(false);
                // getsubjectData(item);
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                height: 50,
                borderColor: COLORS.blue,
                borderWidth: 0.5,
                marginTop: 15,
                borderRadius: 5,
                alignSelf: 'center',
                marginRight: 10,
              }}>
              <TextInput
                placeholder="Choose Date"
                placeholderTextColor="#808080"
                editable={false}
                style={{
                  marginLeft: 2,
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                  height: 40,
                  fontSize: 12,
                  fontFamily: 'Montserrat-Regular',
                }}>
                {text}
              </TextInput>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                style={{marginRight: 5}}
                size={26}
                color={COLORS.bluee}
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                flex: 1,
                height: 50,
                borderColor: COLORS.blue,
                borderWidth: 0.5,
                paddingHorizontal: 3,
                marginTop: 15,
                borderRadius: 5,
                alignSelf: 'center',
                marginLeft: 10,
              }}>
              <TextInput
                placeholder="Choose Date"
                placeholderTextColor="#808080"
                editable={false}
                style={{
                  marginLeft: 2,
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                  height: 40,
                  fontSize: 12,
                  fontFamily: 'Montserrat-Regular',
                }}>
                {texts}
              </TextInput>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={26}
                color={COLORS.bluee}
                style={{marginRight: 5}}
                onPress={showDatepickers}
              />
              {shows && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dates}
                  mode={modes}
                  is24Hour={false}
                  display="default"
                  onChange={onChanges}
                />
              )}
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: active == '1' ? COLORS.blue : COLORS.bg,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                borderWidth: active == '2' ? 0.5 : 0,
                borderColor: COLORS.blue,
              }}
              onPress={() => setActive('1')}>
              <Text
                style={[
                  paraGray.whitepara,
                  {
                    marginVertical: 20,
                    color: active == '1' ? COLORS.bg : COLORS.lightblack,
                  },
                ]}>
                Full-Day
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: active == '2' ? COLORS.blue : COLORS.bg,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                borderWidth: active == '1' ? 0.5 : 0,
                borderColor: COLORS.blue,
              }}
              onPress={() => setActive('2')}>
              <Text
                style={[
                  paraGray.whitepara,
                  {
                    marginVertical: 20,
                    color: active == '2' ? COLORS.bg : COLORS.lightblack,
                  },
                ]}>
                Half Day
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, marginTop: 10}}>
            <AutoGrowingTextInput
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                backgroundColor: '#FFFFFF',
                width: '100%',
                height: 80,
                borderColor: COLORS.blue,
                alignSelf: 'center',
                borderWidth: 0.5,
                marginTop: 10,
                borderRadius: 5,
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
              }}
              value={desc}
              onChangeText={value => setDesc(value)}
              placeholder="Reason...."
            />
          </View>
          <View style={{marginTop: 20}}>
            <Dropdown
              style={{
                height: 50,
                borderColor: isfacultyFocus ? 'blue' : COLORS.blue,
                borderWidth: 0.5,
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
              data={lists.map(item => ({
                label: item.label,
                value: item.label,
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
              placeholder={!isfacultyFocus ? 'Select Faculty' : '...'}
              searchPlaceholder="Search..."
              value={faculty}
              onFocus={() => setIsFacultyFocus(true)}
              onBlur={() => setIsFacultyFocus(false)}
              onChange={item => {
                setSelectedFaculty(item);
                setFaculty(item.value);
                setIsFacultyFocus(false);
              }}
            />
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                height: 50,
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
                backgroundColor: COLORS.blue,
                borderRadius: 30,
              }}
              onPress={() => props.navigation.navigate('TeacherLeaveSuccess')}>
              <Text
                style={[
                  paraGray.whitelarge,
                  {fontFamily: 'Montserrat-SemiBold'},
                ]}>
                Submit Request
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TeacherLeaveApply;
