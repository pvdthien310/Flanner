import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../styles/global';
import KnowledgeMember from '../../components/knowledgeMember';
const Knowledge = ({ navigation }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = () => {
        fetch('http://192.168.0.103:3000/api/knowledge')
            .then(res => res.json())
            .then(result => {
                setData(result)
                setLoading(false)
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