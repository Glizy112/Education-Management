import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { container, paraGray } from '../../theme/styles/Base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../theme/Colors';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Url from '../../Config/Api/Url';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-crop-picker';

const AddImage = props => {
  const { userinfo, userid, teacherid, schoolid, userimage } = useSelector(
    state => state.userReducer,
  );
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  // ---------------Image Picker-------------------
  // ----------To Select from gallery-------------------
  const SelectImage = () => {
    let imageList = [];

    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 10,
      mediaType: 'any',
      includeBase64: false,
    })
      .then(response => {
        response.map(image => {
          imageList.push({
            filename: image.filename,
            path: image.path,
            data: image.mime,
          });
        });
        setImage(imageList);
      })
      .catch(e => console.log('galleryerror => ', e.message));
  };
  const removeItem = index => {
    setImage(image.filter((o, i) => index !== i));
  };

  const Create = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('gallery_id', 1);
      formData.append('title', title);
      formData.append('caption', desc);
      for (var i = 0; i < image.length; i++) {
        const photo = image[i];
        formData.append('image[]', {
          name: photo.path,
          type: photo.data,
          uri:
            Platform.OS === 'ios'
              ? photo.path.replace('file://', '')
              : photo.path,
        });
      }
      formData.getAll('image[]');
      // console.log('send data==>', formData);
      let resp = await fetch(`${Url.add_school_gallery}`, {
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
          // console.log("Gallery add Response===> ", result);
          if (result.status == true) {
            alert('Successfull');
            props.navigation.navigate('Home');
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('Add image Error => ' + error);
      alert('Retry');
      setLoading(false);
    }
  };

  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView>
        <View
          style={{
            flex: 1,
            marginTop: 40,
            paddingHorizontal: 15,
            marginBottom: 10,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: 20,
            }}>
            {image.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginHorizontal: 10, marginVertical: 10 }}
                onPress={() => removeItem(index)}
              >
                <AntDesign
                  style={{ alignSelf: 'flex-end', marginRight: -2 }}
                  name="closecircleo"
                  size={18}
                  color={COLORS.red}
                />
                <Image
                  style={{ flexDirection: 'row', height: 80, width: 80 }}
                  source={{ uri: image.path }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 5,
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: 'center',
              backgroundColor: COLORS.background,
              marginBottom: 10,
            }}
            onPress={() => SelectImage()}>
            <AntDesign
              style={{ marginVertical: 5 }}
              name="pluscircle"
              size={30}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 0.5,
            borderBottomColor: COLORS.section,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            paddingHorizontal: 15,
          }}>
          {userimage == null ? (
            <ImageBackground
              style={{
                backgroundColor: COLORS.black,
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
                borderRadius: 20,
              }}>
              <FontAwesome5 name="user-alt" size={20} color="#FFFFFF" />
            </ImageBackground>
          ) : (
            <Avatar.Image
              style={{ marginTop: 6 }}
              size={40}
              source={{ uri: Url.profile_IMG + userimage }}
            />
          )}
          <TextInput
            placeholder="Write Title"
            value={title}
            onChangeText={value => setTitle(value)}
            style={[
              paraGray.darkpara,
              {
                borderBottomColor: COLORS.bottom,
                borderBottomWidth: 1,
                width: '90%',
                marginLeft: 5,
              },
            ]}
          />
        </View>
        <View>
          <AutoGrowingTextInput
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              backgroundColor: '#FFFFFF',
              width: '95%',
              height: 80,
              borderColor: '#D3D3D3',
              alignSelf: 'center',
              borderBottomWidth: 1,
              marginTop: 10,
              borderRadius: 5,
              fontSize: 13,
              fontFamily: 'Montserrat-Regular',
            }}
            placeholder={'Add Description'}
            value={desc}
            onChangeText={value => setDesc(value)}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#000000',
              width: '80%',
              height: 50,
              borderColor: '#000000',
              alignSelf: 'center',
              borderWidth: 2,
              marginTop: 30,
              borderRadius: 15,
              justifyContent: 'center',
              marginBottom: 30,
            }}
            onPress={() => Create()}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 17,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddImage;
