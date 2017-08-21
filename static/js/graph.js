queue()
    .defer(d3.json, "/keplerData/exoPlanets")
    .await(makeGraphs);

function makeGraphs(error, keplerDataExoPlanets) {

    function print_filter(filter){
        var f=eval(filter);
        if (typeof(f.length) != "undefined") {}else{}
        if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
        if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
        console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
    }

    // Error handler
    if (error) {
        console.log("makeGraphs error on recieving dataset:", error.statusText);
        throw error
    }

    // Crossfilter Instance
    var ndx = crossfilter(keplerDataExoPlanets);


    // Dimensions
    var methodDim = ndx.dimension(function (d) {
       return d['DiscoveryMethod'];
    });

    var listTypeDim = ndx.dimension(function (d) {
        return d['ListsPlanetIsOn'];
    });

    var dateDim = ndx.dimension(function (d) {
        return d['DiscoveryYear'];
    });

    var minDate = dateDim.bottom(1)[0]['DiscoveryYear'];
    var maxDate = dateDim.top(1)[0]['DiscoveryYear'];

    var idDim = ndx.dimension(function (d) {
        return d['PlanetIdentifier']
    });

    var flagDim = ndx. dimension(function (d) {
        return d['TypeFlag']
    });

    // Metrics
    var totalCount = ndx.groupAll().reduceCount().value();
    console.log(totalCount);

    var methodTypes = methodDim.group();

    var planetListType = listTypeDim.group();

    var dateType = dateDim.group();

    var idType = idDim.group();

    var flagType = flagDim.group();

    // Scales
    var dateScale = d3.scale.linear()
        //.domain([1971, maxDate]);
        .domain([1971, 2017]);

    var heightScale = d3.scale.linear()
        .domain([0, totalCount]);

    // Charts
    // var selectField = dc.selectMenu('#menu-select');
    var totalFound = dc.barChart("#chart-one");
    var listfound = dc.lineChart("#chart-two");
    var pielist = dc.pieChart("#chart-three");
    var pielist1 = dc.pieChart("#chart-four");
    var dataTable = dc.dataTable("#dataTable");
    var menuSelect = dc.selectMenu('#menu-select');
    var menuSelect1 = dc.selectMenu('#menu-select1');

    // Make Charts
    menuSelect1
        .dimension(idDim)
        .group(idType);

    menuSelect
        .dimension(methodDim)
        .group(methodTypes);

    totalFound
        .width(570)
        .height(480)
        .dimension(methodDim)
        .group(methodTypes)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .yAxisLabel("This is the Y Axis!");

    listfound
    .width(548)
        .height(480)
        .dimension(dateDim)
        .group(dateType)
        .x(dateScale)
        .yAxisLabel("This is the Y Axis!")
        .yAxis().ticks(6);

    dataTable
        .height(500)
        .dimension(methodDim)
        .group(function (d) {
            return d['PlanetIdentifer']
        })
        .columns([
            function (d) {
            return d['PlanetIdentifier']
            },
            function (d) {
            return d['PeriodDays'];
        }]);

    pielist
        .width(210)
        .height(210)
        .slicesCap(5)
        .innerRadius(10)
        .dimension(listTypeDim)
        .group(planetListType);

    pielist1
        .width(210)
        .height(210)
        .slicesCap(5)
        .innerRadius(10)
        .dimension(flagDim)
        .group(flagType);


    dc.renderAll();

    var myFilter = methodDim.filter();
    print_filter('myFilter');
    console.log(methodTypes);
}

