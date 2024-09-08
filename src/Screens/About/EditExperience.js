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
import DateTimePicker from '@react-native-community/datetimepicker';
import Url from '../../Config/Api/Url';
import Spinner from 'react-native-loading-spinner-overlay';

const EditExperience = props => {
  const { data } = props.route.params;
  const [title, setTitle] = useState(data.title);
  const [type, setType] = useState(data.employment_type);
  const [company, setCompany] = useState(data.company_name);
  const [Location, setLocation] = useState(data.location);
  const [internship, setInternship] = useState(data.experience);
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

  const editexperience = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      formData.append('title', title);
      formData.append('experience_id', data.id);
      formData.append('employment_type', type);
      formData.append('company_name', company);
      formData.append('start_date', startdate);
      checked == false && formData.append('end_date', enddate);
      formData.append('location', Location);
      formData.append('experience', internship);
      // console.log('send data==>', JSON.stringify(formData));
      let resp = await fetch(`${Url.editTeacherExperienceById}`, {
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
          // console.log("Add Experience Resp===> " + JSON.stringify(result));
          if (result.status == true) {
            props.navigation.goBack();
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('Add Experience Error => ' + error);
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
          headerFirstName="Add Experience"
          marginLeft
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 30, paddingHorizontal: 10 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, marginTop: 20 }}>
            <Text style={[paraGray.darkpara]}>Title</Text>
            <TextInput
              placeholder="Title"
              placeholderTextColor="#808080"
              style={[
                paraGray.darkpara,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.background,
                  fontSize: 12,
                },
              ]}
              value={title}
              onChangeText={value => setTitle(value)}
            />
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            <Text style={[paraGray.darkpara]}>Employment Type</Text>
            <TextInput
              placeholder="Employment Type"
              placeholderTextColor="#808080"
              style={[
                paraGray.darkpara,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.background,
                  fontSize: 12,
                },
              ]}
              value={type}
              onChangeText={value => setType(value)}
            />
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            <Text style={[paraGray.darkpara]}>Company Name</Text>
            <TextInput
              placeholder="Company Name"
              placeholderTextColor="#808080"
              style={[
                paraGray.darkpara,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.background,
                  fontSize: 12,
                },
              ]}
              value={company}
              onChangeText={value => setCompany(value)}
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
              I currently work in this role
            </Text>
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
            {checked != true && <View style={{ flex: 1, marginTop: 20, marginLeft: 10 }}>
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
            <Text style={[paraGray.darkpara]}>Location</Text>
            <TextInput
              placeholder="Location"
              placeholderTextColor="#808080"
              style={[
                paraGray.darkpara,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.background,
                  fontSize: 12,
                },
              ]}
              value={Location}
              onChangeText={value => setLocation(value)}
            />
          </View>

          <View style={{ flex: 1, marginTop: 10 }}>
            <Text style={[paraGray.darkpara]}>Internship Experience</Text>
            <TextInput
              placeholder="Internship Experience"
              placeholderTextColor="#808080"
              style={[
                paraGray.darkpara,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.background,
                  fontSize: 12,
                },
              ]}
              value={internship}
              onChangeText={value => setInternship(value)}
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
              }}
              onPress={() => editexperience()}>
              <Text style={[paraGray.darklarge, { color: COLORS.bg }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditExperience;
