const DatePicker = tui.DatePicker;

// 선택형
var today = new Date();
var picker = tui.DatePicker.createRangePicker({
  language: "ko",
  startpicker: {
    date: today,
    input: "#startpicker__input--flow",
    container: "#startpicker__container--flow",
  },
  endpicker: {
    date: today,
    input: "#endpicker__input--flow",
    container: "#endpicker__container--flow",
  },
  format: "YYYY-MM-dd",
});

var picker_visitor = tui.DatePicker.createRangePicker({
  language: "ko",
  startpicker: {
    date: today,
    input: "#startpicker__input--visitor",
    container: "#startpicker__container--visitor",
  },
  endpicker: {
    date: today,
    input: "#endpicker__input--visitor",
    container: "#endpicker__container--visitor",
  },
  format: "YYYY-MM-dd",
});