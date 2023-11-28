<template>
  <div class="ui-home">
    <h2 class="ui-title">前端知识库</h2>
    <ul class="ui-project">
      <li class="item" v-for="v in siteData" :key="v.name">
        <a class="link" :href="v.link" target="_blank">
          <div class="title">
            <img :src="data[v.name]" alt="">
          </div>
          <p class="desc">{{ v.desc }}</p>
        </a>
      </li>
    </ul>
  </div>
  <BackTop></BackTop>
</template>
<script setup>
import { siteData } from '../model/siteData.js'
import tailwindcss from '../img/tailwindcss.png'
import vuejs from '../img/vuejs.png'
import react from '../img/react.png'
import typescript from '../img/typescript.png'
import vite from '../img/vite.png'
import vitest from '../img/vitest.png'
import pinia from '../img/pinia.png'
import antdesign from '../img/antdesign.png'
const data = {
  'tailwindcss': tailwindcss,
  'vuejs': vuejs,
  'react': react,
  'typescript': typescript,
  'vite': vite,
  'vitest': vitest,
  'pinia': pinia,
  'antdesign': antdesign
}
</script>
<style lang="scss">
/**首页网址推荐**/
.ui-home {
  width: 1152px;
  margin: 60px auto 20px;
  .ui-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    font-size: 26px;
  }
}
.ui-project {
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
	justify-content: space-between;
	margin-top: 20px;
  .item,
  .link {
    height: 250px;
  }
  .item {
    .link {
      display: block;
      color: #333;
      background: #fff;
      border: 1px solid #f1f1f1;
      border: none;
      box-shadow: 0 5px 10px rgba(0, 0, 0, .05);
      border-radius: 6px;
      transition: .4s;
      overflow: hidden;
    }
    .link:hover {
      box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
      border: none;
    }
    .title {
      height: 136.5px;
      font-size: 24px;
      color: #fff;
      text-align: center;
      border-radius: 6px 6px 0 0;
      img {
        width: 100%;
      }
    }
    .desc {
      line-height: 2;
      padding: 0 12px;
      margin-top: 14px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>