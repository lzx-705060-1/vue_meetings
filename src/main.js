import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import { Button } from 'vant';
import { Toast } from 'vant';
import { Tab, Tabs } from 'vant';
import {List} from 'vant';
import {Field}from 'vant';
import {DatetimePicker} from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Cell, CellGroup } from 'vant';
import {Popup} from 'vant';
import { Overlay } from 'vant';
import {Divider} from 'vant';
// import {JSON2} from './assets/style/js/json2.js';

import 'vant/lib/index.css'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(Button)
Vue.use(Toast)
Vue.use(List)
Vue.use(Tab).use(Tabs)
Vue.use(Collapse).use(CollapseItem)
Vue.use(DatetimePicker)
Vue.use(Field)
Vue.use(Popup)
Vue.use(Cell).use(CellGroup)
Vue.use(Overlay)
Vue.use(Divider)

// Vue.use(JSON2)



new Vue({
  render: h => h(App),
}).$mount('#app')
