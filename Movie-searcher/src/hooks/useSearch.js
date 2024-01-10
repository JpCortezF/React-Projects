import { useState, useEffect, useRef } from "react"

export function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if(isFirstInput.current){
        isFirstInput.current = search === ''
        return
    }
    if(search === ''){
    setError('You can not search an empty movie')
    return
    }
    setError(null)
  }, [search])
  return { search, updateSearch, error}
} 