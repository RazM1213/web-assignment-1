import PostService from "../services/PostService.js";

class PostController {
  async createPost(req, res) {
    try {
      const { title, content, sender } = req.body;

      if (!title || !content || !sender) {
        return res.status(400).json({
          error: 'Missing required fields: title, content, sender'
        });
      }

      const post = await PostService.create({ title, content, sender });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPosts(req, res) {
    try {
      const { sender } = req.query;

      let posts;
      if (sender) {
        posts = await PostService.findBySender(sender);
      } else {
        posts = await PostService.findAll();
      }

      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPostById(req, res) {
    try {
      const post = await PostService.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePost(req, res) {
    try {
      const { title, content, sender } = req.body;

      if (!title || !content || !sender) {
        return res.status(400).json({
          error: 'Missing required fields: title, content, sender'
        });
      }

      const post = await PostService.update(req.params.id, {
        title,
        content,
        sender
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletePost(req, res) {
    try {
      const post = await PostService.delete(req.params.id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PostController();