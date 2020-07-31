import React from 'react'
import Menu from './MenuComponent'
import Dishdetail from './DishdetailComponent'
import {View,Platform} from 'react-native'
import { createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

// const MenuNavigator = createStackNavigator({
//     Menu:{screen:Menu},
//     Dishdetail:{screen:Dishdetail}
// },{
//     initalRouteName:'Menu',
//     navigationOptions:{
//         headerStyle:{
//             backgroundColor:"#512DA8"
//         },
//         headerTintColor:'#fff',
//         headerTitleStyle:{
//             color:"#fff"
//         }
//     }
// })
const Stack = createStackNavigator()
export default function Main(){
   
    return(
        <View style={{flex:1,paddingTop: Platform.OS === 'ios'?0:Expo.Constants.statusBarHeight}}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle:{
                        backgroundColor:"#512DA8"
                    },
                    headerTintColor:'#fff',
                    headerTitleStyle:{
                        color:"#fff"
                    }
            }} 
                initialRouteName="Menu">
                <Stack.Screen name="Menu" component = {Menu} />
                <Stack.Screen name="Dishdetail" component = {Dishdetail} />
            </Stack.Navigator>
        </NavigationContainer>
        </View>
    )
}