<template>
  <v-container fluid>
    <!-- <v-navigation-drawer app> </v-navigation-drawer> -->
    <v-app-bar app color="elevation-0">
      <v-btn icon>
        <v-icon @click="$router.back()">mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ surah.title }} - {{ surah.ayat }}</v-toolbar-title>
    </v-app-bar>
    <v-card v-if="surah">
      <v-card-title>
        {{ surah.title }} - {{ surah.name }} - {{ surah.ayat }}
      </v-card-title>
      <v-card-text>{{ surah.ar }}</v-card-text>
      <v-card-text>{{ surah.text }}</v-card-text>
      <v-card-text>{{ surah.tafsir }}</v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { Quran } from "../js/quran";
export default {
  name: "QuranAyat",
  async activated() {
    console.log("routexr", this.$route.params);
    this.quran = new Quran();
    this.surah = await this.quran.getSurahAyat(
      this.$route.params.surat,
      this.$route.params.ayat
    );
    console.log("surahx", this.surah);
  },
  data() {
    return {
      quran: null,
      surah: null,
    };
  },
};
</script>