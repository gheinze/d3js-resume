"use strict";

/* global d3 */
/* global appModel */


/**
 * Logic for an SVG grouping representing job details
 *
 * @param {type} exports
 * @returns {undefined}
 */
(function(exports) {

    var jobLabelOffsets = defineJobLabelOffsets();


    exports.jobToolTip = function() {
        var state = true;
        return {
            isEnabled: function() { return state; },
            enable:  function() { state = true; },
            disable: function() { state = false; }

        };
    }();


    exports.toggleJobDetails = function(jobSvgViewLayerGroup, showLayer) {

        if (showLayer) {
            var jobDetailGroup = jobSvgViewLayerGroup.append("g").attr("id", "jobDetailGroupId");
            addJobLabels(jobDetailGroup);
            addEmployerLabels(jobDetailGroup);
            exports.jobToolTip.enable();
            d3.select("#jobsGroupId").selectAll("rect").classed("job-bar", true);

        } else {
            jobSvgViewLayerGroup.select("#jobDetailGroupId").remove();
            exports.jobToolTip.disable();
            d3.select("#jobsGroupId").selectAll("rect").classed("job-bar", false);
        }

    };



    function addJobLabels(jobSvgViewLayerGroup) {

        jobLabelOffsets.reset();

        var positionSvgGroup = jobSvgViewLayerGroup.append("g").attr("id", "positionsId");

        positionSvgGroup.selectAll("text")
           .data(exports.jobs)
           .enter()
           .append("text")
             .text(function(d) {return d.position;})
             .attr("font-family", "sans-serif")
             .attr("font-size", "15px")
             .attr("fill", "black")
             .style("text-anchor", "start")
             .attr("transform", function(d) {
                 var x = exports.jobSvgScale.xScale(d.startDate) + jobLabelOffsets.xGap;
                 var y = jobLabelOffsets.currentY;
                 jobLabelOffsets.incrementY();
                 return "translate (" + x + ", " + y + ") rotate(-40)";
             })
        ;

     }


     function addEmployerLabels(jobSvgViewLayerGroup) {

        jobLabelOffsets.reset();

        var employerSvgGroup = jobSvgViewLayerGroup.append("g").attr("id", "employersId");

        employerSvgGroup.selectAll("text")
           .data(exports.jobs)
           .enter()
           .append("text")
             .text(function(d) {return d.employer + (d.type === "Contract" ? " (on contract)" : "");})
             .attr("font-family", "sans-serif")
             .attr("font-size", "12px")
             .attr("fill", "grey")
             .style("text-anchor", "start")
             .attr("transform", function(d) {
                 var x = exports.jobSvgScale.xScale(d.startDate) + jobLabelOffsets.xGap * 2;
                 var y = jobLabelOffsets.currentY + 15;
                 jobLabelOffsets.incrementY();
               return "translate (" + x + ", " + y + ") rotate(-40)";
           })
        ;

     }




    function defineJobLabelOffsets() {
        var oneThirdH = exports.jobSvgExtents.margin.top + exports.jobSvgExtents.dataArea.h / 3 + 10;
        var startHeight = oneThirdH;
        return {
            xGap: 10, yStep: 60, startHeight: startHeight, currentY: oneThirdH,
            reset: function() { this.currentY = oneThirdH; },
            incrementY: function() {
                var pastTwoThirdsOfAvailableHeight = (this.currentY > oneThirdH * 2);
                this.currentY = pastTwoThirdsOfAvailableHeight ? startHeight : this.currentY + this.yStep;
            }

        };
    }



})(appModel);
