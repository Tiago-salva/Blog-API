const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addPost(data) {
  try {
    const newPost = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        userId: data.userId,
        published: data.published,
      },
    });

    return newPost;
  } catch (err) {
    console.error("Error creating post", err);
    throw err;
  }
}

module.exports = { addPost };
