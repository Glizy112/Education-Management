import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {paraGray} from '../../theme/styles/Base';
import {COLORS} from '../../theme/Colors';

const Assignment = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('CreateAss');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Create</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('SubmittedAss');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>My Assigment</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('HistoryAss');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>History</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
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
          <Text style={[paraGray.largebold, {color: 'black'}]}>Assigment</Text>
        </View>
      </View>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#275CE0',
            width: '100%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 80,
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}
            onPress={() => props.navigation.navigate('AddNewBook')}>
            <View>
              <Text style={[paraGray.parahome, {fontSize: 14}]}>Create</Text>
              <View style={{marginTop: 5}}>
                <Text tyle={paraGray.darkpara}>
                  View the attendance report for a recent examination
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#275CE0',
            width: '100%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 80,
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}
            onPress={() => props.navigation.navigate('AddNewBook')}>
            <View>
              <Text style={[paraGray.parahome, {fontSize: 14}]}>
                My Assignment
              </Text>
              <View style={{marginTop: 5}}>
                <Text tyle={paraGray.darkpara}>
                  View the attendance report for a recent examination
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#275CE0',
            width: '100%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 80,
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}
            onPress={() => props.navigation.navigate('AddNewBook')}>
            <View>
              <Text style={[paraGray.parahome, {fontSize: 14}]}>History</Text>
              <View style={{marginTop: 5}}>
                <Text tyle={paraGray.darkpara}>
                  View the attendance report for a recent examination
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Assignment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  arrow: {
    paddingHorizontal: '6%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    // flexDirection: 'row',
    // textAlign: 'center',
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',

    fontFamily: 'Montserrat-Regular',
  },
  content: {
    alignSelf: 'center',
    width: '80%',

    backgroundColor: '#D3D3D3',
    padding: 10,
  },

  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
  },
});
