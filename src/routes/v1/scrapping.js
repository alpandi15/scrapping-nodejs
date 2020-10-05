import express from 'express'
import { getListHadits, getDataHadits } from '../../controlers/scrapping/scrappingController'

const router = express.Router()

router.get('/scrapping/hadits', getListHadits)
router.get('/get-hadits', getDataHadits)

export default router
