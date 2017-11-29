
// Rotate component
AFRAME.registerComponent('rotate', {
  schema: {
    type: 'int',
    default: 1
  },
  tick: function () {
    let currentYRotation = this.el.getAttribute('rotation').y + this.data;
    this.el.setAttribute('rotation', '0 ' + currentYRotation + ' 0');
  },
});
