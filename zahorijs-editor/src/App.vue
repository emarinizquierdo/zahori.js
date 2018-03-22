<template>

  <div id="zahorijs-editor">

    <pointer :active-step="activeStep" @add-step="_addStep"></pointer>

    <steps @edit-step="_editStep"></steps>
    <editor ref="editor" @close="_onCloseModal" ></editor>
  </div>
</template>

<script>

import Pointer from "@/components/pointer";
import Editor from "@/components/editor";
import Steps from "@/components/steps";

export default {
  name: 'App',
  data:function(){
    return {
      activeStep: false
    }
  },
  components:{
    Pointer,
    Editor,
    Steps
  },
  created(){
  },
  ready(){
  },
  methods:{
    _addStep(selector){
      this.activeStep = true;
      this.$refs.editor.add(selector);
    },
    _editStep(indexStep){
      this.activeStep = true;
      this.$refs.editor.edit(indexStep);
    },
    _onCloseModal(){
      this.activeStep = false;
    }
  }
}
</script>

<style>
/* fade ALL out on parent hover */


/* fade ONE in on hover */

.uts-highlight {
    box-shadow: 0 0 20px rgba(0, 0, 0, 1);
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
    outline: #0089ec dotted !important;
    outline-offset: -3px !important;
    opacity: 0.8;
    cursor: pointer;
}

#zahorijs-editor {
  position: fixed;
  right:0;
  bottom:0;
}

</style>
