class DashboardController {
  constructor(RecordService, $scope) {
    'ngInject';
    this.$scope = $scope;
    this.recordService = RecordService;

    this.chartData = {
      type: 'line',
      series: [],
      title: {
        text: 'Game points graph',
      },
      scaleY: {
        label: {
          text: "No of games"
        },
        format: '$%v',
      },
      scaleX: {
        label: {
          text: "Game points"
        },
        values: '0:100:10'
      },
    };
    this.parseRecordData();
  }

  parseRecordData() {
    let values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.recordService.getData().then(data => {
      let records = data.data.data.model;
      records.forEach(element => {
        if (element.points === 0) values[0] += 1;
        else if (element.points === 100) values[10] += 1;
        else {
          let valIndex = Math.floor(element.points / 10);
          values[valIndex] += 1;
        }
      });
      this.chartData.series = [{ values: values }];
      this.$scope.$apply();
    });
  }
}

const DashboardComponent = {
  selector: 'dashboardComponent',
  controller: DashboardController,
  template: require('../template/dashboard.template.html')
};

export default DashboardComponent;
