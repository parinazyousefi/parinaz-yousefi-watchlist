import './Header.scss';
import { Link } from 'react-router-dom';
const Header=()=>{
    return(
        <div className="header">
            <Link to='/auth/discover'>
            <h1 className='title'>WATCHLIST</h1>
            </Link>
            <ul className='header__list'>
                <Link to='/auth/discover' className='header__item'>Search</Link>
                <Link to='/auth/surprise' className='header__item'>Surprise Me!</Link>
                <Link to='/auth/myList' className='header__item'>My list</Link>
            </ul>
        </div>

    )
}
export default Header;