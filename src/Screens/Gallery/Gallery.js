import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import { btnStyles, container, paraGray } from '../../theme/styles/Base';
import { useSelector, useDispatch } from 'react-redux';
import Url from '../../Config/Api/Url';
import Spinner from 'react-native-loading-spinner-overlay';
import FastImage from 'react-native-fast-image';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../../Components/Header';
import { COLORS } from '../../theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const Gallery = props => {
  const [getdata, setdata] = useState([]);
  const [imagearray, setImageArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { userinfo, userid, username, showmodal, schoolid, teacherid } =
    useSelector(state => state.userReducer);
  const isCarousel = React.useRef(null)
  useEffect(() => {
    getapiData();
  }, []);

  // --------APICall----------

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      // formData.append('teacher_id', teacherid);
      // console.log("Send Data==> " + schoolid);
      let resp = await fetch(`${Url.list_school_gallery}`, {
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
          // console.log("Gallery Response ==> "+ result.data);
          setdata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('GalleryList Error => ' + error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getapiData();
    }, []),
  );
  clcDeviceHeightWidth = (height, width) => {
    let deviceHeight = Dimensions.get('window').height;
    let deviceWidth = Dimensions.get('window').width;
    if (height && width)
      return {
        height: deviceHeight / height,
        width: deviceWidth / width,
      };
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
      {/* <View style={{paddingLeft: 12}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.black}
          headerFirstName="Gallery"
          //marginLeft
          isGallery
          back
          time
          // onPresss={() =>
          //   props.navigation.navigate('PTMHistory')
          // }
        />
      </View> */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          //height: 30,
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingTop: 8,
          //borderWidth: 1
        }}>
        <TouchableOpacity onPress={()=> props.navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={COLORS.black}/>
        </TouchableOpacity>
        {/* <View style={{justifyContent: 'center', alignItems: 'center', borderWidth: 0}}> */}
        <Text style={[paraGray.largebold, {textAlign: 'center'}]}> Gallery </Text>
        <Text>Text</Text>
        {/* </View> */}
      </View>
      <View style={{paddingTop: 12, borderBottomWidth: 0.6, borderColor: COLORS.primary}}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* <View style={{ flex: 1 }} /> */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginVertical: 20,
            //marginBottom: 20,
            paddingHorizontal: 10
          }}>
          {getdata.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={{ marginTop: 10 }}
              onPress={() =>
                props.navigation.navigate('ImageDetail', {Images: getdata[index]})
              }
            >
              <FastImage
                source={{ uri: Url.gallery_IMG + JSON.parse(image.image)[0] }}
                style={{
                  height: deviceHeight / 3.5,
                  width: deviceWidth / 2.15 - 6,
                  borderRadius: 10,
                  marginLeft: 8,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
        {getdata == '' && loading == false && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 120,
            }}>
            <Text style={[paraGray.darklarge, { textAlign: 'center' }]}>
              No Data Found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default Gallery;
