var wrench = (function () {

    var dom = {};

    dom.TagName = {
        DIV: 'DIV',
        MAIN: 'MAIN',
        BUTTON: 'BUTTON',
        A: 'A',
        INPUT: 'INPUT',
        SPAN: 'SPAN',
        SECTION: 'SECTION',
        LABEL: 'LABEL',
        HEADER: 'HEADER',
        UL: 'UL',
        LI: 'LI',
        CANVAS: 'CANVAS',
        HR: 'HR',
        TABLE: 'TABLE',
        TBODY: 'TBODY',
        THEAD: 'THEAD',
        TR: 'TR',
        TH: 'TH',
        TD: 'TD',
        STRONG: 'STRONG',
        IMG: 'IMG',
        I: 'I',
        BR: 'BR'
    };

    dom.TagName.ErrorException = {
        InvalidType: 'Variable is an invalid DOM type',
        InvalidNode: 'Unable to append node',
        NotString: 'The given parameter isn\'t a string'
    };

    var createElement = function(type, opt_options){
        assert(type === dom.TagName[type], dom.TagName.ErrorException.InvalidType);

        var element = document.createElement(type);

        if(opt_options) {
            if (opt_options.src) element.src = opt_options.src;
            if (opt_options.id) element.id = opt_options.id;
            if (opt_options.class) element.className = opt_options.class;
            if (opt_options.text) element.innerHTML = opt_options.text;
            if (opt_options.name) element.name = opt_options.name;
            if (opt_options.value) element.value = opt_options.value;
            if (opt_options.checked) element.checked = opt_options.checked;
            if (opt_options.type) element.type = opt_options.type;
            if (opt_options.for) element.for = opt_options.for;
            if (opt_options.title) element.title = opt_options.title;

            for (var property in opt_options.style) {
                element.style[property] = opt_options.style[property];
            }

            if(opt_options.append) {
                assert((opt_options.append.nodeType > 0 || opt_options.append instanceof Array), dom.TagName.ErrorException.InvalidNode);
                if(opt_options.append instanceof Array){
                    for(var i=0; i<opt_options.append.length; i++)
                        appendChild(element,opt_options.append[i]);
                }else {
                    appendChild(element, opt_options.append);
                }
            }

            if(opt_options.appended) {
                assert(opt_options.appended.nodeType > 0, dom.TagName.ErrorException.InvalidNode);
                appendChild(opt_options.appended,element);
            }
        }

        return element;
    };

    var appendChild = function(parent,child){
        parent.appendChild(child);
    }

    var dome = function(){
        return dom;
    }

    var appendBeforeNode = function(newItem,node){
        this.appendChild(newItem, node);
    }

    var getChildren = function(node){
        return node.children;
    }

    var removeChildren = function(node){
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    var addToClassList = function(node,newClass){
        node.classList.add(newClass);
    }

    var getElementById = function(name){
        assert(typeof name === "string", dom.TagName.ErrorException.NotString);
        return document.getElementById(name);
    }

    var getElementsByClass = function(name){
        assert(typeof name === "string", dom.TagName.ErrorException.NotString);
        return document.getElementsByClassName(name);
    }

    var getFirstElementByClass = function(name){
        return getElementsByClass(name)[0];
    }

    var setProperties = function(element, properties){
        for (var property in properties) {
            if(property === 'class')
                element['className'] = properties[property];
            else
                element[property] = properties[property];
        }
    }

    var setStyle = function(element, properties){
        for (var property in properties) {
            element.style[property] = properties[property];
        }
    }

    var setText = function(element, text){
        element.innerHTML = text;
    }

    var assert = function (condition, message) {
        if (!condition) {
            message = message || "Assertion of DOM type failed";
            if (typeof Error !== "undefined") {
                throw new Error(message);
            }
            throw message; // Fallback
            //console.log(message);
        }
    }

    var string = {};

    string.contains = function(string, substring){
        if(string.indexOf(substring) > -1)
            return true;
        return false;
    }

    string.isEmpty = function(string){
        if(!string || string === "" || string.length === 0)
            return true;
        return false;
    }

    var array = {};

    arrayconcat = function(first, second){
        return first.concat(second);
    }

    return {
        dom: dom,
        createElement: createElement,
        appendChild: appendChild,
        appendBeforeNode: appendBeforeNode,
        getChildren: getChildren,
        removeChildren: removeChildren,
        addToClassList: addToClassList,
        getElementById: getElementById,
        getElementsByClass: getElementsByClass,
        getFirstElementByClass: getFirstElementByClass,
        setProperties: setProperties,
        setStyle: setStyle,
        setText: setText,
        stringContains: string.contains,
        stringIsEmpty: string.isEmpty,
        arrayConcat: arrayconcat
    };

})();