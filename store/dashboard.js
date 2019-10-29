export const state = () => ({
  widgets: [],
  chartFilters: [],
  listOfCharts: {}  
})


export const mutations = {
  addWidget (state, payload) {
    console.log('Called state::addChart()')
    console.log('Payload:', payload)
    console.log(state)
    state.widgets.push(payload)
  },  
  addChartFilter (state, payload) {
    console.log('Called state::addChartFilter()')
    console.log('Payload:', payload)
    console.log(state)
    state.chartFilters.push(payload)
  },
  applyChartFilter (state, payload) {
    console.log('Called state::applyChartFilter()')
    console.log('Payload:', payload)
    console.log(state)

    console.log(JSON.stringify(state))

    console.log('Before filter: \n', state.widgets[1].chartSpec)
    // const index = state.data.findIndex(d => d.id === payload.widgetId);;
    state.widgets[1].chartSpec.encoding.x = {
      ...state.widgets[1].chartSpec.encoding.x,
      ...payload.newSelector
    }
    console.log('After filter: \n', state.widgets[1].chartSpec)
    // console.log(state.widgets[index].chartSpec.encoding.x)
    // state.chartFilters.push(payload)
    console.log(state)
  },
  setChartSize (state, payload) {
    console.log('Called state::setChartSize()')
    console.log('Payload:', payload)
    console.log(state)
    state.widgets[payload.i].chartWidth = payload.chartWidth
    state.widgets[payload.i].chartHeight = payload.chartHeight 
  },
}

export const getters = {
  widgets (state) {
    return state.widgets
  },
  chartFilters (state) {
    return state.chartFilters
  },
  numberOfWidgets (state) {
    if (state.widgets) {
      return state.widgets.length
    } else {
      return 0
    }
  },
  numberOfDatasets (state) {
    if (state.data) {
      return state.data.length
    } else {
      return 0
    }
  },
  numberOfVegaFilters (state) {
    if (state.chartFilters) {
      return state.chartFilters.length
    } else {
      return 0
    }
  }
}


// export default state
