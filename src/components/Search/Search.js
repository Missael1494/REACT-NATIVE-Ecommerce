import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Animated, Keyboard, StyleSheet, Text, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { updateSearchHistoryApi } from '../../api/search'
import colors from '../../styles/colors'
import { AnimatedIcon, inputAnimationWidth, inputAnimation, animatedTransition, animatedTransitionReset, arrowAnimation } from './SearchAnimation'
import { SearchHistory } from './SearchHistory'

const Search = (props) => {
  const { currentSearch } = props;
  const [searchQuery, setSearchQuery] = useState(currentSearch || "")
  const [showHistory, setShowHistory] = useState(false)
  const [countainerHeight, setCountainerHeight] = useState(0)
  const navigation = useNavigation()
  const route = useRoute()

  const openSearch = () => {
    animatedTransition.start()
    setShowHistory(!showHistory)
  }

  const closeSearch =  () => {
    animatedTransitionReset.start()
    Keyboard.dismiss()
    setShowHistory(!showHistory)

  }


    const onChangeSearch = (query) => (setSearchQuery(query))
    //console.log(query) // imprime lo que escribe en el searchbar o barra de busqueda
  

  const onSearch = async (reuseSearch) => {
    const isReuse = typeof reuseSearch === "string"

    closeSearch();

    !isReuse && (await updateSearchHistoryApi(searchQuery))

    if(route.name === "search") {
      navigation.push("search", {
        search: isReuse ? reuseSearch : searchQuery,
      })
    } else {
      navigation.push("search", {
        search: isReuse ? reuseSearch : searchQuery,
      })
    }

    
  }


  return (
    <View 
      style={styles.container}
      onLayout={(e) => setCountainerHeight(e.nativeEvent.layout.height)}  
    >
        <View style={styles.containerInput} >
          <AnimatedIcon 
            name="arrow-left"
            size={20}
            style={[styles.backArrow, arrowAnimation]}
            onPress={closeSearch}
          />
          <Animated.View style={[inputAnimation, {width: inputAnimationWidth}]} >
            <Searchbar 
              placeholder='Busca tu producto' 
              value={searchQuery}
              onFocus={openSearch} 
              onChangeText={onChangeSearch}
              onSubmitEditing={onSearch}
            />
            
          </Animated.View>
        </View>
        <SearchHistory 
          showHistory={showHistory} 
          countainerHeight={countainerHeight}
          onSearch={onSearch}
        />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgDark,
        paddingVertical: 10,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    containerInput: {
      position: "relative",
      alignItems: "flex-end"
    },
    backArrow: {
      position: "absolute",
      left: 0,
      top: 15,
      color: colors.fontLight,
    }
})

export default Search