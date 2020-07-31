import React from 'react'
import {View,Text} from 'react-native'
import {Card} from 'react-native-elements'
import {DISHES} from '../shared/dishes'

function RenderDish(props){
    const dish = props.dish;

    if(dish != null)
    {
        return(
            <Card
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}>
            <Text style={{margin:10}}>
                {dish.description}
            </Text>
            </Card>
        )
    }
    else
    {
        return(<View></View>)
    }
}

function Dishdetail({route}){
    const dishes = DISHES
    const dishId = route.params.DishId;
    return(<RenderDish dish = {dishes[+dishId]}/>)
}

Dishdetail.navigateOption={
    title:"Dishdetail"
}

export default Dishdetail;