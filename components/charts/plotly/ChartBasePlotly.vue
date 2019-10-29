<template>
  <div>

    <client-only>

        <Plotly
          v-bind="chartSpec.attr"
          :data="chartSpec.data"
          :layout="chartSpec.layout"
          :display-mode-bar="true"
          :displaylogo="false"
          :modeBarButtonsToRemove="buttonsRemove"
          :responsive="true"
          class="chart-canvas"
          @click="onChartClick"
          @selecting="onChartSelecting"
          @selected="onChartSelected" 
        />  

        <!-- <div class="chart-canvas" >

        </div> -->

        <!-- chartSpec: {{chartSpec}} -->

    </client-only>

  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
// import Plotly from 'plotly.js/dist/plotly'

export default {
  name: 'ChartBasePlotly',
  components: {
    Plotly
  },
  props: ['width', 'height', 'chartSpec'],
  data () {
    return {
      padding: {
        'top': 0,
        'left': 0,
        'bottom': 0,
        'right': 0
      },
      buttonsRemove: ['sendDataToCloud', 'editInChartStudio', 'zoom2d', 'lasso2d', 'toggleSpikelines'] // https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
      // chartConfig: {
      //   toImageButtonOptions: {
      //     format: 'svg', // one of png, svg, jpeg, webp
      //     filename: 'custom_image',
      //     height: 500,
      //     width: 700,
      //     scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
      //   }
      // }
    }
  },
  created () {
    console.log('called ChartBasePlotly::created()')
    // console.log('plotly signals:');
    // console.log(this.plotlySpec.signals);
    // https://groups.google.com/forum/#!topic/plotly-js/15oEfTfq5aI

    // console.log('Plotly modules: \n')
    // console.log(Plotly)


    // https://bl.ocks.org/timelyportfolio
    // https://bl.ocks.org/timelyportfolio/7ea26d32a7534e4064df16cbf7abaa58

    // var view = new plotly.View(plotly.parse(this.spec))
    //   .renderer('canvas')  // set renderer (canvas or svg)
    //   // .initialize('#example-row-plotly') // initialize view within parent DOM container
    //   // .hover()             // enable hover encode set processing
    //   // .run();              // run the dataflow and render the view

    // console.log('view: \n',view)
  },
  beforeMount () {
    console.log('called ChartBasePlotly::beforeMount()')
  },
  mounted () {
    console.log('called ChartBasePlotly::mounted()')
    // exists only on client:
    // console.log(Plotly)   

    // Plotly.newPlot(this.$el, this.chartSpec.data);

    // // this.$el.on('plotly_click', function(eventData){
    // //     console.log('Chart event: click')
    // //     console.log(eventData)
    // // })

    // this.$el.on('plotly_selecting', function(){
    //     console.log('Chart event: selecting')
    // })

    // this.$el.on('plotly_selected', function(eventData) {
    //   console.log('Chart event: selected')
    //   console.log(eventData)
    //   console.log(eventData.range.x[0], eventData.range.x[1])
    //   console.log(eventData.range.y[0], eventData.range.y[1])
    // })

    // this.$el.on('plotly_afterplot', function(){
    //     console.log('Chart event: done plotting')
    // })


    // // plotly_restyle 
    // // plotly_relayout


  },
  methods: {
    onChartClick (eventData) {
      console.log('called onChartClick()')
      console.log(eventData)
    },   
    onChartSelecting (eventData) {
      // console.log('called onChartSelecting()')
      // console.log(eventData)
    },   
    onChartSelected (eventData) {
      console.log('called onChartSelected()')
      console.log(eventData)
      // console.log(eventData.range.x[0], eventData.range.x[1])
      // console.log(eventData.range.y[0], eventData.range.y[1])
    }
  },
  computed: {
    // chartSpec() {
    //   const {
    //     selected: {
    //       data: { attr }
    //     }
    //   } = this;
    //   const fromAttr = Object.keys(attr)
    //     .map(key => `:${key}="${attr[key]}"`)
    //     .join(" ");
    //   return `<plotly :data="data" :layout="layout" ${fromAttr}/>`;
    // }
  }  
}
</script>
