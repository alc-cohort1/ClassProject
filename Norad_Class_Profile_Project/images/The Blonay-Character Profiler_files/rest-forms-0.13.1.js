// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(con) {
  'use strict';
  var prop, method;
  var empty = {};
  var dummy = function() {};
  var properties = 'memory'.split(',');
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
  'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
  'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) con[prop] = con[prop] || empty;
  while (method = methods.pop()) con[method] = con[method] || dummy;
})(this.console = this.console || {}); // Using `this` for web workers.

/*
 * Copyright 2013-15 Tim Stephenson. All rights reserved.
 */
EASING_DURATION = 1000;
TAB = 9;
ENTER = 13;
REQUIRED = '<span class="mandatory">*</span>';
BANNED_WORDS = [];
BANNED_WORD_MSG = 'Please do not use profanity, this site is intended for a family audience.';
useReadyHandlers = true;
fadeOutMessages = true;

if ($ == undefined && jQuery != undefined) {
  console.log('aliasing jQuery to $');
  $ = jQuery;
}
$.fn.moustache = function(data) {
  //console.info('invoking moustache template with data: '+JSON.stringify(data));
  var output = Mustache.render($(this).html(),data);
  //console.info('produces: '+output);
  this.empty().append(output);
};

$(document).ready(function() {
  console.info('Ready event fired, binding actions to data-p attributes...');
  $p.init();
});

var $p = new App();
function App() {
  this.enhanceForms=true;
  //this.server = 'https://api.knowprocess.com';
  this.server = '';
  //this.server = 'http://localhost:9090';
  this.onInitCallbacks = $.Callbacks();
  this.init = function() {
    $p.l10n = new I18nController();
    $p.bind();
    $.ajaxSetup({
      username: $p.k,
      password: $p.v,
      /*headers: { 'X-CSRF-TOKEN': this.getCookie(CSRF_COOKIE) }*/
    });
    $p.onInitCallbacks.fire();
  };
  this.deferredInit = function(func) {
    console.log('deferredInit adds '+func);
    $p.onInitCallbacks.add( func );
  };
  this.ensureInited = function(d) {
    if (d == undefined) d = {};
  };
  this.fetchAndRender = function(url,varName,templateSelector,containerSelector) { 
    console.log('fetchAndRender');
    $p.getResource(url,undefined,function(response) { 
      console.log('...'+response);
        $.each(response,function(i,d) {
          d.age = $p.l10n.getAgeString(new Date(d.lastUpdated));
        });
        $p[varName]=response;
        //console.log('template: '+jQuery(templateSelector).html());
        var rendered = Mustache.render(jQuery(templateSelector).html(), $p);
        //console.log('rendered starts: '+rendered.substring(0,500));
        $(containerSelector).html(rendered);
    });
  };
  this.initObj = function(d,dataAttr) {
    //console.log('init '+d.id+' from '+dataAttr);
    // check any objects needed by binding are initialised
    var expr = d.data(dataAttr);
    //console.log('expr:'+expr);
    var parts = expr.split('.');
    var ref = '';
    for (idx in parts) {
      if (ref.length >0) ref+='.';
      ref+=(parts[idx]);
      //console.log('Needs initialising? '+ref);
      var obj = eval(ref);
      if (obj == undefined && idx<(parts.length-1)) {
        console.log('Initialising '+ref);
        eval(ref+' = new Object();');
      }
    }
  };
  this.initDomainModel = function() {
    console.log('initDomainModel...');
      var d = { action: 'p_domain' };
      return $.ajax({
        type: 'GET',
        url: '/wp-admin/admin-ajax.php',
        data: d,
        dataType: 'json',
        timeout: 30000,
        success: function(data, textStatus, jqxhr) {
          console.log('loaded '+data.entities.length+' entities...');
          $p.model = data;
          $p.entityAttrs = [];
          $(data.entities).each(function(i,d) {
            $(d.fields).each(function(j,e) {
              $p.entityAttrs.push({value: d.name+'.'+e.name, label: d.name+' '+e.label});
            });
          });
          $( "#domainCtrl" ).autocomplete({
            source: $p.entityAttrs
          });
        }
      });
  };
  this.addControl = function() {
    console.log('addControl');
    var options = '';
    var ctrlType = $('#ctrlType').val();
    if (ctrlType == 'checkbox' || ctrlType == 'radio' || ctrlType == 'select') {
      options = 'data-options="'+$('#ctrlOptions').val()+'"';
    }
    var ctrlValue = $('#ctrlValue').val();
    $p._addControl($('#ctrlId').val(),
      ctrlType,
      $('#ctrlLabel').val(),
      $('#ctrlPlaceholder').val().toLowerCase(),
      $('#ctrlRequired').prop('checked'),
      undefined,
      options,
      ctrlValue);
  };
  this._addControl = function(ctrlId, ctrlType, ctrlLabel, ctrlPlaceholder, required, validation, options, value) {
    console.log('addControlInternal');

    if (ctrlType=='tel' && validation==undefined) validation = '\\+?[0-9, \\-()]{0,15}';
    var ctrl;
    switch (ctrlType) {
      case 'select':
        ctrl = '<select class="decorate" '+options+' id="' +ctrlId
        +'" name="'+ctrlLabel
        +'" '+(required?'required ':'')
        +'data-value="'+value+'">'
        +'</select>\n';
        break;
      case 'textarea':
        ctrl = '<textarea class="decorate" id="'+ctrlId
        +'" name="'+ctrlLabel
        +'" '+(required?'required ':'')+'rows="3" placeholder="'+ctrlPlaceholder+'">'
        +value+'</textarea>\n';
        break;
      default:
        console.log('validation == undefined'+(validation==undefined));
        ctrl = '<input class="decorate" '+options+' id="'+ctrlId
          +'" name="'+ctrlLabel+'" '+(required?'required ':'')
          +(validation == undefined ? '' : ' pattern="'+validation+'"')
          +' placeholder="'+ctrlPlaceholder+'" title="'
          +ctrlPlaceholder+'" type="'+ctrlType
          +'" value="'+value+'"/>\n';
          break;
      }

      if ($($('.wp-editor-area')[0]).css('display')=='none') {
        $('#content_ifr').contents().find(".wp-editor").append(ctrl);
      } else {
        insertAtCursor($('.wp-editor-area')[0], ctrl);
      }
  };
  this.addControlOptions = function() {
    switch ($('#ctrlType').val()) { 
    case 'checkbox':
    case 'radio': 
    case 'select':
      $('#ctrlOptionsPara').show(); 
      break;
    default: 
      $('#ctrlOptionsPara').hide(); 
      break;
    }
  };
    this.addDomainControl = function() {
      var domainCtrl = $('#domainCtrl').val();
      console.log('addDomainControl: '+domainCtrl);
      var entity = domainCtrl.substring(0,domainCtrl.indexOf('.'));
      var attr = domainCtrl.substring(domainCtrl.indexOf('.')+1);
      //console.log('entity: '+entity+', field:'+attr);
      $.each($p.model.entities, function(i,d) {
        if (d.name == entity) {
          $.each(d.fields, function(j,e) {
            if (e.name == attr) {
              console.log('found attr:'+JSON.stringify(e));
              $p._addControl(e.name, e.type, e.label, e.hint, e.required, e.validation);
              $('#domainCtrl').val('');
            }
          });
        }
      });
    };
      this.bind = function() {
        $('[data-p-init]').each(function(i,d) {
          eval($(d).data('p-init')+'=new Object();');
        });
        $p.sync();
        if (useReadyHandlers) $p.bindReadyHandlers();
        $p.bindActionHandlers();
        $p.bindControls();
        $p.bindCombos();
        $p.bindTables();
        $p.bindSectionsToNav();
      };
      this.bindReadyHandlers = function() {
        console.info('bindReadyHandlers');
        $('[data-p-ready]').each(function(i,d) {
          var f = $(d).attr('data-p-ready');
          console.info('  '+f);
          eval(f);
        });
      };
      this.bindActionHandlers = function() {
        $('[data-p-action]').click(function(ev) {
          var action = $(ev.target).data('p-action');
          if (action.indexOf('(') != -1) {
            console.log('invoking custom action "'+action+'"');
            eval(action);
          } else {
            console.log('sending message "'+msgName+'"');
            var mep = ($(ev.target).data('p-action')===undefined?'inOnly':'inOut');
            var msg = eval(action.substring(action.indexOf(':')+1));
            var msgName = action.substring(0,action.indexOf(':'));
            $p.sendMessage(mep,msgName,JSON.stringify(msg));
            ev.preventDefault();
          }
        });
      };
      this.bindCombos = function() {
        console.log('bind combos');
        $('[data-p-combo]').each(function(i,d) {
          var val = $(d).data('p-combo');

          if (val.length>0){
          console.log('setting up combo for '+d.name+' with '+val.length+' values of '+val);
          //if ($(d).autocomplete != undefined) $(d).autocomplete('destroy');
          $(d).autocomplete({
            change: function( event, ui ) {
              console.info('Change event '+event+' for '+event.target.id+', new val '+event.target.value);
              if (event.target.value == '') {
                var dataHolder = $(event.target).data('p-combo-bind');
                if ($(event.target).data('p-combo-type') != 'string') dataHolder = dataHolder.substring(0,dataHolder.lastIndexOf('.'));
                var cmd=dataHolder+'= null;';
                console.log('update command: '+cmd);
                eval(cmd);
              }
            },
            minLength: 0,
            source: eval(val),
            select: function( event, ui ) {
              console.info('select event '+event+' for '+event.target.id+', selecting '+ui.item.label);
              event.target.value= ui.item.label;
              if ($(event.target).data('p-combo-bind') !== undefined) {
                var cmd=$(event.target).data('p-combo-bind')+'= ui.item.value;';
                console.log(cmd);
                eval(cmd);
              } else {
                console.warn('no data binding for '+d.id);
              }
              if ($(event.target).data('p-combo-display') !== undefined) {
                var cmd=$(event.target).data('p-combo-display')+'= ui.item.label;';
                console.log(cmd);
                eval(cmd);
              } else {
                console.warn('no label binding for '+d.id);
              }
              return false;
            }
          });
          } else {
          console.log('Skipping combo setup for '+d.name+' as '+val+' has no options');
          }
          $(d).focus(function(ev) {
            console.info('focus on '+ev.target.id+' opening drop down');
            $('#'+ev.target.id).autocomplete('search');
          });
        });
      };
      this.bindControls = function() {
        console.log('bindControls');
        $('.p-form input[id]:not([data-p-bind]), .p-form select[id]:not([data-p-bind]), .p-form textarea[id]:not([data-p-bind])')
          .attr('data-p-bind',function() { 
            return '$p.'+$(this).closest('form')[0].id.replace(/-/g,'_')+'.'+this.id; 
          });
        $('[data-p-bind]:not([placeholder])').attr('placeholder', function() { return this.title; });

        // special processing to create radio / checkbox group
        var radioCtrls = $('input.decorate[type="radio"],input.decorate[type="checkbox"]');
        //console.log('Have radios: '+radioCtrls);
        $.each(radioCtrls, function(i,d) {
          console.log('Have '+d.type);
          ctrl = '<div class="form-group">';
          ctrl += '<label for="'+d.id+'">'+d.name+(d.required ? REQUIRED : '')+'</label><br/>';
          var options = $(d).data('options') == undefined ? [] : $(d).data('options').split(',');
          $.each(options, function(j,e) { 
            console.log('  option: '+e);
            ctrl += '<span class="'+d.type+'-inline"><input class="decorate" id="'
            +'" on-blur="validateRadio()" name="'+d.id
            +'" '+(d.required?'required ':'')+' type="'+d.type+'">'+e+'</span>'
          });
          ctrl += '<br/><span class="field-hint hidden">Please select one of the options above.</span>';
          ctrl += '</div>';
          $(d).replaceWith(ctrl);
        });

        // special processing to create select (no autocomplete for now)
        var selectCtrls = $('select[data-options]');
        console.log('Have select: '+selectCtrls);
        $.each(selectCtrls, function(i,d) {
          console.log('Have '+d.type);
          var options = $(d).data('options') == undefined ? [] : $(d).data('options').split(',');
          var val = $(d).data('value');
          if (!$(d).prop('required')) $(d).append('<option id="">Please Select</option>');
          $.each(options, function(j,e) { 
            console.log('  option: '+e);
            $(d).append('<option id="'+e+'"'+(val == e ? 'selected' : '')+'>'+e+'</option>');
          });
        });

        // decorate all other controls  
        $('[data-p-bind].decorate')
        .addClass('form-control')
        .wrap('<div class="form-group">')
        .before(function(i) {
          return '<label for="'+this.id+'">'+this.name+(this.required ? REQUIRED : '')+'</label>';
        })
        .after(function(i) {
          return '<span class="field-hint">'+(this.title ? this.title : '')+'</span>';
        })
        .removeClass('decorate');
        $('[data-p-display].decorate')
          .addClass('form-control')
          .removeClass('decorate')
          .wrap('<div class="form-group">');
        $('[data-p-bind]').each(function(i,d) {
          // check we do not have moustache template
          if ($(d).data('p-bind').indexOf('{')==-1) {
            console.info('binding control '+d.name+' to '+$(d).data('p-bind'));
            $p.initObj($(d), 'p-bind');
            if ($(d).data('p-type')=='number') $(d).autoNumeric('init', {mDec:0});
            var val = eval($(d).data('p-bind'));
            $(d).on('blur', $p.syncToModel);
            $(d).on('change', $p.syncToModel);
          } else {
            console.log('skip binding to: '+d.id+' using: '+$(d).data('p-bind'));
          }
        });
        $('[data-p-display]').each(function(i,d) {
          if ($(d).data('p-type')=='number') $(d).autoNumeric('init', {mDec:0});
        });
      };
      this.bindSectionsToNav = function() {
              $('[data-p-section]').each(function(i,d) {
                console.log('bind nav handler to '+$(d).data('p-section'));
                $(d).on('click',function() {
                  var sect = $(d).data('p-section');
                  console.log('clicked on nav section: '+sect);
                  $('.nav li').removeClass('active');
                  $(d).parent().addClass('active');

                  $('p-section').fadeOut(500);
                  $('#'+sect).delay(500).removeClass('hide').fadeIn(500);
                });
              });
            };
            this.bindTables = function() {
              $('[data-p-table]').each(function(i,d) {
                var entity = $(d).data('p-table');
                console.info('Binding data from "'+entity+'" to: "'+d.id+'"');
                console.info('Col Names are: '+$(d).data('p-table-colnames'));
                var colNames = $(d).data('p-table-colnames').split(',');
                var cols = [
              { data: "name" },
            { data: "childrenStartYears", validator: this.csNumericValidator },
          { data: "email", validator: this.emailValidator, allowInvalid: false },
        { data: "phone" },
      {
        data: "mailingLists",
        /* autocomplete only supports single select
        * type: "autocomplete",
        source: ["Committee", "Meetings", "Volunteers", ""], //empty string is a valid value
        strict: true*/
      },
    { data: "crb", type: "checkbox", allowInvalid:true  },
  { data: "firstAid", type: "checkbox" }
  ];
  console.info('colNames found: '+colNames);
  var hot = $(d).handsontable({
    startRows: 1,
    startCols: colNames.length,
    rowHeaders: true,
    colHeaders: colNames,
    minSpareRows: 1,
    contextMenu: false,
    columns: cols,
    columnSorting: true,
    /* This works but is very verbose. would prefer placeholder
    * consider custom renderer: http://handsontable.com/demo/renderers_html.html
    * or http://handsontable.com/demo/prepopulate.html
    dataSchema: { name: "",
    childrenStartYears: "",
    email: "",
    phone: "",
    mailingLists: "",
    crb: false,
    firstAid: false
  },*/
  removeRowPlugin: true,
  afterChange: function (change, source) {
    if (source === 'loadData') {
      return; //don't save this change
    } else if (source === 'edit') {
      console.log('type change:'+typeof change);
      console.log('json change:'+JSON.stringify(change));
      window.change = change;
      row = change[0][0];
      col = change[0][1];
      from = change[0][2];
      to = change[0][3];
      console.log('my change:'+row+','+col+' from '+from+' to '+to);

      if (row>=pta.data.length) { // create
        console.log('create new record');
        var p = new Person();
        pta.data.push(p);
        pta.set(row,col,to);
      } else { // update
        console.log('TODO update record: '+row);
        //pta.data.splice(row,1);
        //var p = pta.data[row];
        // LAST USED pta.set(row,col,to);
        //          pta.data.push(p);
      }
      //pta.save();
    } else {
      console.log('type change:'+typeof change);
      console.log(' source:'+source);
    }
    console.log('Autosaved (' + change.length + ' cell' + (change.length > 1 ? 's' : '') + ')');
    console.log('... source: '+source+', change:'+change);
    //          pta.data.push(new Person(change.splice(0,1)));
  },
  afterRemoveRow: function(idx, amount) {
    console.log('removed row: '+idx+','+amount);
    //          pta.data.splice(idx, amount);
    //pta.save();
  }
});
$('html, body').css("cursor", "wait");
return $.ajax({
  type: 'GET',
  url: $p.server+'/'+entity,
  contentType: 'application/json',
  dataType: 'json',
  success: function(response) {
    console.log('success fetching data');
    //localStorage['GET_repository_definitions']=response;
    hot.loadData(response);
    $('html, body').css("cursor", "auto");
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log('error:'+textStatus+':'+errorThrown);
    console.log('  headers: '+JSON.stringify(jqXHR.getAllResponseHeaders()));
    $('html, body').css("cursor", "auto");
  }
});
});
};
this.getResource = function(resource, searchExpr, callback) {
  console.log('get resource "'+resource+'", filtered by: '+JSON.stringify(searchExpr));
  if ($p.isOffline()) {
    callback(JSON.parse(localStorage['GET_'+resource]));
  } else {
    return $.ajax({
      type: 'GET',
      url: (resource.indexOf('/admin-ajax.php')==-1 ? $p.server+resource : resource),
      contentType: 'application/json',
      data: searchExpr,
      dataType: 'text',
      username: $p.username,
      password: $p.password,
      xhrFields: { withCredentials: true },
      done: function() {
        console.info('Received reply');
      },
      success: function(response) {
        console.info('Received reply');
        localStorage['GET_'+resource]=response;
        callback(JSON.parse(response));
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('ERROR '+ jqXHR.statusCode());
        console.log('error:'+textStatus+':'+errorThrown);
      }
    });
  }
};
this.handleCallback = function(msg, wp_callback) {
  console.log('handleCallback: '+msg+', '+wp_callback);
  if (window['$params'] != undefined) jQuery.extend(msg, $params);
  if (wp_callback == undefined || wp_callback == '') {
    console.warn('No callback to execute');
  } else {
    var data = {
	  	'action': wp_callback,
		  'json': (msg!=undefined && typeof msg == 'object')
         ? encodeURIComponent(JSON.stringify(msg))
         : msg
	  };
	  $.post('/wp-admin/admin-ajax.php', data, function(response) {
		  console.log('Got this from the server: ' + response);
	  });
  }
};
this.hideActivityIndicator = function(msg, addClass) {
  if (msg === undefined) msg = '';
  $('.p-messages').empty().append(msg).removeClass('blink');
  document.body.style.cursor='auto';
  // enable to allow messages to fade away
  if (fadeOutMessages && addClass!='error') setTimeout(function() {
    $('.p-messages').fadeOut();
  }, EASING_DURATION*10);
};
this.isOffline = function() {
  return false;
};
this.nameToSlug = function(name, incHyphens) {
  console.log('nameToSlug: '+name+', '+incHyphens);
  if (incHyphens==undefined) incHyphens=true;
  if (name!=undefined && isNaN(name) && incHyphens) {
    return name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
  } else if (name!=undefined && isNaN(name)) {
    return name.toLowerCase().replace(/ /g,'').replace(/[^\w-]+/g,'');
  } else {
    return name;
  }
}

/**
* @param msg JSON or object repesentation of message to send
*/
this.sendMessage = function(mep, msgName, msg, redirect, wp_callback, proxy, businessDescription) {
  console.log('sendMessage');
	if (wp_callback != null && wp_callback.length > 0) $p.handleCallback(msg, wp_callback);

  if (mep=='none') {
    console.log('Server integration turned off');
    $p.handleCallback(msg, 'p_send_mail');
    if (undefined != redirect) window.location.href=redirect;
  } else {
    jQuery('html, body').css("cursor", "wait");
    console.log('Sending '+msgName+' as mep: '+mep);
    var type = ((mep == 'inOut' || mep == 'outOnly') ? 'GET' : 'POST');
    switch (type) {
    case 'GET':
      $p.showMessage('Loading...','bg-info text-info');
      break;
    default:
      $p.showMessage('Saving...','bg-info text-info');
    }
    msg.tenantId = $p.tenant;
    // TODO
    if (msg.accountInfo != undefined) msg.accountInfo.tenantId = 'firmgains';
    if (msg.account != undefined) msg.account.tenantId = 'firmgains';
    console.log('msg: '+ msg);
    if (msg!=undefined && typeof msg == 'string' && msg.indexOf('{')==0) msg = JSON.parse(msg);
    if (window['$params'] != undefined) jQuery.extend(msg, $params);
    $p.json = msg;
    var d = {};
    if (msg['firstName']!=undefined && msg['lastName']!=undefined) d.businessDescription = msg.firstName+' '+msg.lastName;
    if (msg['fullName']!=undefined) d.businessDescription = msg.fullName;
    if (businessDescription!=undefined && businessDescription.length>0) d.businessDescription = msg[businessDescription];
    // this strips non-significant white space
    if (msg!=undefined && typeof msg == 'object') msg = JSON.stringify(msg);
    console.log('msg: '+ msg);
    mep == 'inOut' ? d.query=msg : d.json=msg;
    d.msg_name = msgName;
    d.action='p_proxy';
    console.log('server: '+ $p.server);
    console.log('d: '+ d);
    var url = $p.server+'msg/'+$p.tenant+'/'+msgName;
    if (proxy) url = '/wp-admin/admin-ajax.php';
    $('html, body').css("cursor", "wait");
    return $.ajax({
      type: type,
      url: url,
      /* Uncomment to send as single JSON blob instead of form params
      contentType: 'application/json',*/
      crossDomain: true,
      data: d,
      dataType: 'text',
      timeout: 30000,
      username: $p.k,
      password: $p.v,
      headers: {
        "Authorization": "Basic " + btoa($p.k + ":" + $p.v)
      },
      xhrFields: {withCredentials: true},
      success: function(response, textStatus, jqxhr) {
        console.log('successfully start instance by msg: '+jqxhr.getResponseHeader('Location'));
        console.log('  headers: '+JSON.stringify(jqxhr.getAllResponseHeaders()));
        console.log('  response: '+response);
        try { $p.response = JSON.parse(response); }
        catch (e) { $p.response = response; }
        if ($p['onResponse'] != undefined) $p.onResponse(); 
        $p.hideActivityIndicator();
        switch (type) {
        case 'GET':
          //$p.showMessage('Loaded successfully...','bg-success text-success');
          break;
        default:
          $p.showMessage('Your information has been received','bg-success text-success');
        }
        if (undefined != redirect) window.location.href=redirect;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        var msg = 'Error saving: '+textStatus+' '+errorThrown;
        $p.err = jqXHR;
        switch (jqXHR.status) {
        case 404:
          msg = "There is no workflow deployed to handle '"+msgName+"' messages. Please contact your administrator.";
        }
        console.error(msg);
        $p.hideActivityIndicator(msg, 'error');
        switch (type) {
        case 'GET':
          $p.showMessage('Unable to load your data right now, please reload in a moment...','bg-danger text-danger');
          break;
        default:
          $p.showMessage('Unable to save your data right now, please retry in a moment...','bg-danger text-danger');
        }
      },
      complete: function(data, textStatus, jqxhr) {
        //console.log('successfully start instance by msg: '+jqxhr.getResponseHeader('Location'));
        //console.log('complete:'+textStatus+' data: '+JSON.stringify(data)+' jqxhr'+jqxhr);
        if($p['msgCallbacks'] != undefined) $p.msgCallbacks.fire();
        jQuery('html, body').css("cursor", "auto");
      }
    });
  }
};
  this.sendMessageIfValid = function(formId, mep, msgName, msg, redirect, wp_callback, proxy, businessDescription) { 
    $.each($('#'+formId+' input[type="text"],#'+formId+' textarea'), function(i,d) { 
      if (!validateBannedWords($(d).val())) { 
        $(d).setCustomValidity('Please re-word this for an all-age audience');
        $p.showError(BANNED_WORD_MSG);
      }
    });
    validateRadio();
    if (document.getElementById(formId).checkValidity()) {
      $p.sendMessage(mep, msgName, msg, redirect, wp_callback, proxy, businessDescription);
    } else { 
      $p.showFormError(formId,'Please correct highlighted fields');
    }
  };
  /**
  * @param msg JSON or object repesentation of message to send
  */
  this.sendIntermediateMessage = function(msgName, msg, redirect, wp_callback, proxy, execId) {
    console.log('sendIntermediateMessage: '+msgName+', '+msg+','+redirect+','+wp_callback+','+proxy+','+execId);
    $p.showMessage('Saving...','bg-info text-info');

    console.log('msg: '+ msg);
    if (msg!=undefined && typeof msg == 'string' && msg.indexOf('{')==0) msg = JSON.parse(msg);
    if (window['$params'] != undefined) jQuery.extend(msg, $params);
    $p.json = msg;
    // this strips non-significant white space
    if (msg!=undefined && typeof msg == 'object') msg = JSON.stringify(msg);
    console.log('msg: '+ msg);
    console.log('server: '+ $p.server);
    var url = $p.server+$p.tenant+'/messages/'+msgName+'/'+execId;
    var d = {
      json: msg,
      msg_name: msgName,
      action: 'p_proxy',
      executionId: execId
    };
    $('html, body').css("cursor", "wait");
    return $.ajax({
      type: 'POST',
      url: (proxy ? '/wp-admin/admin-ajax.php' : url),
      contentType: (proxy ? 'application/x-www-form-urlencoded; charset=UTF-8' : 'application/json'),
      data: (proxy ? d : msg),
      timeout: 30000,
      username: $p.username,
      password: $p.password,
      headers: {
        "Authorization": "Basic " + btoa($p.username + ":" + $p.password)
      },
      xhrFields: {withCredentials: true},
      success: function(response, textStatus, jqxhr) {
        console.log('successfully sent msg to: '+execId);
        console.log('  headers: '+JSON.stringify(jqxhr.getAllResponseHeaders()));
        console.log('  response: '+response);
        try { $p.response = JSON.parse(response); }
        catch (e) { $p.response = response; }
        if ($p['onResponse'] != undefined) $p.onResponse(); 
        if (wp_callback != undefined) wp_callback(); 
        $p.hideActivityIndicator();
        $p.showMessage('Your information has been received','bg-success text-success');
        if (undefined != redirect) window.location.href=redirect;
      }
    });
  };
  this.showActivityIndicator = function(msg, addClass) {
    document.body.style.cursor='progress';
    this.showMessage(msg, addClass);
  };
  this.showError = function(msg) {
    this.showMessage(msg, 'p-error');
  };
  this.showFormError = function(formId, msg) {
    this.showError(msg);
    $('#'+formId+' :invalid').addClass('p-error');
    $('#'+formId+' :invalid')[0].focus();
  };
  this.showMessage = function(msg, additionalClass) {
    if (msg === undefined) msg = 'Working...';
    $('.p-messages').empty().append(msg).addClass(additionalClass).show();
    if (fadeOutMessages && additionalClass!='p-error') setTimeout(function() {
      $('.p-messages').fadeOut();
    }, EASING_DURATION*10);
  };
  this.sync = function() {
    //console.log('... contact is: '+JSON.stringify($p.contact));
    $('[data-p-bind]').each(function(i,d) {
      // check we do not have moustache template
      if ($(d).data('p-bind').indexOf('{')==-1) {
        $p.initObj($(d), 'p-bind');
        //$(d).blur();
        // create data binding
        var val = eval($(d).data('p-bind'));
        //if (val == undefined) { console.log('val is undefined: '+$(d).value)};
        // if val is set and not dealing with an unchecked radio, set ctrl value
        if (val != undefined  && !($(d).attr('type')=='radio' && $(d).attr('checked')==undefined)) {
          console.log('... '+i+':'+val+' into '+d.name);
          $(d).val(val);
        } else {
          //console.log('... '+i+' skipping: isRadio? '+($(d).attr('type')=='radio')+', isUnchecked?'+($(d.id+':checked')));
        }
        if ($(d).data('p-type')=='number') $(d).autoNumeric('init', {mDec:0});
        if (val != undefined && $(d).data('p-type')=='number') $(d).autoNumeric('set',val);
      }
    });
    $('[data-p-combo-bind]').each(function(i,d) {
      // check we do not have moustache template
      if ($(d).data('p-combo-bind').indexOf('{')==-1) {
        $p.initObj($(d), 'p-combo-bind');
        var val = eval($(d).data('p-combo-display'));
        if ($(d).data('p-l10n')!=undefined && $p.l10n!=undefined) val=$p.l10n.getLabelText(val);
        $(d).val(val);
      }
    });
    $('[data-p-display]').each(function(i,d) {
      // check we do not have moustache template
      if ($(d).data('p-display').indexOf('{')==-1) {
        $p.initObj($(d), 'p-display');
        // check we do not have moustache template
        if ($(d).data('p-display').indexOf('{')==-1) {
          // create display only binding
          var val = eval($(d).data('p-display'));
          if ($(d).data('p-l10n')!=undefined && $p.l10n!=undefined) val=$p.l10n.getLabelText(val);
          console.log('... '+i+':'+val+' into '+d.name);
          $(d).empty().append(val);
          if ($(d).data('p-type')=='number') $(d).autoNumeric('init', {mDec:0});
          if (val != undefined && $(d).data('p-type')=='number') $(d).autoNumeric('set',val);
        }
      }
    });
  };
  this.syncToModel = function (ev) {
    console.info('Blur on '+ev.target.name+'='+ev.target.value+', checked:'+$(ev.target).find(':checked').name);
    var t = $(ev.target);

    var cmd = t.data('p-bind')+'='+JSON.stringify(t.val())+';';
    switch (true) {
    case (t.data('p-type')=='number'):
      console.log('have number');
      cmd = t.data('p-bind')+'="'+t.autoNumeric('get')+'";';
      break;
    case (ev.target.type=='radio'):
      console.log('have radio');
      cmd = t.data('p-bind')+'= $(\'[data-p-bind="'+t.data('p-bind')+'"]:checked\').val();';
      break;
    default:
      ; // cmd set above
    }
    if (t.val().length==0) cmd = t.data('p-bind')+'=null;';
    console.log('updating data model for '+t.name+' using '+cmd);
    eval(cmd);
    $p.sync();
  };
}
String.prototype.toLeadingCaps = function() {
  return this.substring(0,1).toUpperCase()+this.substring(1).toLowerCase();
};

// insert additional content into textarea
function insertAtCursor(myField, myValue) {
  //IE support
  if (document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
  }
  //MOZILLA and others
  else if (myField.selectionStart || myField.selectionStart == '0') {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    myField.value = myField.value.substring(0, startPos)
    + myValue
    + myField.value.substring(endPos, myField.value.length);
  } else {
    myField.value += myValue;
  }
}

function validateRadio() { 
  $('[type="radio"]:invalid').parent().parent().find('.field-hint').removeClass('hidden').css('color','red'); 
} 
/**
 * @return true if the value received is valid (i.e. does not contain banned words).
 */
function validateBannedWords(val) { 
  var valid = true;
  var words = val.split(/\W/); 
  $.each(words, function(i,d) { 
    $.each(BANNED_WORDS, function(j,e) { 
      if (d==e) valid = false ; 
    });
  });
  return valid;
}
