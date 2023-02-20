import { useSelector } from 'react-redux'
import classes from './Banner.module.css'

let bannerBackground = ''

const Banner = (props) => {
  const bannerStyle = useSelector(state => state.clientReducer.banner.style)
  switch (bannerStyle) {
    case 'loading':
      bannerBackground = classes.loading
      break
    case 'success':
      bannerBackground = classes.success
      break
    case 'error':
      bannerBackground = classes.error
      break
    default:
      break
  }
  return <div className={`${classes.banner} ${bannerBackground}`}>{props.children}</div>
}

export default Banner
