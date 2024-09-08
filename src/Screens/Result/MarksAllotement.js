import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MarksAllotement = props => {
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const Sem = [
    {
      id: '1',
      name: 'English 1st Standard',
      results: [
        {
          id: '1',
          subname: 'Vikash',
          marks: '74',
          grade: 'B',
        },
        {
          id: '2',
          subname: 'Ayush',
          marks: '87',
          grade: 'B',
        },
        {
          id: '3',
          subname: 'Sunil',
          marks: '74',
          grade: 'B',
        },
        {
          id: '4',
          subname: 'Niraj',
          marks: '87',
          grade: 'B',
        },
        {
          id: '5',
          subname: 'Rishabh',
          marks: '89',
          grade: 'B',
        },
        {
          id: '6',
          subname: 'Manish  ',
          marks: '78',
          grade: 'B',
        },
        {
          id: '7',
          subname: 'Soheb',
          marks: '96',
          grade: 'A',
        },
      ],
    },
    {
      id: '2',
      name: 'English 2nd Standard',
      results: [
        {
          id: '1',
          subname: 'Vikash',
          marks: '74',
          grade: 'B',
        },
        {
          id: '2',
          subname: 'Ayush',
          marks: '87',
          grade: 'B',
        },
        {
          id: '3',
          subname: 'Sunil',
          marks: '74',
          grade: 'B',
        },
        {
          id: '4',
          subname: 'Niraj',
          marks: '87',
          grade: 'B',
        },
        {
          id: '5',
          subname: 'Rishabh',
          marks: '89',
          grade: 'B',
        },
        {
          id: '6',
          subname: 'Manish  ',
          marks: '78',
          grade: 'B',
        },
        {
          id: '7',
          subname: 'Soheb',
          marks: '96',
          grade: 'A',
        },
      ],
    },
    {
      id: '3',
      name: 'English 3rd Standard',
      results: [
        {
          id: '1',
          subname: 'Vikash',
          marks: '74',
          grade: 'B',
        },
        {
          id: '2',
          subname: 'Ayush',
          marks: '87',
          grade: 'B',
        },
        {
          id: '3',
          subname: 'Sunil',
          marks: '74',
          grade: 'B',
        },
        {
          id: '4',
          subname: 'Niraj',
          marks: '87',
          grade: 'B',
        },
        {
          id: '5',
          subname: 'Rishabh',
          marks: '89',
          grade: 'B',
        },
        {
          id: '6',
          subname: 'Manish  ',
          marks: '78',
          grade: 'B',
        },
        {
          id: '7',
          subname: 'Soheb',
          marks: '96',
          grade: 'A',
        },
      ],
    },
    {
      id: '4',
      name: 'English 4st Standard',
      results: [
        {
          id: '1',
          subname: 'Vikash',
          marks: '74',
          grade: 'B',
        },
        {
          id: '2',
          subname: 'Ayush',
          marks: '87',
          grade: 'B',
        },
        {
          id: '3',
          subname: 'Sunil',
          marks: '74',
          grade: 'B',
        },
        {
          id: '4',
          subname: 'Niraj',
          marks: '87',
          grade: 'B',
        },
        {
          id: '5',
          subname: 'Rishabh',
          marks: '89',
          grade: 'B',
        },
        {
          id: '6',
          subname: 'Manish  ',
          marks: '78',
          grade: 'B',
        },
        {
          id: '7',
          subname: 'Soheb',
          marks: '96',
          grade: 'A',
        },
      ],
    },
    {
      id: '5',
      name: 'English 5th Standard',
      results: [
        {
          id: '1',
          subname: 'Vikash',
          marks: '74',
          grade: 'B',
        },
        {
          id: '2',
          subname: 'Ayush',
          marks: '87',
          grade: 'B',
        },
        {
          id: '3',
          subname: 'Sunil',
          marks: '74',
          grade: 'B',
        },
        {
          id: '4',
          subname: 'Niraj',
          marks: '87',
          grade: 'B',
        },
        {
          id: '5',
          subname: 'Rishabh',
          marks: '89',
          grade: 'B',
        },
        {
          id: '6',
          subname: 'Manish  ',
          marks: '78',
          grade: 'B',
        },
        {
          id: '7',
          subname: 'Soheb',
          marks: '96',
          grade: 'A',
        },
      ],
    },
    {
      id: '6',
      name: 'English 6th Standard',
      results: [
        {
          id: '1',
          subname: 'Vikash',
          marks: '74',
          grade: 'B',
        },
        {
          id: '2',
          subname: 'Ayush',
          marks: '87',
          grade: 'B',
        },
        {
          id: '3',
          subname: 'Sunil',
          marks: '74',
          grade: 'B',
        },
        {
          id: '4',
          subname: 'Niraj',
          marks: '87',
          grade: 'B',
        },
        {
          id: '5',
          subname: 'Rishabh',
          marks: '89',
          grade: 'B',
        },
        {
          id: '6',
          subname: 'Manish  ',
          marks: '78',
          grade: 'B',
        },
        {
          id: '7',
          subname: 'Soheb',
          marks: '96',
          grade: 'A',
        },
      ],
    },
  ];
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // getapiData();
  }, []);
  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {Sem.map((sem, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('AllotementDetail', {
                  Sem: Sem[index],
                });
              }}>
              <View style={styles.arrow}>
                <Text style={styles.headerText}>{sem.name}</Text>
                <FontAwesome name="angle-right" size={25} color="#000000" />
              </View>
            </TouchableOpacity>
            <View style={styles.divline} />
          </View>
        ))}
      </ScrollView>
      {/* <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>1st Semester Exam</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>2nd Unit Test</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>2nd Semester Exam</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>1st MCQ Test</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>2nd MCQ Test</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} /> */}
    </View>
  );
};

export default MarksAllotement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  arrow: {
    paddingHorizontal: '6%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    // flexDirection: 'row',
    // textAlign: 'center',
    fontSize: 18,
    color: '#000000',
    fontWeight: '500',
    fontSize: 15,
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
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
  },
});
