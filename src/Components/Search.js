import {View, Text, StyleSheet, TextInput} from 'react-native';
import SearchInput, {createFilter} from 'react-native-search-filter';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {COLORS} from '../theme/Colors';

const Search = ({
  KEYS_TO_FILTERS,
  getdata,
  filter,
  containerStyle,
  iconStyle,
  mainViewStyle,
  style,
  placeholder,
  iconColor,
  placeholderTextColor,
  iconSize,
}) => {
  const [search, setSearch] = useState('');

  const searchUpdated = term => {
    setSearch(term);
  };
  useEffect(() => {
    filter(() => getdata.filter(createFilter(search, KEYS_TO_FILTERS)));
  }, [search]);

  return (
    <View
      style={
        containerStyle ? [styles.search, {containerStyle}] : styles.search
      }>
      {/* <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    height: 50,
                    borderColor: '#D3D3D3',
                    paddingHorizontal: 2,
                    borderWidth: 2,
                    marginTop: 15,
                    borderRadius: 10,
                }}>
                <TextInput
                    placeholder="Search by Names."
                    placeholderTextColor="#808080"
                    onChangeText={term => {
                        searchUpdated(term);
                    }}
                    style={{
                        marginLeft: 0,
                        backgroundColor: '#FFFFFF',
                        width: '90%',
                        height: 40,
                        fontSize: 12,
                        fontFamily: 'Montserrat-Regular',
                    }}
                />
                <Feather name="search" size={29} color="#000000" />
            </View> */}
      <View
        style={
          mainViewStyle
            ? [
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: COLORS.white,
                  width: '100%',
                  height: 50,
                  borderRadius: 12,
                  paddingHorizontal: 4,
                  elevation: 2,
                },
                mainViewStyle,
              ]
            : {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: COLORS.white,
                width: '100%',
                height: 50,
                borderRadius: 12,
                paddingHorizontal: 4,
                elevation: 2,
              }
        }>
        <TextInput
          placeholder={placeholder ? placeholder : 'Search'}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : '#000000'
          }
          style={
            style
              ? [
                  {
                    marginLeft: 15,
                    backgroundColor: COLORS.white,
                    width: '80%',
                    height: 45,
                    color: '#000000',
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 16,
                  },
                  style,
                ]
              : {
                  marginLeft: 15,
                  backgroundColor: COLORS.white,
                  width: '80%',
                  height: 45,
                  color: '#000000',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 16,
                }
          }
          onChangeText={term => searchUpdated(term)}
        />
        <Ionicons
          name="search-outline"
          size={iconSize ? iconSize : 24}
          color={iconColor ? iconColor : COLORS.black}
          style={
            iconStyle
              ? [{marginRight: 10}, iconStyle]
              : {
                  //transform: [{ rotate: '90deg' }],
                  marginRight: 10,
                }
          }
        />
      </View>
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  search: {
    // height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderColor: '#E4E4E4',
    paddingBottom: 4,
    marginTop: 10,
  },
});
