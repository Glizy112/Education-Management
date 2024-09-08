import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {COLORS} from '../../../theme/Colors';
import {container} from '../../../theme/styles/Base';
import {paraGray} from '../../../theme/styles/Base';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import Url from '../../../Config/Api/Url';
import {ApiMethod} from '../../../Config/Api/ApiMethod';
import Spinner from 'react-native-loading-spinner-overlay';
import FieldInputs from '../../../Components/FieldInputs';
import DropDown from '../../../Components/DropDown';
import Ionicons from 'react-native-vector-icons/Ionicons';
const AddNewBook = props => {
  const {teacherid, schoolid, userid} = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [bookname, setBookname] = useState();
  const [stream, setStream] = useState();
  const [isstreamFocus, setIsstreamFocus] = useState(false);
  const [degree, setDegree] = useState();
  const [publisher, setPublisher] = useState();
  const [isbnno, setIbsnNo] = useState();
  const [bookedition, setBookEdtion] = useState();
  const [author, setAuthor] = useState();
  const [bookcode, setBookCode] = useState();
  const [stock, setStock] = useState();
  const [getdata, setdata] = useState([]);
  const [openStream, setOpenStream] = useState(false);
  const [valueStream, setValueStream] = useState('');
  const [ItemsStream, setItemsStream] = useState(null);

  // --------Date-time Picker----------
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    getclassData();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    //For Date Picker
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setText(fDate);
    console.log(fDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const getclassData = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('school_id', schoolid);
    formData.append('teacher_id', teacherid);
    await ApiMethod(Url.get_all_class, formData).then(result => {
      setdata(result.data);
      setLoading(false);
    });
  };

  const addbookapi = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('school_id', schoolid);
    formData.append('book_name', bookname);
    formData.append('class_id', stream);
    formData.append('degree', degree);
    formData.append('publisher', publisher);
    formData.append('publisher', publisher);
    formData.append('isbn_no', isbnno);
    formData.append('edition', bookedition);
    formData.append('author', author);
    formData.append('book_code', bookcode);
    formData.append('stock', stock);
    // console.log("Send Data===> ", JSON.stringify(formData));
    await ApiMethod(Url.addBookByTeacher, formData).then(result => {
      // console.log("Result Response==> ", result);
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
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {loading == true && <Spinner visible={load} />}
      <View style={container.container}>
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
            <Text style={[paraGray.largebold, {fontSize: 20, color: 'black'}]}>
              Add Books
            </Text>
          </View>
        </View>
        <KeyboardAvoidingView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 15, marginTop: 10}}>
            <View style={styles.mainView}>
              <Text
                style={[paraGray.parahome, {fontSize: 14, marginBottom: 5}]}>
                Book Name :
              </Text>
              {/* <TextInput
                placeholder="ENTER Book Name HERE TO BE UPDATED...."
                placeholderTextColor="#808080"
                value={bookname}
                onChangeText={value => setBookname(value)}
                style={{
                  height: 40,
                  fontSize: 12,
                  borderWidth: 1,
                  borderColor: COLORS.lightbackground,
                  fontFamily: 'Montserrat-Regular',
                }}
              /> */}
              <FieldInputs
                styles={{marginTop: 5}}
                value={bookname}
                placeholder="ENTER Book Name HERE TO BE UPDATED...."
                onChangeText={value => setBookname(value)}
              />
            </View>
            <View style={styles.mainView}>
              <Text
                style={[paraGray.parahome, {fontSize: 14, marginBottom: 5}]}>
                Stream :
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
                  setStream(item.value);
                  setIsstreamFocus(false);
                }}
              /> */}
              <DropDown
                open={openStream}
                value={valueStream}
                items={getdata.map(item => ({
                  label: item.class_name,
                  value: item.class_id,
                }))}
                setOpen={setOpenStream}
                setValue={setValueStream}
                setItems={setItemsStream}
                onSelectItem={item => {
                  setStream(item.value);
                  setIsstreamFocus(false);
                }}
              />
            </View>
            <View style={styles.mainView}>
              <Text
                style={[paraGray.parahome, {fontSize: 14, marginBottom: 5}]}>
                Degree :
              </Text>
              {/* <TextInput
                placeholder="ENTER Degree Of The Book HERE"
                placeholderTextColor="#808080"
                value={degree}
                onChangeText={value => setDegree(value)}
                style={{
                  height: 40,
                  fontSize: 12,
                  borderWidth: 1,
                  borderColor: COLORS.lightbackground,
                  fontFamily: 'Montserrat-Regular',
                }}
              /> */}
              <FieldInputs
                styles={{marginTop: 5}}
                value={degree}
                onChangeText={value => setDegree(value)}
                placeholder="ENTER Degree Of The Book HERE"
              />
            </View>
            <View style={styles.mainView}>
              <Text
                style={[paraGray.parahome, {fontSize: 14, marginBottom: 5}]}>
                Publisher :
              </Text>
              {/* <TextInput
                placeholder="ENTER Publisher Name"
                placeholderTextColor="#808080"
                value={publisher}
                onChangeText={value => setPublisher(value)}
                style={{
                  height: 40,
                  fontSize: 12,
                  borderWidth: 1,
                  borderColor: COLORS.lightbackground,
                  fontFamily: 'Montserrat-Regular',
                }}
              /> */}
              <FieldInputs
                styles={{marginTop: 5}}
                value={degree}
                onChangeText={value => setPublisher(value)}
                placeholder="ENTER Publisher Name"
              />
            </View>
            <View style={styles.mainView}>
              <Text
                style={[paraGray.parahome, {fontSize: 14, marginBottom: 5}]}>
                ISBN NO :
              </Text>
              {/* <TextInput
                placeholder="ENTER ISBN NO HERE"
                placeholderTextColor="#808080"
                value={isbnno}
                onChangeText={value => setIbsnNo(value)}
                style={{
                  height: 40,
                  fontSize: 12,
                  borderWidth: 1,
                  borderColor: COLORS.lightbackground,
                  fontFamily: 'Montserrat-Regular',
                }}
              /> */}
              <FieldInputs
                styles={{marginTop: 5}}
                value={isbnno}
                onChangeText={value => setIbsnNo(value)}
                placeholder="ENTER ISBN NO HERE"
              />
            </View>
            <View style={styles.mainView}>
              <Text
                style={[paraGray.parahome, {fontSize: 14, marginBottom: 5}]}>
                Book Edition :
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  height: 50,
                  //borderColor: COLORS.lightbackground,
                  borderColor: '#275CE0',
                  paddingHorizontal: 10,
                  borderWidth: 0.6,
                  borderRadius: 12,
                  marginTop: 5,
                  alignSelf: 'center',
                }}
                onPress={showDatepicker}>
                <TextInput
                  placeholder="Choose Date"
                  placeholderTextColor="#808080"
                  editable={false}
                  style={{
                    marginLeft: 2,
                    backgroundColor: '#FFFFFF',
                    width: '90%',
                    height: 40,
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  {text}
                </TextInput>
                <MaterialCommunityIcons
                  name="calendar-blank-outline"
                  size={26}
                  color="#275CE0"
                  onPress={showDatepicker}
                />

                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.mainView}>
              <Text
                style={[paraGray.parahome, {fontSize: 14, marginBottom: 5}]}>
                Author :
              </Text>
              {/* <TextInput
                placeholder="ENTER Author Name"
                placeholderTextColor="#808080"
                value={author}
                onChangeText={value => setAuthor(value)}
                style={{
                  height: 40,
                  fontSize: 12,
                  borderWidth: 1,
                  borderColor: COLORS.lightbackground,
                  fontFamily: 'Montserrat-Regular',
                }}
              /> */}
              <FieldInputs
                styles={{marginTop: 5}}
                placeholder="ENTER Author Name"
                value={author}
                onChangeText={value => setAuthor(value)}
              />
            </View>
            <View style={styles.mainView}>
              <Text
                style={[paraGray.parahome, {fontSize: 14, marginBottom: 5}]}>
                Book Code :
              </Text>
              {/* <TextInput
                placeholder="ENTER Book Code"
                placeholderTextColor="#808080"
                value={bookcode}
                onChangeText={value => setBookCode(value)}
                style={{
                  height: 40,
                  fontSize: 12,
                  borderWidth: 1,
                  borderColor: COLORS.lightbackground,
                  fontFamily: 'Montserrat-Regular',
                }}
              /> */}
              <FieldInputs
                styles={{marginTop: 5}}
                placeholder="ENTER Book Code"
                value={bookcode}
                onChangeText={value => setBookCode(value)}
              />
            </View>
            <View style={styles.mainView}>
              <Text
                style={[paraGray.parahome, {fontSize: 14, marginBottom: 5}]}>
                Total Stock :
              </Text>
              {/* <TextInput
                placeholder="ENTER Total Stock"
                placeholderTextColor="#808080"
                value={stock}
                onChangeText={value => setStock(value)}
                style={{
                  height: 40,
                  fontSize: 12,
                  borderWidth: 1,
                  borderColor: COLORS.lightbackground,
                  fontFamily: 'Montserrat-Regular',
                }}
              /> */}
              <FieldInputs
                styles={{marginTop: 5}}
                placeholder="ENTER Total Stock"
                value={stock}
                onChangeText={value => setStock(value)}
              />
            </View>
          </View>
        </KeyboardAvoidingView>

        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.primary,
              width: '80%',
              height: 50,
              //borderColor: COLORS.lightbackground,
              alignSelf: 'center',
              marginTop: 20,
              marginBottom: 20,
              borderRadius: 20,
              justifyContent: 'center',
            }}
            onPress={() => addbookapi()}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Add Book
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddNewBook;
const styles = StyleSheet.create({
  mainView: {
    marginTop: 15,
  },
});
