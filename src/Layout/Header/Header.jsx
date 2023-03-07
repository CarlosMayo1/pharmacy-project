import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        Divino Niño
      </div>
      <ul className={classes.navbar}>
        <li><NavLink to='/' className={({ isActive }) => isActive ? classes.active : undefined}>Home</NavLink></li>
        <li><NavLink to='/products' className={({ isActive }) => isActive ? classes.active : undefined}>Products</NavLink></li>
        <li><NavLink to='/clients' className={({ isActive }) => isActive ? classes.active : undefined}>Clients</NavLink></li>
      </ul>
    </header>
  )
}

export default Header
