import CommentService from '../services/CommentService.js';

class CommentController {
  async createComment(req, res) {
    try {
      const { content, author, postId } = req.body;

      if (!content || !author || !postId) {
        return res.status(400).json({
          error: 'Missing required fields: content, author, postId'
        });
      }

      const comment = await CommentService.create({ content, author, postId });
      res.status(201).json(comment);
    } catch (error) {
      if (error.message === 'Post not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async getComments(req, res) {
    try {
      const { postId } = req.query;

      let comments;
      if (postId) {
        comments = await CommentService.findByPostId(postId);
      } else {
        comments = await CommentService.findAll();
      }

      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCommentById(req, res) {
    try {
      const comment = await CommentService.findById(req.params.id);

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateComment(req, res) {
    try {
      const { content, author, postId } = req.body;

      if (!content || !author || !postId) {
        return res.status(400).json({
          error: 'Missing required fields: content, author, postId'
        });
      }

      const comment = await CommentService.update(req.params.id, {
        content,
        author,
        postId
      });

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      res.json(comment);
    } catch (error) {
      if (error.message === 'Post not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async deleteComment(req, res) {
    try {
      const comment = await CommentService.delete(req.params.id);

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CommentController();