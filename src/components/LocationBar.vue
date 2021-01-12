<template>
  <div class="locationBar">
    <v-select
      v-model="selected"
      label="name"
      :options="options"
      @search="(query) => (search = query)"
      @input="setCity"
      :clearable="false"
      :placeholder="selected ? '' : 'SEARCH FOR A CITY HERE!'"
    />
  </div>
</template>
<script>
import data from "@/assets/cities_over_10k.json";
export default {
  name: "LocationBar",
  data: function () {
    return {
      selected: "",
      search: "",
    };
  },
  methods: {
    setCity() {
      this.$emit("update", {
        city: this.selected.name,
        country: this.selected.country,
      });
      this.search = "";
      this.selected = "";
    },
  },
  computed: {
    options: function () {
      return data
        .filter((city) =>
          city.name.toLowerCase().startsWith(this.search.toLowerCase())
        )
        .slice(0, 20);
    },
  },
};
</script>
