import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header } from '../../Components/Header';
import { COLORS } from '../../theme/Colors';
import { container, paraGray } from '../../theme/styles/Base';
import { Checkbox } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Url from '../../Config/Api/Url';
import Spinner from 'react-native-loading-spinner-overlay';

const EditEducation = props => {
  const { data } = props.route.params;
  const [school, setSchool] = useState(data.school_name);
  const [degree, setDegree] = useState(data.degree);
  const [field, setField] = useState(data.field_of_study);
  const [grade, setGrade] = useState(data.grade);
  const [activity, setActivity] = useState(data.activities_and_societies);
  const [checked, setChecked] = React.useState(data.end_date == "" || data.end_date == null ? true : false);
  const { roleid, schoolid, teacherid } = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  // --------Date-time Picker----------
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [startdate, setStartDate] = useState(data.start_date);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getFullYear();
    setStartDate(fDate);
    console.log(fDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // --------Date-time Picker----------
  const [dates, setDates] = useState(new Date());
  const [modes, setModes] = useState('date');
  const [shows, setShows] = useState(false);
  const [enddate, setEndDate] = useState(data.end_date);

  const onChanges = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShows(Platform.OS === 'ios');
    setDates(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getFullYear();
    setEndDate(fDate);
    console.log(fDate);
  };

  const showModes = currentMode => {
    setShows(true);
    setModes(currentMode);
  };

  const showDatepickers = () => {
    showModes('date');
  };

  const editeducation = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      formData.append('education_id', data.id);
      formData.append('school_name', school);
      formData.append('degree', degree);
      formData.append('field_of_study', field);
      formData.append('start_date', startdate);
      checked == false && formData.append('end_date', enddate);
      formData.append('grade', grade);
      formData.append('activities_and_societies', activity);
      // console.log('send data==>', JSON.stringify(formData));
      let resp = await fetch(`${Url.editTeacherEducationById}`, {
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
          // console.log("Add Education Resp===> " + result);
          if (result.status == true) {
            props.navigation.goBack();
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('Add Education Error => ' + error);
      setLoading(false);
    }
  };
  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
      <View
        style={{
          paddingHorizontal: 10,
          backgroundColor: COLORS.black,
        }}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName="Add Education"
          marginLeft
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 30, paddingHorizontal: 10 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, marginTop: 20 }}>
            <Text style={[paraGray.darkpara]}>School</Text>
            <TextInput
              placeholder="School"
              placeholderTextColor="#808080"
              style={[
                paraGray.darkpara,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.background,
                  fontSize: 12,
                },
              ]}
              value={school}
              onChangeText={value => setSchool(value)}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              color={COLORS.bluee}
            />
            <Text style={[paraGray.darkpara, { color: COLORS.bluee }]}>
              Currently Studying
            </Text>
          </View>
          <View style={{ flex: 1, marginTop: 10 }}>
            <Text style={[paraGray.darkpara]}>Degree</Text>
            <TextInput
              placeholder="Degree"
              placeholderTextColor="#808080"
              style={[
                paraGray.darkpara,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.background,
                  fontSize: 12,
                },
              ]}
              value={degree}
              onChangeText={value => setDegree(value)}
            />
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            <Text style={[paraGray.darkpara]}>Field of Study</Text>
            <TextInput
              placeholder="Field of Study"
              placeholderTextColor="#808080"
              style={[
                paraGray.darkpara,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.background,
                  fontSize: 12,
                },
              ]}
              value={field}
              onChangeText={value => setField(value)}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 1, marginTop: 20, marginRight: 10 }}>
              <Text style={[paraGray.darkpara]}>Start date :</Text>
              <TouchableOpacity onPress={() => showDatepicker()}>
                <TextInput
                  placeholder="Start date"
                  placeholderTextColor="#808080"
                  style={[
                    paraGray.darkpara,
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.background,
                      fontSize: 12,
                    },
                  ]}
                  editable={false}
                  value={startdate}
                  onChangeText={value => setStartDate(value)}
                />
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    maximumDate={new Date()}
                  />
                )}
              </TouchableOpacity>
            </View>
            {checked == false &&
              <View style={{ flex: 1, marginTop: 20, marginLeft: 10 }}>
                <Text style={[paraGray.darkpara]}>End date :</Text>
                <TouchableOpacity onPress={() => showDatepickers()}>
                  <TextInput
                    placeholder="End date"
                    placeholderTextColor="#808080"
                    style={[
                      paraGray.darkpara,
                      {
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.background,
                        fontSize: 12,
                      },
                    ]}
                    value={enddate}
                    editable={false}
                    onChangeText={value => setEndDate(value)}
                  />
                  {shows && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={dates}
                      mode={modes}
                      is24Hour={true}
                      display="default"
                      onChange={onChanges}
                      maximumDate={new Date()}
                    />
                  )}
                </TouchableOpacity>
              </View>}
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            <Text style={[paraGray.darkpara]}>Grade (Optional)</Text>
            <TextInput
              placeholder="Grade"
              placeholderTextColor="#808080"
              style={[
                paraGray.darkpara,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.background,
                  fontSize: 12,
                },
              ]}
              value={grade}
              onChangeText={value => setGrade(value)}
            />
          </View>

          <View style={{ flex: 1, marginTop: 20 }}>
            <Text style={[paraGray.darkpara]}>Activities and societies</Text>
            <TextInput
              placeholder="Activities and societies"
              placeholderTextColor="#808080"
              style={[
                paraGray.darkpara,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.background,
                  fontSize: 12,
                },
              ]}
              value={activity}
              onChangeText={value => setActivity(value)}
            />
          </View>
          <View style={{ flex: 1, marginTop: 30 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 50,
                marginHorizontal: 20,
                borderRadius: 10,
                backgroundColor: COLORS.bluee,
                justifyContent: 'center',
                alignItems: 'center',
              }} onPress={() => editeducation()}>
              <Text style={[paraGray.darklarge, { color: COLORS.bg }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditEducation;
