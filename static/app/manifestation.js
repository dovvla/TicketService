Vue.component('manifestation', {
        data: function () {
            return {
                manif: {
                    location: {},
                    image: '',
                    datetime: new Date(),
                },
                tickets: {
                    count: 1,
                    type: 'REGULAR'
                },
                mapPosition: {latitude: 45.267136, longitude: 19.833549},
                comment: {
                    rating: 1,
                    text: ""
                }

            }
        },
        template: `
    <div>
    <div class="container">
    
    <div class="row">
        <div class="col map" id="map" >
        </div>
    <div class="col">
        <img :src="manif.image" alt="Image" width="600"  height="300"> 
    </div>
    </div>
        <div class="row">
            <div class="col">
                <h3>Title:</h3>
            </div>
            <div class="col"> <h3>{{manif.name}} </h3> </div>

            <div class="col">
                <h3>Type:</h3>
            </div>
            <div class="col"> <h3>{{manif.type}} </h3>
        </div>
        </div>
        <div class="row">
            <div class="col">
                <h3>Regular ticket price:</h3>
            </div>
            <div class="col"> <h3>{{manif.ticketPrice}} </h3> </div>

            <div class="col">
                <h3>Capacity:</h3>
            </div>
            <div class="col"> <h3>{{manif.capacity}} </h3></div>
        </div>
        <div class="row">
            <div class="col">
                <h3>When and where: {{manif.datetime.toLocaleString()}} {{manif.location.address}} </h3>
                </div>
                <div class="col"> 
                <p style="font-size: x-large;">Tickets:                  
                <select id="tickets" v-model="tickets.type">
                    <option value="REGULAR">REGULAR</option>
                    <option value="VIP">VIP</option>
                    <option value="FAN_PIT">FAN PIT</option>
                  </select>

                  <input type="number" width="20px !important" id="quantity" min="1" v-model="tickets.count">
                  <button style="margin-top: 10;" type="button" class="btn btn-primary" v-on:click="addToCart()">Add to cart</button>
                  </p>
                  </div>
            </div>
            <div class="row">
            <div class="col"> </div>
            <div class="col">
            <div class="container justify-content-center mt-5 border-left border-right">
    <div class="d-flex fluid justify-content-center pt-3 pb-2">
     <input v-model="comment.text" type="text" name="text" placeholder="Comment" class="form-control addtxt">
     <input v-model="comment.rating" type="number" name="rating" min="1" max="5" class="form-control addtxt">
     <button v-on:click="addComment" style="margin-top: 10;" type="button" class="btn btn-primary">Add</button>
 
    </div>
    <div class="d-flex justify-content-center py-2">
        <div class="second py-2 px-2"> <span class="text1">Type your note, and hit enter to add it</span>
            <div class="d-flex justify-content-between py-1 pt-2">
               <div><span class="text3">Upvote?</span><span class="thumbup"><i class="fa fa-thumbs-o-up"></i></span><span class="text4">3</span></div>
            </div>
        </div>
    </div>
    </div>
    </div>
    <div class="col"> </div>
            </div>

        </div>
 
    </div>

    `,
        methods: {
            showOnMap: function () {
                let self = this;
                self.mapPosition.latitude = parseFloat(this.manif.location.latitude);
                self.mapPosition.longitude = parseFloat(this.manif.location.longitude);
                self.manif.latitude = self.mapPosition.latitude;
                self.manif.longitude = self.mapPosition.longitude;

                console.log(self.mapPosition.latitude);
                console.log(self.mapPosition.longitude);
                let map = new ol.Map({
                    target: 'map',
                    interactions: [],
                    controls: [],
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.OSM()
                        })
                    ],
                    view: new ol.View({
                        center: ol.proj.fromLonLat([self.mapPosition.longitude, self.mapPosition.latitude]),
                        zoom: 15
                    })
                });
            },
            addToCart: function () {
                let tmp = {
                    manifestation: this.manif.uuid,
                    ticketType: this.tickets.type,
                    count: this.tickets.count
                }
                axios.post('tickets/addToCart', JSON.stringify(tmp))
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            addComment: function () {
                let tmp = {
                    manifestation: this.manif.uuid,
                    text: this.comment.text,
                    rating: `${this.comment.rating}`
                };
                axios.post('comments/putComment', JSON.stringify(tmp))
                    .then(res => {
                        alert("Comment submitted, seller will verify it soon.");
                    })
                    .catch(err => {
                        console.error(err);
                    })


            }

        },
        mounted() {

            axios.get('manifestations/' + this.$route.params.id)
                .then(res => {
                    this.manif = res.data;
                    this.manif.datetime = new Date(this.manif.dateTime);
                    console.log(this.manif);
                    this.manif.image = 'data:image/png;base64,' + this.manif.image;
                    this.showOnMap();
                })
                .catch(err => {
                    console.error(err);
                });


        },
        watch: {
            'comment.rating': function (n, o) {
                if (n > 5 || n < 1) this.comment.rating = o;
            }
        }
    }
)