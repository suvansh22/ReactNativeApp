import React from 'react'
import {ScrollView,Text} from 'react-native'
import {Card,Button,Icon} from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import * as MailComposer from 'expo-mail-composer'


export default function Contact(){
    
    const sendMail = () =>{
        MailComposer.composeAsync({
            recipients:['comfusion@food.net'],
            subject:'Enquiry',
            body:'To whom it may concern'
        });
    }

    return(
        <ScrollView>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                    title="Contact Information">
                    <Text>{"                 "}</Text>
                        <Text>121, Clear Water Bay Road</Text>
                        <Text>{"                 "}</Text>
                        <Text>Clear Water Bay, Kowloon</Text>
                        <Text>{"                 "}</Text>
                        <Text>HONG KONG</Text>
                        <Text>{"                 "}</Text>
                        <Text>Tel: +852 1234 5678</Text>
                        <Text>{"                 "}</Text>
                        <Text>Fax: +852 8765 4321</Text>
                        <Text>{"                 "}</Text>
                        <Text>Email:confusion@food.net
                        </Text>
                        <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor:"#512DA8"}}
                            icon={<Icon name = "envelope-o" type="font-awesome" color = "white"/>}
                            onPress={sendMail}/>
                </Card>
            </Animatable.View>
        </ScrollView>
    )

}