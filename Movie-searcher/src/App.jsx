import { useState } from 'react'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import './App.css'



export function App() {
  const [ sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort})
  const [searched, setSearched] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSearched(true)
    getMovies()
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
    if (searched) {
      setSearched(false)
    }
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <>
      <div className="page">
        <header>
          <h1>Movie searcher</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input
             style={{
              border: `1px solid ${searched && error ? 'red' : 'transparent'}`
             }}
             onChange={handleChange} value={search} name='search' placeholder='Harry Potter, Naruto...' />
            <button type='submit'>Search</button>
            <input type='checkbox' onChange={handleSort} checked={sort}/>
          </form>
            {error && searched &&  <p style={{ color: 'white'}}>{error}</p>}
        </header>
        <main>
          {
            loading ? <p>Loading</p> : <Movies movies={movies} />
          }
        </main>
      </div>
    </>
  )
}
