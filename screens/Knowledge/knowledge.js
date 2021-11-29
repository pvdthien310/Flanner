import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator,Text, Button } from 'react-native';
import { globalStyles } from '../../styles/global';

import KnowledgeMember from '../../components/Knowledge/knowledgeMember';
import { useSelector, useDispatch } from 'react-redux';
import '../../constant.js'
import { URL_local } from '../../constant.js';






const Knowledge = ({ navigation }) => {
    const [, forceRerender] = useState();
    const dispatch = useDispatch()
    const { data, loading } = useSelector(state => { return state.Knowledge })
    const { accessToken } = useSelector(state => { return state.JWT })

    
    const { user } = useSelector(state => { return state.User })

    const fetchKnowledgeData = () => {
        const url = URL_local + 'knowledge/load-data/' + user.userID
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                dispatch({ type: 'ADD_USER_KNOWLEDGE', payload: result })
            }).catch(err => console.log('Error'));
    }
    const fetchStatusData = () => {
        const url = URL_local + 'status/load-data/' + user.userID
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {
                dispatch({ type: 'ADD_USER_STATUS', payload: result })
                dispatch({ type: 'SET_LOADING_STATUS', payload: false })

            }).catch(err => console.log('Error'));
    }

    const fetchNewData = () => {
        const url = URL_local + 'knowledge/load-data/newsfeed/random'
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {
                console.log('reset')
                dispatch({ type:  'ADD_DATA_KNOWLEDGE', payload: result })
                dispatch({ type: 'SET_LOADING_KNOWLEDGE', payload: false })
            }).catch(err => console.log('Error'));
    }
    
    useEffect(() => {
        // fetchData();
        fetchKnowledgeData();
        fetchNewData();
        fetchStatusData();
    }
        , [])

    useEffect(() => {
        forceRerender
    }, [data])

    const Load = () => {
        // const url = URL_local + 'knowledge/load-data/' + user.userID
        // console.log(url)
        // fetch(url)
        //     .then(res => res.json())
        //     .then(result => {
        //         // console.log(result)
        //         console.log(result)
        //     }).catch(err => console.log('Error'));
        
       
    }
    
    
  
    return (
        <View style={globalStyles.container}>
            <Button title = 'ssss' onPress = {() => Load()}></Button>
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
                        onRefresh={() => fetchNewData()}
                        refreshing={loading}
                    />
            }
        </View>
    )
}
export default Knowledge;
