import mongoose from 'mongoose';
import IDatabase from './IDatabase.js';

class MongoDatabase extends IDatabase {
  constructor() {
    super();
    this.connection = null;
    this.mongooseInstance = mongoose;
  }

  /**
   * Connect to MongoDB
   * @returns {Promise<void>}
   */
  async connect() {
    try {
      const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/postsdb';
      
      this.connection = await this.mongooseInstance.connect(MONGO_URI);

      console.log('MongoDB connected successfully');
      console.log(`Database: ${this.mongooseInstance.connection.name}`);
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  /**
   * Disconnect from MongoDB
   * @returns {Promise<void>}
   */
  async disconnect() {
    try {
      await this.mongooseInstance.disconnect();
      this.connection = null;
      console.log('MongoDB disconnected successfully');
    } catch (error) {
      console.error('MongoDB disconnection error:', error);
      throw error;
    }
  }

  /**
   * Get the Mongoose connection instance
   * @returns {mongoose.Connection}
   */
  getConnection() {
    return this.connection;
  }

  /**
   * Check if MongoDB is connected
   * @returns {boolean}
   */
  isConnected() {
    return this.mongooseInstance.connection.readyState === 1;
  }

  /**
   * Get Mongoose instance (for model creation)
   * @returns {mongoose}
   */
  getMongoose() {
    return this.mongooseInstance;
  }
}

export default new MongoDatabase();