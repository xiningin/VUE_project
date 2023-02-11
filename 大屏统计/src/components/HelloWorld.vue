<template>
  <div class="common-layout">
    <el-container>
      <el-header class="topHeader">
        <TopHeader></TopHeader>
      </el-header>
      <el-main class="mainPane">
        <div style="margin-left: 70px; margin-right:40px;margin-top:20px;">
          <el-row class="row-bg" justify="space-between" align="middle">
            <el-col :span="15">
              <el-row justify="start" class="mb-4" align="middle">
                <div>
                  <el-dropdown type="primary" size="large">
                    <el-button type="primary" size="large">
                      <el-icon style="margin-right: 10px;">
                        <Plus />
                      </el-icon>
                      新建问卷
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item>Action 4</el-dropdown-item>
                        <el-dropdown-item>Action 5</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>

                <el-form :inline="true" style="margin-left: 10px;">
                  <el-form-item label="" size="large" style="margin-right: 10px;margin-bottom: 0px;">
                    <el-input v-model="input4" class="w-50 m-2" placeholder="搜索问卷">
                      <template #prefix>
                        <el-icon class="el-input__icon">
                          <search />
                        </el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item size="large" style="margin-right: 10px;margin-bottom: 0px;">
                    <el-select clearable placeholder="状态">
                      <el-option key="a" label="开启状态" value="a" />
                      <el-option key="b" label="关闭状态" value="b" />
                      <el-option key="c" label="全部" value="c" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button circle style="margin-top: 15px;">
                      <el-icon>
                        <Search />
                      </el-icon>
                    </el-button>
                  </el-form-item>
                </el-form>
              </el-row>
            </el-col>
            <el-col :span="7">
              <el-row justify="end" align="middle">
                <el-radio-group v-model="tabPosition" style="margin-right:15px ;">
                  <el-radio-button label="top">
                    修改时间降序
                  </el-radio-button>
                  <el-radio-button label="right">
                    创建时间降序
                  </el-radio-button>
                </el-radio-group>
                <el-button circle>
                  <el-icon>
                    <Refresh />
                  </el-icon>
                </el-button>
              </el-row>

            </el-col>
          </el-row>
          <el-empty description="当前没有问卷" image-size="70"
            image="data:image/png;base64,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">
            <el-button type="primary">
              <el-icon style="margin-right: 3px;">
                <Plus />
              </el-icon>创建新问卷
            </el-button>
            <el-button type="info">
              <el-icon style="margin-right: 3px;">
                <Refresh />
              </el-icon>刷新
            </el-button>
          </el-empty>
          <el-row justify=" center" align="middle">
            <el-space wrap :size="50">
              <!-- 骨架屏 测试 -->
              <el-card v-for="i in 5" :key="i" class="box-card sitem-wrap"
                style="width: 220px; height:202px;--el-card-padding: 0px;box-shadow: 0px 2px 8px rgb(0 0 0 / 6%);">
                <template #header>
                  <el-skeleton style="width: 220px;height:202px;" animated>
                    <template #template>
                      <el-skeleton-item variant="image" style="width: 220px; height: 122px" />
                      <div style="margin: 10px">
                        <div style="display: flex;align-items: start;justify-items: space-between;margin-top: 15px;">
                          <el-skeleton-item variant="text" style="margin-right: 50px;height: 20px;" />
                        </div>
                        <div style="display: flex;align-items: center;justify-items: space-between;margin-top: 15px;">
                          <el-skeleton-item variant="text" style="margin-right: 16px" />
                          <el-skeleton-item variant="text" style="width: 30%" />
                        </div>
                      </div>
                    </template>
                  </el-skeleton>
                </template>
              </el-card>
              <el-card v-for="i in 20" :key="i" class="box-card sitem-wrap"
                style="width: 220px;height:202px;--el-card-padding: 0px;box-shadow: 0px 2px 8px rgb(0 0 0 / 6%);">
                <template #header>
                  <div class="questionnaireCard">
                    <el-row justify="start">
                      <div class="card-header" style="margin: 10px;">
                        <el-tag class="ml-2" type="warning">收集中</el-tag>
                      </div>
                    </el-row>
                  </div>
                </template>
                <div class="text item">
                  <el-row justify="start" style="margin: 10px;">
                    我是问卷标题
                  </el-row>
                  <div class="questionnaireDetail">
                    <el-row style="margin: 10px;" align="middle">
                      <el-col :span="12">
                        <el-row justify="start" align="middle">
                          <div style="font-size: 13px;">创建于哼哼哼</div>
                        </el-row>
                      </el-col>
                      <el-col :span="12">
                        <el-row justify="end" align="middle">
                          <el-tag class="ml-2" type="info">ID:13456</el-tag>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="questionnaireOperation">
                    <el-row style="margin-left: 10px;">
                      <el-button text class="mySmallButton">
                        <el-icon style="margin-right: 3px;">
                          <EditPen />
                        </el-icon>编辑
                      </el-button>
                      <el-button text class="mySmallButton">
                        <el-icon style="margin-right: 3px;">
                          <Share />
                        </el-icon>发送
                      </el-button>
                      <el-button text class="mySmallButton">
                        <el-icon style="margin-right: 3px;">
                          <Histogram />
                        </el-icon>统计
                      </el-button>
                      <el-dropdown style="margin-top: 8px;" class="questionnaireMoreOptions">
                        <span class="el-dropdown-link">
                          <el-icon class="el-icon--right">
                            <MoreFilled />
                          </el-icon>
                        </span>
                        <template #dropdown>
                          <el-dropdown-menu>

                            <el-dropdown-item command="b">
                              <el-icon class="el-icon--right">
                                <CopyDocument />
                              </el-icon>克隆
                            </el-dropdown-item>
                            <el-dropdown-item command="c">
                              <el-icon class="el-icon--right">
                                <Share />
                              </el-icon>共享
                            </el-dropdown-item>
                            <el-dropdown-item command="a" divided>
                              <el-icon class="el-icon--right">
                                <DeleteFilled />
                              </el-icon>删除
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </el-row>
                  </div>
                </div>
              </el-card>
            </el-space>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import { Refresh } from '@element-plus/icons-vue';
import TopHeader from '../layout/Header.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    TopHeader,
    Refresh
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.topHeader {
  --el-header-padding: 0;
  --el-header-height: 64px;
}

.mainPane {
  overflow: hidden;
}

.questionnaireCard {
  width: 100%;
  height: 122px;
  vertical-align: top;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgb(242, 242, 242);
  background-image: url('data:image/png;base64,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')
}

.sitem-wrap:hover {
  -webkit-transform: translateY(-10px);
  -ms-transform: translateY(-10px);
  transform: translateY(-10px);
}

.mySmallButton {
  padding: 8px 6px;
  margin-left: 0px !important;
}

.questionnaireDetail {
  color: #999999;
  -webkit-transition: opacity 0.3s, -webkit-transform 0.3s ease;
  transition: opacity 0.3s, -webkit-transform 0.3s ease;
  transition: opacity 0.3s, transform 0.3s ease;
  transition: opacity 0.3s, transform 0.3s ease, -webkit-transform 0.3s ease;
}

.questionnaireOperation {
  -webkit-transition: opacity 0.3s, -webkit-transform 0.3s ease;
  transition: opacity 0.3s, -webkit-transform 0.3s ease;
  transition: opacity 0.3s, transform 0.3s ease;
  transition: opacity 0.3s, transform 0.3s ease, -webkit-transform 0.3s ease;
  opacity: 0;
  position: relative;
}

.sitem-wrap:hover .questionnaireDetail {
  opacity: 0;
  -webkit-transform: translateY(-21px);
  -ms-transform: translateY(-21px);
  transform: translateY(-21px);
}

.sitem-wrap:hover .questionnaireOperation {
  opacity: 1;
  -webkit-transform: translateY(-37px);
  -ms-transform: translateY(-37px);
  transform: translateY(-37px);
}
</style>
