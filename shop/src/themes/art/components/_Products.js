import React, { useMemo } from 'react'
import get from 'lodash/get'

import Link from 'components/Link'

import useThemeVars from 'utils/useThemeVars'
import useConfig from 'utils/useConfig'
import useProducts from 'utils/useProducts'
import useCurrencyOpts from 'utils/useCurrencyOpts'
import formatPrice from 'utils/formatPrice'

const Products = ({ limit = Infinity, onlyFeatured }) => {
  const { config } = useConfig()
  const { products } = useProducts()
  const currencyOpts = useCurrencyOpts()

  const themeVars = useThemeVars()

  const featuredProductIds = get(themeVars, 'home.featuredProducts', [])

  const productsToRender = useMemo(() => {
    if (onlyFeatured) {
      return featuredProductIds
        .map((productId) => products.find((p) => p.id === productId))
        .filter((p) => Boolean(p))
    }

    return products
  }, [onlyFeatured, products, featuredProductIds])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-12">
      {productsToRender.slice(0, limit).map((product) => {
        const relPath =
          product.imageUrl || `${config.backend}/images/default-image.svg`
        const isOutOfStock = config.inventory && Number(product.quantity) <= 0
        return (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className={`${isOutOfStock ? 'opacity-50' : ''}`}
          >
            <div
              className="w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${relPath})`,
                backgroundSize: product.imageUrl ? undefined : '100px',
                backgroundColor: product.imageUrl ? undefined : '#cbd5e0',
                paddingTop: '100%'
              }}
            />
            <div className="mt-6 font-bold font-header text-primary hover:text-link">
              {product.title}
            </div>
            <div className="text-primary flex">
              {formatPrice(product.price, currencyOpts)}
              {!isOutOfStock ? null : (
                <div className="text-red-500 ml-2">Out of stock</div>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Products
