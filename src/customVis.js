import * as React from "react";
import * as ReactDOM from "react-dom";
import { CustomTable } from "./CustomTable";

looker.plugins.visualizations.add({

  create: function (element, config) {

  },

updateAsync: function (data, element, config, queryResponse, details, done) {





const { dimension_like: dimensionLike } = queryResponse.fields;

const dimensions = dimensionLike.map((dimension) => ({
   label: dimension.label_short ?? dimension.label,
   name: dimension.name


 }));



 const { measure_like: measureLike } = queryResponse.fields;


 const measures = measureLike.map((measure) => ({
   label: measure.label_short ?? measure.label,
   name: measure.name,
 }));

 console.log( measures)


console.log(dimensionLike, dimensions[0].name)

 // const fieldOptions = dimensions.map((dim) => ({
 //     [dim.label]: queryResponse.data.map(row => row[dim.name].value).join(",")
 //   }));


 const fieldOptions = [...dimensions, ...measures].map((dim) => ({
     [dim.label]: queryResponse.data.map(row => row[dim.name].value).join(",")
   }));


  console.log("not pulling value",fieldOptions)

if (!isNaN(fieldOptions )) {

console.log("this is a number")

}



    const options = {
      titleText: {
        type: "string",
        label: "Title Text",
        default: "Market Summary",
        display: "text",
        placeholder: "Market Summary",
        order: 1,
      },

      listItem1: {
        type: "string",
        label: "List Item 1",
        default: "Autonomous Sites",
        display: "text",
        placeholder: "Autonomous Sites",
        order: 2,
      },
      listItem2: {
        type: "string",
        label: "List Item 2",
        default: "Manual Only Sites",
        display: "text",
        placeholder: "Manual Only Sites",
        order: 3,
      },
      listItem3: {
        type: "string",
        label: "List Item 2",
        default: "No Usage Sites",
        display: "text",
        placeholder: "No Usage Sites",
        order: 4,
      },

      division: {
        type: "string",
        label: "Division Number",
        display: "select",
        placeholder: "Please Select",
        values: fieldOptions,
        order: 5,
        default:''
      },
      retail: {
        type: "string",
        label: "Retail Market ID",
        display: "select",
        values: fieldOptions,
        order: 6,
        default:''
      },
      duration: {
        type: "string",
        label: "Avg Site Duration",
        display: "select",
        values: fieldOptions,
        order: 7,
        default:''
      },
      variance: {
        type: "string",
        label: "Avg Site Change",
        display: "select",
        values: fieldOptions,
        order: 8,
        default:''
      },

      progress: {
        type: "string",
        label: "Progress Bar",

        display: "select",

        values: fieldOptions,
        order: 9,
        default:''
      },

      autonomous: {
        type: "string",
        label: "Autonomous Count",
        display: "select",
        values: fieldOptions,
        order: 10,
        default:''
      },
      manual: {
        type: "string",
        label: "Manual Count",
        display: "select",
        values: fieldOptions,
        order: 11,
        default:''
      },
      none: {
        type: "string",
        label: "No Usage Count",
        display: "select",
        values: fieldOptions,
        order: 12,
        default:''
      }




    }

    this.trigger('registerOptions', options) // register options with parent page to update visConfig





    ReactDOM.render(
      <CustomTable
        data={data}
        config={config}
        queryResponse={queryResponse}
        details={details}
        done={done}
      />,

      element
    );

  done()
  },
});
