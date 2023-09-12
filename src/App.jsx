import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation, Routes, Route, useParams } from 'react-router-dom'

const Home = () => {
  return (
    <h1>Welcome to Puppy Bowl!!!</h1>
  )
}

const Puppies = ({ puppies }) => {
  return (
    <div>
      <h1>Puppies</h1>
      <ul>
        {
          puppies.map( puppy => {
            return (
              <li key={puppy.id}>
                <Link to={`/puppies/${puppy.id}`}>
                {puppy.name}
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const Puppy = ({ puppies }) => {
  const params = useParams()
  const id = params.id*1

  const puppy = puppies.find(puppy => puppy.id === id)

  if(!puppy){
    return null;
  }

  return (
    <div>
      <h1>Details for { puppy.name }</h1>
      <div>
        <h3>Breed: {puppy.breed}</h3>
        <h3>Status: {puppy.status}</h3>
        <Link to="/puppies">Back to List of Puppies!</Link>
      </div>
    </div>
  )
}

function App() {
  const [puppies, setPuppies] = useState([])
  const location = useLocation()
  const {pathname} = location

  useEffect(() => {
    const getPuppies = async () => {
      const response = await axios.get("https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players")
      const data = response.data.data.players
      console.log(data)
      setPuppies(data)
    }
    getPuppies()
  }, [])

  return (
    <>
      <nav>
        <Link to="/" className={ pathname === "/" ? "selected": ""}>Home</Link>
        <Link to="/puppies" className={ pathname === "/puppies" ? "selected": ""}>Puppy List ({puppies.length})</Link>
      </nav>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/puppies" element={ <Puppies puppies={ puppies }/> } />
        <Route path="/puppies/:id" element={ <Puppy puppies={ puppies }/> } />
      </Routes>
    </>
  )
}

export default App