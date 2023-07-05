import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import '../../../Firebase/firebase'
import app from '../../../Firebase/firebase'
import { ref, getDatabase, get } from 'firebase/database'
import SinglePage from '../SinglePage/SinglePage'

const ProductList = ({ cityId, categorieId, singlePage, setSinglePage }) => {

    const [searchData, setSearchData] = useState([])
    const [productId, setProductId] = useState()

    const database = getDatabase(app)

    const getData = async () => {
        const citiesRef = ref(database, `/cities/${cityId}/categories/${categorieId}/products`);
        
        try {
            const snapshotValue = await get(citiesRef)
            const data = snapshotValue.val()
            setSearchData(data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, [categorieId, cityId]);

    const RenderItem = ({item, index}) => {

        const openSinglePage = () => {
            setSinglePage(true)
            setProductId(index)
        }

        return (
            <TouchableOpacity style={styles.itemContainer} onPress={openSinglePage}>
                <Image source={{uri: item.image}} style={styles.image}/>
                <Text style={styles.text}>{item.name}</Text>
                <TouchableOpacity style={styles.priceItem}>
                    <Text style={styles.price}>{`${item.price} $`}</Text>
                    <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    return (
         <ScrollView contentContainerStyle={[styles.container, singlePage && styles.activeMenu]}>
            {searchData.map((product, index) => (
                <RenderItem key={index} item={product} index={index}/>
            ))}
            <View style={styles.productPage}>
                {
                    singlePage && 
                        <SinglePage 
                            cityId={cityId}
                            categorieId={categorieId}
                            productId={productId}
                            singlePage={singlePage}
                            setSinglePage={setSinglePage}
                        />
                }
            </View>
        </ScrollView>
    ) 
}

export default ProductList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12,
        position: 'relative',
        zIndex: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 7,
        // backgroundColor: 'red',
    },
    itemContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    image: {
        width: 172,
        height: 172,
        borderRadius: 17
    },
    text: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#595959',
        lineHeight: 16,
        paddingBottom: 12,
        paddingTop: 4,
    },
    priceItem:{
        width: 105,
        flexDirection: 'row',
        backgroundColor: '#E5E5EA',
        borderRadius: 64,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    price: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        color: '#333333',
        fontSize: 14,
        fontWeight: 'bold',
    },
    plus: {
        fontSize: 20
    },
    productPage: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 16,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        // height: 800,
        position: 'absolute',
        height: '100%',
        left: 0,
        top: 0,
        zIndex: 100,
    },
    activeMenu: {
        flex: 1,
    }
})

