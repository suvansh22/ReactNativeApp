import React from 'react'
import Menu from './MenuComponent'
import Dishdetail from './DishdetailComponent'
import Home from './HomeComponents'
import Contact from './ContactComponent'
import About from './AboutComponent'
import Reservation from './ReservationComponent'
import Favorites from './FavoriteComponent'
import Login from './LoginComponent'
import {View,Platform,Image,StyleSheet,Text,ToastAndroid} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer,getFocusedRouteNameFromRoute, useScrollToTop } from '@react-navigation/native'
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer'
import { Icon } from 'react-native-elements'
import {fetchComments,fetchDishes,fetchLeaders,fetchPromos} from '../redux/ActionCreators'
import { connect } from 'react-redux'
import NetInfo,{useNetInfo} from '@react-native-community/netinfo'
 
function getRoutetitle(route){
const routeName = getFocusedRouteNameFromRoute(route)??'Login';
switch(routeName){
    case 'Login':
        return 'Login'
    case 'Register':
        return 'Register'
}
}


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
            <Stack.Screen options={({navigation})=>({
                headerLeft:()=>(<Icon name="menu" size={24}
                color='white'
                onPress ={() => navigation.toggleDrawer()}
                />)
                })}
            name="Menu" component = {Menu} />
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
            <Stack.Screen options={({navigation})=>({
                headerLeft:()=>(<Icon name="menu" size={24}
                color='white'
                onPress ={() => navigation.toggleDrawer()}
                />)
                })}
                name="Home" component = {Home}/>
        </Stack.Navigator>
    )}
function AboutUsNavigator(){
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
            <Stack.Screen options={({navigation})=>({
                headerLeft:()=>(<Icon name="menu" size={24}
                color='white'
                onPress ={() => navigation.toggleDrawer()}
                />)
                })}
                name="About Us" component = {About}/>
        </Stack.Navigator>
    )}
function ContactUsNavigator(){
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
            <Stack.Screen options={({navigation})=>({
                headerLeft:()=>(<Icon name="menu" size={24}
                color='white'
                onPress ={() => navigation.toggleDrawer()}
                />)
                })}
                name="Contact Us" component = {Contact}/>
        </Stack.Navigator>
    )}

    
function ResevationNavigator(){
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
            <Stack.Screen options={({navigation})=>({
                headerLeft:()=>(<Icon name="menu" size={24}
                color='white'
                onPress ={() => navigation.toggleDrawer()}
                />)
                })}
                name="Reservation" component = {Reservation}/>
        </Stack.Navigator>
    )}

    function FavoritesNavigator(){
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
                <Stack.Screen options={({navigation})=>({
                    headerLeft:()=>(<Icon name="menu" size={24}
                    color='white'
                    onPress ={() => navigation.toggleDrawer()}
                    />)
                    })}
                    name="Favorites" component = {Favorites}/>
            </Stack.Navigator>
        )}

    function LoginNavigator(props){
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
                <Stack.Screen options={({navigation,route})=>({
                    headerLeft:()=>(<Icon name="menu" size={24}
                    color='white'
                    onPress ={() => navigation.toggleDrawer()}
                    />),
                    headerTitle:getRoutetitle(route)
                    })}
                    name="Login" component = {Login}/>
            </Stack.Navigator>
        )}

    const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        drawerHeader: {
          backgroundColor: '#512DA8',
          height: 140,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          flexDirection: 'row'
        },
        drawerHeaderText: {
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold'
        },
        drawerImage: {
          margin: 10,
          width: 80,
          height: 60
        }
      });

    const CustomDrawerContentComponent = (props) => (
        <DrawerContentScrollView style={styles.container}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage}/>
                </View>
                <View style={{flex:2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    )
function Main(props){

    const netInfo = useNetInfo()
    const checkNet = ()=>{
        switch(netInfo.type){
            case 'none':
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
                break;
            case 'unknown':
                ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
                break;
            default:
                break;
        }
      }
      React.useEffect(()=>{
          checkNet()
      },[useNetInfo().isConnected])

    React.useEffect(()=>{
        props.fetchDishes();
        props.fetchComments();
        props.fetchPromos();
        props.fetchLeaders();

        NetInfo.fetch()
        .then(state => {
            ToastAndroid.show('Initial Network Connectivity Type: '+state.type+', effectiveType: '+(state.type==='wifi'?state.details.strength:state.details.cellularGeneration),ToastAndroid.LONG)
        });
      // eslint-disable-next-line
      },[])
   
    return(
        <View style={{flex:1,paddingTop: Platform.OS === 'ios'?0:Expo.Constants.statusBarHeight}}>
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" drawerContent={CustomDrawerContentComponent} drawerStyle={{backgroundColor:"#D1C4E9",paddingTop:"10%"}}>
                <Drawer.Screen options={{drawerLabel:"Login   ",title:"Login",drawerIcon:({tintColor})=>(
                        <Icon
                            name="sign-in"
                            type="font-awesome"
                            size={24}
                            color={tintColor}
                            />
                    )}} name="Login" component={LoginNavigator}/>
                <Drawer.Screen options={{drawerLabel:"Home   ",title:"Home",drawerIcon:({tintColor})=>(
                        <Icon
                            name="home"
                            type="font-awesome"
                            size={24}
                            color={tintColor}
                            />
                    )}} name="Home" component={HomeNavigator}/>
                <Drawer.Screen options={{drawerLabel:"About Us   ",title:"About Us",drawerIcon:({tintColor})=>(
                        <Icon
                            name="info-circle"
                            type="font-awesome"
                            size={24}
                            color={tintColor}
                            />
                    )}} name="About Us" component={AboutUsNavigator}/>
                <Drawer.Screen options={{drawerLabel:"Menu   ",title:"Menu",drawerIcon:({tintColor})=>(
                        <Icon
                            name="list"
                            type="font-awesome"
                            size={24}
                            color={tintColor}
                            />
                    )}}  name="Menu" component={MenuNavigator}/>
                <Drawer.Screen options={{drawerLabel:"Contact Us   ",title:"Contact Us",drawerIcon:({tintColor})=>(
                        <Icon
                            name="address-card"
                            type="font-awesome"
                            size={22}
                            color={tintColor}
                            />
                    )}}  name="Contact Us" component={ContactUsNavigator}/>
                <Drawer.Screen options={{drawerLabel:"My Favorites   ",title:"My Favorites",drawerIcon:({tintColor})=>(
                        <Icon
                            name="heart"
                            type="font-awesome"
                            size={24}
                            color={tintColor}
                            />
                    )}}  name="My Favorites" component={FavoritesNavigator}/>
                <Drawer.Screen options={{drawerLabel:"Reserve Table   ",title:"Reserve Table",drawerIcon:({tintColor})=>(
                        <Icon
                            name="cutlery"
                            type="font-awesome"
                            size={24}
                            color={tintColor}
                            />
                    )}}  name="Reserve Table" component={ResevationNavigator}/>
            </Drawer.Navigator>
        </NavigationContainer>
        </View>
    )
}

const mapDispatchToProps = dispatch =>({
    fetchDishes: () =>dispatch(fetchDishes()),
    fetchComments: () =>dispatch(fetchComments()),
    fetchLeaders: () =>dispatch(fetchLeaders()),
    fetchPromos: () =>dispatch(fetchPromos())
})
 
const mapStateToProps=state=>{
    return {
        dishes:state.dishes,
        comments:state.comments,
        promotions:state.promotions,
        leaders:state.leaders
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);