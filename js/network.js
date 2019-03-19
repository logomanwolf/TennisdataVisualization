//节点和连接数据
var data={	//节点
    "nodes":[
        {"name":"A"},    {"name":"B"},    {"name":"C"},    {"name":"D"},
        {"name":"E"},    {"name":"F"},    {"name":"G"},    {"name":"H"},
        {"name":"I"},    {"name":"G"},    {"name":"K"},    {"name":"L"},
        {"name":"M"},    {"name":"N"},    {"name":"O"},    {"name":"P"},
        {"name":"Q"},    {"name":"R"},    {"name":"S"},    {"name":"T"},
        {"name":"U"},    {"name":"V"},    {"name":"W"},    {"name":"X"},
        {"name":"Y"},    {"name":"Z"}
    ],
    "links":[	//连接
        {"source":1,"target":0},    {"source":2,"target":0},
        {"source":3,"target":0},    {"source":3,"target":2},
        {"source":4,"target":0},    {"source":5,"target":0},
        {"source":6,"target":0},    {"source":7,"target":0},
        {"source":8,"target":0},    {"source":9,"target":0},
        {"source":11,"target":10},    {"source":11,"target":3},
        {"source":11,"target":2},    {"source":11,"target":0},
        {"source":12,"target":11},    {"source":13,"target":11},
        {"source":14,"target":11},    {"source":15,"target":11},
        {"source":17,"target":16},    {"source":18,"target":16},
        {"source":18,"target":17},    {"source":19,"target":16},
        {"source":19,"target":17},    {"source":19,"target":18},
        {"source":20,"target":16},    {"source":20,"target":17},
        {"source":20,"target":18},    {"source":20,"target":19},
        {"source":21,"target":16},    {"source":21,"target":17},
        {"source":21,"target":18},    {"source":21,"target":19},
        {"source":21,"target":20},    {"source":22,"target":16},
        {"source":22,"target":17},    {"source":22,"target":18},
        {"source":22,"target":19},    {"source":22,"target":20},
        {"source":22,"target":21},    {"source":23,"target":16},
        {"source":23,"target":17},    {"source":23,"target":18},
        {"source":23,"target":19},    {"source":23,"target":20},
        {"source":23,"target":21},    {"source":23,"target":22},
        {"source":23,"target":12},    {"source":23,"target":11},
        {"source":24,"target":23},    {"source":24,"target":11},
        {"source":25,"target":24},    {"source":25,"target":23},
        {"source":25,"target":11}
    ]
};

//SVG的尺寸
var width = 1500,    height = 800;

//取到body
var body=d3.select("body")
//定义力布局
var force = d3.layout.force()
    .size([width, height]);

//定义颜色比例尺
var color=d3.scale.category20c();

var div=body.append("div")
//绘制一个svg
var svg = body.append("svg")
    .attr("width", width)
    .attr("height", height);

//加载数据，启动力布局
force.nodes(data.nodes)
    .links(data.links)
    .charge(-1500)
    .start();

//绘制连接线
var link = svg.selectAll(".link")
    .data(data.links)
    .enter().append("line")
    .attr("stroke", "#ccc")
    .classed('link',true);

//绘制节点
var node = svg.selectAll(".node")
    .data(data.nodes)
    .enter().append('g')
    .on("click",click)
    .append("circle")
    .attr("fill", function(d,i){return color(i)})
    .attr("r", 25)
    .classed('node',true)
    // .attr("stroke","black")
    // .attr("stroke-width",1)
    .call(force.drag());

//按照力布局的节拍移动线和点的位置，直到收敛
force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
});
function click (d) {
    // <svg width="700" height="660">
    // <defs>
    // <pattern id="image" x="0" y="0" patternUnits="userSpaceOnUse" height="1" width="1">
    // <image x="0" y="0" xlink:href="url.png"></image>
    // </pattern>
    // </defs>
    // <circle id='top' cx="180" cy="120" r="80" fill="url(#image)"/>
    // </svg>
    let g= d3.select(this)
    let circle=g.select("circle")
    if(g.select("defs").empty()){
        let defs=g.insert("defs","circle")
        let pattern=defs.append("pattern").attr({'x':0,'y':0,'patternUnits':"userSpaceOnUse","height":50,'width':50,'id':'image',})
        let img=pattern.append('image').attr({'x':0,'y':0,'xlink:href':'img/spicy.png',"height":50,'width':50}).style({'border-radius':25,})
        circle.attr('fill',"url(#image)")
    }
    circle.transition().duration(100).attr('r',40).transition().duration(100).attr('r',25)
    // this.attr('fill','#000000');
}