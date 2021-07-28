// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here.

class gallary {
    constructor(location){
        this.location = location
        this.term = "mountain"
        this.index = 0
        this.main = document.querySelector(".main")
        this.photos = []
        
        document.querySelector("#button").addEventListener("click", this.nextPhoto.bind(this))
    }
    
    nextPhoto (){
        if (this.index < this.photos.length - 1){
            this.index += 1
            let url = this.makeImageURL(this.photos[this.index])
            this.displayPics(url)
        }else{
            this.index = 0
            let url = this.makeImageURL(this.photos[this.index])
            this.displayPics(url)
        }
    }
    makeImageURL(photoObj){
        return `https://farm${photoObj.farm}.staticflickr.com/${photoObj.server}/${photoObj.id}_${photoObj.secret}.jpg`
    }

    displayPics(picture){
        let img = document.createElement("img")
        img.src = picture
        this.main.innerHTML = ""
        this.main.append(img)
    }

    fetchFlickr(location){
        let url = this.FLICKR_URL(location)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.photos = data.photos.photo
                let url = this.makeImageURL(this.photos[this.index])
                this.displayPics(url)
            })
    }

    FLICKR_URL(term="mountain") { 
    return"https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/"+
        "?api_key=b6f7321fda15db30ba1424984b62edf7"+
        "&format=json"+
        "&nojsoncallback=1"+
        "&method=flickr.photos.search"+
        "&safe_search=1"+
        "&per_page=5"+
        "&lat="+ this.location.latitude +
        "&lon="+ this.location.longitude +
        "&text=" + term
    }
    
    
}

function onLocationSuccess(data){
    console.log(data.coords)
    let location = data.coords
    let gal = new gallary(location)
    gal.fetchFlickr()
}

function onLocationError(){
    let backupLocation = {latitude: 35.0456, longitude: -85.3097} // Chattanooga, TN
    let gal = new gallary(backupLocation)
    gal.fetchFlickr()
}

navigator.geolocation.watchPosition(onLocationSuccess, onLocationError)

