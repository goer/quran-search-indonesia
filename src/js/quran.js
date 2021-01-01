import { _ } from "vue-underscore";
const axios = require("axios");

class Quran {
  constructor() {
    this.baseUrl = "https://quran.fonetix.vercel.app";
  }

  async search(keywords) {
    var search_results = await axios.get(this.baseUrl + "/search/" + keywords);
    var r = await _.sortBy(search_results.data.results, (s) => {
      return s.surat;
    });
    search_results.data.results = r;
    console.log("search", r);
    return search_results.data;
  }

  async getSurah(surah_no) {
    var surahs = await axios.get(this.baseUrl + "/surat/" + surah_no);
    console.log("surah", surahs.data);
    return surahs.data;
  }

  async getSurahAyat(surah_no, ayat_no) {
    console.log("getSurahAyat", surah_no, ayat_no);
    var surah = await axios.get(
      this.baseUrl + "/surat/" + surah_no + "/" + ayat_no
    );
    console.log("surah", surah.data[0]);
    return surah.data[0];
  }
}

export { Quran };
