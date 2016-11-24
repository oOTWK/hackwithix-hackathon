$( function() {
    $( "#sortable" ).sortable({
        revert: true
    });
    $( "#movable" ).sortable({
        revert: true
    });
    $( "#draggable" ).draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "invalid",
        stop: function() {
            this.height=10;
            this.width=10;
        }
    });
    $( "ul, li" ).disableSelection();
} );