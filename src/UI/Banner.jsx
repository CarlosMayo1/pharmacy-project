import classes from './Banner.module.css'

let bannerBackground = ''

const Banner = ({ children, style }) => {
  switch (style) {
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
  return <div className={`${classes.banner} ${bannerBackground}`}>{children}</div>
}

export default Banner
