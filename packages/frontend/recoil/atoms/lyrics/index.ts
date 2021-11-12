import { atom } from 'recoil'
import { Atoms } from '../../constants'

// export interface LyricType {
//   id: string
//   SongTitle: string
//   protocol: string
// }

export const Lyrics = atom({
  key: Atoms.Lyrics,
  default: [],
})
