import { StyleSheet, Text, View, TouchableOpacity, Image  } from 'react-native'
import React from 'react'
import ChooseCategorie from '../ChooseCategorie/ChooseCategorie'

const Cities = ({ appData, choice, setChoice, cityId, setCityId, singlePage }) => {
    const showCities =  () => {
        setChoice(!choice)
    }

    return (
        <TouchableOpacity style={[styles.wrapper, choice && styles.activeMenu]}>
            <TouchableOpacity onPress={showCities} style={styles.chooseCity} disabled={singlePage}>
                <Text style={styles.mainCity}>{appData[cityId].name}</Text>
                <View style={styles.arrowBackground}>
                    <Image source={require('../../../public/images/chooseCity.png')}/>
                </View>
            </TouchableOpacity>
            {
                choice && 
                <TouchableOpacity style={styles.moveUpBar} activeOpacity={1} >
                    <ChooseCategorie 
                        appData={appData} 
                        state={choice} 
                        setState={setChoice}
                        id={cityId}
                        setId={setCityId}
                    />
                </TouchableOpacity>
            }
        </TouchableOpacity>
    )
}

export default Cities;

const styles = StyleSheet.create({
    wrapper: {
        flex: 0.1,
    },
    mainCity: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 12,
    },
    moveUpBar: {
        height: 466,

    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    chooseCity: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 6
    },
    arrowBackground: {
        backgroundColor: '#E5E5EA',
        borderRadius: 48
    },    
    activeMenu: {
        position: 'relative',
        zIndex: 30,
    }
})