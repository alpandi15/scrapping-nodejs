import express from 'express'
import { getListHadits } from '../../controlers/scrapping/scrappingController'

const router = express.Router()

router.get('/scrapping/hadits', getListHadits)

export default router
