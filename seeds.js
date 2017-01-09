var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment')

let seeds = [{
	name: 'Montain Leak',
	image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg',
	description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium itaque quidem, dolor fugit architecto quae! Sunt fuga quas earum? Nam quis architecto laboriosam quaerat veritatis ipsum animi cupiditate dolorem reiciendis.'
}, {
	name: 'Sour Matian',
	image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg',
	description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos minus expedita, eveniet molestias asperiores quam perspiciatis eligendi labore nemo sunt sed ipsa odit dolorum ipsum voluptas voluptate quos ut ratione?'
}, {
	name: 'Water Loor',
	image: 'https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg',
	description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis at a doloremque in commodi laborum inventore numquam omnis! Distinctio repellat sed a illum expedita sint dolores facere doloremque id saepe.'
}];

// Campground.create(seed, function(err, campground){
// 	if (err) {
// 		console.log('something went wrong saving ');
// 	} else {
// 		console.log('saved campground');
// 	}
// });

function seedsBd() {
	Campground.remove({}, function(err) {
		// if (err) {
		// 	console.log('something went wrong');
		// }
		// console.log('all remove');
		// seeds.forEach((seed) => {
		// 	Campground.create(seed, function(err, campground) {
		// 		if (err) {
		// 			console.log('something went wrong saving ');
		// 		}
		
		// 		Comment.remove({}, function(err) {
		// 			if (err) {
		// 				console.log('something went wrong with comment ');
		// 			}
		// 		});

		// 		Comment.create({
		// 			text: 'Bla  comment comment here comment comment comment bla bla bla....',
		// 			author: 'Jorge Cuevas'

		// 		}, function(err, comment) {
		// 			if (err) {
		// 				console.log('wrong saving comment');
		// 			} else {
		// 				campground.comments.push(comment);
		// 				campground.save();
					
		// 			}
		// 		});



		// 	});
		// });

	});
}

module.exports = seedsBd;