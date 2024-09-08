import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5, {FA5Style} from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DrawerContent} from './src/Screens/DrawerContent';
import HomeScreen from './src/Screens/HomeScreen';
import Student from './src/Screens/Students/Student';
import Info from './src/Screens/Students/Info';
import Courses from './src/Screens/Students/Courses';
import Document from './src/Screens/Documents/Document';
import Assign from './src/Screens/Library/Assign';
import Collection from './src/Screens/Library/Collection';
import HistoryLib from './src/Screens/Library/History';
import Exam from './src/Screens/Exams/Exam';
import CreateTest from './src/Screens/Exams/CreateTest';
import ManageTest from './src/Screens/Exams/ManageTest';
import Event from './src/Screens/Events/Event';
import CreateEvent from './src/Screens/Events/CreateEvent';
import HistoryEvent from './src/Screens/Events/HistoryEvent';
import Library from './src/Screens/Library/Library';
import LeaveApp from './src/Screens/Leave/LeaveApp';
import Ptm from './src/Screens/PTM/Ptm';
import CreateMeeting from './src/Screens/PTM/CreateMeeting';
import UpcomingPtm from './src/Screens/PTM/UpcomingPtm';
import AttendancePtm from './src/Screens/Attendance/AttendancePtm';
import Announcement from './src/Screens/Announcements/Announcement';
import HistoryAnnouncement from './src/Screens/Announcements/HistoryAnnouncement';
import CreateAnnouncement from './src/Screens/Announcements/CreateAnnouncement';
import Lecture from './src/Screens/Lectures/Lecture';
import CreateLecture from './src/Screens/Lectures/CreateLecture';
import UpComingLecture from './src/Screens/Lectures/UpComingLecture';
import HistoryLecture from './src/Screens/Lectures/HistoryLecture';
import McqTest from './src/Screens/MCQs/McqTest';
import CreateMcqTest from './src/Screens/MCQs/CreateMcqTest';
import SubmittedTest from './src/Screens/MCQs/SubmittedTest';
import HistoryTest from './src/Screens/MCQs/HistoryTest';
import AttendanceShow from './src/Screens/Attendance/AttendanceShow';
import TakeAttendance from './src/Screens/Attendance/TakeAttendance';
import HistoryAttendance from './src/Screens/Attendance/HistoryAttendance';
import ReportAttendance from './src/Screens/Attendance/ReportAttendance';
import Assignment from './src/Screens/Assignments/Assignment';
import CreateAss from './src/Screens/Assignments/CreateAss';
import SubmittedAss from './src/Screens/Assignments/SubmittedAss';
import HistoryAss from './src/Screens/Assignments/HistoryAss';
import Youtube from './src/Screens/Youtube/Youtube';
import ShareYtube from './src/Screens/Youtube/ShareYtube';
import HistoryYtube from './src/Screens/Youtube/HistoryYTube';
import BookDetail from './src/Screens/Library/BookDetail';
import AssignBook from './src/Screens/Library/AssignBook';
import CollectionDetail from './src/Screens/Library/CollectionDetail';
import FeesTransaction from './src/Screens/FeesTransactions/FeesTransaction';
import HistoryTrans from './src/Screens/FeesTransactions/HistoryTrans';
import UserTrans from './src/Screens/FeesTransactions/UserTrans';
import FeesDetail from './src/Screens/FeesTransactions/FeesDetail';
import LeaveStudent from './src/Screens/StudentIntraclient/Leave/LeaveStudent';
import ApplyLeave from './src/Screens/StudentIntraclient/Leave/ApplyLeave';
import HistoryLeaveStudent from './src/Screens/StudentIntraclient/Leave/HistoryLeaveStudent';
import StudentClient from './src/Screens/StudentIntraclient/StudentClient';
import StudentLibrary from './src/Screens/StudentIntraclient/StudentLibrary/StudentLibrary';
import StudentBookAssigned from './src/Screens/StudentIntraclient/StudentLibrary/StudentBookAssigned';
import StudentLibHistory from './src/Screens/StudentIntraclient/StudentLibrary/StudentLibHistory';
import PTMLecture from './src/Screens/StudentIntraclient/PTM/PTMLecture';
import UpcomingPtmLec from './src/Screens/StudentIntraclient/PTM/UpcomingPtmLec';
import HistoryPtmLec from './src/Screens/StudentIntraclient/PTM/HistoryPtmLec';
import StudentAttendance from './src/Screens/StudentIntraclient/StudentAttendance/StudentAttendance';
import StudentAttendanceShow from './src/Screens/StudentIntraclient/StudentAttendance/StudentAttendanceShow';
import StudentYoutube from './src/Screens/StudentIntraclient/StudentYoutube/StudentYoutube';
import StudentEvent from './src/Screens/StudentIntraclient/StudentEvent/StudentEvent';
import StudentNewEvent from './src/Screens/StudentIntraclient/StudentEvent/StudentNewEvent';
import StudentEventDetail from './src/Screens/StudentIntraclient/StudentEvent/StudentEventDetail';
import LecHistory from './src/Screens/Lectures/LecHistory';
import EventDetailHistory from './src/Screens/Events/EventDetailHistory';
import HistoryAtten from './src/Screens/Attendance/HistoryAtten';
import HistoryDetail from './src/Screens/Library/HistoryDetail';
import HistoryTransDetail from './src/Screens/FeesTransactions/HistoryTransDetail';
import FeeUserDetail from './src/Screens/FeesTransactions/FeeUserDetail';
import HistoryDetailTest from './src/Screens/MCQs/HistoryDetailTest';
import SubmittedDetailTest from './src/Screens/MCQs/SubmittedDetailTest';
import HistoryDetailAnn from './src/Screens/Announcements/HistoryDetailAnn';
import SubmittedDetailAss from './src/Screens/Assignments/SubmittedDetailAss';
import HistoryDetailAss from './src/Screens/Assignments/HistoryDetailAss';
import UpComingDetailLecture from './src/Screens/Lectures/UpComingDetailLecture';
import UpcomingDetailPtm from './src/Screens/PTM/UpcomingDetailPtm';
import HistoryLeave from './src/Screens/Leave/HistoryLeave';
import HistoryLeaveDetail from './src/Screens/Leave/HistoryLeaveDetail';
import HistoryLeaveDetailStudent from './src/Screens/StudentIntraclient/Leave/HistoryLeaveDetailStudent';
import TestResultMcqs from './src/Screens/MCQs/TestResultMcqs';
import Feeds from './src/Screens/Feeds/Feeds';
import SignIn from './src/Screens/Login/SignIn';
import {Provider} from 'react-redux';
import {Store} from './src/Redux/Store/store';
import Certificate from './src/Screens/Certificate/Certificate';
import ProvideCertificate from './src/Screens/Certificate/ProvideCertificate';
import StudyMaterial from './src/Screens/StudyMaterial/StudyMaterial';
import Result from './src/Screens/Result/Result';
import Request from './src/Screens/RequestAccess/Request';
import RequestAccess from './src/Screens/RequestAccess/RequestAccess';
import ForgetPassword from './src/Screens/Login/ForgetPassword';
import ForgetPasswordMail from './src/Screens/Login/ForgetPasswordMail';
import ForgetPasswordNO from './src/Screens/Login/ForgetPasswordNO';
import StudentProfile from './src/Screens/Students/StudentProfile';
import Gallery from './src/Screens/Gallery/Gallery';
import ImageDetail from './src/Screens/Gallery/ImageDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setuserId,
  setuserInfo,
  setuserName,
  setShowModal,
  setuserImage,
} from './src/Redux/Actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import Splash from './src/Screens/Splash/Splash';
import {COLORS} from './src/theme/Colors';
import OnBoarding from './src/Screens/OnBoarding/OnBoarding';
import Url from './src/Config/Api/Url';
import LeaveRequest from './src/Screens/Leave/LeaveRequest';
import Settings from './src/Screens/Settings/Settings';
import TeachersProfile from './src/Screens/TeachersProfile/TeachersProfile';
import AddImage from './src/Screens/Gallery/AddImage';
import ChangePassword from './src/Screens/Login/ChangePassword';
import Security from './src/Screens/Security/Security';
import CreateMPIN from './src/Screens/Security/MPIN/CreateMPIN';
import ChangeMPIN from './src/Screens/Security/MPIN/ChangeMPIN';
import MPINSet from './src/Screens/Security/MPIN/MPINSet';
import MPINVerification from './src/Screens/Security/MPIN/MPINVerification';
import ForgetPIN from './src/Screens/Security/MPIN/ForgetPIN';
import ForgetMPIN from './src/Screens/Security/MPIN/ForgetMPIN';
import StudentEdit from './src/Screens/Students/StudentEdit';
import CertificateHistory from './src/Screens/Certificate/CertificateHistory';
import CertificateHistoryDetail from './src/Screens/Certificate/CertificateHistoryDetail';
import ShareVideo from './src/Screens/StudyMaterial/ShareVideo';
import AddVideo from './src/Screens/StudyMaterial/AddVideo';
import AddLink from './src/Screens/StudyMaterial/AddLink';
import ShareLink from './src/Screens/StudyMaterial/ShareLink';
import ShareImage from './src/Screens/StudyMaterial/ShareImage';
import AddDocument from './src/Screens/StudyMaterial/AddDocument';
import ShareDocument from './src/Screens/StudyMaterial/ShareDocument';
import AddMaterialImage from './src/Screens/StudyMaterial/AddMaterialImage';
import RequestDetail from './src/Screens/RequestAccess/RequestDetail';
import RequestHistoryDetail from './src/Screens/RequestAccess/RequestHistoryDetail';
import RequestHistory from './src/Screens/RequestAccess/RequestHistory';
import ClassRoomResult from './src/Screens/Result/ClassRoomResult';
import ClassResult from './src/Screens/Result/ClassResult';
import AllotementDetail from './src/Screens/Result/AllotementDetail';
import MarksAllotement from './src/Screens/Result/MarksAllotement';
import ComplaintHistory from './src/Screens/Complaints/ComplaintHistory';
import CreateComplaint from './src/Screens/Complaints/CreateComplaint';
import Complaint from './src/Screens/Complaints/Complaint';
import AssignComplaint from './src/Screens/Complaints/AssignComplaint';
import PTMHistory from './src/Screens/PTM/PTMHistory';
import PTMHistoryDetail from './src/Screens/PTM/PTMHistoryDetail';
import PayRoll from './src/Screens/PayRoll/PayRoll';
import SalarySlip from './src/Screens/PayRoll/SalarySlip';
import AdvanceSalary from './src/Screens/PayRoll/AdvanceSalary';
import UpdateLecture from './src/Screens/Lectures/UpdateLecture';
import TimeTable from './src/Screens/TimeTable/TimeTable';
import Period from './src/Screens/TimeTable/Period';
import TimeTableHistroy from './src/Screens/TimeTable/TimeTableHistroy';
import PeriodHistory from './src/Screens/TimeTable/PeriodHistory';
import StudentTestDetail from './src/Screens/MCQs/StudentTestDetail';
import Chat from './src/Screens/Chats/Chat';
import ChatDetail from './src/Screens/Chats/ChatDetail';
import PhoneCall from './src/Screens/Chats/PhoneCall';
import VideoCall from './src/Screens/Chats/VideoCall';
import UserDetails from './src/Screens/Chats/UserDetails';
import Images from './src/Screens/Chats/Images';
import GroupUserDetail from './src/Screens/Chats/GroupUserDetail';
import UserProfile from './src/Screens/Chats/UserProfile';
import AttendRegisterHistory from './src/Screens/AttendanceRegister/AttendRegisterHistory';
import AttendRegister from './src/Screens/AttendanceRegister/AttendRegister';
import AttendRegisterDetail from './src/Screens/AttendanceRegister/AttendRegisterDetail';
import TeacherAttendance from './src/Screens/TeacherAttendance/TeacherAttendance';
import TeacherAbsent from './src/Screens/TeacherAttendance/TeacherAbsent';
import TeacherHoliday from './src/Screens/TeacherAttendance/TeacherHoliday';
import TeacherLeaveApply from './src/Screens/TeacherAttendance/TeacherLeaveApply';
import TeacherApplyHistory from './src/Screens/TeacherAttendance/TeacherApplyHistory';
import TeacherLeaveSuccess from './src/Screens/TeacherAttendance/TeacherLeaveSuccess';
import About from './src/Screens/About/About';
import AddExperience from './src/Screens/About/AddExperience';
import AddRewards from './src/Screens/About/AddRewards';
import AddEducation from './src/Screens/About/AddEducation';
import EditExperience from './src/Screens/About/EditExperience';
import EditEducation from './src/Screens/About/EditEducation';
import EditRewards from './src/Screens/About/EditRewards';
import Admin from './src/Screens/Admins/Admin';
import MPINDisable from './src/Screens/Security/MPIN/MPINDisable';
import Notification from './src/Screens/Notification';
import EditTest from './src/Screens/MCQs/EditTest';
import TeacherList from './src/Screens/Admins/TeacherList';
import LibraryBook from './src/Screens/Library/LibraryBook';
import LibraryBookDetail from './src/Screens/Library/LibraryBookDetail';
import AssignedUserDetail from './src/Screens/Library/AssignedUserDetail';
import AddBook from './src/Screens/Library/AddBooks/AddBook';
import AddNewBook from './src/Screens/Library/AddBooks/AddNewBook';
import AddBulkBook from './src/Screens/Library/AddBooks/AddBulkBook';
import DownloadReport from './src/Screens/Library/DownloadReport';
import LectureCarousel from './src/Screens/Lectures/LectureCarousel';
import ReportAtten from './src/Screens/Attendance/ReportAtten';
import ExamAttendance from './src/Screens/Attendance/ExamAttendance/ExamAttendance';
import TakeExamAttendance from './src/Screens/Attendance/ExamAttendance/TakeExamAttendance';
import ExamAttenReport from './src/Screens/Attendance/ExamAttendance/ExamAttenReport';
import MyClassRoomAtten from './src/Screens/Attendance/ExamAttendance/MyClassRoomAtten';
import ClassSubject from './src/Screens/Attendance/ExamAttendance/ClassSubject';
import SubjectReport from './src/Screens/Attendance/ExamAttendance/SubjectReport';
import MySubjectAtten from './src/Screens/Attendance/ExamAttendance/MySubjectAtten';
import UserAssignmentDetail from './src/Screens/Assignments/UserAssignmentDetail';
import UpdateAss from './src/Screens/Assignments/UpdateAss';
import EditEvent from './src/Screens/Events/EditEvent';
import HistoryuserAssignmentDetail from './src/Screens/Assignments/HistoryuserAssignmentDetail';
import {paraGray} from './src/theme/styles/Base';
import CheckMPIN from './src/Screens/Security/MPIN/CheckMPIN';
import ConfirmMPIN from './src/Screens/Security/MPIN/ConfirmMPIN';
import MyAttendance from './src/Screens/TeacherAttendance/MyAttendance';
import AttendanceHistory from './src/Screens/TeacherAttendance/AttendanceHistory';

const HomeStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const BottomStack = createBottomTabNavigator();

function App({navigation}) {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        {/* <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen
            name="HomeDrawer"
            component={BottomNavigator}
            options={{headerShown: false, swipeEnabled: false}}
          />
        </Drawer.Navigator> */}

        <HomeStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            // headerStyle: {
            //   elevation: 0, // Android
            // },
            // headerTintColor: 'black',
            // headerShadowVisible: false,
            // headerTitleStyle: {
            //   fontFamily: 'Montserrat-Regular',
            // },
            // title: 'Home',
            // headerLeft: () => (
            //   <View style={{flexDirection: 'row'}}>
            //     <Icon.Button
            //       name="ios-menu"
            //       size={25}
            //       color="black"
            //       backgroundColor="white"
            //       //onPress={() => navigation.openDrawer()}
            //     />
            //     {/* <Image
            //       source={require('./assets/white-logo.png')}
            //       resizeMode={'contain'}
            //       style={{width: 84, height: 84}}
            //     /> */}
            //   </View>
            // ),
          }}>
          <HomeStack.Screen
            name="Splash"
            component={Splash}
            options={{
              animationEnabled: false,
              headerShown: false,
            }}
          />

          <HomeStack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{
              animationEnabled: false,
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              animationEnabled: false,
              headerShown: false,
            }}
          />

          <HomeStack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{
              animationEnabled: false,
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ForgetPasswordMail"
            component={ForgetPasswordMail}
            options={{
              title: 'Forget Password',
              animationEnabled: false,
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ForgetPasswordNO"
            component={ForgetPasswordNO}
            options={{
              title: 'Forget Password',
              animationEnabled: false,
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Bottomtabs"
            component={BottomNavigator}
            // options={{
            //   //title: 'IntraEdu',
            //   headerLeft: () => (
            //     <View style={{flexDirection: 'row'}}>
            //       <Icon.Button
            //         name="ios-menu"
            //         size={25}
            //         color="black"
            //         backgroundColor="white"
            //         onPress={() => navigation.openDrawer()}
            //       />
            //       <Image
            //         source={require('./assets/white-logo.png')}
            //         resizeMode={'contain'}
            //         style={{width: 84, height: 84}}
            //       />
            //     </View>
            //   ),
            //   headerRight: () => (
            //     <View style={{flexDirection: 'row'}}>
            //       <TouchableOpacity
            //         style={{marginTop: 5, marginRight: 16}}
            //         onPress={() => {
            //           // alert('Feature Coming Soon');
            //           navigation.navigate('Chat');
            //         }}>
            //         <ImageBackground
            //           style={{
            //             backgroundColor: COLORS.bg,
            //             justifyContent: 'center',
            //             alignItems: 'center',
            //             width: 35,
            //             height: 35,
            //             borderRadius: 20,
            //             borderWidth: 1,
            //             borderColor: COLORS.background,
            //           }}>
            //           <Feather
            //             style={{marginRight: 2, marginTop: 3}}
            //             name="send"
            //             size={22}
            //             color={COLORS.black}
            //           />
            //         </ImageBackground>
            //       </TouchableOpacity>
            //       <TouchableOpacity
            //         style={{
            //           marginRight: 4,
            //           justifyContent: 'center',
            //         }}
            //         onPress={() =>
            //           // alert('Feature Coming Soon')}
            //           navigation.navigate('Notification')
            //         }
            //       >
            //         <Feather
            //           style={{ marginTop: 8 }}
            //           name="bell"
            //           size={25}
            //           color={COLORS.black}
            //         />
            //         {Notify !== '0' && (
            //           <View
            //             style={{
            //               backgroundColor: COLORS.bluee,
            //               borderRadius: 20,
            //               height: 20,
            //               width: 20,
            //               justifyContent: 'center',
            //               alignItems: 'center',
            //               marginTop: -33,
            //               marginLeft: 10,
            //           }}>
            //             <Text
            //               style={[
            //                 paraGray.darkpara,
            //                 { color: COLORS.bg, fontSize: 10 },
            //               ]}
            //             >
            //               {Notify}
            //             </Text>
            //           </View>
            //         )}
            //       </TouchableOpacity>
            //       <TouchableOpacity
            //         style={{marginTop: 5}}
            //         onPress={() => {
            //           dispatch(setShowModal(!showmodal));
            //         }}>
            //         {userimage == null ? (
            //           <Avatar.Image
            //             size={35}
            //             source={require('./assets/user.jpg')}
            //           />
            //         ) : (
            //           <Avatar.Image
            //             source={{uri: Url.profile_IMG + userimage}}
            //             size={35}
            //             backgroundColor={COLORS.black}
            //           />
            //         )}
            //       </TouchableOpacity>
            //     </View>
            //   ),
            //   headerShadowVisible: false
            // }}
          />

          <HomeStack.Screen
            name="Student"
            component={Student}
            options={{
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="StudentProfile"
            component={StudentProfile}
            options={{
              title: 'Student Details',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="StudentEdit"
            component={StudentEdit}
            options={{
              title: 'Edit Details',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Info"
            component={Info}
            options={{
              title: 'Add Student',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          {/* <HomeStack.Screen
          name="TabScreen"
          component={TabScreen}
          options={{
            title: 'Add Student',

            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
          }}
        /> */}
          <HomeStack.Screen
            name="Document"
            component={Document}
            options={{
              title: 'Document',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Assign"
            component={Assign}
            options={{
              title: "Book's Assign",

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Collection"
            component={Collection}
            options={{
              title: 'Collection',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryLib"
            component={HistoryLib}
            options={{
              title: "Book's History",

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryDetail"
            component={HistoryDetail}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="Exam"
            component={Exam}
            options={{
              title: 'Exam',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="CreateTest"
            component={CreateTest}
            options={{
              title: 'CreateTest',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ManageTest"
            component={ManageTest}
            options={{
              title: 'ManageTest',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Event"
            component={Event}
            options={{
              title: 'Event',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="CreateEvent"
            component={CreateEvent}
            options={{
              title: 'Create Event',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="EditEvent"
            component={EditEvent}
            options={{
              title: 'Edit Event',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryEvent"
            component={HistoryEvent}
            options={{
              title: "Event's History",

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="EventDetailHistory"
            component={EventDetailHistory}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="Library"
            component={Library}
            options={{
              title: 'Library',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="LeaveApp"
            component={LeaveApp}
            options={{
              title: 'Leave',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryLeave"
            component={HistoryLeave}
            options={{
              title: 'Leave',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryLeaveDetail"
            component={HistoryLeaveDetail}
            options={{
              title: 'Leave',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Ptm"
            component={Ptm}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="CreateMeeting"
            component={CreateMeeting}
            options={{
              title: 'PTM',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="PTMHistory"
            component={PTMHistory}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="PTMHistoryDetail"
            component={PTMHistoryDetail}
            options={{
              title: 'Exam',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="UpcomingPtm"
            component={UpcomingPtm}
            options={{
              title: 'UpcomingPTM',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="UpcomingDetailPtm"
            component={UpcomingDetailPtm}
            options={{
              title: 'UpcomingPTM',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="AttendancePtm"
            component={AttendancePtm}
            options={{
              title: 'Attendance',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Announcement"
            component={Announcement}
            options={{
              title: 'Notice',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryAnnouncement"
            component={HistoryAnnouncement}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryDetailAnn"
            component={HistoryDetailAnn}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="CreateAnnouncement"
            component={CreateAnnouncement}
            options={{
              title: 'Create',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Lecture"
            component={Lecture}
            options={{
              title: 'Lecture',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="CreateLecture"
            component={CreateLecture}
            options={{
              title: 'Lecture',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="LectureCarousel"
            component={LectureCarousel}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="UpComingLecture"
            component={UpComingLecture}
            options={{
              title: 'UpComingLecture',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="UpdateLecture"
            component={UpdateLecture}
            options={{
              title: 'UpComingLecture',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="UpComingDetailLecture"
            component={UpComingDetailLecture}
            options={{
              title: 'UpComingLecture',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryLecture"
            component={HistoryLecture}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="LecHistory"
            component={LecHistory}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="TimeTable"
            component={TimeTable}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="Period"
            component={Period}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="TimeTableHistroy"
            component={TimeTableHistroy}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="PeriodHistory"
            component={PeriodHistory}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="McqTest"
            component={McqTest}
            options={{
              title: 'Test',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="CreateMcqTest"
            component={CreateMcqTest}
            options={{
              title: 'Test',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="EditTest"
            component={EditTest}
            options={{
              title: 'Test',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="SubmittedTest"
            component={SubmittedTest}
            options={{
              title: 'My Test',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="SubmittedDetailTest"
            component={SubmittedDetailTest}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="StudentTestDetail"
            component={StudentTestDetail}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="HistoryTest"
            component={HistoryTest}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryDetailTest"
            component={HistoryDetailTest}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="TestResultMcqs"
            component={TestResultMcqs}
            options={{
              headerShown: false,
            }}
          />

          <HomeStack.Screen
            name="AttendanceShow"
            component={AttendanceShow}
            options={{
              title: 'Attendance',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="TakeAttendance"
            component={TakeAttendance}
            options={{
              title: 'Attendance',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryAttendance"
            component={HistoryAttendance}
            options={{
              headerShown: false,
            }}
          />

          <HomeStack.Screen
            name="HistoryAtten"
            component={HistoryAtten}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ReportAtten"
            component={ReportAtten}
            options={{
              title: 'Report',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ExamAttendance"
            component={ExamAttendance}
            options={{
              title: 'Exam Attendance',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="TakeExamAttendance"
            component={TakeExamAttendance}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="ExamAttenReport"
            component={ExamAttenReport}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="MyClassRoomAtten"
            component={MyClassRoomAtten}
            options={{
              title: 'My Classroom Attendance',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ClassSubject"
            component={ClassSubject}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="SubjectReport"
            component={SubjectReport}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="MySubjectAtten"
            component={MySubjectAtten}
            options={{
              title: 'My Subject Attendance',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />

          <HomeStack.Screen
            name="ReportAttendance"
            component={ReportAttendance}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Assignment"
            component={Assignment}
            options={{
              title: 'Assignment',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="CreateAss"
            component={CreateAss}
            options={{
              title: 'Create',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="UserAssignmentDetail"
            component={UserAssignmentDetail}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="UpdateAss"
            component={UpdateAss}
            options={{
              title: 'Edit Assignment',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="SubmittedAss"
            component={SubmittedAss}
            options={{
              title: 'My Assigment',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="SubmittedDetailAss"
            component={SubmittedDetailAss}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="HistoryAss"
            component={HistoryAss}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryDetailAss"
            component={HistoryDetailAss}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="HistoryuserAssignmentDetail"
            component={HistoryuserAssignmentDetail}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="Youtube"
            component={Youtube}
            options={{
              title: 'Youtube',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ShareYtube"
            component={ShareYtube}
            options={{
              title: 'Share',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryYtube"
            component={HistoryYtube}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="BookDetail"
            component={BookDetail}
            options={{
              title: "Book's Assign",

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="AssignBook"
            component={AssignBook}
            options={{
              title: "Book's Assign",

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="CollectionDetail"
            component={CollectionDetail}
            options={{
              title: 'Collection',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="FeesTransaction"
            component={FeesTransaction}
            options={{
              title: 'FeesTransaction',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="UserTrans"
            component={UserTrans}
            options={{
              title: 'FeesTransaction',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="FeesDetail"
            component={FeesDetail}
            options={{
              title: 'FeesTransaction',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryTrans"
            component={HistoryTrans}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryTransDetail"
            component={HistoryTransDetail}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="FeeUserDetail"
            component={FeeUserDetail}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="StudentClient"
            component={StudentClient}
            options={{
              title: 'StudentClient',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ApplyLeave"
            component={ApplyLeave}
            options={{
              title: 'Apply',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="LeaveStudent"
            component={LeaveStudent}
            options={{
              title: 'Leave Application',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryLeaveStudent"
            component={HistoryLeaveStudent}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryLeaveDetailStudent"
            component={HistoryLeaveDetailStudent}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="StudentLibrary"
            component={StudentLibrary}
            options={{
              title: 'Library',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="StudentBookAssigned"
            component={StudentBookAssigned}
            options={{
              title: "Book's Assign",

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="StudentLibHistory"
            component={StudentLibHistory}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="LibraryBook"
            component={LibraryBook}
            options={{
              title: 'Library books',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="LibraryBookDetail"
            component={LibraryBookDetail}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="AddBook"
            component={AddBook}
            options={{
              title: 'Add Books',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="AddNewBook"
            component={AddNewBook}
            options={{
              title: 'Add Books',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="AddBulkBook"
            component={AddBulkBook}
            options={{
              title: 'Bulk Add Books',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="DownloadReport"
            component={DownloadReport}
            options={{
              title: 'Download Report',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="AssignedUserDetail"
            component={AssignedUserDetail}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="PTMLecture"
            component={PTMLecture}
            options={{
              title: 'PTM/Lecture',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="UpcomingPtmLec"
            component={UpcomingPtmLec}
            options={{
              title: 'Upcoming',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="HistoryPtmLec"
            component={HistoryPtmLec}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="StudentAttendance"
            component={StudentAttendance}
            options={{
              title: 'Attendance',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="StudentAttendanceShow"
            component={StudentAttendanceShow}
            options={{
              title: 'Attendance',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="StudentYoutube"
            component={StudentYoutube}
            options={{
              title: 'Youtube',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="StudentEvent"
            component={StudentEvent}
            options={{
              title: 'Event',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="StudentNewEvent"
            component={StudentNewEvent}
            options={{
              title: 'New Event',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="StudentEventDetail"
            component={StudentEventDetail}
            options={{
              title: 'New Event',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Feeds"
            component={Feeds}
            options={{
              title: 'Feeds',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />

          <HomeStack.Screen
            name="Certificate"
            component={Certificate}
            options={{
              title: 'Certificate',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />

          <HomeStack.Screen
            name="ProvideCertificate"
            component={ProvideCertificate}
            options={{
              title: 'Provide Certificate',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="CertificateHistory"
            component={CertificateHistory}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="CertificateHistoryDetail"
            component={CertificateHistoryDetail}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="StudyMaterial"
            component={StudyMaterial}
            options={{
              title: 'Study Material',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ShareVideo"
            component={ShareVideo}
            options={{
              title: 'Share Video',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{marginTop: 5}}
                    onPress={() => {
                      navigation.navigate('AddVideo');
                    }}>
                    <AntDesign name="pluscircle" size={25} color={COLORS.bg} />
                  </TouchableOpacity>
                </View>
              ),
            }}
          />
          <HomeStack.Screen
            name="AddVideo"
            component={AddVideo}
            options={{
              title: 'Post Video',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ShareDocument"
            component={ShareDocument}
            options={{
              title: 'Share Document',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{marginTop: 5}}
                    onPress={() => {
                      navigation.navigate('AddDocument');
                    }}>
                    <AntDesign name="pluscircle" size={25} color={COLORS.bg} />
                  </TouchableOpacity>
                </View>
              ),
            }}
          />
          <HomeStack.Screen
            name="AddDocument"
            component={AddDocument}
            options={{
              title: 'Post Files  ',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ShareImage"
            component={ShareImage}
            options={{
              title: 'Share Image',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{marginTop: 5}}
                    onPress={() => {
                      navigation.navigate('AddMaterialImage');
                    }}>
                    <AntDesign name="pluscircle" size={25} color={COLORS.bg} />
                  </TouchableOpacity>
                </View>
              ),
            }}
          />
          <HomeStack.Screen
            name="AddMaterialImage"
            component={AddMaterialImage}
            options={{
              title: 'Post Image',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ShareLink"
            component={ShareLink}
            options={{
              title: 'Share Link',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{marginTop: 5}}
                    onPress={() => {
                      navigation.navigate('AddLink');
                    }}>
                    <AntDesign name="pluscircle" size={25} color={COLORS.bg} />
                  </TouchableOpacity>
                </View>
              ),
            }}
          />
          <HomeStack.Screen
            name="AddLink"
            component={AddLink}
            options={{
              title: 'Post Link',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Result"
            component={Result}
            options={{
              title: 'Result',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ClassRoomResult"
            component={ClassRoomResult}
            options={{
              title: 'My Classroom Result',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ClassResult"
            component={ClassResult}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="MarksAllotement"
            component={MarksAllotement}
            options={{
              title: 'Give Marks',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="AllotementDetail"
            component={AllotementDetail}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="Request"
            component={Request}
            options={{
              title: 'Request Access',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="RequestAccess"
            component={RequestAccess}
            options={{
              title: 'Request Access',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="RequestDetail"
            component={RequestDetail}
            options={{
              title: 'Request Access',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="RequestHistory"
            component={RequestHistory}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="RequestHistoryDetail"
            component={RequestHistoryDetail}
            options={{
              title: 'History',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Gallery"
            component={Gallery}
            options={{
              title: 'Gallery',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{marginTop: 5}}
                    onPress={() => {
                      navigation.navigate('AddImage');
                    }}>
                    <AntDesign name="pluscircle" size={25} color={COLORS.bg} />
                  </TouchableOpacity>
                </View>
              ),
            }}
          />
          <HomeStack.Screen
            name="AddImage"
            component={AddImage}
            options={{
              title: 'New Post',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ImageDetail"
            component={ImageDetail}
            options={{
              title: 'Gallery',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />

          <HomeStack.Screen
            name="LeaveRequest"
            component={LeaveRequest}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="Settings"
            component={Settings}
            options={{
              title: 'Settings',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="TeachersProfile"
            component={TeachersProfile}
            options={{
              title: 'My Profile',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Security"
            component={Security}
            options={{
              title: 'Security',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="CreateMPIN"
            component={CreateMPIN}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="ChangeMPIN"
            component={ChangeMPIN}
            options={{
              title: 'Change MPIN',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ConfirmMPIN"
            component={ConfirmMPIN}
            options={{
              title: 'Change MPIN',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="MPINSet"
            component={MPINSet}
            options={{
              title: 'MPIN',
              headerShown: false,
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="MPINVerification"
            component={MPINVerification}
            options={{
              title: 'MPIN',
              headerShown: false,
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="MPINDisable"
            component={MPINDisable}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="ForgetPIN"
            component={ForgetPIN}
            options={{
              title: 'Forget MPIN',
              headerShown: false,
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ForgetMPIN"
            component={ForgetMPIN}
            options={{
              title: 'Forget MPIN',
              headerShown: false,
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Complaint"
            component={Complaint}
            options={{
              title: 'Complaint',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="AssignComplaint"
            component={AssignComplaint}
            options={{
              title: 'Complaint',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="CreateComplaint"
            component={CreateComplaint}
            options={{
              title: 'Complaint',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="ComplaintHistory"
            component={ComplaintHistory}
            options={{
              title: 'History',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="PayRoll"
            component={PayRoll}
            options={{
              title: 'Payroll',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="SalarySlip"
            component={SalarySlip}
            options={{
              title: 'Salary Slip',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="AdvanceSalary"
            component={AdvanceSalary}
            options={{
              title: 'Advance Salary',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="Chat"
            component={Chat}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="ChatDetail"
            component={ChatDetail}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="PhoneCall"
            component={PhoneCall}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="VideoCall"
            component={VideoCall}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="UserDetails"
            component={UserDetails}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="Images"
            component={Images}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="GroupUserDetail"
            component={GroupUserDetail}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="AttendRegister"
            component={AttendRegister}
            options={{
              title: 'Attendance Register',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="AttendRegisterDetail"
            component={AttendRegisterDetail}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="AttendRegisterHistory"
            component={AttendRegisterHistory}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="TeacherAttendance"
            component={TeacherAttendance}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="MyAttendance"
            component={MyAttendance}
            options={{
              title: 'Attendance',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <HomeStack.Screen
            name="AttendanceHistory"
            component={AttendanceHistory}
            options={{
              title: 'Attendance',

              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />

          <HomeStack.Screen
            name="TeacherAbsent"
            component={TeacherAbsent}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="TeacherHoliday"
            component={TeacherHoliday}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="TeacherLeaveApply"
            component={TeacherLeaveApply}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="TeacherApplyHistory"
            component={TeacherApplyHistory}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="TeacherLeaveSuccess"
            component={TeacherLeaveSuccess}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="About"
            component={About}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="AddExperience"
            component={AddExperience}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="EditExperience"
            component={EditExperience}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="AddEducation"
            component={AddEducation}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="EditEducation"
            component={EditEducation}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="AddRewards"
            component={AddRewards}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="EditRewards"
            component={EditRewards}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="Admin"
            component={Admin}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="TeacherList"
            component={TeacherList}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="Notification"
            component={Notification}
            options={{
              headerShown: false,
            }}
          />
        </HomeStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

// const DrawerStack =()=> {
//   return (
//     <DrawerStack.Navigator drawerContent={props => <DrawerContent {...props} />}>
//       <DrawerStack.Screen name='BottomNavigator' component={BottomNavigator} />
//     </DrawerStack.Navigator>
//   );
// }

const BottomNavigator = ({navigation}) => {
  const dispatch = useDispatch();
  const {username, userimage} = useSelector(state => state.userReducer);
  useEffect(() => {
    StoreDatas();
  }, []);
  const StoreDatas = async () => {
    try {
      const user_Id = await AsyncStorage.getItem('user_id');
      const user_name = await AsyncStorage.getItem('user_name');
      const user_image = await AsyncStorage.getItem('user_image');
      dispatch(setuserId(user_Id));
      dispatch(setuserName(user_name));
      dispatch(setuserImage(user_image));
    } catch (error) {
      console.log('Catch' + error);
    }
  };

  return (
    <BottomStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        //headerShown: false,
        // tabBarInactiveTintColor: 'green',
        // tabBarActiveTintColor: 'red',
        //title: `👋 Hi, ${username}`,
        tabBarStyle: {
          paddingTop: 12,
          paddingBottom: 8,
          height: 56,
        },
        headerTitle: '',
        headerStyle: {backgroundColor: '#FEFDF8', borderWidth: 0, elevation: 0},
        headerStatusBarHeight: 8,
        headerLeft: () => (
          <View style={{flexDirection: 'row', paddingLeft: 20}}>
            {/* <Icon.Button
              name="ios-menu"
              size={25}
              color="black"
              backgroundColor="white"
              //onPress={() => navigation.openDrawer()}
            /> */}
            {/* <Text style={[paraGray.largebold, {fontSize: 14}]}>👋 Hi, {username}</Text> */}
            <Image
              source={require('./assets/Black_Blue_Logo.png')}
              resizeMode={'contain'}
              style={{width: 64, height: 64}}
            />
          </View>
        ),
        headerRight: () => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginTop: 5, marginRight: 20}}
              onPress={() => {
                // alert('Feature Coming Soon');
                navigation.navigate('Chat');
              }}>
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
                <Feather
                  style={{marginRight: 2, marginTop: 3}}
                  name="send"
                  size={22}
                  color={COLORS.black}
                />
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginRight: 16,
                justifyContent: 'center',
              }}
              onPress={() =>
                // alert('Feature Coming Soon')}
                navigation.navigate('Notification')
              }>
              <Feather
                style={{marginTop: 8}}
                name="bell"
                size={25}
                color={COLORS.black}
              />
              {/* {Notify !== '0' && (
                <View
                  style={{
                    backgroundColor: COLORS.bluee,
                    borderRadius: 20,
                    height: 20,
                    width: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -33,
                    marginLeft: 10,
                }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      { color: COLORS.bg, fontSize: 10 },
                    ]}
                  >
                    {Notify}
                  </Text>
                </View>
              )} */}
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{marginTop: 5}}
              onPress={() => {
                dispatch(setShowModal(!showmodal));
              }}>
              {userimage == null ? (
                <Avatar.Image
                  size={35}
                  source={require('./assets/user.jpg')}
                />
              ) : (
                <Avatar.Image
                  source={{uri: Url.profile_IMG + userimage}}
                  size={35}
                  backgroundColor={COLORS.black}
                />
              )}
            </TouchableOpacity> */}
          </View>
        ),
      }}>
      <BottomStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <AntDesign
              name="home"
              size={focused ? 28 : 26}
              color={focused ? COLORS.primary : COLORS.black}
            />
          ),
          tabBarLabelStyle: {fontSize: 14, fontFamily: 'Montserrat-Medium'},
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? COLORS.primary : COLORS.black}}>
              {' '}
              Home{' '}
            </Text>
          ),
        }}
      />
      <BottomStack.Screen
        name="Students"
        component={Student}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <AntDesign
              name="contacts"
              size={focused ? 28 : 26}
              color={focused ? COLORS.primary : COLORS.black}
            />
          ),
          tabBarLabelStyle: {fontSize: 14, fontFamily: 'Montserrat-Medium'},
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? COLORS.primary : COLORS.black}}>
              {' '}
              Students{' '}
            </Text>
          ),
        }}
      />
      <BottomStack.Screen
        name="Events"
        component={Event}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <AntDesign
              name="staro"
              size={focused ? 28 : 26}
              color={focused ? COLORS.primary : COLORS.black}
            />
          ),
          tabBarLabelStyle: {fontSize: 14, fontFamily: 'Montserrat-Medium'},
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? COLORS.primary : COLORS.black}}>
              {' '}
              Events{' '}
            </Text>
          ),
        }}
      />
      <BottomStack.Screen
        name="Profile"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            // <AntDesign name="user" size={24} color={COLORS.black}/>
            // { userimage === null ? (
            //   <Avatar.Image
            //     size={24}
            //     source={require('./assets/Attendance.png')}
            //   />
            // ) : (
            <Avatar.Image
              source={{uri: Url.profile_IMG + userimage}}
              size={focused ? 30 : 28}
              backgroundColor={COLORS.black}
            />
          ),
          // )}
          tabBarShowLabel: false,
          tabBarLabelStyle: {fontSize: 14, fontFamily: 'Montserrat-Medium'},
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? COLORS.primary : COLORS.black}}>
              {' '}
              Profile{' '}
            </Text>
          ),
        }}
      />
    </BottomStack.Navigator>
  );
};

const HomeStackScreen = ({navigation}) => {
  // const dispatch = useDispatch();

  // const {userinfo, userid, username, showmodal, userimage} = useSelector(
  //   state => state.userReducer,
  // );
  // useEffect(() => {
  //   StoreDatas();
  // }, []);
  // const StoreDatas = async () => {
  //   try {
  //     const user_Id = await AsyncStorage.getItem('user_id');
  //     const user_name = await AsyncStorage.getItem('user_name');
  //     const user_image = await AsyncStorage.getItem('user_image');
  //     dispatch(setuserId(user_Id));
  //     dispatch(setuserName(user_name));
  //     dispatch(setuserImage(user_image));
  //   } catch (error) {
  //     console.log('Catch' + error);
  //   }
  // };

  return (
    <HomeStack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: {
          elevation: 0, // Android
        },
        headerTintColor: 'black',

        headerTitleStyle: {
          fontFamily: 'Montserrat-Light',
        },
      }}>
      <HomeStack.Screen
        name="Splash"
        component={Splash}
        options={{
          animationEnabled: false,
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{
          animationEnabled: false,
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          animationEnabled: false,
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          animationEnabled: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ForgetPasswordMail"
        component={ForgetPasswordMail}
        options={{
          title: 'Forget Password',
          animationEnabled: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ForgetPasswordNO"
        component={ForgetPasswordNO}
        options={{
          title: 'Forget Password',
          animationEnabled: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        //name="Home"
        name="klpd"
        component={HomeScreen}
        options={{
          //title: 'IntraEdu',
          headerLeft: () => (
            <View style={{flexDirection: 'row'}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color="black"
                backgroundColor="white"
                onPress={() => navigation.openDrawer()}
              />
              {/* <Image
                source={require('./assets/white-logo.png')}
                resizeMode={'contain'}
                style={{width: 84, height: 84}}
              /> */}
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{marginTop: 5, marginRight: 16}}
                onPress={() => {
                  // alert('Feature Coming Soon');
                  navigation.navigate('Chat');
                }}>
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
                  <Feather
                    style={{marginRight: 2, marginTop: 3}}
                    name="send"
                    size={22}
                    color={COLORS.black}
                  />
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginRight: 4,
                  justifyContent: 'center',
                }}
                onPress={() =>
                  // alert('Feature Coming Soon')}
                  navigation.navigate('Notification')
                }>
                <Feather
                  style={{marginTop: 8}}
                  name="bell"
                  size={25}
                  color={COLORS.black}
                />
                {/* {Notify !== '0' && (
                  <View
                    style={{
                      backgroundColor: COLORS.bluee,
                      borderRadius: 20,
                      height: 20,
                      width: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: -33,
                      marginLeft: 10,
                  }}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        { color: COLORS.bg, fontSize: 10 },
                      ]}
                    >
                      {Notify}
                    </Text>
                  </View>
                )} */}
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{marginTop: 5}}
                onPress={() => {
                  dispatch(setShowModal(!showmodal));
                }}>
                {userimage == null ? (
                  <Avatar.Image
                    size={35}
                    source={require('./assets/user.jpg')}
                  />
                ) : (
                  <Avatar.Image
                    source={{uri: Url.profile_IMG + userimage}}
                    size={35}
                    backgroundColor={COLORS.black}
                  />
                )}
              </TouchableOpacity> */}
            </View>
          ),
          headerShadowVisible: false,
        }}
      />

      {/* <HomeStack.Screen
                name="Bottomtabs"
                component={BottomNavigator}
            /> */}

      <HomeStack.Screen
        name="Student"
        component={Student}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="StudentProfile"
        component={StudentProfile}
        options={{
          title: 'Student Details',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="StudentEdit"
        component={StudentEdit}
        options={{
          title: 'Edit Details',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Info"
        component={Info}
        options={{
          title: 'Add Student',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      {/* <HomeStack.Screen
        name="TabScreen"
        component={TabScreen}
        options={{
          title: 'Add Student',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      /> */}
      <HomeStack.Screen
        name="Document"
        component={Document}
        options={{
          title: 'Document',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Assign"
        component={Assign}
        options={{
          title: "Book's Assign",

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Collection"
        component={Collection}
        options={{
          title: 'Collection',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryLib"
        component={HistoryLib}
        options={{
          title: "Book's History",

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryDetail"
        component={HistoryDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Exam"
        component={Exam}
        options={{
          title: 'Exam',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="CreateTest"
        component={CreateTest}
        options={{
          title: 'CreateTest',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ManageTest"
        component={ManageTest}
        options={{
          title: 'ManageTest',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Event"
        component={Event}
        options={{
          title: 'Event',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{
          title: 'Create Event',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="EditEvent"
        component={EditEvent}
        options={{
          title: 'Edit Event',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryEvent"
        component={HistoryEvent}
        options={{
          title: "Event's History",

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="EventDetailHistory"
        component={EventDetailHistory}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Library"
        component={Library}
        options={{
          title: 'Library',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="LeaveApp"
        component={LeaveApp}
        options={{
          title: 'Leave',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryLeave"
        component={HistoryLeave}
        options={{
          title: 'Leave',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryLeaveDetail"
        component={HistoryLeaveDetail}
        options={{
          title: 'Leave',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Ptm"
        component={Ptm}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="CreateMeeting"
        component={CreateMeeting}
        options={{
          title: 'PTM',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="PTMHistory"
        component={PTMHistory}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="PTMHistoryDetail"
        component={PTMHistoryDetail}
        options={{
          title: 'Exam',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="UpcomingPtm"
        component={UpcomingPtm}
        options={{
          title: 'UpcomingPTM',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="UpcomingDetailPtm"
        component={UpcomingDetailPtm}
        options={{
          title: 'UpcomingPTM',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="AttendancePtm"
        component={AttendancePtm}
        options={{
          title: 'Attendance',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />

      <HomeStack.Screen
        name="Announcement"
        component={Announcement}
        options={{
          title: 'Notice',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryAnnouncement"
        component={HistoryAnnouncement}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryDetailAnn"
        component={HistoryDetailAnn}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="CreateAnnouncement"
        component={CreateAnnouncement}
        options={{
          title: 'Create',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Lecture"
        component={Lecture}
        options={{
          title: 'Lecture',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="CreateLecture"
        component={CreateLecture}
        options={{
          title: 'Lecture',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="LectureCarousel"
        component={LectureCarousel}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="UpComingLecture"
        component={UpComingLecture}
        options={{
          title: 'UpComingLecture',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="UpdateLecture"
        component={UpdateLecture}
        options={{
          title: 'UpComingLecture',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="UpComingDetailLecture"
        component={UpComingDetailLecture}
        options={{
          title: 'UpComingLecture',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryLecture"
        component={HistoryLecture}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="LecHistory"
        component={LecHistory}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TimeTable"
        component={TimeTable}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Period"
        component={Period}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TimeTableHistroy"
        component={TimeTableHistroy}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="PeriodHistory"
        component={PeriodHistory}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="McqTest"
        component={McqTest}
        options={{
          title: 'Test',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="CreateMcqTest"
        component={CreateMcqTest}
        options={{
          title: 'Test',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="EditTest"
        component={EditTest}
        options={{
          title: 'Test',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="SubmittedTest"
        component={SubmittedTest}
        options={{
          title: 'My Test',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="SubmittedDetailTest"
        component={SubmittedDetailTest}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="StudentTestDetail"
        component={StudentTestDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="HistoryTest"
        component={HistoryTest}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryDetailTest"
        component={HistoryDetailTest}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TestResultMcqs"
        component={TestResultMcqs}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="AttendanceShow"
        component={AttendanceShow}
        options={{
          title: 'Attendance',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="TakeAttendance"
        component={TakeAttendance}
        options={{
          title: 'Attendance',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryAttendance"
        component={HistoryAttendance}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="HistoryAtten"
        component={HistoryAtten}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ReportAtten"
        component={ReportAtten}
        options={{
          title: 'Report',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ExamAttendance"
        component={ExamAttendance}
        options={{
          title: 'Exam Attendance',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="TakeExamAttendance"
        component={TakeExamAttendance}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ExamAttenReport"
        component={ExamAttenReport}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="MyClassRoomAtten"
        component={MyClassRoomAtten}
        options={{
          title: 'My Classroom Attendance',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ClassSubject"
        component={ClassSubject}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="SubjectReport"
        component={SubjectReport}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="MySubjectAtten"
        component={MySubjectAtten}
        options={{
          title: 'My Subject Attendance',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />

      <HomeStack.Screen
        name="ReportAttendance"
        component={ReportAttendance}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Assignment"
        component={Assignment}
        options={{
          title: 'Assignment',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="CreateAss"
        component={CreateAss}
        options={{
          title: 'Create',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="UserAssignmentDetail"
        component={UserAssignmentDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="UpdateAss"
        component={UpdateAss}
        options={{
          title: 'Edit Assignment',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="SubmittedAss"
        component={SubmittedAss}
        options={{
          title: 'My Assigment',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="SubmittedDetailAss"
        component={SubmittedDetailAss}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="HistoryAss"
        component={HistoryAss}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryDetailAss"
        component={HistoryDetailAss}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="HistoryuserAssignmentDetail"
        component={HistoryuserAssignmentDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Youtube"
        component={Youtube}
        options={{
          title: 'Youtube',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ShareYtube"
        component={ShareYtube}
        options={{
          title: 'Share',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryYtube"
        component={HistoryYtube}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{
          title: "Book's Assign",

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="AssignBook"
        component={AssignBook}
        options={{
          title: "Book's Assign",

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="CollectionDetail"
        component={CollectionDetail}
        options={{
          title: 'Collection',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="FeesTransaction"
        component={FeesTransaction}
        options={{
          title: 'FeesTransaction',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="UserTrans"
        component={UserTrans}
        options={{
          title: 'FeesTransaction',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="FeesDetail"
        component={FeesDetail}
        options={{
          title: 'FeesTransaction',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryTrans"
        component={HistoryTrans}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryTransDetail"
        component={HistoryTransDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="FeeUserDetail"
        component={FeeUserDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="StudentClient"
        component={StudentClient}
        options={{
          title: 'StudentClient',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ApplyLeave"
        component={ApplyLeave}
        options={{
          title: 'Apply',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="LeaveStudent"
        component={LeaveStudent}
        options={{
          title: 'Leave Application',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryLeaveStudent"
        component={HistoryLeaveStudent}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryLeaveDetailStudent"
        component={HistoryLeaveDetailStudent}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="StudentLibrary"
        component={StudentLibrary}
        options={{
          title: 'Library',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="StudentBookAssigned"
        component={StudentBookAssigned}
        options={{
          title: "Book's Assign",

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="StudentLibHistory"
        component={StudentLibHistory}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="LibraryBook"
        component={LibraryBook}
        options={{
          title: 'Library books',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="LibraryBookDetail"
        component={LibraryBookDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AddBook"
        component={AddBook}
        options={{
          title: 'Add Books',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="AddNewBook"
        component={AddNewBook}
        options={{
          title: 'Add Books',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="AddBulkBook"
        component={AddBulkBook}
        options={{
          title: 'Bulk Add Books',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="DownloadReport"
        component={DownloadReport}
        options={{
          title: 'Download Report',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="AssignedUserDetail"
        component={AssignedUserDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="PTMLecture"
        component={PTMLecture}
        options={{
          title: 'PTM/Lecture',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="UpcomingPtmLec"
        component={UpcomingPtmLec}
        options={{
          title: 'Upcoming',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HistoryPtmLec"
        component={HistoryPtmLec}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="StudentAttendance"
        component={StudentAttendance}
        options={{
          title: 'Attendance',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="StudentAttendanceShow"
        component={StudentAttendanceShow}
        options={{
          title: 'Attendance',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="StudentYoutube"
        component={StudentYoutube}
        options={{
          title: 'Youtube',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="StudentEvent"
        component={StudentEvent}
        options={{
          title: 'Event',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="StudentNewEvent"
        component={StudentNewEvent}
        options={{
          title: 'New Event',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="StudentEventDetail"
        component={StudentEventDetail}
        options={{
          title: 'New Event',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Feeds"
        component={Feeds}
        options={{
          title: 'Feeds',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />

      <HomeStack.Screen
        name="Certificate"
        component={Certificate}
        options={{
          title: 'Certificate',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />

      <HomeStack.Screen
        name="ProvideCertificate"
        component={ProvideCertificate}
        options={{
          title: 'Provide Certificate',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="CertificateHistory"
        component={CertificateHistory}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="CertificateHistoryDetail"
        component={CertificateHistoryDetail}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="StudyMaterial"
        component={StudyMaterial}
        options={{
          title: 'Study Material',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ShareVideo"
        component={ShareVideo}
        options={{
          title: 'Share Video',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{marginTop: 5}}
                onPress={() => {
                  navigation.navigate('AddVideo');
                }}>
                <AntDesign name="pluscircle" size={25} color={COLORS.bg} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="AddVideo"
        component={AddVideo}
        options={{
          title: 'Post Video',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ShareDocument"
        component={ShareDocument}
        options={{
          title: 'Share Document',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{marginTop: 5}}
                onPress={() => {
                  navigation.navigate('AddDocument');
                }}>
                <AntDesign name="pluscircle" size={25} color={COLORS.bg} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="AddDocument"
        component={AddDocument}
        options={{
          title: 'Post Files  ',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ShareImage"
        component={ShareImage}
        options={{
          title: 'Share Image',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{marginTop: 5}}
                onPress={() => {
                  navigation.navigate('AddMaterialImage');
                }}>
                <AntDesign name="pluscircle" size={25} color={COLORS.bg} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="AddMaterialImage"
        component={AddMaterialImage}
        options={{
          title: 'Post Image',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ShareLink"
        component={ShareLink}
        options={{
          title: 'Share Link',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{marginTop: 5}}
                onPress={() => {
                  navigation.navigate('AddLink');
                }}>
                <AntDesign name="pluscircle" size={25} color={COLORS.bg} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="AddLink"
        component={AddLink}
        options={{
          title: 'Post Link',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Result"
        component={Result}
        options={{
          title: 'Result',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ClassRoomResult"
        component={ClassRoomResult}
        options={{
          title: 'My Classroom Result',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ClassResult"
        component={ClassResult}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="MarksAllotement"
        component={MarksAllotement}
        options={{
          title: 'Give Marks',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="AllotementDetail"
        component={AllotementDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Request"
        component={Request}
        options={{
          title: 'Request Access',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="RequestAccess"
        component={RequestAccess}
        options={{
          title: 'Request Access',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="RequestDetail"
        component={RequestDetail}
        options={{
          title: 'Request Access',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="RequestHistory"
        component={RequestHistory}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="RequestHistoryDetail"
        component={RequestHistoryDetail}
        options={{
          title: 'History',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          title: 'Gallery',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{marginTop: 5}}
                onPress={() => {
                  navigation.navigate('AddImage');
                }}>
                <AntDesign name="pluscircle" size={25} color={COLORS.bg} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="AddImage"
        component={AddImage}
        options={{
          title: 'New Post',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ImageDetail"
        component={ImageDetail}
        options={{
          title: 'Gallery',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />

      <HomeStack.Screen
        name="LeaveRequest"
        component={LeaveRequest}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="TeachersProfile"
        component={TeachersProfile}
        options={{
          title: 'My Profile',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Security"
        component={Security}
        options={{
          title: 'Security',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="CreateMPIN"
        component={CreateMPIN}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ChangeMPIN"
        component={ChangeMPIN}
        options={{
          title: 'Change MPIN',

          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="MPINSet"
        component={MPINSet}
        options={{
          title: 'MPIN',
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="MPINVerification"
        component={MPINVerification}
        options={{
          title: 'MPIN',
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="MPINDisable"
        component={MPINDisable}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ForgetPIN"
        component={ForgetPIN}
        options={{
          title: 'Forget MPIN',
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ForgetMPIN"
        component={ForgetMPIN}
        options={{
          title: 'Forget MPIN',
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Complaint"
        component={Complaint}
        options={{
          title: 'Complaint',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="AssignComplaint"
        component={AssignComplaint}
        options={{
          title: 'Complaint',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="CreateComplaint"
        component={CreateComplaint}
        options={{
          title: 'Complaint',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="ComplaintHistory"
        component={ComplaintHistory}
        options={{
          title: 'History',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="PayRoll"
        component={PayRoll}
        options={{
          title: 'Payroll',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="SalarySlip"
        component={SalarySlip}
        options={{
          title: 'Salary Slip',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="AdvanceSalary"
        component={AdvanceSalary}
        options={{
          title: 'Advance Salary',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ChatDetail"
        component={ChatDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="PhoneCall"
        component={PhoneCall}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="VideoCall"
        component={VideoCall}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Images"
        component={Images}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="GroupUserDetail"
        component={GroupUserDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AttendRegister"
        component={AttendRegister}
        options={{
          title: 'Attendance Register',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="AttendRegisterDetail"
        component={AttendRegisterDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AttendRegisterHistory"
        component={AttendRegisterHistory}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TeacherAttendance"
        component={TeacherAttendance}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TeacherAbsent"
        component={TeacherAbsent}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TeacherHoliday"
        component={TeacherHoliday}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TeacherLeaveApply"
        component={TeacherLeaveApply}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TeacherApplyHistory"
        component={TeacherApplyHistory}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TeacherLeaveSuccess"
        component={TeacherLeaveSuccess}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AddExperience"
        component={AddExperience}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="EditExperience"
        component={EditExperience}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AddEducation"
        component={AddEducation}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="EditEducation"
        component={EditEducation}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AddRewards"
        component={AddRewards}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="EditRewards"
        component={EditRewards}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Admin"
        component={Admin}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

//  -------------Student Tab bar-----------------
// const TabScreen = ({navigation}) => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="Info"
//         component={Info}
//         options={{
//           tabBarLabelStyle: {
//             fontSize: 15,
//             fontFamily: 'Montserrat-SemiBold',
//           },
//         }}
//       />
//       {/* <Tab.Screen name="Courses" component={Courses} /> */}
//     </Tab.Navigator>
//   );
// };
