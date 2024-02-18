
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

    sum(a) {
      return a + 1;
    }

   	mapFunct(){
      const x = [1, 2, 3, 4]
   		return x.map(this.sum);
   	}

}

a = new ANOTHER();
console.log(a.mapFunct())