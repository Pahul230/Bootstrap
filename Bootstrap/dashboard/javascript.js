$(document).ready(function () {

  $(".nav-item").click(function() {
    $(this).addClass('active').siblings().removeClass('active');
  });

  $('.chart-trigger').click(function() {
    $('.chart-trigger').removeClass('border border-primary');
    $(this).addClass('border border-primary');
  });

  const toggleBtn = document.getElementById('hamburgerToggle');
  const sidebarMenu = document.getElementById('sidebar');

  $('#hamburgerToggle').click(function(e) {
    e.stopPropagation(); 
    $('body').addClass('overlay')
    $('.sidebar').addClass('active');
  });

  $(document).click(function(e) {
    if (!$(e.target).closest('.sidebar, #hamburgerToggle').length) {
      $('body').removeClass('overlay');
      $('.sidebar').removeClass('active');
    }
  });

  const ctx = document.getElementById("trendsChart").getContext("2d");
  const chartDataSets = {
    unresolved: [
      5, 10, 12, 20, 25, 18, 23, 30, 22, 18, 15, 22, 30, 38, 35, 28, 24, 30, 33,
      40, 42,
    ],
    overdue: [
      3, 6, 8, 15, 20, 14, 18, 25, 19, 17, 12, 18, 25, 30, 28, 22, 18, 25, 28,
      32, 34,
    ],
    open: [
      6, 12, 15, 22, 27, 20, 26, 33, 25, 21, 18, 25, 33, 40, 37, 30, 26, 34, 37,
      45, 48,
    ],
    onhold: [
      4, 8, 10, 18, 22, 16, 21, 28, 20, 17, 14, 20, 27, 35, 32, 26, 22, 28, 30,
      38, 41,
    ],
  };
  const yesterdayData = [
    4, 9, 11, 17, 20, 15, 21, 25, 19, 14, 13, 20, 25, 32, 30, 22, 20, 25, 27,
    35, 37,
  ];
  const trendsChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [...Array(21).keys()],
      datasets: [
        {
          label: "Today",
          data: chartDataSets.unresolved, // default
          borderColor: "#3f51b5",
          backgroundColor: "rgba(63,81,181,0.1)",
          tension: 0.4,
        },
        {
          label: "Yesterday",
          data: yesterdayData,
          borderColor: "#c5cae9",
          backgroundColor: "rgba(197,202,233,0.1)",
          tension: 0.4,
        },
      ],
    },
  });
  document.querySelectorAll(".chart-trigger").forEach((item) => {
    item.addEventListener("click", () => {
      const type = item.getAttribute("data-type");
      if (chartDataSets[type]) {
        trendsChart.data.datasets[0].data = chartDataSets[type];
        trendsChart.update();
      }
    });
  });
});
