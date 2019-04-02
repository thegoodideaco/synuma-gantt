import * as d3 from 'd3'

export const flatten = {
  computed: {
    descendants() {
      if (this.hierarchy) {
        const all = []

        this.hierarchy.eachBefore(v => {
          all.push(v)
        })

        return all.splice(1)
      }
    }
  }
}

export const dataLoad = {
  data() {
    return {
      result: null
    }
  },

  methods: {
    async loadData() {
      // Fetch Json Data
      /** @type {{data: DescendantItem}} */
      const { data } = await d3.json('/data.json')
      this.result = Object.freeze(data)

      const h = d3.hierarchy(this.result, v => {
        /** @type {DescendantItem} */
        const item = v
        return item.phases || item.milestones || item.tasks
      })

      h.each(v => {
        Object.assign(v, {
          opened: true
        })
      })

      // Construct a hierarchy wrapper for functionality
      this.hierarchy = h
    }
  }
}

export const dateLogic = {
  computed: {
    timeInfo() {
      if(!this.descendants) return

      /** @type {d3.HierarchyNode<GanttDataObject>[]} */
      const d = this.descendants

      const dates = d.reduce((prev, cur) => {
        const entries = Object.entries(cur.data).filter(v => v[0].match(/date/gi) && v[1] && typeof v[1] === 'string')

        /** @type {number[]} */
        const dates = entries.map((v) => Date.parse(v[1]))

        prev.push(...dates)

        return prev

      }, [])

      /**
       * Add open date
       * @type {d3.HierarchyNode<GanttDataObject>}
       */
      const {
        data: {
          openInfo: {
            openDate
          }
        }
      } = this.hierarchy

      if(openDate) dates.push(Date.parse(openDate))

      const total = d3.extent(dates)

      return {
        total,
        dates
      }
    }
  },
  provide() {
    return {
      scale: this.scale
    }
  }
}

export default {
  props: {
    hierarchy: Object
  }
}
