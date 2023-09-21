const talojenUrl = "4.1.json";

async function fetchTalot() {
  const response = await fetch(talojenUrl);
  return await response.json();
}

async function renderTalot() {
  const talot = await fetchTalot();
  const talojenElement = document.getElementById("talot");

  talot.forEach(talo => {
    const taloContainer = document.createElement("div");
    taloContainer.classList.add("taloContainer");

    const taloImage = document.createElement("img");
    taloImage.classList.add("taloImage");
    taloImage.src = talo.image;

    const textContainer = document.createElement("div");
    textContainer.classList.add("textContainer");

    const header = document.createElement("p");
    header.classList.add("header");
    header.textContent = talo.address;

    const size = document.createElement("p");
    size.textContent = `${talo.size} neliömetriä`;

    const text = document.createElement("p");
    text.classList.add("text");
    text.textContent = talo.text;

    const price = document.createElement("p");
    price.textContent = `€${talo.price}`;

    textContainer.appendChild(header);
    textContainer.appendChild(size);
    textContainer.appendChild(text);
    textContainer.appendChild(price);

    taloContainer.appendChild(taloImage);
    taloContainer.appendChild(textContainer);

    talojenElement.appendChild(taloContainer);
  });
}

renderTalot();
