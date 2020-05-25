<template>
  <modal name="createChuTro" :scrollable="true" height="auto" width="50%">
    <div class="row" style="margin-top:20px">
      <div class="col-md-11"></div>
      <div class="col-md-1">
        <button
          class="btn btn-inverse-primary btn-rounded btn-icon"
          @click="$modal.hide('createChuTro')"
        >
          <i class="mdi mdi-window-close" style="font-size:20px"></i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Tạo mới Chủ trọ</h4>
            <form class="form-sample">
              <div class="alert alert-danger" role="alert" v-if="error">{{error}}!</div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">
                      Họ và Tên
                      <sup style="color:#e17055">(*)</sup>
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        v-model="hoVaTen"
                        name="hoVaTen"
                        @change="$v.hoVaTen.$touch()"
                      />
                      <div
                        class="alert alert-danger"
                        v-if="$v.hoVaTen.$error"
                        role="alert"
                      >Họ và Tên không được trống</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
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
                      <div v-if="$v.soDienThoai.$error" class="alert alert-danger" role="alert">
                        <p
                          v-if="!$v.soDienThoai.required"
                          style="margin:0px"
                        >Số điện thoại không được bỏ trống</p>
                        <p
                          v-if="!$v.soDienThoai.numeric"
                          style="margin:0px"
                        >Số điện thoại không đúng</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">
                      Email:
                      <sup style="color:#e17055">(*)</sup>
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        v-model="email"
                        name="email"
                        @change="$v.email.$touch()"
                      />
                      <div v-if="$v.email.$error" class="alert alert-danger" role="alert">
                        <p v-if="!$v.email.required" style="margin:0px">Email không được bỏ trống</p>
                        <p v-if="!$v.email.email" style="margin:0px">Email không đúng</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">
                      Gói:
                      <sup style="color:#e17055">(*)</sup>
                    </label>
                    <div class="col-sm-9">
                      <select
                        class="form-control"
                        v-model="goi"
                        name="goi"
                        @change="$v.goi.$touch()"
                      >
                        <option value="1">Gói 1 Tháng</option>
                        <option value="3">Gói 3 Tháng</option>
                        <option value="6">Gói 6 Tháng</option>
                        <option value="12">Gói 12 Tháng</option>
                        <option value="18">Gói 18 Tháng</option>
                        <option value="24">Gói 24 Tháng</option>
                      </select>
                      <div
                        class="alert alert-danger"
                        v-if="$v.goi.$error"
                        role="alert"
                      >Chưa chọn Gói!</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6"></div>
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-7">
                      <button class="btn btn-success" @click.prevent="create()">
                        Thêm mới
                        <span
                          class="spinner-border spinner-border-sm"
                          v-if="onLoading"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </button>
                    </div>
                    <div class="col-md-5">
                      <button
                        class="btn btn-light"
                        @click.prevent="$modal.hide('createChuTro')"
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
const { required, numeric, email } = require("vuelidate/lib/validators");
//import DateDropdown from "vue-date-dropdown";
import axios from "axios";
export default {
  created() {},
  data: function() {
    return {
      hoVaTen: null,
      soDienThoai: null,
      email: null,
      goi: "1",
      error: "",
      onLoading: ""
    };
  },
  components: {
    //  DateDropdown
  },
  validations: {
    hoVaTen: {
      required
    },
    soDienThoai: {
      required,
      numeric
    },
    email: {
      required,
      email
    },
    goi: {
      required
    }
  },
  methods: {
    create() {
      if (!this.$v.$invalid) {
        this.onLoading = true;
        axios
          .post("/chutro/themmoi", {
            hoVaTen: this.hoVaTen,
            soDienThoai: this.soDienThoai,
            email: this.email,
            goi: Number(this.goi)
          })
          .then(() => {
            this.onLoading = false;
            alert("Thêm mới thành công");
            this.$emit("createSuccess");
            this.$emit(
              "createSuccess",
              "Thêm mới thành công, Mật khẩu được gửi về mail của bạn"
            );
            this.$modal.hide("createChuTro");
          })
          .catch(err => {
            console.log(err);

            if (err.response.status == 400) {
              this.error = err.response.data.err;
            } else {
              alert("Thêm mới thất bại");
            }
            this.onLoading = false;
          });
      } else {
        this.onLoading = false;
        this.$v.$touch();
      }
    }
  }
};
</script>

<style>
</style>