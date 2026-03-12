import prisma from "../lib/prisma.js";
import { generateSlug } from "../utils/slug.js";


// CREATE POST
export const createPostService = async (
  title: string,
  content: string,
  authorId: string
) => {

  if (!title || !content || !authorId) {
    throw new Error("Missing required fields");
  }

  const baseSlug = generateSlug(title);
  let slug = baseSlug;

  const existingPost = await prisma.post.findUnique({
    where: { slug },
  });

  if (existingPost) {
    slug = `${baseSlug}-${Date.now()}`;
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      slug,
      authorId,
      status: "DRAFT",
    },
  });

  return post;
};



// GET ALL PUBLISHED POSTS (Pagination + Search)
export const getAllPostsService = async (
  page: number,
  limit: number,
  search: string
) => {

  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  });

  const totalPosts = await prisma.post.count({
    where: {
      status: "PUBLISHED",
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return {
    page,
    limit,
    totalPosts,
    totalPages: Math.ceil(totalPosts / limit),
    posts,
  };
};



// GET SINGLE POST BY SLUG
export const getPostBySlugService = async (slug: string) => {

  if (!slug) {
    throw new Error("Slug is required");
  }

  const post = await prisma.post.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      comments: true,
      likes: true,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return {
    title: post.title,
    content: post.content,
    author: post.author.name,
    commentsCount: post.comments.length,
    likesCount: post.likes.length,
  };
};



// TRENDING POSTS (Optimized)
export const getTrendingPostsService = async () => {

  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED"
    },
    select: {
      id: true,
      title: true,
      slug: true,
      views: true,
      author: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true
        }
      }
    },
    orderBy: {
      views: "desc"
    },
    take: 5
  });

  const trendingPosts = posts.map((post: any) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    author: post.author.name,
    views: post.views,
    likes: post._count.likes,
    comments: post._count.comments,
    score: post.views + post._count.likes + post._count.comments
  }));

  return trendingPosts;
};

// PUBLISH POST
export const publishPostService = async (id: string) => {

  const post = await prisma.post.update({
    where: { id },
    data: {
      status: "PUBLISHED",
    },
  });

  return post;
};



// UPDATE POST
export const updatePostService = async (
  id: string,
  title?: string,
  content?: string
) => {

  let slug;

  if (title) {
    slug = generateSlug(title);
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(content && { content }),
      ...(slug && { slug }),
    },
  });

  return post;
};



// DELETE POST
export const deletePostService = async (id: string) => {

  const post = await prisma.post.delete({
    where: { id },
  });

  return post;
};
// INCREMENT POST VIEWS
export const incrementPostViewsService = async (slug: string) => {

  const post = await prisma.post.update({
    where: { slug },
    data: {
      views: {
        increment: 1
      }
    },
    select: {
      id: true,
      title: true,
      slug: true,
      views: true
    }
  });

  return post;
};
// TOP AUTHORS LEADERBOARD
export const getTopAuthorsService = async () => {

  const authors = await prisma.post.groupBy({
    by: ["authorId"],
    where: {
      status: "PUBLISHED"
    },
    _count: {
      id: true
    },
    _sum: {
      views: true
    },
    orderBy: {
      _sum: {
        views: "desc"
      }
    },
    take: 5
  });

  const result = await Promise.all(
    authors.map(async (author: any) => {

      const user = await prisma.user.findUnique({
        where: { id: author.authorId },
        select: { name: true }
      });

      return {
        author: user?.name,
        posts: author._count.id,
        totalViews: author._sum.views ?? 0
      };
    })
  );

  return result;
};
// MOST VIEWED POSTS
export const getMostViewedPostsService = async () => {

  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED"
    },
    select: {
      id: true,
      title: true,
      slug: true,
      views: true,
      author: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      views: "desc"
    },
    take: 5
  });

  return posts.map((post: any) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    author: post.author.name,
    views: post.views
  }));
};
// RECOMMENDED POSTS
export const getRecommendedPostsService = async (slug: string) => {

  const currentPost = await prisma.post.findUnique({
    where: { slug }
  });

  if (!currentPost) {
    throw new Error("Post not found");
  }

  const words = currentPost.title.split(" ");

  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      slug: {
        not: slug
      },
      OR: words.map((word: String) => ({
        title: {
          contains: word,
          mode: "insensitive"
        }
      }))
    },
    select: {
      id: true,
      title: true,
      slug: true,
      views: true
    },
    take: 5
  });

  return posts;
};