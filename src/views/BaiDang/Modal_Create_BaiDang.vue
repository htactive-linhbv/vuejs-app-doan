<template>
  <modal name="createBaiDang" :scrollable="true" height="auto" width="80%" @before-open="getData">
    <div class="row" style="margin-top:20px">
      <div class="col-md-11"></div>
      <div class="col-md-1">
        <button
          class="btn btn-inverse-primary btn-rounded btn-icon"
          @click="$modal.hide('createBaiDang')"
        >
          <i class="mdi mdi-window-close" style="font-size:20px"></i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Tạo mới Bài Đăng</h4>
            <form class="form-sample">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">
                      Khu trọ
                      <sup style="color:#e17055">(*)</sup>
                    </label>
                    <div class="col-sm-9">
                      <select
                        class="form-control"
                        v-model="khuTro_id"
                        @change="getDataPhong"
                        name="khuTro_id"
                      >
                        <option
                          v-for="khu in khuTros"
                          :key="khu._id"
                          :value="khu._id"
                        >{{khu.tenKhuTro}}</option>
                      </select>
                      <div
                        class="alert alert-danger"
                        v-if="$v.khuTro_id.$error"
                        role="alert"
                      >khu trọ không được trống</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6" v-if="phongTros">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">
                      Phòng trọ
                      <sup style="color:#e17055">(*)</sup>
                    </label>
                    <div class="col-sm-9">
                      <select
                        class="form-control"
                        v-model="phongTro_id"
                        name="phongTro_id"
                        @change="$v.phongTro_id.$touch()"
                      >
                        <option
                          v-for="phong in phongTros"
                          :key="phong._id"
                          :value="phong._id"
                        >{{phong.tenPhongTro}} {{tinhTrangPhongF(phong.tinhTrangPhong)}}</option>
                      </select>
                      <div
                        class="alert alert-danger"
                        v-if="$v.phongTro_id.$error"
                        role="alert"
                      >Tên phòng không được trống</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">
                      Tiêu Đề
                      <sup style="color:#e17055">(*)</sup>
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        v-model="tieuDe"
                        name="tieuDe"
                        @change="$v.tieuDe.$touch()"
                      />
                      <div
                        class="alert alert-danger"
                        v-if="$v.tieuDe.$error"
                        role="alert"
                      >Tiêu đề không được trống</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">
                      Số ĐT liên hệ
                      <sup style="color:#e17055">(*)</sup>
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        v-model="soDienThoai"
                        name="soDienThoai"
                        @change="$v.soDienThoai.$touch()"
                      />
                      <div
                        class="alert alert-danger"
                        v-if="$v.soDienThoai.$error"
                        role="alert"
                      >Số điện thoại không được trống</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Mô Tả</label>
                    <div class="col-sm-9">
                      <textarea type="text" v-model="moTa" class="form-control" rows="7" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-12 col-form-label">Ảnh phòng trọ</label>
                      <div class="col-sm-12">
                        <input
                          @change="onChangeFileUpload()"
                          ref="photos"
                          type="file"
                          class="form-control"
                          name="photos"
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="card-body col-sm-12">
                  <div class="row"></div>
                  <div class="row">
                    <div class="col-md-4" v-for="(url,i) in urlPhotos" :key="i">
                      <div class="form-group row">
                        <div class="col-sm-12">
                          <img :src="url" alt class="img-thumbnail" max-height="200px" width="100%" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-7"></div>
                <div class="col-md-4">
                  <div class="row">
                    <div class="col-md-6">
                      <button class="btn btn-success" @click.prevent="create()">
                        <span
                          v-if="onLoading"
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>Thêm mới
                      </button>
                    </div>
                    <div class="col-md-6">
                      <button
                        class="btn btn-light"
                        @click.prevent="$modal.hide('createBaiDang')"
                      >Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
const { required } = require("vuelidate/lib/validators");
//import DateDropdown from "vue-date-dropdown";
import axios from "axios";
export default {
  created() {
    this.getDataKhu();
  },
  data: function() {
    return {
      phongTros: "",
      khuTro_id: null,
      phongTro_id: null,
      khuTros: "",
      tieuDe: "",
      soDienThoai: "",
      moTa: "",
      onLoading: false,
      photos: [],
      urlPhotos: []
    };
  },
  components: {
    //  DateDropdown
  },
  validations: {
    khuTro_id: {
      required
    },
    phongTro_id: {
      required
    },
    tieuDe: {
      required
    },
    soDienThoai: {
      required
    }
  },
  methods: {
    getData() {
      this.tieuDe = "";
      this.soDienThoai = "";
      this.moTa = "";
      this.onLoading = false;
      this.photos = [];
      this.urlPhotos = [];
      this.$v.$reset();
    },
    create() {
      this.onLoading = true;
      let formData = new FormData();
      const intAnh = this.photos.length;
      for (let i = 0; i < intAnh; i++) {
        formData.append("photos", this.photos[i]);
      }
      formData.append("tieuDe", this.tieuDe);
      formData.append("khuTro_id", this.khuTro_id);
      formData.append("phongTro_id", this.phongTro_id);
      formData.append("soDienThoai", this.soDienThoai);
      formData.append("moTa", this.moTa);

      if (!this.$v.$invalid) {
        axios
          .post("/baidang/", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(() => {
            this.onLoading = false;
            alert("Thêm mới thành công");
            this.$emit("createSuccess");
            this.$modal.hide("createBaiDang");
          })
          .catch(() => {
            alert("Thêm mới thất bại");
            this.onLoading = false;
          });
      } else {
        this.$v.$touch();
        this.onLoading = false;
      }
    },
    tinhTrangPhongF(tinhTrang) {
      if (!tinhTrang) {
        return "'Trống'";
      }
    },

    getDataKhu() {
      this.onLoading = true;
      axios.get("/khutro/getphongtro").then(response => {
        this.khuTros = response.data.data;
        this.khuTro_id = this.khuTros[0]._id;
        this.phongTros = this.khuTros[0].phongTro_ids;
        this.onLoading = false;
      });
    },
    onChangeFileUpload() {
      this.photos = this.$refs.photos.files;
      this.urlPhotos = [];
      this.photos.forEach(item => {
        this.urlPhotos.push(URL.createObjectURL(item));
      });
    },
    getDataPhong() {
      this.$v.khuTro_id.$touch();
      this.phongTros = this.khuTros.find(
        item => item._id == this.khuTro_id
      ).phongTro_ids;
    }
  }
};
</script>

<style>
</style>