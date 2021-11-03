const path = require('path'),
	projectPath = `${path.join(__dirname)}/../`,
	{ outputDirectory, rootDirectory, environmentsDirectory } = require('./constants');

module.exports = {
	projectPath,
	src: path.join(projectPath, rootDirectory),
	outputSrc: path.resolve(projectPath, outputDirectory),
	environments: path.resolve(projectPath, environmentsDirectory),
};
