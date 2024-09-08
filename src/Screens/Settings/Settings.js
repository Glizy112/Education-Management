import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {Modal} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

const Settings = props => {
  const [showmodal, setShowModal] = useState(false);
  const [desc, setDesc] = useState('');
  return (
    <View style={[container.container]}>
      <ScrollView>
        <Text
          style={[
            paraGray.darkpara,
            {color: COLORS.section, marginTop: 20, paddingHorizontal: 15},
          ]}>
          Account Settings
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('TeachersProfile');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Profile</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert('Feature Coming Soon');
            // setShowModal(!showmodal);
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>My Classroom Books</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ChangePassword');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Change password</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // alert('Feature Coming Soon');
            props.navigation.navigate('About');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>About</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Security');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Security</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} />
        <Text
          style={[
            paraGray.darkpara,
            {color: COLORS.section, marginTop: 20, paddingHorizontal: 15},
          ]}>
          More
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://intraedu.in/about');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>About us</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://intraedu.in/privacyandpolicy');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Privacy policy</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://intraedu.in/termsandservice');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Terms and conditions</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        visible={showmodal}
        onDismiss={() => setShowModal(false)}
        contentContainerStyle={{
          width: '75%',
          height: 320,
          backgroundColor: COLORS.bg,
          alignSelf: 'center',
          padding: 15,
          borderRadius: 5,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={[paraGray.darkpara]}>My Classroom Books</Text>
        </View>
        <ScrollView style={{flex: 1, marginTop: 10}}>
          <Text style={[paraGray.darkpara]}>Classroom: VI</Text>
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
              marginTop: 10,
              borderRadius: 5,
              fontSize: 13,
              fontFamily: 'Montserrat-Regular',
            }}
            value={desc}
            onChangeText={value => setDesc(value)}
            placeholder="Book Name With Publisher"
          />
        </ScrollView>
        <View
          style={{
            // flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.active,
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
              borderRadius: 10,
            }}>
            <Text style={[paraGray.whitepara, {marginVertical: 4}]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;
const styles = StyleSheet.create({
  arrow: {
    paddingHorizontal: '6%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
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
    marginTop: 20,
    borderBottomColor: COLORS.section,
    borderBottomWidth: 1,
    width: '95%',
  },
});
