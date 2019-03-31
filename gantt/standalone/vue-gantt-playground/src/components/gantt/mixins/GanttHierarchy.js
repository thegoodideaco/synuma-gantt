
export const flatten = {
  computed: {
    descendants() {
      if(this.hierarchy) {
        const all = []

        this.hierarchy.eachBefore(v => {
          all.push(v)
        })

        return all.splice(1)
      }
    }
  }
}

export default {
  props: {
    hierarchy: Object
  }
}