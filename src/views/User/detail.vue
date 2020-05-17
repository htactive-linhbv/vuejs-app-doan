<template>
  <div style="background-color: #ecf0f1;">
    <navr></navr>
    <div class="container" style="margin-top: 80px;">
      <div v-if="onLoading" class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <detailc :bai="baiDang[0]"></detailc>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <detail-new :baiDangs="baiDangs" @detail="detail"></detail-new>
          </div>
        </div>
      </div>
    </div>
    <footerr></footerr>
  </div>
</template>

<script>
import axios from "axios";
import Navr from "../../components/User/Nav";
import Footerr from "../../components/User/Footer";
import Detailc from "../../components/User/Detail";

import DetailNew from "../../components/User/DetailNew";
export default {
  mounted() {
    axios
      .get(`baidang/${this.$route.params.id}/chitiet`)
      .then(response => {
        this.baiDang = response.data.data;
        document.title = "CHI TIẾT PHÒNG || " + this.baiDang[0].tieuDe;
      })
      .catch(err => {
        console.log(err);
      });
    window.scrollTo(0, 0);
    axios.get("/baidang/baidang").then(response => {
      this.baiDangs = response.data.data;
    });
  },
  methods: {
    detail(id) {
      this.onLoading = true;
      axios
        .get(`baidang/${id}/chitiet`)
        .then(response => {
          this.baiDang = response.data.data;
          console.log(this.baiDang);
          document.title = "CHI TIẾT PHÒNG || " + this.baiDang[0].tieuDe;
          this.onLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.onLoading = false;
        });
      window.scrollTo(0, 0);
    }
  },
  data() {
    return {
      baiDang: {},
      baiDangs: {},
      onLoading: false
    };
  },
  components: {
    Navr,
    Footerr,
    Detailc,

    DetailNew
  }
};
</script>

<style>
</style>