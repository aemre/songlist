import api from './index'

/**
 * Gets list of songs
 */
export const getSongs = {
    songs : ()=> api.get('dataset.json')
}