"use strict";

/* global d3 */
/* global appModel */


/**
 * Logic for an SVG grouping representing language activities.
 *
 * @param {type} exports
 * @returns {undefined}
 */
(function(exports) {

    exports.toggleLanguageGraph = function(jobSvgViewLayerGroup, showLayer) {

        if (showLayer) {
            var languageGroup = jobSvgViewLayerGroup.append("g").attr("id", "languageGroupId");
            addLanguageLines(languageGroup);
            addLegend(languageGroup);

        } else {
            jobSvgViewLayerGroup.select("#languageGroupId").remove();
        }

    };


    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);


    function addLanguageLines(languageGroup) {

        // Defining the function that will process an array of points,
        // specifying how to process an individual element from the array of the form:
        //     {date: theDate, usage: score}
        var lineFunction = d3.line()
                .x(function (d) { return exports.jobSvgScale.xScale(d.date);  })
                .y(function (d) { return exports.jobSvgScale.yScale(d.usage); })
                .curve(d3.curveBasis)
                ;

        // add the lines
        languageGroup
                .selectAll("path")
                .data(exports.languages)
                .enter()
                .append("path")
//                .attr("class", "language-line")
                .attr("stroke", function(d, i) { return colorScale(i); })
                .attr("stroke-width", 5)
                .attr("fill", "none")
                .attr("d", function(d) { return lineFunction(d.activity); } )
        ;

    }

    function addLegend(languageGroup) {

        var lineLabelX = exports.jobSvgExtents.full.w - exports.jobSvgExtents.margin.right + 20;
        var lineLabelY = exports.jobSvgExtents.margin.top + 70;
        var lineLabelYStep = 50;

        languageGroup
                .selectAll("text")
                .data(exports.languages)
                .enter()
                .append("text")
                .attr("class", "language-line-label")
                .attr("stroke", function(d, i) { return colorScale(i); })
                .attr("stroke-width", 1)
                .attr("fill", "none")
                .attr("transform", function(d) {
                    var y = lineLabelY;
                    lineLabelY += lineLabelYStep;
                    return "translate(" + lineLabelX + "," + y + ")";
                })
                .attr("x", 4)
                .text(function(d) { return d.language; });

    }


})(appModel);
