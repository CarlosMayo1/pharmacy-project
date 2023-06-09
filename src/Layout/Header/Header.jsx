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
        <li><NavLink to='/' className={({ isActive }) => isActive ? classes.active : undefined}>Inicio</NavLink></li>
        <li><NavLink to='/sells' className={({ isActive }) => isActive ? classes.active : undefined}>Ventas</NavLink></li>
        <li><NavLink to='/products' className={({ isActive }) => isActive ? classes.active : undefined}>Productos</NavLink></li>
        <li><NavLink to='/clients' className={({ isActive }) => isActive ? classes.active : undefined}>Clientes</NavLink></li>
        <li><NavLink to='/registers' className={({ isActive }) => isActive ? classes.active : undefined}>Registros</NavLink></li>
      </ul>
    </header>
  )
}

export default Header
