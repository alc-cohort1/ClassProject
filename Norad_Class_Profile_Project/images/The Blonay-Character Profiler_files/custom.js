$(document).ready(function() {
    $("div#score_table").hide();
    $("canvas#radar").attr('style', 'display: none');

    $("select.form-control").blur(function(){
        $p.questionnaire.score = QScore();
        var fullNames = $p.questionnaire.customFields.name;
        var Percentage = Perc();
        var progress = '<h3>Completion:</h3>' + ' ' + 'You have completed' + ' ' + Math.round(Percentage) + ' ' + '%' + ' ' + 'of the questionnaire';
        var names = '<h3>Name:</h3>'  + ' ' + fullNames;
        
        var scoreArray = $p.questionnaire.score
        var boldCreative = scoreArray[0];
        var selfDisciplined = scoreArray[1];
        var empathic = scoreArray[2];

        if(names == 'null') {
            $("p#fullnames").html('No Name Specified');
        } else {
            $("p#fullnames").html(names);
        }
        $("p#progress").html(progress);
        $("td#BC").html(boldCreative);
        $("td#ET").html(empathic);
        $("td#SD").html(selfDisciplined); 


        /*------------------------------------------------------------------------------------------------
        Calculations for Bold Creative
        -------------------------------------------------------------------------------------------------*/
        if( boldCreative > 0 && boldCreative <= 15 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=338', function( data ) { 
                $("td#bc_observation").html(data);
            });
        } else if ( boldCreative > 15 && boldCreative <= 29 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=347', function( data ) { 
                $("td#bc_observation").html(data);
            });

        } else if ( boldCreative > 29 && boldCreative <= 40 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=345', function( data ) { 
                $("td#bc_observation").html(data);
            });

        } else if ( boldCreative > 40 && boldCreative <= 50 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=344', function( data ) { 
                $("td#bc_observation").html(data);
            });

        } else if ( boldCreative > 50 && boldCreative <= 100 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=346', function( data ) { 
                $("td#bc_observation").html(data);
            });
        } else {
            $("td#bc_observation").html("Invalid Score");   
        }

        /*------------------------------------------------------------------------------------------------
        Calculations for Bold Empathic
        -------------------------------------------------------------------------------------------------*/
        if( empathic > 0 && empathic <= 15 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=352', function( data ) { 
                $("td#emp_observation").html(data);
            });
        } else if ( empathic > 15 && empathic <= 29 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=355', function( data ) { 
                $("td#emp_observation").html(data);
            });

        } else if ( empathic > 29 && empathic <= 40 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=356', function( data ) { 
                $("td#emp_observation").html(data);
            });

        } else if ( empathic > 40 && empathic <= 50 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=353', function( data ) { 
                $("td#emp_observation").html(data);
            });

        } else if ( empathic > 50 && empathic <= 100 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=354', function( data ) { 
                $("td#emp_observation").html(data);
            });
        } else {
            $("td#emp_observation").html("Invalid Score");   
        }

         /*------------------------------------------------------------------------------------------------
        Calculations for Self-disciplined
        -------------------------------------------------------------------------------------------------*/
        if( selfDisciplined > 0 && selfDisciplined <= 15 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=362', function( data ) { 
                $("td#sd_observation").html(data);
            });
        } else if ( selfDisciplined > 15 && selfDisciplined <= 29 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=365', function( data ) { 
                $("td#sd_observation").html(data);
            });

        } else if ( selfDisciplined > 29 && selfDisciplined <= 40 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=363', function( data ) { 
                $("td#sd_observation").html(data);
            });

        } else if ( selfDisciplined > 40 && selfDisciplined <= 50 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=364', function( data ) { 
                $("td#sd_observation").html(data);
            });

        } else if ( selfDisciplined > 50 && selfDisciplined <= 100 ) {
            $.post('http://blonay.co.uk/wp-admin/admin-ajax.php?action=get_page&id=366', function( data ) { 
                $("td#sd_observation").html(data);
            });
        } else {
            $("td#sd_observation").html("Invalid Score");   
        }

        var data = {
            labels: ["Bold Creative", "Self-disciplined", "Empathic"],
            datasets: [
                {
                    label: "Your Profiler Score",
                    fill: true,
                    borderWidth: 3,
                    borderColor: "#262f72",
                    pointBorderColor: "#262f72",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#262f72",
                    pointHoverBorderColor: "#f5f5f5",
                    pointHoverBorderWidth: 2,
                    data: scoreArray
                }
            ]
        };

        var ctx = $("#radar");
        var myRadarChart = new Chart(ctx, {
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                legend: {
                    display: true
                },
                tooltips: {
                    mode: 'single',
                    backgroundColor: '#0F0E0E',
                    bodyColor: '#373A8C',
                    titleColor: '#FAF6F6'
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                },
                scale: {
                    ticks: {
                        beginAtZero: true,
                        display: false
                    },
                    beforeFit: function (scale) {
                        if (scale.chart.config.data.labels.length === 3) {
                            var pointLabelFontSize = Chart.helpers.getValueOrDefault(scale.options.pointLabels.fontSize, Chart.defaults.global.defaultFontSize);
                            scale.height *= (1.5 / 1.5)
                            scale.height -= pointLabelFontSize;
                        }
                    },
                    afterFit: function (scale) {
                        if (scale.chart.config.data.labels.length === 3) {
                            var pointLabelFontSize = Chart.helpers.getValueOrDefault(scale.options.pointLabels.fontSize, Chart.defaults.global.defaultFontSize);
                            scale.height += pointLabelFontSize;
                            scale.height /= (1.5 / 1.5);
                        }
                    },            
                },
                maintainAspectRatio: false,
                elements: {
                    line: {
                        tension: 0,
                    }
                }
            }
        });

    });
    $("button#btn-questionnaire").click(function(){
        $("div#score_table").show();
        $("canvas#radar").attr('style', 'display: block; width: 570px; height: 300px;');
    });

});

/*
* Function QScore
* return an array of sums (Bold, Empath and Self Disciplined)
*/
function QScore() {
    //Define empty array totalScores
    totalScores = new Array();

    //Define category sum for bold, empathic and self discipline
    var totalCategoryBoldCreative = 0;
    var totalCategorySelfDisciplined = 0;
    var totalCategoryEmpathic = 0;

    //Get all the available keys
    var keys = Object.keys($p.questionnaire.customFields);
    for (idx in keys) {
        switch (keys[idx]) {
            case 'workspace_is':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategorySelfDisciplined += 7;

                    break;
                    case 'b)':
                    totalCategoryBoldCreative += 7;
                    break;

                    case 'c)':
                    totalCategoryBoldCreative += 4;
                    break;

                    case 'd)':
                    totalCategorySelfDisciplined += 4;
                    break;
                }
            break;

            case 'group_idea':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategoryEmpathic += 4;
                    break;

                    case 'b)':
                    totalCategoryBoldCreative += 7;
                    break;

                    case 'c)':
                    totalCategoryBoldCreative += 4;
                    break;

                    case 'd)':
                    totalCategoryEmpathic += 7;
                    break;
                }
            break;

            case 'group_outing':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategoryBoldCreative += 4;
                    break;

                    case 'b)':
                    totalCategoryBoldCreative += 7;
                    break;

                    case 'c)':
                    totalCategoryEmpathic += 4;
                    break;

                    case 'd)':
                    totalCategoryEmpathic += 7;
                    break;
                }
            break;

            case 'how_shopping':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategorySelfDisciplined += 7;
                    break;

                    case 'b)':
                    totalCategorySelfDisciplined += 4;
                    break;

                    case 'c)':
                    totalCategoryBoldCreative += 4;
                    break;

                    case 'd)':
                    totalCategoryBoldCreative += 7;
                    break;
                }
            break;

            case 'handle_restaurant':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategoryEmpathic += 7;
                    break;

                    case 'b)':
                    totalCategoryEmpathic += 4;
                    break;

                    case 'c)':
                    totalCategoryBoldCreative += 4;
                    break;

                    case 'd)':
                    totalCategoryBoldCreative += 7;
                    break;
                }
            break;

            case 'decision_coworkers':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategorySelfDisciplined += 7;
                    break;

                    case 'b)':
                    totalCategoryEmpathic += 4;
                    break;

                    case 'c)':
                    totalCategorySelfDisciplined += 4;
                    break;

                    case 'd)':
                    totalCategoryEmpathic += 7;
                    break;
                }
            break;

            case 'project_move':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategorySelfDisciplined += 7;
                    break;

                    case 'b)':
                    totalCategoryBoldCreative += 7;
                    break;

                    case 'c)':
                    totalCategoryBoldCreative += 4;
                    break;

                    case 'd)':
                    totalCategorySelfDisciplined += 4;
                    break;
                }
            break;

            case 'callcenter_reaction':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategorySelfDisciplined += 4;
                    break;

                    case 'b)':
                    totalCategoryEmpathic += 4;
                    break;

                    case 'c)':
                    totalCategoryEmpathic += 7;
                    break;

                    case 'd)':
                    totalCategorySelfDisciplined += 7;
                    break;
                }
            break;

            case 'employee_response':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategoryEmpathic += 7;
                    break;

                    case 'b)':
                    totalCategorySelfDisciplined += 4;
                    break;

                    case 'c)':
                    totalCategorySelfDisciplined += 7;
                    break;

                    case 'd)':
                    totalCategoryEmpathic += 4;
                    break;
                }
            break;

            case 'navigation_days':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategorySelfDisciplined += 4;
                    break;

                    case 'b)':
                    totalCategorySelfDisciplined += 7;
                    break;

                    case 'c)':
                    totalCategoryBoldCreative += 7;
                    break;

                    case 'd)':
                    totalCategoryBoldCreative += 4;
                    break;
                }
            break;

            case 'dating_dislike':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategoryEmpathic += 7;
                    break;

                    case 'b)':
                    totalCategoryBoldCreative += 7;
                    break;

                    case 'c)':
                    totalCategoryBoldCreative += 4;
                    break;

                    case 'd)':
                    totalCategoryEmpathic += 4;
                    break;
                }
            break;

            case 'prefer_holiday':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategorySelfDisciplined += 7;
                    break;

                    case 'b)':
                    totalCategorySelfDisciplined += 4;
                    break;

                    case 'c)':
                    totalCategoryBoldCreative += 4;
                    break;

                    case 'd)':
                    totalCategoryBoldCreative += 7;
                    break;
                }
            break;

            case 'work_comfort':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategoryEmpathic += 4;
                    break;

                    case 'b)':
                    totalCategoryBoldCreative += 7;
                    break;

                    case 'c)':
                    totalCategoryEmpathic += 7;
                    break;

                    case 'd)':
                    totalCategoryBoldCreative += 4;
                    break;
                }
            break;

            case 'disagree_refdecision':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategoryEmpathic += 7;
                    break;

                    case 'b)':
                    totalCategoryEmpathic += 4;
                    break;

                    case 'c)':
                    totalCategoryBoldCreative += 7;
                    break;

                    case 'd)':
                    totalCategoryBoldCreative += 4;
                    break;
                }
            break;

            case 'sit_office':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategorySelfDisciplined += 7;
                    break;

                    case 'b)':
                    totalCategoryEmpathic += 4;
                    break;

                    case 'c)':
                    totalCategorySelfDisciplined += 4;
                    break;

                    case 'd)':
                    totalCategoryEmpathic += 7;
                    break;
                }
            break;

            case 'decide_twocars':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategorySelfDisciplined += 7;
                    break;

                    case 'b)':
                    totalCategorySelfDisciplined += 4;
                    break;

                    case 'c)':
                    totalCategoryEmpathic += 4;
                    break;

                    case 'd)':
                    totalCategoryEmpathic += 7;
                    break;
                }
            break;

            case 'difficult_decision':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategorySelfDisciplined += 7;
                    break;

                    case 'b)':
                    totalCategoryEmpathic += 4;
                    break;

                    case 'c)':
                    totalCategorySelfDisciplined += 4;
                    break;

                    case 'd)':
                    totalCategoryEmpathic += 7;
                    break;
                }
            break;

            case 'track_finances':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategorySelfDisciplined += 4;
                    break;

                    case 'b)':
                    totalCategoryBoldCreative += 4;
                    break;

                    case 'c)':
                    totalCategorySelfDisciplined += 7;
                    break;

                    case 'd)':
                    totalCategoryBoldCreative += 7;
                    break;
                }
            break;

            case 'team_crisis':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategoryBoldCreative += 4;
                    break;

                    case 'b)':
                    totalCategoryBoldCreative += 7;
                    break;

                    case 'c)':
                    totalCategoryEmpathic += 4;
                    break;

                    case 'd)':
                    totalCategoryEmpathic += 7;
                    break;
                }
            break;

            case 'furniture_store':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategoryBoldCreative += 4;
                    break;

                    case 'b)':
                    totalCategorySelfDisciplined += 4;
                    break;

                    case 'c)':
                    totalCategorySelfDisciplined += 7;
                    break;

                    case 'd)':
                    totalCategoryBoldCreative += 7;
                    break;
                }
            break;

            case 'meet_new_people':
                switch(($p.questionnaire.customFields[keys[idx]].substr(0, 2))) {
                    case 'a)':
                    totalCategorySelfDisciplined += 4;
                    break;

                    case 'b)':
                    totalCategorySelfDisciplined += 7;
                    break;

                    case 'c)':
                    totalCategoryEmpathic += 4;
                    break;

                    case 'd)':
                    totalCategoryEmpathic += 7;
                    break;
                }
            break;
        }
    }

    totalScores.push(totalCategoryBoldCreative, totalCategorySelfDisciplined, totalCategoryEmpathic);

    return totalScores;
}

function Perc() {
    var questionaires = Object.keys($p.questionnaire.customFields);
    var no_of_questionaires_answered =  questionaires.length;
    var percentage = ((no_of_questionaires_answered-1)/21) * 100;

    return percentage;
}
