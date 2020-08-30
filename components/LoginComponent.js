 import React from 'react'
 import {View,Button,StyleSheet} from 'react-native'
 import {Input,CheckBox} from 'react-native-elements'
 import * as SecureStore from 'expo-secure-store'


 function Login(props){
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
                        color="#512DA8"/>
                </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        margin:20
    },
    formInput:{
        margin:40,
    },
    formCheckbox:{
        margin:40,
        backgroundColor:null
    },
    formButton:{
        margin:60
    }
})

 export default Login;