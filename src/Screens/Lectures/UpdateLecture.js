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
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

import {paraGray} from '../../theme/styles/Base';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {COLORS} from '../../theme/Colors';
import {
  SelectMultipleButton,
  SelectMultipleGroupButton,
} from 'react-native-selectmultiple-button';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import FieldInputs from '../../Components/FieldInputs';
import DropDown from '../../Components/DropDown';

const UpdateLecture = props => {
  const {lecdetail} = props.route.params;
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const {teacherid, schoolid} = useSelector(state => state.userReducer);
  const [getdata, setdata] = useState([]);
  const [lectitle, setLecTitle] = useState(lecdetail.title);
  const [stream, setStream] = useState(lecdetail.class_name);
  const [subject, setSubject] = useState(lecdetail.subject_name);
  const [lecmode, setLecMode] = useState(lecdetail.class_type);
  const [date, setDate] = useState(lecdetail.class_date);
  const [fromtime, setFromTime] = useState(lecdetail.start_time);
  const [endtime, setEndTime] = useState(lecdetail.end_time);

  // <------------Select Teacher to Divert-------------->
  const [selecteddivert, setSelectedDivert] = useState(null);
  const [isdivertFocus, setIsdivertFocus] = useState(false);
  const [divert, setDivert] = useState(null);
  const [getdivertdata, setdivertdata] = useState([]);

  useEffect(() => {
    getteacherlist();
    console.log(lecdetail);
  }, []);

  const getteacherlist = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('class_id', lecdetail.class_id);

      let resp = await fetch(`${Url.divert_lecture}`, {
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
          setdivertdata(result.data);
          console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('TimeTable getclassData Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // getclassData();
    setRefreshing(false);
  }, []);

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
          <Text style={[paraGray.largebold, {color: 'black'}]}>
            Update Lecture
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        <View style={{width: '90%', alignSelf: 'center'}}>
          <View style={{marginTop: 10}}>
            <Text style={styles.formtxt}>Stream :</Text>
            {/*<View style={styles.txtbox}>
           <TextInput
              placeholder="ENTER Stream"
              placeholderTextColor="#808080"
              value={stream}
              // onChangeText={value => setLecTitle(value)}
              editable={false}
              style={{
                marginLeft: 0,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
              }}
            /> 
          
            </View>*/}
            <FieldInputs
              styles={{marginTop: 20}}
              placeholder="ENTER Stream"
              value={stream}
              onChangeText={value => setLecTitle(value)}
            />
          </View>
          <View>
            <Text style={styles.formtxt}>Subject :</Text>
            {/* <View style={styles.txtbox}>
              <TextInput
                placeholder="ENTER Subject"
                placeholderTextColor="#808080"
                value={subject}
                // onChangeText={value => setLecTitle(value)}
                editable={false}
                style={{
                  marginLeft: 0,
                  backgroundColor: '#FFFFFF',
                  width: '90%',
                  height: 40,
                  fontSize: 13,
                  fontFamily: 'Montserrat-Regular',
                }}
              />
            </View> */}
            <FieldInputs
              styles={{marginTop: 20}}
              placeholder="ENTER Subject"
              value={subject}
              onChangeText={value => setLecTitle(value)}
            />
            <Text style={styles.formtxt}>Lecture Mode :</Text>
            {/* <View style={styles.txtbox}>
              <TextInput
                placeholder="Select Mode"
                placeholderTextColor="#808080"
                value={lecmode}
                onChangeText={value => setLecMode(value)}
                editable={false}
                style={{
                  marginLeft: 0,
                  backgroundColor: '#FFFFFF',
                  width: '90%',
                  height: 40,
                  fontSize: 13,
                  fontFamily: 'Montserrat-Regular',
                }}
              />
            </View> */}
            <FieldInputs
              styles={{marginTop: 20}}
              placeholder="Select Mode"
              value={lecmode}
              onChangeText={value => setLecMode(value)}
            />

            <View style={{marginTop: 20}}>
              <Text style={[paraGray.darkpara]}>Divert My Lecture</Text>
              {/* <Dropdown
                style={{
                  height: 50,
                  borderColor: isdivertFocus ? 'blue' : 'gray',
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
                data={getdivertdata.map(item => ({
                  label: item.teacher_name,
                  value: item.teacher_id,
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
                placeholder={!isdivertFocus ? 'Divert My Lecture' : '...'}
                searchPlaceholder="Search..."
                value={divert}
                onFocus={() => setIsdivertFocus(true)}
                onBlur={() => setIsdivertFocus(false)}
                onChange={item => {
                  setSelectedDivert(item);
                  setDivert(item.value);
                  setIsdivertFocus(false);
                  // setsubjectId(item.subject);
                }}
              /> */}
              <DropDown
                style={{marginTop: 5}}
                open={open}
                value={divert}
                items={getdivertdata.map(item => ({
                  label: item.teacher_name,
                  value: item.teacher_id,
                  // subject: item.subject_id,
                }))}
                setOpen={setOpen}
                setItems={setItems}
                onSelectItem={item => {
                  setSelectedDivert(item);
                  setDivert(item.value);
                  setIsdivertFocus(false);
                  // setsubjectId(item.subject);
                }}
              />
            </View>
            <Text style={styles.formtxt}>Title:</Text>
            {/* <View style={styles.txtbox}>
              <TextInput
                placeholder="ENTER TITLE"
                placeholderTextColor="#808080"
                value={lectitle}
                // onChangeText={value => setLecTitle(value)}
                editable={false}
                style={{
                  marginLeft: 0,
                  backgroundColor: '#FFFFFF',
                  width: '90%',
                  height: 40,
                  fontSize: 13,
                  fontFamily: 'Montserrat-Regular',
                }}
              />
            </View> */}
            <FieldInputs
              styles={{marginTop: 20}}
              placeholder="ENTER TITLE"
              value={lectitle}
              onChangeText={value => setLecTitle(value)}
            />
            {/* <Text style={styles.labeltxt}>Choose Timing</Text> */}
            <Text style={styles.formtxt}>Date</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                width: '100%',
                height: 50,
                //borderColor: '#C4C4C4',
                borderColor: COLORS.primary,
                paddingHorizontal: 0,
                borderWidth: 0.6,
                marginTop: 20,
                borderRadius: 12,
                alignSelf: 'center',
              }}>
              <TextInput
                placeholder="Choose Date"
                placeholderTextColor="#808080"
                value={date}
                editable={false}
                style={{
                  marginLeft: 0,
                  backgroundColor: '#FFFFFF',
                  borderColor: '#C4C4C4',
                  width: '90%',
                  height: 40,
                  fontFamily: 'Montserrat-Regular',
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
                marginBottom: 2,

                marginLeft: 5,
              }}>
              <Text style={[styles.formtxt, {flex: 1}]}>From:</Text>
              <Text style={[styles.formtxt, {flex: 1}]}>To:</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderColor: COLORS.primary,
                  height: 50,
                  //borderColor: '#D3D3D3',
                  borderWidth: 1,
                  marginTop: 15,
                  borderRadius: 12,
                  alignSelf: 'center',
                  marginHorizontal: 5,
                  paddingHorizontal: 3,
                }}>
                <TextInput
                  placeholder="Choose Time"
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
                  {fromtime}
                </TextInput>
                <Feather name="clock" size={26} color={COLORS.primary} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                  height: 50,
                  borderColor: COLORS.primary,
                  //borderColor: '#D3D3D3',
                  paddingHorizontal: 3,
                  borderWidth: 1,
                  marginTop: 15,
                  borderRadius: 12,
                  alignSelf: 'center',
                  marginHorizontal: 5,
                }}>
                <TextInput
                  placeholder="Choose Time"
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
                  {endtime}
                </TextInput>
                <Feather name="clock" size={26} color={COLORS.primary} />
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  //backgroundColor: '#000000',
                  backgroundColor: COLORS.primary,
                  width: '80%',
                  height: 50,
                  borderColor: '#000000',
                  alignSelf: 'center',
                  //borderWidth: 2,
                  marginTop: 30,
                  marginBottom: 30,
                  borderRadius: 15,
                  justifyContent: 'center',
                }}
                onPress={{}}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateLecture;

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
    borderColor: '#D3D3D3',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
  },
  formtxt: {
    marginTop: 20,
    //paddingHorizontal: 20,
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
