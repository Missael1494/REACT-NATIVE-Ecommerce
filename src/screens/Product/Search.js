import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { searchProductsApi } from '../../api/search';
import { StatusBarCustom } from '../../components/StatusBarCustom';
import colors from '../../styles/colors';
import Search from '../../components/Search/Search'
import { size } from 'lodash';
import { ScreenLoading } from '../../components/ScreenLoading';
import { ResultNotFound } from '../../components/Search/ResultNotFound';
import { ProductList } from '../../components/Search/ProductList';

export default function SearchScreen(props) {
   const {route} = props;
    const {params} = route;
    const [products, setProducts] = useState(null)

    useEffect(() => {
      (async () => {
        setProducts(null)
        const response = await searchProductsApi(params.search);
        setProducts(response);
      })()
    
    }, [params])
    

  return (
    <>
      <StatusBarCustom backgroundColor={colors.bgDark} barStyle="light-content" />
      <Search currentSearch={params.search} />
      {!products ? (
        <ScreenLoading text="Buscando productos" />
      ) : size(products) === 0 ? (
        <ResultNotFound search={params.search} />
      ) : (
        <ProductList products={products} />
      )}
    </>
  )
}
