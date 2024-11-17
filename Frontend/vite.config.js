// Import path module using ES module syntax
import path from 'path';

export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Adjust based on your alias needs
    },
  },
  // Add other Vite configuration options as needed
};
