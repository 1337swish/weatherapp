<template>
  <div v-if="weather !== null" class="container">
    <!-- Name of city -->
    <div class="row text-center">
      <div class="col">
        <h1 class="display-3">
          {{ weather.data[0].city_name }}
        </h1>
      </div>
    </div>

    <!-- Weather icon -->
    <div class="row text-center">
      <div class="col">
        <img
          :src="weatherIconURL(this.weather.data[0].weather.code)"
          class="img w-25"
          alt="Responsive image"
          id="img1"
        />
      </div>
    </div>

    <!-- Temperature outside -->
    <div class="row text-center">
      <div class="col">
        <h1 v-if="temperatureScale == false" class="display-1">
          {{ weather.data[0].temp }}&deg; C
        </h1>
        <h1 v-else class="display-1">
          {{ (weather.data[0].temp * 1.8 + 32).toFixed(1) }}&deg; F
        </h1>
      </div>
    </div>

    <!-- Other weather information -->
    <div class="row text-center pt-3">
      <div class="col-4 p-0">
        <h5>
          Clouds <br />
          {{ weather.data[0].clouds }} %
        </h5>
      </div>
      <div class="col-4 p-0">
        <h5>
          Wind <br />
          {{ weather.data[0].wind_spd.toFixed(2) }} m/s <br />
          {{ weather.data[0].wind_cdir_full }}
        </h5>
      </div>
      <div class="col-4 p-0">
        <h5 v-if="weather.data[0].snow == '0'">
          Rain <br />
          {{ weather.data[0].precip }} mm/h
        </h5>
        <h5 v-else>
          Snow <br />
          {{ weather.data[0].snow }} mm/h
        </h5>
      </div>
    </div>
    <div v-if="weather" class="row text-center pt-5">
      <div class="col-6 p-0">
        <h5>
          Sunrise <br />
          {{ sunrise }}
        </h5>
      </div>
      <div class="col-6 p-0">
        <h5>
          Sunset <br />
          {{ sunset }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherWidget",
  props: ["weather", "temperatureScale"],
  data() {
    return {
      codesForThunder: [200, 201, 202, 230, 231, 232, 233],
      codesForSunny: [800],
      codesForLightSnowy: [600, 610, 623],
      codesForMediumSnowy: [601, 611, 621],
      codesForHeavySnowy: [602, 612, 622],
      codesForLightRainy: [300, 500, 511, 520],
      codesForMediumRainy: [301, 501, 521],
      codesForHeavyRainy: [302, 502, 522],
      codesForCloudy: [804, 803, 700, 711, 721, 731, 741, 751],
      codesForCloudySunny: [801, 802],
    };
  },
  computed: {
    sunrise() {
      let sunriseHour = parseInt(this.weather.data[0].sunrise.substring(0, 2));
      let sunriseRest = this.weather.data[0].sunrise.substring(2);
      return sunriseHour < 23
        ? sunriseHour + 1 + sunriseRest
        : "00" + sunriseRest;
    },
    sunset() {
      let sunsetHour = parseInt(this.weather.data[0].sunset.substring(0, 2));
      let sunsetRest = this.weather.data[0].sunset.substring(2);
      return sunsetHour < 23 ? sunsetHour + 1 + sunsetRest : "00" + sunsetRest;
    },
  },
  methods: {
    weatherIconURL: function (code) {
      if (this.codesForThunder.includes(code)) {
        return require("../assets/weather_icons/thunder.svg");
      } else if (this.codesForSunny.includes(code)) {
        return require("../assets/weather_icons/sunny.svg");
      } else if (this.codesForLightSnowy.includes(code)) {
        return require("../assets/weather_icons/snowy-light.svg");
      } else if (this.codesForMediumSnowy.includes(code)) {
        return require("../assets/weather_icons/snowy-medium.svg");
      } else if (this.codesForHeavySnowy.includes(code)) {
        return require("../assets/weather_icons/snowy-heavy.svg");
      } else if (this.codesForLightRainy.includes(code)) {
        return require("../assets/weather_icons/rainy-light.svg");
      } else if (this.codesForMediumRainy.includes(code)) {
        return require("../assets/weather_icons/rainy-medium.svg");
      } else if (this.codesForHeavyRainy.includes(code)) {
        return require("../assets/weather_icons/rainy-heavy.svg");
      } else if (this.codesForCloudy.includes(code)) {
        return require("../assets/weather_icons/cloudy.svg");
      } else {
        return require("../assets/weather_icons/cloudy-sunny.svg");
      }
    },
  },
};
</script>
