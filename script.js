//localStorage.clear (); // for testing purposes

// remove old read comments storage
localStorage.removeItem ( 'read_comments' );

Storage.prototype.setObject = function ( key, value ) {
	this.setItem ( key, JSON.stringify ( value ) );
};

Storage.prototype.getObject = function ( key ) {
	var item = this.getItem ( key );

	if ( item === undefined ) {
		return undefined;
	}

	return JSON.parse ( item );
};

// get all comments on this page
var $comments = null;

if ( ( document.location + '' ).indexOf ( 'item?id=' ) > 0 ) {
	// we are on a item page
	$comments = $( 'body > center > table > tbody > tr:eq(2) > td table:eq(1) > tbody > tr' );
} else {
	// we are on threads page
	$comments = $( 'body > center > table > tbody > tr:gt(2)' );
}

// get all stored unread comments
var readComments = localStorage.getObject ( 'read_comments_list' );

if ( readComments === undefined || readComments === null ) {
	readComments = {};
}

$comments.each ( function () {
	var $this = $( this );

	var commentContentMd5 = md5 ( $this.find ( 'table td:eq(2) span.comment' ).text () );

	if ( readComments[commentContentMd5] === undefined ) {
		// mark this comment as unread if we've already visited the page
		if( readComments[ md5 ( document.location) ]===true ) { 
			$this.find ( 'table td:eq(2)' ).css ( 'background-color', '#eefa93' );
		}
		readComments[commentContentMd5] = true;
	}
} );

//marks the current page as read
if( readComments[ md5 ( document.location) ]===undefined ) {
	readComments[ md5 ( document.location) ]=true;
}

localStorage.setObject ( 'read_comments_list', readComments );