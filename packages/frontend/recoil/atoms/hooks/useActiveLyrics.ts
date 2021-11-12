import { useState } from 'react'
import { useRecoilState } from 'recoil'

import { Lyrics } from '../lyrics/index'

export const useActiveLyrics = () => {
  const [activeLyrics, setActiveLyrics] = useRecoilState(Lyrics)

  return { activeLyrics, setActiveLyrics }
}
