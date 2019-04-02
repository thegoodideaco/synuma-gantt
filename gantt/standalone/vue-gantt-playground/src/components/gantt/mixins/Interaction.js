import * as d3 from 'd3'

export const panZoom = {
  data() {
    return {
      panZoom: {

        /** @type {d3.ZoomBehavior<any, any>} */
        zoomer: null,

        /** @type {d3.ZoomTransform} */
        zoomTransform: null
      }
    }
  },
  mounted() {

    /** @type {d3.ZoomBehavior<any, any>} */
    const zoomer = d3
      .zoom()
      .scaleExtent([0.25, 4])
      .on('zoom', () => {
        /** @type {d3.ZoomTransform} */
        const z = d3.event.transform

        this.panZoom.zoomTransform = z.rescaleX(this.scale)

        /** @type {d3.ZoomTransform} */
        const {
          k,
          x,
          y
        } = this.panZoom.zoomTransform


        if(this.$listeners['pan:zoom']) this.$emit('pan:zoom', {
          k,
          x,
          y
        })
      })

    zoomer(d3.select(this.$el))
    this.panZoom.zoomer = zoomer



  }
}

export default {
  inject: ['scale']
}
