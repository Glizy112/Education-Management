import React, {useState, useEffect, useCallback} from 'react';
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
  PermissionsAndroid,
  Linking,
} from 'react-native';
import {Avatar, Modal} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {btnStyles, container, paraGray} from '../../theme/styles/Base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import DocumentPicker from 'react-native-document-picker';
import {selectContactPhone} from 'react-native-select-contact';
import {GiftedChat} from 'react-native-gifted-chat';
import Search from '../../Components/Search';
import Url from '../../Config/Api/Url';

const ChatDetail = props => {
  const {user} = props.route.params;
  const [sendbutton, setSendButton] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputText, setInputText] = useState('');
  const [visible, setVisible] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [text, setText] = useState('');
  const [emoji, setEmoji] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [showattachment, setShowAttachment] = useState(false);
  const [image, setImage] = useState([]);
  const [file, setFile] = useState([]);
  const [messages, setMessages] = useState([]);
  const SelectImage = () => {
    let imageList = [];
    ImagePicker.openPicker({
      width: 250,
      height: 250,
      cropping: true,
    }).then(image => {
      // console.log("===>>",image);
      // setDp(image.path);
      setImage(image);
      setShowAttachment(false);
    });
  };

  const selectFile = async () => {
    try {
      // <----for single selecton use (pick) for multiple selection use (pickMultiple)---->
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      }).then(res => {
        // console.log("===>>",image);
        // setDp(image.path);
        setFile(res);
        console.log('file', file);
        setShowAttachment(false);
      });
      // console.log("Selected File ===>",
      //   JSON.stringify(file),
      //   // res.type, // mime type
      //   // res.name,
      //   // res.size,
      // )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const requestContactPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Allow Access Contact?',
          message: 'allow this app to read contact information',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('granted');
        getPhoneNumber();
        setShowAttachment(false);
      } else {
        console.log('denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getPhoneNumber = async () => {
    return selectContactPhone().then(selection => {
      if (!selection) {
        return null;
      }

      let {contact, selectedPhone} = selection;
      console.log(
        `Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`,
      );
      return selectedPhone.number;
    });
  };
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        name: 'Ariene Mc Copy',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar:
            'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    //   const messagesWithFiles = messages.map(message => {
    //     if (message.file) {
    //       // Handle file message: Create a message object with the file
    //       return {
    //         _id: 1,
    //         text: 'asdasdas', // You might want to include some text indicating it's a file message
    //         file: message.file, // Store the file object in the message
    //         createdAt: new Date(),
    //         user: {
    //           _id: 2, // Assuming user ID
    //           // Other user information
    //         },
    //       };
    //     } else {
    //       return message;
    //     }
    //   });

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
  //   const onSend = useCallback((messages = []) => {
  //     console.log('chat Messages', messages);
  //     const messagesWithFiles = setMessages(previousMessages =>
  //       GiftedChat.append(previousMessages, messagesWithFiles),
  //     );
  //   }, []);

  const CustomMessageText = ({currentMessage}) => {
    return (
      <View
        style={{
          backgroundColor: COLORS.bgColor,
          borderRadius: 12,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: currentMessage.user.avatar}}
            style={{width: 24, height: 24, borderRadius: 12, marginRight: 5}}
          />
          <View style={{padding: 10, borderRadius: 10}}>
            <Text style={[paraGray.largebold, {fontSize: 14, color: 'black'}]}>
              {currentMessage.name}
            </Text>
          </View>
          <View style={{}}>
            <Text
              style={[
                paraGray.darkpara,
                {fontSize: 11, marginLeft: 5, color: 'gray'},
              ]}>
              {currentMessage.createdAt.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
          <View style={{marginLeft: 5}}>{<MessageChecked />}</View>
        </View>
        <View style={{marginBottom: 5}}>
          <Text style={[paraGray.darkpara, {fontSize: 13, color: 'black'}]}>
            {currentMessage.text}
          </Text>
        </View>
      </View>
    );
  };
  const renderUserMessage = props => {
    return (
      <View
        style={{
          backgroundColor: COLORS.primary,
          borderRadius: 12,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <View>
          <View style={{marginBottom: 5}}>
            <Text style={[paraGray.largebold, {fontSize: 14, color: 'white'}]}>
              {props.currentMessage.text}
            </Text>
          </View>
        </View>
        <View style={{}}>
          <Text
            style={[
              paraGray.darkpara,
              {fontSize: 11, marginLeft: 5, color: 'white'},
            ]}>
            {props.currentMessage.createdAt.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };
  const CustomInputToolbar = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 8,
        }}>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 20,
            paddingHorizontal: 16,
          }}
          placeholder="Type a message... 123123"
          onChangeText={props.onChangeText}
          value={props.text}
          onSubmitEditing={props.onSend}
        />
      </View>
    );
  };
  //   const renderMessageText = props => {
  //     return (
  //       <View
  //         style={{backgroundColor: 'lightblue', padding: 10, borderRadius: 10}}>
  //         <Text style={{color: 'black'}}>{props.currentMessage.text}</Text>
  //       </View>
  //     );
  //   };
  const renderMessageText = props => {
    //return <CustomMessageText {...props} />;
    if (props.currentMessage.user._id === 1) {
      return renderUserMessage(props);
    } else {
      return CustomMessageText(props);
    }
  };
  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onEmojiSelected = emoji => {
    setInputText(prevText => prevText + emoji);
  };

  const renderEmojiPicker = () => {
    return (
      <View style={{flex: 1}}>
        <EmojiSelector onEmojiSelected={onEmojiSelected} />
      </View>
    );
  };
  const MessageChecked = props => {
    if (props.message == 'read') {
      return (
        <Ionicons name="checkmark-done" size={15} color={COLORS.primary} />
      );
    } else if (props.message == 'delivered') {
      return <Ionicons name="checkmark-done" size={15} />;
    } else {
      return <Ionicons name="checkmark" size={15} />;
    }
  };
  const renderInputToolbar = props => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            //justifyContent: 'space-between',

            width: '90%',
            alignSelf: 'center',
            paddingHorizontal: 5,
            //borderWidth: 1,
            height: '100%',
            marginTop: -5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 22,
              borderWidth: 1,
              borderColor: COLORS.bgColor,
              backgroundColor: '#F7F7F9',
              alignSelf: 'center',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity onPress={() => selectFile()}>
              <AntDesign
                name="pluscircle"
                size={20}
                color={COLORS.primary}
                style={{marginHorizontal: 5}}
              />
            </TouchableOpacity>
            {file && file.length > 0 ? (
              <Image
                source={{uri: file[0].uri}}
                style={{width: 30, height: 30}}
              />
            ) : null}
            <TextInput
              style={{
                height: 40,

                paddingHorizontal: 16,

                width: '80%',
              }}
              placeholder="Type a message..."
              onChangeText={value => setInputText(value)}
              value={inputText}
              onSubmitEditing={props.onSend}
            />

            <TouchableOpacity
              onPress={handleEmojiPicker}
              style={{position: 'absolute', zIndex: 10, right: 15}}>
              <FontAwesome5 name="smile" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              marginLeft: 8,
            }}
            onPress={() => {
              if (inputText.trim().length > 0) {
                props.onSend({text: inputText.trim()}, true);
                setInputText('');
              }
            }}>
            <Ionicons name="send" size={20} color={COLORS.primary} />
          </TouchableOpacity>

          {console.log('Value', inputText)}
          {/* <TouchableOpacity onPress={handleEmojiPicker}>
            <Text>Show Emoji Picker</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };
  return (
    <View style={[container.container]}>
      <View
        style={
          {
            //flexDirection: 'row',
            //justifyContent: 'space-between',
            //alignItems: 'center',
            //paddingHorizontal: 10,
          }
        }>
        {openSearch ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity onPress={() => setOpenSearch(() => false)}>
              <AntDesign name="close" size={20} color={COLORS.black} />
            </TouchableOpacity>
            <Search
              getdata={messages}
              filter={setSearchData}
              KEYS_TO_FILTERS={null}
              mainViewStyle={{width: '100%', height: 40, marginBottom: 5}}
              style={{fontSize: 14}}
              iconSize={20}
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              style={{paddingRight: 20}}
              onPress={() => props.navigation.goBack()}>
              <AntDesign name="left" size={18} color={COLORS.black} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() =>
                props.navigation.navigate('UserDetails', {
                  user: user,
                })
              }>
              {user.image != null ? (
                <Avatar.Image
                  size={35}
                  source={require('../../../assets/user.jpg')}
                />
              ) : (
                <Avatar.Image
                  source={{uri: Url.profile_IMG + user.image}}
                  size={35}
                  backgroundColor={COLORS.black}
                />
              )}
              <Entypo
                style={{marginTop: 19, marginLeft: -22}}
                name="dot-single"
                size={42}
                color="#51DD78"
              />
              <Text
                style={[
                  paraGray.darkpara,
                  {fontFamily: 'Poppins-SemiBold', width: '80%'},
                ]}
                numberOfLines={1}>
                {user.name}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              {user.type !== 'group' && (
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.primary,
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}
                  //   onPress={() =>
                  //     props.navigation.navigate('PhoneCall', {
                  //       user: user,
                  //     })
                  //   }
                  onPress={() => Linking.openURL(`tel:${''}`)}>
                  <Ionicons
                    // style={}
                    name="call"
                    size={15}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: '#0BAC00',
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 8,
                }}
                onPress={() => setOpenSearch(() => true)}>
                <Ionicons
                  // style={}
                  name="search"
                  size={18}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  // backgroundColor: 'rgba(45, 140, 255, 0.25)',
                  height: 30,
                  width: 30,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginRight: 5,
                }}
                onPress={showModal}>
                <Entypo
                  // style={}
                  name="dots-three-vertical"
                  size={15}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View
        style={{borderBottomWidth: 1, borderBottomColor: COLORS.background}}
      />
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 10}}> */}
      {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            justifyContent: 'center',
          }}>
          <ImageBackground
            style={{
              //backgroundColor: 'rgba(45, 140, 255, 0.15)',
              backgroundColor: COLORS.white,
              width: '20%',
              borderWidth: 1,
              borderColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}>
            <Text style={paraGray.darkpara}>Today</Text>
          </ImageBackground>
        </View> */}
      {/* 
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderRadius: 60,
            marginTop: 10,
          }}>
          <ImageBackground
            style={{
              backgroundColor: COLORS.bgColor,
              flexDirection: 'row',
              width: '95%',
              borderRadius: 10,
            }}>
            {user.image != null ? (
              <Avatar.Image
                style={{marginTop: 10, marginLeft: 5, marginBottom: 10}}
                size={35}
                source={require('../../../assets/user.jpg')}
              />
            ) : (
              <Avatar.Image
                style={{marginTop: 10, marginLeft: 5, marginBottom: 10}}
                source={{uri: Url.profile_IMG + user.image}}
                size={35}
                backgroundColor={COLORS.black}
              />
            )}
            <Text
              style={[
                paraGray.darkpara,
                {
                  color: '#181818',
                  marginLeft: 10,
                  marginRight: 50,
                  marginTop: 10,
                  marginBottom: 15,
                },
              ]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
            </Text>
          </ImageBackground>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            width: '90%',
            marginTop: -20,
          }}>
          <Text style={[paraGray.darkpara, {color: '#4F4F4F'}]}>
            1 hour ago
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
            borderRadius: 60,
            marginTop: 30,
          }}>
          <ImageBackground
            style={{
              backgroundColor: COLORS.primary,
              flexDirection: 'row-reverse',
              width: '95%',
              borderRadius: 10,
            }}>
            {user.image != null ? (
              <Avatar.Image
                style={{marginTop: 10, marginBottom: 10, marginRight: 5}}
                size={35}
                source={require('../../../assets/user.jpg')}
              />
            ) : (
              <Avatar.Image
                style={{marginTop: 10, marginBottom: 10, marginRight: 5}}
                source={{uri: Url.profile_IMG + user.image}}
                size={35}
                backgroundColor={COLORS.black}
              />
            )}
            <Text
              style={[
                paraGray.darkpara,
                {
                  color: COLORS.bg,
                  marginLeft: 50,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: 15,
                },
              ]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
            </Text>
          </ImageBackground>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            width: '90%',
            marginTop: -20,
          }}>
          <Text style={[paraGray.darkpara, {color: COLORS.bg}]}>
            30 Minutes
          </Text>
        </View> */}
      {/* </ScrollView> */}
      {/* <View style={{height: '80%'}}>
        <EmojiSelector
          category={Categories.symbols}
          onEmojiSelected={emoji => console.log(emoji)}
        />
      </View> */}

      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{
            _id: 1,
          }}
          renderMessageText={renderMessageText}
          renderAvatar={null}
          renderTime={() => {
            return;
          }}
          renderInputToolbar={renderInputToolbar}
          //   text={inputText}
          //   onInputTextChanged={setInputText}
        />
        {showEmojiPicker ? (
          <View style={{height: '40%'}}>
            {showEmojiPicker && renderEmojiPicker()}
          </View>
        ) : null}
      </View>
      {/* <View
        style={{
          height: showattachment == true ? 150 : 90,
          marginTop: 10,
          justifyContent: 'center',
          borderTopWidth: 1,
          borderTopColor: COLORS.background,
        }}>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            paddingHorizontal: 8,
            paddingBottom: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.lightGray,
              flex: 1,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: COLORS.background,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              // onPress={() => setShowEmoji(!showEmoji)}
            >
              <FontAwesome
                style={{marginLeft: 5, marginRight: 5}}
                name="smile-o"
                size={28}
                color={COLORS.active}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowAttachment(!showattachment)}>
              {showattachment == true ? (
                <Entypo
                  style={{marginLeft: 5, marginRight: 5}}
                  name="circle-with-cross"
                  size={25}
                  color={COLORS.active}
                />
              ) : (
                <Entypo
                  style={{marginLeft: 5, marginRight: 5}}
                  name="attachment"
                  size={22}
                  color={COLORS.active}
                />
              )}
            </TouchableOpacity>
            <TextInput
              style={[
                paraGray.darkpara,
                {
                  backgroundColor: COLORS.lightGray,
                  flex: 1,
                  borderRadius: 5,
                },
              ]}
              // value={emoji}
              placeholder="Message..."
              onChangeText={value =>
                value == '' ? setSendButton(false) : setSendButton(true)
              }
            />
          </View>
          {sendbutton === false ? (
            <TouchableOpacity
              style={{
                width: 50,
                marginLeft: 10,
                // backgroundColor: COLORS.bg,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLORS.background,
                borderRadius: 5,
              }}>
              <FontAwesome
                // style={}
                name="microphone"
                size={25}
                color={COLORS.active}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: 50,
                marginLeft: 10,
                // backgroundColor: COLORS.bg,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLORS.background,
                borderRadius: 5,
              }}>
              <Ionicons
                // style={}
                name="ios-send-sharp"
                size={25}
                color={COLORS.active}
              />
            </TouchableOpacity>
          )}
        </View>
        {showattachment == true && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={requestContactPermission}>
                <View
                  style={{
                    width: 45,
                    height: 40,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.lightSkyblue,
                  }}>
                  <MaterialIcons
                    name="contact-page"
                    size={25}
                    color={COLORS.blue}
                  />
                </View>
                <Text
                  style={[
                    paraGray.darkpara,
                    {marginTop: 5, marginBottom: 10, fontSize: 12},
                  ]}>
                  Contact
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={SelectImage}>
                <View
                  style={{
                    width: 45,
                    height: 40,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.lightred,
                  }}>
                  <FontAwesome name="photo" size={25} color={COLORS.red} />
                </View>
                <Text
                  style={[
                    paraGray.darkpara,
                    {marginTop: 5, marginBottom: 10, fontSize: 12},
                  ]}>
                  Image
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={selectFile}>
                <View
                  style={{
                    width: 45,
                    height: 40,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.lightSkygreen,
                  }}>
                  <MaterialIcons
                    name="file-copy"
                    size={25}
                    color={COLORS.green}
                  />
                </View>
                <Text
                  style={[
                    paraGray.darkpara,
                    {marginTop: 5, marginBottom: 10, fontSize: 12},
                  ]}>
                  File
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {}}>
                <View
                  style={{
                    width: 45,
                    height: 40,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.lightSkyyellow,
                  }}>
                  <Entypo name="location-pin" size={28} color={COLORS.yellow} />
                </View>
                <Text
                  style={[
                    paraGray.darkpara,
                    {marginTop: 5, marginBottom: 10, fontSize: 12},
                  ]}>
                  Location
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View> */}

      {showEmoji === true && (
        <ScrollView style={[paraGray.darkpara, {marginBottom: 10}]}>
          <EmojiSelector
            style={[paraGray.darkpara]}
            category={Categories.all}
            columns={8}
            // onEmojiSelected={emoji => setEmoji(emoji, console.log(emoji))}
          />
        </ScrollView>
      )}
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          width: '80%',
          height: 300,
          backgroundColor: 'white',
          alignSelf: 'center',
          padding: 15,
          borderRadius: 5,
        }}>
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
          <Text style={[paraGray.darkpara]}>Mute Chats</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
          <Text style={[paraGray.darkpara]}>Delete Chats</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
          <Text style={[paraGray.darkpara]}>Report</Text>
        </View>
        {user.type == 'group' ? (
          <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
            <Text style={[paraGray.darkpara]}>Exit Group</Text>
          </View>
        ) : (
          <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
            <Text style={[paraGray.darkpara]}>Block</Text>
          </View>
        )}
      </Modal>
    </View>
  );
};

export default ChatDetail;
