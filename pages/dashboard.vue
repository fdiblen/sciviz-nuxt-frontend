<template>
  <div>
    <v-layout row align-center justify-center>
      <v-flex xs12>
        <v-card v-if="numberOfTotalWidgets == 0">
          <v-alert
            :value="true"
            color="warning"
            icon="mdi-alert-decagram"
            class="headline"
          >
            <v-layout row align-center justify-center>
              <v-flex xs6>
                <span> No widget found! Please add a new widget.</span>
              </v-flex>

              <v-flex xs6>
                <img
                  class=""
                  height=""
                  src="~/assets/images/help/add_chart.gif"
                >
              </v-flex>
            </v-layout>
          </v-alert>
        </v-card>

        <div ref="gridLayout">
          <client-only>
            <grid-layout
              :layout="widgetLayout"
              :col-num="numberOfTotalColumns"
              :col-width="colWidth"
              :row-height="rowHeight"
              :margin="[widgetMarginX, widgetMarginY]"
              :is-draggable="true"
              :is-resizable="true"
              :is-mirrored="false"
              :vertical-compact="true"
              :use-css-transforms="false"
              class=""
              :responsive="true"
              :preventCollision="true"
              @layout-updated="layoutUpdatedEvent"
            >
              <grid-item
                v-for="item in widgetLayout"
                :key="item.i"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i"
                :auto-size="true"
                drag-allow-from=".vue-draggable-handle"
                @resize="resizeEvent"
                @resized="resizedEvent"
                @move="moveEvent"
                @moved="movedEvent"
              >
                <div style="border: 1px solid green">
                  <sciviz-chart
                    v-if="item.type == 'chart'"
                    :id="item.widgetId"
                    :type="item.type"
                    :icon="item.icon"                   
                    :title="item.i"
                    :width="item.chartWidth"
                    :height="item.chartHeight"
                    :chartSpec="item.chartSpec"
                    @onClickDelete="onChartDeleteButton"
                    @onClickEdit="onChartEditButton"
                    @onClickSave="onChartSaveButton"
                    @onClickAddFilter="onChartAddFilterButton"
                  />

                  <data-table
                    v-if="item.type == 'table'"
                    :id="item.widgetId"
                    :type="item.type"
                    :icon="item.icon"                     
                    :title="item.i"
                    :width="item.chartWidth"
                    :height="item.chartHeight"
                    @onClickDelete="onChartDeleteButton"
                  />

                </div>
              </grid-item>
            </grid-layout>
          </client-only>
        </div>

        <!-- speed dial menu -->


    <v-speed-dial
      v-model="speedDialMenu"
      direction="top"
      :open-on-hover="false"
      transition="slide-y-reverse-transition"
      fixed
      bottom
      right
    >
      <template v-slot:activator>
        <v-btn
          v-model="speedDialMenu"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="speedDialMenu">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-btn
        fab
        dark
        small
        color="green"
        @click="addDataset('csv')"
      >
        <v-icon>mdi-database-plus</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        small
        color="green"
        @click="addWidget('table')"
      >
        <v-icon>mdi-table-large-plus</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        small
        color="green"
        @click.once="showChartOptions = !showChartOptions"
      >
        <v-icon>mdi-chart-line</v-icon>
      </v-btn>

    </v-speed-dial>

    <chart-options v-if="showChartOptions" :dialog="showChartOptions" @addChart="onAddChart"></chart-options>


      </v-flex>
    </v-layout><!-- gridLayout -->
  </div>
</template>

<script>
import ChartWidget from '~/components/charts/ChartWidget'
import DataTableWidget from '~/components/tables/DataTableWidget'
import ChartOptions from '~/components/charts/ChartOptions'


export default {
  name: 'WidgetFactory',
  components: {
    'sciviz-chart': ChartWidget,
    'data-table': DataTableWidget,
    'chart-options': ChartOptions       
  },
  props: ['type'],
  data () {
    return {
      rowHeight: 150,
      colWidth: 150,
      numberOfTotalColumns: 12, // number of columns in the grid
      widgetNumberOfColums: 4, // width of the widget in number of columns
      rowHeight: 40, // height of the widget
      widgetNumberOfRows: 10, // widget height = rowHeight x widgetNumberOfRows
      widgetMarginX: 0, // margin between the widgets in pixels
      widgetMarginY: 0,
      speedDialMenu: null,
      showChartOptions: false,      
    }
  },
  computed: {

    widgetLayout () {
      return this.$store.getters['dashboard/widgets']
    },
    numberOfTotalWidgets () {
      return this.$store.getters['dashboard/numberOfWidgets']
    },
    numberOfTotalDatasets () {
      return this.$store.getters['data/numberOfDatasets']
    }
  },
  beforeCreate () {
    console.log('called WidgetFactory::beforeCreate()')
    // console.log(this.widgetLayout)
  },
  created () {
    console.log('called WidgetFactory::created()')
    // console.log(this.widgetLayout)
    // this.widgetLayout[0].chartWidth = this.widgetLayout[0].w*this.widgetNumberOfColums
    // this.widgetLayout[0].chartWidth *= 2
  },
  mounted () {
    // touch support
    // https://github.com/jbaysolutions/vue-grid-layout/issues/110
  },
  methods: {
    layoutUpdatedEvent (newLayout) {
      console.log('Updated chart layout: ', newLayout)
    },
    moveEvent (i, newX, newY) {
      console.log('MOVING WIDGET i=' + i + ', X=' + newX + ', Y=' + newY)
    },
    movedEvent (i, newX, newY) {
      console.log('WIDGET MOVED i=' + i + ', X=' + newX + ', Y=' + newY)
    },
    resizeEvent (i, newH, newW, newHPx, newWPx) {
      console.log('RESIZING WIDGET  i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx)
      this.widgetLayout[i].chartWidth = newWPx
      this.widgetLayout[i].chartHeight = newHPx
    },    
    resizedEvent (i, newH, newW, newHPx, newWPx) {
      console.log('WIDGET RESIZED i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx)
      console.log('widgetLayout: \n', this.widgetLayout[i])
      this.widgetLayout[i].chartWidth = newWPx
      this.widgetLayout[i].chartHeight = newHPx

      this.$store.commit('dashboard/setChartSize', {i, newHPx, newHPx})

    },
    onAddChart (chartInfo) {
      console.log('called dashboard::onAddChart()')
      // console.log('chartType:', chartType)
      // console.log('Adding a new chart')
      // this.addWidget({
      //   type:'chart', 
      //   chartSpec:{
      //     chartType: chartType
      //   }
      // })

      console.log('chartType:', chartInfo)
      console.log('Adding a new chart')
      this.addWidget({
        type: chartInfo.type, 
        chartSpec:{
          data: chartInfo.data,
          layout: chartInfo.layout          
        }
      })


    },
    addWidget (widget) {
      console.log('called WidgetFactory::addWidget()')
      console.log('widgetType:', widget.type)
      console.log('Adding a new widget')

      const widgetId = this.generateUuid()
      console.log('Widget id:', widgetId)

      const widgetIcon = 'mdi-chart-line'
      if ( widget.type === 'table' ) widgetIcon = 'mdi-table-large'

      const gridWidth = this.$refs.gridLayout.clientWidth
      console.log('grid width:', gridWidth)

      const numberOfWidgetX = this.numberOfTotalColumns / this.widgetNumberOfColums
      const widgetWidth = (gridWidth - (numberOfWidgetX - 1) * this.widgetMarginX) / numberOfWidgetX

      console.log('numberOfWidgetX:', numberOfWidgetX)
      console.log('widget width:', widgetWidth)

      // Displayed as [x, y, w, h]:
      let widgetTouch = {
        'type': widget.type,
        'icon': widgetIcon,
        'x': 0,
        'y': 0,
        'w': this.widgetNumberOfColums,
        'h': this.widgetNumberOfRows,
        'i': this.widgetLayout.length,
        'chartWidth': widgetWidth,
        'chartHeight': 400,
        widgetId,
        'sm-x': 1,
        'sm-y': 1,
        'sm-w': 12,
        'sm-h': 4,
        'sm-draggable': false,
        'sm-resizable': false
      }

      if (widget.type === 'chart') {
        widgetTouch = { ...widgetTouch,
          'chartSpec': widget.chartSpec
        }
      }

      this.$store.commit('dashboard/addWidget', widgetTouch)
      // this.widgetLayout.push(widgetTouch)
      // console.log(this.widgetLayout)
    },
    addDataset (addDataset) {
      console.log('called WidgetFactory::addDataset()')
      console.log('dataType:', addDataset)
      console.log('Adding a new dataset.')

      console.log('called App:loadData()')
      const datasetId = this.$store.getters['data/data.length'] + 1
      const testData = {
        id: datasetId,
        name: 'test data' + datasetId,
        description: 'www.google.com',
        enabled: false
      }
      console.log('Called App::loadData()')
      this.$store.commit('data/addDataset', testData)

      console.log('store:data', this.$store.getters['data/data'][0])
    },
    onChartDeleteButton (signalValue, widgetId) {
      console.log('called onChartDeleteButton()')

      const index = this.widgetLayout.findIndex(widget => widget.widgetId === widgetId)
      this.widgetLayout.splice(index, 1)
    },
    onChartEditButton (signalValue, widgetId) {
      console.log('called onChartEditButton()')
    },
    onChartSaveButton (signalValue, widgetId) {
      console.log('called onChartSaveButton()')
    },
    onChartAddFilterButton (signalValue, widgetId) {
      console.log('called onChartAddFilterButton()')

      const index = this.widgetLayout.findIndex(widget => widget.widgetId === widgetId)
      // this.widgetLayout[index].chartSpec.mark = "circle"

      const newFilter = { 'brushX': { 'type': 'interval', 'encodings': ['x'] } }
      // var newFilter = {
      //   "brush": {
      //     "type": "interval",
      //     "on": "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
      //     "translate": "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
      //     "zoom": "wheel![event.shiftKey]"
      //   }
      // }

      //                 "resolve": "union",
      this.$store.commit('dashboard/addChartFilter', newFilter)

      // this.widgetLayout[index].chartSpec = {...this.widgetLayout[index].chartSpec,
      //     "selection": {
      //       ...newFilter
      //     }
      // }

      this.widgetLayout[index].chartSpec = { ...this.widgetLayout[index].chartSpec,
        'selection': {
          ...this.$store.getters['dashboard/chartFilters'][0]
        }
      }

      if (this.$store.getters['dashboard/numberOfWidgets'] > 1) {
        console.log('Found', this.$store.getters['dashboard/numberOfVegaFilters'], 'filters.')
        console.log('Applying the filter:')
        console.log(this.$store.getters['dashboard/chartFilters'][0])

        // this.widgetLayout[index].chartSpec = {...this.widgetLayout[index].chartSpec,
        //     "color": {
        //       "condition": {"selection": this.$store.getters['dashboard/chartFilters[0]'], "field": "Origin", "type": "nominal"},
        //       "value": "grey"
        //     }
        // }

        // var newSelector = {
        //     "scale": {
        //       "domain":
        //         {
        //           "selection": this.$store.getters['dashboard/widgets[0]'].chartSpec.selection[0]
        //         }
        //     }
        // }

        const newSelector = {
          'scale': {
            'domain':
                      {
                        'selection': this.$store.getters['dashboard/chartFilters'][0]
                      }
          }
        }

        // this.widgetLayout[index].chartSpec.encoding.x = {...this.widgetLayout[index].chartSpec.encoding.x,
        //     ...newSelector
        // }

        this.$store.commit('applyChartFilter', { widgetId, newSelector })
      }
    },
    generateUuid () {
      console.log('called generateUuid()')
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }
  }
}
</script>

<style>
.vue-grid-item {
  @media screen and (max-width: $mobile-break) {
    width: 100%;
    height: auto;
    position: relative;
    margin-top: $padding;
    transform: inherit;
  }
}

.vue-grid-item.vue-grid-placeholder {
  background: white;
}

.vue-grid-item.vue-grid-placeholder {
  background-color: white;
}
</style>
