import KytosBase from './KytosBase';

/*
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
<font-awesome-icon icon="fa-solid fa-user-secret" />

Example valid sintax:
  <k-button icon="rectangle-xmark"></k-button>
  <k-button icon="fa-rectangle-xmark"></k-button>
  <k-button icon="fa-solid fa-rectangle-xmark"></k-button>
*/
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/**
 * A base components with icon in property.
 * @mixin
 */

export default {
  name: 'KytosWithIcon',
  mixins: [KytosBase],
  props: {
    /**
     * An Icon string representing a awesome icon.
     */
    icon: {
      type: String,
    }
  },
  components: {
      'icon': FontAwesomeIcon,
  },
  data() {
    return {
      old_icons: ['none', 'pencil', 'photo', 'photo-o', 'gear', 'gear-o'],
      new_icons: ['', 'pencil-alt', 'image', 'image-o', 'cog', 'cog'],
    }
  },
  computed: {
    iconName() {
      /**
       * Translate old icons name for the vue-awesome lib.
       * The icons with the '-o' (outlined) suffix are located now
       * in the /regular folder.
       * Replaced for FontAwesomeIcon lib.
       */
      let temp = this.icon || '';

      let index = this.old_icons.indexOf(temp);
      if(index >= 0) {
        temp = this.new_icons[index]

        if(temp && temp.endsWith("-o")) {
          temp = temp.replace(/-o$/, '')
          temp = "regular/" + temp; 
        }
      }
      return temp
    }
  }
}
