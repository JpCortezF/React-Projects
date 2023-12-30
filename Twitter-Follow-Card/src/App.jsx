import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'
export function App() {
    const users = [
        {
            userName: 'JpCortezF',
            name: 'Juan Pablo Cortez',
            isFollowing: true
        },
        {
            userName: 'biancadecima',
            name: 'Bianca Belén Décima',
            isFollowing: false
        },
        {
            userName: 'gabrielagi',
            name: 'Gabriela Gi',
            isFollowing: false
        },
        {
            userName: 'ErnestoAbel',
            name: 'Ernesto Fatala',
            isFollowing: true
        },
    ]
    return(
        <div className='App'>
            {
                users.map(({userName, name, isFollowing}) => (
                    <TwitterFollowCard
                     key={userName}
                     userName={userName}
                     initialIsFollowing={isFollowing}
                    >
                     {name}
                    </TwitterFollowCard>
                ))
            }
        </div>
    )
}