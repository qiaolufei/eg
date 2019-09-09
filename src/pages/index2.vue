<template>
    <div class='index2'>
        <headpage></headpage>
        <div class='index2__title'>
          胸围：<el-slider
          class='index2__title-option'
          v-model='bust'
          range
          show-stops
          :min='51'
          :max='190'
          @change='getdata1'
          :marks='bustmarks'>
          </el-slider>
        </div>
        <div class='index2__title'>
          臀围：<el-slider
          class='index2__title-option'
          v-model='hipline'
          range
          show-stops
          :min='43'
          :max='190'
          @change='getdata1'
          :marks='hiplinemarks'>
          </el-slider>
        </div>
        <div class='index2__title'>
          腰围：<el-slider
          class='index2__title-option'
          v-model='waist'
          range
          show-stops
          :min='47'
          :max='190'
          @change='getdata1'
          :marks='waistmarks'>
          </el-slider>
        </div>
        <div class='index2__title'>
          身高：<el-slider
          class='index2__title-option'
          v-model='height'
          range
          show-stops
          :min='0'
          :max='190'
          @change='getdata1'
          :marks='heightmarks'>
          </el-slider>
        </div>
        <div class='index2__title'>
          罩杯：<el-slider
          class='index2__title-option'
          v-model='cup'
          range
          show-stops
          :min='1'
          :max='26'
          @change='getdata1'
          :format-tooltip='formatTooltip'
          :marks='cupmarks'>
          </el-slider>
        </div>
        <div class='index2__title'>
          生日年份：<el-slider
          class='index2__title-option'
          v-model='age'
          range
          show-stops
          :min='1980'
          :max='2019'
          @change='getdata1'
          :marks='agemarks'>
          </el-slider>
        </div>
        <hr>
          <div class='index2__title'>
            页码：<el-slider
            class='index2__title-option'
            v-model="page"
            show-stops
            :min='1'
            @change='getdata1'
            show-input>
            </el-slider>
          </div>
        <hr>
        <div>
          <div v-for="i of eg" :key="i._id" class="list">
            <img :src="[i.img]">
            <br>
            演员：{{i.name}}
            <br>
            <a :href="[i._id]" target="_blank">链接</a>
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
      page: 1,
      bust: [51, 190],
      hipline: [43, 190],
      waist: [47, 190],
      height: [0, 190],
      cup: [1, 26],
      age: [1980, 2019],
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
      this.eg = []
      let params = {
        'page': this.page,
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
        .get('/api/filter_actress?' + qs.stringify(params))
        .then(response => {
          let length = response.data.length
          for (let i = length - 1; i >= 0; i--) {
            let _id = response.data[i]._id
            let img = response.data[i].img
            let name = response.data[i].name
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
.index2{
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
  margin: 1% 0 0 4%;
  text-align: center;
  border: 1px solid grey;
  border-radius: 3px;
  width: 15%;
}
img{
  width:80%;
  margin-top: 2%
}
</style>
