import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ListItem} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {paraGray} from '../../theme/styles/Base';
import Button from '../../Components/Button';
import Moment from 'moment';
import {COLORS} from '../../theme/Colors';
import FastImage from 'react-native-fast-image';
import Url from '../../Config/Api/Url';
import Document from '../Documents/Document';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const StudyMaterial = props => {
  const [video, setVideo] = useState(false);
  const [image, setImage] = useState(false);
  const [document, setDocument] = useState(false);
  const [links, setLinks] = useState(false);
  const [getdata, setData] = useState([
    {
      class_id: 'null',
      created_at: '2023-04-27 15:39:01',
      created_by: '0',
      date: '0000-00-00',
      id: '10',
      image: null,
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: '',
      role_id: '5',
      school_id: '10',
      section_id: 'null',
      status: '1',
      subject_id: 'null',
      teacher_id: null,
      title: '',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 09:56:39',
      created_by: '0',
      date: '0000-00-00',
      id: '13',
      image: 'notice-1695117399-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test notee',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 10:20:37',
      created_by: '0',
      date: '0000-00-00',
      id: '15',
      image: 'notice-1695118837-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 10:21:50',
      created_by: '0',
      date: '2019-09-23',
      id: '16',
      image: 'notice-1695118910-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test',
    },
  ]);
  const files = [
    {
      id: '1',
      video: '',
      thumb:
        'https://d2slcw3kip6qmk.cloudfront.net/marketing/techblog/750-arm-a-b-test-blog-post-image.png',
      title: 'Chapter-wise MCQs & Answers ',
      desc: 'Live Stream Capture',
    },
    {
      id: '2',
      video: '',
      thumb:
        'https://thumbs.dreamstime.com/b/time-to-study-school-tools-around-blackboard-background-46060556.jpg',
      title: 'Chapter-wise MCQs & Answers ',
      desc: 'Live Stream Capture',
    },
    {
      id: '3',
      video: '',
      thumb:
        'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      title: 'Chapter-wise MCQs & Answers ',
      desc: 'Live Stream Capture',
    },
  ];
  let deviceHeight = Dimensions.get('window').height;
  let deviceWidth = Dimensions.get('window').width;
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
            Study Materials
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ShareVideo');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Share Video</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ShareDocument');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Share Documents</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ShareImage');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Share Images</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ShareLink');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Share Links</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} /> */}
        <View style={{width: '90%', alignSelf: 'center', marginTop: 25}}>
          <ListItem.Accordion
            containerStyle={{
              backgroundColor: '#EEF2FD',
              borderWidth: 0.4,
              borderColor: '#275CE0',
              //height: 80,
              paddingVertical: 20,
              borderRadius: 16,
              marginBottom: 25,
            }}
            content={
              <ListItem.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="play-circle" size={36} color={'#275CE0'} />
                    <View style={{marginLeft: 20}}>
                      <Text style={[paraGray.parahome, {fontSize: 16}]}>
                        Share Videos
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {fontSize: 11, marginTop: 5, fontStyle: 'italic'},
                        ]}>
                        Share youtube videos and links
                      </Text>
                    </View>
                  </View>
                </View>
              </ListItem.Content>
            }
            icon={
              <View
                style={{
                  backgroundColor: 'rgba(39, 92, 224, 0.15)',
                  borderRadius: 50,
                  alignItems: 'center',
                  alignSelf: 'center',
                  // width: 32,
                  // height: 32,
                  padding: 3,
                }}>
                <Ionicons name="chevron-down" size={20} color={'black'} />
              </View>
            }
            isExpanded={video}
            onPress={() => {
              setVideo(!video);
            }}>
            <ScrollView>
              <ListItem.Content style={{}}>
                <Text
                  style={[
                    paraGray.largebold,
                    {fontSize: 14, marginBottom: 10},
                  ]}>
                  Recent
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={getdata}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item: notice, index}) => (
                    <View
                      style={{
                        marginVertical: 10,

                        //flex: 1,
                      }}
                      key={index}>
                      <View
                        style={{
                          // flex: 1,
                          //paddingHorizontal: 5,
                          paddingRight: 10,
                        }}>
                        <TouchableOpacity
                          style={{
                            height: deviceHeight / 4.8,
                            //height: 170,
                            width: deviceWidth / 2.3,
                            // width: '50%',
                            //width: 190,
                            // width: '100%',
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: COLORS.skypurple,
                            //backgroundColor: 'EEF2FD',
                            backgroundColor: COLORS.skypurple,
                            justifyContent: 'center',
                          }}
                          //   onPress={() =>
                          //     props.navigation.navigate('HistoryDetailAnn', {
                          //       notice: getdata[index],
                          //     })
                          //   }
                          onPress={() => {
                            // setAnnouncementData(getdata[index]);
                            // setShowModal(true);
                            Linking.openURL('https://www.youtube.com');
                          }}>
                          <View
                            style={{
                              flex: 1,
                              // marginTop: 20,
                              //marginBottom: 10,
                              justifyContent: 'center',
                            }}>
                            {notice.image == null ? (
                              <Image
                                style={{
                                  // borderWidth: 1,
                                  height: '100%',
                                  width: '100%',
                                  borderTopLeftRadius: 10,
                                  borderTopRightRadius: 10,
                                  //marginLeft: 10,
                                }}
                                source={require('../../../assets/nullimage.png')}
                              />
                            ) : (
                              <FastImage
                                style={{
                                  height: '100%',

                                  width: '100%',
                                  // marginLeft: 10,
                                  borderTopLeftRadius: 10,
                                  borderTopRightRadius: 10,
                                }}
                                source={{
                                  uri: Url.notice_IMG + notice.image,
                                }}
                              />
                            )}
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 10,
                              alignItems: 'center',
                              width: '90%',
                              alignSelf: 'center',
                            }}>
                            <Text style={[paraGray.darkpara, {fontSize: 10}]}>
                              {/* {notice.created_at} */}
                              Class- 5th A
                            </Text>
                            {/* <Text style={[paraGray.darkpara, {fontSize: 10}]}>
                              
                              horn icon
                            </Text> */}
                            <View
                              style={{
                                height: 10,
                                width: 1,
                                backgroundColor: 'black',
                                marginLeft: 5,
                              }}
                            />
                            <Text
                              style={[
                                paraGray.darkpara,
                                {fontSize: 10, marginLeft: 5},
                              ]}>
                              {/* {notice.created_at} */}
                              Subject Name
                            </Text>
                          </View>

                          <View>
                            <Text
                              style={[
                                paraGray.largebold,
                                {
                                  fontSize: 11,
                                  width: '90%',
                                  alignSelf: 'center',
                                  marginTop: 5,
                                },
                              ]}>
                              Video Title
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              //   /marginTop: 5,
                              justifyContent: 'space-between',
                              width: '90%',

                              alignSelf: 'center',
                              alignItems: 'center',
                              marginBottom: 5,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={[
                                paraGray.darkpara,
                                {
                                  fontSize: 10,
                                  alignItems: 'center',
                                  width: '90%',
                                },
                              ]}>
                              {/* {notice.created_at} */}
                              This is a sample video desc...
                            </Text>
                            <Ionicons
                              name="play-circle"
                              size={24}
                              color={'black'}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
                <View style={{width: '100%', marginTop: 10}}>
                  <Text
                    style={[
                      paraGray.largebold,
                      {fontSize: 14, textAlign: 'right'},
                    ]}
                    onPress={() => props.navigation.navigate('ShareVideo')}>
                    View All
                  </Text>
                </View>
                <TouchableOpacity
                  style={{width: '60%', alignSelf: 'center'}}
                  onPress={() => props.navigation.navigate('AddMaterialImage')}>
                  <Button
                    title="Add Video"
                    styles={{
                      width: '100%',

                      paddingVertical: 15,
                    }}
                  />
                </TouchableOpacity>
              </ListItem.Content>
            </ScrollView>
          </ListItem.Accordion>
          <ListItem.Accordion
            containerStyle={{
              backgroundColor: '#EEF2FD',
              borderWidth: 0.4,
              borderColor: '#275CE0',
              //height: 80,
              paddingVertical: 20,
              borderRadius: 16,
              marginBottom: 25,
            }}
            content={
              <ListItem.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="document" size={32} color={'#275CE0'} />
                    <View style={{marginLeft: 20}}>
                      <Text style={[paraGray.parahome, {fontSize: 16}]}>
                        Share Documents
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {fontSize: 11, marginTop: 5, fontStyle: 'italic'},
                        ]}>
                        Share pdfs, docx and more
                      </Text>
                    </View>
                  </View>
                </View>
              </ListItem.Content>
            }
            icon={
              <View
                style={{
                  backgroundColor: 'rgba(39, 92, 224, 0.15)',
                  borderRadius: 50,
                  alignItems: 'center',
                  alignSelf: 'center',
                  // width: 32,
                  // height: 32,
                  padding: 3,
                }}>
                <Ionicons name="chevron-down" size={20} color={'black'} />
              </View>
            }
            isExpanded={document}
            onPress={() => {
              setDocument(!document);
            }}>
            <ScrollView>
              <ListItem.Content style={{}}>
                <Text style={[paraGray.largebold, {fontSize: 14}]}>Recent</Text>
                <View
                  style={{
                    width: wp('98%'),
                    alignSelf: 'center',
                  }}>
                  <Document
                    userDetails={true}
                    mainViewStyle={{paddingTop: 0}}
                  />
                </View>
                <View style={{width: '100%', marginTop: 10}}>
                  <Text
                    style={[
                      paraGray.largebold,
                      {fontSize: 14, textAlign: 'right'},
                    ]}
                    onPress={() => props.navigation.navigate('ShareDocument')}>
                    View All
                  </Text>
                </View>
                <TouchableOpacity
                  style={{width: '60%', alignSelf: 'center'}}
                  onPress={() => props.navigation.navigate('AddDocuments')}>
                  <Button
                    title="Add Documents"
                    styles={{
                      width: '100%',

                      paddingVertical: 15,
                    }}
                  />
                </TouchableOpacity>
              </ListItem.Content>
            </ScrollView>
          </ListItem.Accordion>
          <ListItem.Accordion
            containerStyle={{
              backgroundColor: '#EEF2FD',
              borderWidth: 0.4,
              borderColor: '#275CE0',
              //height: 80,
              paddingVertical: 20,
              borderRadius: 16,
              marginBottom: 25,
            }}
            content={
              <ListItem.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialIcons
                      name="photo-library"
                      size={30}
                      color={COLORS.primary}
                      style={{marginTop: 5, alignSelf: 'center'}}
                    />
                    <View style={{marginLeft: 20}}>
                      <Text style={[paraGray.parahome, {fontSize: 16}]}>
                        Share Images
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {fontSize: 11, marginTop: 5, fontStyle: 'italic'},
                        ]}>
                        Share .jpg, .jpeg, png, etc.
                      </Text>
                    </View>
                  </View>
                </View>
              </ListItem.Content>
            }
            icon={
              <View
                style={{
                  backgroundColor: 'rgba(39, 92, 224, 0.15)',
                  borderRadius: 50,
                  alignItems: 'center',
                  alignSelf: 'center',
                  // width: 32,
                  // height: 32,
                  padding: 3,
                }}>
                <Ionicons name="chevron-down" size={20} color={'black'} />
              </View>
            }
            isExpanded={image}
            onPress={() => {
              setImage(!image);
            }}>
            <ScrollView>
              <ListItem.Content style={{}}>
                <Text
                  style={[
                    paraGray.largebold,
                    {fontSize: 14, marginBottom: 10},
                  ]}>
                  Recent
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={getdata}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item: notice, index}) => (
                    <View
                      style={{
                        marginVertical: 10,

                        //flex: 1,
                      }}
                      key={index}>
                      <View
                        style={{
                          // flex: 1,
                          //paddingHorizontal: 5,
                          paddingRight: 10,
                        }}>
                        <TouchableOpacity
                          style={{
                            height: deviceHeight / 4.8,
                            //height: 170,
                            width: deviceWidth / 2.3,
                            // width: '50%',
                            //width: 190,
                            // width: '100%',
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: COLORS.skypurple,
                            //backgroundColor: 'EEF2FD',
                            backgroundColor: COLORS.skypurple,
                            justifyContent: 'center',
                          }}
                          //   onPress={() =>
                          //     props.navigation.navigate('HistoryDetailAnn', {
                          //       notice: getdata[index],
                          //     })
                          //   }
                          onPress={() => {
                            setAnnouncementData(getdata[index]);
                            setShowModal(true);
                          }}>
                          <View
                            style={{
                              flex: 1,
                              // marginTop: 20,
                              //marginBottom: 10,
                              justifyContent: 'center',
                            }}>
                            {notice.image == null ? (
                              <Image
                                style={{
                                  // borderWidth: 1,
                                  height: '100%',
                                  width: '100%',
                                  borderTopLeftRadius: 10,
                                  borderTopRightRadius: 10,
                                  //marginLeft: 10,
                                }}
                                source={require('../../../assets/nullimage.png')}
                              />
                            ) : (
                              <FastImage
                                style={{
                                  height: '100%',

                                  width: '100%',
                                  // marginLeft: 10,
                                  borderTopLeftRadius: 10,
                                  borderTopRightRadius: 10,
                                }}
                                source={{
                                  uri: Url.notice_IMG + notice.image,
                                }}
                              />
                            )}
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 10,
                              alignItems: 'center',
                              width: '90%',
                              alignSelf: 'center',
                            }}>
                            <Text style={[paraGray.darkpara, {fontSize: 10}]}>
                              {/* {notice.created_at} */}
                              Class- 5th A
                            </Text>
                            {/* <Text style={[paraGray.darkpara, {fontSize: 10}]}>
                              
                              horn icon
                            </Text> */}
                            <View
                              style={{
                                height: 10,
                                width: 1,
                                backgroundColor: 'black',
                                marginLeft: 5,
                              }}
                            />
                            <Text
                              style={[
                                paraGray.darkpara,
                                {fontSize: 10, marginLeft: 5},
                              ]}>
                              {/* {notice.created_at} */}
                              Subject Name
                            </Text>
                          </View>

                          <View>
                            <Text
                              style={[
                                paraGray.largebold,
                                {
                                  fontSize: 11,
                                  width: '90%',
                                  alignSelf: 'center',
                                  marginTop: 5,
                                },
                              ]}>
                              Image
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              //   /marginTop: 5,
                              justifyContent: 'space-between',
                              width: '90%',

                              alignSelf: 'center',
                              alignItems: 'center',
                              marginBottom: 5,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={[
                                paraGray.darkpara,
                                {
                                  fontSize: 10,
                                  alignItems: 'center',
                                  width: '90%',
                                },
                              ]}>
                              {/* {notice.created_at} */}
                              This is a sample video desc...
                            </Text>
                            {/* <Ionicons
                              name="play-circle"
                              size={24}
                              color={'black'}
                            /> */}
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
                <View style={{width: '100%', marginTop: 10}}>
                  <Text
                    style={[
                      paraGray.largebold,
                      {fontSize: 14, textAlign: 'right'},
                    ]}
                    onPress={() => props.navigation.navigate('ShareImage')}>
                    View All
                  </Text>
                </View>
                <TouchableOpacity
                  style={{width: '60%', alignSelf: 'center'}}
                  onPress={() => props.navigation.navigate('AddMaterialImage')}>
                  <Button
                    title="Add Images"
                    styles={{
                      width: '100%',

                      paddingVertical: 15,
                    }}
                  />
                </TouchableOpacity>
              </ListItem.Content>
            </ScrollView>
          </ListItem.Accordion>
          <ListItem.Accordion
            containerStyle={{
              backgroundColor: '#EEF2FD',
              borderWidth: 0.4,
              borderColor: '#275CE0',
              //height: 80,
              paddingVertical: 20,
              borderRadius: 16,
              marginBottom: 25,
            }}
            content={
              <ListItem.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome5
                      name="link"
                      size={29}
                      color={COLORS.primary}
                    />
                    <View style={{marginLeft: 20}}>
                      <Text style={[paraGray.parahome, {fontSize: 16}]}>
                        Share Links
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {fontSize: 11, marginTop: 5, fontStyle: 'italic'},
                        ]}>
                        Share important links with students
                      </Text>
                    </View>
                  </View>
                </View>
              </ListItem.Content>
            }
            icon={
              <View
                style={{
                  backgroundColor: 'rgba(39, 92, 224, 0.15)',
                  borderRadius: 50,
                  alignItems: 'center',
                  alignSelf: 'center',
                  // width: 32,
                  // height: 32,
                  padding: 3,
                }}>
                <Ionicons name="chevron-down" size={20} color={'black'} />
              </View>
            }
            isExpanded={links}
            onPress={() => {
              setLinks(!links);
            }}>
            <ScrollView>
              <ListItem.Content style={{flex: 1}}>
                <Text
                  style={[
                    paraGray.largebold,
                    {fontSize: 14, marginBottom: 10},
                  ]}>
                  Recent
                </Text>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={files}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        //flex: 1,
                        //paddingHorizontal: 10,
                        marginVertical: 10,

                        alignSelf: 'center',
                      }}
                      onPress={() =>
                        Linking.openURL('https://www.youtube.com')
                      }>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          backgroundColor: COLORS.bgColor,
                          borderRadius: 10,

                          paddingHorizontal: 20,
                          // borderWidth: 1,
                          //borderColor: COLORS.active,
                          // backgroundColor: COLORS.active,
                          paddingVertical: 15,
                          //justifyContent: 'space-between',
                          alignItems: 'center',
                          //flex: 1,
                        }}>
                        <View
                          style={{
                            marginRight: 10,
                            borderRadius: 20,
                            //backgroundColor: COLORS.active,
                          }}>
                          <FontAwesome5
                            name="link"
                            size={20}
                            color={COLORS.primary}
                          />
                        </View>
                        <View
                          style={{
                            //flex: 1,
                            // justifyContent: 'center',
                            //borderWidth: 1,
                            width: '90%',
                          }}>
                          <Text
                            numberOfLines={1}
                            style={[
                              paraGray.darkpara,
                              {
                                color: COLORS.black,
                              },
                            ]}>
                            {item.thumb}
                          </Text>
                          {/* <Text
                                style={[
                                  paraGray.darkpara,
                                  {color: COLORS.section},
                                ]}>
                                {data.desc}
                              </Text> */}
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <View style={{width: '100%', marginTop: 10}}>
                  <Text
                    style={[
                      paraGray.largebold,
                      {fontSize: 14, textAlign: 'right'},
                    ]}
                    onPress={() => props.navigation.navigate('ShareLink')}>
                    View All
                  </Text>
                </View>
                <TouchableOpacity
                  style={{width: '60%', alignSelf: 'center'}}
                  onPress={() => props.navigation.navigate('AddLink')}>
                  <Button
                    title="Add Links"
                    styles={{
                      width: '100%',

                      paddingVertical: 15,
                    }}
                  />
                </TouchableOpacity>
              </ListItem.Content>
            </ScrollView>
          </ListItem.Accordion>
        </View>
      </ScrollView>
    </View>
  );
};

export default StudyMaterial;

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
    fontSize: 18,
    color: '#000000',
    fontWeight: '500',
    fontSize: 15,
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
