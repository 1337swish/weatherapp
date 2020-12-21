<template>
  <div class="home">
    <div v-if="loaded" class="container-fluid">
      <div id="location" class="row justify-content-center">
        <div class="col-md-4 col-lg-3">
          <LocationBar class="locationbar" @update="fetchWeather" />
        </div>
      </div>

      <!-- Name of city -->
      <div class="row text-center">
        <div class="col">
          <h1 class="display-3">
            {{ weatherNow.data[0].city_name }}
          </h1>
        </div>
      </div>

      <!-- Name of country -->
      <div class="row text-center">
        <div class="col">
          <h5>
            {{ country }}
          </h5>
        </div>
      </div>
      <div class="row justify-content-center py-1">
        <div class="col-12 col-sm-8 col-md-6">
          <carousel :perPage="1" paginationActiveColor="#5bc0de">
            <slide id="VueCarousel-slide-0"
              ><WeatherWidget
                :weatherNow="weatherNow"
                :temperatureScale="temperatureScale"
            /></slide>
            <slide
              ><WeatherWidget
                :weatherForecast="weatherForecast.data[1]"
                :temperatureScale="temperatureScale"
            /></slide>
            <slide
              ><WeatherWidget
                :weatherForecast="weatherForecast.data[2]"
                :temperatureScale="temperatureScale"
            /></slide>
            <slide
              ><WeatherWidget
                :weatherForecast="weatherForecast.data[3]"
                :temperatureScale="temperatureScale"
            /></slide>
            <slide
              ><WeatherWidget
                :weatherForecast="weatherForecast.data[4]"
                :temperatureScale="temperatureScale"
            /></slide>
            <slide
              ><WeatherWidget
                :weatherForecast="weatherForecast.data[5]"
                :temperatureScale="temperatureScale"
            /></slide>
            <slide
              ><WeatherWidget
                :weatherForecast="weatherForecast.data[6]"
                :temperatureScale="temperatureScale"
            /></slide>
          </carousel>
        </div>
      </div>
      <v-switch
        id="tempSwitch"
        v-model="temperatureScale"
        text-enabled="Fahrenheit"
        text-disabled="Celsius"
        theme="bootstrap"
        color="primary"
      ></v-switch>
    </div>
  </div>
</template>

<script>
import LocationBar from "@/components/LocationBar.vue";
import WeatherWidget from "@/components/WeatherWidget.vue";
import axios from "axios";
export default {
  name: "Home",
  components: {
    LocationBar,
    WeatherWidget,
  },
  data: function () {
    return {
      weatherNow: null,
      weatherForecast: null,
      temperatureScale: false,
      country: null,
      loaded: false,
    };
  },
  methods: {
    getLocation: function () {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.fetchWeather({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
          this.fetchWeather({
            city: "Stockholm",
          });
        }
      );
    },
    fetchWeather: async function (args) {
      let URL = "https://api.weatherbit.io/v2.0/current?";
      let URL2 = "https://api.weatherbit.io/v2.0/forecast/daily?";
      // eslint-disable-next-line no-prototype-builtins
      if (args.hasOwnProperty("latitude")) {
        URL = URL + "&lat=" + args.latitude;
        URL2 = URL2 + "&lat=" + args.latitude;
      }
      // eslint-disable-next-line no-prototype-builtins
      if (args.hasOwnProperty("longitude")) {
        URL = URL + "&lon=" + args.longitude;
        URL2 = URL2 + "&lon=" + args.longitude;
      }
      // eslint-disable-next-line no-prototype-builtins
      if (args.hasOwnProperty("city")) {
        URL = URL + "&city=" + args.city;
        URL2 = URL2 + "&city=" + args.city;
      }
      this.country = args.country;
      URL = URL + "&key=f35e9420a2f441d0ad9dbf081cc1bd11";
      URL2 = URL2 + "&key=f35e9420a2f441d0ad9dbf081cc1bd11";
      await axios
        .get(URL)
        .then((response) => (this.weatherNow = response.data));
      await axios
        .get(URL2)
        .then((response) => (this.weatherForecast = response.data));
      this.loaded = true;
      console.log(this.weatherForecast.data[6]);
    },
    background: function () {
      if (this.weatherNow) {
        // Time between sunrise to dawn in minutes
        let sunriseMins =
          parseInt(this.weatherNow.data[0].sunrise.substring(0, 2)) * 60 +
          parseInt(this.weatherNow.data[0].sunrise.substring(3));
        let sunsetMins =
          parseInt(this.weatherNow.data[0].sunset.substring(0, 2)) * 60 +
          parseInt(this.weatherNow.data[0].sunset.substring(3));
        let minutesDiff =
          sunriseMins < sunsetMins
            ? sunsetMins - sunriseMins
            : 24 * 60 - (sunriseMins - sunsetMins);

        // Minutes after sunrise
        let time = new Date();
        let minutesNow =
          parseInt(time.getUTCHours()) * 60 + parseInt(time.getUTCMinutes());
        let minutesAfterSunrise = minutesNow - sunriseMins;

        let node1 = document.querySelector(".v-select");
        let node2 = document.querySelector(".v-select .vs__selected");
        let node3 = document.querySelector(".v-select .vs__dropdown-menu");
        let node4 = document.querySelector(".v-select .vs__spinner");
        let nodeList = [];
        if (node1) nodeList.push(node1);
        if (node2) nodeList.push(node2);
        if (node3) nodeList.push(node3);
        if (node4) nodeList.push(node4);

        // Set background and text color depending on time
        if (minutesAfterSunrise > 0 && minutesAfterSunrise < 60) {
          document.body.style.backgroundImage = `url(${require("@/assets/backgrounds/dawn.jpg")})`;
          document.body.style.color = "white";
          nodeList.forEach((node) => (node.style.color = "white"));
        } else if (
          minutesAfterSunrise > 59 &&
          minutesAfterSunrise < minutesDiff
        ) {
          document.body.style.backgroundImage = `url(${require("@/assets/backgrounds/day.jpg")})`;
          document.body.style.color = "black";
          nodeList.forEach((node) => (node.style.color = "black"));
        } else if (
          minutesAfterSunrise > minutesDiff - 1 &&
          minutesAfterSunrise < minutesDiff + 45
        ) {
          document.body.style.backgroundImage = `url(${require("@/assets/backgrounds/dawn.jpg")})`;
          document.body.style.color = "white";
          nodeList.forEach((node) => (node.style.color = "white"));
        } else {
          document.body.style.backgroundImage = `url(${require("@/assets/backgrounds/night.jpg")})`;
          document.body.style.color = "white";
          nodeList.forEach((node) => (node.style.color = "white"));
        }
      }
    },
  },
  created() {
    this.getLocation();
  },
  updated() {
    this.background();
    document
      .getElementById("VueCarousel-slide-0")
      .classList.add("VueCarousel-slide-active");
  },
};
</script>

<style>
#tempSwitch {
  position: relative;
  margin-left: -18px;
  left: 50%;
}

.VueCarousel-slide {
  transition: all 1s;
  opacity: 0 !important;
}

.VueCarousel-slide-active {
  opacity: 1 !important;
}

@media (max-width: 767px) {
  #location {
    padding-top: 1em;
    padding-bottom: 1em;
  }
}

@media (min-width: 768px) {
  #location {
    padding-top: 3em;
    padding-bottom: 2em;
  }
}
</style>