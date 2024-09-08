import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Modal} from 'react-native-paper';

const SalarySlip = () => {
  const [month, setMonth] = useState('');
  const [current_month, setcurrent_month] = useState('');
  const [latestmonth, setlatestMonth] = useState('');

  useEffect(() => {
    let monthIndex = new Date().getMonth() + 1;
    // console.log('Month==>', monthIndex);
    setlatestMonth(monthIndex);
    setcurrent_month(monthIndex);
    if (monthIndex == 1) {
      setMonth('January');
    } else if (monthIndex == 2) {
      setMonth('February');
    } else if (monthIndex == 3) {
      setMonth('March');
    } else if (monthIndex == 4) {
      setMonth('April');
    } else if (monthIndex == 5) {
      setMonth('May');
    } else if (monthIndex == 6) {
      setMonth('June');
    } else if (monthIndex == 7) {
      setMonth('July');
    } else if (monthIndex == 8) {
      setMonth('August');
    } else if (monthIndex == 9) {
      setMonth('September');
    } else if (monthIndex == 10) {
      setMonth('October');
    } else if (monthIndex == 11) {
      setMonth('November');
    } else if (monthIndex == 12) {
      setMonth('December');
    }
  }, []);

  const NewMonth = i => {
    let monthNum;
    if (i == -1) {
      monthNum = current_month - 1;
      setcurrent_month(monthNum);
    } else {
      monthNum = current_month + 1;
      setcurrent_month(monthNum);
    }
    if (monthNum == 1) {
      setMonth('January');
    } else if (monthNum == 2) {
      setMonth('February');
    } else if (monthNum == 3) {
      setMonth('March');
    } else if (monthNum == 4) {
      setMonth('April');
    } else if (monthNum == 5) {
      setMonth('May');
    } else if (monthNum == 6) {
      setMonth('June');
    } else if (monthNum == 7) {
      setMonth('July');
    } else if (monthNum == 8) {
      setMonth('August');
    } else if (monthNum == 9) {
      setMonth('September');
    } else if (monthNum == 10) {
      setMonth('October');
    } else if (monthNum == 11) {
      setMonth('November');
    } else if (monthNum == 12) {
      setMonth('December');
    }
    // console.log('new', monthNum);
  };

  return (
    <View style={[container.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingVertical: 20, paddingHorizontal: 10}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                Quaterly
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{marginRight: 5}}
                onPress={() => (current_month == 1 ? '' : NewMonth(-1))}>
                <MaterialIcons
                  name="arrow-left"
                  size={30}
                  color={current_month == 1 ? COLORS.lightblack : COLORS.black}
                />
              </TouchableOpacity>

              <Text
                style={[
                  paraGray.darkpara,
                  {color: COLORS.bluee, paddingHorizontal: 5},
                ]}>
                {month}
              </Text>
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() =>
                  current_month == latestmonth ? '' : NewMonth(1)
                }>
                <MaterialIcons
                  name="arrow-right"
                  size={30}
                  color={
                    current_month == latestmonth
                      ? COLORS.lightblack
                      : COLORS.black
                  }
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                Yearly
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              borderRadius: 30,
              borderWidth: 0.5,
              borderColor: COLORS.bluee,
              paddingHorizontal: 15,
              marginTop: 20,
              marginHorizontal: 10,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
              <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                Net Salary
              </Text>
              <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                {month}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <FontAwesome
                style={{marginTop: 5}}
                name="rupee"
                size={25}
                color={COLORS.section}
              />
              <Text
                style={[
                  paraGray.largebold,
                  {color: COLORS.section, marginLeft: 8},
                ]}>
                19,536.00
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.background,
                marginTop: 30,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text style={[paraGray.darkpara, {color: COLORS.blue}]}>
                EARNINGS
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRadius: 20,
                borderWidth: 0.5,
                borderColor: COLORS.blue,
                paddingHorizontal: 10,
                marginTop: 10,
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Text style={[paraGray.largebold, {color: COLORS.section}]}>
                  Working Days :
                </Text>
                <Text style={[paraGray.largebold, {color: COLORS.section}]}>
                  28.5
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                borderRadius: 20,
                borderWidth: 0.5,
                borderColor: COLORS.blue,
                paddingHorizontal: 10,
                marginTop: 10,
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Text style={[paraGray.largebold, {color: COLORS.section}]}>
                  Gross Pay :
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome
                    style={{marginTop: 7, marginRight: 5}}
                    name="rupee"
                    size={20}
                    color={COLORS.section}
                  />
                  <Text style={[paraGray.largebold, {color: COLORS.section}]}>
                    18,536.00
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                borderRadius: 20,
                borderWidth: 0.5,
                borderColor: COLORS.blue,
                paddingHorizontal: 10,
                marginTop: 10,
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Text style={[paraGray.largebold, {color: COLORS.section}]}>
                  Incentive :
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome
                    style={{marginTop: 7, marginRight: 5}}
                    name="rupee"
                    size={20}
                    color={COLORS.section}
                  />
                  <Text style={[paraGray.largebold, {color: COLORS.section}]}>
                    1,500.00
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.background,
                marginTop: 30,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text style={[paraGray.darkpara, {color: COLORS.blue}]}>
                DEDUCTIONS
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRadius: 20,
                borderWidth: 0.5,
                borderColor: COLORS.blue,
                paddingHorizontal: 10,
                marginTop: 10,
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Text style={[paraGray.largebold, {color: COLORS.section}]}>
                  Prof Tax :
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome
                    style={{marginTop: 7, marginRight: 5}}
                    name="rupee"
                    size={20}
                    color={COLORS.section}
                  />
                  <Text style={[paraGray.largebold, {color: COLORS.section}]}>
                    200.00
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                borderRadius: 20,
                borderWidth: 0.5,
                borderColor: COLORS.blue,
                paddingHorizontal: 10,
                marginTop: 10,
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Text style={[paraGray.largebold, {color: COLORS.section}]}>
                  PF :
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome
                    style={{marginTop: 7, marginRight: 5}}
                    name="rupee"
                    size={20}
                    color={COLORS.section}
                  />
                  <Text style={[paraGray.largebold, {color: COLORS.section}]}>
                    150.00
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                borderRadius: 20,
                borderWidth: 0.5,
                borderColor: COLORS.blue,
                paddingHorizontal: 10,
                marginTop: 10,
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Text style={[paraGray.largebold, {color: COLORS.section}]}>
                  ESIC :
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome
                    style={{marginTop: 7, marginRight: 5}}
                    name="rupee"
                    size={20}
                    color={COLORS.section}
                  />
                  <Text style={[paraGray.largebold, {color: COLORS.section}]}>
                    150.00
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <TouchableOpacity
              style={{
                height: 42,
                width: '50%',
                backgroundColor: COLORS.blue,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[paraGray.whitepara]}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SalarySlip;
