import React from 'react'
import {Card,ListItem} from 'react-native-elements'
import {Text,ScrollView,FlatList} from 'react-native'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { Loading } from './LoadingComponent'
import * as Animatable from 'react-native-animatable'
 
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

function RenderLeader(props){
    const renderMenuItem = ({item,index}) => {
        return(
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{source:{uri:baseUrl+item.image}}}
                />
        )
    }
    return(
        <Card
            title="Corporate Leadership"
            >
        <FlatList
            data = {props.leaders}
            renderItem = {renderMenuItem}
            keyExtractor={item=> item.id.toString()} //expects a string
            />
        </Card>
    )
}
function About(props){
    if(props.leaders.isLoading){
        return(
            <ScrollView>
                <OurHistory />
                <Card title="Corporate Leadership">
                    <Loading/>
                </Card>
            </ScrollView>
        )
    }
    else if(props.leaders.errMess){
        return(
            <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <OurHistory />
                    <Card title="Corporate Leadership">
                        <Text>{props.leaders.erMess}</Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
    else{
        return(
            <ScrollView>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <OurHistory/>
                <RenderLeader leaders={props.leaders.leaders}/>
            </Animatable.View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}
export default connect(mapStateToProps)(About);