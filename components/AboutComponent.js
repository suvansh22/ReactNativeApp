import React from 'react'
import {Card,ListItem} from 'react-native-elements'
import {Text,View,ScrollView,FlatList,SafeAreaView} from 'react-native'
import {LEADERS} from '../shared/leaders'

function OurHistory(){
    return(
        <Card
            title="Our History">
                <Text>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                </Text>
                <Text>{" "}</Text>
                <Text>
                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                </Text>
        </Card>
    )
}

function RenderLeader(){
    const leaders = LEADERS
    const renderMenuItem = ({item,index}) => {
        return(
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{source:require('./images/alberto.png')}}
                />
        )
    }

    return(
        <Card
            title="Corporate Leadership"
            >
        <FlatList
            data = {leaders}
            renderItem = {renderMenuItem}
            keyExtractor={item=> item.id.toString()} //expects a string
            />
        </Card>
    )
}
export default function About(){
    return(
        <ScrollView>
        <OurHistory/>
        <RenderLeader/>
        </ScrollView>
    )
}