import React from 'react'
import {FlatList,View,Text} from 'react-native'
import {Tile} from 'react-native-elements'
import { connect } from 'react-redux'
import {baseUrl} from '../shared/baseUrl'
import {Loading} from './LoadingComponent'
import * as Animatable from 'react-native-animatable'

function Menu(props){

    const {navigation} = props;

    const renderMenuItem = ({item,index}) => {
        return(            
        <Animatable.View animation="fadeInRightBig" duration={2000} delay={1000}>
            <Tile
                key={index}
                title={item.name}
                caption={item.description}
                featured
                onPress={()=>navigation.navigate('Dishdetail',{DishId:item.id})}
                imageSrc={{uri:baseUrl+item.image}}
                />
        </Animatable.View>
        )
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
            data = {props.dishes.dishes}
            renderItem = {renderMenuItem}
            keyExtractor={item=> item.id.toString()} //expects a string
            />
    )
    }
}

const mapStateToProps = state =>{
    return{
        dishes:state.dishes
    }
}

export default connect(mapStateToProps)(Menu);