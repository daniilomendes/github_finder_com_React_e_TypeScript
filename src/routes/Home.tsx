import {UserProps} from "../types/user"

import Search from "../components/Search"
import User from "../components/User"
import Error from "../components/Error"
import {useState} from "react"
import Loader from "../components/Loader"


const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false)
    const [isLoading, setIsloading] = useState(false)

    const loadUser =async (userName: string) => {
        setIsloading(true)
        setError(false)
        setUser(null)

        const res = await fetch(`https://api.github.com/users/${userName}`)
        const data = await res.json();

        setIsloading(false)

        if(res.status === 404){
            setError(true)
            return
        }
        
        const {avatar_url, login, location, followers, following} = data

        const userData: UserProps = {
            avatar_url, 
            login, 
            location, 
            followers, 
            following
        }

        setUser(userData)
    }


  return (
    <div>
        <Search loadUser={loadUser}/>
        {isLoading && <Loader/>}
        {user && <User {...user}/>}
        {error && <Error/>}
    </div>
  )
}

export default Home