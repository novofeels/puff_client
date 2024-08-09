// next.config.js
module.exports = {
    output: 'export', // Ensures static HTML export
    basePath: '/puff_client', // Set this to match your GitHub repository name
    images: {
        loader: 'default', // Use default loader which does not optimize images
        path: '',
      }
  }
  