/*
 * Goodyear
 * Timur Arefev (http://timurarefev.ru), Ilya Birman (http://ilyabirman.ru)
 * 2014
 */
 
(function($){
  jQuery.fn.goodyear = function(options, methods_params){
    
    var init = function(element, options, methods_params){
                
        if ($(element).length > 1)
        {

          $(element).each(function(){
            
            if ($(this).is("input"))
            {
                init_single(this, options, methods_params);
            };
            
          });

        } else
        {
            if ($(element).is("input"))
            {
                return init_single(element, options, methods_params);
            };
            
        };
        
    };
    		
    var init_single = function(element, options, methods_params){
        
        var goodyear_input = $(element);
                
        var found_goodyear_id = false;        
        
        if (typeof(activated_goodyears_list) != "undefined")
        $.each(activated_goodyears_list, function(index, value){
                            
            if (value.element[0] == goodyear_input[0])
            {
                found_goodyear_id = index;
            };
            
        });
        
        if (found_goodyear_id !== false)
        {
            
            //
            //  ���������� ������� ��� ��� ��������������� goodyear
            //
                        
            
            if (typeof(options) != "undefined" && options)
            {
            
                switch (options)
                {
                    /*
                    case "set_min_date":
                    
                      
                        activated_goodyears_list[found_goodyear_id].options.min_date = options.min_date;
                      
                        activated_goodyears_list[found_goodyear_id].options.min_year = parseInt(options.min_date.format("YYYY"), 10);
                      
                        activated_goodyears_list[found_goodyear_id].methods["set_date"];
                        
                    break;
                    
                    case "set_max_date":
                    
                      
                        activated_goodyears_list[found_goodyear_id].options.max_date = options.max_date;
                      
                        activated_goodyears_list[found_goodyear_id].options.max_year = parseInt(options.max_date.format("YYYY"), 10);
                      
                        activated_goodyears_list[found_goodyear_id].methods["set_date"];
                        
                    break;
                    */
                    
                    case "set_date":
                    
                        activated_goodyears_list[found_goodyear_id].states.selected_date = activated_goodyears_list[found_goodyear_id].methods.string_to_date(methods_params); 
                        
                        activated_goodyears_list[found_goodyear_id].states.input_text_value = activated_goodyears_list[found_goodyear_id].states.selected_date.format(activated_goodyears_list[found_goodyear_id].options.visible_format);
                        
                        activated_goodyears_list[found_goodyear_id].states.input_hidden_text_value = activated_goodyears_list[found_goodyear_id].states.selected_date.format(activated_goodyears_list[found_goodyear_id].options.format);
                        
                        activated_goodyears_list[found_goodyear_id].states.container.find(".goodyear-text").val(activated_goodyears_list[found_goodyear_id].states.input_text_value);
        			
            			activated_goodyears_list[found_goodyear_id].states.container.find(".goodyear-hidden-text").val(activated_goodyears_list[found_goodyear_id].states.input_hidden_text_value);
            			
            			if (activated_goodyears_list[found_goodyear_id].states.input_text_value == activated_goodyears_list[found_goodyear_id].states.selected_date.format(activated_goodyears_list[found_goodyear_id].options.visible_format))
            			{
            				activated_goodyears_list[found_goodyear_id].states.container.removeClass("goodyear-error");
            				
            				activated_goodyears_list[found_goodyear_id].states.input_text_error = false;
            				
            			} else
            			{
            				if (activated_goodyears_list[found_goodyear_id].states.input_text_value)
            				{
            					activated_goodyears_list[found_goodyear_id].states.container.addClass("goodyear-error");
            				
            					activated_goodyears_list[found_goodyear_id].states.input_text_error = true;
            				};
            			};
                        
                        activated_goodyears_list[found_goodyear_id].methods.set_date();
                    
                    break;
                    
                    case "get_date":
                        
                        if (typeof(methods_params) != "undefined")
                        {
                            var format = methods_params;
                        } else
                        {
                            var format = activated_goodyears_list[found_goodyear_id].options.format;
                        };
                        
                        return activated_goodyears_list[found_goodyear_id].states.selected_date.format(format);
                    
                    break;
                    
                    case "focus":
                    
                        activated_goodyears_list[found_goodyear_id].states.container.find(".goodyear-text").trigger("focus");
                    
                    break;
                
                };            
                
            
            };   
        
        } else
        {
        
            var options = $.extend({
    		
        		format : "YYYY-MM-DD",
        		
        		visible_format : "D MMMM YYYY �.",
        		
        		minutes_step : 5			
    		
            }, options);
        	  	
        	var block_model = {
        		
        		single_date_item_width : 25,
        		
        		single_date_item_height : 21,
        		
        		year_block_height : 269,
        		
        		year_selection_top : 119,
        		
        		year_selection_border_top : 1,
        		
        		single_year_item_height : 32,
        		
        		month_block_height : 240,
        		
        		month_slider_height : 55,
        		
        		month_slider_top_manual_correction : 1,
        		
        		single_month_item_height : 20,
        		
        		date_block_height : 267,
        		
        		date_block_month_block_padding_top : 5,
        		
        		date_block_month_block_padding_bottom : 5,
        		
        		date_block_label_height : 21,
        		
        		date_block_label_border_bottom : 1,
        		
        		range_from_text_block_to_picker : 3,
        		
        		picker_open : null		
        		
            };
        	
        	var templates = {
        		
        		container : function(){			
        		
        			return "\
        			<div class='goodyear-container'>\
        			" + (!options.no_icon ? "<div class='goodyear-icon'></div>" : "") + "\
        			<div class='goodyear-picker"+(options.hour_picker ? " goodyear-add-hour-picker" : "") + (options.minute_picker ? " goodyear-add-minute-picker" : "")+"'>\
        				<div class='goodyear-date-picker'>\
        					<div class='goodyear-slider'>\
        						"+templates.days()+"\
        					</div>\
        				</div>\
        				<div class='goodyear-month-picker'>\
        					<div class='goodyear-months'>\
        						"+templates.months()+"\
        					</div>\
        					<div class='goodyear-slider'>\
        						<div class='goodyear-months'>\
        							"+templates.months()+"\
        						</div>\
        					</div>\
        				</div>\
        				<div class='goodyear-date-picker-label'>\
        					<div class='goodyear-date-picker-label-background'></div>\
        					<span class='goodyear-monday'>" + presets.days_of_week[0] + "</span>\
        					<span class='goodyear-tuesday'>" + presets.days_of_week[1] + "</span>\
        					<span class='goodyear-wednesday'>" + presets.days_of_week[2] + "</span>\
        					<span class='goodyear-thursday'>" + presets.days_of_week[3] + "</span>\
        					<span class='goodyear-friday'>" + presets.days_of_week[4] + "</span>\
        					<span class='goodyear-saturday'>" + presets.days_of_week[5] + "</span>\
        					<span class='goodyear-sunday'>" + presets.days_of_week[6] + "</span>\
        				</div>\
        				<div class='goodyear-year-picker'>\
        					<div class='goodyear-years'>\
        						<div class='goodyear-years-floating-block'>\
        							"+templates.years()+"\
        						</div>\
        					</div>\
        					<div class='goodyear-current-year-selection'>\
        						<div class='goodyear-years-floating-block'>\
        							"+templates.years()+"\
        						</div>\
        					</div>\
        				</div>\
                        " + (options.hour_picker ? "\
                        <div class='goodyear-hour-picker'>\
        					<div class='goodyear-hours'>\
        						<div class='goodyear-hours-floating-block'>\
        							"+templates.hours()+"\
        						</div>\
        					</div>\
        					<div class='goodyear-current-hour-selection'>\
        						<div class='goodyear-hours-floating-block'>\
        							"+templates.hours()+"\
        						</div>\
        					</div>\
        				</div>\
                        \
                        <div class='goodyear-minute-picker'>\
                            " + (options.minute_picker ? "\
        					<div class='goodyear-minutes'>\
        						<div class='goodyear-minutes-floating-block'>\
        							"+templates.minutes()+"\
        						</div>\
        					</div>\
                            " : "") + "\
        					<div class='goodyear-current-minute-selection'>\
        						<div class='goodyear-minutes-floating-block'>\
        							"+(options.minute_picker ? templates.minutes() : "<div class='goodyear-minute'><span>00</span></div>")+"\
        						</div>\
        					</div>\
        				</div>\
                        <div class='goodyear-time-divider'>\
                        :\
                        </div>\
                        " : "") + "\
        			</div>\
        			</div>";			
        		},
                
                hours : function(){
        			
        			var text = "";
        			
        			for (i = 0; i < 24; i++)
        			{
        				text += "<div class='goodyear-hour'><span>" + (i < 10 ? "0" : "") + i + "</span></div>";
        			};
        			
        			return text;
        		},
                
                minutes : function(){
        			
        			var text = "";
        			
        			for (i = 0; i < 60; i = i + options.minutes_step)
        			{
        				text += "<div class='goodyear-minute'><span>" + (i < 10 ? "0" : "") + i + "</span></div>";
        			};
        			
        			return text;
        		},
        		
        		years : function(min_year, max_year){
        			
        			var text = "";
        			
        			for (i = options.min_year; i <= options.max_year; i++)
        			{
        				text += "<div class='goodyear-year" + (states.today.format("YYYY") == i ? " today" : "") + "'><span>" + i + (states.today.format("YYYY") == i ? " &bull;" : "") + "</span></div>";
        			};
        			
        			return text;
        		},
        		
        		months : function(){
        			
        			var text = "";  
        		  
        			for (month_num = 0; month_num < 12; month_num++)
        			{	
        						  
        			  text += "<div class='goodyear-month goodyear-"+presets.months_en[month_num] + (states.today.format("M") == (month_num + 1) ? " today" : "") + "'>"+presets.months_ru_short[month_num] + (states.today.format("M") == (month_num + 1) ? "<span class='bull'> &bull;</span>" : "") + "</div>";
        			  
        			};
        			
        			return text;
        			
        		},
        		
        		days : function(){
        
        			var text = "";  
        			  
        			for (month_num = 0; month_num < 12; month_num++)
        			{	
        				
        				var month_first_date = moment(states.selected_date.format("YYYY") + "-" + (month_num + 1) + "-01", "YYYY-M-DD");
        			
        				var day_of_week = month_first_date.format("e");
        				
        				var days_count = month_first_date.add("months", 1).subtract("days", 1).format("D");
        				
        				var shifted = (day_of_week > 2 ? 9 : 2) - day_of_week;
        
        				var line_1_weekdays_shift = (9 - shifted)*block_model.single_date_item_width;		  
        				var line_1_weekend_shift = (4 - shifted)*block_model.single_date_item_width;
        				
        				var line_2_weekdays_shift = (2 - shifted)*block_model.single_date_item_width;		  
        				var line_2_weekend_shift = (0 - shifted)*block_model.single_date_item_width;
        				
        				var line_all_weekdays_shift = (0 - shifted)*block_model.single_date_item_width;		  
        				var line_all_weekend_shift = (0 - shifted)*block_model.single_date_item_width;		
        			  
        				text += "\
        				<div class='goodyear-month goodyear-"+presets.months_en[month_num]+"' data-month-id='"+month_num+"'>\
        					<div class='goodyear-label'>" + presets.months_ru[month_num].substr(0, 1).toUpperCase() + presets.months_ru[month_num].substr(1) + "</div>\
        					<div class='goodyear-line_1'>\
        						<div class='goodyear-weekdays'>\
        							<div class='goodyear-slide_line' style='left:"+line_1_weekdays_shift+"px;'>\
        								<span date='1'>1</span>\
        								<span date='2'>2</span>\
        							</div>\
        						</div>\
        						<div class='goodyear-weekend'>\
        							<div class='goodyear-slide_line' style='left:"+line_1_weekend_shift+"px;'>\
        								<span date='1'>1</span>\
        								<span date='2'>2</span>\
        								<span date='3'>3</span>\
        								<span date='4'>4</span>\
        							</div>\
        						</div>\
        					</div>\
        					<div class='goodyear-line_2'>\
        						<div class='goodyear-weekdays'>\
        							<div class='goodyear-slide_line' style='left:"+line_2_weekdays_shift+"px;'>\
        								<span date='1'>1</span>\
        								<span date='2'>2</span>\
        								<span date='3'>3</span>\
        								<span date='4'>4</span>\
        								<span date='5'>5</span>\
        								<span date='6'>6</span>\
        								<span date='7'>7</span>\
        								<span date='8'>8</span>\
        								<span date='9'>9</span>\
        							</div>\
        						</div>\
        						<div class='goodyear-weekend'>\
        							<div class='goodyear-slide_line' style='left:"+line_2_weekend_shift+"px;'>\
        								<span date='4'>4</span>\
        								<span date='5'>5</span>\
        								<span date='6'>6</span>\
        								<span date='7'>7</span>\
        								<span date='8'>8</span>\
        								<span date='9'>9</span>\
        								<span date='10'>10</span>\
        								<span date='11'>11</span>\
        							</div>\
        						</div>\
        					</div>\
        					<div class='goodyear-line_3'>\
        						<div class='goodyear-weekdays'>\
        							<div class='goodyear-slide_line' style='left:"+line_all_weekdays_shift+"px;'>\
        								<span date='6'>6</span>\
        								<span date='7'>7</span>\
        								<span date='8'>8</span>\
        								<span date='9'>9</span>\
        								<span date='10'>10</span>\
        								<span date='11'>11</span>\
        								<span date='12'>12</span>\
        								<span date='13'>13</span>\
        								<span date='14'>14</span>\
        								<span date='15'>15</span>\
        								<span date='16'>16</span>\
        							</div>\
        						</div>\
        						<div class='goodyear-weekend'>\
        							<div class='goodyear-slide_line' style='left:"+line_all_weekend_shift+"px;'>\
        								<span date='11'>11</span>\
        								<span date='12'>12</span>\
        								<span date='13'>13</span>\
        								<span date='14'>14</span>\
        								<span date='15'>15</span>\
        								<span date='16'>16</span>\
        								<span date='17'>17</span>\
        								<span date='18'>18</span>\
        							</div>\
        						</div>\
        					</div>\
        					<div class='goodyear-line_4'>\
        						<div class='goodyear-weekdays'>\
        							<div class='goodyear-slide_line' style='left:"+line_all_weekdays_shift+"px;'>\
        								<span date='13'>13</span>\
        								<span date='14'>14</span>\
        								<span date='15'>15</span>\
        								<span date='16'>16</span>\
        								<span date='17'>17</span>\
        								<span date='18'>18</span>\
        								<span date='19'>19</span>\
        								<span date='20'>20</span>\
        								<span date='21'>21</span>\
        								<span date='22'>22</span>\
        								<span date='23'>23</span>\
        							</div>\
        						</div>\
        						<div class='goodyear-weekend'>\
        							<div class='goodyear-slide_line' style='left:"+line_all_weekend_shift+"px;'>\
        								<span date='18'>18</span>\
        								<span date='19'>19</span>\
        								<span date='20'>20</span>\
        								<span date='21'>21</span>\
        								<span date='22'>22</span>\
        								<span date='23'>23</span>\
        								<span date='24'>24</span>\
        								<span date='25'>25</span>\
        							</div>\
        						</div>\
        					</div>\
        					<div class='goodyear-line_5'>\
        						<div class='goodyear-weekdays'>\
        							<div class='goodyear-slide_line' style='left:"+line_all_weekdays_shift+"px;'>\
        								<span date='20'>20</span>\
        								<span date='21'>21</span>\
        								<span date='22'>22</span>\
        								<span date='23'>23</span>\
        								<span date='24'>24</span>\
        								<span date='25'>25</span>\
        								<span date='26'>26</span>\
        								<span date='27'>27</span>\
        								<span date='28'>28</span>\
        								<span date='29' "+(days_count < 29 ? "style='display:none'" : "")+">29</span>\
        								<span date='30' "+(days_count < 30 ? "style='display:none'" : "")+">30</span>\
        							</div>\
        						</div>\
        						<div class='goodyear-weekend'>\
        							<div class='goodyear-slide_line' style='left:"+line_all_weekend_shift+"px;'>\
        								<span date='25'>25</span>\
        								<span date='26'>26</span>\
        								<span date='27'>27</span>\
        								<span date='28'>28</span>\
        								<span date='29' "+(days_count < 29 ? "style='display:none'" : "")+">29</span>\
        								<span date='30' "+(days_count < 30 ? "style='display:none'" : "")+">30</span>\
        								<span date='31' "+(days_count < 31 ? "style='display:none'" : "")+">31</span>\
        							</div>\
        						</div>\
        					</div>\
        					<div class='goodyear-line_6'>\
        						<div class='goodyear-weekdays'>\
        							<div class='goodyear-slide_line' style='left:"+line_all_weekdays_shift+"px;'>\
        								<span date='27'>27</span>\
        								<span date='28'>28</span>\
        								<span date='29' "+(days_count < 29 ? "style='display:none'" : "")+">29</span>\
        								<span date='30' "+(days_count < 30 ? "style='display:none'" : "")+">30</span>\
        								<span date='31' "+(days_count < 31 ? "style='display:none'" : "")+">31</span>\
        							</div>\
        						</div>\
        					</div>\
        				</div>";
        			};	
        			
        			return text;		
        			
        		}
        		
        	
        	};
        	
        	var presets = {
        		months_en : ["january", "febrary", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
        		months_ru : ["������", "�������", "����", "������", "���", "����", "����", "������", "��������", "�������", "������", "�������"],
        		months_ru_short : ["���", "���", "���", "���", "���", "����", "����", "���", "���", "���", "���", "���"],
        		months_ru_genitive : ["������", "�������", "�����", "������", "���", "����", "����", "�������", "��������", "�������", "������", "�������"],
        		days_of_week : ["�", "�", "�", "�", "�", "�", "�"],
        		common_date_formats : [["D M", "DD M", "DD MM", "D-M", "DD-M", "DD-MM","D.M", "DD.M", "DD.MM","D\\M", "DD\\M", "DD\\MM","D/M", "DD/M", "DD/MM", "D M YY", "DD M YY", "DD MM YY","D M YYYY", "DD M YYYY", "DD MM YYYY", "D-M-YY", "DD-M-YY", "DD-MM-YY","D-M-YYYY", "DD-M-YYYY", "DD-MM-YYYY", "D.M.YY", "DD.M.YY", "DD.MM.YY","D.M.YYYY", "DD.M.YYYY", "DD.MM.YYYY", "D\\M\\YY", "DD\\M\\YY", "DD\\MM\\YY","D\\M\\YYYY", "DD\\M\\YYYY", "DD\\MM\\YYYY", "D/M/YY", "DD/M/YY", "DD/MM/YY","D/M/YYYY", "DD/M/YYYY", "DD/MM/YYYY", "D M YY", "DD M YY", "DD MM YY","D M YYYY", "DD M YYYY", "DD MM YYYY", "D-M-YY", "DD-M-YY", "DD-MM-YY","D-M-YYYY", "DD-M-YYYY", "DD-MM-YYYY", "D.M.YY", "DD.M.YY", "DD.MM.YY","D.M.YYYY", "DD.M.YYYY", "DD.MM.YYYY", "D\\M\\YY", "DD\\M\\YY", "DD\\MM\\YY","D\\M\\YYYY", "DD\\M\\YYYY", "DD\\MM\\YYYY", "D/M/YY", "DD/M/YY", "DD/MM/YY","D/M/YYYY", "DD/M/YYYY", "DD/MM/YYYY", "YY M D", "YY M DD", "YY MM DD","YYYY M D", "YYYY M DD", "YYYY MM DD", "YY-M-D", "YY-M-DD", "YY-MM-DD","YYYY-M-D", "YYYY-M-DD", "YYYY-MM-DD", "YY.M.D", "YY.M.DD", "YY.MM.DD","YYYY.M.D", "YYYY.M.DD", "YYYY.MM.DD", "YY\\M\\D", "YY\\M\\DD", "YY\\MM\\DD","YYYY\\M\\D", "YYYY\\M\\DD", "YYYY\\MM\\DD", "YY/M/D", "YY/M/DD", "YY/MM/DD","YYYY/M/D", "YYYY/M/DD", "YYYY/MM/DD", "YY D M", "YY DD M", "YY DD MM","YYYY D M", "YYYY DD MM", "YYYY DD MM", "YY-D-M", "YY-DD-M", "YY-DD-MM","YYYY-D-M", "YYYY-DD-MM", "YYYY-DD-MM", "YY.D.M", "YY.DD.M", "YY.DD.MM","YYYY.D.M", "YYYY.DD.MM", "YYYY.DD.MM", "YY\\D\\M", "YY\\DD\\M", "YY\\DD\\MM","YYYY\\D\\M", "YYYY\\DD\\MM", "YYYY\\DD\\MM", "YY/D/M", "YY/DD/M", "YY/DD/MM","YYYY/D/M", "YYYY/DD/MM", "YYYY/DD/MM", "D MMM", "DD MMM", "D M HH:mm", "DD M HH:mm", "DD MM HH:mm", "D-M HH:mm", "DD-M HH:mm", "DD-MM HH:mm","D.M HH:mm", "DD.M HH:mm", "DD.MM HH:mm","D\\M HH:mm", "DD\\M HH:mm", "DD\\MM HH:mm","D/M HH:mm", "DD/M HH:mm", "DD/MM HH:mm", "D M YY HH:mm", "DD M YY HH:mm", "DD MM YY HH:mm","D M YYYY HH:mm", "DD M YYYY HH:mm", "DD MM YYYY HH:mm", "D-M-YY HH:mm", "DD-M-YY HH:mm", "DD-MM-YY HH:mm","D-M-YYYY HH:mm", "DD-M-YYYY HH:mm", "DD-MM-YYYY HH:mm", "D.M.YY HH:mm", "DD.M.YY HH:mm", "DD.MM.YY HH:mm","D.M.YYYY HH:mm", "DD.M.YYYY HH:mm", "DD.MM.YYYY HH:mm", "D\\M\\YY HH:mm", "DD\\M\\YY HH:mm", "DD\\MM\\YY HH:mm","D\\M\\YYYY HH:mm", "DD\\M\\YYYY HH:mm", "DD\\MM\\YYYY HH:mm", "D/M/YY HH:mm", "DD/M/YY HH:mm", "DD/MM/YY HH:mm","D/M/YYYY HH:mm", "DD/M/YYYY HH:mm", "DD/MM/YYYY HH:mm", "D M YY HH:mm", "DD M YY HH:mm", "DD MM YY HH:mm","D M YYYY HH:mm", "DD M YYYY HH:mm", "DD MM YYYY HH:mm", "D-M-YY HH:mm", "DD-M-YY HH:mm", "DD-MM-YY HH:mm","D-M-YYYY HH:mm", "DD-M-YYYY HH:mm", "DD-MM-YYYY HH:mm", "D.M.YY HH:mm", "DD.M.YY HH:mm", "DD.MM.YY HH:mm","D.M.YYYY HH:mm", "DD.M.YYYY HH:mm", "DD.MM.YYYY HH:mm", "D\\M\\YY HH:mm", "DD\\M\\YY HH:mm", "DD\\MM\\YY HH:mm","D\\M\\YYYY HH:mm", "DD\\M\\YYYY HH:mm", "DD\\MM\\YYYY HH:mm", "D/M/YY HH:mm", "DD/M/YY HH:mm", "DD/MM/YY HH:mm","D/M/YYYY HH:mm", "DD/M/YYYY HH:mm", "DD/MM/YYYY HH:mm", "YY M D HH:mm", "YY M DD HH:mm", "YY MM DD HH:mm","YYYY M D HH:mm", "YYYY M DD HH:mm", "YYYY MM DD HH:mm", "YY-M-D HH:mm", "YY-M-DD HH:mm", "YY-MM-DD HH:mm","YYYY-M-D HH:mm", "YYYY-M-DD HH:mm", "YYYY-MM-DD HH:mm", "YY.M.D HH:mm", "YY.M.DD HH:mm", "YY.MM.DD HH:mm","YYYY.M.D HH:mm", "YYYY.M.DD HH:mm", "YYYY.MM.DD HH:mm", "YY\\M\\D HH:mm", "YY\\M\\DD HH:mm", "YY\\MM\\DD HH:mm","YYYY\\M\\D HH:mm", "YYYY\\M\\DD HH:mm", "YYYY\\MM\\DD HH:mm", "YY/M/D HH:mm", "YY/M/DD HH:mm", "YY/MM/DD HH:mm","YYYY/M/D HH:mm", "YYYY/M/DD HH:mm", "YYYY/MM/DD HH:mm", "YY D M HH:mm", "YY DD M HH:mm", "YY DD MM HH:mm","YYYY D M HH:mm", "YYYY DD MM HH:mm", "YYYY DD MM HH:mm", "YY-D-M HH:mm", "YY-DD-M HH:mm", "YY-DD-MM HH:mm","YYYY-D-M HH:mm", "YYYY-DD-MM HH:mm", "YYYY-DD-MM HH:mm", "YY.D.M HH:mm", "YY.DD.M HH:mm", "YY.DD.MM HH:mm","YYYY.D.M HH:mm", "YYYY.DD.MM HH:mm", "YYYY.DD.MM HH:mm", "YY\\D\\M HH:mm", "YY\\DD\\M HH:mm", "YY\\DD\\MM HH:mm","YYYY\\D\\M HH:mm", "YYYY\\DD\\MM HH:mm", "YYYY\\DD\\MM HH:mm", "YY/D/M HH:mm", "YY/DD/M HH:mm", "YY/DD/MM HH:mm","YYYY/D/M HH:mm", "YYYY/DD/MM HH:mm", "YYYY/DD/MM HH:mm", "D MMM HH:mm", "DD MMM HH:mm"],[ "YYYY MMM D", "YYYY MMM DD", "YYYY D MMM", "YYYY DD MMM", "D MMM YY", "DD MMM YY", "D MMM YYYY", "DD MMM YYYY", "D MMM YY", "DD MMM YY", "D MMM YYYY", "DD MMM YYYY", "MMM D YYYY", "MMM DD YYYY", "YY MMM D", "YY MMM DD", "YY D MMM", "YY DD MMM", "D MMM", "DD MMM", "YYYY MMM D HH:mm", "YYYY MMM DD HH:mm", "YYYY D MMM HH:mm", "YYYY DD MMM HH:mm", "D MMM YY HH:mm", "DD MMM YY HH:mm", "D MMM YYYY HH:mm", "DD MMM YYYY HH:mm", "D MMM YY HH:mm", "DD MMM YY HH:mm", "D MMM YYYY HH:mm", "DD MMM YYYY HH:mm", "MMM D YYYY HH:mm", "MMM DD YYYY HH:mm", "YY MMM D HH:mm", "YY MMM DD HH:mm", "YY D MMM HH:mm", "YY DD MMM HH:mm", "D MMM HH:mm", "DD MMM HH:mm"],[ "YYYY MMM D", "YYYY MMM DD", "YYYY D MMM", "YYYY DD MMM", "D MMM YY", "DD MMM YY", "D MMM YYYY", "DD MMM YYYY", "D MMM YY", "DD MMM YY", "D MMM YYYY", "DD MMM YYYY", "MMM D YYYY", "MMM DD YYYY",   "YY MMM D", "YY MMM DD", "YY D MMM", "YY DD MMM", "YYYY MMM D HH:mm", "YYYY MMM DD HH:mm", "YYYY D MMM HH:mm", "YYYY DD MMM HH:mm", "D MMM YY HH:mm", "DD MMM YY HH:mm", "D MMM YYYY HH:mm", "DD MMM YYYY HH:mm", "D MMM YY HH:mm", "DD MMM YY HH:mm", "D MMM YYYY HH:mm", "DD MMM YYYY HH:mm", "MMM D YYYY HH:mm", "MMM DD YYYY HH:mm",   "YY MMM D HH:mm", "YY MMM DD HH:mm", "YY D MMM HH:mm", "YY DD MMM HH:mm"]],
        		common_date_langs : ["ru", "en"]
        	};
        	
        	var states = {
        		input_text_value : null, //������� ������ � input'e
        		selected_date : null, //��������� ���� � ������� moment
        		today : null, //������� � ������� moment
        		displayed_year : null, //������������ � ������ ������ ���
                selected_hour : null, //��������� � ������ ������ ���
                selected_minute : null, //��������� � ������ ������ ������
        		container : null, //��������� �� ���� ����������
        		drag_item : null, //�������������� � ������ ������ �������
        		drag_start_pos_y : null, // ��������� ��������� ��� �������������
        		drag_start_element_top : null, //��������� ������� ��������
        		drag_started : null,
        		is_mobile : null,
        		input_text_error : null,// ��������� � ��������� ������ (�� ���������� ����),
        		mousewheel : null//��������� ������ mousewheel
        	};
        	
        	var methods = {
                
        		wrap_element : function(element){
                    
        			var container_template = $(templates.container()).clone();
                    
        			switch ($(element).css("box-sizing"))
        			{			
        				case "border-box" :
                                                
                                                //
                                                //  ������ ����� ���� ���� �� ������ � css
                                                //
                                                
                                                var css_width = $(element).css("width");
                        
                                                if (
                                                    typeof(css_width) == "undefined" ||
                                                    (
                                                        parseInt(css_width, 10) == 0 &&
                                                        css_width.substr(css_width.length - 2) == "px"
                                                    )
                                                )
                                                {                                
                                                   // 
                                                   // � ����� ������ ����� ������ ����������� ������ �������� 
                                                   //
                                                   
                                                   container_template.css("width", $(element).width());  
                                                } else
                                                {
                                                   container_template.css("width", css_width);                                
                                                };

        				break;
        				
        				case "content-box" :
        					container_template.css("width", 
        							parseFloat($(element).width())
        							+ parseFloat($(element).css("padding-left"))
        							+ parseFloat($(element).css("padding-right"))
        							+ parseFloat($(element).css("border-left-width"))
        							+ parseFloat($(element).css("border-right-width")));
        					
        					$(element).css("height", parseFloat($(element).height())
        							+ parseFloat($(element).css("padding-top"))
        							+ parseFloat($(element).css("padding-bottom"))
        							+ parseFloat($(element).css("border-top-width"))
        							+ parseFloat($(element).css("border-bottom-width")));
        				break;
        				
        				case "padding-box" :
        					container_template.css("width", 
        							parseFloat($(element).width())
        							+ parseFloat($(element).css("border-left-width"))
        							+ parseFloat($(element).css("border-right-width")));
        					
        					$(element).css("height", parseFloat($(element).height())
        							+ parseFloat($(element).css("border-top-width"))
        							+ parseFloat($(element).css("border-bottom-width")));
        				break;			
        			}
        			
        			element.wrapAll(container_template);	
        			
        			var visible_element = element.clone();
        			
        			element.removeClass("goodyear").addClass("goodyear-hidden-text");
        			
        			states.container = element.parent();
        			
        			visible_element.removeAttr("name").removeClass("goodyear").addClass("goodyear-text");
        			
        			visible_element.prependTo(states.container);
        			
        			states.container.find(".goodyear-text").val(states.input_text_value);
        			
        			states.container.find(".goodyear-hidden-text").val(states.input_hidden_text_value);
        			
        			if (states.input_text_value == states.selected_date.format(options.visible_format))
        			{
        				states.container.removeClass("goodyear-error");
        				
        				states.input_text_error = false;
        				
        			} else
        			{
        				if (states.input_text_value)
        				{
        					states.container.addClass("goodyear-error");
        				
        					states.input_text_error = true;
        				};
        			};
        			
        			var is_mobile = new RegExp('mobile|android', "i");
        			
        			states.is_mobile = is_mobile.test(navigator.userAgent);
        						
        			/*
        				������������� ������� � ��������� � ������������ � ��������� �����
        			*/
        			
        			methods.set_date();
        
        			/*
        				��������� �� input
        			*/
        			
        			methods.input_icon_hover();
        			
        			/*
        				���������� ����������� ������� � ������� ����� ����
        			*/
        			
        			if (!states.is_mobile)
        			{
        			
        				methods.show_and_hide_picker();
        		  	
        			};
        			
        			/*
        				�������������� ���� ��� ����� ������
        			*/
        			
        			methods.set_date_on_blur();
        		  
        			/*
        				��������� ������ ��� ���������
        			*/
        		  
        			methods.months_hover();
        
        		    /*
        				���� �� ������
        		    */
        		  
        		  	methods.months_click();
        		  
        			/*
        				��������� ������ ��������������
        			*/
        		  
        		 	methods.months_drag();
        		  
        			/*
        				��������� �������
        			*/
        		  
        			methods.months_mousewheel();
        			
        			/*
        				��������� ������� �����
        			*/
        		  
        			//methods.months_touch();
        		  
        			/*
        				��������� ���� ��� ���������
        			*/
        			
        			methods.year_mouseenter();
        		  
        			/*
        				���� �� ����
        			*/
        		  
        			methods.year_click();
        		  
        			/*
        				������������� ����
        			*/
        		  
        			methods.year_drag();
        			
        			/*
        				������������� ����
        			*/
        		  
        			//methods.year_touch();
        		  
        			/*
        				��������� ���� �����
        			*/
        		  
        			methods.year_mousewheel();
                    
        			if (options.hour_picker)
        			{
        			
	                    /*
	        				��������� ���� ��� ���������
	        			*/
	        			
	        			methods.hour_mouseenter();
	                    
	                    /*
	        				���� �� ����
	        			*/
	        		  
	        			methods.hour_click();
	                    
	                    /*
	        				������������� ����
	        			*/
	        		  
	        			methods.hour_drag();
	                    
	                    /*
	        				��������� ���� �����
	        			*/
	        		  
	        			methods.hour_mousewheel();
	        			
	        			if (options.minute_picker)
	        			{
	        			
		                    /*
		        				��������� ������ ��� ���������
		        			*/
		        			
		        			methods.minute_mouseenter();
		                    
		                    /*
		        				���� �� ������
		        			*/
		        		  
		        			methods.minute_click();
		                    
		                    /*
		        				������������� ������
		        			*/
		        		  
		        			methods.minute_drag();
		                    
		                    /*
		        				��������� ���� �����
		        			*/
		        		  
		        			methods.minute_mousewheel();
	        			
	        			};
	        		
        			};
	        			
        			/*
        				��������� ���� ��� ���������
        			*/
                  
        			methods.date_hover();
                    
        		  
        			/*
        				����� ����
        			*/
        		  
        			methods.date_pick();
                                        
                    return element;
        			
        		},
        		
        		document_actions : function(){
        		  
                    if (typeof(activated_goodyears_list) == "undefined")
                    activated_goodyears_list = [];
                    
                    if (activated_goodyears_list.length == 1)
                    {
                    
                    	$("html").mouseup(function(){
                    	   
                            var drag_item = false;
                        	
                            $.each(activated_goodyears_list, function(index, goodyear_element){
                               
                                //
                                //  ������������� ��������� ��� ��� �������� goodyears
                                //
                               
                                if (goodyear_element.states.picker_open)
                                { 
                                   goodyear_element.states.container.find(".goodyear-hidden-text").triggerHandler("blur");
                                }; 
                               
                                if (goodyear_element.states.drag_item)
                                drag_item = true;
                                
                            });
                            
                            if (!drag_item)
                            {

                                $(".goodyear-picker").css("zIndex", 1);

                                $(".goodyear-picker").fadeOut(100);

                                $.each(activated_goodyears_list, function(index, goodyear_element){

                                   goodyear_element.states.picker_open = false;

                                });

                            };
            				
                        });
                        
                        //
                        //  �� ������ ����� �� ���� � ������ ����
                        //
                        
                        $(window).blur(function(){
                           
                           $("html").trigger("mouseup");
                            
                        });
                    
                    };
                    
        			
        		},
        		
        		input_icon_hover : function(){
        			
        			states.container.find(".goodyear-icon").mouseenter(function(){
        				
        				$(this).addClass("hover");
        				
        			}).mouseleave(function(){
        				
        				$(this).removeClass("hover");
        				
        			}).click(function(){
        				
        				states.container.find(".goodyear-text").trigger("focus");
        				
        			});
        			
        		},
        		
        		set_date : function(){
        			
        			/*
        				������������� �������� �����
        			*/
        			
        			var year_picker = states.container.find(".goodyear-year-picker");
                    
        			var single_year_items_count_from_top = parseInt(states.selected_date.format("YYYY"), 10) - options.min_year;
        			
        			var year_picker_floating_block_top = - (single_year_items_count_from_top * block_model.single_year_item_height) + block_model.year_selection_top + block_model.year_selection_border_top;
        			
        			year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").stop(true, true);
        			
        			year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").animate({
        				"top" : year_picker_floating_block_top + "px"
        			}, {
        				duration: (states.displayed_year ? (Math.abs(parseInt(states.selected_date.format("YYYY"), 10) - states.displayed_year) * 200 < 1000 ? Math.abs(parseInt(states.selected_date.format("YYYY"), 10) - states.displayed_year) * 200 : 1000) : 0),
        				step: function( now, fx ) {	
        				
        					year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").data("top", now);			
        				
        					year_picker.find(".goodyear-current-year-selection").find(".goodyear-years-floating-block").css("top", now - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");		
        							
        				}
        			});
        			
        			prev_displayed_year = states.displayed_year;
        			
        			states.displayed_year = parseInt(states.selected_date.format("YYYY"), 10);
        			
        			/*
        				� ���������� ��������� ���� ������ �������� � ����� � ������
        			*/
        			
        			if (states.displayed_year != prev_displayed_year)
        			{
            			
        				methods.year_change_date_block_reaction();
        			};
        			
        			/*
        				������������� �������� � ����� ������ ������
        			*/
        			
        			var month_slider = states.container.find(".goodyear-month-picker").find(".goodyear-slider");
        			
        			var month_slider_top_correction = - Math.floor((block_model.month_slider_height - block_model.single_month_item_height) / 2);
        			
        			var month_slider_top = (parseInt(states.selected_date.format("M"), 10) - 1) * block_model.single_month_item_height + month_slider_top_correction + block_model.month_slider_top_manual_correction;
        			
        			if (month_slider_top < 0)
        			month_slider_top = 0;
        			
        			if (month_slider_top > (block_model.month_block_height - block_model.month_slider_height))
        			month_slider_top = (block_model.month_block_height - block_model.month_slider_height);
        
        			/*
        				������������� �������� � ����� ������ ���
        			*/
        			
        			var date_slider = states.container.find(".goodyear-date-picker").find(".goodyear-slider");
        			
        			var date_visible_part_height = (block_model.date_block_height - block_model.date_block_label_height - block_model.date_block_label_border_bottom);
        			
        			var full_date_block_height = 12*(6*block_model.date_block_label_height + (block_model.date_block_month_block_padding_top > block_model.date_block_month_block_padding_bottom ? block_model.date_block_month_block_padding_top : block_model.date_block_month_block_padding_bottom)) + block_model.date_block_month_block_padding_bottom;
        			
        			var date_top_range = full_date_block_height - date_visible_part_height;
        			
        			month_slider.stop(true, true);
        			
        			month_slider.animate({
        				"top" : month_slider_top + "px"
        			}, {
        				duration: 3 * Math.abs(parseInt(month_slider.css("top"), 10) - month_slider_top),
        				step: function( now, fx ) {						
        				
        					month_slider.find(".goodyear-months").css("top", (- now) + "px");	
        					
        					var date_slider_top = block_model.date_block_label_height + block_model.date_block_label_border_bottom - date_top_range * (now / (block_model.month_block_height - block_model.month_slider_height));
        									
        					date_slider.css("top", date_slider_top + "px");
        					
        					date_slider.data("top", date_slider_top);
        										
        					month_slider.data("top", now);
        							
        				}
        			});
        			
        			if (states.today.format("YYYY") == states.displayed_year)
        			{
        				date_slider.find(".goodyear-month").filter(".goodyear-" + presets.months_en[states.today.format("M") - 1]).find("span").filter("[date='"+states.today.format("D")+"']").addClass("today").append("<div class='bull'>&bull;</div>");
        			};
        		  
        		 	date_slider.find(".goodyear-month").find(".goodyear-slide_line").find("span").filter(".active").addClass("prev_active");
        		  
        		  	date_slider.find(".goodyear-month").find("span").filter(".active").removeClass("active");
        		  
        		  	date_slider.find(".goodyear-month").filter(".goodyear-" + presets.months_en[states.selected_date.format("M") - 1]).find("span").filter("[date='"+states.selected_date.format("D")+"']").addClass("hover").addClass("active").removeClass("hover");
                    
                    /*
                        ���� ����� �������� ���
                    */
                    
                    if (options.hour_picker)
                    {
                      
                        previous_selected_hour = states.selected_hour;
                      
                        states.selected_hour = states.selected_date.hour();
                      
                        var hour_picker = states.container.find(".goodyear-hour-picker");
        			
            			var single_hour_items_count_from_top = parseInt(states.selected_hour, 10);
                        
            			var hour_picker_floating_block_top = - (single_hour_items_count_from_top * block_model.single_year_item_height) + block_model.year_selection_top + block_model.year_selection_border_top;
                        
                        hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").stop(true, true);
        			
            			hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").animate({
            				"top" : hour_picker_floating_block_top + "px"
            			}, {
            				duration: Math.abs(states.selected_hour - previous_selected_hour)*50,
            				step: function( now, fx ) {	
            				
            					hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").data("top", now);			
            				
            					hour_picker.find(".goodyear-current-hour-selection").find(".goodyear-hours-floating-block").css("top", now - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");		
            							
            				}
            			});
                        
                    };
                    
                    /*
                        ���� ����� �������� ������
                    */
                    
                    if (options.minute_picker)
                    {
                        
                        previous_selected_minute = states.selected_minute;
                      
                        states.selected_minute = Math.round(states.selected_date.minute() / options.minutes_step) * options.minutes_step;
                      
                        var minute_picker = states.container.find(".goodyear-minute-picker");
        			
            			var single_minute_items_count_from_top = parseInt(states.selected_minute, 10) / options.minutes_step;
                        
                        var minute_picker_floating_block_top = - (single_minute_items_count_from_top * block_model.single_year_item_height) + block_model.year_selection_top + block_model.year_selection_border_top;
                        
                        minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").stop(true, true);
        			
            			minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").animate({
            				"top" : minute_picker_floating_block_top + "px"
            			}, {
            				duration: Math.abs(states.selected_minute - previous_selected_minute)*10,
            				step: function( now, fx ) {	
            				
            					minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").data("top", now);			
            				
            					minute_picker.find(".goodyear-current-minute-selection").find(".goodyear-minutes-floating-block").css("top", now - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");		
            							
            				}
            			});
                        
                    };
                    
                    /*
                        ��������� �������� � ��������� ���� (�� ������ �������)
                    */
                    
                    states.container.find(".goodyear-text").val(states.input_text_value);
                    
                    //
                    //  �������� �������� change, ���� ����� ���������
                    //
                    
                    if (states.input_hidden_text_value != states.container.find(".goodyear-hidden-text").val())
                    {                        
                        states.container.find(".goodyear-hidden-text").val(states.input_hidden_text_value);
                        
                        states.container.find(".goodyear-hidden-text").triggerHandler("change");
                    };
                    
                    states.container.removeClass("goodyear-error");
        			
                    /*
                        ������������� ����� �� ���� � ��������� input'ax
                        (�������� ����������)
                    */
                    
                    if (options.range_from_id)
                    {
                        
                        if (typeof(activated_goodyears_list) != "undefined")
                        {
                                                
                            if (activated_goodyears_list.length > 1)
                            {
                             
                                $.each(activated_goodyears_list, function(index, value)
                                {
                                  
                                  if (value.options.range_to_id == options.range_from_id)
                                  {
                                    
                                        if (states.selected_date > value.states.selected_date)
                                        {
                                            value.states.selected_date = states.selected_date;   
                                            
                                            value.states.input_text_value = states.selected_date.format(value.options.visible_format);
                                            
                                            value.states.input_hidden_text_value = states.selected_date.format(value.options.format);
                                            
                                            value.methods.set_date();
                                        };
                                    
                                  };
                                    
                                });
                                
                            };
                        
                        };
                    
                    };  
                    
                    if (options.range_to_id)
                    {
                        
                        if (typeof(activated_goodyears_list) != "undefined")
                        {
                                                
                            if (activated_goodyears_list.length > 1)
                            {
                             
                                $.each(activated_goodyears_list, function(index, value)
                                {
                                  
                                  if (value.options.range_from_id == options.range_to_id)
                                  {
                                    
                                        if (states.selected_date < value.states.selected_date)
                                        {
                                            value.states.selected_date = states.selected_date;  
                                            
                                            value.states.input_text_value = states.selected_date.format(value.options.visible_format);
                                            
                                            value.states.input_hidden_text_value = states.selected_date.format(value.options.format);
                                                                              
                                            value.methods.set_date();
                                        };
                                    
                                  };
                                    
                                });
                                
                            };
                        
                        };
                    
                    };              
                    
        		},
        		
        		/*
        			���������� ������ ���� � ����� �����
        		*/
        		
        		year_change_date_block_reaction : function()
        		{
        			
        			var date_slider = states.container.find(".goodyear-date-picker").find(".goodyear-slider");
        			var month_slider = states.container.find(".goodyear-month-picker").find(".goodyear-slider");            
                    var month_picker = states.container.find(".goodyear-month-picker");
       				
       				date_slider.find(".goodyear-month").filter(".goodyear-" + presets.months_en[parseInt(states.selected_date.format("M"), 10) - 1]).find("span").filter("[date='"+states.selected_date.format("D")+"']").addClass("active");
        			
        			if (states.today.format("YYYY") != states.displayed_year)
        			{
        				date_slider.find(".goodyear-month").find(".goodyear-slide_line").find("span").removeClass("today");
        				
        				states.container.find(".goodyear-month-picker").find(".goodyear-month").removeClass("today");
        			} else
        			{
        				date_slider.find(".goodyear-month").filter(".goodyear-" + presets.months_en[parseInt(states.today.format("M"), 10) - 1]).find("span").filter("[date='"+states.today.format("D")+"']").addClass("today");
        				
        				states.container.find(".goodyear-months").each(function(){
        					
        					$(this).find(".goodyear-month").eq(parseInt(states.today.format("M"), 10) - 1).addClass("today");
        					
        				});
        				
        			};	
        			
        			states.container.find(".goodyear-date-picker").find(".goodyear-month").each(function(){
        
        				var month_num = states.container.find(".goodyear-date-picker").find(".goodyear-month").index($(this));
        				  
        				var month_first_date = moment(states.displayed_year + "-" + (month_num + 1) + "-01", "YYYY-M-DD");
        			
        				var day_of_week = month_first_date.format("e");	
        				
        				var days_count = month_first_date.add("months", 1).subtract("days", 1).format("D");
        				
        				var shifted = (day_of_week > 2 ? 9 : 2) - day_of_week;
        
        				var line_1_weekdays_shift = (9 - shifted)*block_model.single_date_item_width;	
        				
        				states.container.find(".goodyear-date-picker").find(".goodyear-month").eq(month_num).find(".goodyear-line_1").find(".goodyear-weekdays").find(".goodyear-slide_line").stop(true, true);
        				
        				states.container.find(".goodyear-date-picker").find(".goodyear-month").eq(month_num).find(".goodyear-line_1").find(".goodyear-weekdays").find(".goodyear-slide_line").animate({
        					left : line_1_weekdays_shift
        				}, {
        					duration : 1000,
        					step : function(now, fx){
        						
        						var shifted = 9 - (now / block_model.single_date_item_width);
        						
        						var line_1_weekend_shift = (4 - shifted)*block_model.single_date_item_width;
        						
        						states.container.find(".goodyear-date-picker").find(".goodyear-month").eq(month_num).find(".goodyear-line_1").find(".goodyear-weekend").find(".goodyear-slide_line").css({left : line_1_weekend_shift});
        
        						var line_2_weekdays_shift = (2 - shifted)*block_model.single_date_item_width;	
        						
        						states.container.find(".goodyear-date-picker").find(".goodyear-month").eq(month_num).find(".goodyear-line_2").find(".goodyear-weekdays").find(".goodyear-slide_line").css({left : line_2_weekdays_shift});
        							  
        						var line_2_weekend_shift = (0 - shifted)*block_model.single_date_item_width;
        						
        						states.container.find(".goodyear-date-picker").find(".goodyear-month").eq(month_num).find(".goodyear-line_2").find(".goodyear-weekend").find(".goodyear-slide_line").css({left : line_2_weekend_shift});
        						
        						var line_all_weekdays_shift = (0 - shifted)*block_model.single_date_item_width;		
        						
        						states.container.find(".goodyear-date-picker").find(".goodyear-month").eq(month_num).find(".goodyear-line_3,.goodyear-line_4,.goodyear-line_5,.goodyear-line_6").find(".goodyear-weekdays").find(".goodyear-slide_line").css({left : line_all_weekdays_shift});
        						
        						var line_all_weekend_shift = (0 - shifted)*block_model.single_date_item_width;	
        						
        						states.container.find(".goodyear-date-picker").find(".goodyear-month").eq(month_num).find(".goodyear-line_3,.goodyear-line_4,.goodyear-line_5,.goodyear-line_6").find(".goodyear-weekend").find(".goodyear-slide_line").css({left : line_all_weekend_shift});
        						
        					}
        				});
                        
                        var current_month_disabled = true;
        
                        for (day = 1; day <= 31; day++)
                        {
                            
                            var current_date = moment([states.displayed_year, month_num, day]);
                            
                            if (
                                (!options.min_date || current_date >= options.min_date) &&
                                (!options.max_date || current_date <= options.max_date)
                            )
                            {
                                date_slider.find(".goodyear-month").filter(".goodyear-" + presets.months_en[month_num]).find(".goodyear-slide_line").find("[date='" + day + "']").removeClass("disabled");
                                
                                if (day <= days_count)
                                current_month_disabled = false;
                            } else
                            {   
                                date_slider.find(".goodyear-month").filter(".goodyear-" + presets.months_en[month_num]).find(".goodyear-slide_line").find("[date='" + day + "']").addClass("disabled");                        
                            };
                            
                            if (day <= days_count)
                            {
                                    date_slider.find(".goodyear-month").filter(".goodyear-" + presets.months_en[month_num]).find(".goodyear-slide_line").find("[date='" + day + "']").css("display", "inline");
                            } else
                            {
                                    date_slider.find(".goodyear-month").filter(".goodyear-" + presets.months_en[month_num]).find(".goodyear-slide_line").find("[date='" + day + "']").css("display", "none");
                            };
        					
                        };
                        
                        if (current_month_disabled)
                        {
                          
                            date_slider.find(".goodyear-month").filter(".goodyear-" + presets.months_en[month_num]).find(".goodyear-label").addClass("disabled");
                            
                            month_picker.find(".goodyear-month").filter(".goodyear-" + presets.months_en[month_num]).addClass("disabled");
                            
                        } else
                        {
                           
                            date_slider.find(".goodyear-month").filter(".goodyear-" + presets.months_en[month_num]).find(".goodyear-label").removeClass("disabled"); 
                            
                            month_picker.find(".goodyear-month").filter(".goodyear-" + presets.months_en[month_num]).removeClass("disabled");
                            
                        };
        				
        			});
        					  
        		},
        		
        		/*
        			���������� ����������� ������� � ������� ����� ����
        		*/
        		
        		show_and_hide_picker : function(){
        			
        			states.container.find(".goodyear-text").focus(function(){
                                        
                                        //
                                        //  ��������� �������� ������������� ����� focus event
                                        //
                                        
                                        states.container.find(".goodyear-hidden-text").triggerHandler("focus");
        			  
        				if ($("html").width() - states.container.offset().left - states.container.width() < states.container.find(".goodyear-picker").width())
        				{
        					states.container.find(".goodyear-picker").addClass("position-right");
        				} else
        				{
        					states.container.find(".goodyear-picker").removeClass("position-right");
        				};
        				
        				$(".goodyear-picker").not(states.container.find(".goodyear-picker")).parent().css("zIndex", 1);
        				
        				$(".goodyear-picker").not(states.container.find(".goodyear-picker")).fadeOut(100);
        				
        				states.container.css("zIndex", 2);
        				
        				states.container.find(".goodyear-picker").css("top", (states.container.find(".goodyear-text").height() + parseInt(states.container.find(".goodyear-text").css("borderTopWidth"), 10) + parseInt(states.container.find(".goodyear-text").css("borderBottomWidth"), 10) + parseInt(states.container.find(".goodyear-text").css("paddingTop"), 10) + parseInt(states.container.find(".goodyear-text").css("paddingBottom"), 10) + block_model.range_from_text_block_to_picker));
        				
        				states.container.find(".goodyear-picker").css("display", "block");
        				
        				states.picker_open = true;
        				
        				if (!states.is_mobile)
        				{
        					setTimeout(function(){
        						states.container.find(".goodyear-text")[0].select();
        					}, 1);
        				};
        				
        			}).click(function(){
        				
        				if (states.container.find(".goodyear-picker").css("display") != "block")
        				{
        					
        					$(this).trigger("focus");
        					
        				};
        				
        			});
        			
        		},
        		
        		/*
        			������������� ���� ��� ����� ������ (��� ��� ������� enter)
        		*/
        		
        		set_date_on_blur : function(){
        			
        			/*
        				������������ ������� �� ������� ������� enter
        			*/
        			
        			states.container.find(".goodyear-text").keydown(function(event){
        
        				if (event.which == 13) {
        				  
        					event.preventDefault();
        					
        					states.container.find(".goodyear-text").trigger("change");
        					
        					if (!states.is_mobile)
        					{
        						setTimeout(function(){
        							states.container.find(".goodyear-text")[0].select();
        						}, 1);
        					};
        				
        				};
        				
        				if (event.which == 9){
        					
        					states.container.find(".goodyear-text").trigger("change");
        					
        					states.container.find(".goodyear-picker").css("zIndex", 1);
        					
        					states.container.find(".goodyear-picker").fadeOut(100);
                            
                            states.container.find(".goodyear-hidden-text").triggerHandler("blur");
        					
        				};
        			  
        			}).keyup(function(){
        				
        				states.input_text_value = $(this).val();
        				
        			});
        			
        			/*
        				��������� ��������� ���� ��� ����� ������
        			*/
        			
        			states.container.find(".goodyear-text").change(function(){
        	
        				/*
        					��������� � ������ ������ ����
        				*/
        				
        				var selected_date = methods.string_to_date($(this).val());
        				
        				states.input_text_value = $(this).val();
                        
        				if (
                            !selected_date || 
                            (
                                selected_date && 
                                (
                                    selected_date.year() < options.min_year || 
                                    selected_date.year() > options.max_year || 
                                    selected_date < options.min_date ||
                                    selected_date > options.max_date
                                )
                            )
                        )
        				{
        					states.container.addClass("goodyear-error");
        					
        					states.input_text_error = true;					
        				} else
        				{                    
        					states.selected_date = selected_date;                    
        					states.input_text_value = states.selected_date.format(options.visible_format);
        					states.input_hidden_text_value = states.selected_date.format(options.format);
        					methods.set_date();
                			
        					states.container.removeClass("goodyear-error");
        					states.input_text_error = false;
        				};			
                        
                        states.container.find(".goodyear-hidden-text").triggerHandler("blur");
        							  
        			});			
        			
        		},
        
        		/*
        			��������� ������ ��� ���������
        		*/
        		
        		months_hover : function (container){
        			  
        			states.container.find(".goodyear-month-picker").children().filter(".goodyear-months").find(".goodyear-month").mouseenter(function(){
        			  
        				$(this).addClass("hover");
        			  
        			}).mouseleave(function(){
        			  
        				$(this).removeClass("hover");
        							  
        			});
        		  
        		},
        
        		/*
        			��������� ������ ��������������
        		*/
        		
        		months_drag : function (){
        		
        			var month_slider = states.container.find(".goodyear-month-picker").find(".goodyear-slider");
        			var date_slider = states.container.find(".goodyear-date-picker").find(".goodyear-slider");
        			
        			month_slider.stop(true, true);
        			date_slider.stop(true, true);
        
        			var date_visible_part_height = (block_model.date_block_height - block_model.date_block_label_height - block_model.date_block_label_border_bottom);
        			
        			var full_date_block_height = 12*(6*block_model.date_block_label_height + (block_model.date_block_month_block_padding_top > block_model.date_block_month_block_padding_bottom ? block_model.date_block_month_block_padding_top : block_model.date_block_month_block_padding_bottom)) + block_model.date_block_month_block_padding_bottom;
        			
        			var date_top_range = full_date_block_height - date_visible_part_height;
        			
        			month_slider.mousedown(function(event){
        				
        				month_slider.addClass("drag");
        				
        				states.drag_started = false;
        				
        				states.drag_item = month_slider;
        				
        				states.drag_start_pos_y = event.pageY;
        				
        				states.drag_start_element_top = parseInt(month_slider.css("top"), 10);
        				
        				$("html, body").addClass("disable_selection");
        				
        				$("html").mousemove(function(event){
        					
        					states.drag_started = true;
        				
        					if (states.drag_item == month_slider)
        					{
        						
        						var difference_y = (states.drag_start_pos_y - event.pageY);
        						
        						var month_slider_top = states.drag_start_element_top - difference_y;
        						
        						
        						
        						if (month_slider_top < 0){
        							
        							//date_slider_month_slider_top = - Math.sqrt(Math.abs(month_slider_top)) / 2;
        							
        							month_slider_top = 0;
        						
        						};
        						
        						if (month_slider_top > (block_model.month_block_height - block_model.month_slider_height))
        						{
        							
        							//date_slider_month_slider_top = (block_model.month_block_height - block_model.month_slider_height) + Math.sqrt(Math.abs(month_slider_top - (block_model.month_block_height - block_model.month_slider_height))) / 2;
        							
        							month_slider_top = (block_model.month_block_height - block_model.month_slider_height);
        							
        							
        						};
        						
        						date_slider_month_slider_top = month_slider_top;						
        						
        						
        						states.drag_item.css("top", month_slider_top);
        						
        						states.drag_item.data("top", month_slider_top);
        						
        						month_slider.find(".goodyear-months").css("top", (- month_slider_top) + "px");	
        						
        						var date_slider_top = block_model.date_block_label_height + block_model.date_block_label_border_bottom - date_top_range * (date_slider_month_slider_top / (block_model.month_block_height - block_model.month_slider_height));
        										
        						date_slider.css("top", date_slider_top + "px");
        						
        						date_slider.data("top", date_slider_top);
        						
        					};
        				
        				});
        				
        			}).mouseenter(function(){
        				
        				$(this).addClass("hover");
        				
        			}).mouseleave(function(){
        				
        				$(this).removeClass("hover");
        				
        			});
        			
        			states.container.add(document).mouseup(function(e){
        
        				e.stopPropagation();
        				
        				if (states.drag_item == month_slider)
        				{
        				
        					states.drag_item = null;
        						
        					states.drag_start_pos_y = null;
        					
        					states.container.find(".goodyear-year-picker").removeClass("goodyear-drag_started");
        					
        					month_slider.removeClass("drag");
        					
        					$("html").unbind("mousemove");
        					
        					$("html, body").removeClass("disable_selection");			
        					
        					return false;
        				
        				};
        								
        			});	
        		
        		},
        		
        		/*	
        			��������� �������
        		*/
        		
        		/*
        		months_touch : function(){
        			
        			var date_visible_part_height = (block_model.date_block_height - block_model.date_block_label_height - block_model.date_block_label_border_bottom);
        			
        			var full_date_block_height = 12*(6*block_model.date_block_label_height + (block_model.date_block_month_block_padding_top > block_model.date_block_month_block_padding_bottom ? block_model.date_block_month_block_padding_top : block_model.date_block_month_block_padding_bottom)) + block_model.date_block_month_block_padding_bottom;
        			
        			var date_top_range = full_date_block_height - date_visible_part_height;
        		  	
        			var month_slider = states.container.find(".goodyear-month-picker").find(".goodyear-slider");
        			var date_slider = states.container.find(".goodyear-date-picker").find(".goodyear-slider");	
        			
        			states.container.find(".goodyear-date-picker").swipe({		
        				swipeStatus:function(event, phase, direction, distance, duration, fingers)
        				{
        					if (phase == "move")
        					{
        						var date_slider_top = date_slider.data("top") - (direction == "up" ? distance : (direction == "down" ? - distance : 0));		
        					} else {
        						date_slider.data("top", parseFloat(date_slider.css("top")));
        						var date_slider_top = parseFloat(date_slider.css("top"));
        					};
        										
        					if (date_slider_top > block_model.date_block_label_height)
        					date_slider_top = block_model.date_block_label_height;
        
        					if (date_slider_top < block_model.date_block_label_height - date_top_range)
        					date_slider_top = block_model.date_block_label_height - date_top_range;					
        					
        					var month_slider_top = (block_model.month_block_height - block_model.month_slider_height)*((block_model.date_block_label_height + block_model.date_block_label_border_bottom - date_slider_top) / date_top_range);
        
        					month_slider.css("top", month_slider_top);
        					
        					month_slider.find(".goodyear-months").css("top", (- month_slider_top) + "px");
        													
        					date_slider.css("top", date_slider_top + "px");
        					
        				},
        				fallbackToMouseEvents : false,
        				fingers: 'all'
        			});
        			
        		},
        		*/
        		
        		/*
        			��������� �������
        		*/
        		
        		months_mousewheel : function (){
        
        			var date_visible_part_height = (block_model.date_block_height - block_model.date_block_label_height - block_model.date_block_label_border_bottom);
        			
        			var full_date_block_height = 12*(6*block_model.date_block_label_height + (block_model.date_block_month_block_padding_top > block_model.date_block_month_block_padding_bottom ? block_model.date_block_month_block_padding_top : block_model.date_block_month_block_padding_bottom)) + block_model.date_block_month_block_padding_bottom;
        			
        			var date_top_range = full_date_block_height - date_visible_part_height;
        		  	
        			var month_slider = states.container.find(".goodyear-month-picker").find(".goodyear-slider");
        			var date_slider = states.container.find(".goodyear-date-picker").find(".goodyear-slider");
        			
        			if (states.mousewheel)
        			{             
        				states.container.find(".goodyear-date-picker,.goodyear-month-picker,.goodyear-date-picker-label").mousewheel(function(event){
                            
        					/*
        						���� windows, ����������� ������ ������
        					*/
        					
        					if (navigator.platform.indexOf("Win") != -1) {
        						event.delta *= 20;
        						event.deltaX *= 20;
        						event.deltaY *= 20;
        					}
        					
        					var date_slider_top = (date_slider.data("top") ? date_slider.data("top") : parseFloat(date_slider.css("top"))) + event.deltaY;
        	
        					if (date_slider_top > block_model.date_block_label_height)
        					date_slider_top = block_model.date_block_label_height;
        	
        					if (date_slider_top < block_model.date_block_label_height - date_top_range)
        					date_slider_top = block_model.date_block_label_height - date_top_range;		
        					
        					var month_slider_top = (block_model.month_block_height - block_model.month_slider_height)*((block_model.date_block_label_height + block_model.date_block_label_border_bottom - date_slider_top) / date_top_range);
        						
        					month_slider.css("top", month_slider_top);				
        					
        					month_slider.find(".goodyear-months").css("top", (- month_slider_top) + "px");
        					
        					date_slider.data("top", date_slider_top);
        													
        					date_slider.css("top", date_slider_top + "px");				
        					
        					return false;
        					
        				});
        			};
        		},
        
        		/*
        			���� �� ������
        		*/
        		
        		months_click : function(){
        		  
        			var month_slider = states.container.find(".goodyear-month-picker").find(".goodyear-slider");
        			var date_slider = states.container.find(".goodyear-date-picker").find(".goodyear-slider");
        
        			var date_visible_part_height = (block_model.date_block_height - block_model.date_block_label_height - block_model.date_block_label_border_bottom);
        			
        			var full_date_block_height = 12*(6*block_model.date_block_label_height + (block_model.date_block_month_block_padding_top > block_model.date_block_month_block_padding_bottom ? block_model.date_block_month_block_padding_top : block_model.date_block_month_block_padding_bottom)) + block_model.date_block_month_block_padding_bottom;
        			
        			var date_top_range = full_date_block_height - date_visible_part_height;
        			
        			states.container.find(".goodyear-month-picker").children().filter(".goodyear-months").find(".goodyear-month").click(function(){				
        				var month_num = states.container.find(".goodyear-month-picker").children().filter(".goodyear-months").find(".goodyear-month").index($(this));
        								
        				var month_slider_top_correction = - Math.floor((block_model.month_slider_height - block_model.single_month_item_height) / 2);
        				
        				var month_slider_top = month_num * block_model.single_month_item_height + month_slider_top_correction + block_model.month_slider_top_manual_correction;
        				
        				if (month_slider_top < 0)
        				month_slider_top = 0;
        				
        				if (month_slider_top > (block_model.month_block_height - block_model.month_slider_height))
        				month_slider_top = (block_model.month_block_height - block_model.month_slider_height);
        				
        				month_slider.stop(true, true);
        				
        				month_slider.animate({
        					"top" : month_slider_top + "px"
        					}, {
        					duration: 3 * Math.abs(parseInt(month_slider.css("top"), 10) - month_slider_top),
        					step: function( now, fx ) {						
        					
        						month_slider.data("top", now);
        					
        						month_slider.find(".goodyear-months").css("top", (- now) + "px");	
        						
        						var date_slider_top = block_model.date_block_label_height + block_model.date_block_label_border_bottom - date_top_range * (now / (block_model.month_block_height - block_model.month_slider_height));
        									
        						date_slider.css("top", date_slider_top + "px");
        						
        						date_slider.data("top", date_slider_top);
        					
        					}
        				});			  
        			});
        		
        		},		
        
        		/*
        	  		��������� �� ���
        	  	*/
        	  
        		year_mouseenter : function(container){
        			  
        			states.container.find(".goodyear-year-picker").children().filter(".goodyear-years").find(".goodyear-year").find("span").unbind("mouseenter");
        			
        			states.container.find(".goodyear-year-picker").children().filter(".goodyear-years").find(".goodyear-year").find("span").mouseenter(function(){
        			  
        				$(this).addClass("hover");
        			  
        			}).mouseleave(function(){
        			  
        				$(this).removeClass("hover");
        							  
        			});
        			
        		},
        
        		/*
        			���� �� ����
        		*/
        		
        		year_click : function()
        		{
        		  
        			var year_picker = states.container.find(".goodyear-year-picker");
        		  
        			states.container.find(".goodyear-year-picker").children().filter(".goodyear-years").find(".goodyear-year").find("span").unbind("click");  
        			states.container.find(".goodyear-year-picker").children().filter(".goodyear-years").find(".goodyear-year").find("span").click(function(){
        				
        				if (!states.drag_started)
        				{				
        					var prev_displayed_year = states.displayed_year;
        					
        					states.displayed_year = parseInt($(this).text(), 10);
        					
        					/*
        						������������� �������� �����
        					*/
        					
        					var single_year_items_count_from_top = states.displayed_year - options.min_year;
        					
        					var year_picker_floating_block_top = - (single_year_items_count_from_top * block_model.single_year_item_height) + block_model.year_selection_top + block_model.year_selection_border_top;
        					
        					year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").stop(true, true);
        					
        					year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").animate({
        						"top" : year_picker_floating_block_top + "px"
        					}, {
        						duration: (prev_displayed_year ? ((Math.abs(states.displayed_year - prev_displayed_year) * 200) < 1000 ? (Math.abs(states.displayed_year - prev_displayed_year) * 200) : 100) : 0),
        						step: function( now, fx ) {		
        						
        							year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").data("top", now);				
        						
        							year_picker.find(".goodyear-current-year-selection").find(".goodyear-years-floating-block").css("top", now - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");		
        									
        						}
        					});
        					
        					/*
        						� ���������� ��������� ���� ������ �������� � ����� � ������
        					*/
        					
        					states.selected_date = moment([states.displayed_year, parseInt(states.selected_date.format("M"), 10) - 1, parseInt((states.selected_date.format("M") == 2) && (states.selected_date.format("D") == 29) ? 28 : states.selected_date.format("D"), 10), parseInt(states.selected_date.format("H"), 10), parseInt(states.selected_date.format("m"), 10), parseInt(states.selected_date.format("s"), 10)]);
        					
                			states.input_text_value = states.selected_date.format(options.visible_format);
                			
                			methods.set_date();
        					
        					methods.year_change_date_block_reaction();
        					
        					if (!states.is_mobile)
            				{
            					setTimeout(function(){
            						states.container.find(".goodyear-text")[0].select();
            					}, 1);	
            				};
        					
        				};
        				  
        			});
        			
        		},
        
        		/*
        			������������� ����
        		*/
        		
        		year_drag : function (){
        		
        			var year_picker = states.container.find(".goodyear-year-picker");
        			
        			year_picker.stop(true, true);
        			
        			year_picker.mousedown(function(event){
        				
        				states.drag_started = false;
        				
        				year_picker.removeClass("drag_started");
        				
        				states.drag_item = year_picker;
        				
        				states.drag_start_pos_y = event.pageY;
        				
        				states.drag_start_element_top = parseInt(year_picker.find(".goodyear-years-floating-block").css("top"), 10);
        				
        				$("html, body").addClass("disable_selection");
        				
        				$("html").mousemove(function(event){
        				
        					if (states.drag_item == year_picker)
        					{												
        						states.drag_started = true;
        						
        						year_picker.addClass("goodyear-drag_started");
        						
        						var difference_y = (states.drag_start_pos_y - event.pageY);
        						
        						var year_picker_floating_block_top = states.drag_start_element_top - difference_y;
        						
        						var single_year_items_count_from_top = parseInt(states.selected_date.format("YYYY"), 10) - options.min_year;
        						
        						var year_picker_floating_block_height = block_model.year_block_height - block_model.single_year_item_height*(options.max_year - options.min_year + 1);
        						
        						if (year_picker_floating_block_top > (block_model.year_selection_top + block_model.year_selection_border_top))
        						year_picker_floating_block_top = (block_model.year_selection_top + block_model.year_selection_border_top);
        						
        						if (year_picker_floating_block_top < - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - block_model.year_selection_border_top) + year_picker_floating_block_height)
        						year_picker_floating_block_top = - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - block_model.year_selection_border_top) + year_picker_floating_block_height;
        						
        						year_picker.find(".goodyear-years-floating-block").css("top", year_picker_floating_block_top);
        						
        						year_picker.find(".goodyear-years-floating-block").data("top", year_picker_floating_block_top);	
        												
        						year_picker.find(".goodyear-current-year-selection").find(".goodyear-years-floating-block").css("top", year_picker_floating_block_top - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");	
        						
        					};
        				
        				});
                                                
        			});
        			
        			states.container.add(document).mouseup(function(e){
                        
        				e.stopPropagation();
        				
        				if (states.drag_item == year_picker)
        				{
        					
        					states.displayed_year = options.min_year + Math.round(Math.abs((parseInt(year_picker.find(".goodyear-years-floating-block").css("top"), 10) - block_model.year_selection_top + block_model.year_selection_border_top) / block_model.single_year_item_height));
                            
        					/*
        						������������� �������� �����
        					*/
        					
        					var single_year_items_count_from_top = states.displayed_year - options.min_year;
        					
        					var year_picker_floating_block_top = - (single_year_items_count_from_top * block_model.single_year_item_height) + block_model.year_selection_top + block_model.year_selection_border_top;
        					
        					year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").stop(true, true);
        					
        					year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").animate({
        						"top" : year_picker_floating_block_top + "px"
        					}, {
        						duration: 200,
        						step: function( now, fx ) {	
        						
        							year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").data("top", now);				
        						
        							year_picker.find(".goodyear-current-year-selection").find(".goodyear-years-floating-block").css("top", now - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");		
        									
        						}
        					});
        					
        					/*
        						� ���������� ��������� ���� ������ �������� � ����� � ������
        					*/
        					
        					states.selected_date = moment([states.displayed_year, parseInt(states.selected_date.format("M"), 10) - 1, parseInt((states.selected_date.format("M") == 2) && (states.selected_date.format("D") == 29) ? 28 : states.selected_date.format("D"), 10), parseInt(states.selected_date.format("H"), 10), parseInt(states.selected_date.format("m"), 10), parseInt(states.selected_date.format("s"), 10)]);
        					
                			states.input_text_value = states.selected_date.format(options.visible_format);
                			
                			methods.set_date();
        					
        					methods.year_change_date_block_reaction();	
        					
        					if (!states.is_mobile)
            				{
            					setTimeout(function(){
            						states.container.find(".goodyear-text")[0].select();
            					}, 1);	
            				};
        					
        					states.drag_item = null;
        						
        					states.drag_start_pos_y = null;
        					
        					states.container.find(".goodyear-year-picker").removeClass("goodyear-drag_started");
        					
        					$("html").unbind("mousemove");
        					
        					$("html, body").removeClass("disable_selection");			
        					
        					return false;
        				
        				};
        								
        			});	
        		
        		},
        
        		/*
        		��������� ���� ��������
        		*/
        		/*
        		year_touch : function (){
        			
        			var year_picker = states.container.find(".goodyear-year-picker");
        			
        			var year_slider_speed = 0;
        			
        			var current_millisecond = moment().valueOf();
        			
        			var year_picker_floating_block_height = block_model.year_block_height - block_model.single_year_item_height*(options.max_year - options.min_year + 1);
        			
        			var interval_cleared = false;
        			
        			var year_slider_stop = false;
        			
        			/*
        			year_picker.swipe( {		
        			swipeStatus:function(event, phase, direction, distance, duration, fingers)
        			{
        				if (phase == "move")
        				{
        					var year_picker_floating_block_top = year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").data("top") - (direction == "up" ? distance : (direction == "down" ? - distance : 0));
        				} else {
        					year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").data("top", parseFloat(year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").css("top")));
        					var year_picker_floating_block_top = parseFloat(year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").css("top"));
        				};		
        														
        				if (year_picker_floating_block_top > (block_model.year_selection_top + block_model.year_selection_border_top))
        				year_picker_floating_block_top = (block_model.year_selection_top + block_model.year_selection_border_top);
        				
        				if (year_picker_floating_block_top < - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - 2*block_model.year_selection_border_top) + year_picker_floating_block_height)
        				year_picker_floating_block_top = - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - 2*block_model.year_selection_border_top) + year_picker_floating_block_height;
        				
        				year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").css("top", year_picker_floating_block_top);
        				
        				year_picker.find(".goodyear-current-year-selection").find(".goodyear-years-floating-block").css("top", year_picker_floating_block_top - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");					
        				
        				if (typeof(year_slider_stop) != "undefined" && year_slider_stop != false)
        				{
        					clearTimeout(year_slider_stop);
        				};
        				
        				year_slider_stop = setTimeout(function(){
        					
        					states.displayed_year = options.min_year + Math.round(Math.abs((parseInt(year_picker.find(".goodyear-years-floating-block").css("top"), 10) - block_model.year_selection_top + block_model.year_selection_border_top) / block_model.single_year_item_height));
        				
        					/*
        						������������� �������� �����
        					*/
        					/*
        					var single_year_items_count_from_top = states.displayed_year - options.min_year;
        					
        					var year_picker_floating_block_top = - (single_year_items_count_from_top * block_model.single_year_item_height) + block_model.year_selection_top + block_model.year_selection_border_top;
        					
        					year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").stop(true, true);
        					
        					year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").animate({
        						"top" : year_picker_floating_block_top + "px"
        					}, {
        						duration: 200,
        						step: function( now, fx ) {	
        						
        						
        							year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").data("top", now);					
        							year_picker.find(".goodyear-current-year-selection").find(".goodyear-years-floating-block").css("top", now - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");		
        									
        						}
        					});
        					
        					/*
        						� ���������� ��������� ���� ������ �������� � ����� � ������
        					*/
        					/*
        					states.selected_date = moment([states.displayed_year, parseInt(states.selected_date.format("M"), 10) - 1, parseInt((states.selected_date.format("M") == 2) && (states.selected_date.format("D") == 29) ? 28 : states.selected_date.format("D"), 10), parseInt(states.selected_date.format("H"), 10), parseInt(states.selected_date.format("m"), 10), parseInt(states.selected_date.format("s"), 10)]);
		        			
		        			states.input_text_value = states.selected_date.format(options.visible_format);        			
		        			
		        			methods.set_date();
        					
        					methods.year_change_date_block_reaction();	
        				}, 500
        				);
        				
        			},
        			fallbackToMouseEvents : false,
        			fingers: 'all'
        			
        			});
        			
        		  
        		},
        		*/
        
        		/*
        		 ����� ���� ������� ����
        		*/
        		
        		year_mousewheel : function (){
        			
        			var year_picker = states.container.find(".goodyear-year-picker");
        			
        			var year_slider_speed = 0;
        			
        			var current_millisecond = moment().valueOf();
        			
        			var year_picker_floating_block_height = block_model.year_block_height - block_model.single_year_item_height*(options.max_year - options.min_year + 1);
        			
        			var interval_cleared = false;
        			
        			var year_slider_stop = false;
        			
        			if (states.mousewheel)
        			{
        				year_picker.mousewheel(function(event){
        					
        					event.stopPropagation();
        					event.preventDefault();	
        					
        					/*
        						���� windows, ����������� ������ ������
        					*/
        					
        					if (navigator.platform.indexOf("Win") != -1) {
        						event.delta *= 20;
        						event.deltaX *= 20;
        						event.deltaY *= 20;
        					}
        					
        					var year_picker_floating_block_top = (year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").data("top") ? year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").data("top") : parseFloat(year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").css("top"), 10)) + event.deltaY;
        															
        					if (year_picker_floating_block_top > (block_model.year_selection_top + block_model.year_selection_border_top))
        					year_picker_floating_block_top = (block_model.year_selection_top + block_model.year_selection_border_top);
        					
        					if (year_picker_floating_block_top < - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - block_model.year_selection_border_top) + year_picker_floating_block_height)
        					year_picker_floating_block_top = - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - block_model.year_selection_border_top) + year_picker_floating_block_height;
        					
        					year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").css("top", year_picker_floating_block_top);
        					
        					year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").data("top", year_picker_floating_block_top);
        					
        					year_picker.find(".goodyear-current-year-selection").find(".goodyear-years-floating-block").css("top", year_picker_floating_block_top - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");					
        					
        					if (typeof(year_slider_stop) != "undefined" && year_slider_stop != false)
        					{
        						clearTimeout(year_slider_stop);
        					};
        					
        					year_slider_stop = setTimeout(function(){
        						
        						states.displayed_year = options.min_year + Math.round(Math.abs((parseInt(year_picker.find(".goodyear-years-floating-block").css("top"), 10) - block_model.year_selection_top + block_model.year_selection_border_top) / block_model.single_year_item_height));
        					
        						/*
        							������������� �������� �����
        						*/
        		
        						var single_year_items_count_from_top = states.displayed_year - options.min_year;
        						
        						var year_picker_floating_block_top = - (single_year_items_count_from_top * block_model.single_year_item_height) + block_model.year_selection_top + block_model.year_selection_border_top;
        						
        						year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").stop(true, true);
        						
        						year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").animate({
        							"top" : year_picker_floating_block_top + "px"
        						}, {
        							duration: 200,
        							step: function( now, fx ) {	
        							
        							
        								year_picker.find(".goodyear-years").find(".goodyear-years-floating-block").data("top", now);					
        								year_picker.find(".goodyear-current-year-selection").find(".goodyear-years-floating-block").css("top", now - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");		
        										
        							}
        						});
        						
        						/*
        							� ���������� ��������� ���� ������ �������� � ����� � ������
        						*/
        						
        						states.selected_date = moment([states.displayed_year, parseInt(states.selected_date.format("M"), 10) - 1, parseInt((states.selected_date.format("M") == 2) && (states.selected_date.format("D") == 29) ? 28 : states.selected_date.format("D"), 10), parseInt(states.selected_date.format("H"), 10), parseInt(states.selected_date.format("m"), 10), parseInt(states.selected_date.format("s"), 10)]);
        						        						        						
        	        			states.input_text_value = states.selected_date.format(options.visible_format);
        	        			
        	        			methods.set_date();
        						
        						methods.year_change_date_block_reaction();	
        						
        						if (!states.is_mobile)
        	    				{
        	    					setTimeout(function(){
        	    						states.container.find(".goodyear-text")[0].select();
        	    					}, 1);	
        	    				};
        						
        					}, 500
        					);
        					
        				});
        			};
        		},
                
                /*
        	  		��������� �� ���
        	  	*/
        	  
        		hour_mouseenter : function(container){
        			  
        			states.container.find(".goodyear-hour-picker").children().filter(".goodyear-hours").find(".goodyear-hour").find("span").unbind("mouseenter");
        			
        			states.container.find(".goodyear-hour-picker").children().filter(".goodyear-hours").find(".goodyear-hour").find("span").mouseenter(function(){
        			  
        				$(this).addClass("hover");
        			  
        			}).mouseleave(function(){
        			  
        				$(this).removeClass("hover");
        							  
        			});
        			
        		},
        
        		/*
        			���� �� ����
        		*/
        		
        		hour_click : function()
        		{
        		  
        			var hour_picker = states.container.find(".goodyear-hour-picker");
        		  
        			states.container.find(".goodyear-hour-picker").children().filter(".goodyear-hours").find(".goodyear-hour").find("span").unbind("click");  
        			states.container.find(".goodyear-hour-picker").children().filter(".goodyear-hours").find(".goodyear-hour").find("span").click(function(){
        				
        				if (!states.drag_started)
        				{				
        					var prev_selected_hour = states.selected_hour;
        					
        					states.selected_hour = parseInt($(this).text(), 10);
        					
        					/*
        						������������� �������� �����
        					*/
        					
        					var single_hour_items_count_from_top = parseInt(states.selected_hour, 10);
        					
        					var hour_picker_floating_block_top = - (single_hour_items_count_from_top * block_model.single_year_item_height) + block_model.year_selection_top + block_model.year_selection_border_top;
        					
        					hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").stop(true, true);
        					
        					hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").animate({
        						"top" : hour_picker_floating_block_top + "px"
        					}, {
        						duration: Math.abs(prev_selected_hour - states.selected_hour) * 50,
        						step: function( now, fx ) {		
        						
        							hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").data("top", now);				
        						
        							hour_picker.find(".goodyear-current-hour-selection").find(".goodyear-hours-floating-block").css("top", now - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");		
        									
        						}
        					});
                            
                            states.selected_date.hour(states.selected_hour);
                            
                            states.input_text_value = states.selected_date.format(options.visible_format);
                    
                            states.container.find(".goodyear-text").val(states.input_text_value);
                            states.container.find(".goodyear-hidden-text").val(states.input_hidden_text_value);
                            
                            if (!states.is_mobile)
            				{
            					setTimeout(function(){
            						states.container.find(".goodyear-text")[0].select();
            					}, 1);	
            				};
        					
        				};
        				  
        			});
        			
        		},
                
                /*
        			������������� ����
        		*/
        		
        		hour_drag : function (){
        		
        			var hour_picker = states.container.find(".goodyear-hour-picker");
        			
        			hour_picker.stop(true, true);
        			
        			hour_picker.mousedown(function(event){
        				
        				states.drag_started = false;
        				
        				hour_picker.removeClass("drag_started");
        				
        				states.drag_item = hour_picker;
        				
        				states.drag_start_pos_y = event.pageY;
        				
        				states.drag_start_element_top = parseInt(hour_picker.find(".goodyear-hours-floating-block").css("top"), 10);
        				
        				$("html, body").addClass("disable_selection");
        				
        				$("html").mousemove(function(event){
        				
        					if (states.drag_item == hour_picker)
        					{												
        						states.drag_started = true;
        						
        						hour_picker.addClass("goodyear-drag_started");
        						
        						var difference_y = (states.drag_start_pos_y - event.pageY);
        						
        						var hour_picker_floating_block_top = states.drag_start_element_top - difference_y;
        						
        						var single_hour_items_count_from_top = parseInt(states.selected_date.format("YYYY"), 10) - options.min_hour;
        						
        						var hour_picker_floating_block_height = block_model.year_block_height - block_model.single_year_item_height*24;
        						
        						if (hour_picker_floating_block_top > (block_model.year_selection_top + block_model.year_selection_border_top))
        						hour_picker_floating_block_top = (block_model.year_selection_top + block_model.year_selection_border_top);
        						
        						if (hour_picker_floating_block_top < - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - block_model.year_selection_border_top) + hour_picker_floating_block_height)
        						hour_picker_floating_block_top = - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - block_model.year_selection_border_top) + hour_picker_floating_block_height;
                                
        						hour_picker.find(".goodyear-hours-floating-block").css("top", hour_picker_floating_block_top);
        						
        						hour_picker.find(".goodyear-hours-floating-block").data("top", hour_picker_floating_block_top);	
        												
        						hour_picker.find(".goodyear-current-hour-selection").find(".goodyear-hours-floating-block").css("top", hour_picker_floating_block_top - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");	
        						
        					};
        				
        				});
        			});
                    
                    states.container.add(document).mouseup(function(e){
        
        				e.stopPropagation();
        				
        				if (states.drag_item == hour_picker)
        				{
        					
        					states.selected_hour = Math.round(Math.abs((parseInt(hour_picker.find(".goodyear-hours-floating-block").css("top"), 10) - block_model.year_selection_top + block_model.year_selection_border_top) / block_model.single_year_item_height));
                            
        					/*
        						������������� �������� �����
        					*/
        					
        					var single_hour_items_count_from_top = states.selected_hour;
        					
        					var hour_picker_floating_block_top = - (single_hour_items_count_from_top * block_model.single_year_item_height) + block_model.year_selection_top + block_model.year_selection_border_top;
        					
        					hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").stop(true, true);
        					
        					hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").animate({
        						"top" : hour_picker_floating_block_top + "px"
        					}, {
        						duration: 200,
        						step: function( now, fx ) {	
        						
        							hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").data("top", now);				
        						
        							hour_picker.find(".goodyear-current-hour-selection").find(".goodyear-hours-floating-block").css("top", now - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");		
        									
        						}
        					});
                            
                            states.selected_date.hour(states.selected_hour);
                            
                            states.input_text_value = states.selected_date.format(options.visible_format);
                            states.input_hidden_text_value = states.selected_date.format(options.format);
                    
                            states.container.find(".goodyear-text").val(states.input_text_value);	
                            states.container.find(".goodyear-hidden-text").val(states.input_hidden_text_value);
                            
                            if (!states.is_mobile)
            				{
            					setTimeout(function(){
            						states.container.find(".goodyear-text")[0].select();
            					}, 1);	
            				};
        					
        					states.drag_item = null;
        						
        					states.drag_start_pos_y = null;
        					
        					states.container.find(".goodyear-hour-picker").removeClass("goodyear-drag_started");
        					
        					$("html").unbind("mousemove");
        					
        					$("html, body").removeClass("disable_selection");			
        					
        					return false;
        				
        				};
        								
        			});	
        			
                    
        		},
                
                /*
        	       ����� ���� ������� ����
        		*/
        		
        		hour_mousewheel : function (){
        			
        			var hour_picker = states.container.find(".goodyear-hour-picker");
        			
        			var hour_slider_speed = 0;
        			
        			var current_millisecond = moment().valueOf();
        			
        			var hour_picker_floating_block_height = block_model.year_block_height - block_model.single_year_item_height*24;
        			
        			var interval_cleared = false;
        			
        			var hour_slider_stop = false;
        			
        			if (states.mousewheel)
        			{
        				hour_picker.mousewheel(function(event){
        					
        					event.stopPropagation();
        					event.preventDefault();	
        					
        					/*
        						���� windows, ����������� ������ ������
        					*/
        					
        					if (navigator.platform.indexOf("Win") != -1) {
        						event.delta *= 20;
        						event.deltaX *= 20;
        						event.deltaY *= 20;
        					}
        					
        					var hour_picker_floating_block_top = (hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").data("top") ? hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").data("top") : parseFloat(hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").css("top"), 10)) + event.deltaY;
        															
        					if (hour_picker_floating_block_top > (block_model.year_selection_top + block_model.year_selection_border_top))
        					hour_picker_floating_block_top = (block_model.year_selection_top + block_model.year_selection_border_top);
        					
        					if (hour_picker_floating_block_top < - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - block_model.year_selection_border_top) + hour_picker_floating_block_height)
        					hour_picker_floating_block_top = - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - block_model.year_selection_border_top) + hour_picker_floating_block_height;
        					
        					hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").css("top", hour_picker_floating_block_top);
        					
        					hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").data("top", hour_picker_floating_block_top);
        					
        					hour_picker.find(".goodyear-current-hour-selection").find(".goodyear-hours-floating-block").css("top", hour_picker_floating_block_top - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");					
        					
        					if (typeof(hour_slider_stop) != "undefined" && hour_slider_stop != false)
        					{
        						clearTimeout(hour_slider_stop);
        					};
        					
        					hour_slider_stop = setTimeout(function(){
        						
        						states.selected_hour = Math.round(Math.abs((parseInt(hour_picker.find(".goodyear-hours-floating-block").css("top"), 10) - block_model.year_selection_top + block_model.year_selection_border_top) / block_model.single_year_item_height));
        					
        						/*
        							������������� �������� �����
        						*/
        		
        						var single_hour_items_count_from_top = states.selected_hour;
        						
        						var hour_picker_floating_block_top = - (single_hour_items_count_from_top * block_model.single_year_item_height) + block_model.year_selection_top + block_model.year_selection_border_top;
        						
        						hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").stop(true, true);
        						
        						hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").animate({
        							"top" : hour_picker_floating_block_top + "px"
        						}, {
        							duration: 200,
        							step: function( now, fx ) {	
        							
        							
        								hour_picker.find(".goodyear-hours").find(".goodyear-hours-floating-block").data("top", now);					
        								hour_picker.find(".goodyear-current-hour-selection").find(".goodyear-hours-floating-block").css("top", now - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");		
        										
        							}
        						});
        						
        						/*
        							
        						*/
                                
                                states.selected_date.hour(states.selected_hour);
                            
                                states.input_text_value = states.selected_date.format(options.visible_format);
                                states.input_hidden_text_value = states.selected_date.format(options.format);
                        
                                states.container.find(".goodyear-text").val(states.input_text_value);
                                states.container.find(".goodyear-hidden-text").val(states.input_hidden_text_value);
                                
                                if (!states.is_mobile)
                				{
                					setTimeout(function(){
                						states.container.find(".goodyear-text")[0].select();
                					}, 1);	
                				};
                                
        					}, 500
        					);
        					
        				});
        			};
        		},
                
                /*
        	  		��������� �� ������
        	  	*/
        	  
        		minute_mouseenter : function(container){
        			  
        			states.container.find(".goodyear-minute-picker").children().filter(".goodyear-minutes").find(".goodyear-minute").find("span").unbind("mouseenter");
        			
        			states.container.find(".goodyear-minute-picker").children().filter(".goodyear-minutes").find(".goodyear-minute").find("span").mouseenter(function(){
        			  
        				$(this).addClass("hover");
        			  
        			}).mouseleave(function(){
        			  
        				$(this).removeClass("hover");
        							  
        			});
        			
        		},
                
                /*
        			���� �� ����
        		*/
        		
        		minute_click : function()
        		{
        		  
        			var minute_picker = states.container.find(".goodyear-minute-picker");
        		  
        			states.container.find(".goodyear-minute-picker").children().filter(".goodyear-minutes").find(".goodyear-minute").find("span").unbind("click");  
        			states.container.find(".goodyear-minute-picker").children().filter(".goodyear-minutes").find(".goodyear-minute").find("span").click(function(){
        				
        				if (!states.drag_started)
        				{				
        					var prev_selected_minute = states.selected_minute;
                            
                            states.selected_minute = Math.round(parseInt($(this).text(), 10) / options.minutes_step) * options.minutes_step;
        					
        					/*
        						������������� �������� �����
        					*/
        					
        					var single_minute_items_count_from_top = parseInt(states.selected_minute, 10) / options.minutes_step;
        					
        					var minute_picker_floating_block_top = - (single_minute_items_count_from_top * block_model.single_year_item_height) + block_model.year_selection_top + block_model.year_selection_border_top;
        					
        					minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").stop(true, true);
        					
        					minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").animate({
        						"top" : minute_picker_floating_block_top + "px"
        					}, {
        						duration: Math.abs(prev_selected_minute - states.selected_minute) * 10,
        						step: function( now, fx ) {		
        						
        							minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").data("top", now);				
        						
        							minute_picker.find(".goodyear-current-minute-selection").find(".goodyear-minutes-floating-block").css("top", now - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");		
        									
        						}
        					});
                            
                            states.selected_date.minute(states.selected_minute);
                            
                            states.input_text_value = states.selected_date.format(options.visible_format);
                            states.input_hidden_text_value = states.selected_date.format(options.format);
                    
                            states.container.find(".goodyear-text").val(states.input_text_value);
                            states.container.find(".goodyear-hidden-text").val(states.input_hidden_text_value);
                            
                            if (!states.is_mobile)
            				{
            					setTimeout(function(){
            						states.container.find(".goodyear-text")[0].select();
            					}, 1);	
            				};
        					
        				};
        				  
        			});
        			
        		},
                
                /*
        			������������� ������
        		*/
        		
        		minute_drag : function (){
        		
        			var minute_picker = states.container.find(".goodyear-minute-picker");
        			
        			minute_picker.stop(true, true);
        			
        			minute_picker.mousedown(function(event){
        				
        				states.drag_started = false;
        				
        				minute_picker.removeClass("drag_started");
        				
        				states.drag_item = minute_picker;
        				
        				states.drag_start_pos_y = event.pageY;
        				
        				states.drag_start_element_top = parseInt(minute_picker.find(".goodyear-minutes-floating-block").css("top"), 10);
        				
        				$("html, body").addClass("disable_selection");
        				
        				$("html").mousemove(function(event){
        				
        					if (states.drag_item == minute_picker)
        					{												
        						states.drag_started = true;
        						
        						minute_picker.addClass("goodyear-drag_started");
        						
        						var difference_y = (states.drag_start_pos_y - event.pageY);
        						
        						var minute_picker_floating_block_top = states.drag_start_element_top - difference_y;
        						
        						var single_minute_items_count_from_top = parseInt(states.selected_date.minute(), 10);
        						
        						var minute_picker_floating_block_height = block_model.year_block_height - block_model.single_year_item_height*( 60 / options.minutes_step );
        						
        						if (minute_picker_floating_block_top > (block_model.year_selection_top + block_model.year_selection_border_top))
        						minute_picker_floating_block_top = (block_model.year_selection_top + block_model.year_selection_border_top);
        						
        						if (minute_picker_floating_block_top < - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - block_model.year_selection_border_top) + minute_picker_floating_block_height)
        						minute_picker_floating_block_top = - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - block_model.year_selection_border_top) + minute_picker_floating_block_height;
        						
        						minute_picker.find(".goodyear-minutes-floating-block").css("top", minute_picker_floating_block_top);
        						
        						minute_picker.find(".goodyear-minutes-floating-block").data("top", minute_picker_floating_block_top);	
        												
        						minute_picker.find(".goodyear-current-minute-selection").find(".goodyear-minutes-floating-block").css("top", minute_picker_floating_block_top - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");	
        						
        					};
        				
        				});
        			});
                    
                    states.container.add(document).mouseup(function(e){
        
        				e.stopPropagation();
        				
        				if (states.drag_item == minute_picker)
        				{
        					
        					states.selected_minute = Math.round(Math.abs((parseInt(minute_picker.find(".goodyear-minutes-floating-block").css("top"), 10) - block_model.year_selection_top + block_model.year_selection_border_top) / block_model.single_year_item_height)) * options.minutes_step;
                            
        					/*
        						������������� �������� �����
        					*/
        					
        					var single_minute_items_count_from_top = states.selected_minute / options.minutes_step;
        					
        					var minute_picker_floating_block_top = - (single_minute_items_count_from_top * block_model.single_year_item_height) + block_model.year_selection_top + block_model.year_selection_border_top;
        					
        					minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").stop(true, true);
        					
        					minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").animate({
        						"top" : minute_picker_floating_block_top + "px"
        					}, {
        						duration: 200,
        						step: function( now, fx ) {	
        						
        							minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").data("top", now);				
        						
        							minute_picker.find(".goodyear-current-minute-selection").find(".goodyear-minutes-floating-block").css("top", now - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");		
        									
        						}
        					});
                            
                            states.selected_date.minute(states.selected_minute);
                            
                            states.input_text_value = states.selected_date.format(options.visible_format);
                            states.input_hidden_text_value = states.selected_date.format(options.format);
                    
                            states.container.find(".goodyear-text").val(states.input_text_value);
                            states.container.find(".goodyear-hidden-text").val(states.input_hidden_text_value);
                            
                            if (!states.is_mobile)
            				{
            					setTimeout(function(){
            						states.container.find(".goodyear-text")[0].select();
            					}, 1);	
            				};
        					
        					states.drag_item = null;
        						
        					states.drag_start_pos_y = null;
        					
        					states.container.find(".goodyear-minute-picker").removeClass("goodyear-drag_started");
        					
        					$("html").unbind("mousemove");
        					
        					$("html, body").removeClass("disable_selection");			
        					
        					return false;
        				
        				};
        								
        			});	
        			
                    
        		},
                
                /*
        	       ����� ���� ������� ����
        		*/
        		
        		minute_mousewheel : function (){
        			
        			var minute_picker = states.container.find(".goodyear-minute-picker");
        			
        			var minute_slider_speed = 0;
        			
        			var current_millisecond = moment().valueOf();
        			
        			var minute_picker_floating_block_height = block_model.year_block_height - block_model.single_year_item_height*( 60 / options.minutes_step );
        			
        			var interval_cleared = false;
        			
        			var minute_slider_stop = false;
        			
        			if (states.mousewheel)
        			{
        				minute_picker.mousewheel(function(event){
        					
        					event.stopPropagation();
        					event.preventDefault();	
        					
        					/*
        						���� windows, ����������� ������ ������
        					*/
        					
        					if (navigator.platform.indexOf("Win") != -1) {
        						event.delta *= 20;
        						event.deltaX *= 20;
        						event.deltaY *= 20;
        					}
        					
        					var minute_picker_floating_block_top = (minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").data("top") ? minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").data("top") : parseFloat(minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").css("top"), 10)) + event.deltaY;
        															
        					if (minute_picker_floating_block_top > (block_model.year_selection_top + block_model.year_selection_border_top))
        					minute_picker_floating_block_top = (block_model.year_selection_top + block_model.year_selection_border_top);
        					
        					if (minute_picker_floating_block_top < - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - block_model.year_selection_border_top) + minute_picker_floating_block_height)
        					minute_picker_floating_block_top = - (block_model.year_block_height - block_model.year_selection_top - block_model.single_year_item_height - block_model.year_selection_border_top) + minute_picker_floating_block_height;
        					
        					minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").css("top", minute_picker_floating_block_top);
        					
        					minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").data("top", minute_picker_floating_block_top);
        					
        					minute_picker.find(".goodyear-current-minute-selection").find(".goodyear-minutes-floating-block").css("top", minute_picker_floating_block_top - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");					
        					
        					if (typeof(minute_slider_stop) != "undefined" && minute_slider_stop != false)
        					{
        						clearTimeout(minute_slider_stop);
        					};
        					
        					minute_slider_stop = setTimeout(function(){
        						
        						states.selected_minute = Math.round(Math.abs((parseInt(minute_picker.find(".goodyear-minutes-floating-block").css("top"), 10) - block_model.year_selection_top + block_model.year_selection_border_top) / block_model.single_year_item_height))*options.minutes_step;
        					
        						/*
        							������������� �������� �����
        						*/
        		
        						var single_minute_items_count_from_top = states.selected_minute / options.minutes_step;
        						
        						var minute_picker_floating_block_top = - (single_minute_items_count_from_top * block_model.single_year_item_height) + block_model.year_selection_top + block_model.year_selection_border_top;
        						
        						minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").stop(true, true);
        						
        						minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").animate({
        							"top" : minute_picker_floating_block_top + "px"
        						}, {
        							duration: 200,
        							step: function( now, fx ) {	
        							
        							
        								minute_picker.find(".goodyear-minutes").find(".goodyear-minutes-floating-block").data("top", now);					
        								minute_picker.find(".goodyear-current-minute-selection").find(".goodyear-minutes-floating-block").css("top", now - (block_model.year_selection_top + block_model.year_selection_border_top) + "px");		
        										
        							}
        						});
        						
        						/*
        							
        						*/
                                
                                states.selected_date.minute(states.selected_minute);
                            
                                states.input_text_value = states.selected_date.format(options.visible_format);
                                states.input_hidden_text_value = states.selected_date.format(options.format);
                        
                                states.container.find(".goodyear-text").val(states.input_text_value);	
                                states.container.find(".goodyear-hidden-text").val(states.input_hidden_text_value);
                                
                                if (!states.is_mobile)
                				{
                					setTimeout(function(){
                						states.container.find(".goodyear-text")[0].select();
                					}, 1);	
                				};
                                
        					}, 500
        					);
        					
        				});
        			};
        		},
        		
        		/*
        			��������� ���� ��� ���������
        		*/
        		
        		date_hover : function (){
        			
        			var date_slider = states.container.find(".goodyear-date-picker").find(".goodyear-slider");
        			
        			date_slider.find(".goodyear-month").find(".goodyear-slide_line").find("span").mouseenter(function(){
        			     
                        if (!$(this).hasClass("disabled") && states.picker_open)
                        {
                         
            				$(this).addClass("hover");
            
            				states.container.find(".goodyear-text").val(moment([states.displayed_year, parseInt($(this).parents(".goodyear-month").data("monthId"), 10), parseInt($(this).text(), 10), states.selected_hour, states.selected_minute]).format(options.visible_format));
            
            				if (!states.is_mobile)
            				{
            					setTimeout(function(){
            						states.container.find(".goodyear-text")[0].select();
            					}, 1);		
            				};
                        
                        };
        			  
        			}).mouseleave(function(){
                        
                        if (!$(this).hasClass("disabled") && states.picker_open)
                        {
                        
            				$(this).removeClass("hover");
            				
            				if (states.picker_open)
            				{
            					states.container.find(".goodyear-text").val(states.input_text_value);					
            				};
            				
            				if (!states.is_mobile)
            				{
            					setTimeout(function(){
            						states.container.find(".goodyear-text")[0].select();
            					}, 1);	
            				};
        				
                        };
                        			  
        			});
        			
        		},
        		
        		/*
        			����� ����
        		*/
        		
        		date_pick : function(){
        		
                    var date_slider = states.container.find(".goodyear-date-picker").find(".goodyear-slider");
        			
                    date_slider.find(".goodyear-month").find(".goodyear-slide_line").find("span").mousedown(function(){
        				
                        if (!$(this).hasClass("disabled"))
                        {
                            states.container.removeClass("goodyear-error");
                        };
        				
        			}).mouseleave(function(){
        				
                        if (!$(this).hasClass("disabled"))
                        {
                      
                            if (states.input_text_error)
                            {
                               states.container.addClass("goodyear-error");
                            };
                      
                        };
        				
        			}).click(function(){
                   
                        if (!$(this).hasClass("disabled"))
                        {
                       
                            states.container.removeClass("goodyear-error");
    
                            states.input_text_error = false;
    
                            states.selected_date = moment([states.displayed_year, parseInt($(this).parents(".goodyear-month").data("monthId"), 10), parseInt($(this).text(), 10), states.selected_hour, states.selected_minute]);
    
                            states.input_text_value = states.selected_date.format(options.visible_format);
                            states.input_hidden_text_value = states.selected_date.format(options.format);
    
                            methods.set_date();
    
                            states.container.find(".goodyear-text").focus();
    
                            if (!states.is_mobile)
                            {
                               setTimeout(function(){
                                  states.container.find(".goodyear-text")[0].select();
                               }, 1);
                            };
    
                            states.container.find(".goodyear-picker").css("zIndex", 1);
    
                            states.container.find(".goodyear-picker").fadeOut(100);		
    
                            states.picker_open = false;	
                            
                            states.container.find(".goodyear-hidden-text").triggerHandler("blur");
                            
                        };
                   
        			});  
        		
        		},	
        		
        		trim : function(string){
        			
        			if (string && typeof(string) == "string")			
        			return string.replace(/^\s+|\s+$/g, '');
        			else
        			return "";
        			
        		},
        		
        		string_to_date : function(string){
        			
                    for (i = 0; i < presets.common_date_langs.length; i++)
        			{
                        var parsed_date = moment(methods.trim(string), options.format, presets.common_date_langs[i], true);
                        
                        if (parsed_date.isValid())
            			{
        	                break;
            			};
                    };
                    
                    for (i = 0; i < presets.common_date_langs.length; i++)
        			{
                        var parsed_date = moment(methods.trim(string), options.visible_format, presets.common_date_langs[i], true);
                        
                        if (parsed_date.isValid())
            			{
        	                break;
            			};
                    };
                    
                    if (!parsed_date.isValid())
                    {
                        
            			for (k = 0; k < presets.common_date_formats.length; k++)
            			{
            				for (i = 0; i < presets.common_date_langs.length; i++)
            				{
            					var parsed_date = moment(methods.trim(string), presets.common_date_formats[k], presets.common_date_langs[i], (k < 2));
            					
            					if (parsed_date.isValid())
            					{
            						break;
            					};
            				};
            				
            				if (parsed_date.isValid())
            				{
            					break;
            				};
            			};
                        
                    };
        			
        			if (parsed_date.isValid())
        			{
        				return parsed_date;
        			} else
        			{
        				return false;
        			};
        			
        		}
        		
        	};
                
    		/*
    			������, ���������� � data
    		*/
            
        	if (typeof(goodyear_input.data("goodyearNoIcon")) != "undefined" && goodyear_input.data("goodyearNoIcon") == true)
        	{
        		options.no_icon = true;
        	} else
        	{
        		options.no_icon = false;
        	};
        	
            if (typeof(goodyear_input.data("goodyearRangeFrom")) != "undefined" && goodyear_input.data("goodyearRangeFrom"))
            {
                options.range_from_id = parseInt(goodyear_input.data("goodyearRangeFrom"), 10);
            };
            
            if (typeof(goodyear_input.data("goodyearRangeTo")) != "undefined" && goodyear_input.data("goodyearRangeTo"))
            {
                options.range_to_id = parseInt(goodyear_input.data("goodyearRangeTo"), 10);
            };
    		
    		if (typeof(goodyear_input.data("goodyearFormat")) != "undefined" && goodyear_input.data("goodyearFormat"))
    		{
    			options.format = goodyear_input.data("goodyearFormat");
    		};
    		
    		if (typeof(goodyear_input.data("goodyearVisibleFormat")) != "undefined" && goodyear_input.data("goodyearVisibleFormat"))
    		{
    			options.visible_format = goodyear_input.data("goodyearVisibleFormat");
    		} else 
    		if (typeof(goodyear_input.data("goodyearFormat")) != "undefined" && goodyear_input.data("goodyearFormat"))
    		{
    			options.visible_format = goodyear_input.data("goodyearFormat");
    		};
    		
    		if (typeof(goodyear_input.data("goodyearMinYear")) != "undefined" && goodyear_input.data("goodyearMinYear"))
    		{
    			options.min_year = goodyear_input.data("goodyearMinYear");
    		};
    		
    		if (typeof(goodyear_input.data("goodyearMaxYear")) != "undefined" && goodyear_input.data("goodyearMaxYear"))
    		{
    			options.max_year = goodyear_input.data("goodyearMaxYear");
    		};	
    		
    		if (typeof(goodyear_input.data("goodyearMinDate")) != "undefined" && goodyear_input.data("goodyearMinDate"))
    		{
    			options.min_date = goodyear_input.data("goodyearMinDate");
    		};
    		
    		if (typeof(goodyear_input.data("goodyearMaxDate")) != "undefined" && goodyear_input.data("goodyearMaxDate"))
    		{
    			options.max_date = goodyear_input.data("goodyearMaxDate");
    		};
            
            if (typeof(goodyear_input.data("goodyearHourPicker")) != "undefined" && goodyear_input.data("goodyearHourPicker"))
    		{
    			options.hour_picker = (goodyear_input.data("goodyearHourPicker") ? true : false);
    		};
            
            if (typeof(goodyear_input.data("goodyearMinutePicker")) != "undefined" && goodyear_input.data("goodyearMinutePicker"))
    		{
    			options.minute_picker = (goodyear_input.data("goodyearMinutePicker") ? true : false);
    		};
    		
    		if (typeof(goodyear_input.data("goodyearMinutesStep")) != "undefined" && goodyear_input.data("goodyearMinutesStep"))
    		{
    			options.minutes_step = (goodyear_input.data("goodyearMinutesStep") ? goodyear_input.data("goodyearMinutesStep") : 5);
    			
    			options.minutes_step = 60 / Math.floor(60 / options.minutes_step);
    		};
            
            if (options.minute_picker)
            options.hour_picker = true;
            
    		/*
    			����
    		*/
    		
    		moment.lang("ru");
    				
    		/*
    			��������� � ������ ������ ����
    		*/
    		
    		var selected_date = methods.string_to_date(goodyear_input.val());
    		
    		/*
    			�������
    		*/
    		
    		states.today = moment();
    		
    		/*
    			�������� ���
    		*/
    				
    		options.min_date = methods.string_to_date(options.min_date);
    		
    		/*
    			���� ����������� ���� �������, ���������� � ������������ ����������� ���
    		*/
    		
    		if (options.min_date)
    		{
    			
    			options.min_year = parseInt(options.min_date.format("YYYY"), 10);
    			
    		} else if (options.min_year)
    		{
    			
    			/*
    				���� ����������� ��� ������, � ���� ���, ���������� � ������������ ����������� ����
    			*/
    			
    			options.min_date = methods.string_to_date(options.min_year + "-01-01");
    			
    		} else
    		{
    			/*
    				���� �� ������ �� ���, �� ����, ��������� ���. ��� ��� ������� - 50
    			*/
    			
    			if (selected_date)
    			{
    				options.min_year = parseInt(selected_date.format("YYYY"), 10) - 50;
    			} else
    			{
    				options.min_year = parseInt(states.today.format("YYYY"), 10) - 50;
    			};
    			
    			/*
    				���. ���� ����� �� ������ ������������ ����
    			*/
    			
    			options.min_date = methods.string_to_date(options.min_year + "-01-01");	
    		};
    		
    		
    		
    		options.max_date = methods.string_to_date(options.max_date);
    		
    		/*
    			���� ������������ ���� �������, ���������� � ������������ ����������� ���
    		*/
    		
    		if (options.max_date)
    		{
    			
                options.max_date = options.max_date.endOf("day");
                
    			options.max_year = parseInt(options.max_date.format("YYYY"), 10);
    			
    		} else if (options.max_year)
    		{
    			
    			/*
    				���� ������������ ��� ������, � ���� ���, ���������� � ������������ ������������ ����
    			*/
    			
    			options.max_date = methods.string_to_date(options.max_year + "-01-01");
                
                options.max_date = options.max_date.endOf("year");
    			
    		} else
    		{
    			/*
    				���� �� ������ �� ���, �� ����, ��������� ����. ��� ��� ������� + 50
    			*/
    			
    			if (selected_date)
    			{
    				options.max_year = parseInt(selected_date.format("YYYY"), 10) + 50;
    			} else
    			{
    				options.max_year = parseInt(states.today.format("YYYY"), 10) + 50;
    			};
    			
    			/*
    				����. ���� ����� �� ����� ������������� ����
    			*/
    			
    			options.max_date = methods.string_to_date(options.max_year + "-01-01").endOf("year");	
    		};
    		
    		/*
    			���� ������������ � �������� � ��������
    		*/
            
    		if (selected_date && (selected_date >= options.min_date && selected_date <= options.max_date))
    		{
    		  
                if (!options.minute_picker)
                {
                    selected_date.minute(0);
                };
                
                if (!options.hour_picker)
                {
                    selected_date.hour(0);
                };
              
    			states.selected_date = selected_date;
    			states.input_text_value = states.selected_date.format(options.visible_format);
                states.input_hidden_text_value = states.selected_date.format(options.format);
                
    			
    		}
    		else if (states.today >= options.min_date && states.today <= options.max_date)
    		{
    			
                    /*
                            ���� ������� �������� � ����������� ��������
                    */

                    states.selected_date = states.today;
                    states.input_text_value = goodyear_input.val();
                    states.input_hidden_text_value = goodyear_input.val();
    						
    		} else
    		{
                    /*
                            ���� ���, �������� ����� ����� ��������� ���� ������ ������������ ���������
                    */

                    states.selected_date = options.min_date;
                    states.input_text_value = goodyear_input.val();
                    states.input_hidden_text_value = goodyear_input.val();
    			
    		};
            
            /*
                ������������� �����
            */        
    		if (selected_date)
    		{
    	        states.selected_hour = selected_date.hour();
    	        states.selected_minute = Math.round(selected_date.minute() / options.minutes_step) * options.minutes_step;
    		} else
    		{
    			states.selected_hour = 0;
    			states.selected_minute = 0;
    		}
    
    		/*
    			��������� ������� ������� mousewheel
    		*/
    		
    		if (jQuery().mousewheel)
    		{
    			states.mousewheel = true;
    		};
    		
    		/*
    			������� ����� ��������� �� ��������� ��������: ���������� ����, ���� � �������
    		*/
    
    		goodyear_input = methods.wrap_element(goodyear_input);
            
            if (typeof(activated_goodyears_list) == "undefined")
            activated_goodyears_list = [];
            
            activated_goodyears_list[activated_goodyears_list.length] = {
                element : goodyear_input,
                states : states,
                options : options,
                methods : methods
            }
    		
    		methods.document_actions();
                    
            return goodyear_input;
        
        };
      
    };
 
    return init(this, options, methods_params);
        
  };
})(jQuery);

$(document).ready(function(){
    
	var is_goodyear_script = new RegExp('^.*?goodyear[^/]*?$', "i");
	
	var find_script_path = new RegExp('^(.*?)[^/]*?$', "i");
	
	var script_path = false;
    
    var script_block = false;
    
	$("script").filter("[src*='goodyear']").each(function(){
		
		if (is_goodyear_script.test($(this).attr("src")))
		{
			script_path = find_script_path.exec($(this).attr("src"))[1];
            
            script_block = $(this);
		};
		
	});
	
	if (script_path)
	if (typeof(moment) == "undefined")
	{		
		$("<script src='"+script_path + "moment-with-langs.min.js'></script>").insertAfter(script_block);	
	}; 
    
	if (script_path)
	if (!jQuery().mousewheel)
	{	
		$("<script src='"+script_path + "jquery-mousewheel-3.1.11.min.js'></script>").insertAfter(script_block);	
	};
		
	$(".goodyear").goodyear();
		
});
