import KytosBase from './KytosBase';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';


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
    },
  },
  components: {
      'icon': Icon
  },
  data() {
    return {
      old_icons: ['pencil', 'photo', 'photo-o', 'gear', 'gear-o'],
      new_icons: ['pencil-alt', 'image', 'image-o', 'cog', 'cog'],
    }
  },
  computed: {
    iconName() {
      /**
       * Translate old icons name for the vue-awesome lib.
       * The icons with the '-o' (outlined) suffix are located now
       * in the /regular folder.
       */
      let temp = this.icon;

      let index = this.old_icons.indexOf(temp);
      if(index >= 0)
        temp = this.new_icons[index]

      if(temp.endsWith("-o")) {
        temp = temp.replace(/-o$/, '')
        temp = "regular/" + temp; 
      }
      return temp
    }
  }
}
