type FilterOptions = {
    filterName: boolean
    filterPrice: boolean
    filterType: boolean
    filterSection: boolean
    filterFavorite: boolean
}

type FilterParameters = {
    searchedName?: string,
    priceRange?: {floorPrice: Number, roofPrice: Number},
    types?: String[],
    sections?: String[]
}

export async function getFavoriteItems(isFiltered: FilterOptions, filters?: FilterParameters): Promise<Object[]> {
    try {
        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                filter: [isFiltered, filters]
            })
        })

        if (!response.ok) throw new Error("Could not fetch the resource")

        const data: Object[] = await response.json()
        return data
    }
    catch(error) {
        throw(error);
    }
}