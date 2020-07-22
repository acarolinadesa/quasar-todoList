<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md ">
        <div class="text-color text-h3">Todo</div>
        <div class="text-color text-subtitle">{{ todaysDate }}</div>
      </div>
      <q-img
        src="https://placeimg.com/1000/200/tech"
        class="header-image absolute-top"/>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 185px); margin-top: 185px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item to="/"
            exact
            clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Todo
              </q-item-section>
            </q-item>

            <q-item to="/help"
            clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Help
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://placeimg.com/1000/200/tech" style="height: 185px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://en.gravatar.com/avatar/8ddefa7f7e39eba2fa5f3f41329e821e"/>
            </q-avatar>
            <div class="text-color text-weight-bold">Ana Carolina de Sá</div>
            <div class="text-color">@acarolren</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <!-- To preserve changes when the page is changed -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { date } from 'quasar'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,

    }
  },
  computed: {
    todaysDate () {
    let timeStamp = Date.now()
    return date.formatDate(timeStamp, 'dddd, D MMMM')
    }
  }
}

</script>

<style lang="scss">
  .header-image {
    height: 100%;
    z-index: -1;
    opacity: 0.8;
    filter: grayscale(50%);
  }
  .profile-image{
    height: 100%;
    z-index: -1;
    // opacity: 0.2;
    // filter: grayscale(100%);
  }
  .text-color{
    color: rgb(255, 255, 255);
    font-family: 'Arial';
    // text-shadow: 0 0 0.2em rgb(255, 255, 255);
    -webkit-text-stroke-width: 0.6px;
    -webkit-text-stroke-color: rgb(0, 0, 0);
  }
</style>
