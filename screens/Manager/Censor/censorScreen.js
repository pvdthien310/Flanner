import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, ActivityIndicator,  View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import ReportApi from '../../../API/ReportAPI';
import ReportMember from '../../../components/Manager/report'
import { Ionicons } from '@expo/vector-icons';


const { height, width } = Dimensions.get("screen");
const logoHeight = height * 0.5;


const CensorScreen = ({ navigation }) => {

    const { user } = useSelector(state => state.User)
    const [reportList, SetReportList] = useState(undefined);
   let loading = false

    
    const FetchData = () => {
        
        ReportApi.getAll()
            .then(res => {
                SetReportList(res)
                console.log(reportList)
            })
            .catch(err => console.log('Error Report'))
    }
    useEffect(() => {
        FetchData()
    }, [])
    useEffect(() => {
        
    }, [reportList])

    return (
        <View style={styles.container}>
            <View>
                {
                  loading ? <ActivityIndicator size="small" color="#0000ff" />
                  :
                    <View>
                        {
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={reportList}
                                renderItem={({ item }) => (
                                    <ReportMember item={item} navigation = {navigation} ></ReportMember>
                                )}
                                keyExtractor={item => item._id}
                                onRefresh={() => FetchData()}
                                refreshing = {loading}
                            />
                        }
                    </View>
                }
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        flex: 1,
        backgroundColor: 'whitesmoke'

    },
    button1: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 10,
        padding: 7,
        backgroundColor: 'lightslategrey'
    },
    button2: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 10,
        padding: 7,
        backgroundColor: 'black'
    },
    button3: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius: 10,
        padding: 7,
        backgroundColor: 'dimgrey'
    }

});
export default CensorScreen;
