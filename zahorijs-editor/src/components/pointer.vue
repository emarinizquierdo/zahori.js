<template>
<div>{{activeStep}}</div>
</template>
<script>
import utils from "./utils.js";

export default {
  name: 'pointer',
  props: ['activeStep'],
  data () {
    return {
      currentSelector : null
    }
  },
  created(){
    this.CONTEXT_UTS_HIGHLIGHT_CLASS = "uts-highlight";

    //modalEditor = this.parent.tags['modal-editor'];
    this.mouseListener();
    this.clickListener();
  },
  methods:{
    /**
     * Method that listen mouse event and apply in elements a class
     * to highlight them
     * @return {NA} NA
     */
    mouseListener(){

        document.addEventListener('mouseover', function(event) {

            // TODO: uncomment this lines:
            if(this.activeStep){/* || this.tours.isLoading || this.tours.stopRecord ){*/
              return;
            }

            var selector = utils.getCSSPath(event.target);

            if (selector) {

                if(utils.checkIfIsUTS(event.path)){
                  return;
                }

                var element = document.querySelector(selector/*.replace(/([0-9])/ig,"\\\\3$1")*/);

                if(element){
                    element.className = element.className + " uts-highlight";


                    var removeLayer = function(e) {

                        if (e.target) {
                            e.target.className = e.target.className.replace(" uts-highlight", "");
                            e.target.removeEventListener('mouseout', removeLayer);
                        }

                    }

                    element.addEventListener('mouseout', removeLayer);

                }

            }

        }.bind(this));

    },

    /**
     * Method that listen for click mouse event and extract the DOM element selector
     * wich is necessary for indentify it
     * @return {NA} NA
     */
    clickListener() {

        document.addEventListener("click", function(e) {

          if (e.target.className.indexOf(this.CONTEXT_UTS_HIGHLIGHT_CLASS) >= 0) {
              e.stopPropagation();
              e.preventDefault();
              this.currentSelector = utils.getCSSPath(e.target).replace('.' + this.CONTEXT_UTS_HIGHLIGHT_CLASS, '');
              this.addSimpleStep(this.currentSelector);
          }

        }.bind(this), true);
    },

    /**
     * Method that open modalEditor component.
     */
    addSimpleStep(){
        this.$emit('add-step', this.currentSelector);
    }
  }
}
</script>
