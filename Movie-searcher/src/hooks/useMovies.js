import { useState, useRef, useMemo } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({search, sort}) {
  const [movies, setResponseMovies] = useState([])
  const [loading, setLoading] = useState()
  const previousSearch = useRef()

  const getMovies = async () => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setResponseMovies(newMovies)
    }
    catch(e) {
      console.error("Error fetching movies:", e)
    } finally {
      setLoading(false)
    }
  }

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.year.localeCompare(b.year))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies , loading}
}