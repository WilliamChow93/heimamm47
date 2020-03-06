<template>
  <div class="chart">
    <!-- 顶部卡片 -->
    <el-card class="card1">
      <ul>
        <li>
          <span class="zero">{{topData.increment_users}}</span>
          <span>今日新增用户</span>
        </li>
        <li>
          <span class="zero">{{topData.total_users}}</span>
          <span>总用户量</span>
        </li>
        <li>
          <span class="zero orange">{{topData.increment_questions}}</span>
          <span>新增试题</span>
        </li>
        <li>
          <span class="zero orange">{{topData.total_questions}}</span>
          <span>总试题量</span>
        </li>
        <li>
          <span class="zero green">{{topData.total_done_questions}}</span>
          <span>总刷题量</span>
        </li>
        <li>
          <span class="zero green">{{topData.personal_questions}}</span>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <!-- 底部卡片 -->
    <el-card class="card2">
      <div ref="box" class="box"></div>
    </el-card>
  </div>
</template>

<script>
import { getTop, statistics } from "@/api/chart.js";
import echarts from "echarts";
export default {
  data() {
    return {
      topData: {}
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.box);
    //企业题目数据统计接口
    statistics().then(res => {
      console.log(res);
      let names = res.data.data.map(item => {
        return item.name;
      });
      var option = {
        title: {
          left: "left",
          text: "整体数据"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 10,
          data: names
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: res.data.data
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  },
  created() {
    getTop().then(res => {
      console.log(res);
      this.topData = res.data.data;
    });
  }
};
</script>

<style lang="less">
.chart {
  .card1 {
    margin-bottom: 13px;

    ul {
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        .zero {
          display: flex;
          justify-content: center;
          width: 99px;
          height: 99px;
          border: 2px solid rgba(0, 134, 250, 1);
          border-radius: 50%;
          font-size: 20px;
          align-items: center;
          &.orange {
            border-color: #f76137;
          }
          &.green {
            border-color: #55cd78;
          }
        }
        span {
          margin-top: 13px;
          text-align: center;
        }
      }
    }
  }
  .card2 {
    height: 570px;

    .box {
      height: 570px;
    }
  }
}
</style>