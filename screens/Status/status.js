import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../styles/global';
import StatusMember from '../../components/statusMember'
import { useSelector, useDispatch } from 'react-redux';
const Status = ({ navigation }) => {
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const { data, loading } = useSelector(state => { return state.Status })

    const fetchData = () => {
        
        fetch('http://192.168.0.106:3000/api/status')
            .then(res => res.json())
            .then(result => {
                // setData(result)
                // setLoading(false)
                dispatch({ type: 'ADD_DATA_STATUS', payload: result })
                dispatch({ type: 'SET_LOADING_STATUS', payload: false })
            }).catch(err => console.log('Error'));
    }

    useEffect(() => {
        fetchData();
    }
        , [])

    return (
        <View style={globalStyles.container}>
            {
                loading ? <ActivityIndicator size="small" color="#0000ff" />
                    :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item }) => (
                            <StatusMember item={item} navigation={navigation} />
                        )}
                        keyExtractor={item => item._id}
                        onRefresh={() => fetchData()}
                        refreshing={loading}
                    />
            }
        </View>
    )
}
export default Status;