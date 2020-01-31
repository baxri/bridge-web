import { range } from 'lodash'

function generatePaginator({ items, page, itemsPerPage }) {
  const totalPages = Math.ceil(items.length / itemsPerPage)

  if (page < 1 || page > totalPages) return null

  const previous = page > 1 ? page - 1 : null
  const next = page < totalPages ? page + 1 : null

  const availablePages = Math.min(5, totalPages)
  const start = Math.max(1, Math.min(page - 2, totalPages - availablePages))
  const end = Math.min(totalPages, page + 2)
  const pages = range(start, end + 1)

  const startItem = (page - 1) * itemsPerPage
  items = items.slice(startItem, startItem + itemsPerPage)

  return { previous, next, pages, page, items }
}

export default generatePaginator
