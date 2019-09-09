<template>
    <div class="index1">
        <headpage></headpage>
            <div class="index1__title">
              影片发行年份：<el-slider
              class="index1__title-option"
              v-model="year"
              range
              show-stops
              :min="1998"
              :max="2020"
              @change="getdata"
              :marks="yearmarks">
              </el-slider>
            </div>
            <div class="index1__title">
              影片长度（分钟）：<el-slider
              class="index1__title-option"
              v-model="time"
              range
              show-stops
              :max="2880"
              @change="getdata"
              :marks="timemarks">
              </el-slider>
            </div>
            <div class="index1__title">
              <el-checkbox-group @change="getdata" v-model="sortList">
                    <el-checkbox v-for="i of sort" :key="i" :label="i">{{i}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <hr>
            <div class='index1__title'>
              页码：<el-slider
              class='index1__title-option'
              v-model="page"
              show-stops
              :min='1'
              @change='getdata'
              show-input>
              </el-slider>
            </div>
            <hr>
            <div>
              <div v-for="i of eg" :key="i._id" class="list">
                <img :src="[i.url]">
                <br>
                番号：{{i.name}}
                <br>
                时长：{{i.l}}
                <br>
                <span v-for="s of i.leibie" :key="s" style="margin-left:1%;background-color:aquamarine">{{s}}</span>
                <br>
                <a :href="[i._id]" target="_blank">链接</a>
              </div>
            </div>
    </div>
</template>
<script>
import headpage from '@/components/headbar'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    headpage
  },
  data () {
    return {
      eg: [],
      page: 1,
      year: [1998, 2020],
      currentPage1: 1,
      time: [0, 2880],
      sortList: [],
      yearmarks: {
        1998: '1988',
        2020: '2020'
      },
      timemarks: {
        0: '0',
        2880: '2880'
      },
      sort: ['戲劇', '第一人稱攝影', '顏射', '中出', '姐姐', '淫語', '水手服', '立即口交', '自慰', '高中女生', '乳交', '亂倫', '口交', '女上位', '凌辱', '妓女', '乳液', '打手槍', '美少女', '制服', '护士', '主觀視角', 'キス・接吻', '姐妹', '業餘', '獵豔', '蕩婦', '潮吹', '單體作品', '巨尻', '成熟的女人', '花癡', '女大學生', '性騷擾', '校服', '巨乳', '苗條', '放尿', '藥物', '女生', '嬌小的', '纪录片', '拘束', '多P', '温泉', '乳房', 'SM', '緊縛', '學校泳裝', 'OL', '連褲襪', '惡作劇', '羞恥', '按摩', '美容院', '性奴', '母親', '處男', '已婚婦女', '企畫', '內衣', '婆婆', '按摩棒', '深喉', '折磨', '紧缚', '女檢察官', '女同性戀', '數位馬賽克', '玩具', '肛交', '跳蛋', '超乳', '故事集', '無毛', '屁股', '汗だく', '出軌', '通姦', '戀乳癖', '寡婦', '偶像藝人', '其他戀物癖', '新娘、年輕妻子', '胖女人', '蘿莉塔', '貧乳・微乳', '角色扮演', '首次亮相', '和服・喪服', '舔陰', 'ハーレム', '濫交', '學校作品', '女主播', '女教師', '妄想', '正太控', '格鬥家', 'M男', '給女性觀眾', '爛醉如泥的', '各種職業', '身體意識', '偷窥', '迷你裙', '日焼け', '灌腸', '肛内中出', '變性者', 'ファン感謝・訪問', 'VR専用', '女傭', '戀腿癖', '足交', '女醫生', '女同接吻', '吞精', '野外・露出', '手指插入', 'デカチン・巨根', '迷你係列', '戀愛', '體育服', '飲尿', '催眠', 'ビッチ', '旅行', '眼鏡', '家教', '運動', '輪姦', '局部特寫', '猥褻穿著', '貓耳女', '性別轉型·女性化', '顏面騎乘', '特效', '雙性人', '薄馬賽克', '泳裝', 'セクシー', '孕ませ', '情侶', '粗暴', '嘔吐', '介紹影片', '殘忍畫面', 'DMM專屬', '緊身衣', '女主人、女老板', '監禁', '高', '投稿', '女優按摩棒', '69', '3D', '秘書', '汽車性愛', '千金小姐', '時間停止', '黑人演員', '子宮頸', '娘・養女', '科幻', '強姦', '獨立製作', '拳交', '兔女郎', '及膝襪', '母乳', '童年朋友', '其他', 'ハイクオリティVR', '早漏', '肌肉', '設置項目', '車掌小姐', '遊戲的真人版', '女戰士', '跳舞', 'DVD多士爐', 'デート', '病院・クリニック', '恐怖', '空中小姐', '幻想', '講師', 'M女', '女王様', '處女', '展場女孩', '模特兒', '倒追']
    }
  },
  methods: {
    getdata () {
      this.eg = []
      let params = {
        'page': this.page,
        'shichangfrom': this.time[0],
        'shicgangto': this.time[1],
        'faxingriqifrom': this.year[0],
        'faxingriqito': this.year[1],
        'leibie': this.sortList.toString()
      }
      console.log(qs.stringify(params))
      axios
        .get('/api/filter_av?' + qs.stringify(params))
        .then(response => {
          console.log(response)
          let length = response.data.length
          for (let i = length - 1; i >= 0; i--) {
            let _id = response.data[i]._id // 地址
            let leibie = response.data[i].leibie // 类别
            let name = response.data[i].識別碼 // 番号
            let l = response.data[i].長度 + '分钟' // 时长
            let url = response.data[i].img
            let map = {}
            map['_id'] = _id
            map['leibie'] = leibie
            map['name'] = name
            map['l'] = l
            map['url'] = url
            this.eg.push(map)
          }
        })
    }
  },
  mounted () {
    this.getdata()
  }
}
</script>

<style lang="less" scoped>
.index1{
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
