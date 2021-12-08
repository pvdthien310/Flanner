import {
    View, 
    Text,
    Image,
    StyleSheet
} from 'react-native'

const aboutScreen = () =>{
    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>
                About Us
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        paddingTop: 40
    },

    title:{
        paddingTop: 10,
        textAlign:'center',
        fontFamily: 'nunitobold',
        fontSize: 20,
        fontWeight: 'bold'
    },

    caption: {
        padding: 10,
        fontFamily: 'nunito',
        fontSize: 15,
        
    },

    image: {
            
    }

})

export default aboutScreen