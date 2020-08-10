export default {
  computed: {
    vueHighchartsOptions() {
      return {
        chart: {
          type: 'spline',
          backgroundColor: 'transparent',
          height: 500,
        },
        title: {
          text:
            'The Graph of Total Population Transition by Prefecture in JAPAN',
        },
        xAxis: {
          labels: {
            style: {
              fontSize: '12px',
            },
          },
          title: {
            text: 'データ提供年(単位: 年)',
          },
          type: 'years',
          categories: [
            1960,
            1965,
            1970,
            1975,
            1980,
            1985,
            1990,
            1995,
            2000,
            2005,
            2010,
            2015,
            2020,
            2025,
            2030,
            2035,
            2040,
            2045,
          ],
          lineWidth: 2,
        },
        yAxis: {
          title: {
            text: '人口(単位: 人)',
          },
          labels: {
            formatter() {
              return this.value.toLocaleString()
            },
          },
          lineWidth: 2,
        },
        responsive: {
          rules: [
            {
              condition: {
                maxheight: 400,
              },
              chartOptions: {
                legend: {
                  layout: 'vertical',
                  align: 'right',
                  verticalAlign: 'top',
                },
              },
            },
          ],
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          useHTML: true,
          formatter() {
            return this.points.map((point) => {
              return `
                <i style="
                  background-color:${point.color};
                  border-radius:50%;
                  display: inline-block;
                  height:6px;
                  margin-right:4px;
                  width:6px;"
                ></i>${
                  point.series.name
                }: <b>${point.y.toLocaleString()}</b><br>`
            })
          },
        },
        credits: {
          enabled: false,
        },
        series: [],
      }
    },
  },
}
