import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostBySlug,
  publishPost,
  updatePost,
  deletePost,
  getTrendingPosts,
  getTopAuthors,
  getMostViewedPosts,
  getRecommendedPosts
} from "../controllers/post.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all published posts
 *     tags: [Posts]
 */
router.get("/", getAllPosts);

/**
 * @swagger
 * /api/posts/trending:
 *   get:
 *     summary: Get trending posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of trending posts
 */
router.get("/trending", getTrendingPosts);

/**
 * @swagger
 * /api/posts/{id}/publish:
 *   patch:
 *     summary: Publish a blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/:id/publish", authMiddleware, publishPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, deletePost);

/**
 * @swagger
 * /api/posts/{slug}:
 *   get:
 *     summary: Get a single post by slug
 *     tags: [Posts]
 */
router.get("/:slug", getPostBySlug);
router.get("/top-authors", getTopAuthors);
router.get("/most-viewed", getMostViewedPosts);
router.get("/recommended/:slug", getRecommendedPosts);

export default router;