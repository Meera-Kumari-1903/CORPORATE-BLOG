import type { Request, Response } from "express";
import {
  createPostService,
  getAllPostsService,
  getPostBySlugService,
  publishPostService,
  updatePostService,
  deletePostService,
  getTrendingPostsService,
  getTopAuthorsService,
  getMostViewedPostsService,
  getRecommendedPostsService
} from "../services/post.service.js";



// CREATE POST
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {

    const { title, content } = req.body;
    const user = (req as any).user;

    if (!user || !user.id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized user"
      });
      return;
    }

    const post = await createPostService(title, content, user.id);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post
    });

  } catch (error: any) {

    console.error("Create Post Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Error creating post"
    });

  }
};



// GET ALL POSTS (Pagination + Search)
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const search = (req.query.search as string) || "";

    const posts = await getAllPostsService(page, limit, search);

    res.status(200).json({
      success: true,
      ...posts
    });

  } catch (error: any) {

    console.error("Get Posts Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Error fetching posts"
    });

  }
};



// GET POST BY SLUG
export const getPostBySlug = async (req: Request, res: Response): Promise<void> => {
  try {

    const { slug } = req.params;

    const post = await getPostBySlugService(slug);

    res.status(200).json({
      success: true,
      data: post
    });

  } catch (error: any) {

    console.error("Get Post By Slug Error:", error);

    res.status(404).json({
      success: false,
      message: error.message || "Post not found"
    });

  }
};



// TRENDING POSTS
export const getTrendingPosts = async (req: Request, res: Response): Promise<void> => {
  try {

    const posts = await getTrendingPostsService();

    res.status(200).json({
      success: true,
      message: "Trending posts fetched successfully",
      data: posts
    });

  } catch (error: any) {

    console.error("Trending Posts Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Error fetching trending posts"
    });

  }
};



// PUBLISH POST
export const publishPost = async (req: Request, res: Response): Promise<void> => {
  try {

    const { id } = req.params;

    const post = await publishPostService(id);

    res.status(200).json({
      success: true,
      message: "Post published successfully",
      data: post
    });

  } catch (error: any) {

    console.error("Publish Post Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Error publishing post"
    });

  }
};



// UPDATE POST
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {

    const { id } = req.params;
    const { title, content } = req.body;

    const post = await updatePostService(id, title, content);

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post
    });

  } catch (error: any) {

    console.error("Update Post Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Error updating post"
    });

  }
};



// DELETE POST
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {

    const { id } = req.params;

    await deletePostService(id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully"
    });

  } catch (error: any) {

    console.error("Delete Post Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Error deleting post"
    });

  }
};
// TOP AUTHORS
export const getTopAuthors = async (req: Request, res: Response) => {
  try {

    const authors = await getTopAuthorsService();

    res.status(200).json({
      leaderboard: authors
    });

  } catch (error) {

    console.error("Top Authors Error:", error);

    res.status(500).json({
      message: "Error fetching top authors"
    });

  }
};
// MOST VIEWED POSTS
export const getMostViewedPosts = async (req: Request, res: Response) => {
  try {

    const posts = await getMostViewedPostsService();

    res.status(200).json({
      mostViewed: posts
    });

  } catch (error) {

    console.error("Most Viewed Posts Error:", error);

    res.status(500).json({
      message: "Error fetching most viewed posts"
    });

  }
};
// RECOMMENDED POSTS
export const getRecommendedPosts = async (req: Request, res: Response) => {
  try {

    const { slug } = req.params;

    const posts = await getRecommendedPostsService(slug);

    res.status(200).json({
      recommended: posts
    });

  } catch (error) {

    console.error("Recommended Posts Error:", error);

    res.status(500).json({
      message: "Error fetching recommended posts"
    });

  }
};