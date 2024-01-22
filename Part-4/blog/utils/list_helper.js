const dummy = (blogs) => {
    return 1;
  }
  
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max);
}

const mostBlogs = (blogs) => {
  // Return the author with the most blogs as well as the number of blogs they have in a single object
  // If there are multiple authors with the most blogs, return the first one

  // Create an object to store the number of blogs each author has
  const blogCount = {};
  blogs.forEach(blog => {
    if (blogCount[blog.author]) {
      blogCount[blog.author]++;
    } else {
      blogCount[blog.author] = 1;
    }
  });

  // Find the author with the most blogs
  let max = 0;
  let maxAuthor = '';
  for (let author in blogCount) {
    if (blogCount[author] > max) {
      max = blogCount[author];
      maxAuthor = author;
    }
  }

  return {
    author: maxAuthor,
    blogs: max
  };
}

const mostLikes = (blogs) => {
  // Same as method above except we're looking for the author with the most likes (Return the author with the most likes as well as the number of likes they have in a single object)

  // Create an object to store the number of likes each author has
  const likeCount = {};
  blogs.forEach(blog => {
    if (likeCount[blog.author]) {
      likeCount[blog.author] += blog.likes;
    } else {
      likeCount[blog.author] = blog.likes;
    }
  });

  // Find the author with the most likes
  let max = 0;
  let maxAuthor = '';

  for (let author in likeCount) {
    if (likeCount[author] > max) {
      max = likeCount[author];
      maxAuthor = author;
    }
  }

  return {
    author: maxAuthor,
    likes: max
  };
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}