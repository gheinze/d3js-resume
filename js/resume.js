/* global d3 */


// Namespace for Resume application

var appModel = {};



// Bootstrap

$(document).ready(function () {
    appModel.init();
});



(function(exports) {

    "use strict";

    exports.jobSvgExtents = defineJobSvgAreaExtents();

    var jobSvg;
    var jobSvgViewLayerGroup;


    exports.init = function() {

        attachViewSelectionChangeListeners();

        exports.jobSvgScale = defineJobSvgScales();

        jobSvg = createJobSvgArea();

        var jobToolTipDiv = createJobToolTipDiv();

        addJobBarsToJobsSvg(jobSvg, jobToolTipDiv);
        addJobToolTipListeners();

        var xAxis = d3.axisBottom(exports.jobSvgScale.xScale);
        jobSvg.append("g").attr("transform", "translate(0," + (exports.jobSvgExtents.full.h - exports.jobSvgExtents.margin.bottom) + ")").call(xAxis);

        jobSvgViewLayerGroup = jobSvg.append("g").attr("id", "jobSvgViewLayerGroupId");

        initializeView();

    };


    function defineJobSvgAreaExtents() {
        var full = {w: $(window).width(), h: 400};
        var margin = {top: 20, right: 300, bottom: 30, left: 50};
        var dataArea = {
            w: full.w - margin.left - margin.right,
            h: full.h - margin.top - margin.bottom
        };
        return {full: full, margin: margin, dataArea: dataArea};
    }



    function defineJobSvgScales() {

        var xScale = d3.scaleTime()
                       .domain( [ d3.min(exports.jobs, function(d) { return d.startDate; }),
                                  d3.max(exports.jobs, function(d) { return d.endDate; })
                                ] )
                       .rangeRound([exports.jobSvgExtents.margin.left, exports.jobSvgExtents.margin.left + exports.jobSvgExtents.dataArea.w])
                       ;

         var yScale = d3.scaleLinear()
                        .domain( [0, 10] )
                        .rangeRound([ exports.jobSvgExtents.margin.top + exports.jobSvgExtents.dataArea.h,
                                      exports.jobSvgExtents.margin.top
                                    ])
                        ;

        var colorScale = d3.scaleLinear()
                           .domain( [0, exports.jobs.length] )
                           .range([0.25, 0.50])
                           ;

        return {xScale: xScale, yScale: yScale, colorScale: colorScale};
    }


    function createJobSvgArea() {

        var jobsSvg = d3.select("#jobsSvgContainerId")
                .append("svg")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 " + exports.jobSvgExtents.full.w + " " + exports.jobSvgExtents.full.h)
                .classed("svg-content-responsive", true)
//   .attr("width", exports.jobSvgExtents.full.w)
//                .attr("height", exports.jobSvgExtents.full.h)
                ;

        return jobsSvg;
    }


    function createJobToolTipDiv() {
        return d3.select("body").append("div").attr("id", "jobBarToolTipId").attr("class", "job-tool-tip");
    }


    function addJobBarsToJobsSvg(jobSvg, jobToolTipDiv) {

        var jobBarsGroup = jobSvg.append("g").attr("id", "jobsGroupId");

        jobBarsGroup.selectAll("rect")
           .data(exports.jobs)
           .enter()
           .append("rect")
             .attr("x", function(d) { return exports.jobSvgScale.xScale(d.startDate); } )
             .attr("width", function(d) { return exports.jobSvgScale.xScale(d.endDate) - exports.jobSvgScale.xScale(d.startDate); })
             .attr("y", exports.jobSvgExtents.margin.top)
             .attr("height",exports.jobSvgExtents.dataArea.h)
             .attr("fill", function(d, i) { return d3.interpolateGreens(exports.jobSvgScale.colorScale(i)); })
//             .attr("class", "job-bar")
         ;

    }


    function addJobToolTipListeners() {

        var toolTipDiv = d3.select("#jobBarToolTipId");

        d3.select("#jobsGroupId")
           .selectAll("rect")

             .on("mouseover", function(d) {
                 return toolTipDiv.style("visibility", exports.jobToolTip.isEnabled() ? "visible" : "hidden").html(d.description);
             })

             .on("mousemove", function() {
                 return toolTipDiv.style("top", (d3.event.pageY-10)+"px")
                                  .style("left",(d3.event.pageX+10)+"px");
             })

             .on("mouseout", function() {
                 return toolTipDiv.style("visibility", "hidden");
             })

         ;

     }


    function attachViewSelectionChangeListeners() {

        d3.select("#viewSelectionId")
                .selectAll('input[type="checkbox"]')
                .on("change", function(d) { viewSelectionChanged(this); } )
            ;
    }


    function initializeView() {
        var jobsCheckBox = $("#jobsId");
        jobsCheckBox.prop("checked", true);
        viewSelectionChanged(jobsCheckBox[0]);
    }


    function viewSelectionChanged(checkBox) {

        var selectedViewId = checkBox.id;
        var showLayer = checkBox.checked;

        switch(selectedViewId) {

            case "jobsId":
                exports.toggleJobDetails(jobSvgViewLayerGroup, showLayer);
                break;

            case "languagesId":
                exports.toggleLanguageGraph(jobSvgViewLayerGroup, showLayer);
                break;

        }

    }


})(appModel);
