import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {COLORS} from '../../theme/Colors';
import {paraGray} from '../../theme/styles/Base';
import pdfIcon from '../../../assets/docIcon_pdf.png';
import UserDetails from '../Chats/UserDetails';

import {SafeAreaView} from 'react-native-safe-area-context';

const Document = props => {
  const datas = [
    {id: '1', name: 'Class Doubts-5th A', size: '500kb', stat: 'Unread'},
    {id: '2', name: 'Group Assignment-5th A', size: '50kb', stat: 'Read'},
  ];
  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['name'];
  const [state, setState] = useState({searchTerm: ''});
  const [showPdf, setShowPdf] = useState(false);
  const filterDatas = datas.filter(
    createFilter(state.searchTerm, KEYS_TO_FILTERS),
  );
  const searchUpdated = term => {
    setState({searchTerm: term});
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.search}>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#FFFFFF",
                        width: "100%",
                        height: 50,
                        borderColor: "#D3D3D3",
                        paddingHorizontal: 2,
                        borderWidth: 2,
                        marginTop: 15,
                        borderRadius: 10,
                    }}>

                    <TextInput
                        placeholder="Search by Names./Contact number"
                        placeholderTextColor="#808080"
                        onChangeText={(term) => { searchUpdated(term) }}
                        style={{
                            marginLeft: 0,
                            backgroundColor: "#FFFFFF",
                            width: "90%",
                            height: 40,
                            fontSize: 12,
                            fontFamily: 'Montserrat-Regular'
                        }}
                    />
                    <Feather name="search" size={29} color="#000000" />
                </View>
            </View> */}

      {props.userDetails ? null : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            //height: 30,
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingTop: 8,
            //paddingVertical: 12,
            marginTop: 4,
            //borderWidth: 1
          }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={[paraGray.largebold, {textAlign: 'center'}]}>
            {' '}
            Documents{' '}
          </Text>
          <Text>Text</Text>
          {/* </View> */}
        </View>
      )}
      {props.userDetails ? null : (
        <View
          style={{
            paddingTop: 12,
            borderBottomWidth: 0.6,
            borderColor: COLORS.primary,
          }}
        />
      )}

      <View
        style={
          props.mainViewStyle
            ? [
                {
                  flex: 1,
                  paddingTop: 32,
                  paddingHorizontal: 16,
                  backgroundColor: COLORS.white,
                },
                props.mainViewStyle,
              ]
            : {
                flex: 1,
                paddingTop: 32,
                paddingHorizontal: 16,
                backgroundColor: COLORS.white,
              }
        }>
        {props.userDetails ? null : (
          <Text style={[paraGray.largebold, {fontSize: 16}]}>
            {' '}
            Received Today{' '}
          </Text>
        )}
        <View style={{marginTop: 4}}>
          {filterDatas.map((data, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                Linking.openURL('https://www.orimi.com/pdf-test.pdf');
                //   setShowPdf(true);
                //console.log('Document CLicked');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  //backgroundColor: '#C4C4C440',
                  backgroundColor: COLORS.bgColor,

                  width: '100%',
                  //height: 80,
                  borderRadius: 16,
                  //alignSelf: 'center',
                  marginTop: 12,
                  justifyContent: 'space-between',
                  paddingHorizontal: 16,
                  paddingVertical: 20,
                  //elevation: 2,
                }}>
                {/* <View> */}
                {/* <Text style={{ color: '#000000', fontFamily: 'Montserrat-Regular', }}>gii</Text> */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <AntDesign name="paperclip" color={COLORS.primary} size={24}/> */}
                  {props.userDetails ? (
                    <Image
                      source={require('../../../assets/docxIcon_word.png')}
                      resizeMode="cover"
                      style={{width: 40, height: 40}}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/docIcon_pdf.png')}
                      resizeMode="cover"
                      style={{width: 40, height: 40}}
                    />
                  )}
                  <View style={{paddingLeft: 12}}>
                    <Text style={styles.label}> {data.name}</Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {paddingTop: 8, marginLeft: 2},
                      ]}>
                      {' '}
                      {data.size}{' '}
                    </Text>
                  </View>
                </View>
                {/* </View> */}
                <View style={{alignItems: 'flex-end'}}>
                  <AntDesign
                    name="eye"
                    size={22}
                    color={
                      data.stat === 'Read' ? COLORS.primary : COLORS.txtGray
                    }
                  />
                  <Text
                    style={[
                      paraGray.darkpara,
                      {paddingTop: 4},
                      data.stat === 'Read'
                        ? {color: COLORS.primary}
                        : {color: COLORS.txtGray},
                    ]}>
                    {' '}
                    {data.stat}{' '}
                  </Text>
                  {/* <TouchableOpacity style={{backgroundColor: COLORS.bgColor, borderRadius: 16, padding: 6}}> 
                    <Text style={paraGray.darkpara}> Mark as read </Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Document;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  label: {
    flexDirection: 'row',
    color: 'black', // <-- The magic
    textAlign: 'center', // <-- The magic
    fontSize: 15,
    //paddingHorizontal: '5%',
    fontFamily: 'Montserrat-SemiBold',
  },
  search: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
  },
});
