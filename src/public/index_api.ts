type FilterOptions = {
    filterName: boolean
    filterPrice: boolean
    filterType: boolean
    filterSection: boolean
    filterFavorite: boolean
}

async function getFavoriteItems() {
    try {
        const filter: FilterOptions = {
            filterName: false,
            filterPrice: false,
            filterType: false,
            filterSection: false,
            filterFavorite: true
        }

        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                filter
            })
        })

        if (!response.ok) throw new Error("Could not fetch the resource")

        const data = await response.json()
        return data
    }
    catch(error) {
        console.log(error)
    }
}