import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Url from '../../Config/Api/Url';
import {COLORS} from '../../theme/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {paraGray} from '../../theme/styles/Base';
import {Dropdown} from 'react-native-element-dropdown';

const CollectionDetail = props => {
  const {userid, schoolid} = useSelector(state => state.userReducer);
  const {student} = props.route.params;
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [currentdate, setcurrentDate] = useState(null);
  const [show, setshow] = useState(false);
  const [showsettle, setShowsettle] = useState(false);
  const [amount, setamount] = useState(false);
  const [paymentmode, setPaymentmode] = useState(false);
  const [ismodeFocus, setIsmodeFocus] = useState(false);
  const [penaltypaid, setPenaltypaid] = useState(false);
  const [items, setItems] = useState([
    {label: 'Online', value: 'Online'},
    {label: 'Offline', value: 'Offline'},
  ]);

  useEffect(() => {
    CurrentDate();
  }, []);

  const CurrentDate = () => {
    var today = new Date();
    let date =
      today.getDate() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getFullYear();
    setcurrentDate(date);
  };

  const Collected = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('library_member_id', student.library_member_id);
      formData.append('is_returned', '1');
      formData.append('issueid', student.issueid);
      formData.append('return_date', currentdate);
      console.log('formData ===>', formData);
      let resp = await fetch(`${Url.update_book_status}`, {
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
          if (result.status == true) {
            alert('Book Collected Successfully');
            props.navigation.navigate('Collection');
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('Student List Error => ' + error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          //height: 30,
          justifyContent: 'center',
          paddingHorizontal: 15,
          paddingBottom: 4,
          borderBottomWidth: 1,
          borderColor: COLORS.primary,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0,
          }}>
          <Text
            style={[paraGray.largebold, {textAlign: 'center', marginTop: 16}]}>
            Collection
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={{marginTop: 25}}>
          {/* <Text style={styles.txt}>Student Info</Text> */}
          <View
            style={{
              flex: 1,

              marginRight: 20,
              alignItems: 'center',
            }}>
            {student.photo == null ? (
              <ImageBackground
                style={{
                  backgroundColor: COLORS.black,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 75,
                  height: 75,
                  borderRadius: 30,
                }}>
                <FontAwesome5 name="user-alt" size={25} color="#FFFFFF" />
              </ImageBackground>
            ) : (
              <Avatar.Image
                size={75}
                source={{uri: Url.student_IMG + student.photo}}
                backgroundColor={COLORS.black}
                style={{marginBottom: 10}}
              />
            )}
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.primary,
              borderRadius: 12,
              width: '85%',
              //height: 242,
              alignSelf: 'center',
              justifyContent: 'center',
              paddingVertical: 5,
              // paddingHorizontal: 10,
            }}>
            <View>
              <View style={[styles.mainViewContainer]}>
                <View
                  style={{
                    width: '45%',
                  }}>
                  <View style={[styles.mainView, {marginTop: 12}]}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 15, color: COLORS.txtGray},
                      ]}>
                      Stream :
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {student.class_name}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.mainView]}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 15, color: COLORS.txtGray},
                      ]}>
                      {/* {Taken Book Stream} */}
                      Book Stream :
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {student.class_name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.mainView}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 15, color: COLORS.txtGray},
                      ]}>
                      Degree
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {student.class_name}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.mainView]}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 15, color: COLORS.txtGray},
                      ]}>
                      ISBN No
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {student.class_name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.mainView}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 15, color: COLORS.txtGray},
                      ]}>
                      Book Code :
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {student.class_name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.mainView}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 15, color: COLORS.txtGray},
                      ]}>
                      Book Edition :
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {student.class_name}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    //alignSelf: 'flex-start',
                    width: '45%',
                  }}>
                  <View style={[styles.mainView, {marginTop: 12}]}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 15, color: COLORS.txtGray},
                      ]}>
                      Book Assigned :
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {student.class_name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.mainView}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 15, color: COLORS.txtGray},
                      ]}>
                      Publisher
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {student.class_name}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.mainView}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 15, color: COLORS.txtGray},
                      ]}>
                      Aadhaar No.
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {student.class_name}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.mainView]}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 15, color: COLORS.txtGray},
                      ]}>
                      Taken :
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {student.class_name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.mainView}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 15, color: COLORS.txtGray},
                      ]}>
                      Return Date :
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {student.class_name}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.mainView}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 15, color: COLORS.txtGray},
                      ]}>
                      Late Submission :
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {student.class_name}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[styles.mainView, {width: '90%', alignSelf: 'center'}]}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {fontSize: 15, color: COLORS.txtGray},
                  ]}>
                  Penalty :
                </Text>
                <View style={styles.inputTextView}>
                  <Text style={[paraGray.darkpara, styles.userText]}>
                    {student.penaltyamount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* <Text style={styles.txt}>
            Stream :<Text style={styles.datatxt}> {student.class_name}</Text>
          </Text>
          <Text style={styles.txt}>
            Taken Book Stream :
            <Text style={styles.datatxt}> {student.class_name}</Text>
          </Text>
          <Text style={styles.txt}>
            Degree :<Text style={styles.datatxt}> {student.class_name}</Text>
          </Text>
          <Text style={styles.txt}>
            Book Assigned :
            <Text style={styles.datatxt}> {student.class_name}</Text>
          </Text>
          <Text style={styles.txt}>
            Publisher :<Text style={styles.datatxt}> {student.class_name}</Text>
          </Text>
          <Text style={styles.txt}>
            Author :<Text style={styles.datatxt}> {student.class_name}</Text>
          </Text>
          <Text style={styles.txt}>
            ISBN No :<Text style={styles.datatxt}> {student.class_name}</Text>
          </Text>
          <Text style={styles.txt}>
            Book Code :<Text style={styles.datatxt}> {student.class_name}</Text>
          </Text>
          <Text style={styles.txt}>
            Book Edition :
            <Text style={styles.datatxt}> {student.class_name}</Text>
          </Text>
          <Text style={styles.txt}>
            Taken :<Text style={styles.datatxt}> {student.issuedate}</Text>
          </Text>
          <Text style={styles.txt}>
            Return Date :
            <Text style={styles.datatxt}> {student.returndate}</Text>
          </Text>
          <Text style={styles.txt}>
            Late Submission :<Text style={styles.datatxt}> {student.day}</Text>
          </Text>
          <Text style={styles.txt}>
            Penalty :
            <Text style={styles.datatxt}> {student.penaltyamount}</Text>
          </Text> */}
          {penaltypaid == true && (
            <View>
              <Text
                style={[
                  styles.txt,
                  {
                    fontSize: 15,
                    fontFamily: 'Montserrat-SemiBold',
                    color: COLORS.green,
                  },
                ]}>
                Paid Through :
                <Text
                  style={[
                    styles.datatxt,
                    {
                      fontSize: 15,
                      fontFamily: 'Montserrat-SemiBold',
                      color: COLORS.green,
                    },
                  ]}>
                  {' '}
                  {student.payment_through}
                </Text>
              </Text>
              <Text
                style={[
                  styles.txt,
                  {
                    fontSize: 15,
                    fontFamily: 'Montserrat-SemiBold',
                    color: COLORS.green,
                  },
                ]}>
                Transaction No :
                <Text
                  style={[
                    styles.datatxt,
                    {
                      fontSize: 15,
                      fontFamily: 'Montserrat-SemiBold',
                      color: COLORS.green,
                    },
                  ]}>
                  {' '}
                  {student.transno}
                </Text>
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            //flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',

            width: '95%',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 50,
              borderColor: COLORS.section,
              marginRight: 10,
            }}
            onPress={() => Linking.openURL(`tel:${''}`)}>
            <MaterialIcons name="call" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <View>
          {penaltypaid == true ? (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.lightbackground,
                width: '80%',
                height: 45,
                alignSelf: 'center',
                marginTop: 30,
                marginBottom: 20,
                borderRadius: 30,
                justifyContent: 'center',
              }}
              onPress={() => props.navigation.navigate('Library')}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Paid
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                width: '80%',
                height: 45,
                alignSelf: 'center',
                marginTop: 30,
                marginBottom: 20,
                borderRadius: 30,
                justifyContent: 'center',
              }}
              onPress={() => setshow(true)}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Pay Penalty
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {show == true && (
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.red,
                width: '80%',
                height: 45,
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 20,
                borderRadius: 30,
                justifyContent: 'center',
              }}
              onPress={() => {}}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Forgive
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#0BAC00',
                width: '80%',
                height: 45,
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 20,
                borderRadius: 30,
                justifyContent: 'center',
              }}
              onPress={() => setShowsettle(true)}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Settlement
              </Text>
            </TouchableOpacity>
            {showsettle == true && (
              <View style={{paddingHorizontal: 15}}>
                <View style={{marginTop: 10}}>
                  <Text
                    style={[
                      paraGray.parahome,
                      {fontSize: 12, marginBottom: 5},
                    ]}>
                    Enter Amount :
                  </Text>
                  <TextInput
                    placeholder="ENTER AMOUNT HERE TO BE UPDATED...."
                    placeholderTextColor="#808080"
                    value={amount}
                    onChangeText={value => setamount(value)}
                    style={{
                      height: 40,
                      fontSize: 12,
                      borderWidth: 1,
                      borderColor: COLORS.lightbackground,
                      fontFamily: 'Montserrat-Regular',
                    }}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text
                    style={[
                      paraGray.parahome,
                      {fontSize: 12, marginBottom: 5},
                    ]}>
                    Mode Of Payment(Online or Offline):
                  </Text>
                  <Dropdown
                    style={{
                      height: 50,
                      borderColor: ismodeFocus ? 'blue' : 'gray',
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
                    data={items.map(item => ({
                      label: item.label,
                      value: item.value,
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
                    placeholder={!ismodeFocus ? 'Select Mode' : '...'}
                    searchPlaceholder="Search..."
                    value={paymentmode}
                    onFocus={() => setIsmodeFocus(true)}
                    onBlur={() => setIsmodeFocus(false)}
                    onChange={item => {
                      setPaymentmode(item.value);
                      setIsmodeFocus(false);
                      // setsubjectId(item.subject);
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: COLORS.primary,
                      width: '95%',
                      height: 45,
                      alignSelf: 'center',
                      marginTop: 20,
                      marginBottom: 20,
                      justifyContent: 'center',
                    }}
                    onPress={() => Collected()}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      Collected
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CollectionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  txt: {
    marginTop: 10,
    paddingHorizontal: 20,
    color: '#000000',
    fontSize: 12,
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
    fontFamily: 'Montserrat-Regular',
  },
  datatxt: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  mainViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    //marginVertical: 5,
  },
  mainView: {
    alignSelf: 'center',
    marginTop: 12,
    width: 140,
    heigth: 60,
    backgroundColor: 'white',
  },
});
