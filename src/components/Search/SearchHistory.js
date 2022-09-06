import { map } from 'lodash';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { getSearchHistoryApi } from '../../api/search';
import colors from '../../styles/colors';
import AwesomeIcon from "react-native-vector-icons/FontAwesome"


export const SearchHistory = (props) => {
    const {showHistory, countainerHeight, onSearch} = props;
    const [history, setHistory] = useState(null);

    useEffect(() => {
      if(showHistory){
        (async () => {
            const response = await getSearchHistoryApi()
            setHistory(response)
        })()
      }

    }, [showHistory])
    

  return (
    <View style={[showHistory ? styles.history : styles.hidden, {top: countainerHeight} ]} >
        {history &&
            map(history, (item, index) => (
                <TouchableWithoutFeedback
                    key={index}
                    onPress={() => onSearch(item.search) }
                >
                    <View style={styles.historyItem}>
                        <Text style={styles.text} >{item.search}</Text>
                        <AwesomeIcon name='arrow-right' size={16} />
                    </View>
                </TouchableWithoutFeedback>
            ))
        }
    </View>
  )
}

const styles = StyleSheet.create({
    hidden: {
        display: "none"
    },
    history: {
        position: "absolute",
        backgroundColor: colors.bgLight,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    historyItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 0.2,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text: {
        color: "#53005f",
        fontSize: 16,
        fontWeight: "bold"
    }
})
