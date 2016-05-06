(function(window){

    'use strict';

    function define_library(){
        var SomeLibrary = {};

        SomeLibrary.dom = {};

        SomeLibrary.dom.TagName = {
            DIV: 'div',
            MAIN: 'main',
            BUTTON: 'button',
            A: 'a',
            INPUT: 'input',
            SPAN: 'span',
            SECTION: 'section',
            LABEL: 'label',
            HEADER: 'header',
            UL: 'ul',
            LI: 'li',
            CANVAS: 'canvas',
            HR: 'hr',
            TABLE: 'table',
            TBODY: 'tbody',
            THEAD: 'thead',
            TR: 'tr',
            TH: 'th',
            TD: 'td',
            STRONG: 'strong',
            IMG: 'img'
        }

        SomeLibrary.dom.TagName.ErrorException={
            InvalidType: 'Variable is an invalid DOM type',
            InvalidNode: 'Unable to append node',
            NotString: 'The given parameter isn\'t a string'
        }

        SomeLibrary.createElement = function(type, opt_options){
            var element = document.createElement(type);

            assert(typeof SomeLibrary.dom.TagName[type] === "string", SomeLibrary.dom.TagName.ErrorException.InvalidType);

            if(opt_options) {
                if (opt_options.id) element.id = opt_options.id;
                if (opt_options.class) element.className = opt_options.class;
                if (opt_options.text) element.innerHTML = opt_options.text;
                if (opt_options.name) element.name = opt_options.name;
                if (opt_options.value) element.value = opt_options.value;
                if (opt_options.checked) element.checked = opt_options.checked;
                if (opt_options.type) element.type = opt_options.type;
                if (opt_options.for) element.for = opt_options.for;

                for (var property in opt_options.style) {
                    element.style[property] = opt_options.style[property];
                }

                if(opt_options.append) {
                    assert((opt_options.append.nodeType > 0 || opt_options.append instanceof Array), SomeLibrary.dom.TagName.ErrorException.InvalidNode);
                    if(opt_options.append instanceof Array){
                        for(var i=0; i<opt_options.append.length; i++)
                            SomeLibrary.appendChild(element,opt_options.append[i]);
                    }else {
                        SomeLibrary.appendChild(element, opt_options.append);
                    }
                }

                if(opt_options.appended) {
                    assert(opt_options.appended.nodeType > 0, SomeLibrary.dom.TagName.ErrorException.InvalidNode);
                    SomeLibrary.appendChild(opt_options.appended,element);
                }
            }

            return element;
        }

        SomeLibrary.appendChild = function(parent,child){
            parent.appendChild(child);
        }

        SomeLibrary.appendBeforeNode = function(newItem,node){
            this.appendChild(newItem, node);
        }

        SomeLibrary.getChildren = function(node){
            return node.children;
        }

        SomeLibrary.removeChildren = function(node){
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        }

        SomeLibrary.addToClassList = function(node,newClass){
            node.classList.add(newClass);
        }

        SomeLibrary.getElementById = function(name){
            assert(typeof name === "string", SomeLibrary.dom.TagName.ErrorException.NotString);
            return document.getElementById(name);
        }

        SomeLibrary.getElementsByClass = function(name){
            assert(typeof name === "string", SomeLibrary.dom.TagName.ErrorException.NotString);
            return document.getElementsByClassName(name);
        }

        SomeLibrary.getFirstElementByClass = function(name){
            return SomeLibrary.getElementsByClass(name)[0];
        }

        SomeLibrary.setProperties = function(element, properties){
            for (var property in properties) {
                if(property === 'class')
                    element['className'] = properties[property];
                else
                    element[property] = properties[property];
            }
        }

        SomeLibrary.setStyle = function(element, properties){
            for (var property in properties) {
                element.style[property] = properties[property];
            }
        }

        SomeLibrary.setText = function(element, text){
            element.innerHTML = text;
        }

        function assert(condition, message) {
            if (!condition) {
                message = message || "Assertion of DOM type failed";
                if (typeof Error !== "undefined") {
                    throw new Error(message);
                }
                throw message; // Fallback
                //console.log(message);
            }
        }

        SomeLibrary.string = {};

        SomeLibrary.string.contains = function(string, substring){
            if(string.indexOf(substring) > -1)
                return true;
            return false;
        }

        SomeLibrary.array = {};

        SomeLibrary.array.concat = function(first, second){
            return first.concat(second);
        }

        return SomeLibrary;
    }

    if(typeof(SomeLibrary) === 'undefined'){
        window.SomeLibrary = define_library();
    }
    else{
        console.log("Library already defined.");
    }
})(window);