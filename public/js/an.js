
class ANOTHER {
	static x = [{
      id: 1,
      title: 'Yellow Pail',
      description: 'On-demand sand castle construction expertise.',
      url: '#',
      submitterAvatarUrl: 'images/avatars/daniel.jpg',
      productImageUrl: 'images/products/image-aqua.png',
    },
    {
      id: 2,
      title: 'Supermajority: The Fantasy Congress League',
      description: 'Earn points when your favorite politicians pass legislation.',
      url: '#',
      submitterAvatarUrl: 'images/avatars/kristy.png',
      productImageUrl: 'images/products/image-rose.png',
    }]

    print() {
    	console.log(ANOTHER.x);
    }

    anotherOne(arr) {
    	 return {
    		title: arr.title,
    		description: arr.description,
    		productImageUrl: arr.productImageUrl
    	}
    }

   	mapFunct(){
   		return ANOTHER.x.map((this.anotherOne(ANOTHER.x)));
   	}

}

a = new ANOTHER();
console.log(a.mapFunct())