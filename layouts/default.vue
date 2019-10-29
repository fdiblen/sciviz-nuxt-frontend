<template>
  <v-app id="main">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>

        <v-subheader class="mt-4 grey--text text--darken-1">Pages</v-subheader>

        <v-list-item
          v-for="item in items"
          :key="item.text"
          @click=""
          :to="item.url"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-subheader class="mt-4 grey--text text--darken-1">Users</v-subheader>

        <v-list>

          <v-list-item
            v-for="item in items2"
            :key="item.text"
            @click=""
          >
            <v-list-item-avatar>
              <img
                :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
                alt=""
              >
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>

        <v-list-item
          class="mt-4"
          @click=""
        >
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Browse X</v-list-item-title>
        </v-list-item>

        <v-list-item @click="showMainSettings = !showMainSettings">
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Settings</v-list-item-title>
        </v-list-item>

      </v-list>


    <v-bottom-navigation
      v-model="bottomNav"
      :input-value="true"
      absolute
    >
      <v-btn
        @click.stop="switchTheme"
      >
        <span v-if="darkTheme">Light</span>
        <span v-else>Dark</span>
        <v-icon :dark="!darkTheme">mdi-invert-colors</v-icon>
      </v-btn>

      <v-btn
        @click.stop="showFooter = !showFooter"       
      >
        <span>Footer</span>
        <v-icon :dark="!darkTheme">mdi-page-layout-footer</v-icon>
      </v-btn>
    </v-bottom-navigation>


    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="#e6673f"
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-icon class="mx-4">fab fa-youtube</v-icon> -->
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">SciViz</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row
        align="center"
        style="max-width: 650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        ></v-text-field>
      </v-row>

    </v-app-bar>

    <v-content>
      <!-- <v-container class="fill-height">
      <v-container> -->

        <!-- <v-row
          justify="center"
          align="center"
        >
          <v-col class="shrink"> -->

          <v-container>
            <v-slide-y-transition mode="out-in">
              <nuxt />
            </v-slide-y-transition>
          </v-container>

          <main-settings v-if="showMainSettings" :dialog="showMainSettings"></main-settings>
<!-- 
          </v-col>
        </v-row> -->
      </v-container>
    </v-content>

    <v-footer
      v-if="showFooter"
    >
      <v-card
        class="flex"
        flat
        tile
      >

        <v-card-actions class="justify-center">
          &copy;2019 — <strong>SciViz</strong>

          <v-btn
            v-for="icon in footerIcons"
            :key="icon"
            class="mx-1"
            :dark="darkTheme"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>

        </v-card-actions>

      </v-card>


    </v-footer>


  </v-app>
</template>

<script>

  import MainSettings from '~/components/settings/MainSettings'

  export default {
    props: {
      source: String,
    },
    components: {
      'main-settings': MainSettings   
    },
    data: () => ({
      drawer: null,
      // title: this.pageName,
      darkTheme: true,
      miniVariant: false,
      clipped: false,
      drawer: true,
      fixed: false,
      showFooter: true,
      bottomNav: 2,
      showMainSettings: false,
      items: [
        { icon: 'mdi-home', text: 'Home', url: '/' },        
        { icon: 'mdi-view-dashboard', text: 'Dashboard', url: '/dashboard' },
        { icon: 'mdi-database', text: 'Datasets', url: '/datasets' }
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' }
      ],
        footerIcons: [
        'mdi-linkedin',
        'mdi-twitter',
        'mdi-flickr',
        'mdi-youtube'
        ]
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
    methods: {
      switchTheme () {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        this.darkTheme = this.$vuetify.theme.dark
      }
    },
    computed: {
      pageName() {
        return this.$nuxt.$route.name
      },
      numberOfTotalDatasets (){
          return this.$store.getters['data/numberOfDatasets']
      }
    }
  }
</script>


<style scoped>
.nlesc-logo {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all 0.15s ease-in-out 0s;
  -ms-transition: all 0.15s ease-in-out 0s;
  -moz-transition: all 0.15s ease-in-out 0s;
  -webkit-transition: all 0.15s ease-in-out 0s;
}
.nlesc-logo:hover {
  -webkit-filter: grayscale(0%);
  -moz-filter: grayscale(0%);
  filter: grayscale(0%);
  opacity: 1;
  transition: all 0.15s ease-in-out 0s;
  -ms-transition: all 0.15s ease-in-out 0s;
  -moz-transition: all 0.15s ease-in-out 0s;
  -webkit-transition: all 0.15s ease-in-out 0s;
}

.fa-cog {
  width: 250px !important;
  height: 250px !important;
  color: aquamarine;
}
</style>