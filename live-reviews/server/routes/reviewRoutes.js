import express from 'express'
import { createReview, deleteReview, getReviews, getReviewById,updateReview } from '../controllers/review.controller.js'



const router=express.Router()

router.get('/',getReviews)
router.get('/:id',getReviewById)
router.post('/',createReview)
router.put('/:id',updateReview)
router.delete('/:id',deleteReview)


export default router;