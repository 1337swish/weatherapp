<template>
  <div class="locationBar">
    <v-select
      v-model="selected"
      label="name"
      :options="options"
      @search="(query) => (search = query)"
      @input="setCity"
      :clearable="false"
      placeholder="Search for a place..."
    ></v-select>
  </div>
</template>
<script>
import data from "@/assets/cities_over_10k.json";
export default {
  name: "LocationBar",
  data: function () {
    return {
      selected: null,
      search: "",
    };
  },
  methods: {
    setCity() {
      this.search = "";
      this.$emit("update", {
        city: this.selected.name,
      });
    },
  },
  computed: {
    options: function () {
      return data
        .filter((city) =>
          city.name.toLowerCase().startsWith(this.search.toLowerCase())
        )
        .slice(0, 10);
    },
  },
};
</script>

<style scoped>
</style>
