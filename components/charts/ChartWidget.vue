<template>
  <div>
    <v-card :height="height" :width="width" @resize="resizeCardEvent">
      <v-toolbar color="secondary" height="50px" dark class="vue-draggable-handle">
        <v-icon>{{ icon }}</v-icon>

        <v-toolbar-title> Chart {{ title }} </v-toolbar-title>

        <v-spacer />

        <!-- menu button -->
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
          <template v-slot:activator="{ on }">          
            <v-btn v-on="on" color="primary" dark icon>
              <v-badge v-if="numSelectedVariables == 0" color="red">
                <span slot="badge">!</span>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-badge>
              <v-icon v-else>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </template>

          <!-- menu when the more button is clicked -->
          <v-card width="250">
            <v-list v-if="numSelectedVariables == 0">
              <v-list-item>
                <v-list-item-action>
                  <v-icon color="red">
                    mdi-alert-circle-outline
                  </v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title small>
                    No variables selected!
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider />

            <v-list-item>
              <v-list-item-content>
                <!-- variable selection -->
                <!-- <v-combobox
                  v-model="selectedVariables"
                  height="50px"
                  :items="variableOptions"
                  label="X-axis"
                  clearable
                  prepend-icon="mdi-filter"
                  solo
                  :multiple="false"
                  @change="variableSelected"
                >
                  <template slot="selection" slot-scope="data">
                    <v-chip
                      :input-value="data.selected"
                      close
                      @input="removeVariableChip(data.item)"
                    />
                  </template>
                </v-combobox> -->

        <v-combobox
          v-model="selectedVariables"
          :items="variableOptions"
          label="Y-axis"
          clearable
          prepend-icon="mdi-filter"
          solo
          multiple
          chips
          @change="variableSelected"
        >
          <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item)"
            >
              <v-avatar
                class="accent white--text"
                left
                v-text="data.item.slice(0, 1).toUpperCase()"
              ></v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>







              </v-list-item-content>
            </v-list-item>

            <v-divider />

            <v-list>
              <v-list-item>
                <v-list-item-title>Edit</v-list-item-title>
                <v-list-item-action>
                  <v-btn icon @click.stop="showChartEditDialog = true">
                    <v-icon>mdi-pencil-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider />

              <v-list-item>
                <v-list-item-title>Delete</v-list-item-title>
                <v-list-item-action>
                  <v-btn icon @click="onClickDelete">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider />

              <v-list-item>
                <v-list-item-title>Save</v-list-item-title>
                <v-list-item-action>
                  <v-btn icon @click="onClickSave">
                    <v-icon>mdi-content-save</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider />

              <v-list-item>
                <v-list-item-title>Add filter</v-list-item-title>
                <v-list-item-action>
                  <v-btn icon @click="onClickAddFilter">
                    <v-icon>mdi-filter-plus</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider />

              <v-list-item>
                <v-list-item-action>
                  <v-switch v-model="resize" color="primary" />
                </v-list-item-action>
                <v-list-item-title>Enable Resizing</v-list-item-title>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer />

              <v-btn text @click="menu = false">
                Cancel
              </v-btn>
              <v-btn color="primary" text @click="menu = false">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
   
      </v-toolbar>

      <chart-base-plotly
        :id="id"
        :width="canvasWidth"
        :height="canvasHeight"
        :chartSpec="chartSpec"
      />

      <chart-edit :visible="showChartEditDialog" @close="showChartEditDialog = false" />

      Chart id: {{id}}

    </v-card>
  </div>
</template>

<script>
import ChartEdit from '~/components/charts/ChartEdit'
// import ChartBasePlotly from '~/components/charts/plotly/ChartBasePlotly'

export default {
  name: 'Chart',
  components: {
    ChartEdit,
    // ChartBasePlotly
   'chart-base-plotly': () => import('@/components/charts/plotly/ChartBasePlotly.vue')
  },
  props: ['type', 'id', 'icon', 'title', 'width', 'height', 'chartSpec'],
  data () {
    return {
      menu: false,
      resize: true,
      selectedVariables: [],
      variableOptions: ['dataX', 'dataY', 'dataZ'],
      showChartEditDialog: false,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ]
    }
  },
  computed: {
    numSelectedVariables () {
      return this.selectedVariables.length
    },
    canvasWidth () {
      return this.width * 0.8
    },
    canvasHeight () {
      return this.height * 0.8
    }

  },
  created () {
    console.log('called chartWidget::created()')
  },
  beforeMount () {
    console.log('called chartWidget::beforeMount()')
  },
  mounted () {
    console.log('called chartWidget::mounted()')
    console.log(this.selectedVariables.length)
    console.log(this)    
    console.log(this.$el)
    console.log(this.$refs)
    // console.log(this.$children[0].$children[2].$el.children[0])

    // // const container = this.$el.querySelector("")
    // const container = this.$el.getElementsByClassName('js-plotly-plot')[0]
    // console.log(container)

    // // this.$el.on('plotly_selected', function(eventData) {
    // container.on('plotly_selected', function(eventData) {      
    //   // var x = [];
    //   // var y = [];

    //   // var colors = [];
    //   // for(var i = 0; i < N; i++) colors.push(color1Light);

    //   // console.log(eventData.points)

    //   // eventData.points.forEach(function(pt) {
    //   //   x.push(pt.x);
    //   //   y.push(pt.y);
    //   //   colors[pt.pointNumber] = color1;
    //   // });

    //   // Plotly.restyle(graphDiv, {
    //   //   x: [x, y],
    //   //   xbins: {}
    //   // }, [1, 2]);

    //   // Plotly.restyle(graphDiv, 'marker.color', [colors], [0]);

    //   console.log(eventData)
    // })



  },
  methods: {
    onClick () {
      console.log('called onClick()')
    },
    onChartMenu () {
      console.log('called onChartMenu()')
    },
    resizeCardEvent () {
      console.log('called resizeCardEvent()')
    },
    onClickDelete (event) {
      console.log('called onClickDelete()')
      console.log('chart id', this.id)
      this.$emit('onClickDelete', 'someValue', this.id)
    },
    onClickEdit () {
      console.log('called onClickEdit()')
      console.log('chart id', this.id)
      this.$emit('onClickEdit', 'someValue', this.id)
    },
    onClickSave () {
      console.log('called onClickSave()')
      console.log('chart id', this.id)
      this.$emit('onClickSave', 'someValue', this.id)
    },
    onClickAddFilter () {
      console.log('called onClickAddFilter()')
      console.log('chart id', this.id)
      this.$emit('onClickAddFilter', 'someValue', this.id)
    },
    onClickSpeedDialDelete () {
      console.log('called onClickSpeedDialDelete()')
      this.$emit('onClickDelete', 'someValue', this.id)
    },
    onClickSpeedDialEdit () {
      console.log('called onClickSpeedDialEdit()')
      this.$emit('onClickEdit', 'someValue', this.id)
    },
    removeVariableChip (item) {
      console.log('called removeVariableChip()')
      this.selectedVariables.splice(this.selectedVariables.indexOf(item), 1)
      this.selectedVariables = [...this.selectedVariables]
    },
    variableSelected (item) {
      console.log('called variableSelected()')
      console.log(item)
      // this.selectedVariables.push(item)
    }
  }
}
</script>

<style scoped>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}

.vue-resizable-handle {
}
</style>
