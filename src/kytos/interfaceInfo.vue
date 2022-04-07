<template>
    <k-accordion>
      <k-button :on_click="bt_state_toggle" :title="next_state"></k-button>
      <k-accordion-item title="Interface Plot" v-if="chartJsonData">
        <k-button-group>
            <!-- input type="text" class="k-input" placeholder="Zoom" disabled -->
            <k-button title="5" tooltip="5 minutes" v-on:click.native="change_plotRange(5)"></k-button>
            <k-button title="10" tooltip="10 minutes" v-on:click.native="change_plotRange(10)"></k-button>
            <k-button title="15" tooltip="15 minutes" v-on:click.native="change_plotRange(15)"></k-button>
            <k-button title="60" tooltip="60 minutes" v-on:click.native="change_plotRange(60)"></k-button>
            <k-button title="120" tooltip="120 minutes" v-on:click.native="change_plotRange(120)"></k-button>
          </k-button-group>
        <k-chart-timeseries :interface_id="metadata.interface_id" :jsonData="chartJsonData" :display_legend="true" :chartHeight="200" ></k-chart-timeseries>
      </k-accordion-item>

      <k-accordion-item title="Basic Details">
          <k-property-panel>
              <k-property-panel-item :name="key" :value="value" :key="key" v-if="content" v-for="(value, key) in this.metadata"></k-property-panel-item>
          </k-property-panel>
      </k-accordion-item>

      <k-accordion-item title="Metadata" v-if="Object.keys(this.metadata_items).length !== 0">
         <div class="metadata_table">
            <table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>  
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in this.metadata_items">
                  <td >{{key}}</td>
                  <td >{{value}}</td>
                </tr>
              </tbody>
            </table>
         </div>
      </k-accordion-item>

    </k-accordion>
</template>

<script>
import KytosBaseWithIcon from "../components/kytos/base/KytosBaseWithIcon"
import {json} from "d3-request"

export default {
  name: 'k-interface-info',
  mixins: [KytosBaseWithIcon],
  props: ["content"],
  data () {
    return {
      display: false,
      metadata_items: [],
      metadata: {"enabled": "",
                 "active": "",
                 "interface_id": "",
                 "name": "",
                 "port_number": "",
                 "dpid": "",
                 "mac": "",
                 "speed": "",
                 "lldp": "",
                 "nni": "",
                 "uni": "",},
      chartJsonData: null,
      interval: null,
      plotRange: null,
      next_state: "",
    }
  },
  computed: {
    endpoint () {
      // TODO: of_stats/kronos must implement the endpoint
      //let url = this.$kytos_server_api + "kytos/of_stats/v1/"
      //return url + this.metadata.dpid + "/ports/" + this.metadata.port_number
    }
  },
  methods: {
    update_interface_content () {
      var self = this
      let filter = this.$root.$options.filters.humanize_bytes      
      Object.keys(this.metadata).forEach(function (key) {
        let value = self.content[key]
        if (key == 'speed') {
          value = (value === null) ? 'Unavailable' : filter(value * 8)
        }
        self.metadata[key] = String(value)
      });
      this.get_next_state()
    },
    parseInterfaceData (data) {
      if (!data) {
        var msg = "Error while trying to fetch interface data."
        this.$kytos.$emit('statusMessage', msg, true)
      } else {
        this.chartJsonData = data["data"]
      }
    },
    build_url() {
        var parameters_url = "";
        if (this.plotRange !== null) {
            var unix = Math.round(+new Date()/1000);
            var start = unix - (this.plotRange * 60);
            parameters_url = parameters_url + "?start=" + start + "&end=" + unix;
        }
        var endpoint_url = this.endpoint + parameters_url;
        return endpoint_url;
    },
    update_chart() {
        // TODO: of_stats/kronos must implement the endpoint
        //json(this.build_url(), this.parseInterfaceData)
    },
    change_plotRange(range) {
        this.plotRange = range
        this.update_chart()
    },
    get_metadata() {
      if(this.content === undefined) return
      this.metadata_items = this.content.metadata
    },
    get_next_state() {
      this.next_state = this.metadata.enabled == 'true'? 'Disable' : 'Enable'
    },
    bt_state_toggle(){
      var _this = this
      let request = $.ajax({
                       type:"POST",
                       url: this.$kytos_server_api + "kytos/topology/v3/interfaces/" + this.metadata.interface_id
                             + "/" + this.next_state.toLowerCase(),
                       async: true,});
      request.done(function() {
        let notification = {
          title: 'Interface ' + _this.next_state + 'd: Succeed',
          description: 'The interface ' + _this.metadata.interface_id + ' was ' + _this.next_state.toLowerCase() + 'd.',
          icon: 'gear',
        }
        let new_state = _this.next_state == 'Enable'? 'Disable' : 'Enable'
        _this.next_state = new_state
        _this.content['enabled'] = new_state
        _this.metadata['enabled'] = new_state
        _this.$kytos.$emit("setNotification", notification)
      });
      request.fail(function() {
        let notification = {
          title: 'Interface ' + _this.next_state + 'd: Failed',
          description: data.status + ': ' + data.responseJSON.description + '. The interface ' + _this.metadata.interface_id + ' was not ' + _this.next_state.toLowerCase() + 'd.',
          icon: 'gear',
        }
        _this.$kytos.$emit("setNotification", notification)
      });
    },
  },
  mounted () {
    this.update_interface_content()
    this.update_chart()
    this.interval = setInterval(this.update_chart, 60000)
    this.get_metadata()
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  watch: {
    content () {
      if (this.content) {
        this.update_interface_content()
        this.update_chart()
        this.get_metadata()
      }
    }
  }
}
</script>
<style lang="sass">
@import '../assets/styles/variables'

.metadata_table 
  color: #ccc
  max-height: 250px
  text-align: center
  margin: 0 auto
  display: block
  padding: 0.5em 0 1em 0.3em
  font-size: 0.8em
  overflow-x: hidden
  overflow-y: auto

.metadata_table table
  display: table
  width: 100%

.metadata_table thead
  font-weight: bold
  background: #554077

.metadata_table th
  padding: 0.6em 0 0.6em 0

.metadata_table td
  vertical-align: middle
  padding: 0.45em 0 0.45em 0
  word-break: break-all

.metadata_table tbody tr:nth-child(even)
  background: #313131

.metadata_table tbody tr:hover
    color: #eee
    background-color: #666
</style>
