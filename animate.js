const createWinter = () => {
  const winter = document.createElement("div");
  winter.classList.add("winter");

  winter.textContent = "❃";

  winter.style.color = "white";
  winter.style.left = Math.random() * 100 + 1 + "vw";
  winter.style.animationDuration = Math.random() * 3 + 5 + "s";
  winter.style.fontSize = Math.random() * 1 + 1.5 + "rem";

  document.body.appendChild(winter);

  setTimeout(() => {
    winter.remove();
  }, 8000);
};

setInterval(createWinter, 500);
