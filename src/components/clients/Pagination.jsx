import classes from './Pagination.module.css'

const Pagination = ({ totalClients, clientsPerPage, setCurrentPage, currentPage }) => {
  const pages = []

  for (let i = 1; i <= Math.ceil(totalClients / clientsPerPage); i++) {
    pages.push(i)
  }

  return (
    <div className={classes.actions}>
      {pages.map((page, index) => {
        return (
          <button className={page === currentPage ? classes.active : ''} key={index} onClick={() => setCurrentPage(page)}>{page}</button>
        )
      })}
    </div>
  )
}

export default Pagination
