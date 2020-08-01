import React from 'react'
import { ScrollView,View,Text } from 'react-native'
import { Card } from 'react-native-elements';
import {DISHES} from '../shared/dishes'
import {PROMOTIONS} from '../shared/promotions'
import {LEADERS} from '../shared/leaders'

function RenderItem(props)
{
    const item = props.item
    if(item != null)
    {
        return(
            <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={require('./images/uthappizza.png')}
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

    const dishes = DISHES
    const promotions = PROMOTIONS
    const leaders = LEADERS
    return(
        <ScrollView>
            <RenderItem item = {dishes.filter((dish)=>dish.featured)[0]}/>
            <RenderItem item = {promotions.filter((promo)=>promo.featured)[0]}/>
            <RenderItem item = {leaders.filter((leader)=>leader.featured)[0]}/>
        </ScrollView>
    )
}

export default Home;