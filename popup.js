// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/**
 * Add your Analytics tracking ID here.
 */
var _AnalyticsCode = 'UA-39802197-9';
/**
 * Below is a modified version of the Google Analytics asynchronous tracking
 * code snippet.  It has been modified to pull the HTTPS version of ga.js
 * instead of the default HTTP version.  It is recommended that you use this
 * snippet instead of the standard tracking snippet provided when setting up
 * a Google Analytics account.
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
/**
 * Track a click on a button using the asynchronous tracking API.
 *
 * See http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html
 * for information on how to use the asynchronous tracking API.
 */
function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
}


$(document).ready(function() {
    $("#ebay-profit-container input#paypal-fee").val("2.9");
    $("#ebay-profit-container input").keyup(function() {

    var originalCost = 0,
        sellingPrice = 0,
        sellingFee = 0,
        calculatedSellingFee = 0,
        paypalFee = 0,
        calculatePaypalFee = 0,
        shipping = 0,
        quantity = 0,
        profit = 0,
        revenue = 0,
        expenses = 0;

        var userInputOriginalCost = parseFloat($("#ebay-profit-container input#original-cost").val());
        var userInputSellingPrice = parseFloat($("#ebay-profit-container input#selling-price").val());
        var userInputSellingFee = parseFloat($("#ebay-profit-container input#selling-fee").val());
        var userInputPaypalFee = parseFloat($("#ebay-profit-container input#paypal-fee").val());
        var userInputShipping = parseFloat($("#ebay-profit-container input#shipping").val());
        var userInputQuantity = parseFloat($("#ebay-profit-container input#quantity").val());

        originalCost = isNaN(userInputOriginalCost) ? 0 : userInputOriginalCost;
        sellingPrice = isNaN(userInputSellingPrice) ? 0 : userInputSellingPrice;
        sellingFee = isNaN(userInputSellingFee) ? 0 : userInputSellingFee;
        
        if(sellingFee > 0) {
            calculatedSellingFee = sellingPrice * (sellingFee/100);
            if(calculatedSellingFee > 750) {
                calculatedSellingFee = 750;
            }
        }

        paypalFee = isNaN(userInputPaypalFee) ? 0 : userInputPaypalFee;

        if(paypalFee > 0) {
            calculatePaypalFee = (sellingPrice * (paypalFee/100)) + .3;
        }

        shipping = isNaN(userInputShipping) ? 0 : userInputShipping;
        quantity = isNaN(userInputQuantity) ? 0 : userInputQuantity;
        revenue = parseFloat(sellingPrice * quantity).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        //expenses = parseFloat(((calculatedSellingFee + calculatePaypalFee) - shipping) * quantity).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        //profit = parseFloat(((sellingPrice - (calculatedSellingFee + calculatePaypalFee) - shipping) - originalCost) * quantity).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        expenses = round(parseFloat(((calculatedSellingFee + calculatePaypalFee) + shipping) * quantity), 2);
        profit = round(parseFloat(((sellingPrice - (calculatedSellingFee + calculatePaypalFee) - shipping) - originalCost) * quantity), 2);

        if(!isNaN(parseFloat(profit))) {
            if(parseFloat(profit) < 0) {
               $("#ebay-profit-container p#profit").css({color: 'darkred'}) ;
            } else {
                $("#ebay-profit-container p#expenses").css({color: 'darkred'}) ;
                $("#ebay-profit-container p#profit").css({color: '#016f01'}) ;
            }
            $("#ebay-profit-container p#expenses").text('$'+expenses);                        
            $("#ebay-profit-container p#profit").text('$'+profit);
        }
    });

});

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }