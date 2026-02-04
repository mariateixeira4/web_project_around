export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

export function setupPopupOverlays() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", handleOverlayClose);
  });
}
