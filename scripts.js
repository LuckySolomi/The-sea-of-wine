const dropMenu = document.querySelector(".header__drop-menu");
const burgerMenu = document.querySelector('#burgerMenu');
burgerMenu.addEventListener("click", () => {
  dropMenu.classList.toggle("display-flex");
  console.log(dropMenu);
});
const closeMenu = document.querySelector('#closeMenu');
closeMenu.addEventListener("click", () => {
  dropMenu.classList.remove("display-flex");
});

document.addEventListener("click", (event) => {
  if (!dropMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
    dropMenu.classList.remove("display-flex");
  }
});

function addAnimationSupport() {
  const elementsDesktopSettings = [0.95, 0.79, 0.7, 0.65];
  const elementsMobileSettings = [0.25, 0.9, 0.55, 0.15];

  const desktopPath =
    "M0 2.7264C27.7089 -3.53755 112.477 4.46936 127.709 73.77C146.749 160.396 83.1268 433.106 236.377 382.689C389.628 332.272 419.949 297.395 507.584 313.48C621.149 334.325 789.056 481.65 714.461 555.941C646.218 623.905 561.263 574.698 639.254 519.227C730.529 454.309 945.711 638.671 1163.84 533.22C1262.72 485.422 1347.52 550.746 1363 555.941";
  const desktopViewBox = "0 0 1364 590";
  const mobilePath =
    "M99.976 1C91.6982 23.9333 99.9758 82.7366 201.336 80.3845C247.793 77.4443 356.655 119.783 323.982 188.583C282.931 275.023 327.374 355.642 299.5 392C281.622 415.319 339.693 499.944 307.765 570.804C289.197 612.011 216.034 645.842 178.53 625.427C127.128 597.444 102.003 698.625 -10 640.863";
  const mobileViewBox = "0 0 331 660";
  const svgPathsToAnimation = [];
  const elementsToAppear = [];

  class SvgPathToAppear {

    constructor(svgPath, ancor) {
      this.topOffset = 0;
      this.targetOffset = 1;
      this.currentOffset = 1;
      this.realAnimation = 1;
      this.svgPath = svgPath;
      this.ancor = ancor;
    }
  }

  class ElementToAppear {
    constructor(element, relatedSvgPath, dashoffsetForAppear) {
      this.element = element;
      this.relatedSvgPath = relatedSvgPath;
      this.dashoffsetForAppear = dashoffsetForAppear;
    }
  }

  const path = document.querySelector("path.line");

  const ancor = document.querySelector(".history-page");
  if (path && ancor) {
    const firstSvgPathToAppear = new SvgPathToAppear(path, ancor);
    firstSvgPathToAppear.topOffset = 400;
    svgPathsToAnimation.push(firstSvgPathToAppear);

    const image1 = document.querySelector(".animation-image.image-1");
    if (image1) {
      const elementToAppear = new ElementToAppear(
        image1,
        firstSvgPathToAppear,
        0.95
      );
      elementsToAppear.push(elementToAppear);
    }

    const image2 = document.querySelector(".animation-image.image-2");
    if (image2) {
      const elementToAppear = new ElementToAppear(
        image2,
        firstSvgPathToAppear,
        0.79
      );
      elementsToAppear.push(elementToAppear);
    }
    const image3 = document.querySelector(".animation-image.image-3");
    if (image3) {
      const elementToAppear = new ElementToAppear(
        image3,
        firstSvgPathToAppear,
        0.7
      );
      elementsToAppear.push(elementToAppear);
    }

    const image4 = document.querySelector(".animation-image.image-4");
    if (image4) {
      const elementToAppear = new ElementToAppear(
        image4,
        firstSvgPathToAppear,
        0.65
      );
      elementsToAppear.push(elementToAppear);
    }
  }

  document.addEventListener("scroll", () => {
    checkAnimationElements();
  });
  checkAnimationElements();
  window.addEventListener("resize", function () {
    setElementsSettings();
    checkPathAndChange();
  });
  checkPathAndChange();
  setElementsSettings();

  requestAnimationFrame(animate);

  function animate() {
    for (let index = 0; index < svgPathsToAnimation.length; index++) {
      const svgPathToAppear = svgPathsToAnimation[index];
      const difference =
        svgPathToAppear.targetOffset - svgPathToAppear.currentOffset;
      const mod = 0.05;
      if (Math.abs(difference) > 0.001) {
        svgPathToAppear.currentOffset += difference * mod;
      } else {
        svgPathToAppear.currentOffset = svgPathToAppear.targetOffset;
      }
      svgPathToAppear.realAnimation = easeCubicBezier(
        svgPathToAppear.currentOffset
      );
      svgPathToAppear.svgPath.style.setProperty(
        "stroke-dashoffset",
        svgPathToAppear.realAnimation
      );
    }

    for (let index = 0; index < elementsToAppear.length; index++) {
      const elementToAppear = elementsToAppear[index];
      if (
        elementToAppear.relatedSvgPath.realAnimation <
        elementToAppear.dashoffsetForAppear
      ) {
        elementToAppear.element.classList.add("show");
      } else {
        elementToAppear.element.classList.remove("show");
      }
    }
    requestAnimationFrame(animate);
  }
  function easeCubicBezier(t) {
    const easingArray = [0, 1, 0.68, 1];
    return (
      (1 - t) * (1 - t) * (1 - t) * easingArray[0] +
      3 * (1 - t) * (1 - t) * t * easingArray[1] +
      3 * (1 - t) * t * t * easingArray[2] +
      t * t * t * easingArray[3]
    );
  }

  function checkPathAndChange() {
    if (window.innerWidth < 768) {
      path.setAttribute("d", mobilePath);
      path.parentElement.setAttribute("viewBox", mobileViewBox);
    } else {
      path.setAttribute("d", desktopPath);
      path.parentElement.setAttribute("viewBox", desktopViewBox);
    }
  }

  function setElementsSettings() {
    for (let index = 0; index < elementsToAppear.length; index++) {
      if (window.innerWidth < 768) {
        elementsToAppear[index].dashoffsetForAppear =
          elementsMobileSettings[index];
      } else {
        elementsToAppear[index].dashoffsetForAppear =
          elementsDesktopSettings[index];
      }
    }
  }

  function checkAnimationElements() {
    for (let index = 0; index < svgPathsToAnimation.length; index++) {
      const svgPathToAppear = svgPathsToAnimation[index];

      const realOffset =
        svgPathToAppear.ancor.getBoundingClientRect().top -
        svgPathToAppear.topOffset;

      if (realOffset < 0) {
        let dashoffset =
          1 -
          Math.abs(realOffset) /
          svgPathToAppear.svgPath.getBoundingClientRect().height;
        if (dashoffset < 0) {
          dashoffset = 0;
        }
        svgPathToAppear.targetOffset = dashoffset;
      }
    }
  }
}

window.onload = function () {
  setTimeout(function () {
    document.querySelector(".delayed-logos").classList.add("show");
  }, 1000);
  addAnimationSupport();
};
