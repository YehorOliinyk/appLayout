import { StyleSheet, Text, View, Animated, Image, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import '../../../Firebase/firebase'
import app from '../../../Firebase/firebase'
import { ref, getDatabase, get } from 'firebase/database'

const SinglePage = ({ cityId, categorieId, productId, singlePage, setSinglePage}) => {

    const database = getDatabase(app)
    const [productItem, setProductItem] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const getData = async () => {
        const citiesRef = ref(database, `/cities/${cityId}/categories/${categorieId}/products/${productId}`);
        
        try {
            const snapshotValue = await get(citiesRef)
            const data = snapshotValue.val()
            setProductItem(data)
            setIsLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, [categorieId, cityId, productId]);

    const onPressClose = () => {
        setSinglePage(false)
    }

    const moveUp = new Animated.Value(800);
    const toValue = singlePage ? 0 : 0;

    Animated.spring(moveUp, {
        useNativeDriver: true,
        toValue: toValue,
    }).start();

    return (
        <>
            {
                isLoading ? (<ActivityIndicator style={styles.indicator}/>) : (
                <Animated.View style={[styles.container, { transform: [{ translateY: moveUp }]}]}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onPressClose}>
                        <Image 
                            source={require('../../../public/images/closeIcon.png')}
                        />
                    </TouchableOpacity>
                    <Image source={{uri: productItem.image}} style={styles.image}/>
                    <Text style={styles.textName}>{productItem.name}</Text>
                    <Text style={styles.description}>{productItem.description}</Text>
                    <Text>{productItem.weight}</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonTitle}>Добавить</Text>
                        <Text>{`${productItem.price} $`}</Text>
                    </TouchableOpacity>
                </Animated.View>
                )
            }
        </>
    )
}

export default SinglePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 16,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 50,
        backgroundColor: 'white',
        gap: 10,
    },
    closeIcon: {
        alignItems: 'flex-end',
        position: 'relative',
        top: 45,
        right: 10,
        zIndex: 40
    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 359,
        height: 339,
        borderRadius: 19,
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 24
    },
    description: {
        
        width: 343
    },
    addButtonTitle: {
        fontWeight: 'bold'
    },
    addButton: {
        backgroundColor: '#E5E5EA',
        width: 343,
        flexDirection: 'row',
        borderRadius: 12,
        justifyContent: 'space-between',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 90
    }
})