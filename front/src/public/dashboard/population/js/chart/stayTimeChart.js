// Create the chart
var stayTimeChart = function(){
  return  Highcharts.chart('stayTimeChart', {
    chart: {
      type: 'pie',
      spacing: 10,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      backgroundColor: 'transparent',
    },
    title: {
      text: 
      '',
      floating: true,
    },
    subtitle: {

    },
  
    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: '%'
      }
    },
  
    plotOptions: {
      pie: {//도넛(파이)차트 전체 옵션 지정.
        borderColor: 'transparent',
        allowPointSelect: false, //클리하면 값이 따로 조각남
        cursor: 'pointer',
        dataLabels: {
          enabled: false, // true -> 화살표로 값 나옴
          format: '{point.name}: {point.y:.1f}%'
        },
        showInLegend: true,
        size: 138, //도넛 사이즈
        states: { //값
          inactive: { //비활성
            enabled: false // 값을 호버 했을 때 다른 값들 투명도 비활성화
          }
        }
      },
    },
    tooltip: {
      useHTML: true,
      headerFormat:'',
      pointFormat: '<p class="tooltip__text"><span style="color:{point.color};">\u25CF</span> {point.name}</p> <b style="font-weight:500;font-size: 14px;">{point.y}</b>%</p>',
      style: {
        fontFamily: "NotoSansCJKkr",
        color: "#fff",
        fontSize: 11,
      },
      backgroundColor: "#22242E",
      borderColor: "#DB5C18",
      borderRadius: 10,
    },

    legend: {
      enabled: false
    },

    series: [{
      
      name: '',
      colorByPoint: true,
      selected: true,

      data: [
        {
          name: '1~5분',
          y: 17,
        },
        {
          name: '6~10분',
          y: 26,
        },
        {
          name: '11~20분',
          y: 10,
          
        },
        {
          name: '21~4분',
          y:9,
        },
        {
          name: '41~60분',
          y: 14,
        },
        {
          name: '60분 이상',
          y: 24,
        },
      ]
    }],
    colors: ['#E56262', '#E29879', '#E9DE80', '#81D7EA', '#8293F1', '#B366CE'],

    credits: {// 하이차트 워터 마크
        enabled: false
    },
  });
}

window.stayTimeChart = stayTimeChart;