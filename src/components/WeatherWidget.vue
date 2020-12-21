<template>
  <div class="container-fluid">
    <!-- Day of the week -->
    <div class="row text-center">
      <div v-if="weatherNow || weatherForecast" class="col-12">
        <p>{{ day }}</p>
      </div>
    </div>
    <!-- Current weather part -->
    <div>
      <!-- Weather icon -->
      <div v-if="weatherNow" class="row text-center">
        <div class="col">
          <img
            :src="weatherIconURL(this.weatherNow.data[0].weather.code)"
            class="img w-25"
            alt="Responsive image"
            id="img1"
          />
        </div>
      </div>

      <!-- Temperature outside -->
      <div v-if="weatherNow" class="row text-center">
        <div class="col">
          <h1 v-if="temperatureScale == false" class="display-1">
            {{ weatherNow.data[0].temp }}&deg; C
          </h1>
          <h1 v-else class="display-1">
            {{ (weatherNow.data[0].temp * 1.8 + 32).toFixed(1) }}&deg; F
          </h1>
        </div>
      </div>

      <!-- Other weather information -->
      <div v-if="weatherNow" class="row text-center pt-3">
        <div class="col-4">
          <p class="text-responsive">
            Clouds <br />
            {{ weatherNow.data[0].clouds }} %
          </p>
        </div>
        <div class="col-4">
          <p class="text-responsive">
            Wind <br />
            {{ weatherNow.data[0].wind_spd.toFixed(1) }} m/s <br />
            {{ weatherNow.data[0].wind_cdir }}
          </p>
        </div>
        <div class="col-4">
          <p v-if="weatherNow.data[0].snow == '0'" class="text-responsive">
            Rain <br />
            {{ weatherNow.data[0].precip.toFixed(1) }} mm/h
          </p>
          <p v-else class="text-responsive">
            Snow <br />
            {{ weatherNow.data[0].snow.toFixed(1) }} mm/h
          </p>
        </div>
      </div>

      <!-- Sunrise/sunset -->
      <div v-if="weatherNow" class="row text-center pt-4">
        <div class="col-6">
          <p class="text-responsive">
            Sunrise <br />
            {{ sunriseToday }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-responsive">
            Sunset <br />
            {{ sunsetToday }}
          </p>
        </div>
      </div>
    </div>

    <!-- Forecast weather part -->
    <div>
      <!-- Weather icon -->
      <div v-if="weatherForecast" class="row text-center">
        <div class="col">
          <img
            :src="weatherIconURL(this.weatherForecast.weather.code)"
            class="img w-25"
            alt="Responsive image"
            id="img1"
          />
        </div>
      </div>

      <!-- Temperature high and low -->
      <div v-if="weatherForecast" class="row text-center">
        <div class="col-6">
          <p v-if="temperatureScale == false" class="text-responsive">
            High <br />
            {{ weatherForecast.max_temp }}&deg; C
          </p>
          <p v-else class="text-responsive">
            High <br />
            {{ (weatherForecast.max_temp * 1.8 + 32).toFixed(1) }}&deg; F
          </p>
        </div>
        <div class="col-6">
          <p v-if="temperatureScale == false" class="text-responsive">
            Low <br />
            {{ weatherForecast.min_temp }}&deg; C
          </p>
          <p v-else class="text-responsive">
            Low <br />
            {{ (weatherForecast.min_temp * 1.8 + 32).toFixed(1) }}&deg; F
          </p>
        </div>
      </div>

      <!-- Probability of Precipitation & winds -->
      <div v-if="weatherForecast" class="row text-center py-3">
        <div class="col-6">
          <p class="text-responsive">
            Precipitation <br />
            {{ weatherForecast.pop }}%
          </p>
        </div>
        <div class="col-6">
          <p class="text-responsive">
            Cloud coverage <br />
            {{ weatherForecast.clouds }}%
          </p>
        </div>
      </div>
      <div v-if="weatherForecast" class="row text-center">
        <div v-if="weatherForecast.snow == '0'" class="col-6">
          <p class="text-responsive">
            Rain <br />
            {{ weatherForecast.precip.toFixed(1) }} mm
          </p>
        </div>
        <div v-else class="col-6">
          <p class="text-responsive">
            Snow <br />
            {{ weatherForecast.snow.toFixed(1) }} mm
          </p>
        </div>
        <div class="col-6">
          <p class="text-responsive">
            Winds <br />
            {{ weatherForecast.wind_spd.toFixed(1) }} m/s
            {{ weatherForecast.wind_cdir }}
          </p>
        </div>
      </div>

      <!-- Sunrise/sunset -->
      <div v-if="weatherForecast" class="row text-center pt-4">
        <div class="col-6 p-0">
          <p class="text-responsive">
            Sunrise <br />
            {{ sunrise }}
          </p>
        </div>
        <div class="col-6 p-0">
          <p class="text-responsive">
            Sunset <br />
            {{ sunset }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherWidget",
  props: ["weatherNow", "weatherForecast", "temperatureScale"],
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
      codesForCloudy: [804, 803, 700, 711, 721, 731, 741, 751, 802],
      codesForCloudySunny: [801],
    };
  },
  computed: {
    sunriseToday() {
      let sunriseHour = parseInt(
        this.weatherNow.data[0].sunrise.substring(0, 2)
      );
      let sunriseRest = this.weatherNow.data[0].sunrise.substring(2);
      return sunriseHour < 23
        ? sunriseHour + 1 + sunriseRest
        : "00" + sunriseRest;
    },
    sunsetToday() {
      let sunsetHour = parseInt(this.weatherNow.data[0].sunset.substring(0, 2));
      let sunsetRest = this.weatherNow.data[0].sunset.substring(2);
      return sunsetHour < 23 ? sunsetHour + 1 + sunsetRest : "00" + sunsetRest;
    },
    sunrise() {
      let date = new Date(this.weatherForecast.sunrise_ts * 1000);
      return "" + date.getHours() + ":" + date.getMinutes();
    },
    sunset() {
      let date = new Date(this.weatherForecast.sunset_ts * 1000);
      return "" + date.getHours() + ":" + date.getMinutes();
    },
    day() {
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let date;
      if (this.weatherNow) {
        return "Right Now";
      } else {
        date = new Date(this.weatherForecast.datetime);
      }
      return days[date.getDay()];
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
