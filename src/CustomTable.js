import React, {cloneElement, useMemo, useState, useEffect, useRef} from "react";
import styled from "styled-components";

import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  usePagination,
  useSortBy,
} from "react-table";

import { columnSize } from "@looker/components/DataTable/Column/columnSize";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Sparklines,
  SparklinesLine,
  SparklinesCurve,
  SparklinesReferenceLine,
  SparklinesNormalBand,
  SparklinesSpots,
  SparklinesBars,
} from "react-sparklines";

import Pagination from "@mui/material/Pagination";
import { Container, Row, Col, ProgressBar, Button, ButtonGroup, Form } from "react-bootstrap";
import { TablePagination } from "@mui/material";

const Styles = ({ children, config }) => {
  var { titleText, listItem1, listItem2, listItem3, division, retail, duration, variance, progress, autonomous, manual, none } = config;

  const StyledWrapper = styled.div`

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

  @import url("https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css");

  p{
    color:red !important
  }

  #vis-container {
      height: 100%;
      max-height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
 }

  #spark1 svg, #spark2 svg, #spark3 svg {
      overflow: visible;
      width: 100%;
      max-width: 200px;
 }
  #spark1 circle {
      fill: transparent !important;
 }
  #spark2 circle {

 }
  #spark1 svg path {
      stroke-width: 2px !important;
 }
  #spark2 svg polyline {
 }
  .redGradient {
      fill: rgb(199, 32, 10) !important;
 }
  body {
    font-family: 'Roboto', sans-serif;
 }
  thead th {
      font-size: 12px !important;

      font-weight: 300;
    font-family: 'Roboto', sans-serif;
      text-align: left;
 }
  tbody > tr > td {
      vertical-align: middle;
 }
  .table tbody > tr > td, .table tbody > tr > th, .table tfoot > tr > td, .table tfoot > tr > th, .table thead > tr > td, .table thead > tr > th {
      border: none;
 }
  table img {
      width: 33px !important;
 }
  .moveRight {
      margin: 0em 0em 0em 0.5em !important;
    font-family: 'Roboto', sans-serif;
 }
  .d-flex {
      display: flex;
 }
  .align-items-center {
      align-items: center;
 }
  .flex-column {
      flex-direction: column;
 }
  .img-fluid {
      max-width: 100%;
      height: auto;
 }
  h3 {
      color: #1d1e20 !important;
      font-size: 13px !important;
      margin-bottom: 0 !important;
      color: #1d1e20 !important;
      font-weight: 400 !important;
      font-family: 'Roboto', sans-serif;
      margin-top: 0 !important;
      min-width: 2rem;
 }
  .var h3 {
      width: 2em;
 }
  p.small {
      color: #72777e !important;
      font-weight: 300 !important;
      font-size: 12px !important;

  line-height: 1;

    font-family: 'Roboto', sans-serif;
 }
  p {
      margin: 0rem !important;
 }
  p.black {
      color: black !important;
 }
  span.type {
      font-size: 12px;
      border-radius: 0.25rem;
      padding: 0.25em 0.55em;
 }
  span.type.positive {
      background: #eef8e8;
      color: #39800b;
 }
  span.type.positive i {
      transform: rotate(45deg);
 }
  span.type.negative {
      background: #fbe7e5;
      color: #c7200a;
 }
  span.type.negative i {
      transform: rotate(135deg);
 }
  li.tag {
      font-size: 11px;
      padding: 0.25em 1.55em;
      border-radius: 1rem;
      color: #1d1e20;
      font-weight: 400;
      display: flex;
      justify-content: center;
      align-items: center;
 }
  li.tag:first-child {
 }
  .neutral {
      background: #e8edf3;
      max-width: 5em;
 }
  .branded {
      background: #ccccff;
      max-width: 5em;
 }
  .critical {
      background: #fdb6b0;
      max-width: 5em;
 }
  .warning {
      background: #ffd87f;
      position: relative;
      padding: 0.25em 0.75em 0.25em 1.55em !important;
 }
  .warning::before {
      font-family: "Font Awesome 5 Pro";
      position: absolute;
      content: "\f06a";
      display: inline-block;
      left: 5px;
      top: 4px;
 }
  .success {
      background: #d1ecc0;
      max-width: 5em;
 }
  .informational {
      background: #b6dff7;
      position: relative;
      padding: 0.25em 0.75em 0.25em 1.55em !important;
 }
  .informational::before {
      font-family: "Font Awesome 5 Pro";
      position: absolute;
      content: "\f05a";
      display: inline-block;
      left: 5px;
      top: 4px;
 }
  #sentimentInfo, #tagInfo {
      padding-left: 1em;
 }
  .neg {
      color: #c7200a;
      font-size: 12px;
      position: relative;
 }
  .neg::before {
      font-family: "Font Awesome 5 Pro";
      position: absolute;
      content: "\f119";
      display: inline-block;
      left: -15px;
      top: 2px;
 }
  .pos {
      color: #008759;
      font-size: 12px;
      position: relative;
 }
  .pos::before {
      font-family: "Font Awesome 5 Pro";
      position: absolute;
      content: "\f118";
      display: inline-block;
      left: -15px;
      top: 2px;
 }
  .neut {
      color: #ff9e00;
      font-size: 12px;
      position: relative;
 }
  .neut::before {
      font-family: "Font Awesome 5 Pro";
      position: absolute;
      content: "\f11a";
      display: inline-block;
      left: -15px;
      top: 2px;
 }
  p.sentiment {
      font-size: 12px;
 }
  .mr-2 {
      margin-right: 0.55rem;
 }
  .pr-1 {
      padding-right: 0.25rem;
 }
  .progress {
      --bs-progress-height: 17px !important;
      --bs-progress-font-size: 0.1rem !important;
      --bs-progress-bg: transparent;
      --bs-progress-border-radius: 4px !important;
      --bs-progress-bar-color: #fff;
      --bs-progress-bar-bg: #1644C1 !important;

 }

.progress-bar{
  border-radius: 4px !important;
}

  .skinny .progress {
      --bs-progress-height: 8px !important;
      --bs-progress-font-size: 0.1rem !important;
      --bs-progress-bg: #e5e5e5 !important;
      --bs-progress-border-radius: 100px !important;

 }
  .skinny .progress-bar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      color: blue;
      text-align: center;
      white-space: nowrap;
 }
  .progress-label {
      color: #000000;
      font-size: 10px;
      font-weight: 300;
 }
  .positiveBlock {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #39800b;
      font-size: 14px;
      font-weight: 600;
      padding-left: 1em;
 }
  .positiveBlock:before {
      position: absolute;
      content: "";
      width: 5em;
      left: 0;
      z-index: 1;
      background-color: rgba(209, 236, 192, 0.5);
      height: 100%;
      min-height: 4em;
 }
  .negativeBlock:before {
      position: absolute;
      content: "";
      width: 5em;
      left: 0;
      z-index: 1;
      background-color: rgba(253, 182, 176, 0.5);
      height: 100%;
      min-height: 4em;
 }
  .negativeBlock {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #c7200a;
      font-size: 14px;
      font-weight: 600;
      padding-left: 1em;
 }
  .positiveBlock p, .negativeBlock p {
      position: relative;
      z-index: 2;
 }
  #tagInfo ul {
      margin: 0;
      display: flex;
      justify-content: flex-start;
      margin-left: -3.5em;
      flex-wrap: wrap;
 }
  #tagInfo li {
      list-style: none;
      margin-bottom: 0.2rem;
      margin-right: 0.2rem;
 }
  td div {
      position: relative;
 }
  .react-bootstrap-table table {
      table-layout: unset !important;
 }

 .btn.disabled, .btn:disabled, fieldset:disabled .btn {
     color: #CCCCCC;
     pointer-events: none;
     background-color: #F7F7F7;
     border-color: #CCCCCC;
        font-size: 13px !important;

   }

 .btn,
  .btn:active{
   color:#000000;
  background-color:transparent;
    border-color: #CCCCCC;
    font-size: 13px !important;
 }

 .form-control {
    display: block;
    width: 100%;
    padding: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: unset;
    background-color: unset;
    background-clip: padding-box;
    border: none !important;
   appearance: none;
    border-radius: unset;
    max-width: 25px;
    font-size: 13px !important;
    display: flex;
    justify-content: center;
}

 .form-control:focus{
   box-shadow:none
 }

 .form-select{
   max-width: 62px;

    max-height: 35px;
  font-size: 13px !important;
  padding:.5em 1em;
 }

.rightSide{
  min-width:15%;
}

  .avatar {
      width: 40px !important;
      height: 40px !important;
      border-radius: 50%;
      object-fit: cover;
      object-position: center right;
 }
  tr {
      border-bottom: 1px solid #d0d9e1;
 }
  td {
      display: flex !important;
      align-items: center;
 }
  .fixedHeight {
      height: 270px;
      overflow-y: scroll;
 }
  .bordered td {
      border-right: 1px solid #d0d9e1 !important;
      font-size: 12px !important;
      padding: 0.5rem;
      padding-left:1em;
      margin: 0;

    font-family: 'Roboto', sans-serif;
    position: relative;
 }
  .bordered td:first-child {
      border-left: 1px solid #d0d9e1 !important;
 }
  .bordered .positiveBlock:before, .bordered .negativeBlock:before {
    width: 198px;
    left: -6px;
    min-height:4em;

 }
  .unsetTable td {
      width: auto !important;
      min-width: 300px !important;
 }

.unsetTable .positiveBlock:before, .unsetTable .negativeBlock:before{
        min-width: 300px !important;
}


.hidePag{
  display:none
}


#spark3{
  display:none
}

.removeBars #spark2{
  display:none
}

.removeBars #spark3{
  display:block
}

.rightPag {
display: flex;
justify-content: flex-end;
}

.rightPag .rightSide {
    min-width: 15%;
    margin-top: 0.5em;
}

.rightPag .bottomPagination{
  flex-direction:column;
  justify-content:flex-end !important
}

  .unsetTable tr, .unsetTable th {
      width: auto !important;
      min-width: 300px !important;
 }

.fixAcross{
position: fixed;
width: 99%;
}


#vis {
    height: 100%;
    width: 100% !important;
    margin: unset !important;
    border: none;
    background:red !important
}

  thead {
      position: sticky;
      top: 0;
      z-index: 100;
 }
  .table {
    font-family: 'Roboto', sans-serif;
      display: inline-block;
      border-spacing: 0;
      .th {
          font-size: 12px;
          text-transform: capitalize;
          font-family: 'Roboto', sans-serif;
          text-align: left;
          border-right: 1px solid white;
          font-weight: 200;
     }
      .td {
          font-size: 12px !important;
          text-align: left;
      font-family: 'Roboto', sans-serif;
     }
      .th, .td {
          margin: 0;
          padding: 0.5rem;
          font-family: 'Roboto', sans-serif;
          position: relative;
     }
      .td:last-child {
          border-right: 0;
     }
      .resizer {
          display: inline-block;
          width: 10px;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          transform: translateX(50%);
          z-index: 1;
          touch-action: none;
          &.isResizing {
         }
     }
 }
  .footer-container {
      display: flex;
      text-align: center;
 }
  .button-previous {
      margin: 0;
      background: none;
      border-radius: 4px 0 0 4px;
      border: 1px solid #d0d9e1;
 }
  .button-next {
      background: none;
      border-radius: 0 4px 4px 0;
      border: 1px solid #d0d9e1;
 }
  button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
 }
  .input-page {
      height: 28px;
      margin: 0;
      background: none;
      text-align: center;
      border: 1px solid #d0d9e1;
 }

  .font-page-options {

      color: #A6A6A6 !important;
      font-weight: 100 !important;
      font-size: 13px !important;
      font-family: 'Roboto', sans-serif;
      min-width: 70%;
      margin-right:.5em;
      line-height:1
 }
  .button-page {
      margin-left: 10px;
      border: 1px solid #d0d9e1;
      appearance: none;
      width: 32px;
      text-align: center;
      border-radius: 4px;
 }


 .codes li {
   list-style-type: none;
       line-height: 22px;
       position: relative;
       padding-left: 26px;
       font-weight: 300;
       text-align: left;
       font-size: 13px;
       margin-bottom: 0em;
}

.codes li span {
  height: 10px;
    width: 10px;
    background: black;
    position: absolute;
    left: 10px;
    top: 6px;
    border-radius: 0px;

}
.codes.one li:nth-child(1) span {
    background-color: #1644C1;
}

.codes.one li:nth-child(2) span {
    background-color: #F1DE6E;
}

.codes.one li:nth-child(3) span {
    background-color: #efefef;
}

.across {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 1em;
    border-top: 1px solid #efefef;
    padding-top: 1em;
    padding-bottom: 1em;

}
.vertical{
  display: flex;
  justify-content: flex-start;
  flex-direction:column;

  min-width: 33.33%;

}

.h4, h4 {
    font-size: .9em;
}

.data{
  display:flex;
  margin-bottom:0rem;
  margin: 0em 1em;
  justify-content: center;
}

.big{
  display: flex;
    justify-content: center;
    font-size: 24px;
    align-items: center;
    padding-top: 2em;
}

span.green{
  color:#4CAF50
}

span.red{
  color:#F44336
}


span.red i {
    transform: rotate(180deg);
}

.padding-0{
  padding:0 !important
}

body, html{
  overflow-x:hidden
}

@media (min-width:768px){
      padding: 0em 1em;
}

@media (min-width:577px){
  h4{
  margin-top:.25rem
  }

  .data li{
    margin:0em .5em
  }
.progress {
  margin-top:.25rem

}
p.small{
  font-weight: 400 !important;
}
}

@media (max-width:576px){
h4{
  font-size:.8em
}

.progress {
    --bs-progress-height: 13px !important;
  }

p.small{
  font-size: 10px !important;
  margin-bottom: 0.25rem !important;

}

}

  `;

  return <StyledWrapper>{children}</StyledWrapper>;
};

function Table({ columns, data, config }) {

  var { titleText, listItem1, listItem2, listItem3, division, retail, duration, variance, progress, autonomous, manual, none } = config;

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 40,
      width: 200,
      maxWidth: 400,
    }),

    []
  );

const {
getTableProps,
getTableBodyProps,
headerGroups,
page,
nextPage,
previousPage,
canPreviousPage,
canNextPage,
pageOptions,
state,
gotoPage,
pageCount,
setPageSize,
prepareRow,
setHiddenColumns,
resetResizing,
  } = useTable (
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
      defaultColumn,
      disableSortRemove: true,
      defaultCanSort: true,
    },

    useSortBy,
    usePagination,
    useBlockLayout,
    useResizeColumns
  );



  const Content = config.division.split(",").map((d, i) => ({
  division: d,
  retail: config.retail.split(",")[i],
  duration: config.duration.split(",")[i],
  variance: config.variance.split(",")[i],
  progress:config.progress.split(",")[i],
  autonomous:config.autonomous.split(",")[i],
  manual:config.manual.split(",")[i],
  none:config.none.split(",")[i],


  }))



  const first = division.length > 0;
  const second = retail.length > 0;
  const third = duration.length > 0;
  const fourth = variance.length > 0;
  const fifth = progress.length > 0;
  const sixth = autonomous.length > 0;
  const seventh = manual.length > 0;
  const eighth = none.length > 0;
// 
//   console.log(first, second, third, fourth, fifth, sixth, seventh, eighth)
//
//
// console.log(config.duration)

if (!first && !second && !third  && !fourth  && !fifth  && !sixth  && !seventh  && !eighth) {

  return (

<div id="vis-container">
<h4 className="big"><b>Please select an option from each empty edit dropdown list on the right in order to display the visual.</b></h4>

</div>

)

}
  return (
    <>
<div id="vis-container">

<Container fluid className="padding-0 mb-5">
<Row>
    <div className="d-flex justify-content-between align-items-start mt-3">
      <h5 className="bold">{config.titleText}</h5>
      <ul className="codes one">
        <li>
        <span></span>
        {config.listItem1}
        </li>
        <li>
        <span></span>
         {config.listItem2}
        </li>
        <li>
        <span></span>
        {config.listItem3}
        </li>

      </ul>
    </div>


    <div>


    {Content.map((val, i) => (



    <div className="across mt-0">
    <div className="vertical">
    <p className="small">#{val.division} in your division</p>
    <h4>RETAIL MARKET {val.retail}</h4>

    </div>

    <div className="vertical">
    <div className="d-flex justify-content-between align-items-center">
      <p className="small">Daily Avg / Site</p>
      <p className="small">


      <span className="pe-2">{val.duration}</span>
      <span className={val.variance < 0 ? "red" : "green"}>



      <i class="fal fa-arrow-up"></i>&nbsp;{(parseFloat(val.variance).toFixed(2)) * 100}%</span></p>
    </div>
      <ProgressBar  now={val.progress} />

    </div>

    <div className="vertical">
      <ul className="codes one data">
        <li>
        <span></span>
        {val.autonomous}
        </li>
        <li>
        <span></span>
        {val.manual}
        </li>
        <li>
        <span></span>
        {val.none}
        </li>
     </ul>
    </div>

    </div>


    ))}






    </div>

</Row>
  </Container>



</div>

    </>
  );

}





const createLabel = (label) => {
  const splitByDot = label.split(".").join(" ");
  const splitByDash = splitByDot.split("_").join(" ");
  return splitByDash;
};



export const CustomTable = ({ data, element, config, queryResponse, details, done }) => {

var { titleText, listItem1, listItem2, listItem3, division, retail, duration, variance, progress, autonomous, manual, none } = config;



  const [firstData = {}] = data;
  let cols_to_hide = [];

  for (const [key, value] of Object.entries(firstData)) {
    if (key.split(".")[1] === "columns_to_hide") {
      cols_to_hide = firstData[key].value.split(",").map((e) => e.trim());
      break;
    }
  }

  cols_to_hide.map((col) => {
    delete firstData[col];
  });

  const data2 = useMemo(() => data, []);





  const columns = useMemo(
    () =>
      Object.keys(firstData).map((key) => {
        return {
          Header: createLabel(key),
          accessor: (d) => {
            return d[key].value
          },

          sortable: true,

          sortType: 'basic',
          // Cell: (  { row: { original } }) => {
          //   return original[key]?.rendered || original[key]?.value;
          // },
          Cell: ({ cell, value, row }) => {
            // const row = cell.row.original;
            return row.original[key]?.rendered || row.original[key]?.value;
          },
          headerClassName: "table-header1",
        };
      }),
    []
  );




  return (
    <Styles config={config}>
      <Table config={config} columns={columns} data={data} />
    </Styles>
  );
};
