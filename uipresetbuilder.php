<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Ui Inputs Preset Builder</title>

<link
rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
/>

<style>

body{
    margin:0;
    padding:30px;
    background:#f4f7fb;
    font-family:Arial, Helvetica, sans-serif;
}

.ui_inputs_preset_builder_v1_container{
    max-width:1600px;
    margin:auto;
}

.ui_inputs_preset_builder_v1_card{
    background:#ffffff;
    border-radius:30px;
    padding:28px;
    box-shadow:0 20px 60px rgba(0,0,0,0.08);
}

.ui_inputs_preset_builder_v1_topbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap:wrap;
    gap:15px;
    margin-bottom:25px;
}

.ui_inputs_preset_builder_v1_badge{
    background:#111827;
    color:#fff;
    display:inline-flex;
    align-items:center;
    gap:10px;
    padding:10px 18px;
    border-radius:999px;
    font-size:13px;
    font-weight:700;
}

.ui_inputs_preset_builder_v1_status{
    background:#ecfdf5;
    color:#065f46;
    padding:10px 18px;
    border-radius:14px;
    font-size:13px;
    font-weight:700;
}

.ui_inputs_preset_builder_v1_title{
    font-size:42px;
    font-weight:800;
    color:#111827;
    margin-bottom:10px;
}

.ui_inputs_preset_builder_v1_subtitle{
    font-size:15px;
    line-height:1.9;
    color:#6b7280;
    max-width:900px;
    margin-bottom:30px;
}

.ui_inputs_preset_builder_v1_toolbar{
    display:flex;
    flex-wrap:wrap;
    gap:12px;
    margin-bottom:25px;
}

.ui_inputs_preset_builder_v1_tool{
    border:none;
    background:#eef2ff;
    color:#3730a3;
    padding:12px 18px;
    border-radius:14px;
    cursor:pointer;
    font-size:13px;
    font-weight:700;
    transition:0.2s;
}

.ui_inputs_preset_builder_v1_tool:hover{
    transform:translateY(-2px);
    background:#dbeafe;
}

 
.ui_inputs_preset_builder_v1_grid{
    display:grid;
    grid-template-columns:1.5fr 1fr;
    gap:24px;
    margin-bottom:25px;
}


.ui_inputs_preset_builder_v1_box{
    background:#f8fafc;
    border-radius:24px;
    padding:22px;
}

.ui_inputs_preset_builder_v1_box_header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:18px;
    gap:10px;
}

.ui_inputs_preset_builder_v1_label{
    font-size:15px;
    font-weight:800;
    color:#111827;
}

.ui_inputs_preset_builder_v1_small{
    font-size:12px;
    color:#6b7280;
}

.ui_inputs_preset_builder_v1_textarea{
    width:100%;
    min-height:680px;
    border:none;
    outline:none;
    resize:vertical;
    border-radius:20px;
    background:#eef2f7;
    padding:20px;
    box-sizing:border-box;
    font-size:14px;
    line-height:1.9;
    font-family:Consolas, monospace;
    color:#111827;
}

.ui_inputs_preset_builder_v1_preview{
    background:#0f172a;
    border-radius:22px;
    padding:22px;
    min-height:680px;
    box-sizing:border-box;
    overflow:auto;
}

.ui_inputs_preset_builder_v1_form_group{
    margin-bottom:20px;
}

.ui_inputs_preset_builder_v1_form_label{
    display:block;
    color:#f8fafc;
    margin-bottom:10px;
    font-size:13px;
    font-weight:700;
}

.ui_inputs_preset_builder_v1_input,
.ui_inputs_preset_builder_v1_select,
.ui_inputs_preset_builder_v1_textarea_preview{
    width:100%;
    border:none;
    outline:none;
    background:#1e293b;
    color:#fff;
    border-radius:16px;
    padding:14px 16px;
    box-sizing:border-box;
    font-size:14px;
}

.ui_inputs_preset_builder_v1_textarea_preview{
    min-height:120px;
    resize:none;
}

.ui_inputs_preset_builder_v1_upload{
    border:2px dashed rgba(255,255,255,0.18);
    border-radius:20px;
    padding:30px;
    text-align:center;
    color:#cbd5e1;
    background:rgba(255,255,255,0.03);
}

.ui_inputs_preset_builder_v1_upload_icon{
    font-size:28px;
    margin-bottom:12px;
}

.ui_inputs_preset_builder_v1_upload_text{
    font-size:13px;
    line-height:1.7;
}

.ui_inputs_preset_builder_v1_output{
    width:100%;
    min-height:680px;
    border:none;
    outline:none;
    resize:vertical;
    border-radius:20px;
    background:#111827;
    padding:20px;
    box-sizing:border-box;
    font-size:13px;
    line-height:1.9;
    font-family:Consolas, monospace;
    color:#d1fae5;
}

.ui_inputs_preset_builder_v1_tabs{
    display:flex;
    flex-wrap:wrap;
    gap:10px;
    margin-bottom:18px;
}

.ui_inputs_preset_builder_v1_tab{
    background:#e2e8f0;
    color:#334155;
    padding:10px 16px;
    border-radius:12px;
    font-size:13px;
    font-weight:700;
    cursor:pointer;
}

.ui_inputs_preset_builder_v1_tab_active{
    background:#111827;
    color:#fff;
}

.ui_inputs_preset_builder_v1_actions{
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    gap:15px;
    margin-top:25px;
}

.ui_inputs_preset_builder_v1_btn{
    border:none;
    outline:none;
    padding:15px 24px;
    border-radius:16px;
    cursor:pointer;
    font-size:14px;
    font-weight:700;
    color:#fff;
    display:flex;
    align-items:center;
    gap:10px;
    transition:0.2s;
}

.ui_inputs_preset_builder_v1_btn:hover{
    transform:translateY(-2px);
}

.ui_inputs_preset_builder_v1_btn_generate{
    background:#111827;
}

.ui_inputs_preset_builder_v1_btn_copy{
    background:#2563eb;
}

.ui_inputs_preset_builder_v1_btn_download{
    background:#059669;
}

.ui_inputs_preset_builder_v1_btn_clear{
    background:#dc2626;
}

.ui_inputs_preset_builder_v1_examples{
    margin-top:30px;
    background:#eef2ff;
    border-radius:24px;
    padding:24px;
}

.ui_inputs_preset_builder_v1_examples_title{
    font-size:16px;
    font-weight:800;
    color:#111827;
    margin-bottom:18px;
}

.ui_inputs_preset_builder_v1_code{
    display:block;
    background:#fff;
    border-radius:16px;
    padding:18px;
    margin-bottom:16px;
    font-size:13px;
    line-height:1.9;
    overflow:auto;
    font-family:Consolas, monospace;
}

@media(max-width:1300px){

    .ui_inputs_preset_builder_v1_grid{
        grid-template-columns:1fr;
    }

}

@media(max-width:768px){

    body{
        padding:15px;
    }

    .ui_inputs_preset_builder_v1_title{
        font-size:32px;
    }

    .ui_inputs_preset_builder_v1_actions{
        flex-direction:column;
    }

    .ui_inputs_preset_builder_v1_btn{
        width:100%;
        justify-content:center;
    }

}

</style>
</head>
<body>

<div class="ui_inputs_preset_builder_v1_container">

    <div class="ui_inputs_preset_builder_v1_card">

        <!-- TOPBAR -->

        <div class="ui_inputs_preset_builder_v1_topbar">

            <div class="ui_inputs_preset_builder_v1_badge">
                <i class="fa fa-layer-group"></i>
                Ui Inputs Preset Builder
            </div>

            <div class="ui_inputs_preset_builder_v1_status">
                <i class="fa fa-check-circle"></i>
                12 Presets Parsed
            </div>

        </div>

        <!-- TITLE -->

        <div class="ui_inputs_preset_builder_v1_title">
            UI Input Metadata Compiler
        </div>

        <div class="ui_inputs_preset_builder_v1_subtitle">
            Convert lightweight preset syntax into dynamic UI configurations,
            form builders, dropdown mappings, image inputs, rename presets,
            and reusable Elforge metadata architecture.
        </div>

        <!-- TOOLBAR -->

        <div class="ui_inputs_preset_builder_v1_toolbar">

            <button class="ui_inputs_preset_builder_v1_tool">
                + Images
            </button>

            <button class="ui_inputs_preset_builder_v1_tool">
                + Dropdown
            </button>

            <button class="ui_inputs_preset_builder_v1_tool">
                + Dynamic DD
            </button>

            <button class="ui_inputs_preset_builder_v1_tool">
                + Rename
            </button>

            <button class="ui_inputs_preset_builder_v1_tool">
                + Textarea
            </button>

            <button class="ui_inputs_preset_builder_v1_tool">
                + Password
            </button>

            <button class="ui_inputs_preset_builder_v1_tool">
                + Date
            </button>

            <button class="ui_inputs_preset_builder_v1_tool">
                + Currency
            </button>

            <button class="ui_inputs_preset_builder_v1_tool">
                + AI Generate
            </button>

        </div>

        <!-- GRID -->

        <div class="ui_inputs_preset_builder_v1_grid">

            <!-- INPUT -->

            <div class="ui_inputs_preset_builder_v1_box">

                <div class="ui_inputs_preset_builder_v1_box_header">

                    <div class="ui_inputs_preset_builder_v1_label">
                        Preset DSL Input
                    </div>

                    <div class="ui_inputs_preset_builder_v1_small">
                        Elforge Syntax
                    </div>

                </div>

<textarea
class="ui_inputs_preset_builder_v1_textarea"
placeholder="Type presets here..."
>

@img:product_image,service_image

@dropdowns:
payment_method|Mobile,Cash,Cheque
status|Pending,Paid,Cancelled

@rename:
unit_price:Selling Price
qty:Quantity

@dynamicDD:
currency_code
supplier_id
tax_percentage

@textarea:
description
remarks

</textarea>

            </div>

            <!-- PREVIEW -->

            <!-- OUTPUT -->

            <div class="ui_inputs_preset_builder_v1_box">

                <div class="ui_inputs_preset_builder_v1_box_header">

                    <div class="ui_inputs_preset_builder_v1_label">
                        Generated Preset Output
                    </div>

                    <div class="ui_inputs_preset_builder_v1_small">
                        PHP / JSON / React
                    </div>

                </div>

                <!-- TABS -->

                <div class="ui_inputs_preset_builder_v1_tabs">

                    <div class="ui_inputs_preset_builder_v1_tab ui_inputs_preset_builder_v1_tab_active">
                        PHP
                    </div>

                    <div class="ui_inputs_preset_builder_v1_tab">
                        JSON
                    </div>

                    <div class="ui_inputs_preset_builder_v1_tab">
                        React
                    </div>

                    <div class="ui_inputs_preset_builder_v1_tab">
                        DNAAF
                    </div>

                </div>

<textarea class="ui_inputs_preset_builder_v1_output">

"image_columns" => [

    "product_image",
    "service_image"

],

"static_drop_down_array" => [

    "payment_method" => "Mobile,Cash,Cheque"

],

"rename_cols_array" => [

    "unit_price" => "Selling Price",
    "qty" => "Quantity"

],

"dynamic_drop_down_array" => [

    "currency_code" => "currencies",
    "supplier_id" => "suppliers"

],

"textarea_array" => [

    "description",
    "remarks"

]

</textarea>

            </div>

        </div>

        <!-- ACTIONS -->

        <div class="ui_inputs_preset_builder_v1_actions">

            <button
            class="ui_inputs_preset_builder_v1_btn ui_inputs_preset_builder_v1_btn_generate"
            >
                <i class="fa fa-bolt"></i>
                Generate Presets
            </button>

            <button
            class="ui_inputs_preset_builder_v1_btn ui_inputs_preset_builder_v1_btn_copy"
            >
                <i class="fa fa-copy"></i>
                Copy Output
            </button>

            <button
            class="ui_inputs_preset_builder_v1_btn ui_inputs_preset_builder_v1_btn_download"
            >
                <i class="fa fa-download"></i>
                Download Config
            </button>

            <button
            class="ui_inputs_preset_builder_v1_btn ui_inputs_preset_builder_v1_btn_clear"
            >
                <i class="fa fa-trash"></i>
                Clear
            </button>

        </div>

        <!-- EXAMPLES -->

        <div class="ui_inputs_preset_builder_v1_examples">

            <div class="ui_inputs_preset_builder_v1_examples_title">
                Preset DSL Examples
            </div>

            <span class="ui_inputs_preset_builder_v1_code">

@img:product_image,service_image<br><br>

@dropdowns:<br>
payment_method|Mobile,Cash,Cheque<br>
status|Pending,Paid,Cancelled

            </span>

            <span class="ui_inputs_preset_builder_v1_code">

@rename:<br>
unit_price:Selling Price<br>
qty:Quantity<br><br>

@dynamicDD:<br>
currency_code<br>
supplier_id

            </span>

        </div>

    </div>

</div>
<script>

/*
|--------------------------------------------------------------------------
| STORAGE
|--------------------------------------------------------------------------
*/

const presetBuilderStorageKey =
    "ui_inputs_preset_builder_v1";

/*
|--------------------------------------------------------------------------
| ELEMENTS
|--------------------------------------------------------------------------
*/

const presetInput =
    document.querySelector(
        ".ui_inputs_preset_builder_v1_textarea"
    );

const presetOutput =
    document.querySelector(
        ".ui_inputs_preset_builder_v1_output"
    );

const presetPreview =
    document.querySelector(
        ".ui_inputs_preset_builder_v1_preview"
    );

const presetStatus =
    document.querySelector(
        ".ui_inputs_preset_builder_v1_status"
    );

/*
|--------------------------------------------------------------------------
| RESTORE STORAGE
|--------------------------------------------------------------------------
*/

window.addEventListener(
    "DOMContentLoaded",
    function(){

        const savedData =
            localStorage.getItem(
                presetBuilderStorageKey
            );

        if(savedData){

            presetInput.value =
                savedData;

        }

        generatePresetOutput();

    }
);

/*
|--------------------------------------------------------------------------
| AUTO SAVE
|--------------------------------------------------------------------------
*/

presetInput.addEventListener(
    "input",
    function(){

        localStorage.setItem(

            presetBuilderStorageKey,

            presetInput.value

        );

        generatePresetOutput();

    }
);

/*
|--------------------------------------------------------------------------
| GENERATE PRESET OUTPUT
|--------------------------------------------------------------------------
*/

function generatePresetOutput()
{

    const rawInput =
        presetInput.value;

    /*
    |--------------------------------------------------------------------------
    | SPLIT LINES
    |--------------------------------------------------------------------------
    */

    const lines =
        rawInput
        .split("\n");

    /*
    |--------------------------------------------------------------------------
    | STORAGE
    |--------------------------------------------------------------------------
    */

    const presetData = {

        image_columns : [],
        textarea_array : [],
        content_editable : [],
        password_columns : [],
        date_columns : [],
        datetime_columns : [],
        hidden_inputs : [],
        sum_cols_list : [],
        title_columns : [],

        static_drop_down_array : {},

        dynamic_drop_down_array : {},

        rename_cols_array : {},

        desired_column_order : [],

        rename_tables_array : {}

    };

    /*
    |--------------------------------------------------------------------------
    | ACTIVE MODE
    |--------------------------------------------------------------------------
    */

    let activeSection = "";

    /*
    |--------------------------------------------------------------------------
    | LOOP
    |--------------------------------------------------------------------------
    */

    lines.forEach(function(rawLine){

        const line =
            rawLine.trim();

        /*
        |--------------------------------------------------------------------------
        | SKIP EMPTY
        |--------------------------------------------------------------------------
        */

        if(line === ""){

            return;

        }

        /*
        |--------------------------------------------------------------------------
        | IMG
        |--------------------------------------------------------------------------
        */

        if(line.startsWith("@img:")){

            activeSection = "";

            const values =
                line
                .replace("@img:","")
                .split(",");

            values.forEach(function(item){

                item = item.trim();

                if(item){

                    presetData.image_columns.push(item);

                }

            });

        }

        /*
        |--------------------------------------------------------------------------
        | TEXTAREA
        |--------------------------------------------------------------------------
        */

        else if(line.startsWith("@textarea:")){

            activeSection = "";

            const values =
                line
                .replace("@textarea:","")
                .split(",");

            values.forEach(function(item){

                item = item.trim();

                if(item){

                    presetData.textarea_array.push(item);

                }

            });

        }

        /*
        |--------------------------------------------------------------------------
        | EDITABLE
        |--------------------------------------------------------------------------
        */

        else if(line.startsWith("@editable:")){

            activeSection = "";

            const values =
                line
                .replace("@editable:","")
                .split(",");

            values.forEach(function(item){

                item = item.trim();

                if(item){

                    presetData.content_editable.push(item);

                }

            });

        }

        /*
        |--------------------------------------------------------------------------
        | PASSWORD
        |--------------------------------------------------------------------------
        */

        else if(line.startsWith("@password:")){

            activeSection = "";

            const values =
                line
                .replace("@password:","")
                .split(",");

            values.forEach(function(item){

                item = item.trim();

                if(item){

                    presetData.password_columns.push(item);

                }

            });

        }

        /*
        |--------------------------------------------------------------------------
        | DATE
        |--------------------------------------------------------------------------
        */

        else if(line.startsWith("@date:")){

            activeSection = "";

            const values =
                line
                .replace("@date:","")
                .split(",");

            values.forEach(function(item){

                item = item.trim();

                if(item){

                    presetData.date_columns.push(item);

                }

            });

        }

        /*
        |--------------------------------------------------------------------------
        | DATETIME
        |--------------------------------------------------------------------------
        */

        else if(line.startsWith("@datetime:")){

            activeSection = "";

            const values =
                line
                .replace("@datetime:","")
                .split(",");

            values.forEach(function(item){

                item = item.trim();

                if(item){

                    presetData.datetime_columns.push(item);

                }

            });

        }

        /*
        |--------------------------------------------------------------------------
        | HIDDEN
        |--------------------------------------------------------------------------
        */

        else if(line.startsWith("@hidden:")){

            activeSection = "";

            const values =
                line
                .replace("@hidden:","")
                .split(",");

            values.forEach(function(item){

                item = item.trim();

                if(item){

                    presetData.hidden_inputs.push(item);

                }

            });

        }

        /*
        |--------------------------------------------------------------------------
        | SUM
        |--------------------------------------------------------------------------
        */

        else if(line.startsWith("@sum:")){

            activeSection = "";

            const values =
                line
                .replace("@sum:","")
                .split(",");

            values.forEach(function(item){

                item = item.trim();

                if(item){

                    presetData.sum_cols_list.push(item);

                }

            });

        }

        /*
        |--------------------------------------------------------------------------
        | TITLE
        |--------------------------------------------------------------------------
        */

        else if(line.startsWith("@title:")){

            activeSection = "";

            const values =
                line
                .replace("@title:","")
                .split(",");

            values.forEach(function(item){

                item = item.trim();

                if(item){

                    presetData.title_columns.push(item);

                }

            });

        }

        /*
        |--------------------------------------------------------------------------
        | DROPDOWNS
        |--------------------------------------------------------------------------
        */

        else if(line.startsWith("@dropdowns:")){

            activeSection = "dropdowns";

        }

        /*
        |--------------------------------------------------------------------------
        | DYNAMIC DD
        |--------------------------------------------------------------------------
        */

        else if(line.startsWith("@dynamicDD:")){

            activeSection = "";

            const values =
                line
                .replace("@dynamicDD:","")
                .split(",");

            values.forEach(function(item){

                item = item.trim();

                if(item){

                    presetData.dynamic_drop_down_array[item] =
                        item + "s";

                }

            });

        }

        /*
        |--------------------------------------------------------------------------
        | RENAME
        |--------------------------------------------------------------------------
        */

        else if(line.startsWith("@rename:")){

            activeSection = "rename";

        }

        /*
        |--------------------------------------------------------------------------
        | ORDER
        |--------------------------------------------------------------------------
        */

        else if(line.startsWith("@order:")){

            activeSection = "order";

        }

        /*
        |--------------------------------------------------------------------------
        | RENAME TABLE
        |--------------------------------------------------------------------------
        */

        else if(line.startsWith("@renameTable:")){

            activeSection = "renameTable";

        }

        /*
        |--------------------------------------------------------------------------
        | DROPDOWN ITEMS
        |--------------------------------------------------------------------------
        */

        else if(activeSection === "dropdowns"){

            const splitLine =
                line.split("|");

            const field =
                (splitLine[0] || "").trim();

            const values =
                (splitLine[1] || "").trim();

            if(field && values){

                presetData.static_drop_down_array[field] =
                    values;

            }

        }

        /*
        |--------------------------------------------------------------------------
        | RENAME ITEMS
        |--------------------------------------------------------------------------
        */

        else if(activeSection === "rename"){

            const splitLine =
                line.split(":");

            const field =
                (splitLine[0] || "").trim();

            const label =
                (splitLine[1] || "").trim();

            if(field && label){

                presetData.rename_cols_array[field] =
                    label;

            }

        }

        /*
        |--------------------------------------------------------------------------
        | ORDER ITEMS
        |--------------------------------------------------------------------------
        */

        else if(activeSection === "order"){

            presetData.desired_column_order.push(
                line
            );

        }

        /*
        |--------------------------------------------------------------------------
        | RENAME TABLE ITEMS
        |--------------------------------------------------------------------------
        */

        else if(activeSection === "renameTable"){

            const splitLine =
                line.split(":");

            const field =
                (splitLine[0] || "").trim();

            const label =
                (splitLine[1] || "").trim();

            if(field && label){

                presetData.rename_tables_array[field] =
                    label;

            }

        }

    });

    /*
    |--------------------------------------------------------------------------
    | OUTPUT GENERATOR
    |--------------------------------------------------------------------------
    */

    let output = "";

    /*
    |--------------------------------------------------------------------------
    | SIMPLE ARRAY GENERATOR
    |--------------------------------------------------------------------------
    */

    function generateSimpleArray(
        title,
        arrayData
    ){

        if(arrayData.length === 0){

            return "";

        }

        let html =
`"${title}" => [

`;

        arrayData.forEach(function(item){

            html +=
`    "${item}",

`;

        });

        html +=
`],

`;

        return html;

    }

    /*
    |--------------------------------------------------------------------------
    | OBJECT GENERATOR
    |--------------------------------------------------------------------------
    */

    function generateObjectArray(
        title,
        objectData
    ){

        const keys =
            Object.keys(objectData);

        if(keys.length === 0){

            return "";

        }

        let html =
`"${title}" => [

`;

        keys.forEach(function(key){

            html +=
`    "${key}" => "${objectData[key]}",

`;

        });

        html +=
`],

`;

        return html;

    }

    /*
    |--------------------------------------------------------------------------
    | BUILD OUTPUT
    |--------------------------------------------------------------------------
    */

    output += generateSimpleArray(
        "image_columns",
        presetData.image_columns
    );

    output += generateSimpleArray(
        "textarea_array",
        presetData.textarea_array
    );

    output += generateSimpleArray(
        "content_editable",
        presetData.content_editable
    );

    output += generateSimpleArray(
        "password_columns",
        presetData.password_columns
    );

    output += generateSimpleArray(
        "date_columns",
        presetData.date_columns
    );

    output += generateSimpleArray(
        "datetime_columns",
        presetData.datetime_columns
    );

    output += generateSimpleArray(
        "hidden_inputs",
        presetData.hidden_inputs
    );

    output += generateSimpleArray(
        "sum_cols_list",
        presetData.sum_cols_list
    );

    output += generateSimpleArray(
        "title_columns",
        presetData.title_columns
    );

    output += generateObjectArray(
        "static_drop_down_array",
        presetData.static_drop_down_array
    );

    output += generateObjectArray(
        "dynamic_drop_down_array",
        presetData.dynamic_drop_down_array
    );

    output += generateObjectArray(
        "rename_cols_array",
        presetData.rename_cols_array
    );

    output += generateObjectArray(
        "rename_tables_array",
        presetData.rename_tables_array
    );

    /*
    |--------------------------------------------------------------------------
    | ORDER
    |--------------------------------------------------------------------------
    */

    if(
        presetData.desired_column_order.length > 0
    ){

        output +=
`"desired_column_order" => [

`;

        presetData.desired_column_order.forEach(
            function(item){

                output +=
`    "${item}",

`;

            }
        );

        output +=
`],

`;

    }

    /*
    |--------------------------------------------------------------------------
    | SET OUTPUT
    |--------------------------------------------------------------------------
    */

      presetOutput.value =
      `<?php

      $global_app_ui_presets = [

      ${output}

      ];

      ?>`;

    /*
    |--------------------------------------------------------------------------
    | STATUS
    |--------------------------------------------------------------------------
    */

    const totalParsed =
        Object.keys(
            presetData
        ).length;

    presetStatus.innerHTML =
`
<i class="fa fa-check-circle"></i>
${totalParsed} Preset Sections Parsed
`;

}

/*
|--------------------------------------------------------------------------
| BUTTON EVENTS
|--------------------------------------------------------------------------
*/

document
.querySelector(
    ".ui_inputs_preset_builder_v1_btn_generate"
)
.addEventListener(
    "click",
    generatePresetOutput
);

/*
|--------------------------------------------------------------------------
| COPY
|--------------------------------------------------------------------------
*/

document
.querySelector(
    ".ui_inputs_preset_builder_v1_btn_copy"
)
.addEventListener(
    "click",
    function(){

        navigator.clipboard.writeText(
            presetOutput.value
        );

        alert(
            "Preset output copied successfully."
        );

    }
);

/*
|--------------------------------------------------------------------------
| CLEAR
|--------------------------------------------------------------------------
*/

document
.querySelector(
    ".ui_inputs_preset_builder_v1_btn_clear"
)
.addEventListener(
    "click",
    function(){

        presetInput.value = "";

        presetOutput.value = "";

        localStorage.removeItem(
            presetBuilderStorageKey
        );

    }
);

/*
|--------------------------------------------------------------------------
| DOWNLOAD
|--------------------------------------------------------------------------
*/

document
.querySelector(
    ".ui_inputs_preset_builder_v1_btn_download"
)
.addEventListener(
    "click",
    function(){

        const blob =
            new Blob(
                [presetOutput.value],
                {
                    type:"text/plain"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const a =
            document.createElement("a");

        a.href = url;

        a.download =
            "preset-config.txt";

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(url);

    }
);

/*
|--------------------------------------------------------------------------
| AUTO START
|--------------------------------------------------------------------------
*/

generatePresetOutput();

</script>
  
</body>
</html>