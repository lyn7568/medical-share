<template>
  <div class="brow-content">
		<div class="main-content split-bottom-20">
      <div class="wrapper-left">
        <div class="content-wrapper split-bottom-20">
          <div class="headcon-box hdetail-box">
            <div class="zoom-box">
              <preview-magnify></preview-magnify>
            </div>
            <div class="list-item reInfo-box">
              <div class="list-tit">器械名称器械名称器械名称器械名称器械名称器械名称</div>
              <div class="list-desc">功能用途：功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途功能用途</div>
              <div class="list-operate zoom-operate">
                使用状态：使用状态
              </div>
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="content">
            <el-row :gutter="10" class="rel-detail">
              <el-col class="rel-item" :span="24">
                <div class="rel-tit">厂商型号：</div>
                <div>sit amet lacus accumsan et vive</div>
              </el-col>
              <el-col class="rel-item" :span="24">
                <div class="rel-tit">器械简介：</div>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="split-bottom-20">
          <base-hospital v-for="item in 1" :key="item.index" :min="true"></base-hospital>
        </div>
        <div class="split-bottom-20">
          <div class="content-title">其他器械</div>
          <base-appliance v-for="item in 5" :key="item.index" :min="true"></base-appliance>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import previewMagnify from '@/components/PreviewMagnify'
  import baseAppliance from '@/components/subTemplate/BaseAppliance';
  import baseHospital from '@/components/subTemplate/BaseHospital';
  export default {
    data() {
      return {
      }
    },
    components: {
      previewMagnify,
      baseAppliance,
      baseHospital
    }
  }
</script>
