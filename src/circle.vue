<template>
  <div class="circle" :style="{ width: radius * 2 + 'px', height: radius * 2+ 'px' }">
    <div class="text" v-show="showText"><span>{{ current }} / {{ maximum }}</span></div>
  </div>
</template>

<script>
  import * as d3 from 'd3';

  const tau = 2 * Math.PI;

  export default {
    props: {
      radius: {
        type: Number,
        default: 40,
      },
      lineWidth: { // line width
        type: Number,
        default: 5,
      },
      showText: { // display text or not
        type: Boolean,
        default: true,
      },
      backgroundColor: {
        type: String,
        default: '#eaf0f8'
      },
      foregroundColor: {
        type: String,
        default: '#ec2c7a'
      },
      current: { // current value
        type: Number,
        default: 0,
      },
      maximum: { // maximum value
        type: Number,
        default: 0,
      },
    },
    computed: {
      percentage() {
        if (this.maximum === 0) return 0;

        return this.current / this.maximum;
      }
    },
    data: () => ({
      foreground: undefined,
      background: undefined,
      arc: undefined,
    }),
    mounted(){
      const svg = d3
        .select(this.$el)
        .append('svg')
        .attr('width', this.radius * 2)
        .attr('height', this.radius * 2);

      const g = svg.append("g")
        .attr("transform", "translate(" + this.radius + "," + this.radius + ")");

      this.arc = d3.arc()
        .innerRadius(this.radius - this.lineWidth)
        .outerRadius(this.radius)
        .startAngle(0);

      this.background = g.append("path")
        .datum({ endAngle: tau })
        .style("fill", this.backgroundColor)
        .attr("d", this.arc);

      this.foreground = g.append("path")
        .datum({ endAngle: 0 })
        .style("fill", this.foregroundColor)
        .attr("d", this.arc);

      this.updateUI(this.arc);
    },
    updated(){
      this.updateUI(this.arc);
    },
    methods: {
      updateUI(arc){
        this.foreground.transition()
          .duration(750)
          .attrTween("d", arcTween(this.percentage * tau, arc));
      }
    }
  }

  function arcTween(newAngle, arc) {
    return (d) => {
      const interpolate = d3.interpolate(d.endAngle, newAngle);
      return (t) => {
        d.endAngle = interpolate(t);
        return arc(d);
      };
    };
  }

</script>


<style lang="scss" scoped>
  .circle {
    position: relative;

    .text {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

</style>
