// let body=d3.select('body')
var data;
var color=d3.scale.category20()
let width=1000;
let height=800;
let start=20180101
let end= 20181231
let largestscore = 8300
let smallestscore = 2900
var datetransformer=number=> [parseInt(number/10000),parseInt(number%10000/100),number%10000%100]

var timescale=d3.time.scale()
    .domain([new Date(datetransformer(start)),
        new Date(datetransformer(end))])
    .range([0,width-50])

var heightscale=d3.scale.linear()
    .domain([smallestscore,largestscore])
    .range([height-50,0])

var fmt=d3.time.format('%m/%d')

var xAixs=d3.svg.axis().scale(timescale).ticks(10).tickFormat(fmt)
var yAixs=d3.svg.axis().scale(heightscale)
var svg=d3.select('body').append('svg').attr({'height':height,'width':width}).append('g')
    .attr("transform", "translate(" +50 + "," + 0 + ")")
d3.json('data/wta_rankings_final_top10.json',function (error,json) {
    if (error) throw error
    data=json
    data.forEach(
        (data)=>{
            update(data)
        }
    )
    })


var update= data=>{
    let area=d3.svg.area().x(d=>timescale(new Date(datetransformer(d.ranking_date)))).y0(750).y1(d=>heightscale(d.ranking_points)).interpolate("bundle")
    svg.datum(data)
    if(svg.selectAll('path').empty()) {
        svg.append('path').attr({'fill': color, 'd': area})
        svg.append('g').attr("transform", "translate(" + 0 + "," + 750 + ")").call(xAixs.orient('bottom'))
        svg.append('g').call(yAixs.orient('left'))
    }
    else{
        svg.append('path').attr({'fill': color, 'd': area})
    }
    // svg.append('g').call(heightscale.orient('left'))
}



