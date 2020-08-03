import React from 'react';
import {Text,View,ScrollView,StyleSheet,Picker,Switch,Button,Platform} from 'react-native';
import DatePicker from'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Icon } from 'react-native-elements';

function Reservation(){
    const [guests,setGuests] = React.useState(1);
    const [smoking,setSmoking] = React.useState(false);
    const [date,setDate] = React.useState(new Date);
    const [show,setShow] = React.useState(false);
    const [mode,setMode] = React.useState('date')

    const changeShow = (mode) =>{
        setMode(mode)
        setShow(true)
    }
  
    const handleReservation = () =>{
        console.log("values",guests,smoking)
        setGuests(1)
        setSmoking(false)
        setDate(new Date)
    }

    const changeDate = (event,selectedDate) =>{
        const currentDate = selectedDate || date; 
        setShow(Platform.OS==='ios');
        setDate(currentDate)
    }

    return(
        <ScrollView>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={guests}
                    onValueChange={(itemValue,itemItem)=>setGuests(itemValue)}>
                <Picker.Item label="1" value="1"/>
                <Picker.Item label="2" value="2"/>
                <Picker.Item label="3" value="3"/>
                <Picker.Item label="4" value="4"/>
                <Picker.Item label="5" value="5"/>
                <Picker.Item label="6" value="6"/>
                </Picker>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={smoking}
                    trackColor="#512DA8"
                    onValueChange={(values)=>setSmoking(values)}>
                </Switch>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time </Text>
                <View style={{paddingRight:2,paddingLeft:2}}><Icon onPress={()=>changeShow('time')} name="clock-o" type="font-awesome"/></View>
                <View style={{paddingLeft:2}}><Icon onPress={()=>changeShow("date")} name="date-range" type="material"/></View>
                {show && (<DateTimePicker
                   value={date}
                   mode={mode}
                   display="default"
                   testID='select date and time'
                   onChange={changeDate}/>)}
                <Text style={{padding:5,borderWidth:1,borderStyle:"solid"}}>{date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()}</Text>
            </View>
            <View style={styles.formRow}>
                <Button
                    title="Reserve"
                    color="#512DA8"
                    onPress = {()=>handleReservation()}
                    accessibilityLabel='Learn more about this purple button'
                    />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formRow:{
        alignItems:"center",
        justifyContent:'center',
        flex:1,
        flexDirection:'row',
        margin:20
    },
    formLabel:{
        fontSize:18,
        flex:2
    },
    formItem:{
        flex:1
    }
})

export default Reservation;