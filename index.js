import express from 'express';
import MongoDatabase from './src/database/MongoDatabase.js';
import PostController from './src/controllers/PostController.js';
import CommentController from './src/controllers/CommentController.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

await MongoDatabase.connect();

app.get('/health', (req, res) => {
  const healthStatus = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: MongoDatabase.isConnected() ? 'Connected' : 'Disconnected'
  };
  
  const statusCode = MongoDatabase.isConnected() ? 200 : 503;
  res.status(statusCode).json(healthStatus);
});

app.post('/post', PostController.createPost);
app.get('/post', PostController.getPosts);
app.get('/post/:id', PostController.getPostById);
app.put('/post/:id', PostController.updatePost);
app.delete('/post/:id', PostController.deletePost);

app.post('/comment', CommentController.createComment);
app.get('/comment', CommentController.getComments);
app.get('/comment/:id', CommentController.getCommentById);
app.put('/comment/:id', CommentController.updateComment);
app.delete('/comment/:id', CommentController.deleteComment);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});