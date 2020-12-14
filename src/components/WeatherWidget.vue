<template>
  <div v-if="weather !== null" class="container-fluid">
    <img
      :src="weatherIconURL(this.weather.data[0].weather.code)"
      class="img w-100"
      alt="Responsive image"
      id="img1"
    />
    <img
      :src="weatherIconURL(this.weather.data[0].weather.code)"
      class="img w-100"
      alt="Responsive image"
      id="img2"
    />
    <div class="row text-center">
      <div class="col">
        <h1 class="display-3">
          {{ weather.data[0].city_name }}
        </h1>
      </div>
    </div>
    <div class="row text-center">
      <div class="col">
        <h1 class="display-4">{{ weather.data[0].temp }}&deg; C</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherWidget',
  props: ['weather'],
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
      codesForCloudySunny: [801, 802]
    }
  },
  methods: {
    weatherIconURL: function(code) {
      if (this.codesForThunder.includes(code)) {
        return require('../assets/weather_icons/thunder.svg')
      } else if (this.codesForSunny.includes(code)) {
        return require('../assets/weather_icons/sunny.svg')
      } else if (this.codesForLightSnowy.includes(code)) {
        return require('../assets/weather_icons/snowy-light.svg')
      } else if (this.codesForMediumSnowy.includes(code)) {
        return require('../assets/weather_icons/snowy-medium.svg')
      } else if (this.codesForHeavySnowy.includes(code)) {
        return require('../assets/weather_icons/snowy-heavy.svg')
      } else if (this.codesForLightRainy.includes(code)) {
        return require('../assets/weather_icons/rainy-light.svg')
      } else if (this.codesForMediumRainy.includes(code)) {
        return require('../assets/weather_icons/rainy-medium.svg')
      } else if (this.codesForHeavyRainy.includes(code)) {
        return require('../assets/weather_icons/rainy-heavy.svg')
      } else if (this.codesForCloudy.includes(code)) {
        return require('../assets/weather_icons/cloudy.svg')
      } else {
        return require('../assets/weather_icons/cloudy-sunny.svg')
      }
    }
  }
}
</script>
<style scoped>
#img1 {
  position: fixed;
  top: -10vw;
  right: 45%;
  height: 60vw !important;
  width: 60vw !important;
  z-index: -1;
}
#img2 {
  position: fixed;
  top: -10vw;
  right: -5%;
  height: 60vw !important;
  width: 60vw !important;
  transform: scaleX(-1);
  z-index: -1;
}
</style>
