import React from 'react'
import {FlatList} from 'react-native'
import {ListItem} from 'react-native-elements'
import { DISHES } from '../shared/dishes'

function Menu(props){

    const dishes = DISHES;
    const {navigation} = props;

    const renderMenuItem = ({item,index}) => {
        return(
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                onPress={()=>navigation.navigate('Dishdetail',{DishId:item.id})}
                leftAvatar={{source:require('./images/uthappizza.png')}}
                />
        )
    }

    return(
        <FlatList
            data = {dishes}
            renderItem = {renderMenuItem}
            keyExtractor={item=> item.id.toString()} //expects a string
            />
    )
}

export default Menu;