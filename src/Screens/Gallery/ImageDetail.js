import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { List, Modal } from 'react-native-paper';
import { COLORS } from '../../theme/Colors';
import { btnStyles, container, paraGray } from '../../theme/styles/Base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Url from '../../Config/Api/Url';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { ImageSlider } from 'react-native-image-slider-banner';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const ImageDetail = props => {
  const { Images } = props.route.params;
  const { schoolid } = useSelector(state => state.userReducer);
  const [showmodal, setShowModal] = useState(false);
  const [desc, setDesc] = useState(Images.caption);
  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [getimg, setImg] = useState([]);
  const UpdateCaption = async () => {
    try {
      setShowModal(false), setLoading(true);
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('id', Images.id);
      formData.append('caption', desc);
      let resp = await fetch(`${Url.updateSchoolGallery}`, {
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
            // console.log(result);
            alert(result.message);
            props.navigation.goBack();
            // console.log('hi' + result.data);
            setLoading(false);
          } else {
            alert('Retry');
          }
        });
    } catch (error) {
      console.log('GalleryDetail Error => ' + error);
      setLoading(false);
    }
  };

  useEffect(() => {
    image();
  }, []);

  const image = () => {
    var list = [];
    var myArray = JSON.parse(Images.image);
    myArray.map((item, i) => {
      var newdata = {
        img: Url.gallery_IMG + item
      };
      list.push(newdata);
    });
    setImg(list);
  }

  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <ImageSlider
            data={getimg}
            caroselImageStyle={
              [
                clcDeviceHeightWidth(3, 1),
                {
                  resizeMode: 'cover',
                },
              ]}
            activeIndicatorStyle={{
              borderRadius: 100,
            }}
            showIndicator={false}
            caroselImageContainerStyle={[clcDeviceHeightWidth(3, 1)]}
            autoPlay={true}
            closeIconColor="#fff"
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginTop: 10,
          }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="clock-time-five-outline"
              size={20}
              color={COLORS.blue}
            />
            <Text
              style={[paraGray.darkpara, { color: COLORS.blue, marginLeft: 10 }]}>
              {Images.created_at}
            </Text>
          </View>
          <TouchableOpacity
            style={{ marginTop: 5 }}
            onPress={() => setShowModal(true)}>
            <ImageBackground
              style={{
                backgroundColor: COLORS.bg,
                justifyContent: 'center',
                alignItems: 'center',
                width: 35,
                height: 35,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: COLORS.background,
              }}>
              <FontAwesome5 name="pen" size={15} color={COLORS.black} />
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text style={[paraGray.darkpara]}>{Images.caption}</Text>
        </View>
      </ScrollView>
      <Modal
        visible={showmodal}
        onDismiss={() => setShowModal(false)}
        contentContainerStyle={{
          width: '75%',
          height: 350,
          backgroundColor: COLORS.bg,
          alignSelf: 'center',
          padding: 15,
          borderRadius: 5,
        }}>
        <AutoGrowingTextInput
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            backgroundColor: '#FFFFFF',
            width: '100%',
            height: 80,
            borderColor: '#D3D3D3',
            alignSelf: 'center',
            borderWidth: 1,
            marginTop: 20,
            borderRadius: 5,
            fontSize: 13,
            fontFamily: 'Montserrat-Regular',
          }}
          value={desc}
          onChangeText={value => setDesc(value)}
          placeholder="Reply"
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={() => UpdateCaption()}>
            <Text
              style={[
                paraGray.whitepara,
                {
                  backgroundColor: COLORS.active,
                  paddingHorizontal: 40,
                  paddingVertical: 5,
                  borderRadius: 10,
                },
              ]}>
              Reply
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default ImageDetail;
