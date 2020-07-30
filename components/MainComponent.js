import React from 'react'
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes'
import Dishdetail from './DishdetailComponent'
import {View} from 'react-native'

export default function Main(){
    const dishes = DISHES
    const [selectedDish,setSelectedDish] = React.useState(null)

    function onDishSelect(dishId){
        setSelectedDish(dishId);
    }
    return(
        <View>
        <Menu dishes={dishes} 
            onPress={(dishId)=>onDishSelect(dishId)}/>
        <Dishdetail dish={dishes.filter((dish)=>dish.id === selectedDish)[0]}/>
        </View>
    )
}