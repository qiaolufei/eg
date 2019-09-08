<template>
    <div class='index3'>
      <headpage></headpage>
        <div class="index3__title">
            影片发行年份：<el-slider
            class="index3__title-option"
            v-model="year"
            range
            show-stops
            :min="1998"
            :max="2020"
            @change="getdata"
            :marks="yearmarks">
            </el-slider>
        </div>
        <div class="index3__title">
            影片长度（分钟）：<el-slider
            class="index3__title-option"
            v-model="time"
            range
            show-stops
            :max="2880"
            @change="getdata"
            :marks="timemarks">
            </el-slider>
        </div>
        <div class='index3__title'>胸围：<el-slider
        class='index3__title-option'
        v-model='bust'
        range
        show-stops
        :min='51'
        :max='190'
        @change='getdata1'
        :marks='bustmarks'>
        </el-slider></div>
        <div class='index3__title'>臀围：<el-slider
        class='index3__title-option'
        v-model='hipline'
        range
        show-stops
        :min='43'
        :max='190'
        @change='getdata1'
        :marks='hiplinemarks'>
        </el-slider></div>
        <div class='index3__title'>腰围：<el-slider
        class='index3__title-option'
        v-model='waist'
        range
        show-stops
        :min='47'
        :max='190'
        @change='getdata1'
        :marks='waistmarks'>
        </el-slider></div>
        <div class='index3__title'>身高：<el-slider
        class='index3__title-option'
        v-model='height'
        range
        show-stops
        :min='0'
        :max='190'
        @change='getdata1'
        :marks='heightmarks'>
        </el-slider></div>
        <div class='index3__title'>罩杯：<el-slider
        class='index3__title-option'
        v-model='cup'
        range
        show-stops
        :min='1'
        :max='26'
        @change='getdata1'
        :format-tooltip='formatTooltip'
        :marks='cupmarks'>
        </el-slider></div>
        <div class='index3__title'>生日年份：<el-slider
        class='index3__title-option'
        v-model='age'
        range
        show-stops
        :min='1980'
        :max='2019'
        @change='getdata1'
        :marks='agemarks'>
        </el-slider></div>
        <hr>
        <div>
        <div v-for="i of eg" :key="i._id" class="list">
          <!-- <img :src="[i.img]">
          <br>
          演员：{{i.name}}
          <br>
          <a :href="[i._id]" target="_blank">链接</a> -->
        </div>
        </div>
        <br>
    </div>
</template>
<script>
import headpage from '@/components/headbar'
import qs from 'qs'
import axios from 'axios'
export default {
  components: {
    headpage
  },
  data () {
    return {
      eg: [],
      year: [1998, 2020],
      time: [0, 2880],
      bust: [51, 190],
      hipline: [43, 190],
      waist: [47, 190],
      height: [0, 190],
      cup: [1, 26],
      age: [1980, 2019],
      yearmarks: {
        1998: '1988',
        2020: '2020'
      },
      timemarks: {
        0: '0',
        2880: '2880'
      },
      bustmarks: {
        51: '51',
        190: '190'
      },
      hiplinemarks: {
        43: '43',
        190: '190'
      },
      waistmarks: {
        47: '47',
        190: '190'
      },
      heightmarks: {
        0: '0',
        190: '190'
      },
      cupmarks: {
        1: 'A',
        26: 'Z'
      },
      agemarks: {
        1980: '1980',
        2019: '2019'
      }
    }
  },
  methods: {
    getdata1 () {
      let params = {
        'shichangfrom': this.time[0],
        'shicgangto': this.time[1],
        'faxingriqifrom': this.year[0],
        'faxingriqito': this.year[1],
        'xiongweifrom': this.bust[0],
        'xiongweito': this.bust[1],
        'tunweifrom': this.hipline[0],
        'tunweito': this.hipline[1],
        'shengrifrom': this.age[0],
        'shengrito': this.age[1],
        'shengaofrom': this.height[0],
        'shengaoto': this.height[1],
        'yaoweifrom': this.waist[0],
        'yaoweito': this.waist[1],
        'zhaobeifrom': this.cup[0],
        'zhaobeito': this.cup[1]
      }
      console.log(qs.stringify(params))
      axios
        .get('/api/XXX', qs.stringify(params))
        .then(response => {
          let length = response.data.data.length
          for (let i = length - 1; i >= 0; i--) {
            let _id = response.data.data[i]._id
            let img = response.data.data[i].img
            let name = response.data.data[i].name
            let map = {}
            map['_id'] = _id
            map['img'] = img
            map['name'] = name
            this.eg.push(map)
          }
        })
    },
    formatTooltip (val) {
      let reg = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      return reg[val - 1]
    }
  },
  mounted () {
    this.getdata1()
  }
}
</script>

<style lang='less' scoped>
.index3{
    &__title{
        margin: 1% 0 0 2%;
        height: 2%;
        &-option{
            width: 80%;
            height: 10%;
            margin-left: 5%
        }
    }
}
.list{
  display: inline-block;
  margin: 1% 0 0 1%;
  text-align: center;
  border: 1px solid grey;
  border-radius: 3px;
  width: 4%;
  height: 150px;
  font-size: 12px;
}
img{
  width:80%;
  margin-top: 2%
}
</style>
