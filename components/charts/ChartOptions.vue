<template>
  <div class="text-center">
    <v-bottom-sheet v-model="showDialog" inset width="80%">
      <!-- <template v-slot:activator="{ on }">
        <v-btn
          color="orange"
          dark
          v-on="on"
        >
          Open Inset
        </v-btn>
      </template> -->

      <v-sheet class="text-center" height="600">

        <div class="my-3">Select a chart type</div>

        <!-- <v-row>
            <v-col
            cols="12"
            sm="6"
            >
            <v-hover
                v-slot:default="{ hover }"
                open-delay="200"
            >
                <v-card
                :elevation="hover ? 16 : 2"
                class="mx-auto"
                height="350"
                max-width="350"
                @click="onAddChart('lineChart')"                
                >
                <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
                    Line Chart                  
                </v-card-text>
                <v-icon color="green" size='200'>
                    mdi-chart-line
                </v-icon>                  
                </v-card>
            </v-hover>
            </v-col>

            <v-col
            cols="12"
            sm="6"
            >
            <v-hover
                v-slot:default="{ hover }"
                open-delay="200"
            >
                <v-card
                :elevation="hover ? 16 : 2"
                class="mx-auto"
                height="350"
                max-width="350"
                @click="onAddChart('histogram')"
                >
                <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
                    Bar Chart
                </v-card-text>
                <v-icon color="green" size='200'>
                    mdi-chart-bar
                </v-icon>                   
                </v-card>
            </v-hover>
            </v-col>

        </v-row>             -->

        <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
            <v-card>
                <v-container fluid>
                <v-row>
                    <v-col
                    v-for="(item, idx) in chartOptions"
                    :key="idx"
                    class="d-flex child-flex"
                    cols="4"
                    >

                    <v-hover
                        v-slot:default="{ hover }"
                        open-delay="200"
                    >
                        <v-card flat tile class="d-flex"
                        :elevation="hover ? 16 : 2"
                        @click="onAddChart(item)"
                        >

                            <!-- <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
                                {{item.name}}
                            </v-card-text> -->

                            <!-- <v-card-text class="font-weight-medium mt-12">
                                {{item.name}}
                            </v-card-text> -->

                            <v-icon color="green" size='200'>
                                {{item.icon}}
                                <template v-slot:placeholder>
                                    <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                                    >
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-icon>

                        </v-card>
                    </v-hover>


                    </v-col>
                </v-row>
                </v-container>
            </v-card>
            </v-col>
        </v-row>


        <v-btn
          class="mt-6"
          text
          color="error"
          @click="onDialogClose"
        >close</v-btn>

      </v-sheet>

    </v-bottom-sheet>
  </div>
</template>


<script>
export default {
  props: ['dialog'],
  data () {
    return {
      showDialog: this.dialog,
    //   availableCharts: [simple, contour, histogram, pie, histogram2D],
      availableCharts: ['simple', 'contour', 'histogram', 'pie', 'histogram2D'],
      chartOptions: [
        { icon: 'mdi-chart-line', type: 'line', name: 'Line Chart' },        
        { icon: 'mdi-chart-bar', type: 'bar', name: 'Bar Chart' },
        { icon: 'mdi-chart-scatter-plot', type: 'scatter', name: 'Scatter Plot' }
      ],        
      notifications: false,
      sound: true,
      widgets: false
    }
  },
  computed: {
  },
  methods: {
    onDialogClose () {
      console.log('called ChartOptions::onDialogClose()')
      this.showDialog = false
      this.$emit('onDialogClose', 'someValue', this.showDialog)
    },
    onDialogSave () {
      console.log('called ChartOptions::onDialogSave()')
      this.showDialog = false
      this.$emit('onDialogSave', 'someValue', this.showDialog)
    },
    onAddChart (item) {
      console.log('called ChartOptions::addChart()')
      console.log('chartType:', item.type)
      console.log('Adding a new chart')
    //   this.$emit('addChart', chartType)
    //   this.showDialog = false
      this.$emit('addChart',
      {
          type: 'chart',
          data:[{
            x: [1,2,3,4],
            y: [10,15,13,17],
            type: item.type
          }],
          layout:{
            title: item.name
          }
      })
      this.showDialog = false    
    }
  }
}
</script>