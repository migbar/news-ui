/* eslint-env node */
'use strict';
var Filter = require('broccoli-filter');

function TreeSpy(inputNode) {
  Filter.call(this, inputNode);
}

TreeSpy.prototype = Object.create(Filter.prototype);

TreeSpy.prototype.processString = function(existingString) {
  let comment = ` 
  \n/*
  All rights are Mig's
  */\n`;
  return comment + existingString;
}

TreeSpy.prototype.extensions = ['js'];
TreeSpy.prototype.targetExtension = 'js';


module.exports = {
  name: 'asset-pipeline-spy',

  postprocessTree: function(type, tree) {
    this.ui.writeLine('***********************************');
    this.ui.writeLine('************ type:' + type);
    this.ui.writeLine('***********************************');
    if (type === 'all') {
      return new TreeSpy(tree, {});
    } else {
      return tree;
    }
  },

  isDevelopingAddon() {
    return true;
  }
};