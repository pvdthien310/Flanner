import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../styles/global';
import StatusMember from '../../components/statusMember';
import KnowledgeMember from '../../components/knowledgeMember';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';



const Knowledge = ({ navigation }) => {
    const [,forceRerender] = useState();
    const dispatch = useDispatch()
    const { data, loading } = useSelector(state => { return state.Knowledge })
    const fetchData = () => {
        fetch('http://192.168.0.106:3000/api/knowledge')
            .then(res => res.json())
            .then(result => {
                console.log('reset')
                dispatch({ type: 'ADD_DATA_KNOWLEDGE', payload: result })
                dispatch({ type: 'SET_LOADING_KNOWLEDGE', payload: false })
            }).catch(err => console.log('Error'));
    }
    useEffect(() => {
        fetchData();}
        ,[])

    useEffect(() => {
        forceRerender}, [data])
        
    return (
        <View style={globalStyles.container}>
            {
                loading ? <ActivityIndicator size="small" color="#0000ff" />
                    :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item }) => (
                            <KnowledgeMember item={item} navigation={navigation} />
                        )}
                        keyExtractor={item => item._id}
                        onRefresh={() => fetchData()}
                        refreshing={loading}
                    />
            }
        </View>
    )
}
export default Knowledge;
