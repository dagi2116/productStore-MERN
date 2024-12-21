import { NavLink } from 'react-router-dom'
import ThemeToggle from '../utils/DLMode'



function Navbar() {
    return (
        <div className='flex flex-col xs:flex-row justify-between gap-4  px-8 bg-gary-400'>
            <NavLink to='/'> <h1 className='bg-gray-600 text-white p-4 mt-4'>Product Store</h1></NavLink>
            <div className='flex justify-center items-center gap-4'>
                <NavLink to='/create' className='bg-gray-400 p-2 font-bold rounded-sm'> + </NavLink>
                <ThemeToggle />
            </div>
        </div>
    )
}

export default Navbar