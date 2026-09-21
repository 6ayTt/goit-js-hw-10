import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const getForm = document.querySelector(".form");

getForm.addEventListener("submit", event => {
  event.preventDefault();

  const getDelay = Number(event.target.elements.delay.value);
  const getState = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (getState === "fulfilled") {
        resolve(getDelay);
      } else {
        reject(getDelay);
      }
    }, getDelay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: "Success",
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: "Error",
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});