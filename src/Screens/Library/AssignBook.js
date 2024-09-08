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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Url from '../../Config/Api/Url';
import {Header} from '../../Components/Header';
import {COLORS} from '../../theme/Colors';

const AssignBook = props => {
  const {student} = props.route.params;
  const {stream} = props.route.params;
  const {book} = props.route.params;
  const {currentdate} = props.route.params;
  const {returndate} = props.route.params;

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        props.navigation.navigate('Assign');
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );
  return (
    <ScrollView style={styles.container}>
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          // back
          headerFirstName="Book's Assign"
          marginLeft
        />
      </View>
      <View style={{marginTop: 15}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.txt}>Student Info</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              style={{marginRight: 10}}
              name="delete"
              size={25}
              color={COLORS.red}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 30,
            alignItems: 'flex-end',
            marginTop: 10,
          }}>
          <Text style={styles.txt}>
            Name :<Text style={styles.datatxt}> {student.student_name}</Text>
          </Text>
          {student.photo == null ? (
            <ImageBackground
              style={{
                backgroundColor: COLORS.black,
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
                borderRadius: 30,
              }}>
              <FontAwesome5 name="user-alt" size={20} color="#FFFFFF" />
            </ImageBackground>
          ) : (
            <FastImage
              style={{width: 50, height: 50, borderRadius: 50}}
              source={{uri: Url.student_IMG + student.photo}}
              backgroundColor={COLORS.black}
            />
          )}
        </View>
        <Text style={styles.txt}>
          Stream :<Text style={styles.datatxt}> {stream.label}</Text>
        </Text>
        <Text style={styles.txt}>
          Taken Book Stream :<Text style={styles.datatxt}> {stream.label}</Text>
        </Text>
        <Text style={styles.txt}>
          Degree :<Text style={styles.datatxt}> {stream.degree}</Text>
        </Text>
        <Text style={styles.txt}>
          Book Assigned :<Text style={styles.datatxt}> {book.assign}</Text>
        </Text>
        <Text style={styles.txt}>
          Author :<Text style={styles.datatxt}> {book.author}</Text>
        </Text>
        <Text style={styles.txt}>
          ISBN no :<Text style={styles.datatxt}> {book.isbnNo}</Text>
        </Text>
        <Text style={styles.txt}>
          Book code :<Text style={styles.datatxt}> {book.bookcode}</Text>
        </Text>
        <Text style={styles.txt}>
          Book Edition :<Text style={styles.datatxt}> {book.edition}</Text>
        </Text>
        <Text style={styles.txt}>
          Taken :<Text style={styles.datatxt}> {currentdate}</Text>
        </Text>
        <Text style={styles.txt}>
          Return Date :<Text style={styles.datatxt}> {returndate}</Text>
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#C4C4C4',
            width: '90%',
            height: 45,
            borderColor: '#D3D3D3',
            alignSelf: 'center',
            borderWidth: 0,
            marginTop: 40,
            marginBottom: 20,
            borderRadius: 5,
            justifyContent: 'center',
          }}
          onPress={() => props.navigation.navigate('Library')}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Notify Student
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AssignBook;

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
    marginTop: 10,
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
});
