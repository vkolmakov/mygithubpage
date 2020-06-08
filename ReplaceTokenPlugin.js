const fs = require('fs')
const path = require('path')

const PATH_SEPARATOR = path.sep
const UPDATED_RESOURCE_PATH_SEPARATOR = '!'
const TEMP_REPLACEMENT_DIRECTORY = path.join('.', '__REPLACE_TOKEN_DIR__')

class ReplaceTokenPlugin {
  constructor(tokens) {
    this._tokens = tokens
  }

  apply(compiler) {
    const tokens = this._tokens
    const originalResources = new Map()

    function readFile(file) {
      const contentBuf = fs.readFileSync(file)
      return contentBuf.toString()
    }

    function writeFile(file, content) {
      return fs.writeFileSync(file, content)
    }

    function removeDir(dir) {
      fs.readdirSync(dir).forEach((node) => {
        const p = path.join(dir, node)

        if (fs.lstatSync(p).isDirectory()) {
          removeDir(p)
        } else {
          fs.unlinkSync(p)
        }
      })

      return fs.rmdirSync(dir)
    }

    function replaceEveryOccurrence(src, toReplace, replacement) {
      return src.replace(new RegExp(toReplace, 'g'), replacement)
    }

    function hasTokensDefined(resource) {
      return tokens.some(
        (token) => !token.exclude.test(resource) && token.test.test(resource))
    }

    function getUpdatedResourceFilePath(resource) {
      const basename = replaceEveryOccurrence(resource, PATH_SEPARATOR, UPDATED_RESOURCE_PATH_SEPARATOR)

      return path.join(TEMP_REPLACEMENT_DIRECTORY, basename)
    }

    function getTokenReplacementPair(token) {
      const toReplace = token.options.token
      const replacement = token.options.replacement

      return [toReplace, replacement]
    }

    function replaceTokens(toks, content) {
      return toks.reduce((result, token) => {
        const [toReplace, replacement] = getTokenReplacementPair(token)
        return replaceEveryOccurrence(content, toReplace, replacement)
      }, content)
    }

    compiler.plugin('compile', () => {
      if (!fs.existsSync(TEMP_REPLACEMENT_DIRECTORY)) {
        fs.mkdirSync(TEMP_REPLACEMENT_DIRECTORY)
      }
    })

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('build-module', (module) => {
        const request = module.rawRequest

        if (hasTokensDefined(request)) {
          let originalResource
          if (!originalResources.has(request)) {
            originalResource = module.resource
            originalResources.set(request, originalResource)
          } else {
            originalResource = originalResources.get(request)
          }

          const resourceContent = readFile(originalResource)
          const updatedResourceContent = replaceTokens(tokens, resourceContent)

          const updatedResourceFilePath = getUpdatedResourceFilePath(originalResource)

          writeFile(
            updatedResourceFilePath,
            updatedResourceContent)

          module.resource = updatedResourceFilePath
        }
      })
    })

    compiler.plugin('done', () => {
      removeDir(TEMP_REPLACEMENT_DIRECTORY)
    })
  }
}

module.exports = ReplaceTokenPlugin
