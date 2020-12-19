<template>
  <div class="home">
    <div class="container">
      <div class="row justify-content-center py-5">
        <div class="col-sm-8 col-md-4">
          <LocationBar class="locationbar" @update="fetchWeather" />
        </div>
      </div>
      <div class="row justify-content-center py-1">
        <div class="col-10 col-sm-8 col-md-6">
          <WeatherWidget
            :weather="weatherData"
            :temperatureScale="temperatureScale"
          />
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
      weatherData: null,
      timeOut: null,
      temperatureScale: false,
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
        }
      );
    },
    fetchWeather: function (args) {
      let URL = "https://api.weatherbit.io/v2.0/current?";
      // eslint-disable-next-line no-prototype-builtins
      if (args.hasOwnProperty("latitude")) {
        URL = URL + "&lat=" + args.latitude;
      }
      // eslint-disable-next-line no-prototype-builtins
      if (args.hasOwnProperty("longitude")) {
        URL = URL + "&lon=" + args.longitude;
      }
      // eslint-disable-next-line no-prototype-builtins
      if (args.hasOwnProperty("city")) {
        URL = URL + "&city=" + args.city;
      }
      // eslint-disable-next-line no-prototype-builtins
      if (args.hasOwnProperty("country")) {
        URL = URL + "&country=" + args.country;
      }
      URL = URL + "&key=f35e9420a2f441d0ad9dbf081cc1bd11";
      axios.get(URL).then((response) => (this.weatherData = response.data));
    },
    background: function () {
      if (this.weatherData !== null) {
        // Time between sunrise to dawn in minutes
        let minutesDiff =
          parseInt(this.weatherData.data[0].sunset.substring(0, 2)) * 60 +
          parseInt(this.weatherData.data[0].sunset.substring(3)) -
          (parseInt(this.weatherData.data[0].sunrise.substring(0, 2)) * 60 +
            parseInt(this.weatherData.data[0].sunrise.substring(3)));

        console.log(minutesDiff);
        let time = new Date();
        // Minutes after sunrise
        let minutesAfterSunrise =
          parseInt(time.getHours()) * 60 +
          parseInt(time.getMinutes()) -
          (parseInt(this.weatherData.data[0].sunrise.substring(0, 2)) * 60 +
            parseInt(this.weatherData.data[0].sunrise.substring(3)));
        console.log(minutesAfterSunrise);
        if (minutesAfterSunrise > -45 && minutesAfterSunrise < 45) {
          document.body.style.backgroundImage = `url(${require("@/assets/backgrounds/dawn.jpg")})`;
          document.body.style.color = "white";
        } else if (minutesAfterSunrise < minutesDiff - 45) {
          document.body.style.backgroundImage = `url(${require("@/assets/backgrounds/day.jpg")})`;
          document.body.style.color = "black";
        } else if (
          minutesAfterSunrise > minutesDiff - 45 &&
          minutesAfterSunrise < minutesDiff + 45
        ) {
          document.body.style.backgroundImage = `url(${require("@/assets/backgrounds/dawn.jpg")})`;
          document.body.style.color = "white";
        } else {
          document.body.style.backgroundImage = `url(${require("@/assets/backgrounds/night.jpg")})`;
          document.body.style.color = "white";
        }
      }
      this.timeOut = setTimeout(this.background, 60000 * 5);
      console.log("updated");
    },
  },
  created() {
    this.getLocation();
  },
  updated() {
    clearTimeout(this.timeOut);
    this.background();
  },
};
</script>

<style scoped>
#tempSwitch {
  position: absolute;
  bottom: 10vh;
  text-align: center;
  margin-left: -18px;
  left: 50%;
}
</style>
