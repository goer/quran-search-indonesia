<template>
  <v-container fluid>
    <v-app-bar app color="elevation-0">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-title>Quran Search Indonesia</v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click="update()">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-card>
      <v-list-item>
        <v-list-item-content>
          <v-text-field
            label="search"
            v-model="search_keywords"
            append-icon="mdi-search-web"
            @keyup.enter="search()"
            @click="search()"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <!-- <v-card class="mx-auto">
      <v-list-item
        v-for="(suggestion, index) in search_results.suggests"
        :key="index"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ suggestion.suggestion }} - {{ suggestion.score }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card> -->

    <v-card class="mx-auto" tile>
      <v-list-item
        two-line
        v-for="(surah, index) in search_results.results"
        :key="index"
      >
        <v-list-item-content>
          <v-list-item-title
            ><a @click="gotoSurah(surah)"
              >{{ surah.title }} - {{ surah.name }}
            </a>
            -
            <a @click="gotoAyat(surah)">{{ surah.ayat }}</a></v-list-item-title
          >
          <!-- <v-list-item-subtitle>{{ surah.text }}</v-list-item-subtitle> -->
          <v-card-text>{{ surah.ar }}</v-card-text>
          <v-card-text>{{ surah.text }}</v-card-text>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <!-- <v-card>
      <v-list-item
        v-for="(surah, index) in search_results.results"
        :key="index"
      >
        <v-row>
          <v-card-title>
            <a @click="gotoSurah(surah)"
              >{{ surah.title }} - {{ surah.name }}</a
            >
            - <a @click="gotoAyat(surah)">{{ surah.ayat }}</a></v-card-title
          >
        </v-row>
        <v-row>
          <v-card-text>{{ surah.text }}</v-card-text>
        </v-row>
      </v-list-item>
    </v-card> -->
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { Quran } from "../js/quran";
export default {
  name: "Quran",
  components: {},
  props: {},
  created() {
    this.quran = new Quran();
  },
  data() {
    return {
      loading: false,
      search_keywords: "",
      quran: null,
      search_results: [],
    };
  },
  computed: {},
  methods: {
    gotoAyat(surah) {
      this.$router.push({
        name: "quranayat",
        params: { surat: surah.surat, ayat: surah.ayat },
      });
    },
    gotoSurah(surah) {
      this.$router.push({
        name: "quransurah",
        params: { surat: surah.surat },
      });
    },
    async search() {
      if (!this.search_keywords) return false;
      this.loading = true;
      this.search_results = await this.quran.search(this.search_keywords);
      this.loading = false;
    },
  },
};
</script>
<style>
</style>