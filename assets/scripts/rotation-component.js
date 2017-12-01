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

function Snowball (snowballNode, parent) {
  this.radius = 0.08;
  this.y = 20;
  this.x = Math.floor(Math.random() * 18) - 9;
  this.z = Math.floor(Math.random() * 18) - 9;
  this.parent = parent;
  this.element = snowballNode.cloneNode(true);
  this.element.setAttribute('radius', `${this.radius}`);
  this.element.setAttribute('position', `${this.x} ${this.y} ${this.z}`);
  parent.appendChild(this.element);
}


AFRAME.registerComponent('snow', {
  schema: {
     speed: { type: 'number' },
     amount: { type: 'number' }
   },
  init: function () {
    this.count = 0;
    this.snowballs = [];
    this.snowball = document.querySelector('#snow-ball');

    // Create my balls
    for (let i = 0; i < this.data.amount; i++) {
      const ball = new Snowball(this.snowball, this.el.parentNode);
      this.snowballs.push(ball);
    }
  },
  update: function () {

  },
  tick: function () {
    this.count++
    this.snowballs.forEach( (snowball, index) => {
      snowball.update(this.data.speed);
      snowball.element.setAttribute('position', snowball.x +' '+ snowball.y +' '+snowball.z);

      if( snowball.y < 0 ){
        snowball.element.parentNode.removeChild(snowball.element);
        this.snowballs.splice(index, 1);
      }
    });

    if(this.count % 25 === 0) {
      this.snowball = document.getElementById('snow-ball');

      // Create my balls
      for (let i = 0; i < this.data.amount; i++) {
        const ball = new Snowball(this.snowball, this.el.parentNode);
        this.snowballs.push(ball);
      }
    }
  },
});


Snowball.prototype.update = function (amount) {
  this.y -= amount;
}
