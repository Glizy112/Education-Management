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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Url from '../../Config/Api/Url';
import {Header} from '../../Components/Header';
import {COLORS} from '../../theme/Colors';

const AssignedUserDetail = props => {
  const {student} = props.route.params;

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
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          {student.photo == null ? (
            <ImageBackground
              style={{
                backgroundColor: COLORS.black,
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                borderRadius: 30,
              }}>
              <FontAwesome5 name="user-alt" size={30} color="#FFFFFF" />
            </ImageBackground>
          ) : (
            <Avatar.Image
              size={50}
              source={{uri: Url.student_IMG + student.photo}}
              backgroundColor={COLORS.black}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Student Name :</Text>
          <Text style={styles.datatxt}> {student.name}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Student Number :</Text>
          <Text style={styles.datatxt}> {student.number}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Student Class :</Text>
          <Text style={styles.datatxt}> {student.class}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Book Name :</Text>
          <Text style={styles.datatxt}> {student.bookname}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Book assigned on :</Text>
          <Text style={styles.datatxt}> {student.assigneddate}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Last submission date :</Text>
          <Text style={styles.datatxt}> {student.submissiondate}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>ISBN no :</Text>
          <Text style={styles.datatxt}> {student.ISBNno}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Book Code :</Text>
          <Text style={styles.datatxt}> {student.code}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Stream :</Text>
          <Text style={styles.datatxt}> {student.class}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Degree :</Text>
          <Text style={styles.datatxt}> {student.degree}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Publisher :</Text>
          <Text style={styles.datatxt}> {student.publisher}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Author :</Text>
          <Text style={styles.datatxt}> {student.Author}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Late Submission :</Text>
          <Text style={styles.datatxt}> {student.LateSubmission}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Penalty :</Text>
          <Text style={styles.datatxt}> {student.Penalty}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Book Edition :</Text>
          <Text style={styles.datatxt}> {student.BookEdition}</Text>
        </View>

        <View style={styles.divline} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Submitted on</Text>
          <Text style={styles.datatxt}> {student.Submittedon}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.txt}>Penalty</Text>
          <Text style={styles.datatxt}> {student.Peanalty}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 20,
          }}>
          <Text style={styles.txt}>Collected by</Text>
          <Text style={styles.datatxt}> {student.Collectedby}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AssignedUserDetail;

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
    marginTop: 5,
    fontSize: 14,
    paddingHorizontal: 15,
    color: COLORS.lightblack,
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
    color: COLORS.lblack,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 15,
  },
  divline: {
    alignSelf: 'center',
    marginTop: 20,
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    width: '90%',
  },
});
