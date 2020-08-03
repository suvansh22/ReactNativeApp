import React from 'react'
import { ScrollView,View,Text } from 'react-native'
import { Card } from 'react-native-elements';
import { connect } from 'react-redux'
import {baseUrl} from '../shared/baseUrl'
import {Loading} from './LoadingComponent'

function RenderItem(props)
{
    const item = props.item
    if(props.isLoading){
        return(
            <Loading />
        )
    }
    else if(props.errMess){
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }
    else{
        if(item != null)
        {
            return(
                <Card
                    featuredTitle={item.name}
                    featuredSubtitle={item.designation}
                    image={{uri:baseUrl + item.image}}
                    >
                        <Text style={{margin:10}}>
                            {item.description}
                        </Text>  
                </Card>
            )
        }
        else
        {
            return (<View></View>)
        }
    }
}
function Home(props){

    return(
        <ScrollView>
            <RenderItem item = {props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                        isLoading={props.dishes.isLoading}
                        errMess={props.dishes.errMess}/>
            <RenderItem item = {props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                        isLoading={props.promotions.isLoading}
                        errMess={props.promotions.errMess}/>
            <RenderItem item = {props.leaders.leaders.filter((leader)=>leader.featured)[0]}
                        isLoading={props.leaders.isLoading}
                        errMess={props.leaders.errMess}/>
        </ScrollView>
    )
}
const mapStateToProps = state =>{
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        comments:state.comments,
        leaders:state.leaders
    }
}
export default connect(mapStateToProps)(Home);