class IDatabase {
  /**
   * Connect to the database
   * @returns {Promise<void>}
   */
  async connect() {
    throw new Error('Method connect() must be implemented');
  }

  /**
   * Disconnect from the database
   * @returns {Promise<void>}
   */
  async disconnect() {
    throw new Error('Method disconnect() must be implemented');
  }

  /**
   * Get the database connection instance
   * @returns {any}
   */
  getConnection() {
    throw new Error('Method getConnection() must be implemented');
  }

  /**
   * Check if database is connected
   * @returns {boolean}
   */
  isConnected() {
    throw new Error('Method isConnected() must be implemented');
  }
}

export default IDatabase;