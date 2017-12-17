/* eslint-env node */
'use strict';

module.exports = {
  name: 'news-commander',

  includedCommands: function() {
    return {
      mig: {
        name: 'mig',
        description: 'This command sends the message to a ficticious slack app',
        works: 'insideProject',
        anonymousOptions: ['message'],
        availableOptions: [{
          name: 'channel',
          type: 'String',
          default: 'Annoucements'
        }],
        run: function(commandOptions, positionalArgs) {
          this.ui.writeLine('--------------------------------------------------');
          this.ui.writeLine(`POSTED MESSAGE ON #${commandOptions.channel} : ${positionalArgs[0]}`);
          this.ui.writeLine('--------------------------------------------------');
        }
      }
    }
  },

  isDevelopingAddon() {
    return true;
  }
};