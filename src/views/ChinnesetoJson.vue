<template>
    <div class="main">
        <div class="headerTitle">中文转json</div>
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="转换内容">
            <el-input
            type="textarea"
            :autosize='{ minRows: 5 }'
            placeholder="请输入内容，以空格分隔"
            v-model="text">
            </el-input>
        </el-form-item>
        </el-form>
        <el-button type="primary" @click="tojson" :loading="skeletonShow">转换</el-button>
        <div style="padding:50px">
            <el-skeleton :rows="textarr.length" animated :loading="skeletonShow"/>
            <div v-html="enText"></div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      text: '',
      textarr: [],
      enText: '',
      form: {},
      skeletonShow: false
    }
  },
  mounted () {
    // this.getData()
  },
  methods: {
    getData (text) {
      this.textarr = text.split(' ')
      this.skeletonShow = true
      this.$axios.post('https://luckycola.com.cn/tools/fanyi', {
        // 需要被翻译的文本
        text: this.textarr.join('.'),
        // 唯一key官网个人中心获取
        ColaKey: 'y0s9onRAJKM5E31720080111520mKssE55V7h',
        // 需要被翻译的文本语言类型,ZH表示中文,EN表示英文
        fromlang: 'ZH',
        // 翻译出的结果文本语言类型,ZH表示中文,EN表示英文
        tolang: 'EN'
      }).then(res => {
        this.skeletonShow = false
        console.log(res.data)
        if (res.data.code === 0) {
          const step1 = res.data.data.dst.replace(/\.+/g, '.').replace(/'s/, '').split('.')
          const formattedParts = step1.map(part => {
            const words = part.trim().split(/\s+/)
            const formattedWords = words.map((word, index) => {
              if (index === 0) {
                // 第一个单词首字母小写
                return word.toLowerCase()
              } else {
                // 其余单词首字母大写
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              }
            })
            return formattedWords.join('')
          })
          console.log(formattedParts)
          //   const newtext = res.data.data.dst.toLowerCase().replace(/\s/g, '').replace(/'s/, '').replace(/\.+/g, '.').split('.')
          const newtext = formattedParts
          console.log(newtext)
          console.log(this.textarr)
          let str = '{'
          for (let i = 0; i < newtext.length; i++) {
            if (i < newtext.length - 1) {
              str += '<br/>&nbsp' + newtext[i] + ' : ' + 'null, // ' + this.textarr[i]
            } else {
              str += '<br/>&nbsp' + newtext[i] + ' : ' + 'null // ' + this.textarr[i]
              str += '<br/>}'
            }
          }
          this.enText = str
        }
      })
    },
    tojson () {
      this.replacekongge(this.text)
    },
    // 多个空格替换成一个空格
    replacekongge (text) {
      this.text = text.trim().replace(/\s+/g, ' ')
      this.getData(this.text)
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
    padding: 30px;
}
.tojson{
    // width: 200px;
    // height: 80px;
    // border-radius: 10px;
    // font-size: 20px;
    // display: flex;
    // justify-content: center;
    // align-items: center;

}
</style>
