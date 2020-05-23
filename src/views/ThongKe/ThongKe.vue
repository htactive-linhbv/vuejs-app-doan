<template>
  <div class="container-scroller">
    <app-narbar></app-narbar>
    <div class="container-fluid page-body-wrapper">
      <app-sidebar></app-sidebar>
      <div class="main-panel">
        <div class="content-wrapper">
          <div v-if="onLoading" class="d-flex justify-content-center text-primary">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div class="page-header">
            <h3 class="page-title">
              <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
              </span> Dashboard
            </h3>
            <nav aria-label="breadcrumb">
              <ul class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">
                  <span></span>Overview
                  <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                </li>
              </ul>
            </nav>
          </div>
          <div class="row" v-if="hide">
            <div class="col-md-4 stretch-card grid-margin">
              <div class="card bg-gradient-danger card-img-holder text-white">
                <div class="card-body">
                  <img
                    src="/assets/images/dashboard/circle.svg"
                    class="card-img-absolute"
                    alt="circle-image"
                  />
                  <h4 class="font-weight-normal mb-3">
                    Doanh thu tháng {{hoaDons.month}}
                    <i
                      class="mdi mdi-chart-line mdi-24px float-right"
                    ></i>
                  </h4>
                  <h2 class="mb-5">
                    {{new Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "VND"
                    }).format(hoaDons.danhThuThang)}}
                  </h2>
                  <h6
                    class="card-text"
                  >chênh lệch tháng trước {{ tiLeDanhThu(hoaDons.danhThuThang,hoaDons.danhThuThangTruoc)}} %</h6>
                </div>
              </div>
            </div>
            <div class="col-md-4 stretch-card grid-margin">
              <div class="card bg-gradient-info card-img-holder text-white">
                <div class="card-body">
                  <img
                    src="/assets/images/dashboard/circle.svg"
                    class="card-img-absolute"
                    alt="circle-image"
                  />
                  <h4 class="font-weight-normal mb-3">
                    Phòng trọ
                    <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                  </h4>
                  <h5 class="mb-5">Tổng: {{khuTros.total}} phòng</h5>
                  <h2 class="mb-5">Trống: {{khuTros.phongTrong }} Phòng</h2>
                </div>
              </div>
            </div>
            <div class="col-md-4 stretch-card grid-margin">
              <div class="card bg-gradient-success card-img-holder text-white">
                <div class="card-body">
                  <img
                    src="/assets/images/dashboard/circle.svg"
                    class="card-img-absolute"
                    alt="circle-image"
                  />
                  <h4 class="font-weight-normal mb-3">
                    Hoá đơn
                    <i class="mdi mdi-diamond mdi-24px float-right"></i>
                  </h4>
                  <h5 class="mb-5">Tổng: {{hoaDons.total}} Hoá đơn</h5>
                  <h2 class="mb-5">Chưa thanh toán: {{hoaDons.hoaDonChuaThanhToan}}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Narbar from "../../components/Navbar.vue";
import Sidebar from "../../components/Sidebar.vue";
import axios from "axios";
export default {
  name: "ThongKe",
  components: {
    //HelloWorld,
    appNarbar: Narbar,
    appSidebar: Sidebar
  },
  data() {
    return {
      khuTros: {},
      onLoading: false,
      hide: false,
      hoaDons: {}
    };
  },
  mounted() {
    this.onLoading = true;
    axios
      .get("/thongke/")
      .then(response => {
        this.khuTros = this.mapKhutro(response.data.khuTro);
        this.hoaDons = response.data.hoaDon;
        this.hide = true;
        this.onLoading = false;
      })
      .catch(err => {
        console.log(err);
        this.onLoading = false;
      });
  },
  methods: {
    mapKhutro(khu) {
      let phongTrong = 0;
      let tong = 0;
      khu.forEach(element => {
        tong = tong + element.phongTro_ids.length;
        element.phongTro_ids.forEach(item => {
          if (item.tinhTrangPhong == false) {
            phongTrong = phongTrong + 1;
          }
        });
      });
      return {
        total: tong,
        phongTrong: phongTrong,
        result: khu
      };
    },
    tiLeDanhThu(truoc, sau) {
      truoc = Number(truoc);
      sau = Number(sau);
      let tile = ((truoc - sau) / sau) * 100;
      tile = String(tile);
      return tile.substr(0, 8);
    }
  },
  computed: {
    getMonth() {
      const date = new Date();
      return date.getMonth();
    }
  }
};
</script>
