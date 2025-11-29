import Comment from '../models/comment.model.js';
import Post from '../models/post.model.js';

class CommentService {
  async create(commentData) {
    const post = await Post.findById(commentData.postId);
    if (!post) {
      throw new Error('Post not found');
    }

    const comment = new Comment(commentData);
    return await comment.save();
  }

  async findAll(filter = {}) {
    return await Comment.find(filter);
  }

  async findById(id) {
    return await Comment.findById(id);
  }

  async findByPostId(postId) {
    return await Comment.find({ postId });
  }

  async update(id, commentData) {
    if (commentData.postId) {
      const post = await Post.findById(commentData.postId);
      if (!post) {
        throw new Error('Post not found');
      }
    }

    return await Comment.findByIdAndUpdate(
      id,
      commentData,
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await Comment.findByIdAndDelete(id);
  }
}

export default new CommentService();