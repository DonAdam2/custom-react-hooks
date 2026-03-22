const protocol = process.env.HTTPS?.trim() === 'true' ? 'https' : 'http';
const host = process.env.HOST?.trim() || 'localhost';

module.exports = {
  port: 3000,
  protocol,
  host,
  devServer: `${protocol}://${host}`,
  rootDirectory: 'src',
  buildToolsDirectory: 'buildTools',
  publicDirectory: 'public',
  outputDirectory: 'dist',
  environmentsDirectory: 'environments',
  jsSubDirectory: 'js/',
  cssSubDirectory: 'css/',
  isCssModules: false,
  metaInfo: {
    //max 60 (recommended)
    title: 'Adam Morsi',
    //max 150 (recommended)
    description: 'description',
    keywords: 'add you keywords',
  },
};
