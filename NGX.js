(function(){
    var NGX = {
        elements:[],
        ready:function(callback){            
            var checkDOM = setInterval(function(){ 
                if(document.readyState === "complete"){
                    $ = NGX.selector;
                    clearInterval(checkDOM);                    
                    callback();
                }
            },50);			
        },
        selector: function ( selector ) {                        
            var selectors = selector.split( ',' );
            NGX.elements = [];
            var c = selectors.length;
            while(c--){
                var selector = NGX.trim(selectors[c]), TmpElements = [];
                if (selector.substr(0,1) == '#') {
                    NGX.elements.push(NGX.getById(selector.substr(1)));
                }else if( selector.substr(0,1) == '.'){
                    TmpElements = NGX.getByClass(selector.substr(1));
                    NGX.elements = NGX.elements.concat(TmpElements);                    
                }else{
                    TmpElements = document.getElementsByTagName(selector);
                    var tc = TmpElements.length;
                    while(tc--){
                        NGX.elements.push(TmpElements[tc]);
                    }
                }
            }
            NGX.elements.reverse();
            return NGX;
        },
		
        getById: function(id){
            return document.getElementById( id );
        },
        
        getByClass: function ( className ) {
            var elements = [],
            expr = new RegExp('\\b' + className + '\\b'),
            allElements = document.getElementsByTagName( '*' );
            var c = allElements.length;
            while(c--) {
                if ( expr.test( allElements[c].className ) ){
                    elements.push( allElements[c] );
                }
            }
            return elements;
        },

        html:function(html){    
            var c = NGX.elements.length;
            while(c--){
                NGX.elements[c].innerHTML=html;
            }                       
            return NGX;
        },
        append:function(html){            
            var c = NGX.elements.length;
            while(c--){
                NGX.elements[c].innerHTML=NGX.elements[c].innerHTML+html;
            }
            return NGX;
        },
        prepend:function(html){            
            var c = NGX.elements.length;
            while(c--){
                NGX.elements[c].innerHTML=html+NGX.elements[c].innerHTML;
            }
            return NGX;
        },
        text:function(text){            
            var c = NGX.elements.length;
            while(c--){
                NGX.elements[c].innerHTML=NGX.safeHtml(text);
            }
            return NGX;
        },
        
        appendText:function(text){            
            var c = NGX.elements.length;
            while(c--){
                NGX.elements[c].innerHTML=NGX.elements[c].innerHTML+NGX.safeHtml(text);
            }
            return NGX;
        },
        
        value:function(val){
            var c = NGX.elements.length, ec = NGX.elements.length;
            while(c--){
                if(NGX.elements[c].nodeType == 1 && (NGX.elements[c].type == 'checkbox' || NGX.elements[c].type == 'radio')){
                    val ? NGX.elements[c].checked = true :NGX.elements[c].checked = false;
                } else{
                    if(val){
                        NGX.elements[c].value=val;
                        return NGX.elements[c].value;
                    }else{
                        return NGX.elements[c].value;
                    }
                }
            }            
            return NGX;
        },
        hasClass: function (cls) {
            return NGX.elements[0].className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
        },
        addClass:function(cls){
            var c = NGX.elements.length;
            while(c--){
                NGX.elements[c].className += ' ' + cls;
            }
            return NGX;
        },
        removeClass:function (cls) {            
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            NGX.elements[0].className=NGX.elements[0].className.replace(reg,'');
            return NGX;
        },
        css:function(style){
            var c = NGX.elements.length;
            while(c--){
                for(var s in style){                    
                    NGX.elements[c].style[s] = style[s];    
                }    
            }
            return NGX;
        },
        bind:function(action, callback){
            if(NGX.elements[0].addEventListener){
                var c = NGX.elements.length;
                while(c--){
                    NGX.elements[c].addEventListener(action,callback,false);    
                }
            }else if(NGX.elements[0].attachEvent){
                var c = NGX.elements.length;
                while(c--){
                    NGX.elements[c].attachEvent('bind'+action,callback);
                }
            }
            return NGX;
        },
        //Unbind events from the elements
        unbind:function(action,callback){
            if(NGX.elements[0].removeEventListener){
                var c = NGX.elements.length;
                while(c--){
                    NGX.elements[c].removeEventListener(action,callback,false);    
                }
            }else{//IE
                var c = NGX.elements.length;
                while(c--){
                    NGX.elements[c].detachEvent('bind'+action,callback);
                }
            }
            return NGX;
        },
               
        trim: function (str) {
            var	str = str.replace(/^\s\s*/, ''),
            ws = /\s/,
            i = str.length;
            while (ws.test(str.charAt(--i)));
            return str.slice(0, i + 1);
        },
        
        safeHtml: function (html){
            var text = document.createTextNode(html);
            return new XMLSerializer().serializeToString(text);
        },
        
        //effects
        
        opacity:function(level){
            var c = NGX.elements.length;
            while(c--){
                if( level >= 0 && level <= 100){
                    NGX.elements[c].style.opacity = (level/100);
                    NGX.elements[c].style.filter = 'alpha(opacity='+level+')'; 
                }                
            }
            return NGX;
        },
        
        fadeOut:function(time){
            var level = 100; 
            var interval = setInterval(function(){
                NGX.opacity(--level);
                if(level==0){
                    clearInterval(interval);
                }
            },time/100);
            return NGX;
        },
        fadeIn:function(time){
            var level = 0; 
            var interval = setInterval(function(){
                NGX.opacity(level++);
                if(level==0){
                    clearInterval(interval);
                }
            },time/100);
            return NGX;
        }
        
    }
    Array . prototype . each = function ( callback ) {
        for ( var i = 0 ; i < this . length ; i ++ ) {
            callback ( this [ i ]);
        }
    }
    if(!window.$){
        $ = window.$ = NGX;
        $$ = window.$$ = NGX;
    }
})();
