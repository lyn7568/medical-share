<template>
  <div class="brow-content">
		<div class="split-bottom-20">
      <div class="list-item headcon-box">
        <div class="list-head list-pic-org"><!-- <img :src="companyInfo.logo"> --></div>
        <div class="list-info">
          <div class="list-tit">医院名称</div>
          <div class="list-owner">医院级别 子级别 医院类型</div>
          <div class="list-desc">地址：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean.</div>
          <div class="list-desc">电话：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean.</div>
        </div>
      </div>
    </div>
    <div class="main-content split-bottom-20">
      <div class="wrapper-left">
        <el-tabs v-model="activeName">
          <el-tab-pane label="主页" name="first">
            <div class="content-wrapper split-bottom-20">
              <div class="content-title">
                <span>医院简介</span>
                <span class="content-more" @click="activeName='fourth'">更多</span>
              </div>
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibend
              </div>
            </div>
            <div class="content-wrapper split-bottom-20">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>科室列表</span>
                </div>
                <div class="content">
                  <div class="dep-list-item" v-for="ks in ksList" :key="ks.index">
                    <div class="tag-label">{{ks.label}}</div>
                    <div class="tag-ul">
                      <div class="tag-li" v-for="item in ks.detail" :key="item.index">
                        <a href="#/department">{{item.name}}</a>
                        <span>({{item.num}}人)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-wrapper split-bottom-20">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>医生列表</span>
                  <span class="content-more" @click="activeName='second'">更多</span>
                </div>
                <div class="content">
                  <base-doctor v-for="item in 3" :key="item.index"></base-doctor>
                </div>
              </div>
            </div>
            <div class="content-wrapper split-bottom-20">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>器械列表</span>
                  <span class="content-more" @click="activeName='third'">更多</span>
                </div>
                <div class="content">
                  <base-appliance v-for="item in 3" :key="item.index"></base-appliance>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="'医生 ' + (serCount || '')" name="second">
            <div v-show="!ifDefault">
              <base-doctor></base-doctor>
              <pull-down></pull-down>
            </div>
            <default-tip v-show="ifDefault"></default-tip>
          </el-tab-pane>
          <el-tab-pane :label="'器械 ' + (patCount || '')" name="third">
            <div v-show="!ifDefault2">
              <base-appliance></base-appliance>
              <pull-down></pull-down>
            </div>
            <default-tip v-show="ifDefault2"></default-tip>
          </el-tab-pane>
          <el-tab-pane label="介绍" name="fourth">
            <div class="content-wrapper">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>项目经历</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="wrapper-right">
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import baseDoctor from '@/components/subTemplate/BaseDoctor';
  import baseAppliance from '@/components/subTemplate/BaseAppliance';
  export default {
    data() {
      return {
        activeName: 'first',
        serCount: 0,
        patCount: 0,
        ksList: [
          {
            label: '内科',
            detail: [
              {
                name: '普通内科',
                num: '20'
              },
              {
                name: '心血管内科',
                num: '13'
              },
              {
                name: '内分泌科',
                num: '20'
              },
              {
                name: '消化内科',
                num: '2'
              },
              {
                name: '肾病内科',
                num: '89'
              },
              {
                name: '风湿免疫科',
                num: '6'
              },
              {
                name: '神经内科',
                num: '3'
              }
            ]
          },
          {
            label: '外科',
            detail: [
              {
                name: '普通内科',
                num: '20'
              },
              {
                name: '普通内科',
                num: '20'
              },
              {
                name: '普通内科',
                num: '20'
              },
              {
                name: '普通内科',
                num: '20'
              }
            ]
          },
          {
            label: '妇儿',
            detail: [
              {
                name: '普通内科',
                num: '20'
              },
              {
                name: '普通内科',
                num: '20'
              },
              {
                name: '普通内科',
                num: '20'
              },
              {
                name: '普通内科',
                num: '20'
              }
            ]
          }
        ],
        ifDefault: false,
        ifDefault2: false
      };
    },
    // created() {
    //   this.expertId = urlParse('id');
    //   this.getExpertInfo();
    //   this.getExpertWave();
    //   this.getExpertPatent();
    //   this.queryPubCount();
    //   this.getExpContent();
    //   this.getLikeExperts();
    //   this.getCoopExperts();
    // },
    // computed: {
    //   platThreeServices() {
    //     var pt = this.platServices
    //     var str = []
    //     if (pt.length > 3) {
    //       for (let i = 0; i < 3; ++i) {
    //         str[i] = pt[i]
    //       }
    //     } else {
    //       str = pt
    //     }
    //     return str
    //   },
    //   platOnePatents() {
    //     var pt = this.platPatents
    //     var str = []
    //     if (pt.length > 1) {
    //       for (let i = 0; i < 1; ++i) {
    //         str[i] = pt[i]
    //       }
    //     } else {
    //       str = pt
    //     }
    //     return str
    //   }
    // },
    components: {
      baseDoctor,
      baseAppliance
    },
    // methods: {
    //   getExpertInfo() {
    //     this.$axios.getk('/ajax/professor/info/' + this.expertId, {
    //     }, (res) => {
    //       if (res.success) {
    //         var $info = res.data;
    //         $info.offt = formatOfft($info);
    //         if ($info.subject) {
    //           $info.subject = strToArr($info.subject);
    //         }
    //         if ($info.industry) {
    //           $info.industry = strToArr($info.industry);
    //         }
    //         if ($info.hasHeadImage) {
    //           $info.img = ImageUrl(('head/' + $info.id + '_l.jpg'), true)
    //         } else {
    //           $info.img = defaultSet.img.expert
    //         }
    //         $info.resAreas = [];
    //         if ($info.researchAreas && $info.researchAreas.length > 0) {
    //           for (let i = 0; i < $info.researchAreas.length; ++i) {
    //             $info.resAreas.push($info.researchAreas[i].caption);
    //           }
    //         }
    //         document.title = $info.name + '-' + PLAT.info.title
    //         this.expertInfo = $info;
    //       };
    //     });
    //   },
    //   getExpertWave() {
    //     this.$axios.getk('/ajax/ware/publish', {
    //       category: '1',
    //       owner: this.expertId,
    //       modifyTime: this.dataO.serModifyTime,
    //       rows: this.rows
    //     }, (res) => {
    //       if (res.success) {
    //         var $info = res.data;
    //         if ($info.length > 0) {
    //           this.dataO.serModifyTime = $info[$info.length - 1].modifyTime;
    //           this.platServices = this.isFormSearch ? this.platServices.concat($info) : $info;
    //           this.isFormSearch = true;
    //           if ($info.length < this.rows) {
    //             this.loadingModalShow = false;
    //             this.isFormSearch = false;
    //           };
    //         } else {
    //           this.loadingModalShow = false;
    //           this.isFormSearch = false;
    //         };
    //         var liLen = this.platServices.length;
    //         if ($info.length === 0 && liLen === 0) {
    //           this.ifDefault = true;
    //         };
    //       };
    //     });
    //   },
    //   searchLower() {
    //     if (this.loadingModalShow && !this.isLoading) {
    //       this.getExpertWave();
    //     }
    //   },
    //   getExpertPatent() {
    //     this.$axios.getk('/ajax/ppatent/professor', {
    //       owner: this.expertId,
    //       assTime: this.dataO.patTime,
    //       id: this.dataO.patId,
    //       rows: this.rows
    //     }, (res) => {
    //       if (res.success) {
    //         var $info = res.data;
    //         if ($info.length > 0) {
    //           this.dataO.patTime = $info[$info.length - 1].assTime;
    //           this.dataO.patId = $info[$info.length - 1].id;
    //           for(let i = 0; i < $info.length; i++) {
    //             $info[i].authors = $info[i].authors.substr(0, $info[i].authors.length - 1);
    //           }
    //           this.platPatents = this.isFormSearch2 ? this.platPatents.concat($info) : $info;
    //           this.isFormSearch2 = true;
    //           if ($info.length < this.rows) {
    //             this.loadingModalShow2 = false;
    //             this.isFormSearch2 = false;
    //           };
    //         } else {
    //           this.loadingModalShow2 = false;
    //           this.isFormSearch2 = false;
    //         };
    //         var liLen = this.platPatents.length;
    //         if ($info.length === 0 && liLen === 0) {
    //           this.ifDefault2 = true;
    //         };
    //       };
    //     });
    //   },
    //   searchLower2() {
    //     if (this.loadingModalShow2 && !this.isLoading2) {
    //       this.getExpertPatent();
    //     }
    //   },
    //   queryPubCount() {
    //     var that = this
    //     this.$axios.getk('/ajax/ware/count/publish', {
    //       owner: that.expertId,
    //       category: '1'
    //     }, function(data) {
    //       if (data.data > 0 && data.data < 99) {
    //         that.serCount = data.data;
    //       }
    //       if (data.data > 99) {
    //        that.serCount = '99+';
    //       }
    //     });
    //     this.$axios.getk('/ajax/ppatent/count/publish', {
    //       owner: that.expertId
    //     }, function(data) {
    //       if (data.data > 0 && data.data < 99) {
    //         that.patCount = data.data;
    //       }
    //       if (data.data > 99) {
    //        that.patCount = '99+';
    //       }
    //     });
    //   },
    //   headIcon(item) {
    //     return autho(item.authType, item.orgAuth, item.authStatus);
    //   },
    //   getExpContent() {
    //     var that = this
    //     this.$axios.get('/ajax/article/lq/with/professor', {
    //       pid: this.expertId
    //     }, (res) => {
    //       if (res.success) {
    //         var $info = res.data;
    //         if ($info.length > 0) {
    //           for (let i = 0; i < $info.length; ++i) {
    //             (function(str) {
    //               that.$axios.get('/ajax/article/qo', {
    //                 id: str.id
    //               }, (data) => {
    //                 if (data.success) {
    //                   str.title = data.data.title
    //                   that.$forceUpdate()
    //                 };
    //               });
    //             })($info[i])
    //           }
    //           that.expContents = $info;
    //         };
    //       };
    //     });
    //   },
    //   getLikeExperts() {
    //     var that = this
    //     this.$axios.getk('/ajax/professor/ralateProfessors', {
    //       professorId: this.expertId
    //     }, (res) => {
    //       if (res.success) {
    //         var $data = res.data;
    //         var arr = []
    //         var hdata = { num: 1, data: $data }
    //         if ($data.length > 0) {
    //           for (let i in $data) {
    //             hdata.num++
    //             arr[i] = $data[i].id;
    //             hdata.num--
    //           }
    //           hdata.num--
    //           if (hdata.num === 0 && arr.length) {
    //             that.$axios.getk('/ajax/professor/qm', {
    //               id: arr
    //             }, function(data) {
    //               if (data.success && data.data) {
    //                 var obj = data.data
    //                 if (obj.length > 0) {
    //                   for (let m = 0; m < obj.length; ++m) {
    //                     obj[m].img = defaultSet.img.expert
    //                     if (obj[m].hasHeadImage) {
    //                       obj[m].img = ImageUrl(('head/' + obj[m].id + '_l.jpg'), true)
    //                     }
    //                     obj[m].auth = autho(obj[m].authType, obj[m].orgAuth, obj[m].authStatus)
    //                     obj[m].offt = formatOfft(obj[m], true)
    //                   }
    //                   setTimeout(() => {
    //                     that.likeExperts = obj
    //                   }, 1000);
    //                 }
    //               }
    //             })
    //           }
    //         };
    //       };
    //     });
    //   },
    //   getCoopExperts() {
    //     var that = this
    //     this.$axios.getk('/ajax/professor/coadjutant', {
    //       id: this.expertId
    //     }, (res) => {
    //       if (res.success) {
    //         var $info = res.data;
    //         if ($info.length > 0) {
    //           for (let i = 0; i < $info.length; ++i) {
    //             (function(str) {
    //               queryBase.getProfessor(str.professorId, function(sc, value) {
    //                 if (sc) {
    //                   str.name = value.name
    //                   str.title = value.title
    //                   if (value.hasHeadImage) {
    //                     str.img = ImageUrl(('head/' + value.id + '_l.jpg'), true)
    //                   } else {
    //                     str.img = defaultSet.img.expert
    //                   }
    //                   that.$forceUpdate()
    //                 }
    //               })
    //             })($info[i])
    //           }
    //           that.coopExperts = $info;
    //         }
    //       };
    //     });
    //   }
    // }
  }
</script>
