import { NavigationContainer } from "@react-navigation/native";
import React, {useState} from "react";
import { Button } from "react-native";
import { Text, TextInput , StyleSheet, View} from "react-native";

const ChooseUser = ({navigation})=>{
    const [user, setUser] = useState('')

    const chooseLinh1 = ()=>{
        setUser('Linh1')
        navigation.navigate('Discussion', user)
    }

    const chooseLinh2 = ()=>{
        setUser('Linh2')
        navigation.navigate('Discussion', user)
    }

    return(
        <View style= {styles.container}>
            <Text style={{
                fontSize: 15,
            }}>
                Chọn user Linh1 hoặc Linh2:
            </Text>

            <Button title='Linh1'
            onPress={
                chooseLinh1
            }/>

            <Button title='Linh2'
            onPress={
                chooseLinh2
            }/>
        </View>
    );
}

export default ChooseUser;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    }
})