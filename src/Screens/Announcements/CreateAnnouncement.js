import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { paraGray } from '../../theme/styles/Base';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../theme/Colors';
import Url from '../../Config/Api/Url';
import ImagePicker from 'react-native-image-crop-picker';

const CreateAnnouncement = props => {
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { teacherid, userid, roleid, schoolid } = useSelector(
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
  useEffect(() => {
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
          }else{
            alert('Retry')
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

  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
            <Text style={[paraGray.darkpara, { marginVertical: 10 }]}>
              Stream
            </Text>
            <Dropdown
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
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={[paraGray.darkpara, { marginVertical: 10 }]}>Section</Text>
          <Dropdown
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
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={[paraGray.darkpara, { marginVertical: 10 }]}>Subject</Text>
          <Dropdown
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
          />
        </View>
        <Text style={styles.formtxt}>Title:</Text>
        <View style={styles.txtbox}>
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
        </View>
        <Text style={styles.formtxt}>Add Message:</Text>
        <AutoGrowingTextInput
          style={styles.txtboxDesc}
          placeholder={'Add Message'}
          value={desc}
          onChangeText={value => setDesc(value)}
        />
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
              style={{ marginHorizontal: 15, marginLeft: 20 }}
              // onPress={() => removeItem(index)}
              onPress={() => setImage('')}>
              <AntDesign
                style={{ alignSelf: 'flex-end', marginRight: 0 }}
                name="closecircleo"
                size={16}
                color={COLORS.black}
              />
              <Image
                style={{ flexDirection: 'row', height: 100, width: 100 }}
                source={{ uri: image.path }}
              />
            </TouchableOpacity>
          )}
          {/* ))} */}
        </View>
        <Text style={styles.formtxt}>Add Image/Optional:</Text>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: 'center',
            backgroundColor: COLORS.background,
            marginBottom: 10,
            marginHorizontal: 19,
          }}
          onPress={SelectImage}>
          <AntDesign
            style={{ marginVertical: 5 }}
            name="pluscircle"
            size={30}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <View>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateAnnouncement;

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
});
