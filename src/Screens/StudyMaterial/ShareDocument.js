import React, {useState, useEffect, useCallback} from 'react';
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
  ImageBackground,
  Image,
  Linking,
  FlatList,
} from 'react-native';
import {List, Modal} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {useFocusEffect} from '@react-navigation/native';

import Document from '../Documents/Document';
const ShareDocument = props => {
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, userimage, schoolid} =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getapiData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getapiData();
    }, []),
  );

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      let resp = await fetch(`${Url.listMaterial}`, {
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
          setData(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Leave List Error => ' + error);
      setLoading(false);
    }
  };

  const handleClick = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert('Invalid Link');
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
          {/* {getdata.map((data, index) => (
            <View
              style={{flex: 1, paddingHorizontal: 10, marginVertical: 10}}
              key={index}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: COLORS.bg,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: COLORS.active,
                  // backgroundColor: COLORS.active,
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => handleClick(Url.material_IMG + data.material)}>
                <View style={{paddingRight: 15}}>
                  <FontAwesome
                    name="file-pdf-o"
                    size={50}
                    color={COLORS.active}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text style={[paraGray.darkpara, {color: COLORS.bluee}]}>
                    {data.title}
                  </Text>
                  <Text style={[paraGray.darkpara, {color: COLORS.section}]}>
                    {data.description}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[paraGray.darkpara, {color: COLORS.section}]}>
                      {data.description} {data.class_name}
                    </Text>
                    <Text style={[paraGray.darkpara, {color: COLORS.active}]}>
                      (Std:{data.class_name})
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))} */}
          <FlatList data={getdata} renderItem={({item}) => <Document />} />
        </View>
        {loading == false && getdata == '' && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 120,
            }}>
            <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
              NO Data Found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ShareDocument;
