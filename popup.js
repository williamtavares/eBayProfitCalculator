$(document).ready(function() {
    $("input#paypal-fee").val("2.9");
    $("input").keyup(function() {
        var sellingPrice = parseFloat($("input#selling-price").val());
        console.log(sellingPrice);
        var sellingFee = parseFloat($("input#selling-fee").val());
        console.log(sellingFee);
        var calculatedSellingFee = (100/sellingPrice) * sellingFee;
        console.log(calculatedSellingFee);
        var paypalFee = parseFloat($("input#paypal-fee").val());
        console.log(paypalFee);
        var calculatePaypalFee = ((100/sellingPrice) * paypalFee) + .3;
        console.log("calculatePaypalFee" + calculatePaypalFee);
        var shipping = parseFloat($("input#shipping").val());
        console.log(shipping);
        var quantity = parseFloat($("input#quantity").val());
        console.log(quantity);

        var profit = (sellingPrice - (calculatedSellingFee + calculatePaypalFee) - shipping) * quantity;

        if(!isNaN(profit)) {
            $("p#profit").text(profit);
        }
    });
});