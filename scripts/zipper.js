const archiver = require('zip-a-folder');
const fs = require('fs');

class Zipper {
  blockPath = './src/blocks/block'
  resultPath = './result.zip'

  async main() {
    this.removePrev(this.resultPath);
    await this.zip(this.blockPath, this.resultPath);
  }

  removePrev(path) {
    try {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async zip(blockPath, resultPath) {
    try {
      await archiver.zip(blockPath, resultPath);

      console.log('✨ Successfully zipped!');
      console.log('Resulting archive may be found in the root folder of the project.');
    } catch (err) {
      console.error(err);
    }
  }
}

new Zipper().main();
