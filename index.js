import "./index.html";
import "./style.css";
import "./panel.css";
import "./blossoms.jpg";

const findBySelectorButton = document.querySelector(".selector-find");
const findNextButton = document.querySelector(".selector-next");
const findPreviousButton = document.querySelector(".selector-prev");
const findParentButton = document.querySelector(".nav-top");
const findChildButton = document.querySelector(".nav-bottom");
const findNextNeighbourButton = document.querySelector(".nav-left");
const findPreviousNeighbourButton = document.querySelector(".nav-right");
let arrayOfElements = [];
let current = 0;
const style = document.createElement("style");
let selectedElement;
let arrayOfChildren = [];
style.type = "text/css";
style.innerHTML =
  ".selected { outline: solid red 5px; background-color: lightblue; }";
document.getElementsByTagName("head")[0].appendChild(style);
function examineSelectedElementElement(examinatedElement) {
  if (examinatedElement.getElementsByTagName("*").length > 0)
    findChildButton.removeAttribute("disabled");
  else findChildButton.setAttribute("disabled", "disabled");
  if (document.body === examinatedElement) {
    findPreviousNeighbourButton.setAttribute("disabled", "disabled");
    findNextNeighbourButton.setAttribute("disabled", "disabled");
    findParentButton.setAttribute("disabled", "disabled");
    return;
  }
  if (selectedElement.parentElement)
    findParentButton.removeAttribute("disabled");
  else findParentButton.setAttribute("disabled", "disabled");
  arrayOfChildren = Object.values(selectedElement.parentElement.children);
  arrayOfChildren = arrayOfChildren.filter((child) => child.tagName !== "BR");
  // console.log(arrayOfChildren);
  if (arrayOfChildren.indexOf(selectedElement) < arrayOfChildren.length - 1)
    findPreviousNeighbourButton.removeAttribute("disabled");
  else findPreviousNeighbourButton.setAttribute("disabled", "disabled");
  if (arrayOfChildren.indexOf(selectedElement) > 0)
    findNextNeighbourButton.removeAttribute("disabled");
  else findNextNeighbourButton.setAttribute("disabled", "disabled");
}
document
  .querySelector(".jsbursa-panel")
  .addEventListener("click", function panelClicked(event) {
    if (event.target === findBySelectorButton) {
      current = 0;
      findParentButton.setAttribute("disabled", "disabled");
      findNextNeighbourButton.setAttribute("disabled", "disabled");
      findPreviousNeighbourButton.setAttribute("disabled", "disabled");
      findChildButton.setAttribute("disabled", "disabled");
      findPreviousButton.setAttribute("disabled", "disabled");
      findNextButton.setAttribute("disabled", "disabled");
      if (selectedElement) selectedElement.classList.remove("selected");
      // for (el of arrayOfElements) el.classList.remove("selected");
      if (Array.isArray(arrayOfElements))
        arrayOfElements.map((element) => element.classList.remove("selected"));
      const s = document.querySelector(".selector").value;
      arrayOfElements = document.querySelectorAll(s);
      if (arrayOfElements.length === 0) return;
      // console.log(arrayOfElements);
      arrayOfElements[0].classList.add("selected");
      [selectedElement] = arrayOfElements;
      if (arrayOfElements.length > 1) {
        findNextButton.removeAttribute("disabled");
      }
      examineSelectedElementElement(selectedElement);
      return;
    }
    if (event.target === findPreviousButton) {
      findNextButton.removeAttribute("disabled");
      arrayOfElements[current].classList.remove("selected");
      current -= 1;
      arrayOfElements[current].classList.add("selected");
      selectedElement = arrayOfElements[current];
      if (current < 1) findPreviousButton.setAttribute("disabled", "disabled");
      examineSelectedElementElement(selectedElement);
      return;
    }
    if (event.target === findNextButton) {
      findPreviousButton.removeAttribute("disabled");
      arrayOfElements[current].classList.remove("selected");
      current += 1;
      arrayOfElements[current].classList.add("selected");
      selectedElement = arrayOfElements[current];
      if (current >= arrayOfElements.length - 1)
        findNextButton.setAttribute("disabled", "disabled");
      examineSelectedElementElement(selectedElement);
      return;
    }
    if (event.target.classList[0].includes("nav-")) {
      findNextButton.setAttribute("disabled", "disabled");
      findPreviousButton.setAttribute("disabled", "disabled");
      selectedElement.classList.remove("selected");
    } else return;
    if (event.target === findParentButton) {
      selectedElement = selectedElement.parentElement;
    } else if (event.target === findChildButton) {
      [selectedElement] = selectedElement.children;
    } else if (event.target === findNextNeighbourButton) {
      selectedElement =
        arrayOfChildren[arrayOfChildren.indexOf(selectedElement) - 1];
      selectedElement.classList.add("selected");
    } else if (event.target === findPreviousNeighbourButton) {
      selectedElement =
        arrayOfChildren[arrayOfChildren.indexOf(selectedElement) + 1];
      selectedElement.classList.add("selected");
    }
    selectedElement.classList.add("selected");
    examineSelectedElementElement(selectedElement);
  });
