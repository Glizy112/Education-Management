import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    BackHandler,
    Alert,
    StatusBar,
} from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Entypo from 'react-native-vector-icons/Entypo';
import { Avatar, Paragraph, Switch } from 'react-native-paper';
import { COLORS } from '../../../theme/Colors';
import { btnStyles, container, paraGray } from '../../../theme/styles/Base';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../../../Components/Header';
import { setIsSwitchOn } from '../../../Redux/Actions/actions';
import { useSelector, useDispatch } from 'react-redux';

const CreateMPIN = props => {
    const dispatch = useDispatch();
    const { userinfo, userid, username, userimage, isSwitchOn } = useSelector(
        state => state.userReducer,
    );
    const CELL_COUNT = 4;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill(
        { value, cellCount: CELL_COUNT },

    );
    const [props1, getCellOnLayoutHandler] = useClearByFocusCell(
        {
            value,
            setValue,
        },

    );


    const [enableMask, setEnableMask] = useState(true);
    const [enableMask1, setEnableMask1] = useState(true);

    const renderCell = ({ index, symbol, isFocused }) => {
        let textChild = null;

        if (symbol) {
            textChild = enableMask ? <Entypo name="dot-single" size={30} /> : symbol;
        } else if (isFocused) {
            textChild = <Cursor />;
        }

        return (
            <View
                key={index}
                // darkShadowColor={props1.darkTheme ? "#070707" : "#97A7C3"} // <- set this
                // lightShadowColor={props1.darkTheme ? "#727272" : "white"}  // <- this
                // swapShadows
                // inner // <- enable inner shadow
                // useArt // <- set this prop to use non-native shadow on ios
                style={{
                    borderRadius: 16,
                    backgroundColor: COLORS.white,
                    width: 64,
                    height: 64,
                    marginLeft: 2,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderWidth: 0.6,
                    borderColor: COLORS.black,
                    paddingTop: 16,
                    // ...include most of View/Layout styles
                }}>
                <Text
                    key={index}
                    style={[
                        styles.cell,
                        isFocused && styles.focusCell,
                        paraGray.darklarge,
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {textChild}
                </Text>
            </View>
        );
    };
    const renderCell1 = ({ index, symbol, isFocused }) => {
        let textChild1 = null;

        if (symbol) {
            textChild1 = enableMask1 ? (
                <Entypo name="dot-single" size={30} />
            ) : (
                symbol
            );
        } else if (isFocused) {
            textChild1 = <Cursor />;
        }

        return (
            <View
                key={index}
                // swapShadows
                // useArt
                style={{
                    borderRadius: 16,
                    backgroundColor: COLORS.white,
                    width: 56,
                    height: 56,
                    marginLeft: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1.2,
                    borderColor: COLORS.primary,
                }}>
                <Text
                    key={index}
                    style={[
                        styles.cell,
                        isFocused && styles.focusCell,
                        paraGray.darklarge,
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {textChild1}
                </Text>
            </View>
        );
    };
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(true);

    const CreatePIN = async () => {
        setLoading(true);
        if ((value == '')) {
            alert('Please Enter PIN');
            setLoading(false);
        } else if ((value.length != 4)) {
            alert('MPIN Should be 4digit');
            setLoading(false);
        }
        // else if (value.length == 4) {
        //     //AsyncStorage.setItem('pin', value);
        //     //AsyncStorage.setItem('toggle', 'true');

        // } 
        else {
            props.navigation.navigate('ConfirmMPIN', { pin: value });
            setLoading(false);
            // alert('Please check MPIN');
            // setLoading(false);
        }
    };
    useFocusEffect(
        useCallback(() => {
            const backAction = () => {
                Alert.alert(
                    'Hold on!',
                    'MPIN Not Set Are you sure you want to exit the Page?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => null,
                            style: 'cancel',
                        },
                        {
                            text: 'YES',
                            onPress: () => {
                                dispatch(setIsSwitchOn(false)),
                                    props.navigation.navigate('Security');
                            },
                        },
                    ],
                );
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );

            return () => backHandler.remove();
        }, []),
    );

    const GoBack = () => {
        dispatch(setIsSwitchOn(false));
        props.navigation.navigate('Security');
    };
    return (
        <View style={container.container}>
            <StatusBar backgroundColor={'#fafef8'} barStyle={'dark-content'} />
            <View style={{ paddingHorizontal: 15, backgroundColor: COLORS.white }}>
                <Header
                    backgroundColor
                    backPress={GoBack}
                    color={COLORS.black}
                    backbutton
                    headerFirstName="Create MPIN"
                    marginLeft
                />
            </View>
            {loading == true && <Spinner visible={load} />}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flex: 1,
                    paddingHorizontal: 10,
                    justifyContent: 'flex-start',
                }}>
                <View style={{ alignItems: 'center', paddingTop: 84 }}>
                    <Image
                        style={{ height: 100, width: 120 }}
                        resizeMode={'contain'}
                        source={require('../../../../assets/passlock.png')}
                    />
                    <Text style={[paraGray.parahome, { marginTop: 16, marginBottom: 8 }]}>
                        Set New PIN
                    </Text>
                    <Text style={[paraGray.darkpara]}>Create a 4-digit PIN for easy access</Text>
                </View>
                <View style={{ justifyContent: 'center', marginTop: 48 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            borderWidth: 0,
                            paddingHorizontal: 24
                        }}
                    >
                        <Text style={[paraGray.largebold, { fontSize: 16 }]}>Enter New Pin</Text>
                    </View>
                    <View
                        style={{ marginVertical: 24, paddingHorizontal: 20, borderWidth: 0 }}>
                        <CodeField
                            autoFocus
                            ref={ref}
                            // {...props1}
                            caretHidden={true}
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            // rootStyle={{}}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={renderCell}
                        />
                    </View>

                </View>
                <View style={{ marginTop: 20, marginBottom: 30, paddingHorizontal: 15 }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            height: 56,
                            backgroundColor: COLORS.primary,
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            //paddingVertical: 12,
                            //paddingBottom: 10,
                            marginBottom: 10,
                        }}
                        onPress={CreatePIN}>
                        <Text 
                            style={[
                                paraGray.largebold, 
                                { fontSize: 14, color: COLORS.white, textAlign: 'center' }
                            ]}
                        >Create PIN</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};
export default CreateMPIN;

const styles = StyleSheet.create({
    cell: {
        color: 'white',
        textAlign: 'center',
    },
});
