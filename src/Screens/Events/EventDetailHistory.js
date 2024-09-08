import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import { List, Modal } from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { COLORS } from '../../theme/Colors';
import { Header } from '../../Components/Header';
import FastImage from 'react-native-fast-image';
import Url from '../../Config/Api/Url';
import { container, paraGray } from '../../theme/styles/Base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ImageSlider } from 'react-native-image-slider-banner';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Moment from 'moment';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const EventDetailHistory = props => {
  const { events } = props.route.params;
  const { roleid, schoolid, teacherid } = useSelector(state => state.userReducer);
  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const [desc, setDesc] = useState(events.note);
  const [getimg, setImg] = useState([]);
  const [getdata, setData] = useState([]);
  const [showmsg, setShowMsg] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);


  const htmlContent = `
  document.writeln("<View style={styles.container}>");
document.writeln("      <ScrollView showsVerticalScrollIndicator={false}>");
document.writeln("        <View>");
document.writeln("          <Text style={styles.subtxt}>{events.title}</Text>");
document.writeln("        </View>");
document.writeln("        <View>");
document.writeln("          <Text style={styles.txt}>");
document.writeln("            From Date:");
document.writeln("            <Text style={styles.datatxt}>{events.event_from}</Text>");
document.writeln("          </Text>");
document.writeln("          <Text style={styles.txt}>");
document.writeln("            To Date:");
document.writeln("            <Text style={styles.datatxt}>{events.event_to}</Text>");
document.writeln("          </Text>");
document.writeln("        </View>");
document.writeln("        <View style={styles.divline} />");
document.writeln("        <DataTable>");
document.writeln("          <DataTable.Header");
document.writeln("            style={{marginTop: 10, borderBottomWidth: 0, marginBottom: -10}}>");
document.writeln("            <DataTable.Title>");
document.writeln("              <Text style={styles.tabletxt}>Events</Text>");
document.writeln("            </DataTable.Title>");
document.writeln("            <DataTable.Title style={{flex: 1.3}}>");
document.writeln("              <Text style={styles.tabletxt}>Student Name</Text>");
document.writeln("            </DataTable.Title>");
document.writeln("            <DataTable.Title>");
document.writeln("              <Text style={styles.tabletxt}>Stream</Text>");
document.writeln("            </DataTable.Title>");
document.writeln("            <DataTable.Title>");
document.writeln("              <Text style={styles.tabletxt}>Contact No</Text>");
document.writeln("            </DataTable.Title>");
document.writeln("          </DataTable.Header>");
document.writeln("        </DataTable>");
document.writeln("        {eventss.map((events, index) => (");
document.writeln("          <DataTable key={index}>");
document.writeln("            <DataTable.Row style={{borderBottomWidth: 0}}>");
document.writeln("              <DataTable.Cell style={{flex: 1.2}}>");
document.writeln("                <Text style={{fontSize: 12, fontFamily: \'Montserrat-Regular\'}}>");
document.writeln("                  {events.eventname}");
document.writeln("                </Text>");
document.writeln("              </DataTable.Cell>");
document.writeln("              <DataTable.Cell style={{flex: 1.8, padding: 0}}>");
document.writeln("                <Text style={{fontSize: 12, fontFamily: \'Montserrat-Regular\'}}>");
document.writeln("                  {events.name}");
document.writeln("                </Text>");
document.writeln("              </DataTable.Cell>");
document.writeln("              <DataTable.Cell>");
document.writeln("                <Text style={{fontSize: 12, fontFamily: \'Montserrat-Regular\'}}>");
document.writeln("                  {events.stream}");
document.writeln("                </Text>");
document.writeln("              </DataTable.Cell>");
document.writeln("              <DataTable.Cell style={{flex: 1.2}}>");
document.writeln("                <Text style={{fontSize: 12, fontFamily: \'Montserrat-Regular\'}}>");
document.writeln("                  {events.contact}");
document.writeln("                </Text>");
document.writeln("              </DataTable.Cell>");
document.writeln("            </DataTable.Row>");
document.writeln("          </DataTable>");
document.writeln("        ))}");
document.writeln("      </ScrollView>");
document.writeln("    </View>");
`;
  useEffect(() => {
    getapiData();
    image();
  }, []);

  const image = () => {
    var list = [];
    var myArray = JSON.parse(events.image);
    myArray.map((item, i) => {
      var newdata = {
        img: Url.event_IMG + item
      };
      list.push(newdata);
    });
    setImg(list);
  }

  // --------APICall----------
  const UpdateCaption = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      formData.append('event_id', events.id);
      formData.append('description', desc);
      // console.log('send data==>', JSON.stringify(formData));
      let resp = await fetch(`${Url.update_data}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          return response.json();
        })
        .then(result => {
          if (result.status == true) {
            setShowModal(false)
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('Edit Event Desc Error => ' + error);
      setLoading(false);
    }
  };


  const getapiData = async () => {
    let list = [];
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('event_id', events.id);
      console.log('Send Data ==>', formData);
      let resp = await fetch(`${Url.getParticipentByEventId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          return response.json();
        })
        .then(result => {
          for (let index = 0; index < result.data.length; index++) {
            var data = {
              show: false
            };
            list.push(data)
          }
          setShowMsg(list);
          // console.log("Event Participents Response===> " + JSON.stringify(result.data));
          setData(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Event Participents List Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  const createPDF = async () => {
    let options = {
      html: htmlContent,
      fileName: `${events.eventname}`,
      directory: 'Download',
    };
    let file = await RNHTMLtoPDF.convert(options);
    alert(file.filePath);
  };

  clcDeviceHeightWidth = (height, width) => {
    let deviceHeight = Dimensions.get('window').height;
    let deviceWidth = Dimensions.get('window').width;
    if (height && width)
      return {
        height: deviceHeight / height,
        width: deviceWidth / width,
      };
  }

  return (
    <View style={[styles.container]}>
      {loading == true && <Spinner visible={load} />}
      <View style={{ paddingHorizontal: 15, backgroundColor: COLORS.black }}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName="Event's History"
          marginLeft
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ flex: 1 }}>
          {getimg.length < 1 ? (
            <FastImage
              style={{
                height: deviceHeight / 2,
                width: deviceWidth / 1,
                alignSelf: 'center',
              }}
              source={require('../../../assets/nullimage.png')}
            />
          ) : (
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
          )}
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
              {events.event_date}
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
          <Text
            style={[
              paraGray.darklarge,
              { textAlign: 'auto', color: COLORS.lblack },
            ]}>
            {events.title}
          </Text>
          <Text
            style={[
              paraGray.darkpara,
              { textAlign: 'auto', marginTop: 10, color: COLORS.lightblack },
            ]}>
            {desc}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.section,
            marginHorizontal: 15,
            marginVertical: 10,
          }}
        />
        {getdata.map((items, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
              marginHorizontal: 15,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Text style={[paraGray.parahome, { fontSize: 16 }]}>
                {items.student_name}
              </Text>
              <Text style={[paraGray.darkpara, { fontSize: 14 }]}>{items.class_name}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Text
                style={[paraGray.darkpara, { fontSize: 16, color: COLORS.blue }]}>
                Date of participate
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  { fontSize: 14, color: COLORS.section },
                ]}>
                {Moment(items.participate_date).format('d MMM')}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="call" color={COLORS.section} size={15} />
                <Text
                  style={[
                    paraGray.darkpara,
                    { fontSize: 14, marginLeft: 5, color: COLORS.section },
                  ]}>
                  {items.student_phone}
                </Text>
              </View>
              <Text
                style={[
                  paraGray.darkpara,
                  { fontSize: 14, color: COLORS.section },
                ]}>
                Roll no: {items.roll_no}
              </Text>
            </View>
            {showmsg[index].show == true &&
              <View style={{ marginTop: 10 }}>
                <Text style={[
                  paraGray.darkpara,
                  { fontSize: 14, color: COLORS.black },
                ]}>{items.message}</Text>
              </View>}
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
              onPress={() => {
                let lists = [...showmsg];
                var data = {
                  show: showmsg[index].show == true ? false : true
                }
                lists[index] = data;
                setShowMsg(lists)
              }
              }>
              {showmsg[index].show == true ?
                <MaterialIcons
                  name="keyboard-arrow-up"
                  size={22}
                  color={COLORS.blue}
                /> :
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={22}
                  color={COLORS.blue}
                />}
            </TouchableOpacity>
          </View>
        ))
        }
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
          <TouchableOpacity
            onPress={() => UpdateCaption()}
          >
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
    </View >
    // <View style={styles.container}>
    //   <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
    //     <Header
    //       backgroundColor
    //       navigation={props.navigation}
    //       color={COLORS.bg}
    //       back
    //       headerFirstName="Event's History"
    //       marginLeft
    //       rightdownload
    //       onPresss={createPDF}
    //     />
    //   </View>
    //   <ScrollView showsVerticalScrollIndicator={false}>
    //     <View style={{flex: 1}}>
    //       {events.image == null ? (
    //         <FastImage
    //           style={{
    //             height: deviceHeight / 2,
    //             width: deviceWidth / 1,
    //             alignSelf: 'center',
    //           }}
    //           source={require('../../../assets/nullimage.png')}
    //         />
    //       ) : (
    //         <FastImage
    //           source={{
    //             uri: Url.event_IMG + events.image,
    //           }}
    //           style={{
    //             height: deviceHeight / 2,
    //             width: deviceWidth / 1,
    //             alignSelf: 'center',
    //           }}
    //         />
    //       )}
    //     </View>
    //     <View>
    //       <Text style={styles.subtxt}>{events.title}</Text>
    //     </View>
    //     <View>
    //       <Text style={styles.txt}>
    //         From Date :<Text style={styles.datatxt}> {events.event_from}</Text>
    //       </Text>
    //       <Text style={styles.txt}>
    //         To Date :<Text style={styles.datatxt}> {events.event_to}</Text>
    //       </Text>
    //       <Text style={styles.txt}>
    //         Description :<Text style={styles.datatxt}> {events.note}</Text>
    //       </Text>
    //     </View>
    //     {/* <View style={styles.divline} />
    //     <DataTable>
    //       <DataTable.Header
    //         style={{marginTop: 10, borderBottomWidth: 0, marginBottom: -10}}>
    //         <DataTable.Title>
    //           <Text style={styles.tabletxt}>Events</Text>
    //         </DataTable.Title>
    //         <DataTable.Title style={{flex: 1.3}}>
    //           <Text style={styles.tabletxt}>Student Name</Text>
    //         </DataTable.Title>
    //         <DataTable.Title>
    //           <Text style={styles.tabletxt}>Stream</Text>
    //         </DataTable.Title>
    //         <DataTable.Title>
    //           <Text style={styles.tabletxt}>Contact No</Text>
    //         </DataTable.Title>
    //       </DataTable.Header>
    //     </DataTable>
    //     <View style={{marginBottom: 20}}>
    //       {eventss.map((events, index) => (
    //         <DataTable key={index}>
    //           <DataTable.Row style={{borderBottomWidth: 0}}>
    //             <DataTable.Cell style={{flex: 1.2}}>
    //               <Text
    //                 style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
    //                 {events.eventname}
    //               </Text>
    //             </DataTable.Cell>
    //             <DataTable.Cell style={{flex: 1.8, padding: 0}}>
    //               <Text
    //                 style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
    //                 {events.name}
    //               </Text>
    //             </DataTable.Cell>
    //             <DataTable.Cell>
    //               <Text
    //                 style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
    //                 {events.stream}
    //               </Text>
    //             </DataTable.Cell>
    //             <DataTable.Cell style={{flex: 1.2}}>
    //               <Text
    //                 style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
    //                 {events.contact}
    //               </Text>
    //             </DataTable.Cell>
    //           </DataTable.Row>
    //         </DataTable>
    //       ))}
    //     </View> */}
    //   </ScrollView>
    // </View>
  );
};

export default EventDetailHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtxt: {
    marginTop: 25,
    fontSize: 13,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: '6%',
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
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    // fontSize: 18,
  },
  stlabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  stlabeltext: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
    paddingHorizontal: 10,
  },
  sttext: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    paddingHorizontal: 15,
  },
  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '100%',
  },
  tabletxt: {
    // fontWeight: 'bold',
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
});
