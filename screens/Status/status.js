import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../styles/global';
import StatusMember from '../../components/Status/statusMember'
import { useSelector, useDispatch } from 'react-redux';
import { URL_local } from '../../constant';
import StatusApi from '../../API/StatusAPI';
const Status = ({ navigation }) => {
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)
    const [, forceRerender] = useState();
    const dispatch = useDispatch()
    const { data, loading } = useSelector(state => { return state.Status })

    const fetchData = () => {
        // const url = URL_local + 'status'
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {
        //         // setData(result)
        //         // setLoading(false)
        //         dispatch({ type: 'ADD_DATA_STATUS', payload: result })
        //         dispatch({ type: 'SET_LOADING_STATUS', payload: false })
        //     }).catch(err => console.log('Error'));
        StatusApi.getAll()
            .then(res => {
                dispatch({ type: 'ADD_DATA_STATUS', payload: res })
                dispatch({ type: 'SET_LOADING_STATUS', payload: false })
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData();
    }, [])
   

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