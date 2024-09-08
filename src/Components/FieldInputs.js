import {View, TextInput} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/Colors';

const FieldInputs = ({
  placeholder,
  placeholderTextColor,
  value,
  onChangeText,
  styles,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      value={value}
      onChangeText={onChangeText}
      style={
        styles
          ? [
              {
                color: '#000000',
                fontFamily: 'Montserrat-Medium',
                fontSize: 14,
                // marginLeft: 12,
                backgroundColor: COLORS.white,
                width: '100%',
                paddingHorizontal: 10,
                //height: 50,
                paddingVertical: 11,
                borderColor: COLORS.primary,
                //borderColor: '#000000',
                //alignSelf: 'center',
                borderWidth: 0.6,
                marginTop: 15,
                borderRadius: 12,
              },
              styles,
            ]
          : {
              color: '#000000',
              fontFamily: 'Montserrat-Medium',
              fontSize: 14,
              // marginLeft: 12,
              backgroundColor: COLORS.white,
              width: '100%',
              paddingHorizontal: 10,
              //height: 50,
              paddingVertical: 11,
              borderColor: COLORS.primary,
              //borderColor: '#000000',
              //alignSelf: 'center',
              borderWidth: 0.6,
              marginTop: 15,
              borderRadius: 12,
            }
      }
    />
  );
};

export default FieldInputs;
