export type NumericPlanetValues = {
    rotation_period: number | null, 
    orbital_period: number | null, 
    surface_water: number | null, 
    population: number | null, 
    diameter: number | null, 
}

/**
 * Tipo da entidade de Planetas.
 */
type Planet = NumericPlanetValues & {
    name: string, 
    climate: string, 
    gravity: string, 
    terrain: string, 
    residents: Array<string>, 
    films: Array<string>, 
    created: string, 
    edited: string, 
    url: string
}

export default Planet;