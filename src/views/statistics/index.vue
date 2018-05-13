<template>
    <div class="statistics">
        <div class="chart1 chart" ref="myChart1"></div>

        <div class="chart2 chart" ref="myChart2"></div>

        <div class="chart3 chart" ref="myChart3"></div>
    </div>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                config1: {
                    title: {
                        text: '一周内的接诊人数',
                        x: 'center'
                    },
                    color: ['#7cb5ec', '#f7a35c', '#90ed7d', '#434348'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: [],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        max: 100
                    }],
                    series: [{
                        name: '接诊人数',
                        type: 'bar',
                        barWidth: '60%',
                        data: []
                    }]
                },
                config2: {
                    title: {
                        text: '一周内的就诊比例',
                        x: 'center'
                    },
                    color: ['#7cb5ec', '#f7a35c', '#90ed7d', '#434348'],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: []
                    },
                    series: [{
                        name: '就诊比例',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                },
                config3: {
                    title: {
                        text: '一周内药品的需求量',
                        x: 'center'
                    },
                    color: ['#7cb5ec', '#f7a35c', '#90ed7d', '#434348'],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: []
                    },
                    series: [{
                        name: '需求量',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                },
            }
        },
        methods: {
            // 请求数据
            askData() {
                this.getRequest('statistics_info', null, this.initData);
            },

            // 初始化数据
            initData(data) {
                let myDate = new Date(); // 获取今天日期
                myDate.setDate(myDate.getDate() - 6);
                let dateArray = [];
                for (let i = 0; i < 7; i++) {
                    dateArray.push(myDate.getMonth() + 1 + '.' + myDate.getDate());
                    myDate.setDate(myDate.getDate() + 1);
                }
                this.config1.series[0].data = data.Data.chart1;
                this.config1.xAxis[0].data = dateArray;

                this.config2.series[0].data = data.Data.chart2;
                this.config2.legend.data = data.Data.chart2.map(item => item.name);

                this.config3.series[0].data = data.Data.chart3;
                this.config3.legend.data = data.Data.chart3.map(item => item.name);

                this.drawLine();
            },

            drawLine() {
                this.$echarts.init(this.$refs.myChart1).setOption(this.config1);
                this.$echarts.init(this.$refs.myChart2).setOption(this.config2);
                this.$echarts.init(this.$refs.myChart3).setOption(this.config3);
            }
        },
        created() {
        },
        mounted() {
            this.askData();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .statistics {
        height: 1140px;
    }
    .chart {
        margin: auto;
        margin-bottom: 60px;
    }
    .chart1 {
        width: 300px;
        height: 300px;
    }
    .chart2 {
        width: 500px;
        height: 300px;
    }
    .chart3 {
        width: 500px;
        height: 300px;
    }
</style>
