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
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import {DataTable, Avatar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Url from '../../Config/Api/Url';
import {COLORS} from '../../theme/Colors';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {paraGray, container} from '../../theme/styles/Base';

const FeesDetail = props => {
  const {fees} = props.route.params;
  const [shouldShow, setShouldShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.container}>
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
          <Text style={[paraGray.largebold, {color: 'black'}]}>
            Student Info
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 25,
            borderWidth: 0.6,
            paddingBottom: 10,
            paddingRight: 10,
            borderRadius: 12,
            backgroundColor: COLORS.bgColor,
            borderColor: COLORS.primary,
          }}>
          {/* <Text style={styles.txt}></Text> */}
          <View
            style={{
              //flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              //marginRight: 20,
              alignItems: 'flex-start',
            }}>
            <View>
              <Text style={styles.txt}>
                Name :<Text style={styles.datatxt}> {fees.student_name}</Text>
              </Text>
              <Text style={styles.txt}>
                Stream :<Text style={styles.datatxt}> {fees.class_name}</Text>
              </Text>
              <Text style={styles.txt}>
                TotalFees :<Text style={styles.datatxt}> {fees.tfees}</Text>
              </Text>
              <Text style={styles.txt}>
                Remaining Fees :
                <Text style={styles.datatxt}> {fees.rfees}</Text>
              </Text>
            </View>
            {fees.photo == null ? (
              <ImageBackground
                style={{
                  backgroundColor: COLORS.black,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: 30,
                }}>
                <FontAwesome5 name="user-alt" size={25} color="#FFFFFF" />
              </ImageBackground>
            ) : (
              <FastImage
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  marginTop: 10,
                }}
                source={{uri: Url.student_IMG + fees.photo}}
                backgroundColor={COLORS.black}
              />
            )}
          </View>
        </View>
        <DataTable>
          <DataTable.Header
            style={{marginTop: 30, borderBottomWidth: 0, marginBottom: -10}}>
            <DataTable.Title style={{flex: 1.5, padding: 10}}>
              <Text style={styles.tabletxt}>Transaction</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.tabletxt}>Mode</Text>
            </DataTable.Title>
            <DataTable.Title style={{flex: 1.4}}>
              <Text style={styles.tabletxt}>Amount</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.tabletxt}>Date</Text>
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Row style={{borderBottomWidth: 0}}>
            <DataTable.Cell style={{flex: 1.1, padding: 10}}>
              <Text style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                {fees.firsttrans}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                {fees.firstmode}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{flex: 1}}>
              <Text style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                {fees.firstamount}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                {fees.firstdate}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={{borderBottomWidth: 0}}>
            <DataTable.Cell style={{flex: 1.1, padding: 10}}>
              <Text style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                {fees.secondtrans}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                {fees.secondmode}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                {fees.secondamount}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                {fees.seconddate}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <View>
          <Text
            style={[paraGray.darkpara, {fontSize: 20, textAlign: 'center'}]}>
            No Records
          </Text>
        </View>
        {/* {shouldShow ? (
       
        ) : null} */}
      </ScrollView>
      <View
        style={{
          //height: '100%',
          width: '100%',
          // borderWidth: 1,
          // position: 'absolute',
          //zIndex: 99,
          bottom: 20,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: '#000000',
            backgroundColor: COLORS.primary,
            width: '80%',
            height: 50,
            borderColor: '#000000',
            alignSelf: 'center',
            //borderWidth: 2,
            marginTop: 30,
            borderRadius: 15,
            justifyContent: 'center',
          }}
          onPress={() =>
            //    setShouldShow(!shouldShow)
            setShowModal(() => true)
          }>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Update Fees
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={500}
        animationOut="slideOutDown"
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          //position: 'absolute',
          //bottom: 0,
        }}
        onBackdropPress={() => setShowModal(false)}>
        <View style={{height: '50%', backgroundColor: 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
              width: '90%',
              alignSelf: 'center',
            }}>
            <Text style={paraGray.largebold}>Transaction</Text>
            <TouchableOpacity onPress={() => setShowModal(() => false)}>
              <Ionicons name="close-sharp" size={30} color={COLORS.black} />
            </TouchableOpacity>
          </View>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <View>
              <Text style={[paraGray.darkpara, styles.formtxt]}>
                Enter Amount:
              </Text>
              <View style={styles.txtbox}>
                <TextInput
                  placeholder="Enter Amount Here To Be Updated"
                  placeholderTextColor="#808080"
                  style={{
                    marginLeft: 0,
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    height: 40,
                    fontSize: 12,
                    marginBottom: 5,
                    fontFamily: 'Montserrat-Regular',
                  }}
                />
              </View>

              <Text style={[paraGray.darkpara, styles.formtxt]}>
                Mode of Payment(Online or Offline):
              </Text>
              <View style={styles.txtbox}>
                <TextInput
                  placeholder="Enter Mode Of Payment Here"
                  placeholderTextColor="#808080"
                  style={{
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    height: 40,
                    fontSize: 12,
                    marginBottom: 5,
                    fontFamily: 'Montserrat-Regular',
                  }}
                />
              </View>
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
                    // borderWidth: 2,
                    marginTop: 30,
                    borderRadius: 15,
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  onPress={{}}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 18,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FeesDetail;

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
    paddingHorizontal: 20,
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  txtbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 50,
    //borderColor: '#D3D3D3',
    borderColor: COLORS.primary,
    alignSelf: 'center',
    borderWidth: 0.6,
    marginTop: 15,
    borderRadius: 12,
  },
  formtxt: {
    marginTop: 25,
    //paddingHorizontal: 20,
    marginBottom: -10,
  },
  datatxt: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
  },
  transrow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  tabletxt: {
    // fontWeight: 'bold',
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
});
