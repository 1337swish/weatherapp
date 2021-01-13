<template>
  <div v-if="loaded" class="home">
    <!-- Location search bar & find location button -->
    <div id="locationBar">
      <div class="text-center">
        <button class="btn" @click="findUserLocation" id="locationButton">
          FIND YOUR LOCATION
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-geo-alt"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
            />
            <path
              d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
            />
          </svg>
        </button>
      </div>
      <LocationBar
        id="locationSearch"
        class="locationbar"
        @update="fetchWeather"
      />
    </div>

    <!-- Name of city -->
    <h1 id="cityText" class="display-3 coloredText">
      {{ weatherNow.data[0].city_name }}
    </h1>

    <!-- Name of country -->
    <div id="countryText">
      <div class="col">
        <h5 class="coloredText">
          {{ country }}
        </h5>
      </div>
    </div>

    <!-- Carousel -->
    <div id="carousel">
      <carousel
        :perPage="1"
        paginationActiveColor="#ff6f00"
        paginationColor="#ffffff"
      >
        >
        <slide id="VueCarousel-slide-0"
          ><WeatherWidget
            :weatherNow="weatherNow"
            :temperatureScale="temperatureScale"
            :page="1"
        /></slide>
        <slide
          ><WeatherWidget
            :weatherForecast="weatherForecast.data[1]"
            :temperatureScale="temperatureScale"
            :page="2"
        /></slide>
        <slide
          ><WeatherWidget
            :weatherForecast="weatherForecast.data[2]"
            :temperatureScale="temperatureScale"
            :page="3"
        /></slide>
        <slide
          ><WeatherWidget
            :weatherForecast="weatherForecast.data[3]"
            :temperatureScale="temperatureScale"
            :page="4"
        /></slide>
        <slide
          ><WeatherWidget
            :weatherForecast="weatherForecast.data[4]"
            :temperatureScale="temperatureScale"
            :page="5"
        /></slide>
        <slide
          ><WeatherWidget
            :weatherForecast="weatherForecast.data[5]"
            :temperatureScale="temperatureScale"
            :page="6"
        /></slide>
        <slide
          ><WeatherWidget
            :weatherForecast="weatherForecast.data[6]"
            :temperatureScale="temperatureScale"
            :page="7"
        /></slide>
      </carousel>
    </div>
    <!-- Temperature scale switch -->
    <v-switch
      id="tempSwitch"
      v-model="temperatureScale"
      text-enabled="Fahrenheit"
      text-disabled="Celsius"
      theme="bootstrap"
      color="warning"
    ></v-switch>
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
    findUserLocation: function () {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.fetchWeather({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
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

        let elements = document.getElementsByClassName("coloredText");
        let tempText = document.getElementsByClassName("vue-switcher__label");
        // Set background and text color depending on time
        if (minutesAfterSunrise > 0 && minutesAfterSunrise < 60) {
          document.body.style.backgroundImage = `url(${require("@/assets/backgrounds/dawn.jpg")})`;
          tempText[0].style.color = "white";
          elements.forEach((e) => {
            e.style.textShadow = "black 1px 1px 4px";
            e.style.color = "white";
          });
        } else if (
          minutesAfterSunrise > 59 &&
          minutesAfterSunrise < minutesDiff
        ) {
          document.body.style.backgroundImage = `url(${require("@/assets/backgrounds/day.jpg")})`;
          tempText[0].style.color = "black";
          elements.forEach((e) => {
            e.style.textShadow = "none";
            e.style.color = "black";
          });
        } else if (
          minutesAfterSunrise > minutesDiff - 1 &&
          minutesAfterSunrise < minutesDiff + 45
        ) {
          document.body.style.backgroundImage = `url(${require("@/assets/backgrounds/dawn.jpg")})`;
          tempText[0].style.color = "white";
          elements.forEach((e) => {
            e.style.textShadow = "black 1px 1px 4px";
            e.style.color = "white";
          });
        } else {
          document.body.style.backgroundImage = `url(${require("@/assets/backgrounds/night.png")})`;
          tempText[0].style.color = "white";
          elements.forEach((e) => {
            e.style.textShadow = "black 1px 1px 4px";
            e.style.color = "white";
          });
        }
      }
    },
  },
  created() {
    this.fetchWeather({
      city: "London",
    });
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
#locationBar {
  padding-top: 1em;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  z-index: 999;
}

#locationButton {
  position: relative;
  color: black;
  background: white;
  border-color: rgb(199, 199, 199);
  border-radius: 5px;
  padding: 3px 6px;
}

#locationSearch {
  padding: 1em;
}

#cityText {
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  top: 15%;
}

#countryText {
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  top: 23%;
}

#carousel {
  position: fixed;
  width: 100%;
  z-index: -98;
}

#tempSwitch {
  position: fixed;
  padding: 0;
  width: 36px;
  height: 15px;
  top: 85vh;
  left: 50%;
  transform: translate(-50%);
}

.v-select {
  background: white !important;
  border-radius: 5px;
}

.VueCarousel-slide {
  transition: all 1s;
  opacity: 0 !important;
}

.VueCarousel-slide-active {
  opacity: 1 !important;
}

@media screen and (min-width: 500px) {
  #locationBar {
    width: 500px;
  }
}
</style>