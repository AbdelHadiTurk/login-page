
function validateAge() {
  const dob = new Date(document.getElementById("dob").value);
  const today = new Date();

  const age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();

  const realAge = (m < 0 || (m === 0 && today.getDate() < dob.getDate()))
    ? age - 1
    : age;

  if (realAge < 18) {
    alert("Age must be 18 or above");
    return false;
  }
  return true;
}


const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();

window.addEventListener("resize", resize);

const stars = [];

for (let i = 0; i < 300; i++) {
    stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2,
        alpha: Math.random(),
        speed: Math.random() * 0.02
    });
}

let nebulaOffset = 0;

function drawNebula() {
    const g1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(nebulaOffset) * 100,
        canvas.height * 0.4,
        0,
        canvas.width * 0.3,
        canvas.height * 0.4,
        500
    );

    g1.addColorStop(0, "rgba(120,80,255,0.15)");
    g1.addColorStop(1, "transparent");

    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const g2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(nebulaOffset) * 100,
        canvas.height * 0.6,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        600
    );

    g2.addColorStop(0, "rgba(0,180,255,0.12)");
    g2.addColorStop(1, "transparent");

    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
    ctx.fillStyle = "#02030a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawNebula();

    stars.forEach(star => {
        star.alpha += star.speed;

        if (star.alpha > 1 || star.alpha < 0.1) {
            star.speed *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();
    });

    nebulaOffset += 0.002;

    requestAnimationFrame(animate);
}

animate();