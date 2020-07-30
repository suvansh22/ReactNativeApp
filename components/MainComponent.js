import React from 'react'
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes'

export default function Main(){
    const dishes = DISHES
    return(
        <Menu dishes={dishes}/>
    )
}