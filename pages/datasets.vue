<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <v-card v-if="numberOfDatasets == 0">
          <v-alert
            :value="true"
            color="warning"
            icon="mdi-alert-decagram"
            class="headline"
          >
            <v-layout row align-center justify-center>
              <v-flex xs6>
                <span> No dataset found! Please add a dataset.</span>
              </v-flex>

              <v-flex xs6>
                <img
                  class=""
                  height=""
                  src="~/assets/images/help/add_dataset.gif"
                >
              </v-flex>
            </v-layout>
          </v-alert>
        </v-card>

        <v-card v-else>
          <v-card-actions>
          <!-- <v-select :items="items" v-model="size" label="Size"></v-select> -->
          <!-- <v-spacer></v-spacer> -->
          </v-card-actions>
          <v-container v-bind="{ [`grid-list-${size}`]: true }" fluid>
            <v-layout row wrap>
              <v-flex
                v-for="dataset in datasets"
                :key="dataset.id"
                xs4
              >
                <v-card text tile>
                  <v-card-media
                    :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
                    height="200px"
                  />

                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">
                        {{ dataset.name }}
                      </h3>
                      <div>data url: {{ dataset.url }}</div>
                    </div>
                  </v-card-title>

                  <v-card-actions>
                    <!-- <v-btn text color="primary">Share</v-btn> -->
                    <v-btn text color="primary">
                      Explore
                    </v-btn>
                    <v-switch color="primary" label="Enable" @change="toggledataset(dataset.id)" />
                    <span>Enable</span>
                    <v-btn text color="primary" label="Remove">
                      <v-icon @click="removedataset(dataset.id)">
                        mdi-trash-can-outline
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

// import store from '~/store/index'

import allDatasets from "~/graphql/queries/allDatasets"


export default {
  components: {
  },
  data () {
    return {
      size: 'sm',
      items: [
        { text: 'Extra small (2px)', value: 'xs' },
        { text: 'Small (4px)', value: 'sm' },
        { text: 'Medium (8px)', value: 'md' },
        { text: 'Large (16px)', value: 'lg' },
        { text: 'Extra large (24px)', value: 'xl' }
      ]
    }
  },

  // apollo: {   
  //   allDatasets: {    
  //     query: allDatasets    
  //       variables() {    
  //         return {     
  //           id: "RGF0YXNldDox"  
  //         }
  //     }
  //   } 
  // },

  apollo: {
    allDatasets: {
      query: allDatasets,
      // variables () {
      //   return {
      //     id: "RGF0YXNldDox"
      //   }
      // },
      update: data => data.allDatasets.edges
    }
  },

  created () {

  },

  mounted () {
    console.log(this.allDatasets)
  },

  computed: {
    datasets () {
      return this.$store.getters['data/data']
    },
    numberOfDatasets () {
      return this.$store.getters['data/data'].length
    }

  },
  methods: {
    toggledataset (id) {
      console.log('called Datasets::toggledataset()')
      this.$store.commit('data/toggledataset', id)
    },
    removedataset (id) {
      console.log('called Datasets::removedataset()')
      this.$store.commit('data/removedataset', id)
    }
  }
}
</script>
