import React from 'react'
import { DisplayProductByType } from '../DisplayProductByType'

export const BeerDomestic = () => {
    return (
        <DisplayProductByType title='Domestic Beers'
            brand="beer"
            type="domestic"
        />
    )
}
