var PATH = (PATH != undefined ? PATH : '../');
var working = false;
var URL = 'ajx/n.php';
(function ($) {
    "use strict";
    var mainApp = {

        main_fun: function () {
            /*====================================
            METIS MENU 
            ======================================*/
            $('#main-menu').metisMenu();

            /*====================================
              LOAD APPROPRIATE MENU BAR
           ======================================*/
            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });

            /*====================================
            MORRIS BAR CHART
         ======================================*
            Morris.Bar({
                element: 'morris-bar-chart',
                data: [{
                    y: '2006',
                    a: 100,
                    b: 90
                }, {
                    y: '2007',
                    a: 75,
                    b: 65
                }, {
                    y: '2008',
                    a: 50,
                    b: 40
                }, {
                    y: '2009',
                    a: 75,
                    b: 65
                }, {
                    y: '2010',
                    a: 50,
                    b: 40
                }, {
                    y: '2011',
                    a: 75,
                    b: 65
                }, {
                    y: '2012',
                    a: 100,
                    b: 90
                }],
                xkey: 'y',
                ykeys: ['a', 'b'],
                labels: ['Series A', 'Series B'],
                hideHover: 'auto',
                resize: true
            });

            /*====================================
          MORRIS DONUT CHART
       ======================================*
            Morris.Donut({
                element: 'morris-donut-chart',
                data: [{
                    label: "Download Sales",
                    value: 12
                }, {
                    label: "In-Store Sales",
                    value: 30
                }, {
                    label: "Mail-Order Sales",
                    value: 20
                }],
                resize: true
            });

            /*====================================
         MORRIS AREA CHART
      ======================================*

            Morris.Area({
                element: 'morris-area-chart',
                data: [{
                    period: '2010 Q1',
                    iphone: 2666,
                    ipad: null,
                    itouch: 2647
                }, {
                    period: '2010 Q2',
                    iphone: 2778,
                    ipad: 2294,
                    itouch: 2441
                }, {
                    period: '2010 Q3',
                    iphone: 4912,
                    ipad: 1969,
                    itouch: 2501
                }, {
                    period: '2010 Q4',
                    iphone: 3767,
                    ipad: 3597,
                    itouch: 5689
                }, {
                    period: '2011 Q1',
                    iphone: 6810,
                    ipad: 1914,
                    itouch: 2293
                }, {
                    period: '2011 Q2',
                    iphone: 5670,
                    ipad: 4293,
                    itouch: 1881
                }, {
                    period: '2011 Q3',
                    iphone: 4820,
                    ipad: 3795,
                    itouch: 1588
                }, {
                    period: '2011 Q4',
                    iphone: 15073,
                    ipad: 5967,
                    itouch: 5175
                }, {
                    period: '2012 Q1',
                    iphone: 10687,
                    ipad: 4460,
                    itouch: 2028
                }, {
                    period: '2012 Q2',
                    iphone: 8432,
                    ipad: 5713,
                    itouch: 1791
                }],
                xkey: 'period',
                ykeys: ['iphone', 'ipad', 'itouch'],
                labels: ['iPhone', 'iPad', 'iPod Touch'],
                pointSize: 2,
                hideHover: 'auto',
                resize: true
            });

            /*====================================
    MORRIS LINE CHART
 ======================================
            Morris.Line({
                element: 'morris-line-chart',
                data: [{
                    y: '2006',
                    a: 100,
                    b: 90
                }, {
                    y: '2007',
                    a: 75,
                    b: 65
                }, {
                    y: '2008',
                    a: 50,
                    b: 40
                }, {
                    y: '2009',
                    a: 75,
                    b: 65
                }, {
                    y: '2010',
                    a: 50,
                    b: 40
                }, {
                    y: '2011',
                    a: 75,
                    b: 65
                }, {
                    y: '2012',
                    a: 100,
                    b: 90
                }],
                xkey: 'y',
                ykeys: ['a', 'b'],
                labels: ['Series A', 'Series B'],
                hideHover: 'auto',
                resize: true
            });
           */
     
        },

        initialization: function () {
            mainApp.main_fun();

        }

    }
    // Initializing ///

    $(document).ready(function () {
        mainApp.main_fun();
		$.fn.getPopup = function(w,a) {
		//alert(w + a + 'd');
		if(working === false)
		{
			thisbtn = $(this);
			thisbtn.prop('disabled','disabled');
			//takeit = a.split('_')[0];
			//alert($('#' + takeit + '_location').text());
			working = true;
			p(PATH + 'ajx/0.php', null,'w=' + w + '&a=' + a + '&m=gpp',null,'json', function(data) {
				if(data.stts == '1') {
					$("#modal-"+w+"-updt").remove();
					$(".main").append(data.html);
					$("#modal-"+w+"-updt").modal('show');
					
					//$("#save-changes-gravesite").trigger('click');
					
				}
				thisbtn.prop('disabled',false);
				working = false;
			});
			
		}
		
	};
	//'#update-'+ w ,
	$.fn.update = function(w,a) {
		//alert(w + a + 'd');
		if(working === false)
		{
			thisbtn = $(this);
			thisbtn.prop('disabled','disabled');
			//takeit = a.split('_')[0];
			//alert($('#' + takeit + '_location').text());
			working = true;
			
			p(PATH + 'ajx/0.php','#update-'+w,'&w=' + w + '&a=' + a + '&m=updt',null,'json', function(data)
			{
				if(data.stts == '1') {
					//$("#modal-"+w+"-updt").remove();
					$('#table-'+w).bootstrapTable('refresh');
					title = 'Success';
					sucmsg = data.msg;
					type = 'info';
				
					
				} else {
					title = 'Error';
					//sucmsg = data;
					type = 'danger';
					sucmsg = '<ul>';
					for(var i=0; i<data.length;i++)
					{
						//alert(data[i]);
						sucmsg = sucmsg + '<li>' + data[i] + '</li>';
					}
					sucmsg = sucmsg + '</ul>'
				}
				new PNotify({
					title: title,
					text: sucmsg,
					type: type
				});
				thisbtn.prop('disabled',false);
				working = false;
				$("#modal-"+w+"-updt").modal('hide');
			});
			
		}
		
	};
	var _mtype    = "danger";
		var _msize	  = "sm";
		var _mtitle   = "<i class='fa fa-warning'></i> Confirm Delete";
		var _mcontent = '<div class="row"><div class="col-md-12"><label>Are you sure you want to Delete ?</label><br/>Note that deleting record that is related to another data or used in reports, can cause errors so be aware about what are you doing.</div><div class="clear-fix"></div></div>';
		var _btntxt    = "Delete";
		
		$.fn.confirm_modal = function(action, mtype=null, msize=null, mtitle=null, mcontent=null, btntxt=null){
			//alert('asd'+action);
		/*if(working === false)
		{
			working = true;*/
			
			mtype = mtype || _mtype;
			msize = msize || _msize;
			mtitle = mtitle || _mtitle;
			mcontent = mcontent || _mcontent;
			btntxt = btntxt || _btntxt;
			
			var ConfirmModal = '<div class="modal modal-'+mtype+' fade" id="modal-confirm" tabindex="-1" role="dialog" aria-labelledby="create-confirm" aria-hidden="true"><div class="modal-dialog modal-'+msize+'"><div class="modal-content"><div class="modal-header"><h4 class="modal-title" id="create-confirm">'+mtitle+'</h4></div><form id="add-confirm" method="post" action=""><div class="modal-body">'+mcontent+'</div><div class="modal-footer"><button type="button" class="btn btn-'+msize+' btn-default" data-dismiss="modal">Cancel</button><button id="save-confirm" type="button" onclick="'+action+'" class="btn btn-'+msize+' btn-'+mtype+'" data-dismiss="modal">'+btntxt+'</button></div></form></div></div></div>';
			//var ConfirmModal = 'bello';
			
			$('body').remove('#modal-confirm');
			$('body').append(ConfirmModal);
			$('#modal-confirm').modal('show');
			//$(this).text('Generating...');
			//$(".greceipt").prop('disabled','disabled');
			
			//$(this).text('wait...').prop('disabled','disabled');
			
			var thisitem 	 = $(this).prop('id');
			var thisitemHtml = $(this).html();
			
			//$('#save-confirm').prop('onclick', action);
			
		/*	}
			else
				alert('Please try after few seconds');*/
		};
		
		$.fn.D = function(w,a){
			//alert('ok');
		if(working === false)
		{
			working = true;
			//$(this).text('Generating...');
			//$(".greceipt").prop('disabled','disabled');
			
			var thisitem = $(this).prop('id');
			var thisitemHtml = $(this).html();
			
			$(this).text('wait...').prop('disabled','disabled');
			
			
			p(PATH + 'ajx/0.php', null,'w=' + w + '&a=' + a + '&m=FD',null,'json', function(data) {
				if(data.stts == '1') {
					title = 'Success';
					sucmsg = data.msg;
					type = 'dark';
					location.reload();
					$('#table-'+w).bootstrapTable('refresh');
					working = false;
					$("#"+thisitem).html(thisitemHtml).prop('disabled', false);
					$('#modal-confirm').modal('hide');
					
				} else {
					title = 'Error';
					//sucmsg = data;
					type = 'danger';
					sucmsg = '<ul>';
					for(var i=0; i<data.length;i++)
					{
						//alert(data[i]);
						sucmsg = sucmsg + '<li>' + data[i] + '</li>';
					}
					sucmsg = sucmsg + '</ul>'
						working = false;
					$("#"+thisitem).html(thisitemHtml).prop('disabled', false);
					$('#modal-confirm').modal('hide');
				}
				new PNotify({
					title: title,
					text: sucmsg,
					type: type
				});
				//location.reload();
				//$("#"+thisitem).prop('disabled', false).text('Delete');
				//$("#"+thisitem).html(thisitemHtml).prop('disabled', false);
				//working = false;
				
			});
			}
			else
				alert('Please try after few seconds');
		};
		
		
		
		
    });

}(jQuery));
jQuery(document).ready(function(){
	
		$.fn.chkAll = function(){
			
			ck = $(this).prop('id').split('_')[1];
						
			if($(this).is(':checked')){
				//alert($(this).is(':checked') + 'CHK');
				$('.'+ck).prop('checked','checked');
			}
			else{
				//alert($(this).is(':checked') + 'UNCHK');
				$('.'+ck).prop('checked',false);
			}	
		};
		$.fn.chkMain = function(){
			//alert('s');
			ck = $(this).prop('className');
			checkMain = 0; totalck = $('.'+ck).length;
			$('.'+ck).each(function(){
				
				if($(this).is(':checked')){
					checkMain += 1;
				}
				if(checkMain == totalck || checkMain == 0)
					$('#all_'+ck).prop('checked','checked');
				else
					$('#all_'+ck).prop('checked',false);
				
				
				
					
			});
		};
	$('#navbar-toggle-left').click(function(){
		//alert('asd');
		//$('.navbar-side').animate({left: '-260px'}, 5000, function() { });
		if( $('.navbar-side').offset().left == 0)
		{
			$('.navbar-side').animate({left: '-260px'},'slow');
			$('#page-wrapper').animate({marginLeft: '0px',width: '100%'},'slow');
			
			$(this).css('transform', 'rotate(90deg)');
		}
		else
		{
			$('.navbar-side').animate({left: '0px'},'slow');
			$('#page-wrapper').animate({marginLeft: '260px'},'slow');
			
			$(this).css('transform', 'rotate(0deg)');
		}
	});
	$('#modal-termination').modal();
});
/*
a = action
f = from
d = data
r = return inner function
t = dataType
s = success function .done
*/
//var rtn = false;

function p(a = '/', f = null, d = null, r=null, dtyp, s=null) {
	
	//if(a == null) a = document.forms[0].form.attr( "action" );
	//if(d==null) d = $(f).serialize();
	d = (f!=null) ? $(f).serialize() + d : d;
	dtyp = (dtyp==null ?'json':dtyp);
	//alert(d + 'd')
	 $.post(a, d, r, dtyp).done(s);
	//rtn = r;
	//return $xyz;
}