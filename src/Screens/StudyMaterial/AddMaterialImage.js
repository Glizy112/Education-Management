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
import {Dropdown} from 'react-native-element-dropdown';
import {paraGray} from '../../theme/styles/Base';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {COLORS} from '../../theme/Colors';
import ImagePicker from 'react-native-image-crop-picker';
import {ApiMethod} from '../../Config/Api/ApiMethod';
import DropDown from '../../Components/DropDown';

import Ionicons from 'react-native-vector-icons/Ionicons';

const AddMaterialImage = props => {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const {teacherid, userid, schoolid} = useSelector(state => state.userReducer);
  const [getdata, setdata] = useState([]);
  const [image, setImage] = useState([]);
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
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

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

  const SelectImage = () => {
    let imageList = [];
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 10,
      mediaType: 'any',
      includeBase64: false,
    })
      .then(response => {
        if (image.length > 0) {
          setImage(prevImages => [
            ...prevImages,
            ...response.map(imageData => ({
              filename: imageData.filename,
              path: imageData.path,
              data: imageData.mime,
            })),
          ]);
        } else {
          setImage(
            response.map(imageData => ({
              filename: imageData.filename,
              path: imageData.path,
              data: imageData.mime,
            })),
          );
        }
      })
      .catch(e => console.log('galleryerror => ', e.message));

    // ImagePicker.openPicker({
    //   width: 250,
    //   height: 250,
    //   cropping: true,
    // }).then(image => {
    //   // console.log("===>>",image);
    //   // setDp(image.path);
    //   setImage(image);
    // });
    console.log('Image', image);
  };
  const removeItem = index => {
    setImage(image.filter((o, i) => index !== i));
  };
  const AddMaterial = async () => {
    if (image.length > 0) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('school_id', schoolid);
        formData.append('class_id', stream);
        formData.append('subject_id', subject);
        formData.append('title', title);
        formData.append('description', desc);
        formData.append('teacher_id', userid);
        for (var i = 0; i < image.length; i++) {
          const photo = image[i];
          formData.append('image[]', {
            name: photo.path,
            type: photo.data,
            uri:
              Platform.OS === 'ios'
                ? photo.path.replace('file://', '')
                : photo.path,
          });
        }
        formData.getAll('image[]');
        // console.log('Add Material Send Data ==> ' + JSON.stringify(formData));
        await ApiMethod(Url.addstudymaterial, formData).then(result => {
          // console.log("Response Data===> ", result);
          if (result != false) {
            if (result.status == true) {
              props.navigation.goBack();
              setLoading(false);
            } else {
              alert('Retry');
              setLoading(false);
            }
          }
          setLoading(false);
        });
      } catch (error) {
        console.log('Add Material Image Error => ' + error);
        setLoading(false);
      }
    } else {
      alert('Please Add an Image');
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getclassData();
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
          <Text style={[paraGray.largebold, {color: 'black'}]}>Add Images</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              {image.map((imageUrl, index) => (
                <TouchableOpacity
                  key={index}
                  style={{marginHorizontal: 15, marginLeft: 20}}
                  onPress={() => removeItem(index)}>
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
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                    resizeMode="cover"
                    source={{uri: imageUrl.path}}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={{marginTop: 15, paddingHorizontal: 20}}>
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
        <View>
          <View style={{paddingHorizontal: 20}}>
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
                subject: item.subject_id,
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
                subject: item.subject_id,
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
          <View style={{paddingHorizontal: 20}}>
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
              open={openSection}
              setOpen={setOpenSection}
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
              }}
            />
          </View>
          {/* <Text style={styles.formtxt}>ADD Image:</Text>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 15,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 10,
              }}>
              {image.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  style={{marginHorizontal: 10, marginVertical: 10}}
                  onPress={() => removeItem(index)}>
                  <AntDesign
                    style={{alignSelf: 'flex-end', marginRight: -2}}
                    name="closecircleo"
                    size={18}
                    color={COLORS.red}
                  />
                  <Image
                    style={{flexDirection: 'row', height: 80, width: 80}}
                    source={{uri: image.path}}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: 'center',
                backgroundColor: COLORS.background,
                marginBottom: 10,
              }}
              onPress={SelectImage}>
              <AntDesign
                style={{marginVertical: 5}}
                name="pluscircle"
                size={30}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View> */}
          <Text
            style={[
              paraGray.darkpara,
              {marginVertical: 10, width: '90%', alignSelf: 'center'},
            ]}>
            Title:
          </Text>
          <AutoGrowingTextInput
            value={title}
            onChangeText={value => setTitle(value)}
            style={{
              backgroundColor: 'transparent',
              borderColor: COLORS.primary,
              borderWidth: 0.6,
              borderRadius: 12,
              height: 80,
              width: '90%',
              alignSelf: 'center',
            }}
            placeholder={'  ENTER TITLE'}
          />
          <Text
            style={[
              paraGray.darkpara,
              {marginVertical: 10, width: '90%', alignSelf: 'center'},
            ]}>
            ADD Message:
          </Text>
          <AutoGrowingTextInput
            value={desc}
            onChangeText={e => setDesc(e)}
            style={{
              backgroundColor: 'transparent',
              borderColor: COLORS.primary,
              borderWidth: 0.6,
              borderRadius: 12,
              height: 80,
              width: '90%',
              alignSelf: 'center',
            }}
            placeholder={'  ADD MESSAGE'}
          />
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                width: '80%',
                height: 50,
                borderColor: '#000000',
                alignSelf: 'center',
                //borderWidth: 2,
                marginTop: '15%',
                marginBottom: 30,
                bottom: 0,
                borderRadius: 15,
                justifyContent: 'center',
              }}
              onPress={() => {
                AddMaterial();
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

export default AddMaterialImage;

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
    marginTop: 15,
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
