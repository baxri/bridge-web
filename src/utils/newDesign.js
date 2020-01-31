//import { matchPath } from "react-router-dom";
import { some } from 'lodash'

const uuidRegex = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
const introductionNew = new RegExp(`^/introductions/new$`)
const introductionShow = new RegExp(`^/introductions/${uuidRegex}/?$`)
const introductionPublish = new RegExp(
  `^/introductions/${uuidRegex}/publish/?$`
)

const newUnloggedDesignPaths = ['/login', '/forgot-password', '/register']

const sideViews = [introductionShow, introductionPublish]

const isNewUnloggedDesign = pathname =>
  newUnloggedDesignPaths.includes(pathname)

const isSideView = pathname => some(sideViews, path => pathname.match(path))

const paths = {
  introductionShow,
  introductionNew,
  introductionPublish,
}

export { isNewUnloggedDesign, isSideView, paths }
