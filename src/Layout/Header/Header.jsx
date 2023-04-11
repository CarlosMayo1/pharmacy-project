import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'
// import logo from '../../assets/logo.png'

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes['logo-wrapper']}>
        Divino Niño
        {/* <img className={classes.logo} src={logo} alt='Divino Niño' /> */}
      </div>
      <ul className={classes.navbar}>
        <li><NavLink to='/' className={({ isActive }) => isActive ? classes.active : undefined}>Home</NavLink></li>
        <li><NavLink to='/sells' className={({ isActive }) => isActive ? classes.active : undefined}>Sells</NavLink></li>
        <li><NavLink to='/products' className={({ isActive }) => isActive ? classes.active : undefined}>Products</NavLink></li>
        <li><NavLink to='/clients' className={({ isActive }) => isActive ? classes.active : undefined}>Clients</NavLink></li>
      </ul>
    </header>
  )
}

export default Header
