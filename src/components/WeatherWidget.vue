<template>
  <div id="widget">
    <!-- Day of the week -->
    <div
      :style="{ left: page * 100 + 'vw' }"
      id="dayText"
      v-if="weatherNow || weatherForecast"
    >
      <p class="coloredText">{{ day }}</p>
    </div>
    <!-- Current weather part -->
    <div v-if="weatherNow">
      <!-- Weather icon -->
      <img
        id="weatherIcon"
        :src="weatherIconURL(this.weatherNow.data[0].weather.code)"
        alt="Weather icon"
      />

      <!-- Temperature outside -->
      <div id="tempText">
        <h1 v-if="temperatureScale == false" class="display-1 coloredText">
          {{ weatherNow.data[0].temp }}&deg; C
        </h1>
        <h1 v-else class="display-1 coloredText">
          {{ (weatherNow.data[0].temp * 1.8 + 32).toFixed(1) }}&deg; F
        </h1>
      </div>

      <!-- Other weather information -->
      <div id="cloudsText">
        <p class="text-responsive text-center coloredText">
          <img
            id="cloudIcon"
            :src="weatherIconURL('cloudIcon')"
            alt="Cloud icon"
          />
          <br />
          {{ weatherNow.data[0].clouds }} %
        </p>
      </div>
      <div id="windText">
        <p class="text-responsive text-center coloredText">
          Winds
          <br />
          {{ weatherNow.data[0].wind_spd.toFixed(1) }} m/s <br />
          {{ weatherNow.data[0].wind_cdir }}
        </p>
      </div>
      <div id="precipationText">
        <p
          v-if="weatherNow.data[0].snow == '0'"
          class="text-responsive text-center coloredText"
        >
          <img
            id="rainIcon"
            :src="weatherIconURL('rainIcon')"
            alt="Rain icon"
          />
          <br />
          {{ weatherNow.data[0].precip.toFixed(1) }} mm/h
        </p>
        <p v-else class="text-responsive text-center coloredText">
          <img
            id="snowIcon"
            :src="weatherIconURL('snowIcon')"
            alt="Snow icon"
          />
          <br />
          {{ weatherNow.data[0].snow.toFixed(1) }} mm/h
        </p>
      </div>

      <!-- Sunrise/sunset -->
      <p id="sunriseText" class="text-responsive text-center coloredText">
        <img
          id="sunriseIcon"
          :src="weatherIconURL('sunriseIcon')"
          alt="Sunrise icon"
        />
        <br />
        {{ sunriseToday }}
      </p>
      <p id="sunsetText" class="text-responsive text-center coloredText">
        <img
          id="sunsetIcon"
          :src="weatherIconURL('sunsetIcon')"
          alt="Sunset icon"
        />
        <br />
        {{ sunsetToday }}
      </p>
    </div>

    <!-- Forecast weather part -->
    <div v-if="weatherForecast">
      <!-- Weather icon -->
      <img
        :style="{ left: page * 100 + 'vw' }"
        id="weatherIcon2"
        :src="weatherIconURL(this.weatherForecast.weather.code)"
        alt="Weather icon"
      />

      <!-- Temperature high and low -->
      <div :style="{ left: page * 100 + 'vw' }" id="maxtempText">
        <p
          v-if="temperatureScale == false"
          class="text-responsive text-center coloredText"
        >
          High <br />
          {{ weatherForecast.max_temp }}&deg; C
        </p>
        <p v-else class="text-responsive text-center coloredText">
          High <br />
          {{ (weatherForecast.max_temp * 1.8 + 32).toFixed(1) }}&deg; F
        </p>
      </div>
      <div :style="{ left: page * 100 + 'vw' }" id="mintempText">
        <p
          v-if="temperatureScale == false"
          class="text-responsive text-center coloredText"
        >
          Low <br />
          {{ weatherForecast.min_temp }}&deg; C
        </p>
        <p v-else class="text-responsive text-center coloredText">
          Low <br />
          {{ (weatherForecast.min_temp * 1.8 + 32).toFixed(1) }}&deg; F
        </p>
      </div>

      <!-- Probability of Precipitation & winds -->
      <div :style="{ left: page * 100 + 'vw' }" id="precipation2Text">
        <p class="text-responsive text-center coloredText">
          Precipitation <br />
          {{ weatherForecast.pop }}%
        </p>
      </div>
      <div :style="{ left: page * 100 + 'vw' }" id="clouds2Text">
        <p class="text-responsive text-center coloredText">
          Clouds <br />
          {{ weatherForecast.clouds }}%
        </p>
      </div>
      <div :style="{ left: page * 100 + 'vw' }" id="precipationAmountText">
        <div v-if="weatherForecast.snow == '0'">
          <p class="text-responsive text-center coloredText">
            Rain <br />
            {{ weatherForecast.precip.toFixed(1) }} mm
          </p>
        </div>
        <div v-else>
          <p class="text-responsive text-center coloredText">
            Snow <br />
            {{ weatherForecast.snow.toFixed(1) }} mm
          </p>
        </div>
      </div>
      <p
        :style="{ left: page * 100 + 'vw' }"
        id="winds2Text"
        class="text-responsive text-center coloredText"
      >
        Winds <br />
        {{ weatherForecast.wind_spd.toFixed(1) }} m/s
        {{ weatherForecast.wind_cdir }}
      </p>

      <!-- Sunrise/sunset -->
      <p
        :style="{ left: page * 100 + 'vw' }"
        id="sunrise2Text"
        class="text-responsive text-center coloredText"
      >
        Sunrise <br />
        {{ sunrise }}
      </p>
      <p
        :style="{ left: page * 100 + 'vw' }"
        id="sunset2Text"
        class="text-responsive text-center coloredText"
      >
        Sunset <br />
        {{ sunset }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherWidget",
  props: ["weatherNow", "weatherForecast", "temperatureScale", "page"],
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
    width() {
      return this.page;
    },
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
      } else if (this.codesForCloudySunny.includes(code)) {
        return require("../assets/weather_icons/cloudy-sunny.svg");
      } else if (code == "cloudIcon") {
        return require("../assets/weather_icons/cloudy.svg");
      } else if (code == "snowIcon") {
        return require("../assets/weather_icons/snowy-heavy.svg");
      } else if (code == "rainIcon") {
        return require("../assets/weather_icons/rainy-heavy.svg");
      } else if (code == "sunriseIcon") {
        return require("../assets/weather_icons/sunrise.png");
      } else if (code == "sunsetIcon") {
        return require("../assets/weather_icons/sunset.png");
      }
    },
  },
};
</script>

<style scoped>
#widget {
  height: 75vh;
  width: 100vh;
}

#dayText {
  position: fixed;
  top: 27vh;
  margin-left: -50%;
  transform: translate(-50%);
}

#tempText {
  top: 32vh;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
}

#cloudsText {
  top: 45vh;
  position: fixed;
  left: 25%;
  transform: translate(-50%);
}

#windText {
  top: 45vh;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
}

#precipationText {
  top: 45vh;
  position: fixed;
  left: 75%;
  transform: translate(-50%);
}

#sunriseText {
  top: 60vh;
  position: fixed;
  left: 40%;
  transform: translate(-50%);
}

#sunsetText {
  top: 60vh;
  position: fixed;
  left: 60%;
  transform: translate(-50%);
}

#mintempText {
  position: fixed;
  top: 32vh;
  margin-left: -65%;
  transform: translate(-50%);
  width: 20vw;
}

#maxtempText {
  position: fixed;
  top: 32vh;
  margin-left: -35%;
  transform: translate(-50%);
  width: 20vw;
}

#precipation2Text {
  position: fixed;
  top: 42vh;
  margin-left: -65%;
  transform: translate(-50%);
  width: 20vw;
}

#clouds2Text {
  position: fixed;
  top: 42vh;
  margin-left: -35%;
  transform: translate(-50%);
  width: 20vw;
}

#precipationAmountText {
  position: fixed;
  top: 52vh;
  margin-left: -65%;
  transform: translate(-50%);
  width: 20vw;
}

#winds2Text {
  position: fixed;
  top: 52vh;
  margin-left: -35%;
  transform: translate(-50%);
  width: 20vw;
}

#sunrise2Text {
  position: fixed;
  top: 62vh;
  margin-left: -65%;
  transform: translate(-50%);
  width: 20vw;
}

#sunset2Text {
  position: fixed;
  top: 62vh;
  margin-left: -35%;
  transform: translate(-50%);
  width: 20vw;
}

#weatherIcon {
  position: fixed;
  top: 10vh;
  left: 80vw;
  transform: translate(-50%);
  z-index: -99;
  width: 30vh;
  height: 30vh;
}

#weatherIcon2 {
  position: fixed;
  margin-left: -30vw;
  top: 10vh;
  z-index: -99;
  width: 30vh;
  height: 30vh;
}

@media screen and (min-width: 993px) {
  #cloudsText {
    left: 35%;
  }

  #windText {
    left: 50%;
  }

  #precipationText {
    left: 65%;
  }
}

@media screen and (max-width: 992px) {
  #weatherIcon2 {
    margin-left: -40vw;
  }
}
</style>