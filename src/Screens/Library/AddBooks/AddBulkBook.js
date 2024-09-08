import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Linking } from 'react-native';
import { container, paraGray } from '../../../theme/styles/Base';
import DocumentPicker from 'react-native-document-picker';
import { COLORS } from '../../../theme/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import Url from '../../../Config/Api/Url';
import { ApiMethod } from '../../../Config/Api/ApiMethod';
import Spinner from 'react-native-loading-spinner-overlay';

const AddBulkBook = () => {
  const [file, setFile] = useState('');
  const [excelname, setExcelname] = useState();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [stream, setStream] = useState();
  const [isstreamFocus, setIsstreamFocus] = useState(false);
  const [getdata, setdata] = useState([]);
  const [getsampledata, setSampledata] = useState('');
  const { teacherid, schoolid, userid } = useSelector(state => state.userReducer);
  useEffect(() => {
    getclassData();
    getsampleData();
  }, []);

  const getclassData = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('school_id', schoolid);
    formData.append('teacher_id', teacherid);
    await ApiMethod(Url.get_all_class, formData)
      .then(result => {
        // console.log("Class Result Response==> ", result);
        if (result != false) {
          setdata(result.data)
        };
        setLoading(false);
      });
  };
  const getsampleData = async () => {
    setLoading(true);
    const formData = new FormData();
    await ApiMethod(Url.download_sample_excel)
      .then(result => {
        // console.log("Result Response==> ", result);
        if (result != false) {
          setSampledata(result.data);
        }
        setLoading(false);
      });
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.xlsx],
      }).then(res => {
        setFile(res);
        setExcelname(res[0].name);
      });
      // console.log("Selected File ===>",
      //   JSON.stringify(file),
      //   // res.type, // mime type
      //   // res.name,
      //   // res.size,
      // )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const removeItem = index => {
    setFile(file.filter((o, i) => index !== i));
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

  const uploadbooks = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('school_id', schoolid);
    formData.append('class_id', stream);
    formData.append('teacher_id', teacherid);
    formData.append('upload_file', {
      name: file[0].name,
      uri: file[0].uri,
      type: file[0].type,
    });
    console.log("Send Data==> ", JSON.stringify(formData));
    await ApiMethod(Url.addBulkBook, formData)
      .then(result => {
        console.log("Add Bulk Book Response==> ", JSON.stringify(result));
        if (result != false) {
          if (result.status == true) {
            props.navigation.goBack();
            setLoading(false);
          } else {
            alert('Retry');
            setLoading(false);
          }
          // setdata(result.data)
        };
        setLoading(false);
      });
  };

  return (
    <View
      style={[
        container.container,
        { paddingHorizontal: 15, justifyContent: 'center' },
      ]}>
      {loading == true && <Spinner visible={load} />}
      <View style={{ marginBottom: 20 }}>
        <Text
          style={[paraGray.parahome, { fontSize: 12, marginBottom: 5 }]}>
          Stream :
        </Text>
        <Dropdown
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
        />
      </View>
      <Text style={[paraGray.parahome, { fontSize: 12, marginBottom: 5 }]}>
        Upload Excel :
      </Text>
      <TouchableOpacity onPress={() => selectFile()}>
        <TextInput
          placeholder="Select Books Excel"
          placeholderTextColor="#808080"
          editable={false}
          style={{
            height: 40,
            fontSize: 12,
            borderWidth: 1,
            borderColor: COLORS.lightbackground,
            fontFamily: 'Montserrat-Regular',
            color: COLORS.black,
          }}>
          {excelname}
        </TextInput>
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.lightbackground,
            width: '90%',
            height: 45,
            borderColor: COLORS.lightbackground,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 30,
            justifyContent: 'center',
          }}
          onPress={() => {
            if (file != '') {
              uploadbooks()
            } else {
              alert('Please select books excel file')
            }
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Add Books
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.lightbackground,
            width: '65%',
            height: 45,
            borderColor: COLORS.lightbackground,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 30,
            justifyContent: 'center',
          }}
          onPress={() => handleClick(Url.bulkbook + getsampledata)}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontFamily: 'Montserrat-SemiBold',
                marginRight: 3,
              }}>
              Download Sample Excel
            </Text>
            <MaterialCommunityIcons
              name="download"
              size={20}
              color={COLORS.bg}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddBulkBook;
