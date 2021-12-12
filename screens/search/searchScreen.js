import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchDropDown from '../../components/Search/SearchDropDown';
import { useSelector, useDispatch } from 'react-redux';
import Api from '../../API/UserAPI';


const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

const logoHeight = height * 0.5;

const SearchScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [searching, SetIssearching] = useState(false)
    const { data, user } = useSelector(state => { return state.User })
    const [dataSource, setDataSource] = useState(data)
    const [filter, setFilter] = useState([...dataSource])
    const [result, Setresult] = useState([...dataSource])
    const [searchString, SetSearchString] = useState();



    const onSearch = (text) => {
        if (text) {
            SetSearchString(text)
            SetIssearching(true)
            SuggesFunc()
        }
        else {
            SetSearchString(undefined)
            SetIssearching(false)
        }
    }


    const NavigateToCurrentUserProfile = () => {
        navigation.navigate('User Information', {
            screen: 'User Dashboard',
            params: { user: '' },
        })
        dispatch({ type: 'UPDATE_FEATURE', payload: 0 })
    }

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Notification",
            "Do you want to navigate your profile?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: "OK", onPress: () => NavigateToCurrentUserProfile()
                }
            ]
        );
    const NavigateScreen = (item) => {

        if (item.userID != user.userID)
            navigation.push(
                'Search Friend Profile',
                { item: [item] })
        else {
            createTwoButtonAlert()
        }
    }

    function ConvertToStandardString(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();;
    }

    const FetchData = async () => {
        await Api.getAll().then(result => {
            setDataSource(result)
            dispatch({ type: 'ADD_DATA_USER', payload: result })
            dispatch({ type: 'SET_LOADING_USER', payload: false })

        })
    }

    const SuggesFunc = () => {
        if (searchString) {
            let processedList = [...dataSource]
            const text = ConvertToStandardString(searchString).trim()
            processedList = processedList.filter(item => {
                if (ConvertToStandardString(item.name).match(text))
                    return item;
            })
            setFilter(processedList);
        }
    }
    const FindFunc = async () => {
        if (searchString) {
            await FetchData();
            const text = ConvertToStandardString(searchString).trim()
            const processedList = dataSource.filter(item => {
                if (ConvertToStandardString(item.name).match(text))
                    return item;
            })
            Setresult(processedList);
        }
        else 
        {
            Setresult([...dataSource]);
        }
    }
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss
                SetIssearching(false)
            }}>
                <View style={{ flex: 1 }}>

                    <SafeAreaView style={styles.SearchBar}>
                        <View style={{ flexDirection: 'column', width: width * 0.8 }}>

                            <TextInput style={styles.textInput}
                                placeholder="Search"
                                placeholderTextColor='dimgrey'
                                onChangeText={onSearch}
                                value={searchString}
                            >
                            </TextInput>
                            {
                                searching &&
                                <TouchableOpacity style={{ position: 'absolute', start: width * 0.7 }}
                                    onPress={() => {
                                        SetSearchString('')
                                        onSearch(undefined)

                                    }}>
                                    <Ionicons style={{ marginTop: '30%' }} name="close-sharp" size={30} color="black" />
                                </TouchableOpacity>

                            }
                            {
                                result.length > 0 ?
                                    <View>
                                        <View
                                            style={{
                                                width: width,
                                                height: height*0.8
                                            }}>
                                            <Text style={{ fontSize: 30, fontWeight: 'bold',padding:5, alignSelf: 'flex-start', color: 'black' }}>Result</Text>
                                            <ScrollView>
                                                {
                                                    result.map(item => {
                                                        return (
                                                            <TouchableOpacity onPress={() => {
                                                                SetIssearching(false)
                                                                SetSearchString(item.name)
                                                                NavigateScreen(item)
                                                            }}
                                                            style={{
                                                                width: width*0.9,
                                                            }}
                                                                key={item._id}>
                                                                <View style={{ flexDirection: 'row' ,backgroundColor: 'white', padding: 20, borderBottomWidth: 1, borderBottomColor: 'black'}}>
                                                                    {
                                                                        item.avatar ?

                                                                            <Image source={{ uri: item.avatar }}
                                                                                style={{
                                                                                    height: 50,
                                                                                    width: 50,
                                                                                    borderRadius: 10,
                                                                                    alignSelf: 'center',
                                                                                }} />
                                                                            :
                                                                            <Image
                                                                                source={require('../../assets/icon/userPhoto.png')}
                                                                                style={{
                                                                                    height: 50,
                                                                                    width: 50,
                                                                                    borderRadius: 5,
                                                                                    alignSelf: 'center'
                                                                                }}
                                                                            />
                                                                    }
                                                                    <View style = {{
                                                                        flexDirection: 'column',
                                                                        alignSelf:'center',
                                                                        justifyContent:'center',
                                                                        alignContent:'space-around'
                                                                    }}>
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        marginStart: 13,
                                                                        padding:4,
                                                                        color: 'black',
                                                                        fontWeight:'bold'
                                                                    }}     
                                                                    >{item.name}</Text>
                                                                     <Text style={{
                                                                        fontSize: 12,
                                                                        padding:4,
                                                                        marginStart: 15,
                                                                        color: 'black'
                                                                    }}     
                                                                    >{item.email}</Text>
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                            </ScrollView>
                                        </View>
                                    </View>
                                    :
                                    <TouchableWithoutFeedback style={{
                                        height: height,
                                        width: width
                                    }}>
                                        <View style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            alignSelf: 'center',
                                            marginTop: 80
                                        }}>

                                            <Image source={require('../../assets/icon/error.png')}
                                                resizeMode='contain'
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    marginBottom: 5,
                                                }
                                                }
                                            />
                                            <Text style={{ fontFamily: 'nunitobold', fontSize: 17, marginBottom: 10 }}>No Result!</Text>
                                        </View>

                                    </TouchableWithoutFeedback>
                            }

                            {
                                // searching &&  <SearchDropDown dataSource = {dataSource}/>
                                searching &&
                                <View style={{
                                    position: 'absolute',
                                    marginTop: '15%',
                                    backgroundColor: 'black',
                                    opacity: 1,
                                    width: width * 0.8,
                                    borderTopLeftRadius: 4,
                                    borderTopRightRadius: 4,
                                    padding: 10
                                }}>
                                    <Text style={{ fontSize: 20,padding: 5, fontWeight: 'bold',color: 'white', alignSelf: 'flex-start' }}>Suggesstion</Text>
                                    <ScrollView>
                                        {
                                            filter.map(item => {
                                                return (
                                                    <TouchableOpacity onPress={() => {
                                                        SetIssearching(false)
                                                        SetSearchString(item.name)
                                                        NavigateScreen(item)

                                                    }}
                                                        key={item._id}>
                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', marginVertical: 5, padding: 5, borderRadius: 5 }}>
                                                            {
                                                                item.avatar ?

                                                                    <Image source={{ uri: item.avatar }}
                                                                        style={{
                                                                            height: 50,
                                                                            width: 50,
                                                                            borderRadius: 10,
                                                                            alignSelf: 'center',
                                                                        }} />
                                                                    :
                                                                    <Image
                                                                        source={require('../../assets/icon/userPhoto.png')}
                                                                        style={{
                                                                            height: 50,
                                                                            width: 50,
                                                                            borderRadius: 5,
                                                                            alignSelf: 'center'
                                                                        }}
                                                                    />
                                                            }
                                                            <Text style={{
                                                                fontSize: 15,
                                                                padding: 10,
                                                                fontFamily: 'nunitobold',
                                                                color: 'black',
                                                                alignSelf:'center'
                                                            }}
                                                                key={item._id}
                                                            >{item.name}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </ScrollView>


                                </View>
                            }

                        </View>
                        <TouchableOpacity
                            style={{ flex: 1, marginStart: 10, alignSelf: 'flex-start', marginTop: '1%' }}
                            onPress={() => {
                                FindFunc()
                                SetIssearching(false)
                            }}
                        >
                            <View style={{ borderRadius: 5, backgroundColor: 'black', alignItems: 'center' }}>
                                <Ionicons name="search-circle-sharp" size={40} color="white" />
                            </View>
                        </TouchableOpacity>

                    </SafeAreaView>

                </View>

            </TouchableWithoutFeedback>


        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        paddingStart: 5,
        paddingEnd: 5,
        paddingTop: 5,
        flex: 1,
        backgroundColor: 'white',
      
    },
    SearchBar: {
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: '2%',
        alignContent: 'center',
        alignSelf: 'flex-start',


    },
    textInput: {
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
        height: 50,
        fontSize: 15,
        fontFamily: 'nunitobold',
        paddingHorizontal: 10,
        borderColor: 'black',
        borderWidth: 1
    }

});
export default SearchScreen;
