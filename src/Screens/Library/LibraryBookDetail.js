import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  BackHandler,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Avatar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Url from '../../Config/Api/Url';
import {Header} from '../../Components/Header';
import {COLORS} from '../../theme/Colors';

const LibraryBookDetail = props => {
  const {student} = props.route.params;
  const array = [
    {
      id: 1,
      name: 'Vikas Gupta',
      bookname: 'Book Name',
      class: 'TYBCOM',
      date: '10/10/2021',
      number: '9082111479',
      assigneddate: '8/12/2010',
      submissiondate: '16/12/2010',
      ISBNno: '978-93-86758-51-4',
      code: 'Vikbcom2568',
      degree: 'Semester 2',
      publisher: 'Manan Prakashan',
      Author: 'Michael vaz, Madhu nair, Meeta seta',
      LateSubmission: '4 days',
      Penalty: '40 Rs',
      BookEdition: 'June 2018',
      Submittedon: '20/12/10',
      Peanalty: 'Settlement 50 RS online',
      Collectedby: 'Sheela yadav',
    },
    {
      id: 2,
      name: 'Student Name',
      bookname: 'Book Name',
      class: 'TYBCOM',
      date: '10/10/2021',
      number: '9082111479',
      assigneddate: '8/12/2010',
      submissiondate: '16/12/2010',
      ISBNno: '978-93-86758-51-4',
      code: 'Vikbcom2568',
      degree: 'Semester 2',
      publisher: 'Manan Prakashan',
      Author: 'Michael vaz, Madhu nair, Meeta seta',
      LateSubmission: '4 days',
      Penalty: '40 Rs',
      BookEdition: 'June 2018',
      Submittedon: '20/12/10',
      Peanalty: 'Settlement 50 RS online',
      Collectedby: 'Sheela yadav',
    },
    {
      id: 3,
      name: 'Student Name',
      bookname: 'Book Name',
      class: 'TYBCOM',
      date: '10/10/2021',
      number: '9082111479',
      assigneddate: '8/12/2010',
      submissiondate: '16/12/2010',
      ISBNno: '978-93-86758-51-4',
      code: 'Vikbcom2568',
      degree: 'Semester 2',
      publisher: 'Manan Prakashan',
      Author: 'Michael vaz, Madhu nair, Meeta seta',
      LateSubmission: '4 days',
      Penalty: '40 Rs',
      BookEdition: 'June 2018',
      Submittedon: '20/12/10',
      Peanalty: 'Settlement 50 RS online',
      Collectedby: 'Sheela yadav',
    },
    {
      id: 4,
      name: 'Student Name',
      bookname: 'Book Name',
      class: 'TYBCOM',
      date: '10/10/2021',
      number: '9082111479',
      assigneddate: '8/12/2010',
      submissiondate: '16/12/2010',
      ISBNno: '978-93-86758-51-4',
      code: 'Vikbcom2568',
      degree: 'Semester 2',
      publisher: 'Manan Prakashan',
      Author: 'Michael vaz, Madhu nair, Meeta seta',
      LateSubmission: '4 days',
      Penalty: '40 Rs',
      BookEdition: 'June 2018',
      Submittedon: '20/12/10',
      Peanalty: 'Settlement 50 RS online',
      Collectedby: 'Sheela yadav',
    },
  ];
  // useFocusEffect(
  //   useCallback(() => {
  //     const backAction = () => {
  //       props.navigation.navigate('Assign');
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       backAction,
  //     );

  //     return () => backHandler.remove();
  //   }, []),
  // );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName={student.name}
          marginLeft
        />
      </View>
      <View style={{marginTop: 10}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.txt}>Book Info</Text>
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              borderWidth: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              borderColor: COLORS.section,
            }}>
            <MaterialCommunityIcons
              name="pencil"
              color={COLORS.black}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 20,
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>
            Book Name :<Text style={styles.datatxt}> {student.name}</Text>
          </Text>
        </View>
        <Text style={styles.txt}>
          Stream :<Text style={styles.datatxt}> {student.class}</Text>
        </Text>
        <Text style={styles.txt}>
          Degree :<Text style={styles.datatxt}> {student.degree}</Text>
        </Text>
        <Text style={styles.txt}>
          Publisher :<Text style={styles.datatxt}> {student.pubname}</Text>
        </Text>
        <Text style={styles.txt}>
          Author :<Text style={styles.datatxt}> {student.author}</Text>
        </Text>
        <Text style={styles.txt}>
          ISBN no :<Text style={styles.datatxt}> {student.IsbnNo}</Text>
        </Text>
        <Text style={styles.txt}>
          Book code :<Text style={styles.datatxt}> {student.bookcode}</Text>
        </Text>
        <Text style={styles.txt}>
          Book Edition :<Text style={styles.datatxt}> {student.edition}</Text>
        </Text>
        <Text style={styles.txt}>
          Total Stock :<Text style={styles.datatxt}> {student.stock}</Text>
        </Text>
        <Text style={styles.txt}>
          Books Available :
          <Text style={styles.datatxt}> {student.available}</Text>
        </Text>
      </View>
      <View style={styles.divline} />
      <View>
        <View style={{marginBottom: 20}}>
          {array.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#E5E5E5',
                  width: '90%',
                  height: 70,
                  borderColor: '#E5E5E5',
                  alignSelf: 'center',
                  borderWidth: 2,
                  marginTop: 20,
                  borderRadius: 5,
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  props.navigation.navigate('AssignedUserDetail', {
                    student: array[index],
                  });
                }}>
                <View>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 15,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'Montserrat-Regular',
                      marginTop: 5,
                    }}>
                    {item.bookname}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 15,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {item.class}
                  </Text>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'Montserrat-Regular',
                      marginTop: 5,
                    }}>
                    {item.date}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default LibraryBookDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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

  txt: {
    marginTop: 20,
    fontSize: 13,
    paddingHorizontal: 20,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
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
  formtxt: {
    marginTop: 25,
    paddingHorizontal: 20,
    marginBottom: -10,
    color: '#000000',
  },
  datatxt: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  divline: {
    alignSelf: 'center',
    marginTop: 20,
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    width: '90%',
  },
});
