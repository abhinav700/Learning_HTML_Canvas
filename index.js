let canvas = document.getElementById("canvas1");
console.log(canvas);

const ctx = canvas.getContext("2d");
console.log(ctx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

const mouse = {
  x: 100,
  y: 100,
}
let hue = 0;
class Particle {
  constructor(x, y) {
    this.size = Math.random() * 10 + 1;
    this.x = x != null ? x :  Math.random() * (canvas.width - 2 * this.size) + this.size;
    this.y = y != null ? y : Math.random() * (canvas.height - 2 * this.size) + this.size;
    this.color =  `hsl(${hue},100%,50%)`;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5

  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x + this.size >= canvas.width || this.x - this.size <= 0)
      this.speedX = -this.speedX;
    if (this.y + this.size >= canvas.height || this.y - this.size <= 0)
      this.speedY = -this.speedY;
    if (this.size >= 0.3)
      this.size = this.size - 0.3;
    else if (this.size >= 0.02)
      this.size -= 0.01
    else
      this.size = 0
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}
let initParticles = (x = null, y = null) => {
    for (let i = 0; i < 10; i++)
      particlesArray.push(new Particle(x,y));
}


window.addEventListener("click", (e) => {
  console.log(e);
  mouse.x = e.x;
  mouse.y = e.y;
   initParticles(mouse.x, mouse.y)
})


window.addEventListener("mousemove", (e) => {
  console.log(e);
  mouse.x = e.x;
  mouse.y = e.y;
   initParticles(mouse.x, mouse.y)
})

window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.5)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  hue = (hue + 5)%361

  console.log(particlesArray.length)
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].draw()
    particlesArray[i].update()
    for(let j = i; j < particlesArray.length; j++){
      let dx = particlesArray[i].x - particlesArray[j].x;
      let dy = particlesArray[i].y - particlesArray[j].y;

      let distance = Math.sqrt(dx*dx + dy*dy);
      if(distance <= 50)
      {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color;
        ctx.lineWidth =  Math.random()+0.01;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke()
      }
    }
    if(particlesArray[i].size <= 0.4)
      particlesArray.splice(i,1)
  }
  requestAnimationFrame(animate)
}

animate()
 
