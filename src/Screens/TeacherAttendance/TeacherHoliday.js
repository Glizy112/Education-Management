import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {Header} from '../../Components/Header';
import {FlatList} from 'react-native-gesture-handler';

const TeacherHoliday = props => {
  const dispatch = useDispatch();
  const [absent, setAbsent] = useState(2);
  const [holiday, setHoliday] = useState(1);
  const [active, setActive] = useState('1');
  const {schoolid, classid, sectionid, studentid} = useSelector(
    state => state.userReducer,
  );
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [get, set] = useState([]);
  const [getdata, setdata] = useState([]);
  const [attenddata, setAttenddata] = useState([]);
  const TeacherAttendances = [
    {
      id: '1',
      name: 'Social Study',
      holidayname: 'Holi',
      day: 'Saturday',
      hday: 'Monday',
      date: '14th March',
      attend: 'absent',
      time: '10.00am',
    },
    {
      id: '2',
      name: 'Science',
      holidayname: 'Holi',
      day: 'Saturday',
      hday: 'Tuesday',
      date: '15th March',
      attend: 'absent',
      time: '11.00am',
    },
    {
      id: '3',
      name: 'Maths',
      holidayname: 'Holi',
      day: 'Saturday',
      hday: 'Friday',
      date: '18th March',
      attend: 'absent',
      time: '12.00am',
    },
  ];

  useEffect(() => {
    getholidayapiData();
  }, []);
  let nextDay = [];
  let newDaysObject = {};

  const getholidayapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      // formData.append('teacher_id', teacherid);

      let resp = await fetch(
        'http://intraedu.in/admin/StudentApi/holiday_by_school_id',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      )
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          setdata(result);
          //   if (result != '') {
          //     result.map(item => {
          //       var json_data = item.date_from;
          //       nextDay.push(json_data);
          //     }),
          //       set(nextDay);
          //   }
          setLoading(false);
        });
      // holidayarray();
    } catch (error) {
      console.log('TeacherHoliday Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getholidayapiData();
  }, []);

  get.forEach(day => {
    newDaysObject[day] = {
      selected: true,
      marked: false,
      selectedColor: COLORS.green,
    };
  });
  const data = [
    {
      title: 'Jan 2024',
      data: [
        {
          date: '14',
          month: 'Jan',
          event: 'Makar Sankaranti',
          holidayType: 'Gazetted Holiday',
        },
        {
          date: '26',
          month: 'Jan',
          event: 'Republic Day',
          holidayType: 'Gazetted Holiday',
        },
      ],
    },
    {
      title: 'Aug 2024',
      data: [
        {
          date: '15',
          month: 'Aug',
          event: 'Independence Day',
          holidayType: 'Gazetted Holiday',
        },
      ],
    },
    {
      title: 'Oct 2024',
      data: [
        {
          date: '02',
          month: 'Oct',
          event: 'Mahatama Gandhi Jayanti',
          holidayType: 'Gazetted Holiday',
        },
        {
          date: '12',
          month: 'Oct',
          event: 'Dussehra Festival',
          holidayType: 'Gazetted Holiday',
        },
        {
          date: '31',
          month: 'Oct',
          event: 'Diwali Festival',
          holidayType: 'Gazetted Holiday',
        },
      ],
    },
    {
      title: 'Nov 2024',
      data: [
        {
          date: '15',
          month: 'Nov',
          event: 'Gurupurab',
          holidayType: 'Gazetted Holiday',
        },
      ],
    },
    {
      title: 'Dec 2024',
      data: [
        {
          date: '25',
          month: 'Dec',
          event: 'Christmas Eve',
          holidayType: 'Gazetted Holiday',
        },
      ],
    },
  ];

  const list = () => {
    return;
  };
  list();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
              style={{marginVertical: 5, marginHorizontal: 7}}
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
          <Text style={[paraGray.largebold, {fontSize: 16, color: 'black'}]}>
            All Holidays
          </Text>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingBottom: 20,
          marginTop: 6,
        }}
        data={data}
        keyExtractor={item => item.title}
        renderItem={({item: {title, data}}) => {
          return (
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 15,
              }}>
              <Text style={[paraGray.header, {fontSize: 16, color: '#97A7C3'}]}>
                {title}
              </Text>
              {data.map(eventItem => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 0.6,
                    borderRightColor: '#97A7C3',
                    borderTopColor: '#97A7C3',
                    borderBottomColor: '#97A7C3',
                    backgroundColor: '#EEF2FD',
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                    borderTopLeftRadius: 40,
                    borderBottomLeftRadius: 40,
                    marginTop: 15,
                    marginBottom: 10,
                    borderLeftColor: '#275CE0',
                  }}>
                  <View
                    style={{
                      borderWidth: 1,

                      //width: 56,
                      //  height: 56,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 50,
                      alignSelf: 'center',
                      alignItems: 'center',
                      backgroundColor: '#275CE0',
                      borderColor: '#275CE0',
                    }}>
                    <Text style={[paraGray.largebold, {color: 'white'}]}>
                      {eventItem.date}
                    </Text>
                    <Text
                      style={[
                        paraGray.largebold,
                        {color: 'white', fontSize: 12},
                      ]}>
                      {eventItem.month}
                    </Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={[paraGray.parahome, {fontSize: 16}]}>
                      {eventItem.event}
                    </Text>
                    <Text style={[paraGray.darkpara, {fontStyle: 'italic'}]}>
                      {eventItem.holidayType}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          );
        }}
        // data.map(item => console.log(item))
      />
      {/* <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
        <Text style={[paraGray.header, {fontSize: 16, color: '#97A7C3'}]}>
          Jan 2024
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#97A7C3',
            backgroundColor: '#EEF2FD',
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            marginTop: 5,
          }}>
          <View
            style={{
              borderWidth: 1,
              //width: 56,
              //  height: 56,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 50,
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: '#275CE0',
              borderColor: '#275CE0',
            }}>
            <Text style={{color: 'white'}}>26</Text>
            <Text style={{color: 'white'}}>Jan</Text>
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={[paraGray.parahome, {fontSize: 16}]}>
              Independence Day
            </Text>
            <Text style={paraGray.darkpara}>Gazetted Holiday</Text>
          </View>
        </View>
      </View> */}
    </View>
  );
};

export default TeacherHoliday;
//   return (
//     <View style={container.container}>
//       {loading == true && <Spinner visible={loading} />}
//       <View style={{paddingHorizontal: 15, backgroundColor: COLORS.bluee}}>
//         <Header
//           backgroundColor
//           navigation={props.navigation}
//           color={COLORS.bg}
//           back
//           headerFirstName="Holiday List"
//           marginLeft
//         />
//       </View>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }>
//         <Image
//           style={{backgroundColor: COLORS.bluee, width: '100%'}}
//           source={require('../../../assets/star_pattern.png')}
//         />
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: COLORS.bg,
//             borderTopLeftRadius: 30,
//             borderTopRightRadius: 30,
//             paddingHorizontal: 15,
//             paddingBottom: 30,
//             marginTop: -30,
//           }}>
//           <View style={{marginTop: 20, alignItems: 'center'}}>
//             <Text style={[paraGray.darklarge]}>NOVEMBER 2020</Text>
//           </View>
//           <View
//             style={{
//               flex: 1,
//               marginTop: 20,
//               borderWidth: 1,
//               borderRadius: 10,
//               borderColor: COLORS.green,
//             }}>
//             <View
//               style={{
//                 width: `${((100 * absent) / 30).toFixed(1)}%`,
//                 backgroundColor: COLORS.green,
//                 height: 50,
//                 borderRadius: 8.3,
//               }}
//             />
//             <View
//               style={{
//                 flex: 1,
//                 flexDirection: 'row',
//                 position: 'absolute',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//               <Text
//                 numberOfLines={1}
//                 style={[
//                   paraGray.darkpara,
//                   {
//                     flex: 1,
//                     position: 'absolute',
//                     top: 12,
//                     left: 28,
//                     zIndex: 5,
//                   },
//                 ]}>
//                 Festival & Holidays
//               </Text>
//               <View
//                 style={{
//                   flex: 1,
//                   flexDirection: 'row',
//                   justifyContent: 'flex-end',
//                 }}>
//                 <View
//                   style={{
//                     height: 40,
//                     width: 40,
//                     borderRadius: 50,
//                     backgroundColor: COLORS.lightgreen,
//                     top: 5,
//                     right: 10,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <Text
//                     numberOfLines={1}
//                     style={[
//                       paraGray.darkpara,
//                       {
//                         top: 2,
//                         color: COLORS.green,
//                         fontFamily: 'Poppins-SemiBold',
//                       },
//                     ]}>
//                     {absent}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//         <View
//           style={{
//             flex: 1,
//             paddingHorizontal: 15,
//             marginTop: -20,
//             marginBottom: 30,
//           }}>
//           {/* {getdata.map((attend, index) => (
//             <View
//               key={index}
//               style={{
//                 flex: 1,
//                 borderWidth: 1,
//                 borderRadius: 10,
//                 borderColor: COLORS.border,
//                 justifyContent: 'center',
//                 paddingHorizontal: 10,
//                 marginTop: 15,
//               }}>
//               <View
//                 style={{
//                   flex: 1,
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   marginTop: 10,
//                 }}>
//                 <Text
//                   style={[paraGray.darklarge, {color: COLORS.lighterblack}]}>
//                   {attend.title}
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   flex: 1,
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   marginBottom: 10,
//                 }}>
//                 <Text style={[paraGray.lightParaSmall]}>
//                   {attend.date_from}
//                 </Text>
//                 <Text style={[paraGray.lightParaSmall]}>{attend.note}</Text>
//               </View>
//             </View>
//           ))} */}
//         </View>
//       </ScrollView>
//     </View>
//   );
