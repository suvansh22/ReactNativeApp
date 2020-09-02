 import React from 'react'
 import {View,StyleSheet,ScrollView,Image} from 'react-native'
 import {Input,CheckBox,Button, Icon} from 'react-native-elements'
 import * as SecureStore from 'expo-secure-store'
 import * as ImagePicker from 'expo-image-picker'
 import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
 import {baseUrl} from '../shared/baseUrl'
 import * as Permissions from 'expo-permissions'
 import * as ImageManipulator from 'expo-image-manipulator'

 function LoginTab(props){
    const [username,setUsername] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [remember,setRemember] = React.useState(false)
    React.useEffect(()=>{
        SecureStore.getItemAsync('userinfo')
        .then((userdata) => {
            let userinfo = JSON.parse(userdata);
            if(userinfo){
                setUsername(userinfo.username)
                setPassword(userinfo.password)
                setRemember(true)
            }
        })
    },[])

    function handleLogin(){
        console.log(JSON.stringify(username+" "+password+" "+remember))
        if(remember)
        {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username:username,password:password})
                )
                .catch((error) =>console.log("Cold not save user info ",error))
        }
        else{
            SecureStore.deleteItemAsync('userinfo')
            .then(()=>{setPassword('');setUsername('');setRemember(false)})
            .catch((error) =>console.log("Cold not delete user info ",error))
        }
    }

    return(
        <View style={styles.container}>
            <Input
                placeholder="Username"
                leftIcon={{type:'font-awesome',name:'user-o'}}
                onChangeText={(username)=>setUsername(username)}
                value={username}
                style={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{type:'font-awesome',name:'key'}}
                    onChangeText={(password)=>setPassword(password)}
                    value={password}
                    style={styles.formInput}
                    />
                <CheckBox
                    title="Remember Me"
                    checked={remember}
                    center
                    onPress={()=>setRemember(!remember)}
                    containerStyle={styles.formCheckbox}/>
                <View style={styles.formButton}>
                    <Button
                        onPress={()=>handleLogin()}
                        title='Login'
                        icon={
                            <Icon 
                                name='sign-in' 
                                type='font-awesome'
                                size={24}
                                color='white'/>
                            }
                        buttonStyle={{backgroundColor:"#512DA8"}}/>
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={()=>props.navigation.navigate('Register')}
                        title='Register'
                        icon={
                            <Icon 
                                name='user-plus' 
                                type='font-awesome'
                                size={24}
                                color='blue'/>
                            }
                        titleStyle={{color:'blue'}}
                        buttonStyle={{backgroundColor:"#512DA8"}}/>
                </View>
        </View>
    )
}

function RegisterTab(props){
    const [username,setUsername] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [remember,setRemember] = React.useState(false)
    const [firstname,setfirstname] = React.useState('')
    const [lastname,setLastname] = React.useState('')
    const [email,setEmail] = React.useState('')
    const [imageUrl,setImageUrl] = React.useState(baseUrl+'images/logo.png')
    
    async function getImageFromCamera(){
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted')
        {
            let capturedImage = await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                aspect:[4,3]
            })
            if(!capturedImage.cancelled){
                processImage(capturedImage.uri)
            }
        }
    }

    async function getImageFromGallery(){
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted')
        {
            let selectedImage = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                aspect:[4,3],
                quality:1
            })
            if(!selectedImage.cancelled){
                processImage(selectedImage.uri)
            }
        }
    }

    const processImage = async(imageuri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageuri,
            [
                {resize:{width:400}}
            ],
            {format:'png'}
        )
        setImageUrl(processedImage.uri)
    }

    const handleRegister = () =>{
        console.log(JSON.stringify(username+" "+firstname+" "+lastname+" "+password+" "+email+" "+remember))
        if(remember)
        {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username:username,password:password})
                )
                .catch((error) =>console.log("Cold not save user info ",error))
        }
    }
    
    return(
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{uri:imageUrl}}
                    loadingIndicatorSource={require('./images/logo.png')}
                    style={styles.image}
                    />
                <Button
                    title="Camera"
                    onPress={getImageFromCamera}/>
                <Button
                    title="Gallery"
                    onPress={getImageFromGallery}/>
            </View>
            <Input
                placeholder="Username"
                leftIcon={{type:'font-awesome',name:'user-o'}}
                onChangeText={(username)=>setUsername(username)}
                value={username}
                style={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{type:'font-awesome',name:'key'}}
                    onChangeText={(password)=>setPassword(password)}
                    value={password}
                    style={styles.formInput}
                    />
                <Input
                    placeholder="First Name"
                    leftIcon={{type:'font-awesome',name:'user-o'}}
                    onChangeText={(firstname)=>setfirstname(firstname)}
                    value={firstname}
                    style={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={{type:'font-awesome',name:'user-o'}}
                    onChangeText={(lastname)=>setLastname(lastname)}
                    value={lastname}
                    style={styles.formInput}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{type:'font-awesome',name:'envelope-o'}}
                    onChangeText={(email)=>setEmail(email)}
                    value={email}
                    style={styles.formInput}
                    />
                <CheckBox
                    title="Remember Me"
                    checked={remember}
                    center
                    onPress={()=>setRemember(!remember)}
                    containerStyle={styles.formCheckbox}/>
                <View style={styles.formButton}>
                    <Button
                        onPress={()=>handleRegister()}
                        title='Register'
                        icon={
                            <Icon 
                                name='user-plus' 
                                type='font-awesome'
                                size={24}
                                color='white'/>
                            }
                        buttonStyle={{backgroundColor:"#512DA8"}}/>
                </View>
        </View>
        </ScrollView>
    )
}


const Login = () =>{
    const Tab = createBottomTabNavigator()
    return(
        <Tab.Navigator 
            tabBarOptions={{
                activeBackgroundColor:'#9575CD',
                inactiveBackgroundColor:'#D1C4E9',
                activeTintColor:'white',
                inactiveTintColor:'gray'
            }}>
            <Tab.Screen name="Login" component={LoginTab}
                options={{tabBarIcon:({tintColor})=>(
                    <Icon
                        name="sign-in"
                        type="font-awesome"
                        size={24}
                        color={tintColor}
                        />),tabBarLabel:"Login",title:"Register"}}/>
            <Tab.Screen name="Register" component={RegisterTab} 
                options={{tabBarIcon:({tintColor})=>(
                    <Icon
                        name="user-plus"
                        type="font-awesome"
                        size={24}
                        color={tintColor}
                        />),tabBarLabel:"Register",title:"Register"}}/>
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        margin:20
    },
    imageContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        margin:20
    },
    image:{
        margin: 10,
        width: 80,
        height: 60,
    },
    formInput:{
        margin: 20,
    },
    formCheckbox:{
        margin: 20,
        backgroundColor: null
    },
    formButton:{
        margin: 60
    }
})

 export default Login;