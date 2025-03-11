const form = document.querySelector("#form");

form.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  const body = Object.fromEntries(formData.entries());

  console.log(body);

  const res = await fetch("/submit-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  console.log(data);
});
