<template>
  <div class="loader-container flex justify-center align-center">
    <div class="loader">Loading...</div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style>
.loader-container {
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: white;
  border-bottom: 1px solid rgb(163, 163, 163);
}

.loader {
  font-size: 10px;
  text-indent: -9999em;
  width: 8em;
  height: 8em;
  border-radius: 50%;
  background: #292929;
  background: -moz-linear-gradient(left, #292929 10%, rgba(41, 41, 41, 0) 42%);
  background: -webkit-linear-gradient(left, #292929 10%, rgba(41, 41, 41, 0) 42%);
  background: -o-linear-gradient(left, #292929 10%, rgba(41, 41, 41, 0) 42%);
  background: -ms-linear-gradient(left, #292929 10%, rgba(41, 41, 41, 0) 42%);
  background: linear-gradient(to right, #292929 10%, rgba(41, 41, 41, 0) 42%);
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

.loader:before {
  width: 50%;
  height: 50%;
  background: #292929;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}

.loader:after {
  background: white;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>