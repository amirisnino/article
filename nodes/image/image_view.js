"use strict";

var NodeView = require("../node").View;

// Substance.Image.View
// ==========================================================================

var ImageView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.addClass('image');
  this.$el.attr('id', this.node.id);
};

ImageView.Prototype = function() {

  // Rendering
  // =============================
  //

  var _indexOf = Array.prototype.indexOf;

  // Render Markup
  // --------
  //
  // div.content
  //   div.img-char
  //     .img

  this.render = function() {

    var content = document.createElement('div');
    content.className = 'content';

    var imgChar = document.createElement('div');
    imgChar.className = 'image-char';
    this._imgChar = imgChar;

    var img = document.createElement('img');
    img.src = this.node.url || this.node.medium;
    img.alt = "alt text";
    img.title = "alt text";
    imgChar.appendChild(img);

    content.appendChild(imgChar);

    // Add content
    this.el.appendChild(content);

    this._imgPos = _indexOf.call(imgChar.childNodes, img);

    return this;
  };

  this.delete = function(pos, length) {
    var content = this.$('.content')[0];
    var spans = content.childNodes;
    for (var i = length - 1; i >= 0; i--) {
      content.removeChild(spans[pos+i]);
    }
  };

  this.getCharPosition = function(el, offset) {
    // TODO: is there a more general approach? this is kind of manually coded.

    if (el === this._imgChar) {
      return (offset > this._imgPos) ? 1 : 0;
    }

    console.log("Errhhh..");

  };

  this.getDOMPosition = function(charPos) {
    if (charPos === 0) {
      var content = this.$('.content')[0];
      var range = document.createRange();
      range.setStartBefore(content.childNodes[0]);
      return range;
    }

    console.log("Errhhh..");
  };
};

ImageView.Prototype.prototype = NodeView.prototype;
ImageView.prototype = new ImageView.Prototype();

module.exports = ImageView;
