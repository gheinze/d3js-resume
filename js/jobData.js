/* global appModel */

(function(exports) {

    exports.jobs = [

      {
        startDate: new Date(1995, 07),
        endDate: new Date(1998, 08),
        employer: "Dare Foods",
        position: "Programmer / SAP Admin",
        type: "Full Time",
        description: "<ul><li>Software development and support<ul><li>sales</li><li>order admin</li><li>payroll</li><li>A/R</li><li>warehouse management</li></ul></li><br><li>Oracle DBA and SAP Basis Admin</li></ul>"
      },

      {
        startDate: new Date(1998, 09),
        endDate:   new Date(1999, 01),
        employer: "City of Guelph",
        position: "Oracle DBA",
        type: "Contract",
        description: "<ul><li>Administration and end-user support:<ul><li>Synergen (asset management)</li><li>Class (Parks and Recreation scheduling)</li><li>VailTech (property tax management)</li></ul></li></ul>"
      },

      {
        startDate: new Date(1999, 02),
        endDate:   new Date(2000, 06),
        employer: "City of Kitchener",
        position: "Oracle DBA / PeopleSoft Admin",
        type: "Full Time",
        description: "<ul><li>PeopleSoft ERP administration and HR personnel support</li><br><li>Data integrity analysis for finance and utility applications</li></ul>"
      },

      {
        startDate: new Date(2000, 07),
        endDate:   new Date(2012, 08),
        employer: "Research in Motion",
        position: "Software Developer / Oracle DBA",
        type: "Full Time",
        description: "<ul><li>Infrastructure components for over-the-air software loading of hand-held devices (Java, Spring)</li><br><li>In house capacity planning Data Mart based on log scraping (TBs raw data/day)</li><br><li>JSP web development for small in-house applications</li><br><li>Application DBA (schema design and tuning), Oracle production DBA</li></ul>"
      },

      {
        startDate: new Date(2007, 09),
        endDate:   new Date(2007, 12),
        employer: "Fanshawe College",
        position: "Database Instructor",
        type: "Contract",
        description: "<i>Introduction to Relational Databases and SQL</i> (Fall 2007)"
      },

      {
        startDate: new Date(2012, 09),
        endDate:   new Date(2013, 02),
        employer: "SunLife",
        position: "Data Analyst",
        type: "Contract",
        description: "<ul><li>Developing QA load testing specifications based on SQLServer data analysis</li><li>Designing a high availability architecture for a <i>Univeris</i> installation</li></ul>"
      },

      {
        startDate: new Date(2013, 03),
        endDate:   new Date(2014, 08),
        employer: "Avvasi",
        position: "Software Developer",
        type: "Full Time",
        description: "<ul><li>Java ETL pipeline to load Apache Qpid messages into a multi-node HP Vertica analytics DB</li><li>Infrastructure maintenance (installing maven repository, static analysis tools)</li></ul>"
      },

      {
        startDate: new Date(2014, 09),
        endDate: new Date(2015, 09),
        employer: "NetSuite",
        position: "Software Developer",
        type: "Full Time",
        description: "<ul><li>Human Resource software development (Java, Oracle, NetSuite API)</li></ul>"
      },

      {
        startDate: new Date(2016, 02),
        endDate: new Date(2016, 06),
        employer: "ASI",
        position: "Software Developer",
        type: "Contract",
        description: "<ul><li>Prototyping GeoFencing application with Arduino + GPS/GPRS shield sending to Heroku</li></ul>"
      }

    ];

})(appModel);
