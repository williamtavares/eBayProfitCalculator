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
    $("input#paypal-fee").val("2.9");
    $("input").keyup(function() {

    if (!this.value) {
        $(this).val("0");
    }
    
    var originalCost = 0,
        sellingPrice = 0,
        sellingFee = 0,
        calculatedSellingFee = 0,
        paypalFee = 0,
        calculatePaypalFee = 0,
        shipping = 0,
        quantity = 0,
        profit = 0;

        originalCost = parseFloat($("input#original-cost").val());

        sellingPrice = parseFloat($("input#selling-price").val());

        sellingFee = parseFloat($("input#selling-fee").val());
        
        if(sellingFee > 0) {
            calculatedSellingFee = sellingPrice * (sellingFee/100);
            if(calculatedSellingFee > 750) {
                calculatedSellingFee = 750;
            }
        }

        paypalFee = parseFloat($("input#paypal-fee").val());

        if(paypalFee > 0) {
            calculatePaypalFee = (sellingPrice * (paypalFee/100)) + .3;
        }

        shipping = parseFloat($("input#shipping").val());

        quantity = parseFloat($("input#quantity").val());

        profit = parseFloat(((sellingPrice - (calculatedSellingFee + calculatePaypalFee) - shipping) - originalCost) * quantity).toFixed(2);

        if(!isNaN(profit)) {
            if(profit < 0) {
               $("p#profit").css({color: 'darkred'}) ;
            } else {
               $("p#profit").css({color: '#016f01'}) ;
            }
            $("p#profit").text('$'+profit);
        }
    });
});