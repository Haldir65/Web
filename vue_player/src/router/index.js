import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Player from '@/components/Player';
import Controller from '@/components/Controller';
import About from '../components/About/About';
import Header from '../components/Front/Header';
import Home from '../components/Home';
import Vifs from '../components/Front/Vifs';
import Layout from '../components/Front/Layout';
import vuexSample from '../components/Front/vuexSample';
import CSS_PlayGround from '../components/Front/CSS_PlayGround';
import CSS_positioning from '../components/Front/CSS_positioning';
import VFors from '../components/Front/VFors';
import axioSample from '../components/axio/axioSample';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/player',
      name: 'Player',
      component: Player
    }, {
      path: '/about',
      name: 'About',
      component: About
    }, {
      path: '/header',
      name: 'Header',
      component: Header
    }, {
      path: '/vifs',
      name: 'vifs',
      component: Vifs
    }, {
      path: '/layout',
      name: 'layout',
      component: Layout
    },{
      path: '/samples/vuex',
      name: 'vuex',
      component: vuexSample
    },{
      path: '/css/css_positioning',
      name: 'cssPositioning',
      component: CSS_PlayGround
    },{
      path:'/css/css_positioning2',
      name: 'css_positioning_2',
      component: CSS_positioning
    },{
      path: '/syntax/v-fors',
      name: 'VFors',
      component: VFors
    },{
      path: '/syntax/axios',
      name: 'AxioSample',
      component: axioSample
    }
  ],
  mode: 'history'
})
