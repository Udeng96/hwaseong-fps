// Create the chart
var visitorMonthChart = function () {
  return Highcharts.chart("visitorMonthChart", {
    chart: {
      type: "column",
      height: 170,
      spacingBottom: 0,
      marginBottom: 60,
      backgroundColor:'transparent',
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      useHTML: true,
      pointFormat: '<p class="tooltip__text">{point.name} <b style="font-weight:500;font-size: 11px;"><span style="color:{point.color}; padding-right:6px;">&#9632;</span>{point.y}</b>명</p>',
      style: {
        fontFamily: "NotoSansCJKkr",
        color: "#fff",
        fontSize: 10,
        fontWeight: 300,
      },
      backgroundColor: "#22242E",
      borderColor: "#DB5C18",
      borderRadius: 12,
    },

    xAxis: {
      styledMode: true,
      categories: [
        "썬샤인헤어 간판 주변",
        "대승공인중개사 간판 주변",
        "둘리문고 앞",
        "도토리약국, 이마트24 사이",
        "라온빌리지 앞",
        "병점성당 옆",
        "S마트 뒷편 골목",
        "우정이발관 맞은편",
        "노루페인트 주변",
        "백운조명 주변",
        "태안주택 주변",
        "화성직업전문 학교 주변",
        "합성유리 앞",
        "임마누엘교회 삼거리",
        "주택가 골목",
        "용우빌라 골목길",
        "병점 사거리",
        "비전센터 앞",
        "경기아파트 골목길",
        "까스타 앞",
        "교동짬뽕 앞",
      ],
      crosshair: true,
      labels: {
        style: {
          fontFamily: "NotoSansCJKkr",
          color: "#A5A7B5",
          fontSize: 10,
          fontWeight: 300,
          width :60,
        },
      },
      lineColor: '#40424F',
    },

    yAxis: {
      min: 0,
      max: 200,
      title: {
        enabled: false,
      },
      labels: {
        style: {
          fontFamily: "NotoSansCJKkr",
          color: "#A5A7B5",
          fontSize: 10,
          fontWeight: 300,
        },
      },
      gridLineColor: '#40424F',
      tickPositions: [0, 50, 100, 150, 200],
    },
    plotOptions: {
      
      column: {
        pointPadding: 0.2,
        borderWidth:0,
      },
    },
    series: [
      {
        name: "전일",
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, ],
      },
      {
        name: "금일",
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, ],
      },
    ],
    colors: ['#30BEFF', '#FC7220', ],
  });
};

window.visitorMonthChart = visitorMonthChart;
