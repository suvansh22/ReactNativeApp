import React from 'react'
import Menu from './MenuComponent'
import Dishdetail from './DishdetailComponent'
import Home from './HomeComponents'
import {View,Platform} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
function MenuNavigator(){
    return(
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
    )
}

function HomeNavigator(){
    return(
        <Stack.Navigator screenOptions={{
            headerStyle:{
                    backgroundColor:"#512DA8"
                },
                headerTintColor:'#fff',
                headerTitleStyle:{
                    color:"#fff"
                }
        }} 
            >
            <Stack.Screen name="Home" component = {Home}/>
        </Stack.Navigator>
    )}
export default function Main(){
   
    return(
        <View style={{flex:1,paddingTop: Platform.OS === 'ios'?0:Expo.Constants.statusBarHeight}}>
        <NavigationContainer>
            <Drawer.Navigator drawerStyle={{backgroundColor:"#D1C4E9",paddingTop:"10%"}}>
                <Drawer.Screen options={{drawerLabel:"Home   ",title:"Home"}} name="Home" component={HomeNavigator}/>
                <Drawer.Screen options={{drawerLabel:"Menu   ",title:"Menu"}} name="Menu" component={MenuNavigator}/>
            </Drawer.Navigator>
        </NavigationContainer>
        </View>
    )
}