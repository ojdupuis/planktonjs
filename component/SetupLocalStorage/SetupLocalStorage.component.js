/**
 * Created with JetBrains PhpStorm.
 * User: dupuis
 * Date: 12/09/12
 * Time: 18:45
 * To change this template use File | Settings | File Templates.
 */

//@TODO Call from here
// addScript('SetupLocalStorage', '/external/jquery-fsutils/jquery.fsutils.min.js');


SetupLocalStorageComponent = function (thereality) {
    this.reality = thereality;
    this.listenerId="SetupLocalStorageComponent"
    this.setup=null

    this.initializeComponent = function () {

    }

    this.fillComponent = function () {
        //addScript('SetupLocalStorage', 'js/jquery.fsutils.min.js');
        this.addListener('SetupInterface.ready', this.listenerId,function (setuplocalstorage) {
            return function (event) {
                setuplocalstorage.setup=event[0].target.component.setup
                setuplocalstorage.drawComponent()
            }
        }(this));

    }

    this.save=function(name){
        localStorage.setItem(name,JSON.stringify(this.setup.parameters))
    }
    
    this.export=function(){
        $('saveFileDialog').saveFileDialog(function(){
            //@TODO pb de savefiledialogs
                return {
                        'data': btoa('oli'),
                        'filename': 'parameters.js'
                    }

        })
    }


    this.load=function(jsonString){
        this.setup.parameters=JSON.parse(jsonString)
        this.component.fire({ type: 'SetupInterface.refresh', target: this.setup.parameters })
    }

    this.startComponent = function () {
    }

    this.drawComponent=function(){
        $('<div/>',{
            id: 'localstorage_container',
            class: 'control_section'
        }).appendTo('#setupControls')
        $('<div>Current configuration</div>').appendTo('#setupControls')
        $('<input/>',{
            id: 'localstorage_savename',
            class: 'localstorage_savename'
        }).appendTo('#localstorage_container')
        var btn=addbutton('Save', 'Save',
            function (setuplocalstorage) {
                return function(){
                    setuplocalstorage.save(document.getElementById('localstorage_savename').value)
                    setuplocalstorage.localStorageMakeList()
                }

            }(this),
            'marginten','Save into browser')
        btn.appendTo('#localstorage_container')
        var btn=addbutton('Export', 'Export',
            function (setuplocalstorage) {
                return function(){
                    setuplocalstorage.export()
                }

            }(this),
            'marginten','Export to file')
        btn.appendTo('#localstorage_container')
        $('<div/>',{
            id: 'load',
            class: 'setup_controls'
        }).appendTo('#localstorage_container')
        $('#localstorage_container').appendTo('#setupControls')
        this.localStorageMakeList()

    }

    this.localStorageMakeList=function(){
        $('#load').children().each(function(index){
            $(this).remove()
        })
        //reconstruct list
        for (var i=0;i<localStorage.length;i++){
            var name=localStorage.key(i)
            addbutton('localStorage_'+i, name,
                function (setuplocalstorage,savename) {
                    return function(){
                        setuplocalstorage.load(localStorage.getItem(savename))
                        setuplocalstorage.localStorageMakeList()
                    }

                }(this,name),
                'marginten green','Load '+name).appendTo('#load')
            addbutton('delete_localStorage_'+i, 'X',
                function (setuplocalstorage,savename) {
                    return function(){
                        localStorage.removeItem(savename)
                        setuplocalstorage.localStorageMakeList()
                    }

                }(this,name),
                'marginten orange margintenright small','Delete '+name).appendTo('#load')
        }
    }

    this.addComponentListeners()
}