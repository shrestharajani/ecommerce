import React from 'react'
import { DisplayProductByType } from '../DisplayProductByType'

export const BeerImported = () => {
    return (
        <DisplayProductByType title='Imported Beers'
            brand="beer"
            type="imported"
        />
    )
}
