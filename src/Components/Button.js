import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/Colors';

const Button = ({title, styles}) => {
  return (
    <View>
      <View
        style={
          styles
            ? [
                {
                  alignItems: 'center',
                  backgroundColor: COLORS.primary,
                  width: '80%',
                  //height: 56,
                  paddingVertical: 18,
                  //alignSelf: 'center',
                  marginTop: 16,
                  justifyContent: 'center',
                  marginBottom: 30,
                  borderRadius: 12,
                },
                styles,
              ]
            : {
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                width: '80%',
                //height: 56,
                paddingVertical: 18,
                //alignSelf: 'center',
                marginTop: 16,
                justifyContent: 'center',
                marginBottom: 30,
                borderRadius: 12,
              }
        }>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 15,
            fontFamily: 'Montserrat-SemiBold',
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Button;
