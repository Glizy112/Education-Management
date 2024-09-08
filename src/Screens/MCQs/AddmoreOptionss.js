import React, { useState } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import { Switch } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/Colors';
import AddmoreOptions from './AddmoreOptions';
import { setMcqs } from '../../Redux/Actions/actions';
import { useDispatch } from 'react-redux';

const AddmoreOptionss = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState([{ key: '', value: ''}]);

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({ key: '', value: '' });
    setInputs(_inputs);
  };

  const inputHandler = (text, key, value) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setInputs(_inputs);
    dispatch(setMcqs(inputs));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {inputs.map((input, key) => (
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingHorizontal: 15,
              alignItems: 'center',
            }}>
            <View style={styles.txtbox}>
              <TextInput
                placeholder={'ENTER QUESTION HERE'}
                placeholderTextColor="#808080"
                value={input.value}
                onChangeText={text => inputHandler(text, key)}
                style={{
                  backgroundColor: '#FFFFFF',
                  width: '100%',
                  height: 40,
                  fontSize: 13,
                  fontFamily: 'Montserrat-Regular',
                }}
              />
            </View>
          </View>
          <AddmoreOptions />
        </View>
      ))}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#E5E5E5',
          width: '80%',
          height: 50,
          borderColor: '#E5E5E5',
          alignSelf: 'center',
          borderWidth: 0,
          marginTop: 20,
          marginBottom: 20,
          bottom: 0,
          borderRadius: 5,
          justifyContent: 'center',
          // elevation: 3,
        }}
        activeOpacity={0.8}
        // disabled={this.state.disabled}
        onPress={addHandler}>
        <Text
          style={{
            color: '#000000',
            fontSize: 17,
            fontFamily: 'Montserrat-SemiBold',
          }}>
          ADD More Questions
          <MaterialCommunityIcons name="plus" size={18} color="#000000" />
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddmoreOptionss;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  txtbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '95%',
    height: 50,
    borderColor: '#D3D3D3',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
    marginLeft: 5,
  },
  txtboxDesc: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 80,
    borderColor: '#D3D3D3',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
  },
  formtxt: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: -10,
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  labeltxt: {
    color: '#000000',
    marginLeft: 15,
    marginTop: 10,
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
});
