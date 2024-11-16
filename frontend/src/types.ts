// default win entry
export type wineEntry = {
    id: number,
    name: string,
    year: number,
    rating: number,
}

// the type of the API reponse
export type apiResponse = {
    code: number,
    message?: string,
}
    
// combined type with api status and an optional wine entry
export type wineStatus = {
    apiResponse: apiResponse,
    wine?: wineEntry,
}
