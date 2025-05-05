<template>
 <div class='k-toolbar-item' :icon="icon" :tooltip="tooltip">
    <!-- @slot Slot with the toolbar item. -->
    <slot>
    </slot>
 </div>
</template>

<script>
import KytosBase from '../base/KytosBase'
import KytosBaseWithIcon from '../base/KytosBaseWithIcon'
import { mapActions } from 'pinia'
import { useToolbarStore } from '../../../stores/toolbarStore'

/**
 * Component representing a toolbar item that create a new item in the
 * ``k-menu-bar`` and shows the content in the ``k-toolbar``.
 *
 */
export default {
  name: 'k-toolbar-item',
  mixins: [KytosBaseWithIcon],
  props: ["icon", "tooltip", "name"],
  methods: {
    ...mapActions(useToolbarStore, ['addIconTooltip'])
  },
  created() {
    this.addIconTooltip(this.icon, this.tooltip);
  }
}
</script>
