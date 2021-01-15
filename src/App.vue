<template>
  <div>
    <div id="leftCover"></div>
    <div id="leftLine"></div>
    <div id="rightCover"></div>
    <div id="rightLine"></div>
    <router-view />
  </div>
</template>

<style>
body {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.text-responsive {
  font-size: calc(20% + 1vw + 1vh) !important;
}

#leftCover {
  background-color: rgb(46, 46, 46);
  z-index: 998;
  position: fixed;
  width: 50%;
  height: 100%;
  animation: slideLeft 0.6s ease-in 4s forwards;
  -moz-animation: slideLeft 0.6s ease-in 4s forwards;
  -webkit-animation: slideLeft 0.6s ease-in 4s forwards;
  -o-animation: slideLeft 0.6s ease-in 4s forwards;
}

#leftLine {
  background-color: #ff6f00;
  z-index: 999;
  position: fixed;
  top: -100%;
  left: calc(50% - 2px);
  height: 100%;
  width: 4px;
  -webkit-animation: increaseLeftLine 4s forwards,
    slideLeftLine 0.6s ease-in 4s forwards;
  -moz-animation: increaseLeftLine 4s forwards,
    slideLeftLine 0.6s ease-in 4s forwards;
  -o-animation: increaseLeftLine 4s forwards,
    slideLeftLine 0.6s ease-in 4s forwards;
  animation: increaseLeftLine 4s forwards,
    slideLeftLine 0.6s ease-in 4s forwards;
}

#rightCover {
  background-color: rgb(46, 46, 46);
  z-index: 998;
  position: fixed;
  left: 50%;
  width: 50%;
  height: 100%;
  animation: slideRight 0.6s ease-in 4s forwards;
  -moz-animation: slideRight 0.6s ease-in 4s forwards;
  -webkit-animation: slideRight 0.6s ease-in 4s forwards;
  -o-animation: slideRight 0.6s ease-in 4s forwards;
}

#rightLine {
  background-color: #00cde8;
  z-index: 999;
  position: fixed;
  top: 100%;
  left: calc(50% + 2px);
  height: 100%;
  width: 4px;
  -webkit-animation: increaseRightLine 4ss forwards,
    slideRight 0.6s ease-in 4s forwards;
  -moz-animation: increaseRightLine 4s forwards,
    slideRight 0.6s ease-in 4s forwards;
  -o-animation: increaseRightLine 4s forwards,
    slideRight 0.6s ease-in 4s forwards;
  animation: increaseRightLine 4s forwards, slideRight 0.6s ease-in 4s forwards;
}

@keyframes slideLeft {
  0% {
    left: 0%;
    top: 0%;
  }
  99% {
    left: -50%;
    top: 0%;
  }
  100% {
    left: -50%;
    top: 0%;
    visibility: hidden;
  }
}
@-moz-keyframes slideLeft {
  0% {
    left: 0%;
    top: 0%;
  }
  99% {
    left: -50%;
    top: 0%;
  }
  100% {
    left: -50%;
    top: 0%;
    visibility: hidden;
  }
}
@-webkit-keyframes slideLeft {
  0% {
    left: 0%;
    top: 0%;
  }
  99% {
    left: -50%;
    top: 0%;
  }
  100% {
    left: -50%;
    top: 0%;
    visibility: hidden;
  }
}
@-o-keyframes slideLeft {
  0% {
    left: 0%;
    top: 0%;
  }
  99% {
    left: -50%;
    top: 0%;
  }
  100% {
    left: -50%;
    top: 0%;
    visibility: hidden;
  }
}

@keyframes slideRight {
  0% {
    left: 50%;
    top: 0%;
  }
  99% {
    left: 100%;
    top: 0%;
  }
  100% {
    left: 100%;
    top: 0%;
    visibility: hidden;
  }
}
@-moz-keyframes slideRight {
  0% {
    left: 50%;
    top: 0%;
  }
  99% {
    left: 100%;
    top: 0%;
  }
  100% {
    left: 100%;
    top: 0%;
    visibility: hidden;
  }
}
@-webkit-keyframes slideRight {
  0% {
    left: 50%;
    top: 0%;
  }
  99% {
    left: 100%;
    top: 0%;
  }
  100% {
    left: 100%;
    top: 0%;
    visibility: hidden;
  }
}
@-o-keyframes slideRight {
  0% {
    left: 50%;
    top: 0%;
  }
  99% {
    left: 100%;
    top: 0%;
  }
  100% {
    left: 100%;
    top: 0%;
    visibility: hidden;
  }
}

@keyframes increaseLeftLine {
  100% {
    top: 0%;
  }
}
@-moz-keyframes increaseLeftLine {
  100% {
    top: 0%;
  }
}
@-webkit-keyframes increaseLeftLine {
  100% {
    top: 0%;
  }
}
@-o-keyframes increaseLeftLine {
  100% {
    top: 0%;
  }
}

@keyframes increaseRightLine {
  100% {
    top: 0%;
  }
}
@-moz-keyframes increaseLeftLine {
  100% {
    top: 0%;
  }
}
@-webkit-keyframes increaseLeftLine {
  100% {
    top: 0%;
  }
}
@-o-keyframes increaseLeftLine {
  100% {
    top: 0%;
  }
}

@keyframes slideLeftLine {
  0% {
    left: 50%;
    top: 0%;
  }
  99% {
    left: 0%;
    top: 0%;
  }
  100% {
    left: 0%;
    top: 0%;
    visibility: hidden;
  }
}
@-moz-keyframes slideLeftLine {
  0% {
    left: 50%;
    top: 0%;
  }
  99% {
    left: 0%;
    top: 0%;
  }
  100% {
    left: 0%;
    top: 0%;
    visibility: hidden;
  }
}
@-webkit-keyframes slideLeftLine {
  0% {
    left: 50%;
    top: 0%;
  }
  99% {
    left: 0%;
    top: 0%;
  }
  100% {
    left: 0%;
    top: 0%;
    visibility: hidden;
  }
}
@-o-keyframes slideLeftLine {
  0% {
    left: 50%;
    top: 0%;
  }
  99% {
    left: 0%;
    top: 0%;
  }
  100% {
    left: 0%;
    top: 0%;
    visibility: hidden;
  }
}
</style>
