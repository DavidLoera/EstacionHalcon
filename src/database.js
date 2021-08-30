const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://user:pass@cluster0-daidy.mongodb.net/test?retryWrites=true&w=majority', {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false
	
})
.then(db => console.log('La base de datos esta conectada'))
.catch(err => console.error(err));
