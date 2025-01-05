// 该文件是router！！！
// 该文件是router！！！
// 该文件是router！！！
import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import("@/views/Login.vue");
import Layout from "@/layout";
Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    redirect: "/home",
    meta: { title: "首页", icon: "el-icon-s-home" },
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home",
        meta: { title: "首页", icon: "" },
        component: () => import("../views/home"),
      },
    ],

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },

  // 乐队用户视角
  {
    path: "/band",
    component: Layout,
    meta: { title: "本乐队相关", icon: "iconfont icon-yonghu" },
    children: [
      {
        path: "/band/band_info",
        name: "band_info",
        bgimgurl: "~@/assets/images/孤独摇滚.png",
        meta: { title: "乐队信息", icon: "iconfont icon-yonghu" },
        component: () => import("../views/band/band_info/BandInfo.vue"),
      },
      {
        path: "/band/band_member_info",
        name: "band_member_info",
        meta: { title: "乐队成员信息", icon: "iconfont icon-xuejiguanli" },
        component: () => import("../views/band/band_member/BandMember.vue"),
      },
      {
        path: "/band/album_info",
        name: "album_info",
        meta: { title: "本乐队专辑信息", icon: "iconfont icon-tubiao" },
        component: () => import("../views/band/band_album/BandAlbum.vue"),
      },
      {
        path: "/band/song_info",
        name: "song_info",
        meta: { title: "歌曲信息", icon: "iconfont icon-tubiao" },
        component: () => import("../views/band/band_song/BandSong.vue"),
      },
      {
        path: "/band/concert_info",
        name: "concert_info",
        meta: { title: "演唱会信息", icon: "iconfont icon-tubiao" },
        component: () => import("../views/band/band_concert/BandConcert.vue"),
      },
    ],
  },
 

  {
    path: "/band/theif_fan",
    component: Layout,
    meta: { title: "我们的粉丝！", icon: "iconfont icon-yonghu" },
    children: [
      {
        path: "/band/theif_fan/_FanLikesBands",
        name: "_FanLikesBands",
        bgimgurl: "~@/assets/images/孤独摇滚.png",
        meta: { title: "我们的粉丝！", icon: "iconfont icon-yonghu" },
        component: () => import("../views/band/band_about_fan/index.vue"),
      },
   ],
  },

  {
    path: "/band/music_review",
    component: Layout,
    meta: { title: "乐评情况！", icon: "iconfont icon-yonghu" },
    children: [
      {
        path: "/band/music_review",
        name: "_FanLikesBands",
        bgimgurl: "~@/assets/images/孤独摇滚.png",
        meta: { title: "专辑乐评", icon: "iconfont icon-yonghu" },
        component: () => import("../views/band/band_MusicReview/BandMusicReview.vue"),
      },
    ]
  },

    {
    path: "/test/1",
    component: Layout,
    meta: { title: "____________________", icon: "" },
  },
  
  // 歌迷用户视角
 {
    path: "/fan",
    component: Layout,
    meta: { title: "歌迷相关操作", icon: "iconfont icon-yonghu" },
    children: [
      {
        path: "/fan/manage",
        name: "manage",
        bgimgurl: "~@/assets/images/孤独摇滚.png",
        meta: { title: "歌迷用户身份修订", icon: "iconfont icon-yonghu" },
        component: () => import("../views/fan/fan_update.vue"),
      },
      {
        path: "/fan/FanLikesBand",
        name: "FanLikesBand",
        meta: { title: "歌迷爱好乐队", icon: "iconfont icon-xuejiguanli" },
        component: () => import("../views/fan/fan_heLikes/FanLikesBand/FanLikesBand.vue"),
      },
      {
        path: "/fan/FanLikesSong",
        name: "FanLikesSong",
        meta: { title: "歌迷爱好歌曲", icon: "iconfont icon-xuejiguanli" },
        component: () => import("../views/fan/fan_heLikes/FanLikesSong/FanLikesSong.vue"),
      },
      {
        path: "/fan/FanLikesAlbum",
        name: "FanLikesAlbum",
        meta: { title: "歌迷爱好专辑", icon: "iconfont icon-xuejiguanli" },
        component: () => import("../views/fan/fan_heLikes/FanLikesAlbum/FanLikesAlbum.vue"),
      },
      {
        path: "/fan/FanAttendConcert",
        name: "FanAttendConcert",
        meta: { title: "歌迷参加的演唱会", icon: "iconfont icon-xuejiguanli" },
        component: () => import("../views/fan/fan_heLikes/FanAttendConcert/FanAttendConcert.vue"),
      },
      {

        path: "/fan/fan_un",
        name: "fan_un",
        meta: { title: "歌迷未关注的", icon: "iconfont icon-tubiao" },
        component: () => import("../views/fan/fan_un/fan_un.vue"),
      },
            {
        path: "/fan/fan_reviews",
        name: "fan_reviews",
        meta: { title: "歌迷评论", icon: "iconfont icon-tubiao" },
        component: () => import("../views/fan/fan_review/fan_review.vue"),
      },
    ],

  },
  

  


  {
    path: "/test/2",
    component: Layout,
    meta: { title: "____________________"},
  },

  {
    path: "/admin",
    meta: { title: "管理员", icon: "el-icon-s-custom" },
    component: Layout,
    children: [
      {
        name: "admin_band",
        path: "/admin/Band",
        meta: {
          title: "管理Band",
          icon: "",
        },
        component: () => import("../views/admin/admin_Band/admin_Band.vue"),
      },
      {
        name: "admin_fan",
        path: "/admin/Fan",
        meta: {
          title: "管理Fan",
          icon: "",
        },
        component: () => import("../views/admin/admin_Fan/admin_Fan.vue"),
      },
      {
        name: "admin_song",
        path: "/admin/Song",
        meta: {
          title: "管理Song",
          icon: "",
        },
        component: () => import("../views/admin/admin_Song/admin_Song.vue"),
      },
      {
        name: "admin_concert",
        path: "/admin/Concert",
        meta: {
          title: "管理Concert",
          icon: "",
        },
        component: () => import("../views/admin/admin_Concert/admin_Concert.vue"),
      },
      {
        name: "admin",
        path: "/admin/Album",
        meta: {
          title: "管理Album",
          icon: "",
        },
        component: () => import("../views/admin/admin_Album/admin_Album.vue"),
      },
 



    ],

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// 该文件是router！！！
// 该文件是router！！！
// 该文件是router！！！