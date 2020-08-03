import React from 'react'
import { ScrollView,View,Text } from 'react-native'
import { Card } from 'react-native-elements';
import { connect } from 'react-redux'
import {baseUrl} from '../shared/baseUrl'

function RenderItem(props)
{
    const item = props.item
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
function Home(props){

    // console.log("A:",props)
    return(
        <ScrollView>
            <RenderItem item = {props.dishes.dishes.filter((dish)=>dish.featured)[0]}/>
            <RenderItem item = {props.promotions.promotions.filter((promo)=>promo.featured)[0]}/>
            <RenderItem item = {props.leaders.leaders.filter((leader)=>leader.featured)[0]}/>
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