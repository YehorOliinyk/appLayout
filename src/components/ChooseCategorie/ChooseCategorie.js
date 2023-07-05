import { 
    StyleSheet, 
    Text, 
    View, 
    FlatList, 
    StatusBar, 
    Image, 
    TouchableOpacity,
    Animated,
    ScrollView
} from 'react-native'
import React from 'react'

const ChooseCategorie = ( { appData, state, setState, id, setId } ) => {
    const Item = ({item, onPress, choosed, color}) => (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <Text style={[styles.title, {color}]} >{item.name}</Text>
            {
                choosed && <Image source={require('../../../public/images/choosedCity.png')}/>
            }
        </TouchableOpacity>
    )

    const renderItem = ({item}) => {
        const choosed = item.id === id
        const color = item.id === id ? '#1B1B1B' : '#848484'

        const setupId = () => {
            setId(item.id)
            setState(!state)
        }   

        return (
            <Item
                item={item}
                onPress={setupId}
                choosed={choosed}
                color={color}
            />
        );
    };

    const onPressClose = () => {
        setState(false)    
    }

    const moveUp = new Animated.Value(700);
    const toValue = state ? 400 : 0;

    Animated.spring(moveUp, {
        useNativeDriver: true,
        toValue: toValue,
    }).start();

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: moveUp }]}]} >
            <TouchableOpacity  style={styles.swipe}>
                <Image 
                    source={require('../../../public/images/swipe.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeIcon} onPress={onPressClose}>
                <Image 
                    source={require('../../../public/images/closeIcon.png')}
                />
            </TouchableOpacity>
            <FlatList
                data={appData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={id}
            />
        </Animated.View>
    );
}

export default ChooseCategorie

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 16,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        flexDirection: 'column',
        backgroundColor: '#fff',
        // position: 'relative',
        // zIndex: 62
    },
    item: {
        paddingBottom: 16,
        paddingTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    closeIcon: {
        alignItems: 'flex-end',
        position: 'relative',
        right: -4,
    },
    swipe: {
        alignItems: 'center',
        paddingTop: 12
    },
})