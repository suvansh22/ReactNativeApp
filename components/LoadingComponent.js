import React from 'react'
import {ActivityIndicator,StyleSheet,Text,View} from 'react-native'

const Styles = StyleSheet.create({
    loadingView:{
        alignContent:'center',
        justifyContent:'center',
        flex:1
    },
    lodaingText:{
        color:'#512DA8',
        fontSize: 14,
        fontWeight:'bold'
    }
})

export const Loading = () => {
    return <View style={Styles.loadingView}>
        <ActivityIndicator size="large" color="#512DA8"/>
        <Text style={Styles.lodaingText}>Loading . . .</Text>
    </View>
}