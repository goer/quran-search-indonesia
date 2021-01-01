<template>
  <v-container fluid>
    <!-- <v-navigation-drawer app> </v-navigation-drawer> -->
    <v-app-bar app color="elevation-0">
      <v-btn icon>
        <v-icon @click="$router.back()">mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title
        >{{ surahs[0].title }} - {{ surahs[0].name }}</v-toolbar-title
      >
    </v-app-bar>
    <v-card class="mx-auto" tile>
      <v-list-item two-line v-for="(surah, index) in surahs" :key="index">
        <v-list-item-content>
          <v-list-item-title
            ><a @click="gotoAyat(surah)">{{ surah.ayat }}</a></v-list-item-title
          >
          <v-card-text>{{ surah.ar }}</v-card-text>
          <v-card-text>{{ surah.text }}</v-card-text>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>
<script>
import { Quran } from "../js/quran";
export default {
  name: "QuranSurah",
  async activated() {
    console.log("routexyyy", this.$route.params);
    this.quran = new Quran();
    this.surahs = await this.quran.getSurah(this.$route.params.surat);
    console.log("surahx", this.surahs);
  },
  data() {
    return {
      quran: null,
      surahs: null,
    };
  },
  methods: {
    gotoAyat(surah) {
      this.$router.push({
        name: "quranayat",
        params: { surat: surah.surat, ayat: surah.ayat },
      });
    },
  },
};
</script>