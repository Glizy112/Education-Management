import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  Image,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useSelector, useDispatch} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Url from '../Config/Api/Url';
import {COLORS} from '../theme/Colors';
// import{ AuthContext } from '../components/context';

export function DrawerContent(props) {
  const {userinfo, userid, username, showmodal, useremail, userimage} =
    useSelector(state => state.userReducer);
  //   useEffect(() => {
  // console.log(userimage);
  //   }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#E5E5E5'}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => {
                  props.navigation.navigate('TeachersProfile');
                }}>
                {userimage == null ? (
                  <Avatar.Image
                    size={45}
                    source={require('../../assets/user.jpg')}
                  />
                ) : (
                  <Avatar.Image
                    source={{uri: Url.profile_IMG + userimage}}
                    size={45}
                    backgroundColor={COLORS.black}
                  />
                )}
                <View style={{marginLeft: 15, flexDirection: 'column'}}>
                  <Title style={[styles.title, {width: 150}]} numberOfLines={1}>
                    Hello! {username}
                  </Title>
                  <Caption style={styles.caption}>{useremail}</Caption>
                </View>
              </TouchableOpacity>
              <View>
                <Entypo.Button
                  name="cross"
                  size={25}
                  color="black"
                  backgroundColor="#E5E5E5"
                  onPress={() => props.navigation.closeDrawer()}
                />
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection} />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={26}
                color="#434b56"
              />
            )}
            labelStyle={styles.labelStyle}
            label="Fees Transaction"
            onPress={() => {
              // alert('Feature Coming Soon');
              props.navigation.navigate('FeesTransaction');
            }}
          />

          <DrawerItem
            icon={({color, size}) => (
              <Feather name="book-open" size={26} color="#434b56" />
            )}
            labelStyle={styles.labelStyle}
            label="Lectures"
            onPress={() => {
              props.navigation.navigate('Lecture');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Feather name="pen-tool" size={26} color="#434b56" />
            )}
            labelStyle={styles.labelStyle}
            label="MCQs"
            onPress={() => {
              // alert('Feature Coming Soon');
              props.navigation.navigate('McqTest');
            }}
          />

          <DrawerItem
            icon={({color, size}) => (
              <Entypo name="price-ribbon" color={color} size={size} />
            )}
            labelStyle={styles.labelStyle}
            label="Notice"
            onPress={() => {
              props.navigation.navigate('Announcement');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Ionicons name="document-text" color={color} size={size} />
            )}
            labelStyle={styles.labelStyle}
            label="Assignments"
            onPress={() => {
              // alert('Feature Coming Soon');
              props.navigation.navigate('Assignment');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Entypo name="back-in-time" color={color} size={size} />
            )}
            labelStyle={styles.labelStyle}
            label="TimeTable"
            onPress={() => {
              props.navigation.navigate('TimeTable');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Entypo name="database" color={color} size={size} />
            )}
            labelStyle={styles.labelStyle}
            label="About us"
            onPress={() => {
              Linking.openURL('https://intraedu.in/about');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <AntDesign name="team" color={color} size={size} />
            )}
            labelStyle={styles.labelStyle}
            label="Teachers"
            onPress={() => {
              props.navigation.navigate('TeacherList');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Avatar.Image
                source={require('../../assets/Vector.png')}
                size={25}
                style={{
                  backgroundColor: '#E5E5E5',
                  borderColor: '#E5E5E5',
                  borderWidth: 0,
                  overflow: 'hidden',
                }}
              />
            )}
            labelStyle={styles.labelStyle}
            label="Admins"
            onPress={() => {
              // alert("Feature Coming Soon")
              props.navigation.navigate('Admin');
            }}
          />
          <Drawer.Section style={{marginTop: 10}} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          marginBottom: 10,
          paddingHorizontal: 10,
        }}>
        <DrawerItem
          style={{width: 80}}
          icon={({color, size}) => (
            <Fontisto name="instagram" size={20} color={COLORS.black} />
          )}
          // labelStyle={[paraGray.darkpara, {fontSize: 13}]}
          label=""
          onPress={() => {
            Linking.openURL(
              'https://instagram.com/intraedu?igshid=YmMyMTA2M2Y=',
            ).catch(err => console.error("Couldn't load page", err));
          }}
        />
        <DrawerItem
          style={{width: 80}}
          icon={({color, size}) => (
            <Fontisto name="facebook" size={20} color={COLORS.black} />
          )}
          // labelStyle={[paraGray.darkpara, {fontSize: 13}]}
          label=""
          onPress={() => {
            Linking.openURL('https://www.facebook.com/Intraedu').catch(err =>
              console.error("Couldn't load page", err),
            );
          }}
        />
        <DrawerItem
          style={{width: 50}}
          icon={({color, size}) => (
            <Entypo name="linkedin" size={24} color={COLORS.black} />
          )}
          // labelStyle={[paraGray.darkpara, {fontSize: 13}]}
          label=""
          onPress={() => {
            Linking.openURL('https://www.linkedin.com/company/intraedu/').catch(
              err => console.error("Couldn't load page", err),
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 15,
    marginTop: 3,
    fontFamily: 'Poppins-SemiBold',
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'Montserrat-Regular',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  labelStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    fontSize: 13,
  },
});
