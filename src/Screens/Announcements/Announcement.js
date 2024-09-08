import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  //Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem} from '@rneui/themed';
import DropDown from '../../Components/DropDown';
import Button from '../../Components/Button';
import DocumentPicker from 'react-native-document-picker';
import {Avatar, Snackbar} from 'react-native-paper';
import {container, paraGray} from '../../theme/styles/Base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../theme/Colors';

import {ApiMethod} from '../../Config/Api/ApiMethod';

import FieldInputs from '../../Components/FieldInputs';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

import {Dropdown} from 'react-native-element-dropdown';

import Spinner from 'react-native-loading-spinner-overlay';

import Url from '../../Config/Api/Url';
import ImagePicker from 'react-native-image-crop-picker';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FastImage from 'react-native-fast-image';
import Moment from 'moment';

const Announcement = props => {
  const [filterhistory, setFilterHistory] = useState([
    {
      name: 'Akhil',
      class: 'Fifth',
      subject: 'science',
      from: '2023-4-28',

      submitted_on: '4th Sep 2010',
      penalty: 'forgive',
    },
    {
      name: 'SSS',
      class: 'Fifth',
      subject: 'science',
      from: '2023-4-28',

      submitted_on: '4th Sep 2010',
      penalty: 'forgive',
    },
    {
      name: 'Ak',
      class: 'Fifth',
      subject: 'science',
      from: '2023-4-28',

      submitted_on: '4th Sep 2010',
      penalty: 'forgive',
    },
  ]);
  const [booksFilter, setBooksFilter] = useState([
    {
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'Commerce',
      pubname: 'Balbharti',
    },
    {
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'Commerce',
      pubname: 'Balbharti',
    },
    {
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'Commerce',
      pubname: 'Balbharti',
    },
  ]);
  const [expandedTakeAttendace, setExpandedTakeAttendace] =
    React.useState(false);

  const [expandedAttendaceHistory, setExpandedAttendaceHistory] =
    React.useState(false);
  const [expandedReports, setExpandedReports] = React.useState(false);
  const [Collection, setCollection] = React.useState(false);
  const [openAttendanceClass, setOpenAttendanceClass] = useState(false);
  const [openAttendanceSection, setOpenAttendanceSection] = useState(false);
  const [openAttendanceSubject, setOpenAttendanceSubject] = useState(false);
  const [valueAttendanceClass, setValueAttendanceClass] = useState(null);
  const [valueAttendanceSection, setValueAttendanceSection] = useState(null);
  const [valueAttendanceSubject, setValueAttendanceSubject] = useState(null);

  const [itemsAttendanceClass, setItemsAttendanceClass] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);
  const [itemsAttendanceSection, setItemsAttendanceSection] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);
  const [ItemsAttendanceSubject, setItemsAttendanceSubject] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);
  const [showModal, setShowModal] = useState(false);
  // Modal Bulk Add Books

  const [file, setFile] = useState('');
  const [excelname, setExcelname] = useState();
  //const [loading, setLoading] = useState(false);
  //const [load, setLoad] = useState(true);
  //const [stream, setStream] = useState();
  //const [isstreamFocus, setIsstreamFocus] = useState(false);
  //const [getdata, setdata] = useState([]);
  const [getsampledata, setSampledata] = useState('');
  //const {teacherid, schoolid, userid} = useSelector(state => state.userReducer);
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const {teacherid, userid, roleid, schoolid} = useSelector(
    state => state.userReducer,
  );
  const [getdata, setdata] = useState([]);
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  // <------------Select Stream-------------->
  const [isstreamFocus, setIsstreamFocus] = useState(false);
  const [stream, setStream] = useState(null);
  const [selectedstream, setselectedStream] = useState(null);
  // <------------Select section-------------->
  const [selectedsection, setSelectedSection] = useState(null);
  const [section, setSection] = useState(null);
  const [issectionFocus, setIsSectionFocus] = useState(false);
  const [getsectiondata, setSectiondata] = useState([]);
  // <------------Select Subject-------------->
  const [selectedsubject, setSelectedSubject] = useState(null);
  const [subject, setsubject] = useState(null);
  const [issubjectFocus, setIssubjectFocus] = useState(false);
  const [getsubjectdata, setsubjectdata] = useState([]);
  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      // formData.append('teacher_id', teacherid);

      let resp = await fetch(`${Url.list_notice}`, {
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
          console.log(result.data);
          setdata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('AttendancePtm Error => ' + error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getapiData();
    getclassData();
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
          console.log(result.data);
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
      formData.append('class_id', item.value);
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

  const AddNotice = async () => {
    setLoading(true);
    try {
      let uri;
      if (image == '') {
        uri = '';
      } else {
        uri = image.path;
        var fileType = uri.substring(uri.lastIndexOf('.') + 1);
      }
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('role_id', roleid);
      formData.append('class_id', stream);
      formData.append('section_id', section);
      formData.append('subject_id', subject);
      formData.append('title', title);
      formData.append('notice', desc);
      // formData.append('date', subject);
      if (image == '') {
        formData.append('image', null);
      } else {
        formData.append('image', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }
      // console.log('Send Data ==>', formData);
      let resp = await fetch(`${Url.add_notice}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response;
        })
        .then(result => {
          console.log(result.status);
          if (result.status == 200) {
            alert('Successful');
            props.navigation.navigate('Announcement');
            setLoading(false);
          } else {
            alert('Retry');
          }
        });
    } catch (error) {
      console.log('AttendancePtm Error => ' + error);
      setLoading(false);
    }
  };

  const SelectImage = () => {
    ImagePicker.openPicker({
      width: 250,
      height: 250,
      cropping: true,
    }).then(image => {
      // console.log(image);
      setImage(image);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getclassData();
  }, []);
  //   const {schoolid} = useSelector(state => state.userReducer);
  //   const [loading, setLoading] = useState(false);
  //   const [refreshing, setRefreshing] = React.useState(false);
  //   const [getdata, setdata] = useState([]);
  //   const [showModal, setShowModal] = useState(false);
  const [announcementData, setAnnouncementData] = useState(null);

  let deviceHeight = Dimensions.get('window').height;
  let deviceWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
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
          <Text style={[paraGray.largebold, {fontSize: 16, color: 'black'}]}>
            Announcement
          </Text>
        </View>
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('CreateAnnouncement');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Create</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('HistoryAnnouncement');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>History</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity> */}
      {/* <View style={styles.divline} /> */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        <ScrollView
          style={{width: '90%', alignSelf: 'center', marginTop: 25}}
          showsVerticalScrollIndicator={false}>
          <ListItem.Accordion
            containerStyle={{
              backgroundColor: '#EEF2FD',
              borderWidth: 0.4,
              borderColor: '#275CE0',
              //height: 80,
              paddingVertical: 20,
              borderRadius: 16,
              marginBottom: 25,
            }}
            content={
              <ListItem.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Ionicons
                      name="checkmark-circle"
                      size={36}
                      color={'#275CE0'}
                    />
                    <View style={{marginLeft: 20}}>
                      <Text style={[paraGray.parahome, {fontSize: 16}]}>
                        Create
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {fontSize: 11, marginTop: 5, fontStyle: 'italic'},
                        ]}>
                        Class and subject wise attendance
                      </Text>
                    </View>
                  </View>
                </View>
              </ListItem.Content>
            }
            icon={
              <View
                style={{
                  backgroundColor: 'rgba(39, 92, 224, 0.15)',
                  borderRadius: 50,
                  alignItems: 'center',
                  alignSelf: 'center',
                  // width: 32,
                  // height: 32,
                  padding: 3,
                }}>
                <Ionicons name="chevron-down" size={20} color={'black'} />
              </View>
            }
            isExpanded={expandedTakeAttendace}
            onPress={() => {
              setExpandedTakeAttendace(!expandedTakeAttendace);
            }}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <ListItem.Content style={{flex: 1}}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{width: '100%'}}>
                  <View>
                    <View>
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
                        onPress={SelectImage}>
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
                        marginBottom: 0,
                        marginTop: 10,
                      }}>
                      {/* {image.map((image, index) => ( */}
                      {image != '' && (
                        <TouchableOpacity
                          // key={index}
                          style={{marginHorizontal: 15, marginLeft: 20}}
                          // onPress={() => removeItem(index)}
                          onPress={() => setImage('')}>
                          <AntDesign
                            style={{alignSelf: 'flex-end', marginRight: 0}}
                            name="closecircleo"
                            size={16}
                            color={COLORS.black}
                          />
                          <Image
                            style={{
                              flexDirection: 'row',
                              height: 100,
                              width: 100,
                            }}
                            source={{uri: image.path}}
                          />
                        </TouchableOpacity>
                      )}

                      {/* ))} */}
                    </View>
                    <View style={{marginTop: 15}}>
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
                        open={open}
                        setOpen={setOpen}
                        value={stream}
                        items={getdata.map(item => ({
                          label: item.class_name,
                          value: item.class_id,
                        }))}
                        placeholder="Select Stream"
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
                      placeholder="Select Section"
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
                      value={subject}
                      items={getsubjectdata.map(item => ({
                        label: item.name,
                        value: item.id,
                        // subject: item.subject_id,
                      }))}
                      placeholder="Select subject"
                      onSelectItem={item => {
                        setSelectedSubject(item);
                        setsubject(item.value);
                        setIssubjectFocus(false);
                        // setsubjectId(item.subject);
                      }}
                    />
                  </View>
                  <View>
                    <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                      Title:
                    </Text>
                    {/* <View style={styles.txtbox}>
                    <TextInput
                      placeholder="ENTER TITLE"
                      placeholderTextColor="#808080"
                      value={title}
                      onChangeText={value => setTitle(value)}
                      style={{
                        marginLeft: 0,
                        backgroundColor: '#FFFFFF',
                        width: '90%',
                        height: 40,
                        fontSize: 12,
                        fontFamily: 'Montserrat-Regular',
                      }}
                    />
                  </View> */}
                    <FieldInputs
                      styles={{marginTop: 0}}
                      placeholder="ENTER TITLE"
                      value={title}
                      onChangeText={value => setTitle(value)}
                    />
                  </View>
                  <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                    Add Message:
                  </Text>
                  <AutoGrowingTextInput
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: COLORS.primary,
                      borderWidth: 0.6,
                      borderRadius: 12,
                      height: 100,
                    }}
                    placeholder={'  Add Message'}
                    value={desc}
                    onChangeText={value => setDesc(value)}
                  />

                  {/* <View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#000000',
                      width: '80%',
                      height: 50,
                      borderColor: '#000000',
                      alignSelf: 'center',
                      borderWidth: 2,
                      marginTop: 30,
                      borderRadius: 15,
                      justifyContent: 'center',
                      marginBottom: 30,
                    }}
                    onPress={AddNotice}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View> */}
                </ScrollView>

                <TouchableOpacity style={{width: '100%'}} onPress={AddNotice}>
                  <Button
                    title="Submit "
                    styles={{
                      width: '100%',

                      paddingVertical: 15,
                    }}
                  />
                </TouchableOpacity>
              </ListItem.Content>
            </ScrollView>
          </ListItem.Accordion>
        </ScrollView>
        <View style={styles.arrow}>
          <Text style={paraGray.largebold}>History</Text>
          {/* <FontAwesome name="angle-right" size={25} color="#000000" /> */}
        </View>
        <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              numColumns={2} // Number of columns for the wrap effect
              contentContainerStyle={{
                width: '100%',
                //paddingHorizontal: 15, // Adjust horizontal padding for spacing
                paddingBottom: 20,
              }}
              data={getdata}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item: notice, index}) => (
                <View
                  style={{
                    marginVertical: 10,

                    //flex: 1,
                  }}
                  key={index}>
                  <View
                    style={{
                      // flex: 1,
                      //paddingHorizontal: 5,
                      paddingRight: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        height: deviceHeight / 4.8,
                        //height: 170,
                        width: deviceWidth / 2.3,
                        // width: '50%',
                        //width: 190,
                        // width: '100%',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: COLORS.skypurple,
                        //backgroundColor: 'EEF2FD',
                        backgroundColor: COLORS.skypurple,
                        justifyContent: 'center',
                      }}
                      //   onPress={() =>
                      //     props.navigation.navigate('HistoryDetailAnn', {
                      //       notice: getdata[index],
                      //     })
                      //   }
                      onPress={() => {
                        setAnnouncementData(getdata[index]);
                        setShowModal(true);
                      }}>
                      <View
                        style={{
                          flex: 1,
                          // marginTop: 20,
                          //marginBottom: 10,
                          justifyContent: 'center',
                        }}>
                        {notice.image == null ? (
                          <Image
                            style={{
                              // borderWidth: 1,
                              height: '100%',
                              width: '100%',
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                              //marginLeft: 10,
                            }}
                            source={require('../../../assets/nullimage.png')}
                          />
                        ) : (
                          <FastImage
                            style={{
                              height: '100%',

                              width: '100%',
                              // marginLeft: 10,
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                            }}
                            source={{
                              uri: Url.notice_IMG + notice.image,
                            }}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                          justifyContent: 'space-between',
                          width: '90%',
                          alignSelf: 'center',
                        }}>
                        <Text style={[paraGray.darkpara, {fontSize: 10}]}>
                          {/* {notice.created_at} */}
                          {Moment(notice.created_at, 'DD MMM').format(
                            'DD-MM-YYYY',
                          )}
                        </Text>
                        {/* <Text style={[paraGray.darkpara, {fontSize: 10}]}>
                              
                              horn icon
                            </Text> */}
                        <Ionicons name="megaphone" size={10} color={'black'} />
                      </View>
                      {/* <Text
  style={[
    paraGray.darkpara,
    {marginLeft: 10, marginTop: 10},
  ]}>
  {notice.title}
</Text> */}
                      {/* <View style={{flex: 1}}>
  <Text
    style={[
      paraGray.darkpara,
      {marginLeft: 10, color: COLORS.active},
    ]}>
    {Moment(notice.created_at).format('d MMM')}
  </Text>
</View> */}
                      <View>
                        <Text
                          style={[
                            paraGray.largebold,
                            {
                              fontSize: 11,
                              width: '90%',
                              alignSelf: 'center',
                              marginTop: 5,
                            },
                          ]}>
                          Announcement Title
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 5,
                          justifyContent: 'space-between',
                          width: '90%',
                          alignSelf: 'center',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}>
                        <Text
                          style={[
                            paraGray.darkpara,
                            {fontSize: 10, alignItems: 'center'},
                          ]}>
                          {/* {notice.created_at} */}
                          <View
                            style={{
                              //borderWidth: 1,
                              width: 6,
                              height: 6,
                              borderRadius: 50,
                              backgroundColor: '#385AB1',
                            }}
                          />{' '}
                          Class- 5th A
                        </Text>
                        <Ionicons name="arrow-forward" size={10} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            {getdata == '' && loading == false && (
              <View
                style={{
                  flex: 1,
                  marginBottom: 80,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginTop: 220,
                }}>
                <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
                  NO Data Found
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>

      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={500}
        animationOut="slideOutDown"
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          //position: 'absolute',
          //bottom: 0,
        }}
        onBackdropPress={() => setShowModal(false)}>
        <View
          style={{
            backgroundColor: 'white',
            height: '60%',
            borderRadius: 12,
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              //width: '100%',
              paddingVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text style={paraGray.largebold}>Announcement</Text>
              <TouchableOpacity onPress={() => setShowModal(() => false)}>
                <Ionicons name="close-sharp" size={30} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            {announcementData && announcementData.class_id ? (
              <View style={{height: '60%', marginTop: 15}}>
                <View style={{}}>
                  <Image
                    source={{uri: Url.notice_IMG + announcementData.image}}
                    style={{width: '100%', height: '100%', borderRadius: 12}}
                    resizeMode="stretch"
                  />
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.primary,
                    marginTop: 15,
                  }}
                />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[paraGray.darkpara, {fontSize: 14}]}>
                      {/* {notice.created_at} */}
                      {Moment(announcementData.created_at, 'DD MMM').format(
                        'DD-MM-YYYY',
                      )}
                    </Text>
                    {/* <Text style={[paraGray.darkpara, {fontSize: 14}]}>
         
                      horn icon
                    </Text> */}
                    <Ionicons
                      name="megaphone"
                      size={16}
                      color={COLORS.primary}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <View>
                      <Text
                        style={[
                          paraGray.largebold,
                          {
                            fontSize: 14,

                            alignSelf: 'center',
                            marginTop: 5,
                          },
                        ]}>
                        Announcement Title
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={[paraGray.darkpara, {fontSize: 12}]}>
                        {/* {notice.created_at} */}
                        Class- 5th
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {marginLeft: 5, fontSize: 12},
                        ]}>
                        {/* {notice.created_at} */}
                        Section- A
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{marginTop: 20}}>
                  <Text style={[paraGray.largebold, {fontSize: 12}]}>
                    This is the announcement message to be given to the students
                    that today’s 4th period is being a free period.
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Announcement;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  arrow: {
    paddingHorizontal: '6%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    // flexDirection: 'row',
    // textAlign: 'center',
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
  },
  content: {
    alignSelf: 'center',
    width: '80%',

    backgroundColor: '#D3D3D3',
    padding: 10,
  },

  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
  },
});
