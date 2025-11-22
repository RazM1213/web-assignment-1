import Post from '../models/post.model.js';
import Comment from '../models/comment.model.js';

class PostService {
  async create(postData) {
    const post = new Post(postData);
    return await post.save();
  }

  async findAll(filter = {}) {
    return await Post.find(filter);
  }

  async findById(id) {
    return await Post.findById(id);
  }

  async findBySender(sender) {
    return await Post.find({ sender });
  }

  async update(id, postData) {
    return await Post.findByIdAndUpdate(
      id,
      postData,
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    await Comment.deleteMany({ postId: id });
    return await Post.findByIdAndDelete(id);
  }
}

export default new PostService();