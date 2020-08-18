import React from 'react';
import {FlatList,View,Text,Alert} from 'react-native'
import {ListItem} from 'react-native-elements'
import { connect } from 'react-redux'
import {baseUrl} from '../shared/baseUrl'
import {Loading} from './LoadingComponent'
import Swipeout from 'react-native-swipeout'
import {deleteFavorite} from '../redux/ActionCreators'

function Favorites(props){
    const {navigation} = props
    
    const renderMenuItem = ({item,index}) => {
        const rightButton = [
            {
                text:'Delete',
                type:'delete',
                onPress:()=>{
                    Alert.alert(
                        'Delet Favorite?',
                        'Are you sure you wish to delete the favorite dish '+item.name+'?',
                        [
                            {
                                text:'Cancel',
                                onPress:()=>console.log(item.name+'Not Deleted'),
                                style: 'cancel'
                            },
                            {
                                text:'Okay',
                                onPress:()=>props.deleteFavorite(item.id),
                            }
                        ],
                        {cancelable:false}
                    )
                }
            }
        ]
        return(
            <Swipeout right={rightButton} autoClose={true}>
            <ListItem
                key = {index}
                title = {item.name}
                subtitle = {item.description}
                hideChevron = {true}
                onPress={()=>navigation.navigate('Dishdetail',{DishId:item.id})}
                leftAvatar={{source:{uri:baseUrl+item.image}}}/>
            </Swipeout>
        );
    }
    if(props.dishes.isLoading){
        return(
            <Loading/>
        )
    }
    else if(props.dishes.errMess){
        return(
            <View>
                <Text>{props.dishes.errMess}</Text>
            </View>
        )
    }
    else{
        return(
            <FlatList
                data={props.dishes.dishes.filter(dish => props.favorites.some(el => el== dish.id))}
                renderItem = {renderMenuItem}
                keyExtractor={item => item.id.toString()}/>
        )
    }
}

const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        favorites: state.favorites
    }
}

const mapDisptachToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

export default connect(mapStateToProps,mapDisptachToProps)(Favorites)