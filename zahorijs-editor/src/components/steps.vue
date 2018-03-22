<template>
    <div id="utsStepsStack" class="uts-steps-stack {uts-to-left : toTheLeft }">

        <div class="uts-steps-stack-header">
            <!--<p class="uts-steps-stack-to-left" title="move editor to the left" onclick="{toLeft}" if="{!toTheLeft}">&#8647;</p>
            <p class="uts-steps-stack-to-left" title="move editor to the right" onclick="{toRight}" if="{toTheLeft}">&#8649;</p>-->
            <div class="uts-steps-stack-record-icon" title="restart guide edition" v-if="steps.length > 0 && !tours.isLoading && tours.stopRecord" onclick="{restartRecord}"><i class="fa fa-circle"></i></div>
            <div class="uts-steps-stack-record-icon" title="stop guide edition" v-if="steps.length > 0 && !tours.isLoading && !tours.stopRecord" onclick="{stopRecord}"><i class="fa fa-pause"></i></div>
            <div class="uts-steps-stack-play-icon" title="preview user tour" v-if="steps.length > 0 && !tours.isLoading" onclick="{play}"></div>
            <h2 class="uts-steps-stack-title">ZahoriJs guide editor</h2>
        </div>

        <div class="loading-div" v-if="tours.isLoading">loading</div>

        <!--<tour-manager id="tourManager" if="{!tours.isLoading}"></tour-manager>-->

        <ul class="uts-steps-stack__items" v-if="!isEditingTour && !isConfiguratingEditor && !tours.isLoading">
            <li class="uts-steps-stack__item" v-for="(item, index) in steps" onclick="{playOnlyOne}">
                <a class="uts-steps-stack__link" v-if="!item.deleting">{{item.title.es_ES}}</a>
                <div class="uts-steps-stack__buttons_wrapper" v-if="!item.deleting"><i class="fa fa-trash" title="delete step" data-deleting="true" onclick="{deleting}"></i><i class="fa fa-pencil" title="edit step" @click="editStep(index)">{{index}}edit</i></div>
                <a class="uts-steps-stack__link uts-steps-stack__link__deleting" v-if="item.deleting">Are you sure?</a>
                <div class="uts-steps-stack__buttons_wrapper uts-steps-stack__link__deleting" v-if="item.deleting"><span class="uts-ok" data-stepindex="{i}" onclick="{deleteStep}">YES</span><span class="uts-no" data-deleting="false" onclick="{deleting}">NO</span></div>
            </li>
        </ul>

        <div class="uts-steps-stack-footer" v-if="!isEditingTour && !isConfiguratingEditor">
            <div v-if="!tours.isLoading">
                <i class="fa fa-cog uts-to-right" title="configure app ID" onclick="{configureEditor.bind(this,true)}" v-if="!importingTour && showConfigButton"></i>
                <div v-if="tours.activeTour">
                <i class="fa fa-floppy-o" onclick="{saveSteps}" title="persist user tour in back" v-if="!importingTour && steps"> Save</i>

                <i class="fa  fa-cloud-download uts-to-right" title="export user tour to JSON" onclick="{exportTour}" v-if="!importingTour && (steps.length > 0)"></i>
                <i class="fa fa-cloud-upload uts-to-right" title="import user tour from JSON" onclick="{openImportTour}" v-if="!importingTour"></i>
                <i class="fa fa-ban cancel-upload" onclick="{closeImportTour}" if="{importingTour}"> Cancel</i>
                <div class="uts-steps-stack-import-tour" if="{importingTour}">
                    <input type="file" id="selectedFile" onchange="{importFile}" style="display:none" accept=".json"/>
                    <input type="button" value="Browse..." onclick="document.getElementById('selectedFile').click();" />
                </div>
                </div>
            </div>
        </div>

    </div>

  </template>

  <script>
  import store from '../store'
  export default {
    name: 'steps',
    data () {
      return {
        store,
        tours : {

        },
        isEditingTour : false,
        isConfiguratingEditor : false,
        importingTour: false,
        showConfigButton: false
      }
    },
    computed: {
      steps () {
        return this.$store.state.steps || []
      }
    },
    methods:{
      editStep(item){
        this.$emit('edit-step', item);
      }
    }
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .uts-steps-stack {
            height: initial;
            font-family: arial;
            cursor: pointer;
            position: fixed;
            z-index: 999999;
            width: 350px;
            background-color: white;
            box-shadow: 1px 1px 2px #cfcfcf;
            bottom: 20px;
            right: 20px;
            -webkit-box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            -moz-box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            box-shadow: 0 0 2px rgba(0,0,0,0.2);
            transition: all 0.5s;
        }

        .uts-steps-stack.uts-to-left{
            font-size: 16px;
            right: calc(100% - 380px);
            color: #ffffff;
        }

        .uts-steps-stack .uts-steps-stack-header {
          padding: 10px;
          text-align: center;
          border-bottom: 1px solid #EAEAEA;
          background-color: #2B2B2B;
          color: white;
          border: #2B2B2B;
        }

        .uts-steps-stack .uts-steps-stack-title{
          font-weight: initial;
          color: #ffffff;
          font-size: 16px!important;
          font-weight: bold;
          padding: 0;
          margin: 0!important;
        }

        .uts-steps-stack .uts-steps-stack-footer {
            min-height: 34px;
            font-family: arial;
            font-size: 14px;
            padding: 4px 12px;
            border-bottom: 1px solid #EAEAEA;
            background-color: #D3D3D3;
            color: white;
            cursor: default;
            border: 1px solid #B7B7B7;
        }

        .uts-steps-stack-footer i{
            color : #444444;
            cursor: pointer;
            margin-right: 20px;
        }

        .uts-steps-stack-footer i.uts-to-right{
          float: right;
          margin-right: 0;
          margin-left: 15px;
          margin-top: 5px;
        }

        .uts-steps-stack-footer i:hover{
            color: #000000;
        }

        .loading-div {
          height: 30px;
        }
        .uts-steps-stack-footer .cancel-upload{
          float: left;
      padding: 10px 0;
        }
        .uts-steps-stack-import-tour{
            padding: 3px;
        }

        .uts-steps-stack-import-tour textarea{
            margin: 0px 0px 10px;
            height: 72px;
            width: 100%;
            box-sizing: border-box;
            height: 100%;
            resize: none;
            display: none;
        }

        .uts-steps-stack-to-left{
            float: left;
            font-size: 16px!important;
            cursor: pointer;
            color: #ffffff;
        }

        .uts-steps-stack-to-right{
            float: left;
            font-size: 16px;
            cursor: pointer;
        }

        .uts-steps-stack--active {
            display: block;
        }
        .uts-steps-stack__items {
            list-style: none;
            margin: 0;
            padding: 0;
            max-height: 250px;
            overflow: auto;
            background-color: white;
        }
        .uts-steps-stack__item {
            display: block;
            margin-bottom: 4px;
            position: relative;
            width: 100%;
        }

        .uts-steps-stack__item:nth-child(even){
          background-color: #e2e2e2;
        }

        .uts-steps-stack__item:hover {
            background-color: #c1c1c1;
        }
        .uts-steps-stack__item:last-child {
            margin-bottom: 0;
        }
        .uts-steps-stack__link {
            display: block;
            padding: 4px 12px;
            color: #565656;
            text-decoration: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: calc(100% - 75px);
        }

        .uts-steps-stack__buttons_wrapper{
          color: #576AAA;
          position: absolute;
          top: 0;
          right: 0;
          width: 90px;
          text-align: right;
          padding: 4px 15px;
          visibility: hidden;
        }
        .uts-steps-stack__item:hover .uts-steps-stack__buttons_wrapper{
          visibility: visible;
        }
        .uts-steps-stack__buttons_wrapper i{
            margin-left: 15px;
        }
        .uts-steps-stack__buttons_wrapper .fa-trash{
          color: #E95F5F;
        }

        .uts-steps-stack__link.uts-steps-stack__link__deleting{
          color: #E95F5F;
        }

        .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting{
          visibility: visible;
          width: 140px;
        }

        .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting .uts-ok{
          color: #E95F5F;
        }

        .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting .uts-no{
          color: green;
          margin-right: 15px;
          margin-left: 30px;
        }

        .uts-steps-stack-play-icon {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 7.5px 0 7.5px 13.0px;
            border-color: transparent transparent transparent #ffffff;
            position: absolute;
            right: 15px;
            cursor: pointer;
        }

        .uts-steps-stack-record-icon {
            position: absolute;
            right: 46px;
            vertical-align: middle;
        }
        .uts-steps-stack-record-icon .fa-circle{
            color: red;
        }
        .uts-steps-stack-record-icon .fa-pause{
            color: white;
        }
  </style>
