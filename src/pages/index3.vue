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
            @change="getdata2"
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
            @change="getdata2"
            :marks="timemarks">
            </el-slider>
        </div>
        <div class='index3__title'>
          胸围：<el-slider
          class='index3__title-option'
          v-model='bust'
          range
          show-stops
          :min='51'
          :max='190'
          @change='getdata2'
          :marks='bustmarks'>
          </el-slider>
        </div>
        <div class='index3__title'>
          臀围：<el-slider
          class='index3__title-option'
          v-model='hipline'
          range
          show-stops
          :min='43'
          :max='190'
          @change='getdata2'
          :marks='hiplinemarks'>
          </el-slider>
        </div>
        <div class='index3__title'>
          腰围：<el-slider
          class='index3__title-option'
          v-model='waist'
          range
          show-stops
          :min='47'
          :max='190'
          @change='getdata2'
          :marks='waistmarks'>
          </el-slider>
        </div>
        <div class='index3__title'>
          身高：<el-slider
          class='index3__title-option'
          v-model='height'
          range
          show-stops
          :min='0'
          :max='190'
          @change='getdata2'
          :marks='heightmarks'>
          </el-slider>
        </div>
        <div class='index3__title'>
          罩杯：<el-slider
          class='index3__title-option'
          v-model='cup'
          range
          show-stops
          :min='1'
          :max='26'
          @change='getdata2'
          :format-tooltip='formatTooltip'
          :marks='cupmarks'>
          </el-slider>
        </div>
        <div class='index3__title'>
          生日年份：<el-slider
          class='index3__title-option'
          v-model='age'
          range
          show-stops
          :min='1980'
          :max='2019'
          @change='getdata2'
          :marks='agemarks'>
          </el-slider>
        </div>
        <hr>
          <div class='index3__title'>
            页码：<el-slider
            class='index3__title-option'
            v-model="page"
            show-stops
            :min='1'
            @change='getdata2'
            show-input>
            </el-slider>
          </div>
        <hr>
        <div>
          <div v-for="i of eg" :key="i._id" class="list">
              番号：{{i.name}}
              <br>
              时长：{{i.l}}
              <br>
              <span v-for="s of i.leibie" :key="s" style="margin-left:1%;background-color:aquamarine" >{{s}}</span>
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
    getdata2 () {
      let params = {
        'page': this.page,
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
        .get('/api/XXX?' + qs.stringify(params))
        .then(response => {
          console.log(response)
          let length = response.data.length
          for (let i = length - 1; i >= 0; i--) {
            let _id = response.data[i]._id // 地址
            let leibie = response.data[i].leibie // 类别
            let name = response.data[i].識別碼 // 番号
            let l = response.data[i].長度 + '分钟' // 时长
            let map = {}
            map['_id'] = _id
            map['leibie'] = leibie
            map['name'] = name
            map['l'] = l
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
    this.getdata2()
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
  width: 15%;
}
img{
  width:80%;
  margin-top: 2%
}
</style>
