import React from 'react'
import {View,Text,FlatList,Modal, Button} from 'react-native'
import {Card,Icon,Rating,Input} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavorite,postComment } from '../redux/ActionCreators'

function RenderDish(props){
    const dish = props.dish;
    const [showModal,setShowModal] = React.useState(false)
    const [rating,setRating] = React.useState(0)
    const [author,setAuthor] = React.useState('')
    const [comment,setComment] = React.useState('')

    const toggleModal = () =>{
        setShowModal(!showModal)
    }

    const resetForm = () =>{
        setRating(0)
        setAuthor('')
        setComment('')
    }
    
    const submit = () =>{
        props.onSubmit(dish.id,rating,author,comment)
        toggleModal()
    }

    if(dish != null)
    {
        return(
            <View>
            <Card
                featuredTitle={dish.name}
                image={{uri:baseUrl+dish.image}}>
            <Text style={{margin:10}}>
                {dish.description}
            </Text>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
            <Icon
                raised
                reverse
                name={ props.favorite?'heart':'heart-o'}
                type="font-awesome"
                color="#f50"
                onPress={()=>props.favorite?console.log("Already favorite"):props.onPress()}
                />
            <Icon 
                onPress={toggleModal}
                reverse
                color="#512DA8"
                type="font-awesome"
                name={'pencil'}/>
            </View>
            </Card>
            <Modal
                 animationType={'slide'}
                 transparent={false}
                 visible={showModal}
                 onDismiss={()=>{toggleModal();resetForm()}}
                 onRequestClose={()=>{toggleModal();resetForm()}}>
                <View>
                    <Rating
                        showRating
                        type='custom'
                        ratingColor='#CCCC00'
                        ratingBackgroundColor='white'
                        ratingCount={5}
                        imageSize={30}
                        style={{ paddingVertical: 10 }}
                        onFinishRating={(value)=>setRating(value)}
                        />
                </View>
                <View>
                    <Input 
                        placeholder="Author"
                        leftIcon={{type:'font-awesome',name:'user-o'}}
                        onChangeText={value=>setAuthor(value)}/>
                    <Input 
                        placeholder="Comment"
                        leftIcon={{type:'font-awesome',name:'comment-o'}}
                        onChangeText={value=>setComment(value)}/>
                </View>
                <View>
                    <Button
                        onPress={submit}
                        title="Submit"
                        color="#512DA8"/>
                </View>
                <View style={{paddingTop:20}}>
                    <Button 
                        onPress={toggleModal}
                        title="Cancel"
                        color="grey"/>
                </View>
            </Modal>
            </View>
        )
    }
    else
    {
        return(<View></View>)
    }
}

function RenderComments(props){
    const comments = props.comments;
    const renderCommentItem = ({item,index}) => {
        return(
            <View key = {index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <View style={{paddingRight:250}}>
                <Rating 
                    type="custom"
                    readonly
                    ratingCount={5}
                    startingValue={item.rating}
                    imageSize={15}
                    />
                </View>
                <Text style={{fontSize:12}}>{'-- ' + item.author + ',' + item.date}</Text>
            </View>
        )
    }
        return(
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item=>item.id.toString()}
                    />
            </Card>
        )
}

function Dishdetail(props){
    const {route} = props
    const dishId = route.params.DishId;
    function markFavorite(dishId) {
        props.postFavorite(dishId)
    }
    return(
    <ScrollView>
        <RenderDish dish = {props.dishes.dishes[+dishId]}
                    favorite = {props.favorites.some(el=> el===dishId)}
                    onPress = {()=>markFavorite(dishId)}
                    onSubmit = {props.postComment}/>
        <RenderComments comments = {props.comments.comments.filter((comment)=>comment.dishId === dishId)}/>
    </ScrollView>
    )
}

const mapStateToProps = state =>{
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites:state.favorites
    }
}

const mapDisptachToProps = dispatch => ({
    postFavorite:(dishId) => dispatch(postFavorite(dishId)),
    postComment:(dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
})
export default connect(mapStateToProps,mapDisptachToProps)(Dishdetail);