'use strict';

goog.require('Blockly.Generator');

Blockly.JSON = new Blockly.Generator('JSON');

Blockly.JSON.ORDER_ATOMIC = 0;

Blockly.JSON.init = function(workspace) {
  Blockly.JSON.objectContainer = Object.create(null);
  Blockly.JSON.objectContainer = '{ "interfaces": [ $ ] }';
};

Blockly.JSON.finish = function(code) {
  var objectContainer = Blockly.JSON.objectContainer;
  delete Blockly.JSON.objectContainer;
  return objectContainer.replace('$', code);
};

Blockly.JSON.scrub_ = function(block, code) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if(nextBlock)
    return code + " , " + Blockly.JSON.blockToCode(nextBlock);
  return code;
};
