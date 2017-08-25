queue()
    .defer(d3.json, '/data/nasaExoPlanets')
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

    // Format Date
    var formatYear = d3.time.format("%Y");
    var formatDate = d3.time.format("%m/%d/%Y");

    keplerDataExoPlanets.forEach(function (d) {
        d['DiscoveryYear'] = formatYear.parse(d['DiscoveryYear'].toString());
        d['DiscoveryYear'].setDate(1);
        d['Updated'] = formatDate.parse(d['Updated']);
        d['Updated'].setDate(1);
    });


    // Crossfilter Instance
    var ndx = crossfilter(keplerDataExoPlanets);

    // Create dimensions
    var telescopeDim = ndx.dimension(function (d) {
        return d['Telescope'];
    });

    var methodDim = ndx.dimension(function (d){
        return d['DiscoveryMethod'];
    });

    var dateDim = ndx.dimension(function (d) {
        return d['DiscoveryYear'];
    });

    var updatedDim = ndx.dimension(function (d) {
     return d['Updated'];
    });

    var podDim = ndx.dimension(function (d) {
        return d['PlaceOfDiscovery'];
    });

    var statusDim = ndx.dimension(function (d){
        return  d['Status'];
    });

    // Create metrics
    var telescopeGroup = telescopeDim.group();

    var dateGroup = dateDim.group();
    var minDate = dateDim.bottom(1)[0]['DiscoveryYear'];
    var maxDate = dateDim.top(1)[0]['DiscoveryYear'];

    var updatedGroup = updatedDim.group();
    var minUpdated = updatedDim.bottom(1)[0]['Updated'];
    var maxUpdated = updatedDim.top(1)[0]['Updated'];
    console.log(minUpdated);
    console.log(maxUpdated);

    var podGroup = podDim.group();
    var methodGroup = methodDim.group();

    // Scales

    var dateScale = d3.time.scale()
        .domain([minDate, maxDate]);

    var updateScaled = d3.time.scale()
        .domain([minUpdated, maxUpdated]);

    var heightScale = d3.scale.linear()
        .domain([0, d3.max(keplerDataExoPlanets)])
        .range(2000);

    var colorScale = d3.scale.linear()
                   .domain([0,d3.max(keplerDataExoPlanets)])
                   .range(["blue","red"]);

    // Link Graphs
    var menuSelect = dc.selectMenu("#menu-select");
    var dateGraph = dc.lineChart("#date-graph");
    var updatedGraph = dc.lineChart("#updated-graph");
    var podPie = dc.pieChart('#pod-pie');
    var methodPie = dc.pieChart('#status-pie');
    var dataTable = dc.dataTable("#data-table");

    // Create Graphs

    menuSelect
        .dimension(telescopeDim)
        .group(telescopeGroup);

    dateGraph
        .height(500)
        .width(560)
        .dimension(dateDim)
        .group(dateGroup)
        .x(dateScale)
        .xUnits(function(){return 15;})
        .xAxisLabel("Year Found")
        .yAxisLabel("Total Found")
        .yAxis().ticks(3);

    updatedGraph
        .height(500)
        .width(560)
        .dimension(updatedDim)
        .group(updatedGroup)
        .x(updateScaled)
        .xUnits(function(){return 15;})
        .xAxisLabel("Upated")
        .yAxisLabel("Total Found")
        .yAxis().ticks(3);

    podPie
        .width(210)
        .height(221)
        .slicesCap(5)
        .innerRadius(10)
        .dimension(podDim)
        .group(podGroup);

    methodPie
        .width(210)
        .height(221)
        .slicesCap(5)
        .innerRadius(10)
        .dimension(methodDim)
        .group(methodGroup);



    dataTable
        .height(500)
        .dimension(methodDim)
        .group(function (d) {
            return d['HostName']
        })
        .columns([
            {
                label: "Host Name",
                format: function (d) { return d['HostName'];}
            },
            {
                label: "Planet Name",
                format: function (d) { return d['PlanetName'];}
            },
            {
                label: "Discovery Method",
                format: function (d) { return d['DiscoveryMethod'];}
            },
            {
                label: "Place of Discovery",
                format: function (d) { return d['PlaceOfDiscovery'];}
            },
            {
                label: "Telescope",
                format: function (d) { return d['Telescope'];}
            },
            {
                label: "Discovery Facility",
                format: function (d) {return d['DiscoveryFacility'];}
            },
            {
                label: "Last Updated",
                format: function (d) {return d['Updated'];}
            }
        ]);

    dc.renderAll();



    var myFilter = methodDim.filter();
    print_filter('myFilter');
}

