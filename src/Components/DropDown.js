import {View, Text} from 'react-native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS} from '../theme/Colors';

const DropDown = ({
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  placeholder,
  style,
  dropDownContaineStyle,
  textStyle,
  onSelectItem,
}) => {
  return (
    <View
      style={{
        marginTop: 5,
        width: '100%',
      }}>
      <DropDownPicker
        onSelectItem={onSelectItem}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={
          style
            ? [
                {
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  width: '100%',

                  paddingHorizontal: 4,
                  //borderColor: '#D3D3D3',
                  borderColor: COLORS.primary,
                  alignSelf: 'center',
                  borderWidth: 0.8,
                  //marginTop: 15,
                  borderRadius: 12,
                  //paddingHorizontal: 8,
                },
                style,
              ]
            : [
                {
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  width: '100%',
                  paddingHorizontal: 5,
                  //borderColor: '#D3D3D3',
                  borderColor: COLORS.primary,
                  alignSelf: 'center',
                  borderWidth: 0.8,
                  //marginTop: 15,
                  // paddingLeft: 12,
                  borderRadius: 12,

                  //height: 20,
                },
              ]
        }
        placeholder={placeholder ? placeholder : ''}
        placeholderStyle={{
          color: '#808080',
          // paddingLeft: 4,
          fontSize: 13,
          fontFamily: 'Montserrat-Regular',
        }}
        dropDownDirection="BOTTOM"
        dropDownContainerStyle={
          dropDownContaineStyle
            ? [
                {
                  width: '100%',
                  alignSelf: 'center',
                  borderColor: COLORS.primary,
                },
                dropDownContaineStyle,
              ]
            : {
                width: '100%',
                alignSelf: 'center',
                borderColor: COLORS.primary,
                //height: 40,
              }
        }
        textStyle={
          textStyle
            ? [
                {
                  fontSize: 13,
                  color: '#000000',
                  fontFamily: 'Montserrat-Regular',
                },
                textStyle,
              ]
            : {
                fontSize: 13,
                color: '#000000',
                fontFamily: 'Montserrat-Regular',
              }
        }
      />
    </View>
  );
};

export default DropDown;
